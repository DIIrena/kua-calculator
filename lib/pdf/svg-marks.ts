// Inline SVG generators used inside the Personal Compass PDF.
// Three families:
//   - brandMarkSvg(): the My Feng Shui Home M-shield logo. Used on the
//     cover and as a small running mark.
//   - personalBaguaSvg(kua, group): the brand-mark style circular bagua
//     with the customer's four favourable sectors filled in olive and
//     the four cautious sectors in pale sand, the customer's Kua number
//     centred in the well. Used on the Identity page.
//   - elementIconsSvg(group): a horizontal row of small brand-style
//     element icons appropriate to the customer's group (East = water +
//     fire + wood; West = earth + metal). Used below the favourable
//     directions bullets on the Identity page.

import type { KuaGroup } from "@/lib/kua";

// Brand palette (kept in sync with lib/pdf/template.ts BRAND object
// and lib/bagua-svg.ts. The "soft" variants are what the existing
// Kua chart uses on the saved-chart view; we reuse them here so the
// PDF bagua reads as the same instrument).
const C = {
  paper: "#ffffff",
  ink: "#0e3b2c",
  ink2: "#4f5b53",
  olive: "#0e3b2c",
  oliveSoft: "#dde6e0",   // favourable-sector fill (soft sage)
  clay: "#d9531a",
  claySoft: "#f8d8c5",    // cautious-sector fill (soft peach)
  sand: "#f2f2ee",
  hairline: "#e2dac5",
};

// ============================================================
// Brand mark - the M shield used on the website header.
// Path data is the same as in components/SiteHeader.tsx.
// ============================================================
export function brandMarkSvg(size: number = 48, color: string = C.olive): string {
  return `<svg viewBox="0 0 709 709" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" style="display:block;">
  <g transform="translate(0,709) scale(0.1,-0.1)" fill="${color}" stroke="none">
    <path d="M2099 6066 c-360 -52 -679 -212 -929 -466 -423 -429 -566 -1046 -376 -1615 47 -140 104 -256 188 -381 62 -93 172 -206 1314 -1343 l1247 -1241 516 509 c284 280 852 846 1262 1258 794 797 793 795 890 993 439 885 -19 1938 -969 2230 -171 52 -259 64 -462 64 -151 0 -205 -4 -296 -22 -225 -45 -416 -124 -599 -247 -100 -68 -182 -146 -915 -874 l-805 -800 250 0 250 -1 690 683 c750 741 732 725 936 814 357 154 811 121 1138 -85 317 -199 517 -494 576 -852 25 -147 17 -368 -19 -503 -29 -111 -74 -221 -137 -335 -39 -70 -109 -143 -749 -785 -388 -390 -897 -897 -1131 -1128 l-426 -419 -1107 1102 c-616 612 -1126 1128 -1150 1162 -247 348 -286 836 -99 1234 115 243 323 454 571 577 387 191 853 168 1217 -60 l83 -52 126 126 125 126 -42 30 c-199 143 -418 239 -653 285 -140 28 -380 35 -515 16z" />
    <path d="M3904 4889 l-121 -121 321 -319 321 -318 250 -1 250 0 -440 440 c-242 242 -444 440 -450 440 -6 0 -65 -54 -131 -121z" />
    <path d="M3486 4326 c-57 -21 -88 -47 -116 -97 -51 -92 -18 -210 74 -264 92 -54 218 -22 270 68 32 56 40 97 27 145 -32 116 -152 186 -255 148z" />
    <path d="M2660 3330 l0 -470 885 0 885 0 0 470 0 470 -175 0 -175 0 0 -290 0 -290 -535 0 -535 0 0 290 0 290 -175 0 -175 0 0 -470z" />
  </g>
</svg>`;
}

// ============================================================
// Personalised bagua brand mark.
// 8 sector wedges, customer's 4 favourable filled olive, 4 cautious
// filled pale sand, compass labels on each, Kua number large in the
// centre well. Used on the Identity page.
// ============================================================

type Compass = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

