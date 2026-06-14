import { NextRequest, NextResponse } from "next/server";
import { findCommerceProduct, stripePriceId } from "@/lib/commerce";
import { getStripe } from "@/lib/stripe";

// POST /api/cart-checkout
//
// Combined checkout for the cart. The /cart page submits one field,
// `slugs` (a comma list). We build one Stripe Checkout Session with a
// line item per launched product and stamp metadata.cartSlugs so the
// webhook fulfils each item. Mirrors /api/checkout for tax + promo
// handling. Graceful: any problem returns the buyer to /cart.

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";

export async function POST(req: NextRequest) {
  let slugsRaw = "";
  try {
    const form = await req.formData();
    slugsRaw = String(form.get("slugs") ?? "").trim();
  } catch {
    return NextResponse.redirect(`${SITE}/cart?checkout=error`, 303);
  }

  const slugs = [
    ...new Set(
      slugsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  ];
  if (slugs.length === 0) {
    return NextResponse.redirect(`${SITE}/cart`, 303);
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.redirect(`${SITE}/cart?checkout=error`, 303);
  }

  const lineItems: { price: string; quantity: number }[] = [];
  const okSlugs: string[] = [];
  for (const slug of slugs) {
    const product = findCommerceProduct(slug);
    if (!product || !product.launched) continue;
    const priceId = stripePriceId(product);
    if (!priceId) continue;
    lineItems.push({ price: priceId, quantity: 1 });
    okSlugs.push(product.slug);
  }

  if (lineItems.length === 0) {
    return NextResponse.redirect(`${SITE}/cart?checkout=error`, 303);
  }

  const sessionParams = (withTax: boolean) => ({
    mode: "payment" as const,
    line_items: lineItems,
    automatic_tax: { enabled: withTax },
    allow_promotion_codes: true,
    success_url: `${SITE}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE}/cart?checkout=cancelled`,
    metadata: { cartSlugs: okSlugs.join(",") },
    custom_text: {
      submit: {
        message:
          "Digital downloads, delivered immediately by email. By purchasing you agree to immediate delivery and waive the EU 14-day withdrawal right. 7-day refund policy applies either way.",
      },
    },
  });

  try {
    let session;
    try {
      session = await stripe.checkout.sessions.create(sessionParams(true));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (/automatic tax|head office|origin address/i.test(msg)) {
        console.error(
          "[cart-checkout] automatic tax not configured; retrying without it:",
          msg,
        );
        session = await stripe.checkout.sessions.create(sessionParams(false));
      } else {
        throw err;
      }
    }
    if (!session.url) {
      throw new Error("Checkout session has no URL");
    }
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("[cart-checkout] session create failed:", err);
    return NextResponse.redirect(`${SITE}/cart?checkout=error`, 303);
  }
}
