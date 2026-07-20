// The storefront catalogue: every product the /products shop lists, with
// the data the shop UI needs (category, price, one-liner). This is the
// single source for the shelf. Categories are mutually exclusive; "On
// sale" is a cross-cutting flag, not a category.

import { COMPASS_CATALOGUE } from "@/lib/compass-catalogue";
import { CARD_COVER_SLUGS, MOCKUP_COVER_SLUGS } from "@/lib/product-assets";

export type StoreCategory =
  | "printable" // single printable PDFs, delivered by email instantly
  | "personalised" // single personalised reports keyed to the buyer's Kua
  | "bundle" // collections and pick-your-own bundles
  | "course" // email courses
  | "free"; // the free tool

export type StoreProduct = {
  slug: string;
  href: string;
  title: string;
  oneLiner: string;
  /** Price in cents (0 for free). Drives the price filter and sort. */
  priceCents: number;
  priceLabel: string;
  category: StoreCategory;
  /** When true, shown under "On sale" and rendered with a struck price. */
  onSale?: boolean;
  /** Original price for the struck-through "was" amount when on sale. */
  wasCents?: number;
  /** Shown in the "Featured items" row. */
  featured?: boolean;
  /**
   * Optional cover image path, e.g. "/products/<slug>/cover-thumb.png".
   * A card renders the cover only when this is set, so a product without
   * one never points at a missing file (no 404). Set this once the cover
   * is produced and installed; leave unset until then.
   */
  image?: string;
};

function label(cents: number): string {
  return cents === 0 ? "Free" : `$${cents / 100}`;
}

