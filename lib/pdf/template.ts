// PDF template assembler. Takes a product, a customer context, and the
// already-rendered HTML of the product's content blocks, and produces
// the full HTML document (head, embedded fonts, cover, body) that
// lib/pdf/render.ts feeds to Chromium.
//
// Fonts are base64-inlined as data: URLs so Chromium does not need to
// fetch them over the network during PDF generation. The TTF files
// live in lib/fonts/ and are bundled by Next file tracing (declared
// in next.config.ts outputFileTracingIncludes).
//
// Brand palette mirrors app/globals.css so the PDF reads as part of
// the same product line as the website.

import { readFileSync } from "node:fs";
import path from "node:path";
import type { Product } from "@/lib/products";
import type { BlockContext } from "@/lib/blocks";
import { brandMarkSvg } from "@/lib/pdf/svg-marks";

// Brand palette - matches the CSS custom properties in globals.css.
const BRAND = {
  paper: "#ffffff",     // cream paper background
  cream: "#fcfcf8",     // canvas (slightly darker than paper)
  ink: "#0e3b2c",       // deep brown for body text
  olive: "#0e3b2c",     // dark olive for accents
  clay: "#d9531a",      // warm clay for emphasis
  sand: "#f2f2ee",      // soft sand for rules / dividers
};

let fontsCache: { regular: string; bold: string; extraBold: string } | null =
  null;

function fontBase64(filename: string): string {
  const filePath = path.join(process.cwd(), "lib", "fonts", filename);
  return readFileSync(filePath).toString("base64");
}

function loadFonts() {
  if (!fontsCache) {
    fontsCache = {
      regular: fontBase64("HankenGrotesk-Regular.ttf"),
      bold: fontBase64("HankenGrotesk-Bold.ttf"),
      extraBold: fontBase64("HankenGrotesk-ExtraBold.ttf"),
    };
  }
  return fontsCache;
}

function formatDate(d: Date = new Date()): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** HTML-escape a string for safe inclusion inside double-quoted CSS
 *  content() values (which is where the customer's first name appears
 *  in the running header). */
