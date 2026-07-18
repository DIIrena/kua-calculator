// The product catalogue. One entry per paid product in the My Feng Shui
// Home line-up. Each product is a recipe of content blocks plus a small
// amount of metadata (title, price, Stripe Price ID env key).
//
// Adding a new product is one entry here plus the missing content
// blocks under content/blocks/. The PDF assembler does not care about
// the product slug; it just executes the recipe.

import {
  COMPASS_CATALOGUE,
  compassBlocks,
  compassEnvKey,
} from "@/lib/compass-catalogue";

// Note: the cover is not a content block. It is composed in
// lib/pdf/template.ts from product metadata + customer first name.
export type BlockId =
  // Framing blocks
  | "welcome"
  | "welcome-extended"
  | "identity"
  | "kua-element"
  | "summary"
  | "find-your-directions"
  | "how-to-use"
  | "before-the-compass"
  | "faq-hard-cases"
  | "experiment"
  | "closing"
  | "closing-extended"
  // Extended Kua Report premium blocks (reuse the existing per-quality
  // direction tokens; no new tokens needed).
  | "compatibility"
  | "room-bedroom"
  | "room-desk"
  | "room-dining"
  | "year-overlay"
  // Downstream Compass catalogue: shared mini framing + one focused topic
  // block per Single-Space and Single-Life-Pillar Compass (see
  // lib/compass-catalogue.ts).
  | "welcome-mini"
  | "closing-mini"
  | "space-kitchen"
  | "space-living-room"
  | "space-bathroom"
  | "space-entrance"
  | "space-hallway"
  | "space-storage"
  | "space-laundry"
  | "space-balcony"
  | "space-garage"
  | "pillar-wealth"
  | "pillar-fame"
  | "pillar-relationships"
  | "pillar-creativity"
  | "pillar-helpful-people"
  | "pillar-career"
  | "pillar-knowledge"
  | "pillar-family"
  | "pillar-health"
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
  /** Cover title rendered as HTML (may include an <em> for the clay
   *  accent word). firstName arrives already HTML-escaped. Lets a second
   *  personalised product carry its own cover wording instead of the
   *  hardcoded "Compass". */
  coverTitleHtml: (firstName: string) => string;
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
    coverTitleHtml: (firstName) =>
      `${firstName}'s Personal Feng Shui <em>Compass</em>`,
    shortTitle: "Personal Feng Shui Compass",
    priceCents: 1900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_ID_PERSONAL_COMPASS",
    blocks: [
      "welcome",
      "identity",
      "kua-element",
      "summary",
      "find-your-directions",
      "how-to-use",
      "before-the-compass",
      "sheng-qi",
      "tian-yi",
      "yan-nian",
      "fu-wei",
      "huo-hai",
      "wu-gui",
      "liu-sha",
      "jue-ming",
      "faq-hard-cases",
      "experiment",
      "closing",
    ],
    targetPages: { min: 44, max: 56 },
  },
  // The Extended Personal Kua Report. A superset of the Compass: the
  // same eight-direction reading, plus five premium chapters
  // (compatibility, three room applications, a 2026 year overlay). Same
  // three inputs as the Compass, so it reuses the post-checkout form and
  // the fulfilment action unchanged.
  "extended-personal-kua": {
    slug: "extended-personal-kua",
    title: (firstName) => `${firstName}'s Extended Personal Kua Report`,
    coverTitleHtml: (firstName) =>
      `${firstName}'s Extended Personal <em>Kua Report</em>`,
    shortTitle: "Extended Personal Kua Report",
    priceCents: 3900,
    currency: "usd",
    stripeEnvKey: "STRIPE_PRICE_ID_EXTENDED_KUA",
    blocks: [
      "welcome-extended",
      "identity",
      "kua-element",
      "summary",
      "find-your-directions",
      "how-to-use",
      "before-the-compass",
      "sheng-qi",
      "tian-yi",
      "yan-nian",
      "fu-wei",
      "huo-hai",
      "wu-gui",
      "liu-sha",
      "jue-ming",
      "compatibility",
      "room-bedroom",
      "room-desk",
      "room-dining",
      "year-overlay",
      "faq-hard-cases",
      "experiment",
      "closing-extended",
    ],
    targetPages: { min: 56, max: 70 },
  },
};

