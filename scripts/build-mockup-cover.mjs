// Build square "product mockup" covers for the shop grid: each product's
// real PDF cover (cover-portrait.png) composited as a printed booklet on a
// soft background, with page depth and a drop shadow. Output is a 1500x1500
// cover-mockup.png the shop card points at, so the grid reads like an
// Etsy/Amazon shelf of tangible products instead of repeated text tiles.
//
// SVG -> PNG via @resvg/resvg-js (already a dependency). No fonts needed:
// the cover art is an embedded raster, everything else is vector shapes.
//
// Usage: node scripts/build-mockup-cover.mjs [slug ...]   (default: all)

import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PRODUCTS = resolve(ROOT, "public/products");

// The eight shop products that ship a real PDF cover.
const SLUGS = [
  "personal-feng-shui-compass",
  "all-twelve-spaces-compass",
  "complete-home-compass",
  "move-in-kit",
  "seven-day-home-reset",
  "all-nine-pillars-compass",
  "business-money-feng-shui",
  "cures-catalog",
];

const SIZE = 1500;
const SAND = "#efe8d8"; // soft warm background
const SAND_HI = "#f7f2e6"; // lighter centre
const PAGE = "#efe9dc"; // page-edge fill

// Book geometry: a 2:3 portrait cover, centred, sized to ~68% of canvas.
const BOOK_H = Math.round(SIZE * 0.68);
const BOOK_W = Math.round((BOOK_H * 1024) / 1536);
const BOOK_X = Math.round((SIZE - BOOK_W) / 2);
const BOOK_Y = Math.round((SIZE - BOOK_H) / 2) - 10;

function mockupSvg(dataUri) {
  const r = 12; // cover corner radius
  const pageStep = 5; // page-depth offset per sheet
  const pages = [3, 2, 1] // stacked behind, right side, for thickness
    .map((n) => {
      const dx = n * pageStep;
      return `<rect x="${BOOK_X + dx}" y="${BOOK_Y + dx}" width="${BOOK_W}" height="${BOOK_H}" rx="${r}" fill="${PAGE}" stroke="#e0d8c2" stroke-width="1.5"/>`;
    })
    .join("\n    ");

  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="42%" r="72%">
      <stop offset="0%" stop-color="${SAND_HI}"/>
      <stop offset="100%" stop-color="${SAND}"/>
    </radialGradient>
    <filter id="soft" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="26"/>
      <feOffset dx="0" dy="30" result="o"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.28"/></feComponentTransfer>
      <feMerge><feMergeNode/></feMerge>
    </filter>
    <clipPath id="cover"><rect x="${BOOK_X}" y="${BOOK_Y}" width="${BOOK_W}" height="${BOOK_H}" rx="${r}"/></clipPath>
  </defs>

  <rect x="0" y="0" width="${SIZE}" height="${SIZE}" fill="url(#bg)"/>

  <!-- drop shadow of the book -->
  <rect x="${BOOK_X}" y="${BOOK_Y}" width="${BOOK_W}" height="${BOOK_H}" rx="${r}" fill="#3a3020" filter="url(#soft)"/>

  <!-- page depth behind the cover -->
  ${pages}

  <!-- the real PDF cover -->
  <g clip-path="url(#cover)">
    <image x="${BOOK_X}" y="${BOOK_Y}" width="${BOOK_W}" height="${BOOK_H}" preserveAspectRatio="xMidYMid slice" xlink:href="${dataUri}"/>
  </g>
  <!-- cover hairline + subtle spine sheen -->
  <rect x="${BOOK_X}" y="${BOOK_Y}" width="${BOOK_W}" height="${BOOK_H}" rx="${r}" fill="none" stroke="#d9d0b8" stroke-width="1.5"/>
  <rect x="${BOOK_X}" y="${BOOK_Y}" width="26" height="${BOOK_H}" rx="${r}" fill="#ffffff" opacity="0.10"/>
</svg>`;
}

function build(slug) {
  const src = resolve(PRODUCTS, slug, "cover-portrait.png");
  if (!existsSync(src)) {
    console.log(`skip ${slug} (no cover-portrait.png)`);
    return;
  }
  const b64 = readFileSync(src).toString("base64");
  const dataUri = `data:image/png;base64,${b64}`;
  const svg = mockupSvg(dataUri);
  const png = new Resvg(Buffer.from(svg), {
    fitTo: { mode: "width", value: SIZE },
  })
    .render()
    .asPng();
  const out = resolve(PRODUCTS, slug, "cover-mockup.png");
  writeFileSync(out, png);
  console.log(`wrote ${out} (${(png.length / 1024).toFixed(0)} KB)`);
}

const args = process.argv.slice(2);
const targets = args.length ? args : SLUGS;
for (const slug of targets) build(slug);
