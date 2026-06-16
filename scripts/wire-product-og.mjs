// Phase F: add the generated OG image to the non-compass product pages.
// The 22 compass pages get it from gen-compass-pages.mjs; the Planner
// already has its real cover-thumb OG (left as-is). This codemod inserts
// an openGraph.images entry pointing at /api/og/product/<slug> right after
// the openGraph url line. Idempotent: a page that already references
// /api/og/product/ is skipped.
//
// Usage: node scripts/wire-product-og.mjs

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ROOT =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator/app/(site)/products";

const SLUGS = [
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
  "personal-feng-shui-compass",
  "extended-personal-kua-report",
  "move-in-kit",
  "complete-home-compass",
  "couple-compatibility-compass",
  "all-nine-pillars-compass",
  "all-twelve-spaces-compass",
  "pick-three-pillars",
  "pick-three-spaces",
  "whole-home-starter-bundle",
  "seven-day-home-reset",
];

let wired = 0;
const skipped = [];

for (const slug of SLUGS) {
  const path = `${ROOT}/${slug}/page.tsx`;
  if (!existsSync(path)) {
    skipped.push(`${slug}: page not found`);
    continue;
  }
  let src = readFileSync(path, "utf-8");
  if (src.includes("/api/og/product/")) {
    skipped.push(`${slug}: already wired`);
    continue;
  }

  // Insert images right after the openGraph url line (the line that uses
  // `url:` and points at /products/<slug>; the alternates block uses
  // `canonical:` so it is not matched).
  const re = new RegExp(
    `(\\n( *)url: "https://myfengshuihome\\.com/products/${slug}",\\n)`,
  );
  if (!re.test(src)) {
    skipped.push(`${slug}: openGraph url anchor missing`);
    continue;
  }
  src = src.replace(re, (m, line, indent) => {
    const pad = indent;
    return `${line}${pad}images: [\n${pad}  {\n${pad}    url: "https://myfengshuihome.com/api/og/product/${slug}",\n${pad}    width: 1200,\n${pad}    height: 630,\n${pad}  },\n${pad}],\n`;
  });

  writeFileSync(path, src);
  wired++;
  console.log(`wired og ${slug}`);
}

console.log(`\n${wired} wired, ${skipped.length} skipped.`);
for (const s of skipped) console.log(`  - ${s}`);
