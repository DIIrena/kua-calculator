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
import { directionsForKua, orderedDirectionsForKua } from "@/lib/directions";
import { buildSharedRooms } from "@/lib/shared-rooms";
import { buildCoupleHtml } from "@/lib/pdf/couple-template";
import { renderToPdf } from "@/lib/pdf/render";
import { sendEmail } from "@/lib/resend";
import { buildPersonalizedDeliveryEmail } from "@/lib/email-delivery";

// Post-checkout fulfilment for the Couple Compatibility Compass. Two
// people's birth data in, one compatibility PDF out. Person A is stored
// in the product_responses base columns; person B goes in extras.

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

function validPerson(name: string, y: number, m: number, d: number, g: string): boolean {
  return (
    name.length > 0 &&
    Number.isInteger(y) && y >= 1900 && y <= 2050 &&
    Number.isInteger(m) && m >= 1 && m <= 12 &&
    Number.isInteger(d) && d >= 1 && d <= 31 &&
    (g === "male" || g === "female")
  );
}

export async function fulfillCouple(formData: FormData) {
  const sessionId = String(formData.get("sessionId") ?? "").trim();
  const productSlug = String(formData.get("productSlug") ?? "").trim();

  const nameA = String(formData.get("firstName") ?? "").trim().slice(0, 60);
  const yA = Number(formData.get("year"));
  const mA = Number(formData.get("month"));
  const dA = Number(formData.get("day"));
  const gA = String(formData.get("gender") ?? "") as Gender;

  const nameB = String(formData.get("firstNameB") ?? "").trim().slice(0, 60);
  const yB = Number(formData.get("yearB"));
  const mB = Number(formData.get("monthB"));
  const dB = Number(formData.get("dayB"));
  const gB = String(formData.get("genderB") ?? "") as Gender;

  const product = findCommerceProduct(productSlug);
  if (
    !product ||
    product.fulfillment !== "personalized" ||
    product.personalizedForm !== "couple" ||
    !sessionId
  ) {
    redirect("/products");
  }

  if (!validPerson(nameA, yA, mA, dA, gA) || !validPerson(nameB, yB, mB, dB, gB)) {
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

  // One render per purchase. Re-sign the same PDF rather than render a new
  // one if this order already produced a response.
  const pdfPath = `couple-compatibility/${order.id}.pdf`;
  const { data: priorResponse } = await admin
    .from("product_responses")
    .select("id")
    .eq("order_id", order.id)
    .limit(1)
    .maybeSingle();
  if (priorResponse) {
    const { data: signed } = await admin.storage
      .from("product-pdfs")
      .createSignedUrl(pdfPath, DOWNLOAD_URL_TTL_SECONDS);
    if (signed?.signedUrl) {
      const mail = buildPersonalizedDeliveryEmail({
        productTitle: product.shortTitle,
        firstName: nameA,
        downloadUrl: signed.signedUrl,
      });
      const sent = await sendEmail({ to: email, subject: mail.subject, html: mail.html, text: mail.text });
      if (sent.ok) back(product.slug, sessionId, "resent");
    }
    // PDF could not be re-signed or the re-send failed; do not claim delivery.
    back(product.slug, sessionId, "error");
  }

  // Compute both Kua charts.
  const kuaA = calculateKua(effectiveKuaYear(yA, mA, dA).year, gA);
  const groupA = kuaGroup(kuaA);
  const kuaB = calculateKua(effectiveKuaYear(yB, mB, dB).year, gB);
  const groupB = kuaGroup(kuaB);
  const dirsA = directionsForKua(kuaA);
  const dirsB = directionsForKua(kuaB);
  const shared = buildSharedRooms(dirsA, dirsB);

  let pdf: Buffer;
  try {
    const html = buildCoupleHtml({
      a: {
        firstName: nameA,
        kua: kuaA,
        group: groupA,
        favourable: orderedDirectionsForKua(kuaA).filter((d) => d.favourable),
      },
      b: {
        firstName: nameB,
        kua: kuaB,
        group: groupB,
        favourable: orderedDirectionsForKua(kuaB).filter((d) => d.favourable),
      },
      shared,
    });
    pdf = await renderToPdf(html);
  } catch (err) {
    console.error("[fulfill-couple] render failed:", err);
    back(product.slug, sessionId, "error");
  }

  const { error: uploadErr } = await admin.storage
    .from("product-pdfs")
    .upload(pdfPath, pdf, { contentType: "application/pdf", upsert: true });
  if (uploadErr) {
    console.error("[fulfill-couple] upload failed:", uploadErr);
    back(product.slug, sessionId, "error");
  }

  const { data: response, error: respErr } = await admin
    .from("product_responses")
    .insert({
      order_id: order.id,
      first_name: nameA,
      birth_year: yA,
      birth_month: mA,
      birth_day: dA,
      gender: gA,
      kua_number: kuaA,
      kua_group: groupA,
      extras: {
        partner: {
          firstName: nameB,
          birthYear: yB,
          birthMonth: mB,
          birthDay: dB,
          gender: gB,
          kua: kuaB,
          group: groupB,
        },
      },
    })
    .select("id")
    .single();
  if (respErr || !response) {
    console.error("[fulfill-couple] response insert failed:", respErr);
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
      firstName: nameA,
      downloadUrl: signed.signedUrl,
    });
    const sent = await sendEmail({ to: email, subject: mail.subject, html: mail.html, text: mail.text });
    if (!sent.ok) console.error("[fulfill-couple] delivery email failed:", sent.error);
  }

  back(product.slug, sessionId, "delivered");
}