const COMPASS_LIST: Compass[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

// Centre angle of each sector, in degrees from north clockwise.
const SECTOR_CENTRE_DEG: Record<Compass, number> = {
  N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315,
};

const EAST_GROUP_FAVOURABLE: Compass[] = ["N", "E", "SE", "S"];
const WEST_GROUP_FAVOURABLE: Compass[] = ["NE", "SW", "W", "NW"];

const CENTER = 200;
const R_OUTER = 180;
const R_INNER = 78;
const R_LABEL = 138; // where the compass labels sit
const HALF_SECTOR = 22.5;

function deg2xy(deg: number, r: number): { x: number; y: number } {
  const rad = (deg * Math.PI) / 180;
  return {
    x: CENTER + r * Math.sin(rad),
    y: CENTER - r * Math.cos(rad),
  };
}

function sectorPath(centreDeg: number): string {
  const start = centreDeg - HALF_SECTOR;
  const end = centreDeg + HALF_SECTOR;
  const a = deg2xy(start, R_OUTER);
  const b = deg2xy(end, R_OUTER);
  const c = deg2xy(end, R_INNER);
  const d = deg2xy(start, R_INNER);
  return (
    `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} ` +
    `A ${R_OUTER} ${R_OUTER} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)} ` +
    `L ${c.x.toFixed(2)} ${c.y.toFixed(2)} ` +
    `A ${R_INNER} ${R_INNER} 0 0 0 ${d.x.toFixed(2)} ${d.y.toFixed(2)} Z`
  );
}

// Quality codes used by the byQuality map. Matches lib/directions.ts.
type QualityCode = "SQ" | "TY" | "YN" | "FW" | "HH" | "WG" | "LS" | "JM";

const QUALITY_NAME: Record<QualityCode, string> = {
  SQ: "Sheng Qi",
  TY: "Tian Yi",
  YN: "Yan Nian",
  FW: "Fu Wei",
  HH: "Huo Hai",
  WG: "Wu Gui",
  LS: "Liu Sha",
  JM: "Jue Ming",
};

// Minimal Direction shape we read off context.byQuality. Avoids a
// type-import cycle and keeps the SVG layer decoupled from the
// directions data shape.
type ByQualityMap = Partial<Record<QualityCode, { compass: Compass }>>;

export function personalBaguaSvg(
  kua: number,
  group: KuaGroup,
  byQuality?: ByQualityMap,
  /** Compact render for the one-page reference card: smaller box,
   *  tighter margins, same drawing. */
  compact: boolean = false,
): string {
  const favourable = new Set<Compass>(
    group === "east" ? EAST_GROUP_FAVOURABLE : WEST_GROUP_FAVOURABLE,
  );

  // Map compass -> quality name (e.g. East -> "Sheng Qi") so each
  // sector can show the quality name below its compass label.
  const compassToQuality: Partial<Record<Compass, QualityCode>> = {};
  if (byQuality) {
    (Object.keys(byQuality) as QualityCode[]).forEach((q) => {
      const c = byQuality[q]?.compass;
      if (c) compassToQuality[c] = q;
    });
  }

  // Soft palette matching the existing Kua chart at /api/chart-image:
  // favourable sectors in soft sage, cautious in soft peach, both with
  // a paper-coloured hairline separating sectors. The inner well stays
  // white with a hairline.
  const sectors = COMPASS_LIST.map((c) => {
    const isFavourable = favourable.has(c);
    const fill = isFavourable ? C.oliveSoft : C.claySoft;
    const path = sectorPath(SECTOR_CENTRE_DEG[c]);
    return `<path d="${path}" fill="${fill}" stroke="${C.paper}" stroke-width="2"/>`;
  }).join("\n  ");

  // Two-line label per sector: compass abbreviation (top) + quality
  // pinyin name (below). Compass label at R_LABEL_TOP, pinyin name
  // at R_LABEL_BOTTOM so the two stack cleanly inside each wedge.
  const R_LABEL_TOP = R_LABEL + 12;
  const R_LABEL_BOTTOM = R_LABEL - 12;

  const labels = COMPASS_LIST.map((c) => {
    const top = deg2xy(SECTOR_CENTRE_DEG[c], R_LABEL_TOP);
    const bottom = deg2xy(SECTOR_CENTRE_DEG[c], R_LABEL_BOTTOM);
    const quality = compassToQuality[c];
    const qualityLabel = quality ? QUALITY_NAME[quality] : "";
    return (
      `<text x="${top.x.toFixed(2)}" y="${top.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-family="Hanken Grotesk" font-size="16" font-weight="700" fill="${C.ink}">${c}</text>\n  ` +
      `<text x="${bottom.x.toFixed(2)}" y="${bottom.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-family="Hanken Grotesk" font-size="9" font-weight="600" fill="${C.ink2}" letter-spacing="0.4">${qualityLabel}</text>`
    );
  }).join("\n  ");

  // Tiny quality marker (star for favourable, X for cautious) sits
  // closer to the inner well so it does not collide with the new
  // quality name labels above.
  const markers = COMPASS_LIST.map((c) => {
    const pos = deg2xy(SECTOR_CENTRE_DEG[c], R_INNER + 12);
    const isFavourable = favourable.has(c);
    const glyph = isFavourable ? "&#9733;" : "&#10005;";
    return `<text x="${pos.x.toFixed(2)}" y="${pos.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-family="Hanken Grotesk" font-size="11" font-weight="600" fill="${C.ink2}">${glyph}</text>`;
  }).join("\n  ");

  const groupLabel = group === "east" ? "EAST GROUP" : "WEST GROUP";

  // ViewBox extends to 480px tall to leave room for the legend below
  // the bagua. Render width stays 280px; height scales proportionally
  // (280 * 480 / 400 = 336).
  const w = compact ? 180 : 280;
  const h = compact ? 216 : 336;
  const mg = compact ? "2mm auto 3mm auto" : "10mm auto 12mm auto";

  return `<svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" style="display:block;margin:${mg};">
  <!-- Outer hairline ring -->
  <circle cx="${CENTER}" cy="${CENTER}" r="${R_OUTER + 4}" fill="none" stroke="${C.hairline}" stroke-width="0.8"/>
  <!-- 8 sectors -->
  ${sectors}
  <!-- Compass labels on each sector -->
  ${labels}
  <!-- Quality glyphs (star for favourable, X for cautious) -->
  ${markers}
  <!-- Inner well -->
  <circle cx="${CENTER}" cy="${CENTER}" r="${R_INNER - 2}" fill="#ffffff" stroke="${C.hairline}" stroke-width="1"/>
  <!-- 'YOUR KUA' microlabel above the number, matching the saved-chart convention -->
  <text x="${CENTER}" y="${CENTER - 22}" text-anchor="middle" dominant-baseline="central" font-family="Hanken Grotesk" font-size="9" font-weight="500" fill="${C.ink2}" letter-spacing="2.5">YOUR KUA</text>
  <!-- Kua number -->
  <text x="${CENTER}" y="${CENTER + 8}" text-anchor="middle" dominant-baseline="central" font-family="Hanken Grotesk" font-size="56" font-weight="800" fill="${C.ink}">${kua}</text>
  <!-- Group label below -->
  <text x="${CENTER}" y="${CENTER + 38}" text-anchor="middle" dominant-baseline="central" font-family="Hanken Grotesk" font-size="9" font-weight="700" fill="${C.olive}" letter-spacing="1.8">${groupLabel}</text>
  <!-- Legend below the chart: green dot = Beneficial, peach dot = Non-beneficial -->
  <g transform="translate(0, 425)">
    <circle cx="135" cy="0" r="10" fill="${C.oliveSoft}" stroke="${C.hairline}" stroke-width="0.8"/>
    <text x="155" y="0" dominant-baseline="central" font-family="Hanken Grotesk" font-size="14" font-weight="600" fill="${C.ink}">Beneficial</text>
  </g>
  <g transform="translate(0, 455)">
    <circle cx="135" cy="0" r="10" fill="${C.claySoft}" stroke="${C.hairline}" stroke-width="0.8"/>
    <text x="155" y="0" dominant-baseline="central" font-family="Hanken Grotesk" font-size="14" font-weight="600" fill="${C.ink}">Non-beneficial</text>
  </g>
</svg>`;
}

// ============================================================
// Element icons - one per element.
// Each icon ~56px square, drawn in brand colours. They sit in a row
// below the Identity page's favourable-directions bullets.
// ============================================================

// Icon size (display px). At ~3.78px per mm, 200px ~= 53mm.
// Three icons in a row at 200px each plus padding fills most of the
// A4 content column (210mm - 40mm margin = 170mm content width).
const ICON_SIZE = 200;

function waterIcon(): string {
  // Wave drops
  return `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="${ICON_SIZE}" height="${ICON_SIZE}">
  <circle cx="40" cy="40" r="36" fill="${C.oliveSoft}"/>
  <path d="M 22 50 Q 30 42 38 50 T 58 50" fill="none" stroke="${C.olive}" stroke-width="3" stroke-linecap="round"/>
  <path d="M 22 38 Q 30 30 38 38 T 58 38" fill="none" stroke="${C.olive}" stroke-width="3" stroke-linecap="round"/>
  <path d="M 22 26 Q 30 18 38 26 T 58 26" fill="none" stroke="${C.olive}" stroke-width="3" stroke-linecap="round"/>
</svg>`;
}

function fireIcon(): string {
  // Flame
  return `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="${ICON_SIZE}" height="${ICON_SIZE}">
  <circle cx="40" cy="40" r="36" fill="${C.claySoft}"/>
  <path d="M 40 18 C 50 30 55 40 50 50 C 48 54 44 56 40 56 C 36 56 32 54 30 50 C 25 40 30 30 40 18 Z" fill="${C.clay}"/>
  <path d="M 40 28 C 46 36 48 42 45 48 C 44 50 42 51 40 51 C 38 51 36 50 35 48 C 32 42 34 36 40 28 Z" fill="${C.paper}" opacity="0.5"/>
</svg>`;
}

function woodIcon(): string {
  // Sapling / leaf
  return `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="${ICON_SIZE}" height="${ICON_SIZE}">
  <circle cx="40" cy="40" r="36" fill="${C.oliveSoft}"/>
  <line x1="40" y1="58" x2="40" y2="32" stroke="${C.olive}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 40 38 C 32 36 26 32 26 24 C 34 24 40 28 40 38 Z" fill="${C.olive}"/>
  <path d="M 40 32 C 48 30 54 26 54 18 C 46 18 40 22 40 32 Z" fill="${C.olive}"/>
</svg>`;
}

function metalIcon(): string {
  // Crescent moon (harvest)
  return `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="${ICON_SIZE}" height="${ICON_SIZE}">
  <circle cx="40" cy="40" r="36" fill="${C.sand}"/>
  <path d="M 50 22 A 22 22 0 1 0 50 58 A 16 16 0 1 1 50 22 Z" fill="${C.ink}"/>
</svg>`;
}

function earthIcon(): string {
  // Hill / mountain
  return `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="${ICON_SIZE}" height="${ICON_SIZE}">
  <circle cx="40" cy="40" r="36" fill="${C.sand}"/>
  <path d="M 16 56 L 32 32 L 44 46 L 56 28 L 64 56 Z" fill="${C.clay}"/>
  <line x1="14" y1="56" x2="66" y2="56" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>
</svg>`;
}

// ============================================================
// Element icons.
//
// A row of large round element icons appropriate to the customer's
// group. East group gets three (water + fire + wood). West group
// gets two (earth + metal). Each icon is ~53mm wide so a row of
// three almost fills the A4 content column width (~170mm).
//
// No surrounding frame or heart - the icons stand on their own.
// ============================================================

function iconCell(svg: string, label: string): string {
  return `<td style="padding:0 4px;text-align:center;vertical-align:top;">
  ${svg}
  <div style="font-family:'Hanken Grotesk';font-size:11pt;font-weight:700;color:${C.ink};margin-top:4mm;letter-spacing:2.4px;">${label}</div>
</td>`;
}

/** Single element icon + label, centred. Used by the Kua-element
 *  chapter (CV3) to show the one element the customer's Kua carries. */
export function elementIconSvg(element: string): string {
  const icons: Record<string, () => string> = {
    water: waterIcon,
    fire: fireIcon,
    wood: woodIcon,
    metal: metalIcon,
    earth: earthIcon,
  };
  const icon = icons[element];
  if (!icon) return "";
  return `<div style="text-align:center;margin:6mm auto 7mm auto;">
  <div style="display:inline-block;">${icon()}</div>
  <div style="font-family:'Hanken Grotesk';font-size:11pt;font-weight:700;color:${C.ink};margin-top:3mm;letter-spacing:2.4px;">${element.toUpperCase()}</div>
</div>`;
}

export function elementIconsSvg(group: KuaGroup): string {
  // For East group: water (N), fire (S), wood (E+SE) - three icons.
  // For West group: earth (SW+NE), metal (W+NW) - two icons.
  const cells: string[] =
    group === "east"
      ? [
          iconCell(waterIcon(), "WATER"),
          iconCell(fireIcon(), "FIRE"),
          iconCell(woodIcon(), "WOOD"),
        ]
      : [iconCell(earthIcon(), "EARTH"), iconCell(metalIcon(), "METAL")];

  return `<table style="border-collapse:collapse;margin:8mm auto 8mm auto;"><tr>
${cells.join("\n")}
</tr></table>`;
}

// ============================================================
// Element colour swatches.
//
// A compact row of colour chips showing the colour families the
// tradition associates with the customer's group's supportive
// elements. East: dark blue (water), green (wood), red (fire).
// West: terracotta/cream (earth), white/grey/gold (metal).
//
// Each chip is a rounded rectangle with the colour family name and
// element label underneath. Renders below the "What East/West group
// means" element list on the Identity page.
// ============================================================

type Swatch = { fill: string; label: string; element: string };

const EAST_SWATCHES: Swatch[] = [
  { fill: "#1f3a5f", label: "Dark blue", element: "WATER" },
  { fill: "#5e7a3a", label: "Green", element: "WOOD" },
  { fill: "#c2453a", label: "Red", element: "FIRE" },
];

const WEST_SWATCHES: Swatch[] = [
  { fill: "#b87248", label: "Terracotta", element: "EARTH" },
  { fill: "#b5b0a3", label: "Silver-grey", element: "METAL" },
];

function swatchCell(s: Swatch): string {
  return `<td style="padding:0 6px;text-align:center;vertical-align:top;">
  <div style="display:inline-block;width:30mm;height:18mm;background:${s.fill};border-radius:2mm;border:1px solid ${C.hairline};"></div>
  <div style="font-family:'Hanken Grotesk';font-size:9pt;color:${C.ink};margin-top:2mm;">${s.label}</div>
  <div style="font-family:'Hanken Grotesk';font-size:8pt;font-weight:700;color:${C.ink2};margin-top:1mm;letter-spacing:1.6px;">${s.element}</div>
</td>`;
}

export function elementSwatchesSvg(group: KuaGroup): string {
  const swatches = group === "east" ? EAST_SWATCHES : WEST_SWATCHES;
  const cells = swatches.map(swatchCell).join("\n");
  return `<table style="border-collapse:collapse;margin:6mm auto 4mm auto;"><tr>
${cells}
</tr></table>`;
}

// ============================================================
// Compass v2 visual system (CV2-002).
//
// miniCompassSvg      - compact ring with ONE highlighted sector; sits
//                       at the top of each direction chapter so the
//                       reader sees where the chapter's quality lives
//                       on their own compass.
// bedPlacementSvg /   - schematic plan-view diagrams that settle the
// deskPlacementSvg      "head points toward vs body faces" confusion
//                       visually. The furniture stays fixed (target
//                       wall at the top) and the small compass rose
//                       rotates so the chapter's direction reads "up".
// floorPlanExampleSvg - static worked example for the find-your-
//                       directions chapter: a small flat with the
//                       eight directions drawn from the centre.
// ============================================================

/** Compass rose letter positions rotated so `up` is at the top. */
function rotatedRose(
  cx: number,
  cy: number,
  r: number,
  up: Compass,
  accent: string,
): string {
  const ring = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.paper}" stroke="${C.hairline}" stroke-width="1.5"/>`;
  const ticks = COMPASS_LIST.map((c) => {
    const deg = SECTOR_CENTRE_DEG[c] - SECTOR_CENTRE_DEG[up];
    const rad = (deg * Math.PI) / 180;
    const lx = cx + (r - 20) * Math.sin(rad);
    const ly = cy - (r - 20) * Math.cos(rad);
    const tx = cx + (r - 6) * Math.sin(rad);
    const ty = cy - (r - 6) * Math.cos(rad);
    const t2x = cx + (r - 13) * Math.sin(rad);
    const t2y = cy - (r - 13) * Math.cos(rad);
    const isUp = c === up;
    const label = `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-family="Hanken Grotesk" font-size="${isUp ? 17 : 13}" font-weight="${isUp ? 800 : 600}" fill="${isUp ? accent : C.ink2}">${c}</text>`;
    const tick = `<line x1="${tx.toFixed(1)}" y1="${ty.toFixed(1)}" x2="${t2x.toFixed(1)}" y2="${t2y.toFixed(1)}" stroke="${isUp ? accent : C.hairline}" stroke-width="${isUp ? 2.5 : 1.2}"/>`;
    return tick + "\n  " + label;
  }).join("\n  ");
  // Needle pointing up (to the highlighted direction). Kept short so
  // its tip never crowds the highlighted letter above it.
  const needle = `<path d="M ${cx} ${cy - r + 44} L ${cx - 7} ${cy + 10} L ${cx} ${cy + 2} L ${cx + 7} ${cy + 10} Z" fill="${accent}" opacity="0.9"/>
  <circle cx="${cx}" cy="${cy}" r="4.5" fill="${C.ink}"/>`;
  return ring + "\n  " + ticks + "\n  " + needle;
}

