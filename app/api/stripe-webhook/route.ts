import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  findCommerceProduct,
  DOWNLOAD_URL_TTL_SECONDS,
} from "@/lib/commerce";
import { createAdminClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/resend";
import {
  buildStaticDeliveryEmail,
  buildPersonalizationInviteEmail,
} from "@/lib/email-delivery";
import { findCourse, courseEmailForDay } from "@/lib/courses/seven-day-reset";
import { buildCourseEmail } from "@/lib/email-course";
import { unsubscribeUrl } from "@/lib/unsubscribe-token";

// POST /api/stripe-webhook
//
// Verifies the Stripe signature against STRIPE_WEBHOOK_SECRET, then
// handles checkout.session.completed:
//
//   1. Insert a product_orders row (idempotent on stripe_session).
//   2. Fulfil:
//      - static products: mint 7-day signed URLs from the private
//        `product-files` bucket and email them immediately.
//      - personalized products: email a link to the post-checkout
//        personalisation form on the success page.
//
// Refunds are handled manually in the Stripe dashboard for v1; the
// orders row keeps status 'paid' until a later webhook handler flips
// it. We always return 200 once the event is verified so Stripe does
// not retry forever on partial failures we logged.

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    console.error("[stripe-webhook] not configured");
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed:", err);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    // Only the one event type is registered; acknowledge anything else.
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const productSlug = session.metadata?.productSlug ?? "";
  const email =
    session.customer_details?.email ?? session.customer_email ?? "";

  const product = findCommerceProduct(productSlug);
  if (!product || !email) {
    console.error(
      `[stripe-webhook] unknown product or missing email: slug=${productSlug} email=${Boolean(email)}`,
    );
    // Verified event we cannot fulfil: acknowledge (do not retry) but log loudly.
    return NextResponse.json({ received: true });
  }

  const admin = createAdminClient();

  // 1. Record the order. Unique stripe_session makes retries no-ops.
  const { data: existing } = await admin
    .from("product_orders")
    .select("id")
    .eq("stripe_session", session.id)
    .maybeSingle();

  let orderId: string;
  if (existing) {
    // Stripe retried delivery; the order exists. Do not re-send email.
    return NextResponse.json({ received: true });
  } else {
    const { data: inserted, error: insertErr } = await admin
      .from("product_orders")
      .insert({
        email: email.toLowerCase(),
        product_slug: product.slug,
        stripe_session: session.id,
        stripe_payment:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : (session.payment_intent?.id ?? null),
        amount_cents: session.amount_total ?? product.priceCents,
        currency: session.currency ?? "usd",
        status: "paid",
      })
      .select("id")
      .single();
    if (insertErr || !inserted) {
      console.error("[stripe-webhook] order insert failed:", insertErr);
      // Let Stripe retry: the order was not recorded.
      return NextResponse.json({ error: "db error" }, { status: 500 });
    }
    orderId = inserted.id;
  }

  // 2. Fulfil.
  try {
    if (product.fulfillment === "static" && product.files?.length) {
      const links: Array<{ url: string; label: string }> = [];
      for (const file of product.files) {
        const { data: signed, error: signErr } = await admin.storage
          .from("product-files")
          .createSignedUrl(file.path, DOWNLOAD_URL_TTL_SECONDS);
        if (signErr || !signed?.signedUrl) {
          throw new Error(
            `sign failed for ${file.path}: ${signErr?.message ?? "no url"}`,
          );
        }
        links.push({ url: signed.signedUrl, label: file.label });
      }

      const crossSell =
        product.slug === "annual-feng-shui-planner-2026"
          ? {
              text: "Also useful with the Planner:",
              url: `${SITE}/products/personal-feng-shui-compass`,
              label: "the Personal Feng Shui Compass, keyed to your Kua.",
            }
          : undefined;

      const mail = buildStaticDeliveryEmail({
        productTitle: product.shortTitle,
        links,
        crossSellLine: crossSell,
      });
      const sent = await sendEmail({
        to: email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      });
      if (!sent.ok) {
        console.error(
          `[stripe-webhook] delivery email failed for order ${orderId}: ${sent.error}`,
        );
      }
    } else if (product.fulfillment === "personalized") {
      const formUrl = `${SITE}/products/${product.slug}/success?session_id=${session.id}`;
      const mail = buildPersonalizationInviteEmail({
        productTitle: product.shortTitle,
        formUrl,
      });
      const sent = await sendEmail({
        to: email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      });
      if (!sent.ok) {
        console.error(
          `[stripe-webhook] invite email failed for order ${orderId}: ${sent.error}`,
        );
      }
    } else if (product.fulfillment === "course" && product.courseSlug) {
      const course = findCourse(product.courseSlug);
      if (course) {
        const emailLower = email.toLowerCase();
        // Enrol (idempotent on email + course). day_sent 0 and
        // last_sent_at now, because we send the welcome immediately and
        // want the first daily email to wait a day.
        const { error: enrolErr } = await admin
          .from("course_enrollments")
          .upsert(
            {
              email: emailLower,
              course_slug: course.slug,
              order_id: orderId,
              day_sent: 0,
              last_sent_at: new Date().toISOString(),
            },
            { onConflict: "email,course_slug", ignoreDuplicates: true },
          );
        if (enrolErr) {
          console.error(
            `[stripe-webhook] enrol failed for order ${orderId}: ${enrolErr.message}`,
          );
        }
        const welcome = courseEmailForDay(course, 0);
        if (welcome) {
          const mail = buildCourseEmail({
            subject: welcome.subject,
            preheader: welcome.preheader,
            body: welcome.body,
            unsubscribeUrl: unsubscribeUrl(SITE, emailLower, course.slug),
          });
          const sent = await sendEmail({
            to: email,
            subject: mail.subject,
            html: mail.html,
            text: mail.text,
          });
          if (!sent.ok) {
            console.error(
              `[stripe-webhook] welcome email failed for order ${orderId}: ${sent.error}`,
            );
          }
        }
      }
    }
  } catch (err) {
    // The order row exists; fulfilment hiccupped. The success page can
    // still deliver (it mints links / shows the form itself), so we
    // acknowledge rather than make Stripe retry and double-insert.
    console.error("[stripe-webhook] fulfilment error:", err);
  }

  return NextResponse.json({ received: true });
}
