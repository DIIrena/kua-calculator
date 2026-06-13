// One-time wiring: insert <ProductCoverPreview> into the three
// personalised product pages, just after the hero. Idempotent.
//
// Usage: node scripts/wire-cover-previews.mjs

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ROOT =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator/app/(site)/products";

const PRODUCTS = [
  ["personal-feng-shui-compass", "Personal Feng Shui Compass"],
  ["extended-personal-kua-report", "Extended Personal Kua Report"],
  ["move-in-kit", "Move-In Date Report"],
];

const IMPORT_ANCHOR = `import BuyButton from "@/components/BuyButton";`;
const IMPORT_LINE = `import ProductCoverPreview from "@/components/ProductCoverPreview";`;
const SECTION_ANCHOR = `      <section className="product-section">`;

let wired = 0;
const skipped = [];

for (const [slug, title] of PRODUCTS) {
  const path = `${ROOT}/${slug}/page.tsx`;
  if (!existsSync(path)) {
    skipped.push(`${slug}: not found`);
    continue;
  }
  let src = readFileSync(path, "utf-8");
  if (src.includes("ProductCoverPreview")) {
    skipped.push(`${slug}: already wired`);
    continue;
  }
  if (!src.includes(IMPORT_ANCHOR) || !src.includes(SECTION_ANCHOR)) {
    skipped.push(`${slug}: anchor missing`);
    continue;
  }
  src = src.replace(IMPORT_ANCHOR, `${IMPORT_ANCHOR}\n${IMPORT_LINE}`);
  const el = `      <ProductCoverPreview slug="${slug}" title="${title}" />\n\n${SECTION_ANCHOR}`;
  src = src.replace(SECTION_ANCHOR, el);
  writeFileSync(path, src);
  wired++;
  console.log(`wired ${slug}`);
}

console.log(`\n${wired} wired, ${skipped.length} skipped.`);
for (const s of skipped) console.log(`  - ${s}`);