/**
 * Compact personalised compass for a direction chapter. All eight
 * sectors in quiet sand except the chapter's direction, filled and
 * stroked in the quality tone (olive for supportive, clay for
 * cautious), with the direction word and quality name in the well.
 */
export function miniCompassSvg(
  compass: Compass,
  compassLabel: string,
  qualityName: string,
  favourable: boolean,
): string {
  const accent = favourable ? C.olive : C.clay;
  const fill = favourable ? C.oliveSoft : C.claySoft;

  const sectors = COMPASS_LIST.map((c) => {
    const isHit = c === compass;
    const path = sectorPath(SECTOR_CENTRE_DEG[c]);
    return `<path d="${path}" fill="${isHit ? fill : C.sand}" stroke="${C.paper}" stroke-width="2"/>`;
  }).join("\n  ");

  // Re-stroke the highlighted sector on top so its outline is not
  // painted over by its neighbours.
  const hitOutline = `<path d="${sectorPath(SECTOR_CENTRE_DEG[compass])}" fill="none" stroke="${accent}" stroke-width="2.5"/>`;

  const labels = COMPASS_LIST.map((c) => {
    const pos = deg2xy(SECTOR_CENTRE_DEG[c], R_LABEL);
    const isHit = c === compass;
    return `<text x="${pos.x.toFixed(2)}" y="${pos.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-family="Hanken Grotesk" font-size="${isHit ? 19 : 15}" font-weight="${isHit ? 800 : 600}" fill="${isHit ? accent : C.ink2}">${c}</text>`;
  }).join("\n  ");

  // Small pointer nub at the inner edge of the highlighted sector.
  const nub = deg2xy(SECTOR_CENTRE_DEG[compass], R_INNER + 10);
  const pointer = `<circle cx="${nub.x.toFixed(2)}" cy="${nub.y.toFixed(2)}" r="5" fill="${accent}"/>`;

  const dirWord = compassLabel.toUpperCase();
  const dirSize = dirWord.length > 7 ? 20 : 26;

  return `<div class="figure">
<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" width="185" height="185" style="display:block;margin:0 auto;">
  <circle cx="${CENTER}" cy="${CENTER}" r="${R_OUTER + 4}" fill="none" stroke="${C.hairline}" stroke-width="0.8"/>
  ${sectors}
  ${hitOutline}
  ${labels}
  ${pointer}
  <circle cx="${CENTER}" cy="${CENTER}" r="${R_INNER - 2}" fill="#ffffff" stroke="${C.hairline}" stroke-width="1"/>
  <text x="${CENTER}" y="${CENTER - 16}" text-anchor="middle" dominant-baseline="central" font-family="Hanken Grotesk" font-size="10" font-weight="600" fill="${C.ink2}" letter-spacing="2">${qualityName.toUpperCase()}</text>
  <text x="${CENTER}" y="${CENTER + 10}" text-anchor="middle" dominant-baseline="central" font-family="Hanken Grotesk" font-size="${dirSize}" font-weight="800" fill="${accent}">${dirWord}</text>
</svg>
<p class="figure-caption">Your ${qualityName} direction on the compass: <strong>${compassLabel}</strong>.</p>
</div>`;
}

