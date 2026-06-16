// Phase E one-time wiring for the non-compass, non-planner product pages.
// Consolidates onto the guarded <ProductPreview> and adds the shared
// <FulfillmentBlock> before the buy section. Idempotent: a page that
// already has FulfillmentBlock is skipped. The 22 compass pages are
// handled by gen-compass-pages.mjs; the Planner is wired by hand.
//
// Usage: node scripts/wire-phase-e.mjs

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ROOT =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator/app/(site)/products";

const BUY_IMPORT = `import BuyButton from "@/components/BuyButton";`;
const PREVIEW_IMPORT = `import ProductPreview from "@/components/ProductPreview";`;
const FULFIL_IMPORT = `import FulfillmentBlock from "@/components/FulfillmentBlock";`;
const FIRST_SECTION = `      <section className="product-section">`;
const BUY_SECTION = `      <section className="product-buy-section">`;

// [slug, action, title]
//   gallery = replace <ProductGallery> with <ProductPreview>
//   cover   = replace <ProductCoverPreview> with <ProductPreview>
//   insert  = no preview yet; insert <ProductPreview> after the hero
const PAGES = [
  ["good-days-calendar-2026", "gallery", null],
  ["bedroom-reset", "gallery", null],
  ["business-money-feng-shui", "gallery", null],
  ["home-diagnostic-workbook", "gallery", null],
  ["daily-ritual-pack", "gallery", null],
  ["cures-catalog", "gallery", null],
  ["healthy-home-audit", "gallery", null],
  ["five-elements-workbook", "gallery", null],
  ["starter-deck", "gallery", null],
  ["bazi-basics", "gallery", null],
  ["personal-feng-shui-compass", "cover", null],
  ["extended-personal-kua-report", "cover", null],
  ["move-in-kit", "cover", null],
  ["complete-home-compass", "insert", "Complete Home Compass"],
  ["couple-compatibility-compass", "insert", "Couple Compatibility Compass"],
  ["all-nine-pillars-compass", "insert", "Nine Life Areas Compass"],
  ["all-twelve-spaces-compass", "insert", "Twelve Spaces Compass"],
  ["pick-three-pillars", "insert", "Three Life Areas Compass"],
  ["pick-three-spaces", "insert", "Three Spaces Compass"],
  ["whole-home-starter-bundle", "insert", "Whole-Home Starter Bundle"],
  ["seven-day-home-reset", "insert", "7-Day Home Reset"],
];

let wired = 0;
const skipped = [];

for (const [slug, action, title] of PAGES) {
  const path = `${ROOT}/${slug}/page.tsx`;
  if (!existsSync(path)) {
    skipped.push(`${slug}: page not found`);
    continue;
  }
  let src = readFileSync(path, "utf-8");
  if (src.includes("FulfillmentBlock")) {
    skipped.push(`${slug}: already wired`);
    continue;
  }
  if (!src.includes(BUY_IMPORT) || !src.includes(BUY_SECTION)) {
    skipped.push(`${slug}: buy anchor missing`);
    continue;
  }

  // 1. Preview: migrate or insert.
  if (action === "gallery") {
    src = src
      .replace(
        `import ProductGallery from "@/components/ProductGallery";`,
        PREVIEW_IMPORT,
      )
      .replaceAll("<ProductGallery ", "<ProductPreview ");
  } else if (action === "cover") {
    src = src
      .replace(
        `import ProductCoverPreview from "@/components/ProductCoverPreview";`,
        PREVIEW_IMPORT,
      )
      .replaceAll("<ProductCoverPreview ", "<ProductPreview ");
  } else {
    // insert: add the import + the element after the hero.
    if (!src.includes(PREVIEW_IMPORT)) {
      src = src.replace(BUY_IMPORT, `${BUY_IMPORT}\n${PREVIEW_IMPORT}`);
    }
    if (!src.includes(FIRST_SECTION)) {
      skipped.push(`${slug}: first product-section anchor missing`);
      continue;
    }
    src = src.replace(
      FIRST_SECTION,
      `      <ProductPreview slug="${slug}" title="${title}" />\n\n${FIRST_SECTION}`,
    );
  }

  // 2. FulfillmentBlock import (after BuyButton import).
  if (!src.includes(FULFIL_IMPORT)) {
    src = src.replace(BUY_IMPORT, `${BUY_IMPORT}\n${FULFIL_IMPORT}`);
  }

  // 3. FulfillmentBlock element, just before the buy section.
  src = src.replace(
    BUY_SECTION,
    `      <FulfillmentBlock slug="${slug}" />\n\n${BUY_SECTION}`,
  );

  writeFileSync(path, src);
  wired++;
  console.log(`wired ${slug} (${action})`);
}

console.log(`\n${wired} wired, ${skipped.length} skipped.`);
for (const s of skipped) console.log(`  - ${s}`);
