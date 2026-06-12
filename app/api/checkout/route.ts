import { NextRequest, NextResponse } from "next/server";
import { findCommerceProduct, stripePriceId } from "@/lib/commerce";
import { getStripe } from "@/lib/stripe";

// POST /api/checkout
//
// The front half of the buy flow. BuyButton (state stripe-test or
// stripe-live) submits a plain HTML form with one field: productSlug.
// We create a Stripe Checkout Session and 303-redirect the browser to
// Stripe's hosted payment page.
//
// Failure behaviour is graceful: any misconfiguration sends the buyer
// back to the product page with ?checkout=error rather than a 500.

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";

export async function POST(req: NextRequest) {
  let productSlug = "";
  try {
    const form = await req.formData();
    productSlug = String(form.get("productSlug") ?? "").trim();
  } catch {
    return NextResponse.redirect(`${SITE}/products?checkout=error`, 303);
  }

  const product = findCommerceProduct(productSlug);
  if (!product) {
    return NextResponse.redirect(`${SITE}/products?checkout=error`, 303);
  }

  const stripe = getStripe();
  const priceId = stripePriceId(product);
  if (!stripe || !priceId) {
    console.error(
      `[checkout] not configured for ${productSlug}: stripe=${Boolean(stripe)} priceEnv=${product.stripeEnvKey}`,
    );
    return NextResponse.redirect(
      `${SITE}${product.productPath}?checkout=error`,
      303,
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      // Stripe Tax: computes and collects where registered. Safe to
      // leave on even before any registration exists.
      automatic_tax: { enabled: true },
      success_url: `${SITE}/products/${product.slug}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE}${product.productPath}`,
      metadata: { productSlug: product.slug },
      // EU digital-content withdrawal waiver: consent to immediate
      // delivery shown on the payment page itself.
      custom_text: {
        submit: {
          message:
            "Digital download, delivered immediately by email. By purchasing you agree to immediate delivery and waive the EU 14-day withdrawal right. 7-day refund policy applies either way.",
        },
      },
    });

    if (!session.url) {
      throw new Error("Checkout session has no URL");
    }
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("[checkout] session create failed:", err);
    return NextResponse.redirect(
      `${SITE}${product.productPath}?checkout=error`,
      303,
    );
  }
}