/**
 * Plan-view bed diagram. The target wall is always drawn at the top;
 * the rose on the right shows how the whole picture sits in the
 * reader's real home for THIS direction.
 */
export function bedPlacementSvg(
  compass: Compass,
  compassLabel: string,
  favourable: boolean,
): string {
  const accent = favourable ? C.olive : C.clay;
  const soft = favourable ? C.oliveSoft : C.claySoft;
  return `<div class="figure">
<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" width="440" height="220" style="display:block;margin:0 auto;">
  <!-- Room -->
  <rect x="40" y="52" width="280" height="230" fill="${C.paper}" stroke="${C.ink2}" stroke-width="1.5"/>
  <!-- The target wall, emphasised -->
  <line x1="40" y1="52" x2="320" y2="52" stroke="${accent}" stroke-width="5"/>
  <text x="180" y="34" text-anchor="middle" font-family="Hanken Grotesk" font-size="14" font-weight="800" fill="${accent}" letter-spacing="1.5">THE ${compassLabel.toUpperCase()} WALL</text>
  <!-- Bed: headboard against the target wall -->
  <rect x="120" y="56" width="120" height="14" rx="3" fill="${accent}"/>
  <rect x="120" y="70" width="120" height="130" rx="6" fill="${soft}" stroke="${accent}" stroke-width="1.5"/>
  <rect x="130" y="78" width="44" height="26" rx="4" fill="${C.paper}" stroke="${C.hairline}" stroke-width="1"/>
  <rect x="186" y="78" width="44" height="26" rx="4" fill="${C.paper}" stroke="${C.hairline}" stroke-width="1"/>
  <line x1="120" y1="146" x2="240" y2="146" stroke="${C.paper}" stroke-width="3"/>
  <!-- Arrow: top of the head points at the wall -->
  <line x1="180" y1="188" x2="180" y2="120" stroke="${C.ink}" stroke-width="2.5"/>
  <path d="M 180 108 L 173 122 L 187 122 Z" fill="${C.ink}"/>
  <text x="180" y="216" text-anchor="middle" font-family="Hanken Grotesk" font-size="12.5" font-weight="600" fill="${C.ink}">the top of your head</text>
  <text x="180" y="234" text-anchor="middle" font-family="Hanken Grotesk" font-size="12.5" font-weight="600" fill="${C.ink}">points ${compassLabel}</text>
  <!-- Rotated rose -->
  ${rotatedRose(490, 167, 92, compass, accent)}
  <text x="490" y="290" text-anchor="middle" font-family="Hanken Grotesk" font-size="12" font-weight="600" fill="${C.ink2}">in your home, ${compassLabel} is wherever</text>
  <text x="490" y="307" text-anchor="middle" font-family="Hanken Grotesk" font-size="12" font-weight="600" fill="${C.ink2}">the ${compass} on your phone compass sits</text>
</svg>
<p class="figure-caption">The bed read for ${compassLabel}: headboard on the ${compassLabel} wall, so the top of your head points ${compassLabel}.</p>
</div>`;
}

