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
import { PILLAR_META } from "@/lib/pillar-sectors";
import { photoDataUri } from "@/lib/pdf/photos";

// Brand palette - matches the CSS custom properties in globals.css.
const BRAND = {
  paper: "#ffffff",     // cream paper background
  cream: "#fcfcf8",     // canvas (slightly darker than paper)
  ink: "#0e3b2c",       // deep brown for body text
  olive: "#0e3b2c",     // dark olive for accents
  clay: "#d9531a",      // warm clay for emphasis
  sand: "#f2f2ee",      // soft sand for rules / dividers
  hairline: "#e2dac5",  // warm hairline (matches svg-marks)
  rule: "#b9b4a5",      // write-on ruled lines in worksheets
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

  // Named-page running footers for the pillar chapters: each chapter's
  // pages carry its area + sector in the footer ("Wealth - Southeast - 12").
  // Generated from PILLAR_META so the nine rules stay in one place. If a
  // Chromium build ignores named pages the global footer still applies -
  // a cosmetic-only degradation.
  const pillarPageCss = Object.entries(PILLAR_META)
    .map(
      ([id, m]) => `
  .block--${id} { page: ${id}; }
  @page ${id} {
    @bottom-center {
      content: "${cssEscape(m.areaLabel)} - ${cssEscape(m.sectorLabel)} - " counter(page);
      font-family: "Hanken Grotesk", "Noto Sans TC", system-ui, sans-serif;
      font-size: 8.5pt;
      color: ${BRAND.ink};
      padding-bottom: 6mm;
      letter-spacing: 0.04em;
    }
  }`,
    )
    .join("\n");

  // Cover photo plate (premium design). Fixed height either way so the
  // cover composition is identical with and without the owner's image.
  const coverPhoto = photoDataUri("cover");
  const coverPlate = coverPhoto
    ? `<div class="cover-plate" style="background-image:url('${coverPhoto}')"></div>`
    : `<div class="cover-plate cover-plate--fallback">${brandMarkSvg(64, BRAND.hairline)}</div>`;

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
    /* border-box so the framed-cover padding and border stay INSIDE the
       253mm; without this the cover overflowed onto a broken page 2. */
    box-sizing: border-box;
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

  /* Chapter opener mark: a short clay bar above every block h1, the
     same on every chapter, so page-flipping readers always know where
     a chapter starts. */
  .block h1::before {
    content: "";
    display: block;
    width: 14mm;
    height: 1.2mm;
    background: ${BRAND.clay};
    margin-bottom: 5mm;
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

  /* "Start tonight" box (2026-07-20 review, P2): the single first move,
     called out in a clay-accented panel so the reader has one concrete
     thing to do before they finish reading. Stays on one page. */
  .block .start-tonight {
    font-size: 11pt;
    line-height: 1.55;
    color: ${BRAND.ink};
    background: #fbeee6;
    border: 1px solid ${BRAND.clay};
    border-radius: 2.5mm;
    margin: 8mm 0;
    padding: 5mm 6mm;
    page-break-inside: avoid;
  }
  .block .start-tonight strong {
    color: ${BRAND.clay};
    font-weight: 800;
  }

  /* Closing block carries the small product-catalogue list; tighten
     line height there. */
  .block--closing hr {
    border: none;
    border-top: 1px solid ${BRAND.sand};
    margin: 8mm 0;
  }

  /* ------------------------------------------------------------------
     Compass v2: figures, worksheets, and the six-section chapter arc.
     ------------------------------------------------------------------ */

  /* A figure is an SVG (mini compass, placement diagram, floor plan)
     plus its caption. Never split from its caption. */
  .figure {
    margin: 6mm auto 7mm auto;
    text-align: center;
    page-break-inside: avoid;
  }

  .figure-caption {
    font-size: 9.5pt;
    line-height: 1.45;
    color: ${BRAND.olive};
    margin: 2.5mm auto 0 auto;
    max-width: 130mm;
    text-align: center !important;
    hyphens: none !important;
  }

  /* Printable worksheet panel. The whole frame stays on one page. */
  .worksheet {
    background: ${BRAND.cream};
    border: 1px solid ${BRAND.hairline};
    border-radius: 2.5mm;
    padding: 7mm 8mm;
    margin: 6mm 0;
    page-break-inside: avoid;
  }

  .worksheet .ws-title {
    font-size: 13pt;
    font-weight: 800;
    color: ${BRAND.ink};
    margin: 0 0 1.5mm 0;
    letter-spacing: 0.01em;
  }

  .worksheet .ws-hint {
    font-size: 9pt;
    color: ${BRAND.olive};
    margin: 0 0 5mm 0;
    text-align: left;
  }

  /* A ruled line the reader writes on. */
  .worksheet .ws-line {
    border-bottom: 0.6pt solid ${BRAND.rule};
    height: 9mm;
  }

  .worksheet .ws-label {
    font-size: 8.5pt;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${BRAND.olive};
    margin: 4mm 0 0.5mm 0;
    text-align: left;
  }

  /* Worksheet tables: visible cell frames (unlike the quiet reference
     tables), generous fill-in row height. */
  .worksheet table {
    width: 100%;
    border-collapse: collapse;
    margin: 2mm 0 0 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }

  .worksheet th {
    text-align: left;
    font-weight: 700;
    color: ${BRAND.olive};
    font-size: 8.5pt;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 2mm 2.5mm;
    border: 0.6pt solid ${BRAND.rule};
    background: ${BRAND.paper};
  }

  .worksheet td {
    border: 0.6pt solid ${BRAND.rule};
    padding: 2mm 2.5mm;
    height: 9mm;
    vertical-align: top;
    text-align: left;
    color: ${BRAND.ink};
  }

  /* The at-a-glance card (summary block) must fit ONE page: tighter
     heading margins and denser tables than the book default, so the
     bagua, both direction tables, and the three reading rules print
     as a single pinnable sheet. */
  .block--summary h1 {
    font-size: 19pt;
    margin-bottom: 3mm;
  }

  .block--summary h2 {
    margin: 4mm 0 1.5mm 0;
  }

  .block--summary p {
    margin-bottom: 2.5mm;
  }

  .block--summary table {
    margin: 2mm 0 3mm 0;
    font-size: 9pt;
  }

  .block--summary th, .block--summary td {
    padding: 1.6mm 2.5mm;
  }

  .block--summary .card-rules {
    font-size: 9pt;
    line-height: 1.55;
    color: ${BRAND.olive};
    border-top: 1px solid ${BRAND.sand};
    padding-top: 2.5mm;
    margin-top: 1mm;
  }

  /* The six-section chapter arc: the closing one-liner gets the
     pull-quote treatment automatically via the .one-thing class. */
  .block .one-thing {
    font-size: 12.5pt;
    line-height: 1.45;
    font-weight: 700;
    color: ${BRAND.ink};
    background: ${BRAND.cream};
    border-left: 2.5mm solid ${BRAND.clay};
    margin: 7mm 0 2mm 0;
    padding: 4.5mm 6mm;
    text-align: left;
    page-break-inside: avoid;
    page-break-before: avoid;
  }

  .block .one-thing strong {
    color: ${BRAND.clay};
  }

  /* ------------------------------------------------------------------
     P4 (2026-07-20): the premium finishing layer.
     ------------------------------------------------------------------ */

  /* Every chapter closes with a quiet centered hairline, so the eye
     gets a designed landing at the end of each block instead of the
     text simply stopping. */
  .block::after {
    content: "";
    display: block;
    width: 26mm;
    height: 0.5mm;
    background: ${BRAND.hairline};
    margin: 11mm auto 0 auto;
  }

  /* Framed cover: a single warm hairline border set inside the page
     margins turns the title page into a plate. */
  .cover {
    border: 0.6pt solid ${BRAND.hairline};
    padding: 14mm 12mm;
  }

  /* ------------------------------------------------------------------
     PRM-003 (2026-07-21): the premium magazine layer.
     Scoped to the pillar chapters and the two pillar framing blocks;
     every other product keeps its existing look untouched.
     ------------------------------------------------------------------ */

  /* Cover photo plate: fixed height with or without the owner's image,
     so the cover composition never shifts. */
  .cover-plate {
    width: 128mm;
    height: 96mm;
    margin: 12mm auto 0 auto;
    border-radius: 3mm;
    background-size: cover;
    background-position: center;
    background-color: ${BRAND.sand};
  }
  .cover-plate--fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(150deg, ${BRAND.sand} 0%, ${BRAND.cream} 60%, ${BRAND.sand} 100%);
  }

  /* Chapter opener: photo band, kicker, mini-map + verdict chip. The
     header is injected by assembleProductHtml for blocks with a
     PILLAR_META entry; the markdown H1 follows it unchanged. */
  .chapter-opener {
    page-break-inside: avoid;
    page-break-after: avoid;
    margin: 0 0 6mm 0;
  }
  .opener-photo {
    height: 62mm;
    border-radius: 3mm;
    background-size: cover;
    background-position: center;
    background-color: ${BRAND.sand};
    margin: 0 0 6mm 0;
  }
  .opener-photo--fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(150deg, ${BRAND.sand} 0%, ${BRAND.cream} 55%, ${BRAND.sand} 100%);
  }
  .opener-photo--fallback svg {
    width: 22mm;
    height: 22mm;
    opacity: 0.55;
  }
  .opener-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 6mm;
  }
  .opener-kicker {
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${BRAND.clay};
    margin: 0 0 2mm 0;
    padding-top: 1.5mm;
    border-top: 0.8mm solid ${BRAND.clay};
    display: inline-block;
    text-align: left;
  }
  .opener-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2mm;
    flex: 0 0 auto;
  }

  .verdict-chip {
    display: inline-block;
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 1mm 3.5mm;
    border-radius: 6mm;
    white-space: nowrap;
  }
  .verdict-chip--supportive { background: #dde6e0; color: ${BRAND.ink}; }
  .verdict-chip--cautious   { background: #f8d8c5; color: ${BRAND.ink}; }
  .verdict-chip--centre     { background: ${BRAND.sand}; color: ${BRAND.ink}; }

  /* The resolved "Your reading" panel (built in lib/pillar-sectors.ts). */
  .verdict-panel {
    border-radius: 3mm;
    padding: 6mm 7mm 5mm 7mm;
    margin: 6mm 0;
    page-break-inside: avoid;
  }
  .verdict-panel--supportive { background: #dde6e0; border-left: 1.6mm solid ${BRAND.olive}; }
  .verdict-panel--cautious   { background: #f8d8c5; border-left: 1.6mm solid ${BRAND.clay}; }
  .verdict-panel--centre     { background: ${BRAND.sand}; border-left: 1.6mm solid ${BRAND.rule}; }
  .verdict-panel__kicker {
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${BRAND.clay};
    margin: 0 0 2mm 0;
    text-align: left;
  }
  .verdict-panel__verdict {
    font-size: 12.5pt;
    font-weight: 800;
    line-height: 1.4;
    color: ${BRAND.ink};
    margin: 0 0 2mm 0;
    text-align: left;
  }
  .verdict-panel__detail {
    font-size: 10pt;
    color: ${BRAND.ink};
    margin: 0;
    text-align: left;
  }

  /* Tips and tricks page: two-column card grid. CSS grid rather than
     CSS columns because column balancing across print pages is
     unreliable in Chromium. */
  .tips-page {
    page-break-before: always;
  }
  .tip-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4mm;
    margin: 5mm 0;
  }
  .tip-card {
    border: 0.5pt solid ${BRAND.hairline};
    border-radius: 2.5mm;
    padding: 4mm 4.5mm;
    font-size: 9.5pt;
    line-height: 1.55;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .tip-card p { margin: 0; text-align: left; hyphens: none; }
  .tip-card strong { display: block; margin-bottom: 1mm; }
  .tip-card--renter { border-left: 1.4mm solid ${BRAND.olive}; }
  .renter-chip {
    display: inline-block;
    font-size: 7pt;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${BRAND.olive};
    background: #dde6e0;
    padding: 0.5mm 2mm;
    border-radius: 4mm;
    margin-left: 1.5mm;
    vertical-align: middle;
  }
  .room-in-sector {
    background: ${BRAND.sand};
    border-radius: 3mm;
    padding: 5mm 6mm;
    margin: 5mm 0;
    page-break-inside: avoid;
    font-size: 9.5pt;
    line-height: 1.6;
  }
  .room-in-sector p { text-align: left; hyphens: none; margin: 0 0 2.5mm 0; }
  .room-in-sector p:last-child { margin-bottom: 0; }

  /* Chapter recap card: owns the chapter's last page and absorbs the
     tail whitespace the old layout left blank. */
  .chapter-recap {
    page-break-before: always;
    page-break-inside: avoid;
    border: 0.5pt solid ${BRAND.hairline};
    border-radius: 3mm;
    padding: 7mm 8mm;
    margin-top: 4mm;
  }
  .chapter-recap p { text-align: left; hyphens: none; margin: 0 0 2.5mm 0; }
  .chapter-recap table { width: 100%; }

  /* Magazine body: pillar chapters + pillar framing read ragged-right
     at a calmer measure. Attribute selector so all nine pillar blocks
     and the two new framing blocks are covered without listing them. */
  [class*="block--pillar-"] p,
  .block--welcome-pillars p,
  .block--closing-pillars p {
    text-align: left;
    hyphens: none;
    -webkit-hyphens: none;
  }
  [class*="block--pillar-"],
  .block--welcome-pillars,
  .block--closing-pillars {
    max-width: 152mm;
  }

  /* Standfirst: the first paragraph after a pillar H1 reads larger and
     quieter, magazine-style. Pure CSS, no content changes. */
  [class*="block--pillar-"] h1 + p {
    font-size: 12.5pt;
    line-height: 1.55;
    color: #4f5b53;
  }

  /* The recap card is each pillar chapter's designed ending; the
     generic end-of-block hairline would double it. */
  [class*="block--pillar-"]::after { display: none; }

  /* Pull quotes gain a hairline so they survive pale home printers. */
  .pull-quote {
    border-top: 0.5pt solid ${BRAND.hairline};
    border-bottom: 0.5pt solid ${BRAND.hairline};
  }

  /* Keepsake card: both tables on one shared grid. */
  .keepsake table { table-layout: fixed; }
  .keepsake th:first-child, .keepsake td:first-child { width: 34%; }
  .keepsake-gloss {
    font-size: 8pt;
    color: #4f5b53;
    margin: 2mm 0 0 0;
  }

  ${pillarPageCss}

  /* Keepsake reference card: the last page renders the reader's eight
     directions as a cut-out card. The dashed rule is the cut line. */
  .keepsake {
    page-break-before: always;
    text-align: center;
  }

  .keepsake .keepsake-hint {
    font-size: 9.5pt;
    color: ${BRAND.olive};
    margin: 0 0 6mm 0;
  }

  .keepsake .keepsake-card {
    display: inline-block;
    width: 118mm;
    border: 0.8pt dashed ${BRAND.rule};
    border-radius: 3mm;
    padding: 8mm 9mm 7mm 9mm;
    text-align: center;
    page-break-inside: avoid;
  }

  .keepsake .keepsake-name {
    font-size: 13pt;
    font-weight: 800;
    color: ${BRAND.ink};
    margin: 3mm 0 0.5mm 0;
  }

  .keepsake .keepsake-kua {
    font-size: 9pt;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: ${BRAND.clay};
    margin: 0 0 5mm 0;
  }

  .keepsake table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
    margin: 0 0 2mm 0;
  }

  .keepsake th {
    font-size: 8pt;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${BRAND.olive};
    border-bottom: 0.6pt solid ${BRAND.hairline};
    padding: 1.2mm 2mm;
    text-align: left;
  }

  .keepsake td {
    padding: 1.2mm 2mm;
    text-align: left;
    color: ${BRAND.ink};
    border-bottom: 0.4pt solid ${BRAND.sand};
  }

  .keepsake .keepsake-good td:first-child { font-weight: 700; }

  .keepsake .keepsake-footer {
    font-size: 8pt;
    color: ${BRAND.olive};
    margin: 4mm 0 0 0;
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
    ${coverPlate}
  </div>

  <div class="cover-bottom">
    <p class="cover-kua">KUA ${context.kuaNumber} · ${groupLabel.toUpperCase()}</p>
    <p class="cover-date">${date}</p>
  </div>
</section>

${assembledBlocksHtml}

${keepsakeCardHtml(context, groupLabel)}

</body>
</html>`;
}

/** The cut-out keepsake card: the reader's eight directions on one
 *  card-sized panel, closing every personalised book (P4). */
function keepsakeCardHtml(context: BlockContext, groupLabel: string): string {
  const dirs = Object.values(context.byCompass);
  const order = ["SQ", "TY", "YN", "FW", "HH", "LS", "WG", "JM"];
  const sorted = [...dirs].sort(
    (a, b) => order.indexOf(a.qualityCode) - order.indexOf(b.qualityCode),
  );
  const good = sorted.filter((d) => d.favourable);
  const care = sorted.filter((d) => !d.favourable);
  const row = (d: (typeof dirs)[number]) =>
    `<tr><td>${d.compassLabel}</td><td>${d.pinyin}</td><td>${d.gloss}</td></tr>`;
  return `<section class="keepsake">
  <p class="keepsake-hint">Cut along the dashed line and keep this where you plan your week.</p>
  <div class="keepsake-card">
    ${brandMarkSvg(34, BRAND.olive)}
    <p class="keepsake-name">${escapeHtml(context.firstName)}'s directions</p>
    <p class="keepsake-kua">KUA ${context.kuaNumber} · ${groupLabel.toUpperCase()}</p>
    <table class="keepsake-good">
      <thead><tr><th>Supportive</th><th></th><th></th></tr></thead>
      <tbody>${good.map(row).join("")}</tbody>
    </table>
    <table>
      <thead><tr><th>Handle with care</th><th></th><th></th></tr></thead>
      <tbody>${care.map(row).join("")}</tbody>
    </table>
    <p class="keepsake-footer">myfengshuihome.com · read the room first, then the direction</p>
  </div>
</section>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
