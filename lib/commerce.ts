// The checkout-facing product registry. One entry per BUYABLE product.
//
// This is deliberately separate from lib/products.ts (the personalised
// PDF recipe catalogue): a commerce entry says how a product is sold
// and fulfilled; a recipe says how its PDF is assembled. Personalised
// products reference their recipe by slug.
//
// Keys here are the PUBLIC page slugs that BuyButton submits as
// `productSlug` (matching app/(site)/products/<slug>). The Stripe
// Price ID for each product lives in an env var so test and live
// modes swap without a code change.
//
// Fulfillment types:
//   - "static":       a fixed set of files in the private
//                     `product-files` Storage bucket. The webhook
//                     emails signed URLs immediately on payment.
//   - "personalized": the buyer fills the post-checkout form; a
//                     server action renders the PDF via the recipe
//                     in lib/products.ts and emails it.

export type Fulfillment = "static" | "personalized";

export type CommerceProduct = {
  /** Public page slug; BuyButton submits this as productSlug. */
  slug: string;
  shortTitle: string;
  /** For sales-surface rendering only; Stripe owns the canonical price. */
  priceCents: number;
  currency: "usd";
  /** Env var holding the Stripe Price ID (test or live per environment). */
  stripeEnvKey: string;
  fulfillment: Fulfillment;
  /** static only: paths inside the `product-files` bucket. */
  files?: Array<{ path: string; label: string }>;
  /** personalized only: recipe slug in lib/products.ts PRODUCTS. */
  recipeSlug?: string;
  /** The product landing page, used for checkout cancel_url. */
  productPath: string;
  /** Whether checkout is open for this product. /api/checkout refuses
   *  to create a session for unlaunched products. Flipping a product
   *  live = set launched true AND set its page BuyButton to
   *  stripe-live. */
  launched: boolean;
};

export const COMMERCE_PRODUCTS: Record<string, CommerceProduct> = {
  "annual-feng-shui-planner-2026": {
    slug: "annual-feng-shui-planner-2026",
    shortTitle: "2026 Annual Feng Shui Planner",
    priceCents: 2900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_PLANNER",
    fulfillment: "static",
    files: [
      {
        path: "annual-feng-shui-planner-2026/planner.pdf",
        label: "The Planner (PDF, print-ready)",
      },
      {
        path: "annual-feng-shui-planner-2026/planner.epub",
        label: "The Planner (EPUB, for e-readers)",
      },
      {
        path: "annual-feng-shui-planner-2026/calendar.ics",
        label: "The day calendar (add to Apple or Google Calendar)",
      },
    ],
    productPath: "/products/annual-feng-shui-planner-2026",
    launched: true,
  },
  "personal-feng-shui-compass": {
    slug: "personal-feng-shui-compass",
    shortTitle: "Personal Feng Shui Compass",
    priceCents: 1400,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_COMPASS",
    fulfillment: "personalized",
    recipeSlug: "personal-compass",
    productPath: "/products/personal-feng-shui-compass",
    launched: false,
  },
  "good-days-calendar-2026": {
    slug: "good-days-calendar-2026",
    shortTitle: "2026 Good-Days Calendar",
    priceCents: 900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_CALENDAR",
    fulfillment: "static",
    files: [
      {
        path: "good-days-calendar-2026/good-days-calendar.pdf",
        label: "The Good-Days Calendar (printable PDF)",
      },
      {
        path: "good-days-calendar-2026/calendar.ics",
        label: "The phone calendar file (Apple or Google Calendar)",
      },
    ],
    productPath: "/products/good-days-calendar-2026",
    launched: false,
  },
};

export function findCommerceProduct(slug: string): CommerceProduct | null {
  return COMMERCE_PRODUCTS[slug] ?? null;
}

/** Resolve the Stripe Price ID for a product from its env var. Returns
 *  null when the env var is unset (product not yet configured live). */
export function stripePriceId(product: CommerceProduct): string | null {
  const id = process.env[product.stripeEnvKey];
  return id && id.trim().length > 0 ? id.trim() : null;
}

/** TTL for signed download URLs in delivery emails: 7 days, matching
 *  the refund window. Buyers can request a fresh link by replying to
 *  the delivery email; signed-in buyers re-download from the account
 *  page at any time. */
export const DOWNLOAD_URL_TTL_SECONDS = 7 * 24 * 60 * 60;