/**
 * Plan-view desk diagram: the body faces the direction; the chair,
 * not the desk, is what the system reads.
 */
export function deskPlacementSvg(
  compass: Compass,
  compassLabel: string,
  favourable: boolean,
): string {
  const accent = favourable ? C.olive : C.clay;
  const soft = favourable ? C.oliveSoft : C.claySoft;
  return `<div class="figure">
<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" width="440" height="220" style="display:block;margin:0 auto;">
  <!-- Room -->
  <rect x="40" y="52" width="280" height="230" fill="${C.paper}" stroke="${C.ink2}" stroke-width="1.5"/>
  <line x1="40" y1="52" x2="320" y2="52" stroke="${accent}" stroke-width="5"/>
  <text x="180" y="34" text-anchor="middle" font-family="Hanken Grotesk" font-size="14" font-weight="800" fill="${accent}" letter-spacing="1.5">FACING ${compassLabel.toUpperCase()}</text>
  <!-- Desk against the top wall -->
  <rect x="110" y="66" width="140" height="34" rx="4" fill="${soft}" stroke="${accent}" stroke-width="1.5"/>
  <!-- Chair + person -->
  <rect x="152" y="118" width="56" height="12" rx="6" fill="${C.sand}" stroke="${C.ink2}" stroke-width="1"/>
  <circle cx="180" cy="148" r="16" fill="${C.paper}" stroke="${C.ink}" stroke-width="2"/>
  <!-- Gaze arrow: the body faces the wall -->
  <line x1="180" y1="196" x2="180" y2="118" stroke="${C.ink}" stroke-width="2.5"/>
  <path d="M 180 106 L 173 120 L 187 120 Z" fill="${C.ink}"/>
  <text x="180" y="224" text-anchor="middle" font-family="Hanken Grotesk" font-size="12.5" font-weight="600" fill="${C.ink}">your body faces</text>
  <text x="180" y="242" text-anchor="middle" font-family="Hanken Grotesk" font-size="12.5" font-weight="600" fill="${C.ink}">${compassLabel} while you sit</text>
  <!-- Rotated rose -->
  ${rotatedRose(490, 167, 92, compass, accent)}
  <text x="490" y="290" text-anchor="middle" font-family="Hanken Grotesk" font-size="12" font-weight="600" fill="${C.ink2}">turn the chair, not the desk -</text>
  <text x="490" y="307" text-anchor="middle" font-family="Hanken Grotesk" font-size="12" font-weight="600" fill="${C.ink2}">the system reads where you look</text>
</svg>
<p class="figure-caption">The seat read for ${compassLabel}: the chair turns so your body faces ${compassLabel}.</p>
</div>`;
}

