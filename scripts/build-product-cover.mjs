// Render faithful SAMPLE cover previews for the personalised products
// (Compass, Extended Kua Report, Move-In Date Report). Their real covers
// are generated per-buyer with the buyer's name and Kua, so these are
// labelled sample covers that match the PDF cover design (lib/pdf/
// template.ts): white paper, the olive M-shield mark, the brand eyebrow,
// a hairline rule, the title with a clay-italic accent word, and a
// "KUA N - GROUP" line.
//
// Uses @resvg/resvg-js with the bundled Hanken Grotesk TTFs (the same
// way the chart-image route renders text on Vercel's font-less Linux).
//
// Usage: node scripts/build-product-cover.mjs

import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";

const FONT_DIR =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator/lib/fonts";
const FONT_FILES = [
  `${FONT_DIR}/HankenGrotesk-Regular.ttf`,
  `${FONT_DIR}/HankenGrotesk-Bold.ttf`,
  `${FONT_DIR}/HankenGrotesk-ExtraBold.ttf`,
];
const OUT_BASE =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator/public/products";

const OLIVE = "#0e3b2c";
const CLAY = "#d9531a";
const INK2 = "#4f5b53";
const SAND = "#e2dac5";

// The M-shield mark, olive, scaled into a 120x120 box centred at x=512.
const MARK = `<svg x="452" y="150" width="120" height="120" viewBox="0 0 709 709">
  <g transform="translate(0,709) scale(0.1,-0.1)" fill="${OLIVE}" stroke="none">
    <path d="M2099 6066 c-360 -52 -679 -212 -929 -466 -423 -429 -566 -1046 -376 -1615 47 -140 104 -256 188 -381 62 -93 172 -206 1314 -1343 l1247 -1241 516 509 c284 280 852 846 1262 1258 794 797 793 795 890 993 439 885 -19 1938 -969 2230 -171 52 -259 64 -462 64 -151 0 -205 -4 -296 -22 -225 -45 -416 -124 -599 -247 -100 -68 -182 -146 -915 -874 l-805 -800 250 0 250 -1 690 683 c750 741 732 725 936 814 357 154 811 121 1138 -85 317 -199 517 -494 576 -852 25 -147 17 -368 -19 -503 -29 -111 -74 -221 -137 -335 -39 -70 -109 -143 -749 -785 -388 -390 -897 -897 -1131 -1128 l-426 -419 -1107 1102 c-616 612 -1126 1128 -1150 1162 -247 348 -286 836 -99 1234 115 243 323 454 571 577 387 191 853 168 1217 -60 l83 -52 126 126 125 126 -42 30 c-199 143 -418 239 -653 285 -140 28 -380 35 -515 16z" />
    <path d="M3904 4889 l-121 -121 321 -319 321 -318 250 -1 250 0 -440 440 c-242 242 -444 440 -450 440 -6 0 -65 -54 -131 -121z" />
    <path d="M3486 4326 c-57 -21 -88 -47 -116 -97 -51 -92 -18 -210 74 -264 92 -54 218 -22 270 68 32 56 40 97 27 145 -32 116 -152 186 -255 148z" />
    <path d="M2660 3330 l0 -470 885 0 885 0 0 470 0 470 -175 0 -175 0 0 -290 0 -290 -535 0 -535 0 0 290 0 290 -175 0 -175 0 0 -470z" />
  </g>
</svg>`;

const FAMILY = "Hanken Grotesk";

function cover({ lines, accentIndex, kuaLine }) {
  const titleStartY = 660;
  const lineH = 78;
  const titleEls = lines
    .map((ln, i) => {
      const y = titleStartY + i * lineH;
      const fill = i === accentIndex ? CLAY : OLIVE;
      const style = i === accentIndex ? `font-style="italic"` : "";
      return `<text x="512" y="${y}" font-family="${FAMILY}" font-size="62" font-weight="800" ${style} fill="${fill}" text-anchor="middle">${ln}</text>`;
    })
    .join("\n  ");

  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1536" viewBox="0 0 1024 1536">
  <rect x="0" y="0" width="1024" height="1536" fill="#ffffff"/>
  ${MARK}
  <text x="512" y="330" font-family="${FAMILY}" font-size="22" font-weight="700" fill="${OLIVE}" text-anchor="middle" letter-spacing="7">MY FENG SHUI HOME</text>
  <line x1="472" y1="372" x2="552" y2="372" stroke="${SAND}" stroke-width="2"/>
  ${titleEls}
  <text x="512" y="1360" font-family="${FAMILY}" font-size="23" font-weight="700" fill="${OLIVE}" text-anchor="middle" letter-spacing="3">${kuaLine}</text>
  <text x="512" y="1404" font-family="${FAMILY}" font-size="17" font-weight="400" fill="${INK2}" text-anchor="middle">A sample cover</text>
</svg>`;
}

const COVERS = [
  {
    slug: "personal-feng-shui-compass",
    lines: ["Maya's", "Personal Feng Shui", "Compass"],
    accentIndex: 2,
    kuaLine: "KUA 4 · EAST GROUP",
  },
  {
    slug: "extended-personal-kua-report",
    lines: ["Maya's", "Extended Personal", "Kua Report"],
    accentIndex: 2,
    kuaLine: "KUA 4 · EAST GROUP",
  },
  {
    slug: "move-in-kit",
    lines: ["Maya's", "Move-In", "Date Report"],
    accentIndex: 2,
    kuaLine: "KUA 4 · EAST GROUP",
  },
];

for (const c of COVERS) {
  const svg = cover(c);
  const resvg = new Resvg(Buffer.from(svg), {
    fitTo: { mode: "width", value: 1024 },
    font: {
      fontFiles: FONT_FILES,
      loadSystemFonts: false,
      defaultFontFamily: FAMILY,
    },
    background: "#ffffff",
  });
  const png = resvg.render().asPng();
  mkdirSync(`${OUT_BASE}/${c.slug}`, { recursive: true });
  const out = `${OUT_BASE}/${c.slug}/cover-portrait.png`;
  writeFileSync(out, png);
  console.log(`wrote ${out} (${png.length} bytes)`);
}
