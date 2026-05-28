// The product catalogue. One entry per paid product in the My Feng Shui
// Home line-up. Each product is a recipe of content blocks plus a small
// amount of metadata (title, price, Stripe Price ID env key).
//
// Adding a new product is one entry here plus the missing content
// blocks under content/blocks/. The PDF assembler does not care about
// the product slug; it just executes the recipe.

// Note: the cover is not a content block. It is composed in
// lib/pdf/template.ts from product metadata + customer first name.
export type BlockId =
  // Framing blocks
  | "welcome"
  | "identity"
  | "how-to-use"
  | "experiment"
  | "closing"
  // Direction quality blocks (the order in which they appear in the
  // PDF; assembler looks up the customer's Kua to fill in which
  // compass direction each quality maps to).
  | "sheng-qi"
  | "tian-yi"
  | "yan-nian"
  | "fu-wei"
  | "huo-hai"
  | "wu-gui"
  | "liu-sha"
  | "jue-ming";

export type Product = {
  slug: string;
  /** Cover-and-marketing title. firstName is the customer's first name. */
  title: (firstName: string) => string;
  /** The product name without the personalised possessive prefix. */
  shortTitle: string;
  /** Price in cents. Stripe owns the canonical Price; this is kept here
   *  for sales-page rendering only. */
  priceCents: number;
  currency: "usd";
  /** Name of the env var holding the Stripe Price ID for this product. */
  stripeEnvKey: string;
  /** Blocks assembled into the PDF, in order. */
  blocks: BlockId[];
  /** Target page count band; used by smoke tests to flag layout drift. */
  targetPages: { min: number; max: number };
};

export const PRODUCTS: Record<string, Product> = {
  "personal-compass": {
    slug: "personal-compass",
    title: (firstName) => `${firstName}'s Personal Feng Shui Compass`,
    shortTitle: "Personal Feng Shui Compass",
    priceCents: 1400,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_ID_PERSONAL_COMPASS",
    blocks: [
      "welcome",
      "identity",
      "how-to-use",
      "sheng-qi",
      "tian-yi",
      "yan-nian",
      "fu-wei",
      "huo-hai",
      "wu-gui",
      "liu-sha",
      "jue-ming",
      "experiment",
      "closing",
    ],
    targetPages: { min: 20, max: 26 },
  },
};

export function findProduct(slug: string): Product | null {
  return PRODUCTS[slug] ?? null;
}
