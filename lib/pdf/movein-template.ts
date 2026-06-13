// PDF template for the Move-In Date Report. A bespoke, data-driven
// document (not the modular block recipe): a buyer's move-in window read
// against the verified 2026 day calendar, a Kua facing overlay, and a
// first-week activation checklist.
//
// Mirrors lib/pdf/template.ts for fonts and brand palette so the report
// reads as part of the same product line.

import { readFileSync } from "node:fs";
import path from "node:path";
import type { Direction } from "@/lib/directions";
import type { CalDay, Verdict } from "@/lib/day-calendar";
import { brandMarkSvg } from "@/lib/pdf/svg-marks";

const BRAND = {
  paper: "#ffffff",
  cream: "#fcfcf8",
  ink: "#0e3b2c",
  olive: "#0e3b2c",
  clay: "#d9531a",
  sand: "#f2f2ee",
  hair: "#e2dac5",
  muted: "#4f5b53",
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Verdict -> chip colour. Favourable reads green, Caution reads clay, the
// two middling verdicts read quiet.
const VERDICT_STYLE: Record<Verdict, { bg: string; fg: string }> = {
  Favourable: { bg: "#dde6e0", fg: "#0a2a20" },
  Settling: { bg: "#eef0ec", fg: "#4f5b53" },
  Neutral: { bg: "#f2f2ee", fg: "#4f5b53" },
  Caution: { bg: "#f8d8c5", fg: "#7a3208" },
};

function chip(verdict: Verdict): string {
  const s = VERDICT_STYLE[verdict];
  return `<span class="verdict-chip" style="background:${s.bg};color:${s.fg};">${verdict}</span>`;
}

export type MoveInWindow = {
  start: string;
  end: string;
  startLabel: string;
  endLabel: string;
};

export type MoveInData = {
  firstName: string;
  kua: number;
  group: "east" | "west";
  window: MoveInWindow;
  days: CalDay[];
  favourable: Direction[];
  cautious: Direction[];
  /** True when the requested window was clamped to the calendar range. */
  clamped: boolean;
};

function dayTableRows(days: CalDay[]): string {
  return days
    .map(
      (d) => `<tr>
        <td class="cell-date">${escapeHtml(d.label)}</td>
        <td class="cell-verdict">${chip(d.verdict)}</td>
        <td class="cell-note">${escapeHtml(d.note)}</td>
      </tr>`,
    )
    .join("\n");
}

function bestDaysList(days: CalDay[]): string {
  const best = days.filter((d) => d.verdict === "Favourable");
  if (best.length === 0) {
    return `<p>Your window does not contain a day the tradition reads as fully favourable for a move. That is not a warning; it simply means the strongest days fall outside these dates. In that case, prefer a day marked <strong>Settling</strong> over one marked <strong>Caution</strong>, and treat the move as ordinary rather than ceremonial.</p>`;
  }
  const items = best
    .map((d) => `<li><strong>${escapeHtml(d.label)}</strong> - ${escapeHtml(d.note)}</li>`)
    .join("\n");
  return `<p>These are the days inside your window the tradition reads as favourable for a move, a start, or an opening. Any one of them is a sound choice.</p>
    <ul class="best-days">${items}</ul>`;
}

function cautionList(days: CalDay[]): string {
  const caution = days.filter((d) => d.verdict === "Caution");
  if (caution.length === 0) {
    return `<p>Your window contains no days the tradition flags for particular caution. That is a quiet, workable stretch.</p>`;
  }
  const items = caution
    .map((d) => `<li><strong>${escapeHtml(d.label)}</strong> - ${escapeHtml(d.note)}</li>`)
    .join("\n");
  return `<p>The tradition would handle these days with extra care for a major move. If you can avoid scheduling the heavy lifting on them, do; if you cannot, treat the move as ordinary and lean on the activation steps at the end.</p>
    <ul class="caution-days">${items}</ul>`;
}

function directionsTable(favourable: Direction[]): string {
  const rows = favourable
    .map(
      (d) => `<tr>
        <td><strong>${escapeHtml(d.pinyin)}</strong> <em>(${escapeHtml(d.gloss)})</em></td>
        <td class="cell-note">${escapeHtml(d.meaning)}</td>
        <td class="cell-dir">${escapeHtml(d.compassLabel)}</td>
      </tr>`,
    )
    .join("\n");
  return `<table class="dir-table">
    <thead><tr><th>Quality</th><th>Best use on arrival</th><th>Direction</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

const ACTIVATION_HTML = `
  <ol class="activation">
    <li><strong>Open the home before you fill it.</strong> On the first day, open every window and door for a while so stale air moves out and fresh air settles in before the furniture arrives.</li>
    <li><strong>Bring light and sound in.</strong> Turn on the lights in every room, and let music or voices fill the empty rooms. A home that has been lit and heard reads as awake.</li>
    <li><strong>Use the kitchen early.</strong> Boil water or cook something simple on the first evening, so the stove is lit and the kitchen used from the start.</li>
    <li><strong>Clean the threshold.</strong> Wipe the entrance inside and out and clear the first few steps in, so the way you enter is open from day one.</li>
    <li><strong>Make the bed first.</strong> Set the bed on one of your supportive walls (see your directions above) and make it up before the rest of the room, so the place you rest is settled on the first night.</li>
    <li><strong>Set your work seat.</strong> Place your desk or main chair so you can see the door without sitting in its direct line, facing one of your favourable directions where the room allows.</li>
    <li><strong>Walk it once, slowly.</strong> When the home is yours, walk it room by room and notice which corners feel easy and which feel unfinished. Those notes are where next month's small adjustments go.</li>
  </ol>`;

export function buildMoveInHtml(data: MoveInData): string {
  const fonts = loadFonts();
  const groupLabel = data.group === "east" ? "East group" : "West group";
  const name = escapeHtml(data.firstName);
  const title = `${name}'s Move-In Date Report`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  @font-face { font-family: "Hanken Grotesk"; font-weight: 400; src: url(data:font/ttf;base64,${fonts.regular}) format("truetype"); }
  @font-face { font-family: "Hanken Grotesk"; font-weight: 700; src: url(data:font/ttf;base64,${fonts.bold}) format("truetype"); }
  @font-face { font-family: "Hanken Grotesk"; font-weight: 800; src: url(data:font/ttf;base64,${fonts.extraBold}) format("truetype"); }

  @page {
    size: A4;
    margin: 20mm 18mm 20mm 18mm;
    background: ${BRAND.paper};
    @top-center {
      content: "${escapeHtml(title)}";
      font-family: "Hanken Grotesk", system-ui, sans-serif;
      font-size: 8.5pt; color: ${BRAND.olive}; padding-top: 6mm; letter-spacing: 0.02em;
    }
    @bottom-center {
      content: counter(page);
      font-family: "Hanken Grotesk", system-ui, sans-serif;
      font-size: 9pt; color: ${BRAND.ink}; padding-bottom: 6mm;
    }
  }
  @page :first { @top-center { content: ""; } @bottom-center { content: ""; } }

  html, body {
    margin: 0; padding: 0; background: ${BRAND.paper}; color: ${BRAND.ink};
    font-family: "Hanken Grotesk", system-ui, -apple-system, sans-serif;
    font-size: 11pt; line-height: 1.6;
  }
  p { margin: 0 0 3.5mm 0; orphans: 3; widows: 3; }
  strong { font-weight: 700; color: ${BRAND.ink}; }
  em { font-style: italic; }
  h1, h2, h3 { color: ${BRAND.ink}; page-break-after: avoid; }

  .cover { page-break-after: always; height: 253mm; display: flex; flex-direction: column; text-align: center; }
  .cover-top { padding-top: 8mm; }
  .cover-logo { display: block; margin: 0 auto 5mm auto; width: 28mm; height: 28mm; }
  .cover-brand { font-size: 9pt; letter-spacing: 0.28em; text-transform: uppercase; color: ${BRAND.olive}; }
  .cover-rule { width: 22mm; height: 1px; background: ${BRAND.sand}; margin: 6mm auto 16mm auto; }
  .cover-center { flex: 1; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; padding-top: 10mm; }
  .cover-title { font-size: 30pt; line-height: 1.12; font-weight: 800; margin: 0; max-width: 140mm; }
  .cover-title em { font-style: italic; color: ${BRAND.clay}; font-weight: 800; }
  .cover-window { font-size: 12pt; color: ${BRAND.muted}; margin: 8mm 0 0 0; }
  .cover-bottom { padding-bottom: 12mm; }
  .cover-kua { font-size: 11pt; font-weight: 700; color: ${BRAND.olive}; margin: 0; letter-spacing: 0.04em; }

  .section { page-break-before: always; }
  .section h1 { font-size: 21pt; line-height: 1.18; font-weight: 800; margin: 0 0 7mm 0; }
  .section h2 { font-size: 13pt; font-weight: 700; margin: 9mm 0 3mm 0; color: ${BRAND.olive}; }

  ul, ol { margin: 0 0 3.5mm 0; padding-left: 6mm; }
  li { margin: 0 0 2.5mm 0; }

  table { width: 100%; border-collapse: collapse; margin: 5mm 0 7mm 0; font-size: 9.5pt; }
  th, td { text-align: left; padding: 2.2mm 3mm; vertical-align: top; border-bottom: 0.5pt solid ${BRAND.sand}; }
  th { font-weight: 700; color: ${BRAND.olive}; font-size: 8.5pt; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 1pt solid ${BRAND.sand}; }
  tr { page-break-inside: avoid; }
  .cell-date { white-space: nowrap; font-weight: 700; }
  .cell-verdict { white-space: nowrap; }
  .cell-dir { text-align: right; color: ${BRAND.olive}; font-weight: 700; white-space: nowrap; }
  .dir-table td:last-child { text-align: right; }

  .verdict-chip { display: inline-block; padding: 0.6mm 2.4mm; border-radius: 999px; font-size: 8pt; font-weight: 700; letter-spacing: 0.02em; }

  .day-table { font-size: 9.5pt; }
  .best-days li, .caution-days li { margin-bottom: 2mm; }

  .pull-quote { font-size: 13.5pt; line-height: 1.4; font-weight: 700; color: ${BRAND.ink}; background: ${BRAND.cream}; border-top: 1px solid ${BRAND.sand}; border-bottom: 1px solid ${BRAND.sand}; margin: 8mm 0; padding: 5mm 6mm; text-align: center; page-break-inside: avoid; }

  .activation li { margin-bottom: 3mm; }
  .legend { font-size: 9pt; color: ${BRAND.muted}; margin: 4mm 0 0 0; }
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
    <h1 class="cover-title">${name}'s Move-In <em>Date Report</em></h1>
    <p class="cover-window">${escapeHtml(data.window.startLabel)} to ${escapeHtml(data.window.endLabel)}</p>
  </div>
  <div class="cover-bottom">
    <p class="cover-kua">KUA ${data.kua} &middot; ${groupLabel.toUpperCase()}</p>
  </div>
</section>

<section class="section">
  <h1>Reading your window</h1>
  <p>This report reads the move-in window you gave us, ${escapeHtml(data.window.startLabel)} to ${escapeHtml(data.window.endLabel)}, against the verified day calendar for the 2026 solar year. For each day it gives a plain reading: a day the tradition treats as favourable for a move, one good for settling rather than starting, an ordinary day, or one to handle with care.</p>
  ${data.clamped ? `<p>Part of the window you entered falls outside the dates this report covers (July 2026 to February 2027), so the reading below is for the portion that overlaps.</p>` : ""}
  <p class="pull-quote">Pick a favourable day if one falls when you can move. If not, a settling or ordinary day is fine, and the activation steps matter more than the date.</p>
  <p class="legend"><strong>Favourable</strong>: good for a move, a start, an opening. &nbsp; <strong>Settling</strong>: good for consolidating, not new starts. &nbsp; <strong>Neutral</strong>: an ordinary day. &nbsp; <strong>Caution</strong>: handle a major move with care.</p>
</section>

<section class="section">
  <h1>Your best move days</h1>
  ${bestDaysList(data.days)}
  <h2>Days to handle with care</h2>
  ${cautionList(data.days)}
</section>

<section class="section">
  <h1>Day by day</h1>
  <p>Every day in your window, in order. Use it to line up the move with a day that suits both the calendar and your schedule.</p>
  <table class="day-table">
    <thead><tr><th>Date</th><th>Reading</th><th>Note</th></tr></thead>
    <tbody>${dayTableRows(data.days)}</tbody>
  </table>
</section>

<section class="section">
  <h1>Your directions for the new home</h1>
  <p>You are Kua ${data.kua}, the ${groupLabel}. These are the four directions the tradition reads as supportive for you. As you set up the new home, give the bed, the main work seat, and the chairs that matter to these directions where the layout allows.</p>
  ${directionsTable(data.favourable)}
  <p>Your four cautious directions are ${data.cautious.map((d) => escapeHtml(d.compassLabel)).join(", ")}. These are the corners to hand to storage, the wardrobe, the bathroom, and the laundry rather than the bed or the main desk. They are lower-priority placements, not problems.</p>
</section>

<section class="section">
  <h1>Your first week</h1>
  <p>The date sets the start. These steps settle the home in the days that follow. None of them promise anything; they are a calm, traditional sequence for making an empty place feel lived in.</p>
  ${ACTIVATION_HTML}
  <p>Leave one small thing unfinished and come back to it after a week. A home is settled by living in it, not by finishing it in a day.</p>
</section>

</body>
</html>`;
}