// Hand-written entries for everything except the 22 single-topic Compasses
// (those come from COMPASS_CATALOGUE below).
const CORE: Omit<StoreProduct, "priceLabel">[] = [
  // --- printables ---
  {
    slug: "annual-feng-shui-planner-2026",
    href: "/products/annual-feng-shui-planner-2026",
    title: "2026 Feng Shui Planner: Mid-Year Edition",
    oneLiner:
      "More than 80 pages, the 2026 chart, sector treatments, and a 243-day calendar. The rest of the year in one printable book.",
    priceCents: 1900,
    category: "printable",
    featured: true,
  },
  {
    slug: "good-days-calendar-2026",
    href: "/products/good-days-calendar-2026",
    title: "2026 Good-Days Calendar",
    oneLiner:
      "243 days marked Action, Rest, Neutral, or Caution, as a printable PDF and a phone calendar file.",
    priceCents: 900,
    category: "printable",
    // C5 (2026-07-20): the $9 impulse rung for cold shelf-first
    // visitors; the featured row otherwise starts at $19.
    featured: true,
  },
  {
    slug: "bedroom-reset",
    href: "/products/bedroom-reset",
    title: "Bedroom and Relationship Reset",
    oneLiner:
      "The bedroom walked from the door inward, with bed-direction readings for all nine Kua numbers and a couples section.",
    priceCents: 1400,
    category: "printable",
  },
  {
    slug: "business-money-feng-shui",
    href: "/products/business-money-feng-shui",
    title: "Business and Money Feng Shui Kit",
    oneLiner:
      "The office, the desk, the wealth corner, the kitchen stove. The practical money-channel reading for your home and business.",
    priceCents: 1900,
    category: "printable",
  },
  {
    slug: "home-diagnostic-workbook",
    href: "/products/home-diagnostic-workbook",
    title: "10-Step Home Diagnostic Workbook",
    oneLiner:
      "Audit your own home the way a practitioner would: ten steps, fill-in worksheets, and a 90-day re-evaluation.",
    priceCents: 1400,
    category: "printable",
  },
  {
    slug: "daily-ritual-pack",
    href: "/products/daily-ritual-pack",
    title: "Daily Ritual and Twenty Laws Pack",
    oneLiner:
      "The twenty traditional laws as printable cards, plus morning and evening checklists for a calm daily rhythm.",
    priceCents: 900,
    category: "printable",
  },
  {
    slug: "cures-catalog",
    href: "/products/cures-catalog",
    title: "Cures and Crystals Catalogue",
    oneLiner:
      "Every cure and crystal as a compact reference card: what it is, where it goes, and what the tradition says.",
    priceCents: 900,
    category: "printable",
  },
  {
    slug: "healthy-home-audit",
    href: "/products/healthy-home-audit",
    title: "Healthy Home Audit",
    oneLiner:
      "Nine conditions a home can support - air, light, damp, sound, more - audited with worksheets. No medical claims.",
    priceCents: 1900,
    category: "printable",
  },
  {
    slug: "five-elements-workbook",
    href: "/products/five-elements-workbook",
    title: "Five Elements Home Styling Workbook",
    oneLiner:
      "Read any room in five words - Wood, Fire, Earth, Metal, Water - and learn the two rules of what belongs next to what.",
    priceCents: 1200,
    category: "printable",
  },
  {
    slug: "starter-deck",
    href: "/products/starter-deck",
    title: "Learn Feng Shui Starter Deck",
    oneLiner:
      "Twenty-four printable flashcards of the working vocabulary, a bagua grid, and the first five moves a beginner makes.",
    priceCents: 900,
    category: "printable",
  },
  {
    slug: "bazi-basics",
    href: "/products/bazi-basics",
    title: "BaZi Basics: Read Your Own Chart",
    oneLiner:
      "An educational primer on the four pillars and the Ten Gods: read your own birth chart, and know where the reading stops.",
    priceCents: 1400,
    category: "printable",
  },
  // --- personalised (single reports; the 22 Compasses are added below) ---
  {
    slug: "personal-feng-shui-compass",
    href: "/products/personal-feng-shui-compass",
    title: "Personal Feng Shui Compass",
    oneLiner:
      "Your Kua read in depth: four supportive directions, four to handle with care, and a seven-day experiment to test it.",
    priceCents: 1900,
    category: "personalised",
    featured: true,
  },
  {
    slug: "extended-personal-kua-report",
    href: "/products/extended-personal-kua-report",
    title: "Extended Personal Kua Report",
    oneLiner:
      "The deep reading: your eight directions plus your bedroom, desk, and dining seat read for your Kua, a compatibility chapter, and a 2026 overlay.",
    priceCents: 3900,
    category: "personalised",
  },
  {
    slug: "move-in-kit",
    href: "/products/move-in-kit",
    title: "Move-In Date Report",
    oneLiner:
      "Your move-in window read day by day against the 2026 calendar, your Kua directions for the new home, and a first-week checklist.",
    priceCents: 2900,
    category: "personalised",
  },
  {
    slug: "couple-compatibility-compass",
    href: "/products/couple-compatibility-compass",
    title: "Couple Compatibility Compass",
    oneLiner:
      "Two people, one home: both Kua maps read together. Where you agree, where to take turns, and how to settle the shared bed and table.",
    priceCents: 1900,
    category: "personalised",
  },
  // --- bundles ---
  {
    slug: "complete-home-compass",
    href: "/products/complete-home-compass",
    title: "Complete Home Compass",
    oneLiner:
      "The flagship: your eight directions, compatibility, all twelve rooms, all nine life areas, and the 2026 overlay, read for your Kua in one volume.",
    priceCents: 4900,
    category: "bundle",
    featured: true,
  },
  {
    slug: "all-twelve-spaces-compass",
    href: "/products/all-twelve-spaces-compass",
    title: "Twelve Spaces Compass",
    oneLiner:
      "Every room read for your Kua in one PDF: bedroom, office, dining, kitchen, living room, bathroom, entrance, hallway, storage, laundry, balcony, garage.",
    priceCents: 2900,
    category: "bundle",
  },
  {
    slug: "all-nine-pillars-compass",
    href: "/products/all-nine-pillars-compass",
    title: "Nine Life Areas Compass",
    oneLiner:
      "All nine bagua life-area corners read for your Kua: wealth, recognition, relationships, creativity, helpful people, career, knowledge, family, health.",
    priceCents: 2900,
    category: "bundle",
  },
  {
    slug: "whole-home-starter-bundle",
    href: "/products/whole-home-starter-bundle",
    title: "Whole-Home Starter Bundle",
    oneLiner:
      "The Diagnostic Workbook, the Ritual Pack, and the Cures Catalogue together: audit, rhythm, cures. Three PDFs, one price.",
    priceCents: 2900,
    category: "bundle",
  },
  {
    slug: "pick-three-pillars",
    href: "/products/pick-three-pillars",
    title: "Three Life Areas Compass",
    oneLiner:
      "Build your own bundle: choose any three of the nine life areas and get each read for your Kua, in one PDF.",
    priceCents: 1700,
    category: "bundle",
  },
  {
    slug: "pick-three-spaces",
    href: "/products/pick-three-spaces",
    title: "Three Spaces Compass",
    oneLiner:
      "Build your own bundle: choose any three rooms and get each read for your Kua, in one PDF.",
    priceCents: 1700,
    category: "bundle",
  },
  // --- course ---
  {
    slug: "seven-day-home-reset",
    href: "/products/seven-day-home-reset",
    title: "7-Day Home Reset",
    oneLiner:
      "A seven-day email course: one short email a day, one small task each, room by room. Nothing to buy, nothing to redecorate.",
    priceCents: 1900,
    category: "course",
  },
  // --- free tool ---
  {
    slug: "kua-calculator",
    href: "/kua-calculator",
    title: "Kua Number Calculator",
    oneLiner:
      "Your Kua number and your eight personal directions, in ten seconds. Always free.",
    priceCents: 0,
    category: "free",
  },
];

