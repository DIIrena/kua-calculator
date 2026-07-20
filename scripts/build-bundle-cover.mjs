// Compose the Whole-Home Starter Bundle cover mockup: the three real
// component covers (diagnostic workbook, daily ritual pack, cures
// catalogue) fanned as a stack on the same soft-sand background as the
// single-book mockups, so the bundle card stops being the one bare tile
// on the shelf (P5).
//
// Output goes to scripts/out/previews/ for the OWNER'S REVIEW first.
// Install into public/products/whole-home-starter-bundle/ only after
// approval (--install does the copy).
//
// Usage:
//   node scripts/build-bundle-cover.mjs            (render for review)
//   node scripts/build-bundle-cover.mjs --install  (approved: install)

import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PRODUCTS = resolve(ROOT, "public/products");
const OUT_DIR = resolve(ROOT, "scripts/out/previews");
mkdirSync(OUT_DIR, { recursive: true });

const COMPONENTS = [
  "home-diagnostic-workbook",
  "daily-ritual-pack",
  "cures-catalog",
];

const SIZE = 1500;
const SAND = "#efe8d8";
const SAND_HI = "#f7f2e6";

// Three books fanned: back-left rotated -7deg, back-right +6deg, the
// front book upright and slightly lower. Same 2:3 ratio as the singles.
const BOOK_H = Math.round(SIZE * 0.56);
const BOOK_W = Math.round((BOOK_H * 1024) / 1536);
const CX = SIZE / 2;

function bookSvg(dataUri, cx, cy, angle, id) {
  const x = Math.round(cx - BOOK_W / 2);
  const y = Math.round(cy - BOOK_H / 2);
  const r = 10;
  return `
  <g transform="rotate(${angle} ${cx} ${cy})">
    <rect x="${x}" y="${y}" width="${BOOK_W}" height="${BOOK_H}" rx="${r}" fill="#3a3020" filter="url(#soft)"/>
    <rect x="${x + 4}" y="${y + 4}" width="${BOOK_W}" height="${BOOK_H}" rx="${r}" fill="#efe9dc" stroke="#e0d8c2" stroke-width="1.5"/>
    <g clip-path="url(#clip-${id})">
      <image x="${x}" y="${y}" width="${BOOK_W}" height="${BOOK_H}" preserveAspectRatio="xMidYMid slice" xlink:href="${dataUri}"/>
    </g>
    <rect x="${x}" y="${y}" width="${BOOK_W}" height="${BOOK_H}" rx="${r}" fill="none" stroke="#d9d0b8" stroke-width="1.5"/>
  </g>`;
}

function clip(id, cx, cy) {
  const x = Math.round(cx - BOOK_W / 2);
  const y = Math.round(cy - BOOK_H / 2);
  return `<clipPath id="clip-${id}"><rect x="${x}" y="${y}" width="${BOOK_W}" height="${BOOK_H}" rx="10"/></clipPath>`;
}

const uris = COMPONENTS.map((slug) => {
  const src = resolve(PRODUCTS, slug, "cover-portrait.png");
  if (!existsSync(src)) {
    console.error(`missing ${src}`);
    process.exit(1);
  }
  return `data:image/png;base64,${readFileSync(src).toString("base64")}`;
});

const positions = [
  { cx: CX - 240, cy: SIZE / 2 - 60, angle: -7 },
  { cx: CX + 240, cy: SIZE / 2 - 60, angle: 6 },
  { cx: CX, cy: SIZE / 2 + 40, angle: 0 },
];

const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="42%" r="72%">
      <stop offset="0%" stop-color="${SAND_HI}"/>
      <stop offset="100%" stop-color="${SAND}"/>
    </radialGradient>
    <filter id="soft" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="22"/>
      <feOffset dx="0" dy="26" result="o"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.26"/></feComponentTransfer>
      <feMerge><feMergeNode/></feMerge>
    </filter>
    ${positions.map((p, i) => clip(i, p.cx, p.cy)).join("\n    ")}
  </defs>
  <rect x="0" y="0" width="${SIZE}" height="${SIZE}" fill="url(#bg)"/>
  ${positions.map((p, i) => bookSvg(uris[i], p.cx, p.cy, p.angle, i)).join("\n")}
</svg>`;

const png = new Resvg(Buffer.from(svg), {
  fitTo: { mode: "width", value: SIZE },
})
  .render()
  .asPng();

const reviewPath = resolve(OUT_DIR, "whole-home-starter-bundle-cover-mockup.png");
writeFileSync(reviewPath, png);
console.log(`review copy: ${reviewPath} (${(png.length / 1024).toFixed(0)} KB)`);

if (process.argv.includes("--install")) {
  const dest = resolve(PRODUCTS, "whole-home-starter-bundle");
  mkdirSync(dest, { recursive: true });
  copyFileSync(reviewPath, resolve(dest, "cover-mockup.png"));
  console.log(`installed: ${resolve(dest, "cover-mockup.png")}`);
  console.log(
    "Remember: add the slug to MOCKUP_COVER_SLUGS in lib/product-assets.ts",
  );
}
