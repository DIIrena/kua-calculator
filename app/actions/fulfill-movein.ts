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
import { orderedDirectionsForKua } from "@/lib/directions";
import {
  daysInWindow,
  DAY_CALENDAR_RANGE,
} from "@/lib/day-calendar";
import { buildMoveInHtml } from "@/lib/pdf/movein-template";
import { renderToPdf } from "@/lib/pdf/render";
import { sendEmail } from "@/lib/resend";
import { buildPersonalizedDeliveryEmail } from "@/lib/email-delivery";

// Post-checkout fulfilment for the Move-In Date Report. Invoked by the
// move-in form on /products/[slug]/success. Verifies the paid session,
// computes the Kua, reads the buyer's window against the verified 2026
// day calendar, renders a bespoke PDF, uploads it, records response +
// delivery rows, and emails a 7-day signed link.
//
// Idempotent: a second submission for an already-delivered order
// re-signs the existing PDF instead of re-rendering.

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

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

function formatIso(iso: string): string {
  // "2026-08-01" -> "1 August 2026", formatted in UTC to avoid an
  // off-by-one across the local timezone boundary.
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function fulfillMoveIn(formData: FormData) {
  const sessionId = String(formData.get("sessionId") ?? "").trim();
  const productSlug = String(formData.get("productSlug") ?? "").trim();
  const firstNameRaw = String(formData.get("firstName") ?? "").trim();
  const year = Number(formData.get("year"));
  const month = Number(formData.get("month"));
  const day = Number(formData.get("day"));
  const gender = String(formData.get("gender") ?? "") as Gender;
  const moveStartRaw = String(formData.get("moveStart") ?? "").trim();
  const moveEndRaw = String(formData.get("moveEnd") ?? "").trim();

  const product = findCommerceProduct(productSlug);
  if (
    !product ||
    product.fulfillment !== "personalized" ||
    product.personalizedForm !== "movein" ||
    !sessionId
  ) {
    redirect("/products");
  }

  // Validate the base inputs (same shape as the Compass) plus the window.
  const firstName = firstNameRaw.slice(0, 60);
  if (
    firstName.length === 0 ||
    !Number.isInteger(year) || year < 1900 || year > 2050 ||
    !Number.isInteger(month) || month < 1 || month > 12 ||
    !Number.isInteger(day) || day < 1 || day > 31 ||
    (gender !== "male" && gender !== "female") ||
    !ISO_DATE.test(moveStartRaw) ||
    !ISO_DATE.test(moveEndRaw)
  ) {
    back(product.slug, sessionId, "invalid");
  }

  // Order the window and clamp it to the calendar's coverage.
  const wantStart = moveStartRaw <= moveEndRaw ? moveStartRaw : moveEndRaw;
  const wantEnd = moveStartRaw <= moveEndRaw ? moveEndRaw : moveStartRaw;
  const effStart =
    wantStart < DAY_CALENDAR_RANGE.start ? DAY_CALENDAR_RANGE.start : wantStart;
  const effEnd =
    wantEnd > DAY_CALENDAR_RANGE.end ? DAY_CALENDAR_RANGE.end : wantEnd;
  const clamped = effStart !== wantStart || effEnd !== wantEnd;
  if (effStart > effEnd) {
    // The window does not overlap the calendar at all.
    back(product.slug, sessionId, "invalid");
  }
  const days = daysInWindow(effStart, effEnd);
  if (days.length === 0) {
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
    email = session.customer_details?.email ?? session.customer_email ?? "";
    if (!paid || !matches || !email) back(product.slug, sessionId, "error");
  } catch {
    back(product.slug, sessionId, "error");
  }

  const admin = createAdminClient();

  // The order row (webhook normally created it; fallback create here).
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
  // one if this order already produced a response, so the reusable form
  // link cannot generate unlimited different reports.
  const pdfPath = `move-in-date-report/${order.id}.pdf`;
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

  // Compute the Kua (Chinese New Year boundary applied) and directions.
  const effYear = effectiveKuaYear(year, month, day).year;
  const kua = calculateKua(effYear, gender);
  const group = kuaGroup(kua);
  const ordered = orderedDirectionsForKua(kua);
  const favourable = ordered.filter((d) => d.favourable);
  const cautious = ordered.filter((d) => !d.favourable);

  // Render the PDF from the move-in template.
  let pdf: Buffer;
  try {
    const html = buildMoveInHtml({
      firstName,
      kua,
      group,
      window: {
        start: effStart,
        end: effEnd,
        startLabel: formatIso(effStart),
        endLabel: formatIso(effEnd),
      },
      days,
      favourable,
      cautious,
      clamped,
    });
    pdf = await renderToPdf(html);
  } catch (err) {
    console.error("[fulfill-movein] render failed:", err);
    back(product.slug, sessionId, "error");
  }

  // Upload to the private bucket at the fixed per-order path declared above.
  const { error: uploadErr } = await admin.storage
    .from("product-pdfs")
    .upload(pdfPath, pdf, { contentType: "application/pdf", upsert: true });
  if (uploadErr) {
    console.error("[fulfill-movein] upload failed:", uploadErr);
    back(product.slug, sessionId, "error");
  }

  // Record response (with the window in extras) + delivery.
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
      extras: { moveStart: wantStart, moveEnd: wantEnd },
    })
    .select("id")
    .single();
  if (respErr || !response) {
    console.error("[fulfill-movein] response insert failed:", respErr);
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
      console.error("[fulfill-movein] delivery email failed:", sent.error);
    }
  }

  back(product.slug, sessionId, "delivered");
}
