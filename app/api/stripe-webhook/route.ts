import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { findCommerceProduct } from "@/lib/commerce";
import { createAdminClient } from "@/lib/supabase/server";
import { fulfillProduct } from "@/lib/fulfill";

// POST /api/stripe-webhook
//
// Verifies the Stripe signature, then handles checkout.session.completed:
//
//   1. Single-item orders (BuyButton -> /api/checkout) carry
//      metadata.productSlug. One product_orders row per session.
//   2. Cart orders (/api/cart-checkout) carry metadata.cartSlugs (a
//      comma list). One product_orders row per item, keyed on a
//      per-item session id "<session.id>#<slug>" so the unique
//      stripe_session constraint and idempotency hold per line.
//
// Fulfilment is shared via lib/fulfill.fulfillProduct. The cart branch
// is gated on cartSlugs, which single-item sessions never set, so the
// proven single-item path is untouched.

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
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const email =
    session.customer_details?.email ?? session.customer_email ?? "";
  if (!email) {
    console.error(`[stripe-webhook] missing email on session ${session.id}`);
    return NextResponse.json({ received: true });
  }

  const admin = createAdminClient();
  const paymentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);

  // ---- Cart orders (gated on cartSlugs). ----
  const cartSlugs = (session.metadata?.cartSlugs ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (cartSlugs.length > 0) {
    for (const slug of cartSlugs) {
      const product = findCommerceProduct(slug);
      if (!product) {
        console.error(`[stripe-webhook] cart: unknown product ${slug}`);
        continue;
      }
      const itemSession = `${session.id}#${slug}`;
      const { data: existing } = await admin
        .from("product_orders")
        .select("id")
        .eq("stripe_session", itemSession)
        .maybeSingle();
      if (existing) continue; // already fulfilled this item
      const { data: inserted, error: insertErr } = await admin
        .from("product_orders")
        .insert({
          email: email.toLowerCase(),
          product_slug: product.slug,
          stripe_session: itemSession,
          stripe_payment: paymentId,
          amount_cents: product.priceCents,
          currency: session.currency ?? "usd",
          status: "paid",
        })
        .select("id")
        .single();
      if (insertErr || !inserted) {
        console.error(
          `[stripe-webhook] cart order insert failed for ${slug}:`,
          insertErr,
        );
        continue;
      }
      await fulfillProduct(admin, product, email, inserted.id, session, SITE);
    }
    return NextResponse.json({ received: true });
  }

  // ---- Single-item order (existing flow). ----
  const productSlug = session.metadata?.productSlug ?? "";
  const product = findCommerceProduct(productSlug);
  if (!product) {
    console.error(`[stripe-webhook] unknown product: slug=${productSlug}`);
    return NextResponse.json({ received: true });
  }

  const { data: existing } = await admin
    .from("product_orders")
    .select("id")
    .eq("stripe_session", session.id)
    .maybeSingle();
  if (existing) {
    // Stripe retried; the order exists. Do not re-send.
    return NextResponse.json({ received: true });
  }

  const { data: inserted, error: insertErr } = await admin
    .from("product_orders")
    .insert({
      email: email.toLowerCase(),
      product_slug: product.slug,
      stripe_session: session.id,
      stripe_payment: paymentId,
      amount_cents: session.amount_total ?? product.priceCents,
      currency: session.currency ?? "usd",
      status: "paid",
    })
    .select("id")
    .single();
  if (insertErr || !inserted) {
    console.error("[stripe-webhook] order insert failed:", insertErr);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }

  await fulfillProduct(admin, product, email, inserted.id, session, SITE);

  return NextResponse.json({ received: true });
}