const CATALOGUE: Omit<StoreProduct, "priceLabel">[] = COMPASS_CATALOGUE.map(
  (e) => ({
    slug: e.slug,
    href: `/products/${e.slug}`,
    title: `${e.topicLabel} Compass`,
    oneLiner: e.oneLiner,
    priceCents: e.priceCents,
    category: "personalised" as const,
  }),
);

export const STORE_PRODUCTS: StoreProduct[] = [...CORE, ...CATALOGUE].map(
  (p) => ({
    ...p,
    priceLabel: label(p.priceCents),
    // Shop-card cover: prefer the booklet mockup (real PDF cover on a soft
    // background), fall back to the flat square thumb, else text-first (so
    // nothing 404s).
    image: MOCKUP_COVER_SLUGS.has(p.slug)
      ? `/products/${p.slug}/cover-mockup.png`
      : CARD_COVER_SLUGS.has(p.slug)
        ? `/products/${p.slug}/cover-thumb.png`
        : undefined,
  }),
);

// ----- Phase C: curated collections for the /products page -----
//
// The /products page is a curated, grouped browse. The six featured
// products are the clearest starting points and appear only at the top.
// Every other product appears in exactly one place below: the 12 single-
// space compasses and 9 single-pillar compasses are the "Choose by room"
// and "Choose by life area" selectors; the remaining products fall into
// one named card-group. No product or route is removed.

const BY_SLUG: Record<string, StoreProduct> = Object.fromEntries(
  STORE_PRODUCTS.map((p) => [p.slug, p]),
);

function pick(slugs: readonly string[]): StoreProduct[] {
  return slugs.map((s) => BY_SLUG[s]).filter(Boolean) as StoreProduct[];
}

/* ------------------------------------------------------------------
 * Curated shelf (shop-redesign A4, owner-approved 2026-07-17).
 * These three lists are the ONLY products shown on /products. Every
 * other product keeps its live URL and stays buyable, but is delisted
 * from the shop, the search index, and the sitemap. Love/relationship
 * products live on myfengshuilove.com only.
 * ------------------------------------------------------------------ */

/** The ladder: the primary three-tier decision, in display order. */
export const LADDER_SLUGS: readonly string[] = [
  "personal-feng-shui-compass",
  "all-twelve-spaces-compass",
  "complete-home-compass",
];

/** Situational products: shown small, below the ladder. */
export const MOMENT_SLUGS: readonly string[] = [
  "move-in-kit",
  "seven-day-home-reset",
];

/** Printable kits + the remaining part-bundle. */
export const KIT_SLUGS: readonly string[] = [
  "all-nine-pillars-compass",
  "business-money-feng-shui",
  "whole-home-starter-bundle",
  "cures-catalog",
];

/** Everything visible on the shop, and the search/sitemap allowlist. */
export const VISIBLE_SLUGS: readonly string[] = [
  ...LADDER_SLUGS,
  ...MOMENT_SLUGS,
  ...KIT_SLUGS,
];

export function ladderProducts(): StoreProduct[] {
  return pick(LADDER_SLUGS);
}

export function momentProducts(): StoreProduct[] {
  return pick(MOMENT_SLUGS);
}

export function kitProducts(): StoreProduct[] {
  return pick(KIT_SLUGS);
}
