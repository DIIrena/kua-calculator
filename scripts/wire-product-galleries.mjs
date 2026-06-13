// One-time wiring: insert <ProductGallery> into each static product page,
// just after the hero, before the first "product-section". Idempotent:
// re-running is a no-op for already-wired pages.
//
// Usage: node scripts/wire-product-galleries.mjs

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ROOT =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator/app/(site)/products";

const PRODUCTS = [
  ["bedroom-reset", "Bedroom and Relationship Reset"],
  ["business-money-feng-shui", "Business and Money Feng Shui Kit"],
  ["home-diagnostic-workbook", "10-Step Home Diagnostic Workbook"],
  ["daily-ritual-pack", "Daily Ritual and Twenty Laws Pack"],
  ["cures-catalog", "Cures and Crystals Catalogue"],
  ["healthy-home-audit", "Healthy Home Audit"],
  ["five-elements-workbook", "Five Elements Home Styling Workbook"],
  ["starter-deck", "Learn Feng Shui Starter Deck"],
  ["bazi-basics", "BaZi Basics: Read Your Own Chart"],
  ["good-days-calendar-2026", "2026 Good-Days Calendar"],
];

const IMPORT_ANCHOR = `import BuyButton from "@/components/BuyButton";`;
const IMPORT_LINE = `import ProductGallery from "@/components/ProductGallery";`;
const SECTION_ANCHOR = `      <section className="product-section">`;

let wired = 0;
const skipped = [];

for (const [slug, title] of PRODUCTS) {
  const path = `${ROOT}/${slug}/page.tsx`;
  if (!existsSync(path)) {
    skipped.push(`${slug}: page not found`);
    continue;
  }
  let src = readFileSync(path, "utf-8");
  if (src.includes("ProductGallery")) {
    skipped.push(`${slug}: already wired`);
    continue;
  }
  if (!src.includes(IMPORT_ANCHOR) || !src.includes(SECTION_ANCHOR)) {
    skipped.push(`${slug}: anchor missing (import=${src.includes(IMPORT_ANCHOR)}, section=${src.includes(SECTION_ANCHOR)})`);
    continue;
  }

  // 1. import, right after the BuyButton import.
  src = src.replace(IMPORT_ANCHOR, `${IMPORT_ANCHOR}\n${IMPORT_LINE}`);

  // 2. element, just before the first product-section (i.e. after the hero).
  const gallery = `      <ProductGallery slug="${slug}" title="${title}" />\n\n${SECTION_ANCHOR}`;
  src = src.replace(SECTION_ANCHOR, gallery); // replaces the FIRST occurrence

  writeFileSync(path, src);
  wired++;
  console.log(`wired ${slug}`);
}

console.log(`\n${wired} wired, ${skipped.length} skipped.`);
for (const s of skipped) console.log(`  - ${s}`);