/**
 * Static worked example for the find-your-directions chapter: a small
 * flat, a reader standing at the centre, and the eight directions
 * drawn out to the walls. North is up.
 */
export function floorPlanExampleSvg(): string {
  const cx = 320;
  const cy = 232;
  // Spokes to the eight directions, drawn from the centre dot.
  const spokes = COMPASS_LIST.map((c) => {
    const deg = SECTOR_CENTRE_DEG[c];
    const rad = (deg * Math.PI) / 180;
    const r = 150;
    const x = cx + r * Math.sin(rad);
    const y = cy - r * Math.cos(rad);
    const lx = cx + (r + 22) * Math.sin(rad);
    const ly = cy - (r + 22) * Math.cos(rad);
    const isN = c === "N";
    return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${C.olive}" stroke-width="${isN ? 2 : 1}" stroke-dasharray="${isN ? "none" : "4 4"}" opacity="0.55"/>
  <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-family="Hanken Grotesk" font-size="${isN ? 17 : 13}" font-weight="${isN ? 800 : 700}" fill="${isN ? C.clay : C.ink}">${c}</text>`;
  }).join("\n  ");

  const roomLabel = (x: number, y: number, label: string) =>
    `<text x="${x}" y="${y}" text-anchor="middle" font-family="Hanken Grotesk" font-size="11.5" font-weight="700" fill="${C.ink2}" letter-spacing="1.2">${label}</text>`;

  return `<div class="figure">
<svg viewBox="0 0 640 470" xmlns="http://www.w3.org/2000/svg" width="470" height="345" style="display:block;margin:0 auto;">
  <!-- Outer walls -->
  <rect x="120" y="60" width="400" height="344" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>
  <!-- Inner walls -->
  <line x1="320" y1="60" x2="320" y2="200" stroke="${C.ink2}" stroke-width="1.5"/>
  <line x1="120" y1="200" x2="520" y2="200" stroke="${C.ink2}" stroke-width="1.5"/>
  <line x1="400" y1="200" x2="400" y2="404" stroke="${C.ink2}" stroke-width="1.5"/>
  <!-- Door notch (entrance, south wall) -->
  <line x1="292" y1="404" x2="348" y2="404" stroke="${C.paper}" stroke-width="4"/>
  <path d="M 292 404 A 56 56 0 0 1 348 404" fill="none" stroke="${C.hairline}" stroke-width="1.2"/>
  <!-- Room names -->
  ${roomLabel(220, 138, "KITCHEN")}
  ${roomLabel(420, 138, "BEDROOM")}
  ${roomLabel(252, 316, "LIVING ROOM")}
  ${roomLabel(460, 316, "BATH")}
  ${roomLabel(320, 434, "ENTRANCE")}
  <!-- Spokes + direction letters -->
  ${spokes}
  <!-- The reader at the centre -->
  <circle cx="${cx}" cy="${cy}" r="9" fill="${C.clay}"/>
  <circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="${C.clay}" stroke-width="1.5" opacity="0.5"/>
  <text x="${cx}" y="${cy + 34}" text-anchor="middle" font-family="Hanken Grotesk" font-size="12" font-weight="700" fill="${C.clay}">you stand here</text>
</svg>
<p class="figure-caption">A worked example: one reading from the centre of the home gives every room its directions. In this flat the bedroom sits northeast, the kitchen northwest, the entrance south.</p>
</div>`;
}
