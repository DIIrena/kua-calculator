// PDF template for the Couple Compatibility Compass. Reads two people's
// Kua directions and presents where they agree, where they take turns,
// and where they both go gentle, with practical shared-furniture
// recommendations. Mirrors lib/pdf/template.ts for fonts and palette.

import { readFileSync } from "node:fs";
import path from "node:path";
import type { Direction } from "@/lib/directions";
import type { SharedRoomsGroups } from "@/lib/shared-rooms";
import { brandMarkSvg } from "@/lib/pdf/svg-marks";

const BRAND = {
  paper: "#ffffff",
  cream: "#fcfcf8",
  ink: "#0e3b2c",
  olive: "#0e3b2c",
  clay: "#d9531a",
  sand: "#f2f2ee",
  muted: "#4f5b53",
};

let fontsCache: { regular: string; bold: string; extraBold: string } | null =
  null;
function fontBase64(filename: string): string {
  return readFileSync(
    path.join(process.cwd(), "lib", "fonts", filename),
  ).toString("base64");
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
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type CouplePerson = {
  firstName: string;
  kua: number;
  group: "east" | "west";
  favourable: Direction[];
};

export type CoupleData = {
  a: CouplePerson;
  b: CouplePerson;
  shared: SharedRoomsGroups;
};

function profileTable(p: CouplePerson): string {
  const rows = p.favourable
    .map(
      (d) =>
        `<tr><td><strong>${esc(d.pinyin)}</strong> <em>(${esc(d.gloss)})</em></td><td class="cell-dir">${esc(d.compassLabel)}</td></tr>`,
    )
    .join("");
  const groupLabel = p.group === "east" ? "East group" : "West group";
  return `<h2>${esc(p.firstName)}: Kua ${p.kua}, ${groupLabel}</h2>
    <table class="two-col"><tbody>${rows}</tbody></table>`;
}

function dirList(entries: { compassLabel: string }[]): string {
  if (entries.length === 0) return "<p>None this time.</p>";
  return `<p>${entries.map((e) => `<strong>${esc(e.compassLabel)}</strong>`).join(", ")}.</p>`;
}

export function buildCoupleHtml(data: CoupleData): string {
  const fonts = loadFonts();
  const { a, b, shared } = data;
  const names = `${esc(a.firstName)} & ${esc(b.firstName)}`;
  const sameGroup = a.group === b.group;
  const title = `${a.firstName} & ${b.firstName}'s Compatibility Compass`;

  const groupNote = sameGroup
    ? `<p>You are both in the ${a.group === "east" ? "East" : "West"} group, so you share the same four supportive directions. The tradition reads this as the easy case: a shared bed, shared seats, and a shared study can all sit on directions that suit both of you. The only question is which of the four, not whether someone loses out.</p>`
    : `<p>You are in different groups, so your maps are mirror images: where one of you is supported, the other is asked to take more care. The tradition does not read this as a problem. It just means the shared furniture needs a rule, and the pages below give you those rules.</p>`;

  const bedRec =
    shared.both.length > 0
      ? `For the bed you share, point the headboard to one of your shared supportive directions: ${shared.both.map((e) => esc(e.compassLabel)).join(", ")}. Any of these is read as restful for both of you.`
      : `Because your good directions do not overlap, the tradition handles the shared bed by taking turns: the headboard sits on one partner's supportive wall for a season, then shifts to the other's when the season changes. A push season can favour one head; a recovery season the other.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<style>
  @font-face { font-family: "Hanken Grotesk"; font-weight: 400; src: url(data:font/ttf;base64,${fonts.regular}) format("truetype"); }
  @font-face { font-family: "Hanken Grotesk"; font-weight: 700; src: url(data:font/ttf;base64,${fonts.bold}) format("truetype"); }
  @font-face { font-family: "Hanken Grotesk"; font-weight: 800; src: url(data:font/ttf;base64,${fonts.extraBold}) format("truetype"); }
  @page {
    size: A4; margin: 20mm 18mm; background: ${BRAND.paper};
    @top-center { content: "${esc(title)}"; font-family: "Hanken Grotesk", sans-serif; font-size: 8.5pt; color: ${BRAND.olive}; padding-top: 6mm; }
    @bottom-center { content: counter(page); font-family: "Hanken Grotesk", sans-serif; font-size: 9pt; color: ${BRAND.ink}; padding-bottom: 6mm; }
  }
  @page :first { @top-center { content: ""; } @bottom-center { content: ""; } }
  html, body { margin: 0; padding: 0; background: ${BRAND.paper}; color: ${BRAND.ink}; font-family: "Hanken Grotesk", system-ui, sans-serif; font-size: 11pt; line-height: 1.6; }
  p { margin: 0 0 3.5mm 0; orphans: 3; widows: 3; }
  strong { font-weight: 700; } em { font-style: italic; }
  h1, h2 { color: ${BRAND.ink}; page-break-after: avoid; }
  .cover { page-break-after: always; height: 253mm; display: flex; flex-direction: column; text-align: center; }
  .cover-top { padding-top: 8mm; }
  .cover-logo { display: block; margin: 0 auto 5mm auto; width: 28mm; height: 28mm; }
  .cover-brand { font-size: 9pt; letter-spacing: 0.28em; text-transform: uppercase; color: ${BRAND.olive}; }
  .cover-rule { width: 22mm; height: 1px; background: ${BRAND.sand}; margin: 6mm auto 16mm auto; }
  .cover-center { flex: 1; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; padding-top: 12mm; }
  .cover-title { font-size: 30pt; line-height: 1.12; font-weight: 800; margin: 0; max-width: 150mm; }
  .cover-title em { font-style: italic; color: ${BRAND.clay}; font-weight: 800; }
  .cover-kua { font-size: 11pt; font-weight: 700; color: ${BRAND.olive}; padding-bottom: 12mm; letter-spacing: 0.04em; }
  .section { page-break-before: always; }
  .section h1 { font-size: 21pt; line-height: 1.18; font-weight: 800; margin: 0 0 7mm 0; }
  .section h2 { font-size: 13pt; font-weight: 700; margin: 9mm 0 3mm 0; color: ${BRAND.olive}; }
  table { width: 100%; border-collapse: collapse; margin: 4mm 0 6mm 0; font-size: 10pt; }
  td { text-align: left; padding: 2.2mm 3mm; vertical-align: top; border-bottom: 0.5pt solid ${BRAND.sand}; }
  .cell-dir { text-align: right; color: ${BRAND.olive}; font-weight: 700; white-space: nowrap; }
  .pull-quote { font-size: 13.5pt; line-height: 1.4; font-weight: 700; color: ${BRAND.ink}; background: ${BRAND.cream}; border-top: 1px solid ${BRAND.sand}; border-bottom: 1px solid ${BRAND.sand}; margin: 8mm 0; padding: 5mm 6mm; text-align: center; page-break-inside: avoid; }
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
    <h1 class="cover-title">${names}'s Compatibility <em>Compass</em></h1>
  </div>
  <p class="cover-kua">KUA ${a.kua} ${a.group.toUpperCase()} &nbsp;&middot;&nbsp; KUA ${b.kua} ${b.group.toUpperCase()}</p>
</section>

<section class="section">
  <h1>Reading the two of you</h1>
  <p>This reading takes both of your Kua numbers and lays your direction maps over each other, so you can see where they agree, where they pull in different directions, and how the tradition settles the furniture you share.</p>
  ${groupNote}
  <p class="pull-quote">The point is not whose map wins. It is a non-arbitrary way to choose, drawn from both of your readings.</p>
  ${profileTable(a)}
  ${profileTable(b)}
</section>

<section class="section">
  <h1>Where you agree</h1>
  <p>These directions are supportive for both of you. They are the easy ones: shared furniture placed here suits you both, with no compromise needed.</p>
  ${dirList(shared.both)}
  <h2>The shared bed</h2>
  <p>${bedRec}</p>
  <h2>Where to take turns</h2>
  <p>These directions are supportive for one of you and cautious for the other. For a seat only one person uses, each of you simply faces your own good direction. For anything shared, lean on the directions you agree on above, or alternate.</p>
  ${dirList(shared.mixed)}
  <h2>Where you both go gentle</h2>
  <p>These directions are cautious for both of you, so the tradition is happy to hand them to storage, the bathroom, the laundry, and the utility corners, freeing your shared good walls for the bed and the seats that matter.</p>
  ${dirList(shared.avoid)}
</section>

<section class="section">
  <h1>What this is, and what it is not</h1>
  <p>This is a structured way for two people to choose between arrangements that otherwise look equal, drawn from both of your Kua readings. It does not make a claim about your relationship, and it does not promise anything. The tradition makes associations; you stay the experts on your own home.</p>
  <p>Pick one shared move this week, leave it for seven days, and notice together whether the room feels any easier to be in. That is the whole method.</p>
</section>

</body>
</html>`;
}