// Build the downstream Compass catalogue recipes from the manifest. Each
// is [welcome-mini, <topic block>, closing-mini] with its own cover wording.
for (const e of COMPASS_CATALOGUE) {
  PRODUCTS[e.slug] = {
    slug: e.slug,
    title: (firstName) => `${firstName}'s ${e.topicLabel} Compass`,
    coverTitleHtml: (firstName) =>
      `${firstName}'s ${e.topicLabel} <em>Compass</em>`,
    shortTitle: `${e.topicLabel} Compass`,
    priceCents: e.priceCents,
    currency: "usd",
    stripeEnvKey: compassEnvKey(e.slug),
    blocks: compassBlocks(e) as BlockId[],
    targetPages: { min: 4, max: 8 },
  };
}

// The bundle tier: pure assemblies of existing blocks, no new content.
const ALL_PILLAR_BLOCKS: BlockId[] = [
  "pillar-wealth", "pillar-fame", "pillar-relationships", "pillar-creativity",
  "pillar-helpful-people", "pillar-career", "pillar-knowledge", "pillar-family",
  "pillar-health",
];
const ALL_SPACE_BLOCKS: BlockId[] = [
  "room-bedroom", "room-desk", "room-dining", "space-kitchen",
  "space-living-room", "space-bathroom", "space-entrance", "space-hallway",
  "space-storage", "space-laundry", "space-balcony", "space-garage",
];

PRODUCTS["all-nine-pillars-compass"] = {
  slug: "all-nine-pillars-compass",
  title: (fn) => `${fn}'s Nine Life Areas Compass`,
  coverTitleHtml: (fn) => `${fn}'s Nine Life Areas <em>Compass</em>`,
  shortTitle: "Nine Life Areas Compass",
  priceCents: 2900,
  currency: "usd",
  stripeEnvKey: "STRIPE_PRICE_ALL_PILLARS",
  blocks: ["welcome-mini", ...ALL_PILLAR_BLOCKS, "closing-mini"],
  targetPages: { min: 40, max: 66 },
};

PRODUCTS["all-twelve-spaces-compass"] = {
  slug: "all-twelve-spaces-compass",
  title: (fn) => `${fn}'s Twelve Spaces Compass`,
  coverTitleHtml: (fn) => `${fn}'s Twelve Spaces <em>Compass</em>`,
  shortTitle: "Twelve Spaces Compass",
  priceCents: 2900,
  currency: "usd",
  stripeEnvKey: "STRIPE_PRICE_ALL_SPACES",
  blocks: ["welcome-mini", ...ALL_SPACE_BLOCKS, "closing-mini"],
  targetPages: { min: 50, max: 78 },
};

PRODUCTS["complete-home-compass"] = {
  slug: "complete-home-compass",
  title: (fn) => `${fn}'s Complete Home Compass`,
  coverTitleHtml: (fn) => `${fn}'s Complete Home <em>Compass</em>`,
  shortTitle: "Complete Home Compass",
  priceCents: 4900,
  currency: "usd",
  stripeEnvKey: "STRIPE_PRICE_FLAGSHIP",
  blocks: [
    "welcome-extended", "identity", "kua-element", "summary", "find-your-directions",
    "how-to-use",
    "before-the-compass",
    "sheng-qi", "tian-yi", "yan-nian", "fu-wei",
    "huo-hai", "wu-gui", "liu-sha", "jue-ming",
    "compatibility",
    ...ALL_SPACE_BLOCKS,
    ...ALL_PILLAR_BLOCKS,
    "year-overlay", "faq-hard-cases", "experiment", "closing-extended",
  ],
  targetPages: { min: 115, max: 165 },
};

export function findProduct(slug: string): Product | null {
  return PRODUCTS[slug] ?? null;
}
