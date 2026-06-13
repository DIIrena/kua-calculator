// Build + render the 2026 Annual Planner Pinterest pin (1000x1500).
//
// Same brand structure as the compass-chart pin (green top banner with
// the orange heart-house logo, ivory middle, green URL strip), but this
// one features the real planner cover (embedded as base64) and uses
// Cormorant Garamond instead of EB Garamond.
//
// Usage: node scripts/build-planner-pin.mjs

import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const COVER =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/annual-feng-shui-planner/build/2026/cover-portrait.png";
const OUT_DIR = "c:/Users/User/Desktop/MFSH Pins/02 Planner";
const EXPORT_DIR = `${OUT_DIR}/exports`;
mkdirSync(EXPORT_DIR, { recursive: true });

const coverB64 = readFileSync(COVER).toString("base64");

// The heart-house mark, reused from the compass pin (same glyph space,
// same centred placement at 1000 wide).
const LOGO = `<g transform="translate(420,46) scale(0.02256)">
  <g transform="translate(0,7090) scale(1,-1)" fill="#d9531a" stroke="none">
    <path d="M2099 6066 c-360 -52 -679 -212 -929 -466 -423 -429 -566 -1046 -376 -1615 47 -140 104 -256 188 -381 62 -93 172 -206 1314 -1343 l1247 -1241 516 509 c284 280 852 846 1262 1258 794 797 793 795 890 993 439 885 -19 1938 -969 2230 -171 52 -259 64 -462 64 -151 0 -205 -4 -296 -22 -225 -45 -416 -124 -599 -247 -100 -68 -182 -146 -915 -874 l-805 -800 250 0 250 -1 690 683 c750 741 732 725 936 814 357 154 811 121 1138 -85 317 -199 517 -494 576 -852 25 -147 17 -368 -19 -503 -29 -111 -74 -221 -137 -335 -39 -70 -109 -143 -749 -785 -388 -390 -897 -897 -1131 -1128 l-426 -419 -1107 1102 c-616 612 -1126 1128 -1150 1162 -247 348 -286 836 -99 1234 115 243 323 454 571 577 387 191 853 168 1217 -60 l83 -52 126 126 125 126 -42 30 c-199 143 -418 239 -653 285 -140 28 -380 35 -515 16z"/>
    <path d="M3904 4889 l-121 -121 321 -319 321 -318 250 -1 250 0 -440 440 c-242 242 -444 440 -450 440 -6 0 -65 -54 -131 -121z"/>
    <path d="M3486 4326 c-57 -21 -88 -47 -116 -97 -51 -92 -18 -210 74 -264 92 -54 218 -22 270 68 32 56 40 97 27 145 -32 116 -152 186 -255 148z"/>
    <path d="M2660 3330 l0 -470 885 0 885 0 0 470 0 470 -175 0 -175 0 0 -290 0 -290 -535 0 -535 0 0 290 0 290 -175 0 -175 0 0 -470z"/>
  </g>
</g>`;

const FONT = "Cormorant Garamond, Garamond, serif";

const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500" viewBox="0 0 1000 1500">
  <!-- Backgrounds -->
  <rect x="0" y="0" width="1000" height="430" fill="#0e3b2c"/>
  <rect x="0" y="430" width="1000" height="958" fill="#fcfcf8"/>
  <rect x="0" y="1388" width="1000" height="112" fill="#0e3b2c"/>
  <line x1="0" y1="430" x2="1000" y2="430" stroke="#d9531a" stroke-width="2"/>

  ${LOGO}

  <!-- Headline (benefit hook) -->
  <text x="500" y="278" font-family="${FONT}" font-size="62" font-weight="700" fill="#fcfcf8" text-anchor="middle">Plan your 2026,</text>
  <text x="500" y="352" font-family="${FONT}" font-size="62" font-weight="700" fill="#fcfcf8" text-anchor="middle">room by room.</text>

  <!-- The cover, with a thin frame -->
  <rect x="297" y="487" width="406" height="606" fill="none" stroke="#d9cdb9" stroke-width="2"/>
  <image x="300" y="490" width="400" height="600" href="data:image/png;base64,${coverB64}"/>

  <!-- Product name -->
  <text x="500" y="1158" font-family="${FONT}" font-size="33" font-weight="600" fill="#0e3b2c" text-anchor="middle">The 2026 Feng Shui Planner</text>

  <!-- Facts -->
  <text x="500" y="1205" font-family="${FONT}" font-size="23" font-weight="500" fill="#4f5b53" text-anchor="middle">98 printable pages  -  243-day calendar</text>
  <text x="500" y="1242" font-family="${FONT}" font-size="23" font-weight="500" fill="#4f5b53" text-anchor="middle">July 2026 to February 2027</text>
  <text x="500" y="1279" font-family="${FONT}" font-size="21" font-weight="500" fill="#4f5b53" text-anchor="middle">PDF, EPUB, and a phone calendar file</text>

  <!-- Price -->
  <text x="500" y="1348" font-family="${FONT}" text-anchor="middle">
    <tspan font-size="42" font-weight="700" fill="#d9531a">$19</tspan><tspan font-size="24" font-weight="500" fill="#4f5b53">  one-time</tspan>
  </text>

  <!-- URL strip -->
  <text x="500" y="1458" font-family="${FONT}" font-size="34" font-weight="600" fill="#fcfcf8" text-anchor="middle" letter-spacing="2">myfengshuihome.com</text>
</svg>
`;

const svgPath = `${OUT_DIR}/planner-pin.svg`;
writeFileSync(svgPath, svg);

const resvg = new Resvg(Buffer.from(svg), {
  fitTo: { mode: "width", value: 1000 },
  font: { loadSystemFonts: true, defaultFontFamily: "Cormorant Garamond" },
  background: "#fcfcf8",
});
const png = resvg.render().asPng();
const pngPath = `${EXPORT_DIR}/planner-pin-2026-06-13.png`;
writeFileSync(pngPath, png);
console.log(`SVG: ${svgPath}`);
console.log(`PNG: ${pngPath} (${png.length} bytes)`);
