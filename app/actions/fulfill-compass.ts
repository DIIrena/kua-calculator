"use server";

import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import {
  findCommerceProduct,
  DOWNLOAD_URL_TTL_SECONDS,
} from "@/lib/commerce";
import { findProduct } from "@/lib/products";
import { createAdminClient } from "@/lib/supabase/server";
import { calculateKua, kuaGroup, type Gender } from "@/lib/kua";
import { effectiveKuaYear } from "@/lib/cny";
import { buildContext, assembleProductHtml } from "@/lib/blocks";
import { buildHtml } from "@/lib/pdf/template";
import { renderToPdf } from "@/lib/pdf/render";
import { sendEmail } from "@/lib/resend";
import { buildPersonalizedDeliveryEmail } from "@/lib/email-delivery";

// Post-checkout fulfilment for personalized products (the Compass).
// Invoked by the form on /products/[slug]/success. Verifies the paid
// Stripe session server-side, computes the Kua, renders the PDF,
// uploads it to the private product-pdfs bucket, records response +
// delivery rows, emails a 7-day signed link, and returns the buyer to
// the success page with ?delivered=1.
//
// Idempotent: a second submission for an already-delivered order
// re-signs the existing PDF instead of re-rendering.

function back(slug: string, sessionId: string, flag: string): never {
  redirect(
    `/products/${slug}/success?session_id=${encodeURIComponent(sessionId)}&form=${flag}`,
  );
}

function countPdfPages(pdf: Buffer): number {
  // Cheap structural count: page objects minus the page-tree nodes.
  const text = pdf.toString("latin1");
  const pages = (text.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  return Math.min(500, Math.max(1, pages));
}

export async function fulfillCompass(formData: FormData) {
  const sessionId = String(formData.get("sessionId") ?? "").trim();
  const productSlug = String(formData.get("productSlug") ?? "").trim();
  const firstNameRaw = String(formData.get("firstName") ?? "").trim();
  const year = Number(formData.get("year"));
  const month = Number(formData.get("month"));
  const day = Number(formData.get("day"));
  const gender = String(formData.get("gender") ?? "") as Gender;

  const product = findCommerceProduct(productSlug);
  if (!product || product.fulfillment !== "personalized" || !sessionId) {
    redirect("/products");
  }

  // Validate inputs before any external call.
  const firstName = firstNameRaw.slice(0, 60);
  if (
    firstName.length === 0 ||
    !Number.isInteger(year) ||
    year < 1900 ||
    year > 2050 ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12 ||
    !Number.isInteger(day) ||
    day < 1 ||
    day > 31 ||
    (gender !== "male" && gender !== "female")
  ) {
    back(product.slug, sessionId, "invalid");
  }

  // Verify the session is real and paid.
  const stripe = getStripe();
  if (!stripe) back(product.slug, sessionId, "error");
  let email = "";
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid";
    const matches = session.metadata?.productSlug === product.slug;
    email =
      session.customer_details?.email ?? session.customer_email ?? "";
    if (!paid || !matches || !email) back(product.slug, sessionId, "error");
  } catch {
    back(product.slug, sessionId, "error");
  }

  const admin = createAdminClient();

  // The order row (webhook normally created it; create here as a
  // fallback if the webhook lagged).
  let { data: order } = await admin
    .from("product_orders")
    .select("id")
    .eq("stripe_session", sessionId)
    .maybeSingle();
  if (!order) {
    const { data: inserted } = await admin
      .from("product_orders")
      .insert({
        email: email.toLowerCase(),
        product_slug: product.slug,
        stripe_session: sessionId,
        amount_cents: product.priceCents,
        currency: "usd",
        status: "paid",
      })
      .select("id")
      .single();
    order = inserted;
  }
  if (!order) back(product.slug, sessionId, "error");

  // Idempotency: an existing delivery means re-sign, not re-render.
  const { data: priorDelivery } = await admin
    .from("product_deliveries")
    .select("pdf_path")
    .eq("order_id", order.id)
    .order("delivered_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (priorDelivery?.pdf_path) {
    const { data: signed } = await admin.storage
      .from("product-pdfs")
      .createSignedUrl(priorDelivery.pdf_path, DOWNLOAD_URL_TTL_SECONDS);
    if (signed?.signedUrl) {
      const mail = buildPersonalizedDeliveryEmail({
        productTitle: product.shortTitle,
        firstName,
        downloadUrl: signed.signedUrl,
      });
      await sendEmail({
        to: email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      });
    }
    back(product.slug, sessionId, "delivered");
  }

  // Compute the Kua (Chinese New Year boundary applied).
  const adjustment = effectiveKuaYear(year, month, day);
  const effYear = adjustment.year;
  const kua = calculateKua(effYear, gender);
  const group = kuaGroup(kua);
  const now = new Date();
  const ageYears = Math.max(
    0,
    now.getFullYear() - year - (now.getMonth() + 1 < month ||
    (now.getMonth() + 1 === month && now.getDate() < day)
      ? 1
      : 0),
  );

  // Render the PDF from the recipe.
  const recipe = findProduct(product.recipeSlug ?? "");
  if (!recipe) back(product.slug, sessionId, "error");
  let pdf: Buffer;
  try {
    const context = buildContext(firstName, kua, group, ageYears);
    const blocksHtml = await assembleProductHtml(recipe, context);
    const html = buildHtml(recipe, context, blocksHtml);
    pdf = await renderToPdf(html);
  } catch (err) {
    console.error("[fulfill-compass] render failed:", err);
    back(product.slug, sessionId, "error");
  }

  // Upload to the private bucket.
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const pdfPath = `${recipe.slug}/${yyyy}/${mm}/${order.id}.pdf`;
  const { error: uploadErr } = await admin.storage
    .from("product-pdfs")
    .upload(pdfPath, pdf, { contentType: "application/pdf", upsert: true });
  if (uploadErr) {
    console.error("[fulfill-compass] upload failed:", uploadErr);
    back(product.slug, sessionId, "error");
  }

  // Record response + delivery.
  const { data: response, error: respErr } = await admin
    .from("product_responses")
    .insert({
      order_id: order.id,
      first_name: firstName,
      birth_year: year,
      birth_month: month,
      birth_day: day,
      gender,
      kua_number: kua,
      kua_group: group,
    })
    .select("id")
    .single();
  if (respErr || !response) {
    console.error("[fulfill-compass] response insert failed:", respErr);
    back(product.slug, sessionId, "error");
  }

  await admin.from("product_deliveries").insert({
    order_id: order.id,
    response_id: response.id,
    pdf_path: pdfPath,
    page_count: countPdfPages(pdf),
  });

  // Email the signed link.
  const { data: signed } = await admin.storage
    .from("product-pdfs")
    .createSignedUrl(pdfPath, DOWNLOAD_URL_TTL_SECONDS);
  if (signed?.signedUrl) {
    const mail = buildPersonalizedDeliveryEmail({
      productTitle: product.shortTitle,
      firstName,
      downloadUrl: signed.signedUrl,
    });
    const sent = await sendEmail({
      to: email,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
    if (!sent.ok) {
      console.error("[fulfill-compass] delivery email failed:", sent.error);
    }
  }

  back(product.slug, sessionId, "delivered");
}
