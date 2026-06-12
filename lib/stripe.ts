import Stripe from "stripe";

// Server-only Stripe client. STRIPE_SECRET_KEY is sk_test_... in
// preview/test and sk_live_... in production; the same code serves
// both because the BuyButton state flag and the env vars swap
// together.
//
// Lazily constructed so pages that import commerce types do not
// crash at build time when the key is not yet configured.

let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.trim().length === 0) return null;
  if (!cached) {
    cached = new Stripe(key.trim());
  }
  return cached;
}
