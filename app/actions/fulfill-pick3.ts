"use server";

import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import {
  findCommerceProduct,
  DOWNLOAD_URL_TTL_SECONDS,
} from "@/lib/commerce";
import { createAdminClient } from "@/lib/supabase/server";
import { calculateKua, kuaGroup, type Gender } from "@/lib/kua";
import { effectiveKuaYear } from "@/lib/cny";
import { buildContext, assembleProductHtml } from "@/lib/blocks";
import { buildHtml } from "@/lib/pdf/template";
import { renderToPdf } from "@/lib/pdf/render";
import { sendEmail } from "@/lib/resend";
import { buildPersonalizedDeliveryEmail } from "@/lib/email-delivery";
import { findPick3 } from "@/lib/pick-three";
import type { BlockId, Product } from "@/lib/products";

// Post-checkout fulfilment for the Pick-Three bundles. The buyer picks
// three life areas (or three rooms); we assemble a synthetic recipe
// [welcome-mini, ...three chosen blocks, closing-mini] and render it
// through the standard personalised pipeline.

function back(slug: string, sessionId: string, flag: string): never {
  redirect(
    `/products/${slug}/success?session_id=${encodeURIComponent(sessionId)}&form=${flag}`,
  );
}

function countPdfPages(pdf: Buffer): number {
  const text = pdf.toString("latin1");
  const pages = (text.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  return Math.min(500, Math.max(1, pages));
}

export async function fulfillPick3(formData: FormData) {
  const sessionId = String(formData.get("sessionId") ?? "").trim();
  const productSlug = String(formData.get("productSlug") ?? "").trim();
  const firstNameRaw = String(formData.get("firstName") ?? "").trim();
  const year = Number(formData.get("year"));
  const month = Number(formData.get("month"));
  const day = Number(formData.get("day"));
  const gender = String(formData.get("gender") ?? "") as Gender;
  const picks = formData.getAll("picks").map((p) => String(p));

  const product = findCommerceProduct(productSlug);
  const cfg = findPick3(productSlug);
  if (
    !product ||
    product.fulfillment !== "personalized" ||
    product.personalizedForm !== "pick3" ||
    !cfg ||
    !sessionId
  ) {
    redirect("/products");
  }

  const firstName = firstNameRaw.slice(0, 60);
  const allowed = new Set(cfg.options.map((o) => o.block));
  const uniquePicks = Array.from(new Set(picks)).filter((p) => allowed.has(p));
  if (
    firstName.length === 0 ||
    !Number.isInteger(year) || year < 1900 || year > 2050 ||
    !Number.isInteger(month) || month < 1 || month > 12 ||
    !Number.isInteger(day) || day < 1 || day > 31 ||
    (gender !== "male" && gender !== "female") ||
    uniquePicks.length !== 3
  ) {
    back(product.slug, sessionId, "invalid");
  }

  const stripe = getStripe();
  if (!stripe) back(product.slug, sessionId, "error");
  let email = "";
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid";
    const matches = session.metadata?.productSlug === product.slug;
    email = session.customer_details?.email ?? session.customer_email ?? "";
    if (!paid || !matches || !email) back(product.slug, sessionId, "error");
  } catch {
    back(product.slug, sessionId, "error");
  }

  const admin = createAdminClient();

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
      await sendEmail({ to: email, subject: mail.subject, html: mail.html, text: mail.text });
    }
    back(product.slug, sessionId, "delivered");
  }

  const effYear = effectiveKuaYear(year, month, day).year;
  const kua = calculateKua(effYear, gender);
  const group = kuaGroup(kua);

  // Keep the picks in the order the options are defined for a tidy book.
  const orderedPicks = cfg.options
    .map((o) => o.block)
    .filter((b) => uniquePicks.includes(b)) as BlockId[];

  // A synthetic recipe assembled from the chosen blocks.
  const synth: Product = {
    slug: product.slug,
    title: (fn) => `${fn}'s ${cfg.topicLabel} Compass`,
    coverTitleHtml: (fn) => `${fn}'s ${cfg.topicLabel} <em>Compass</em>`,
    shortTitle: `${cfg.topicLabel} Compass`,
    priceCents: product.priceCents,
    currency: "usd",
    stripeEnvKey: product.stripeEnvKey,
    blocks: ["welcome-mini", ...orderedPicks, "closing-mini"],
    targetPages: { min: 8, max: 24 },
  };

  let pdf: Buffer;
  try {
    const context = buildContext(firstName, kua, group);
    const blocksHtml = await assembleProductHtml(synth, context);
    const html = buildHtml(synth, context, blocksHtml);
    pdf = await renderToPdf(html);
  } catch (err) {
    console.error("[fulfill-pick3] render failed:", err);
    back(product.slug, sessionId, "error");
  }

  const now = new Date();
  const pdfPath = `${product.slug}/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${order.id}.pdf`;
  const { error: uploadErr } = await admin.storage
    .from("product-pdfs")
    .upload(pdfPath, pdf, { contentType: "application/pdf", upsert: true });
  if (uploadErr) {
    console.error("[fulfill-pick3] upload failed:", uploadErr);
    back(product.slug, sessionId, "error");
  }

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
      extras: { picks: orderedPicks },
    })
    .select("id")
    .single();
  if (respErr || !response) {
    console.error("[fulfill-pick3] response insert failed:", respErr);
    back(product.slug, sessionId, "error");
  }

  await admin.from("product_deliveries").insert({
    order_id: order.id,
    response_id: response.id,
    pdf_path: pdfPath,
    page_count: countPdfPages(pdf),
  });

  const { data: signed } = await admin.storage
    .from("product-pdfs")
    .createSignedUrl(pdfPath, DOWNLOAD_URL_TTL_SECONDS);
  if (signed?.signedUrl) {
    const mail = buildPersonalizedDeliveryEmail({
      productTitle: product.shortTitle,
      firstName,
      downloadUrl: signed.signedUrl,
    });
    const sent = await sendEmail({ to: email, subject: mail.subject, html: mail.html, text: mail.text });
    if (!sent.ok) console.error("[fulfill-pick3] delivery email failed:", sent.error);
  }

  back(product.slug, sessionId, "delivered");
}