function cssEscape(s: string): string {
  return s.replace(/["\\]/g, "\\$&");
}

export function buildHtml(
  product: Product,
  context: BlockContext,
  assembledBlocksHtml: string,
): string {
  const fonts = loadFonts();
  const fullTitle = product.title(context.firstName);
  const groupLabel = context.kuaGroup === "east" ? "East group" : "West group";
  const date = formatDate();

  // Running header text in CSS @page margin box. Escaped so a hypothetical
  // first name with a quote does not break the rule.
  const headerText = cssEscape(fullTitle);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${fullTitle}</title>

<!-- Noto Sans TC for the few Traditional Chinese characters that appear
     parenthetically in the direction chapters. Loaded from Google Fonts
     because the chars are too few to justify bundling a full CJK file
     (which would be 5-7MB). renderToPdf() awaits document.fonts.ready
     so the font is guaranteed to be applied before the PDF is captured. -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap" rel="stylesheet">

<style>
  /* ------------------------------------------------------------------
     Fonts - Hanken Grotesk inlined so Chromium does not need a fetch
     for the body face. The CJK fallback (Noto Sans TC) is loaded via
     the <link> above; only triggers when a CJK glyph is actually
     encountered by the layout engine.
     ------------------------------------------------------------------ */
  @font-face {
    font-family: "Hanken Grotesk";
    font-weight: 400;
    font-style: normal;
    src: url(data:font/ttf;base64,${fonts.regular}) format("truetype");
  }
  @font-face {
    font-family: "Hanken Grotesk";
    font-weight: 700;
    font-style: normal;
    src: url(data:font/ttf;base64,${fonts.bold}) format("truetype");
  }
  @font-face {
    font-family: "Hanken Grotesk";
    font-weight: 800;
    font-style: normal;
    src: url(data:font/ttf;base64,${fonts.extraBold}) format("truetype");
  }

  /* ------------------------------------------------------------------
     Paged-media rules - running header + page number footer.
     Cover page (first :first) suppresses both.
     ------------------------------------------------------------------ */
  @page {
    size: A4;
    margin: 22mm 20mm 22mm 20mm;
    background: ${BRAND.paper};

    @top-center {
      content: "${headerText}";
      font-family: "Hanken Grotesk", "Noto Sans TC", system-ui, sans-serif;
      font-size: 8.5pt;
      color: ${BRAND.olive};
      padding-top: 6mm;
      letter-spacing: 0.02em;
    }

    @bottom-center {
      content: counter(page);
      font-family: "Hanken Grotesk", "Noto Sans TC", system-ui, sans-serif;
      font-size: 9pt;
      color: ${BRAND.ink};
      padding-bottom: 6mm;
    }
  }

  @page :first {
    @top-center { content: ""; }
    @bottom-center { content: ""; }
  }

  /* ------------------------------------------------------------------
     Base typography.
     ------------------------------------------------------------------ */
  html, body {
    margin: 0;
    padding: 0;
    background: ${BRAND.paper};
    color: ${BRAND.ink};
    font-family: "Hanken Grotesk", "Noto Sans TC", system-ui, -apple-system, sans-serif;
    font-size: 11pt;
    line-height: 1.65;
  }

  p {
    margin: 0 0 3.5mm 0;
    orphans: 3;
    widows: 3;
  }

  /* Body paragraphs inside chapter blocks are justified, with auto
     hyphenation to keep word-spacing even. Cover, headings, pull-
     quotes, lists, and bullets are NOT justified - the more specific
     rules below override this where needed. */
  .block p {
    text-align: justify;
    hyphens: auto;
    -webkit-hyphens: auto;
  }

  /* Traditional Chinese spans: bind the language hint to Noto Sans TC
     explicitly so Chromium does not have to guess for font selection,
     and so PDF readers / screen readers see a tagged zh-Hant run. */
  [lang="zh-Hant"] {
    font-family: "Noto Sans TC", "Hanken Grotesk", sans-serif;
  }

  strong { font-weight: 700; color: ${BRAND.ink}; }
  em     { font-style: italic; }

  h1, h2, h3 {
    color: ${BRAND.ink};
    page-break-after: avoid;
  }

  /* ------------------------------------------------------------------
     Cover.
     ------------------------------------------------------------------ */
  .cover {
    page-break-after: always;
    height: 253mm; /* A4 297mm minus 22mm margins top+bottom */
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .cover-top {
    padding-top: 8mm;
  }

  .cover-logo {
    display: block;
    margin: 0 auto 5mm auto;
    width: 28mm;
    height: 28mm;
  }

  .cover-brand {
    font-size: 9pt;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: ${BRAND.olive};
  }

  .cover-rule {
    width: 22mm;
    height: 1px;
    background: ${BRAND.sand};
    margin: 6mm auto 16mm auto;
  }

  .cover-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10mm;
  }

  .cover-title {
    font-size: 32pt;
    line-height: 1.12;
    font-weight: 800;
    margin: 0;
    max-width: 140mm;
    color: ${BRAND.ink};
  }

  .cover-title em {
    font-style: italic;
    color: ${BRAND.clay};
    font-weight: 800;
  }

  .cover-bottom {
    padding-bottom: 12mm;
  }

  .cover-kua {
    font-size: 11pt;
    font-weight: 700;
    color: ${BRAND.olive};
    margin: 0 0 3mm 0;
    letter-spacing: 0.04em;
  }

  .cover-date {
    font-size: 10pt;
    color: ${BRAND.ink};
    margin: 0;
  }

  /* ------------------------------------------------------------------
     Content blocks.
     Each block starts on a new page.
     ------------------------------------------------------------------ */
  .block {
    page-break-before: always;
  }

  .block h1 {
    font-size: 22pt;
    line-height: 1.18;
    font-weight: 800;
    margin: 0 0 9mm 0;
    letter-spacing: -0.005em;
  }

  .block h2 {
    font-size: 13pt;
    line-height: 1.3;
    font-weight: 700;
    margin: 10mm 0 3mm 0;
    color: ${BRAND.olive};
  }

  .block h3 {
    font-size: 11.5pt;
    font-weight: 700;
    margin: 6mm 0 2mm 0;
    color: ${BRAND.ink};
  }

  .block ul, .block ol {
    margin: 0 0 3.5mm 0;
    padding-left: 6mm;
  }

  .block li {
    margin: 0 0 2mm 0;
  }

  /* Summary block reference tables. Quiet, book-like styling. */
  .block table {
    width: 100%;
    border-collapse: collapse;
    margin: 5mm 0 7mm 0;
    font-size: 10pt;
    page-break-inside: avoid;
  }

  .block th, .block td {
    text-align: left;
    padding: 2.5mm 3mm;
    vertical-align: top;
    border-bottom: 0.5pt solid ${BRAND.sand};
  }

  .block th {
    font-weight: 700;
    color: ${BRAND.olive};
    font-size: 9pt;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-bottom: 1pt solid ${BRAND.sand};
  }

  .block td:last-child {
    text-align: right;
    color: ${BRAND.olive};
    font-weight: 700;
    white-space: nowrap;
  }

  .block tr:last-child td {
    border-bottom: none;
  }

  .block blockquote {
    border-left: 2px solid ${BRAND.sand};
    margin: 0 0 4mm 0;
    padding: 0 0 0 5mm;
    color: ${BRAND.olive};
    font-style: italic;
  }

  /* Pull-quote / called-out line. Bigger, centred, in soft sand panel.
     Used to emphasise the single most important sentence in a block. */
  .block .pull-quote {
    font-size: 14.5pt;
    line-height: 1.4;
    font-weight: 700;
    color: ${BRAND.ink};
    background: ${BRAND.cream};
    border-left: none;
    border-top: 1px solid ${BRAND.sand};
    border-bottom: 1px solid ${BRAND.sand};
    margin: 8mm 0;
    padding: 5mm 6mm;
    text-align: center;
    page-break-inside: avoid;
  }

  .block .pull-quote strong {
    color: ${BRAND.olive};
    font-weight: 800;
  }

  /* Closing block carries the small product-catalogue list; tighten
     line height there. */
  .block--closing hr {
    border: none;
    border-top: 1px solid ${BRAND.sand};
    margin: 8mm 0;
  }
</style>
</head>
<body>

<section class="cover">
  <div class="cover-top">
    <div class="cover-logo">${brandMarkSvg(106, BRAND.olive)}</div>
    <p class="cover-brand">My Feng Shui Home</p>
    <div class="cover-rule"></div>
  </div>

  <div class="cover-center">
    <h1 class="cover-title">${product.coverTitleHtml(escapeHtml(context.firstName))}</h1>
  </div>

  <div class="cover-bottom">
    <p class="cover-kua">KUA ${context.kuaNumber} · ${groupLabel.toUpperCase()}</p>
    <p class="cover-date">${date}</p>
  </div>
</section>

${assembledBlocksHtml}

</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
