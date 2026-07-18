// Which on-disk cover/sample assets each product actually has. This is
// the single source of truth that keeps the guarded ProductPreview from
// ever pointing at a missing file, and that decides which shop cards show
// a real cover. Update it when the owner installs new artwork.
//
//   full  = cover-portrait.png + sample-2.png + sample-3.png (Look inside)
//   cover = cover-portrait.png only (a labelled sample cover)
//   none  = no artwork yet (honest "what you receive" anchor, no fake cover)
//
// Client-safe: no node:fs, so storefront.ts (a client import) can use it.

export type ProductAssetLevel = "full" | "cover" | "none";

const LEVELS: Record<string, ProductAssetLevel> = {
  // full = cover-portrait.png + sample-2.png + sample-3.png ("Look inside")
  "good-days-calendar-2026": "full",
  "bedroom-reset": "full",
  "business-money-feng-shui": "full",
  "home-diagnostic-workbook": "full",
  "daily-ritual-pack": "full",
  "cures-catalog": "full",
  "healthy-home-audit": "full",
  "five-elements-workbook": "full",
  "starter-deck": "full",
  "bazi-basics": "full",
  // cover = cover-portrait.png only. The Planner has a cover-portrait and
  // renders its own cover on the page; its sample pages are named
  // differently, so it is intentionally not a ProductPreview "full".
  "annual-feng-shui-planner-2026": "cover",
  // Compass v2 (2026-07-17): interior sample pages regenerated from the
  // corrected 45-page sample render (Maya, Kua 4) - the at-a-glance card
  // and the Sheng Qi chapter opener.
  "personal-feng-shui-compass": "full",
  "extended-personal-kua-report": "cover",
  "move-in-kit": "cover",
  "complete-home-compass": "cover",
  "couple-compatibility-compass": "cover",
  "seven-day-home-reset": "cover",
  "all-twelve-spaces-compass": "cover",
  "all-nine-pillars-compass": "cover",
};

export function assetLevel(slug: string): ProductAssetLevel {
  return LEVELS[slug] ?? "none";
}

// Products that have a square cover-thumb.png for their shop card. Cards
// for everything else stay text-first (no placeholder), so nothing 404s.
export const CARD_COVER_SLUGS: ReadonlySet<string> = new Set([
  "annual-feng-shui-planner-2026",
  "good-days-calendar-2026",
  "bedroom-reset",
  "business-money-feng-shui",
  "home-diagnostic-workbook",
  "daily-ritual-pack",
  "cures-catalog",
  "healthy-home-audit",
  "five-elements-workbook",
  "starter-deck",
  "bazi-basics",
  "complete-home-compass",
  "personal-feng-shui-compass",
  "couple-compatibility-compass",
  "move-in-kit",
  "seven-day-home-reset",
  "all-twelve-spaces-compass",
  "all-nine-pillars-compass",
]);

// Products that ship a booklet-mockup cover (cover-mockup.png) for the
// shop card: the real PDF cover composited as a printed book on a soft
// background. Preferred over the flat cover-thumb.png when present.
// Built by scripts/build-mockup-cover.mjs.
export const MOCKUP_COVER_SLUGS: ReadonlySet<string> = new Set([
  "personal-feng-shui-compass",
  "all-twelve-spaces-compass",
  "complete-home-compass",
  "move-in-kit",
  "seven-day-home-reset",
  "all-nine-pillars-compass",
  "business-money-feng-shui",
  "cures-catalog",
]);

// Optional page-count copy, used in the "what you receive" anchor only
// where the figure is genuinely known. Omitted = not shown.
export const KNOWN_PAGES: Record<string, string> = {
  "complete-home-compass": "around 115 to 165 pages",
};
