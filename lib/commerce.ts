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
//   - "course":       the buyer is enrolled in an email course; the
//                     webhook sends the welcome email and a daily cron
//                     (app/api/cron/drip) sends the rest.

import { COMPASS_CATALOGUE, compassEnvKey } from "@/lib/compass-catalogue";

export type Fulfillment = "static" | "personalized" | "course";

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
  /** personalized only: recipe slug in lib/products.ts PRODUCTS. Absent
   *  for personalized products that render from a bespoke template
   *  rather than the modular block recipe (e.g. the Move-In Date Report). */
  recipeSlug?: string;
  /** personalized only: which post-checkout form + fulfilment action to
   *  use. "kua" (default) collects name/DOB/gender and renders via the
   *  block recipe (Compass, Extended Kua Report, the catalogue). "movein"
   *  adds a move-in window and renders the day-calendar report. "couple"
   *  collects two people and renders the compatibility report. "pick3"
   *  lets the buyer choose three life areas or rooms to assemble. */
  personalizedForm?: "kua" | "movein" | "couple" | "pick3";
  /** course only: the course slug in lib/courses. The webhook enrols
   *  the buyer and sends the welcome email; the drip cron sends the rest. */
  courseSlug?: string;
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
    shortTitle: "2026 Feng Shui Planner: Mid-Year Edition",
    priceCents: 1900,
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
  "extended-personal-kua-report": {
    slug: "extended-personal-kua-report",
    shortTitle: "Extended Personal Kua Report",
    priceCents: 3900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_EXTENDED",
    fulfillment: "personalized",
    recipeSlug: "extended-personal-kua",
    productPath: "/products/extended-personal-kua-report",
    launched: false,
  },
  // The Move-In Date Report. Personalised, but rendered from a bespoke
  // template (not the block recipe): the buyer's move-in window read
  // against the verified 2026 day calendar, plus a Kua facing overlay
  // and a first-week activation checklist.
  "move-in-kit": {
    slug: "move-in-kit",
    shortTitle: "Move-In Date Report",
    priceCents: 2900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_MOVEIN",
    fulfillment: "personalized",
    personalizedForm: "movein",
    productPath: "/products/move-in-kit",
    launched: false,
  },
  // The 7-Day Home Reset. An email course: enrol on purchase, one email
  // a day for seven days via the drip cron.
  "seven-day-home-reset": {
    slug: "seven-day-home-reset",
    shortTitle: "7-Day Home Reset",
    priceCents: 1900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_RESET",
    fulfillment: "course",
    courseSlug: "seven-day-home-reset",
    productPath: "/products/seven-day-home-reset",
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

// Wave 2 products. All static all-9-Kua PDFs; launched flips true
// once the owner creates the Stripe Price + uploads the file.
const WAVE2: CommerceProduct[] = [
  {
    slug: "bedroom-reset",
    shortTitle: "Bedroom and Relationship Reset",
    priceCents: 1400,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_BEDROOM",
    fulfillment: "static",
    files: [
      {
        path: "bedroom-reset/bedroom-reset.pdf",
        label: "The Bedroom and Relationship Reset (PDF)",
      },
    ],
    productPath: "/products/bedroom-reset",
    launched: false,
  },
  {
    slug: "business-money-feng-shui",
    shortTitle: "Business and Money Feng Shui Kit",
    priceCents: 1900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_MONEY_KIT",
    fulfillment: "static",
    files: [
      {
        path: "business-money-feng-shui/business-money-feng-shui.pdf",
        label: "The Business and Money Feng Shui Kit (PDF)",
      },
    ],
    productPath: "/products/business-money-feng-shui",
    launched: false,
  },
  {
    slug: "home-diagnostic-workbook",
    shortTitle: "10-Step Home Diagnostic Workbook",
    priceCents: 1400,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_WORKBOOK",
    fulfillment: "static",
    files: [
      {
        path: "home-diagnostic-workbook/home-diagnostic-workbook.pdf",
        label: "The 10-Step Home Diagnostic Workbook (PDF)",
      },
    ],
    productPath: "/products/home-diagnostic-workbook",
    launched: false,
  },
  {
    slug: "daily-ritual-pack",
    shortTitle: "Daily Ritual and Twenty Laws Pack",
    priceCents: 900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_RITUAL",
    fulfillment: "static",
    files: [
      {
        path: "daily-ritual-pack/daily-ritual-pack.pdf",
        label: "The Daily Ritual and Twenty Laws Pack (PDF)",
      },
    ],
    productPath: "/products/daily-ritual-pack",
    launched: false,
  },
  {
    slug: "cures-catalog",
    shortTitle: "Cures and Crystals Catalogue",
    priceCents: 900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_CURES",
    fulfillment: "static",
    files: [
      {
        path: "cures-catalog/cures-catalog.pdf",
        label: "The Cures and Crystals Catalogue (PDF)",
      },
    ],
    productPath: "/products/cures-catalog",
    launched: false,
  },
  {
    slug: "healthy-home-audit",
    shortTitle: "Healthy Home Audit",
    priceCents: 1900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_HEALTHY",
    fulfillment: "static",
    files: [
      {
        path: "healthy-home-audit/healthy-home-audit.pdf",
        label: "The Healthy Home Audit (PDF)",
      },
    ],
    productPath: "/products/healthy-home-audit",
    launched: false,
  },
  {
    slug: "five-elements-workbook",
    shortTitle: "Five Elements Home Styling Workbook",
    priceCents: 1200,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_ELEMENTS",
    fulfillment: "static",
    files: [
      {
        path: "five-elements-workbook/five-elements-workbook.pdf",
        label: "The Five Elements Home Styling Workbook (PDF)",
      },
    ],
    productPath: "/products/five-elements-workbook",
    launched: false,
  },
  {
    slug: "starter-deck",
    shortTitle: "Learn Feng Shui Starter Deck",
    priceCents: 900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_DECK",
    fulfillment: "static",
    files: [
      {
        path: "starter-deck/starter-deck.pdf",
        label: "The Learn Feng Shui Starter Deck (PDF)",
      },
    ],
    productPath: "/products/starter-deck",
    launched: false,
  },
  {
    slug: "bazi-basics",
    shortTitle: "BaZi Basics: Read Your Own Chart",
    priceCents: 1400,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_BAZI",
    fulfillment: "static",
    files: [
      {
        path: "bazi-basics/bazi-basics.pdf",
        label: "BaZi Basics: Read Your Own Chart (PDF)",
      },
    ],
    productPath: "/products/bazi-basics",
    launched: false,
  },
  {
    // The bundle delivers the three component PDFs; no separate file.
    slug: "whole-home-starter-bundle",
    shortTitle: "Whole-Home Starter Bundle",
    priceCents: 2900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_BUNDLE",
    fulfillment: "static",
    files: [
      {
        path: "home-diagnostic-workbook/home-diagnostic-workbook.pdf",
        label: "The 10-Step Home Diagnostic Workbook (PDF)",
      },
      {
        path: "daily-ritual-pack/daily-ritual-pack.pdf",
        label: "The Daily Ritual and Twenty Laws Pack (PDF)",
      },
      {
        path: "cures-catalog/cures-catalog.pdf",
        label: "The Cures and Crystals Catalogue (PDF)",
      },
    ],
    productPath: "/products/whole-home-starter-bundle",
    launched: false,
  },
];
for (const p of WAVE2) {
  COMMERCE_PRODUCTS[p.slug] = p;
}

// Downstream Compass catalogue (Single-Space, Single-Life-Pillar, Year
// Ahead). All personalized via the standard Kua form, launched false until
// each gets a Stripe Price + env var.
for (const e of COMPASS_CATALOGUE) {
  COMMERCE_PRODUCTS[e.slug] = {
    slug: e.slug,
    shortTitle: `${e.topicLabel} Compass`,
    priceCents: e.priceCents,
    currency: "usd",
    stripeEnvKey: compassEnvKey(e.slug),
    fulfillment: "personalized",
    recipeSlug: e.slug,
    productPath: `/products/${e.slug}`,
    launched: false,
  };
}

// The Compass bundle tier (personalized, kua form, launched false).
const COMPASS_BUNDLES: CommerceProduct[] = [
  {
    slug: "all-nine-pillars-compass",
    shortTitle: "Nine Life Areas Compass",
    priceCents: 2900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_ALL_PILLARS",
    fulfillment: "personalized",
    recipeSlug: "all-nine-pillars-compass",
    productPath: "/products/all-nine-pillars-compass",
    launched: false,
  },
  {
    slug: "all-twelve-spaces-compass",
    shortTitle: "Twelve Spaces Compass",
    priceCents: 2900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_ALL_SPACES",
    fulfillment: "personalized",
    recipeSlug: "all-twelve-spaces-compass",
    productPath: "/products/all-twelve-spaces-compass",
    launched: false,
  },
  {
    slug: "complete-home-compass",
    shortTitle: "Complete Home Compass",
    priceCents: 4900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_FLAGSHIP",
    fulfillment: "personalized",
    recipeSlug: "complete-home-compass",
    productPath: "/products/complete-home-compass",
    launched: false,
  },
  {
    slug: "couple-compatibility-compass",
    shortTitle: "Couple Compatibility Compass",
    priceCents: 1900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_COUPLE",
    fulfillment: "personalized",
    personalizedForm: "couple",
    productPath: "/products/couple-compatibility-compass",
    launched: false,
  },
  {
    slug: "pick-three-pillars",
    shortTitle: "Three Life Areas Compass",
    priceCents: 1700,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_PICK3_PILLARS",
    fulfillment: "personalized",
    personalizedForm: "pick3",
    productPath: "/products/pick-three-pillars",
    launched: false,
  },
  {
    slug: "pick-three-spaces",
    shortTitle: "Three Spaces Compass",
    priceCents: 1700,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_PICK3_SPACES",
    fulfillment: "personalized",
    personalizedForm: "pick3",
    productPath: "/products/pick-three-spaces",
    launched: false,
  },
];
for (const p of COMPASS_BUNDLES) {
  COMMERCE_PRODUCTS[p.slug] = p;
}

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
