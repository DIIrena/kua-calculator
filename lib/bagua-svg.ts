// Server-side SVG string generator for the bagua diagram. Same geometry
// as components/BaguaDiagram.tsx but emits a self-contained SVG string
// with every fill / stroke / font attribute inline (no CSS classes),
// so it can be:
//   1. Embedded directly in transactional emails (Apple Mail renders it).
//   2. Rasterised to PNG by /api/chart-image/[id] for Gmail (which
//      strips inline SVG from email bodies).

import type { Compass, Direction } from "@/lib/directions";

const COMPASS_ORDER: ReadonlyArray<Compass> = [
  "N", "NE", "E", "SE", "S", "SW", "W", "NW",
];
const COMPASS_ANGLE: Record<Compass, number> = {
  N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315,
};
const CARDINAL = new Set<Compass>(["N", "E", "S", "W"]);

// Brand palette (mirrors brand/BRAND_BOOK.md and the site's :root).
const COLOR = {
  paper:    "#fbf7ee",
  hairline: "#cfc4ab",
  greenSoft:"#d8debf",
  claySoft: "#f0d5c0",
  ink:      "#2a271e",
  ink2:     "#5f5848",
};

// Server-side PNG rasterisation (Resvg) loads Hanken Grotesk from
// @fontsource and uses "Hanken Grotesk" as the family name. The other
// names are fallbacks for any client that ever renders the raw SVG
// directly (e.g. Apple Mail).
const BODY_FONT =
  "'Hanken Grotesk',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";

// Geometry (matches BaguaDiagram.tsx so the email looks identical to
// the web view, give or take font kerning).
const CENTER_X = 280;
const CENTER_Y = 310;
const R_OUTER = 220;
const R_INNER = 76;
const R_LABEL_TOP = 178;
const R_LABEL_MID = 138;
const R_ICON = 100;
const R_RING_LABEL = 260;
const HALF_RAD = (22.5 * Math.PI) / 180;

function segmentPath(): string {
  const x = R_OUTER * Math.sin(HALF_RAD);
  const y = -R_OUTER * Math.cos(HALF_RAD);
  const xi = R_INNER * Math.sin(HALF_RAD);
  const yi = -R_INNER * Math.cos(HALF_RAD);
  return (
    `M ${-xi} ${yi} ` +
    `L ${-x} ${y} ` +
    `A ${R_OUTER} ${R_OUTER} 0 0 1 ${x} ${y} ` +
    `L ${xi} ${yi} ` +
    `A ${R_INNER} ${R_INNER} 0 0 0 ${-xi} ${yi} Z`
  );
}

function ringLabelPos(angleDeg: number, r: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER_X + r * Math.sin(rad),
    y: CENTER_Y - r * Math.cos(rad),
  };
}

export type BaguaSvgOptions = {
  /** Drawing width (the viewBox stays 560x600). */
  width?: number;
};

export function buildBaguaSvgString(
  kua: number,
  directionsByCompass: Record<string, Direction>,
  options: BaguaSvgOptions = {},
): string {
  const width = options.width ?? 320;
  const aspect = 600 / 560;
  const height = Math.round(width * aspect);
  const seg = segmentPath();

  const segments = COMPASS_ORDER
    .map((compass) => {
      const dir = directionsByCompass[compass];
      if (!dir) return "";
      const angle = COMPASS_ANGLE[compass];
      const fill = dir.favourable ? COLOR.greenSoft : COLOR.claySoft;
      const icon = dir.favourable ? "&#9733;" : "&#10005;";
      return `
        <g transform="rotate(${angle})">
          <path d="${seg}" fill="${fill}" stroke="${COLOR.paper}" stroke-width="2" />
          <text x="0" y="${-R_LABEL_TOP}" text-anchor="middle" dominant-baseline="central" font-family="${BODY_FONT}" font-size="24" font-weight="700" fill="${COLOR.ink}">${compass}</text>
          <text x="0" y="${-R_LABEL_MID}" text-anchor="middle" dominant-baseline="central" font-family="${BODY_FONT}" font-size="16" font-weight="600" fill="${COLOR.ink}">${dir.pinyin}</text>
          <text x="0" y="${-R_ICON}" text-anchor="middle" dominant-baseline="central" font-family="${BODY_FONT}" font-size="20" font-weight="700" fill="${COLOR.ink}">${icon}</text>
        </g>`;
    })
    .join("");

  const ringLabels = COMPASS_ORDER
    .map((compass) => {
      const pos = ringLabelPos(COMPASS_ANGLE[compass], R_RING_LABEL);
      const cardinal = CARDINAL.has(compass);
      const size = cardinal ? 15 : 12;
      const weight = cardinal ? 700 : 500;
      const fill = cardinal ? COLOR.ink : COLOR.ink2;
      const label = directionsByCompass[compass]?.compassLabel ?? compass;
      return `<text x="${pos.x}" y="${pos.y}" text-anchor="middle" dominant-baseline="central" font-family="${BODY_FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}">${label}</text>`;
    })
    .join("");

  return `<svg viewBox="0 0 560 600" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bagua chart for Kua ${kua}">
  <circle cx="${CENTER_X}" cy="${CENTER_Y}" r="${R_OUTER + 10}" fill="${COLOR.paper}" />
  <g transform="translate(${CENTER_X} ${CENTER_Y})">${segments}</g>
  <circle cx="${CENTER_X}" cy="${CENTER_Y}" r="${R_INNER - 4}" fill="#ffffff" stroke="${COLOR.hairline}" stroke-width="1" />
  <text x="${CENTER_X}" y="${CENTER_Y - 28}" text-anchor="middle" font-family="${BODY_FONT}" font-size="11" font-weight="500" fill="${COLOR.ink2}" letter-spacing="0.08em">YOUR KUA</text>
  <text x="${CENTER_X}" y="${CENTER_Y + 16}" text-anchor="middle" dominant-baseline="central" font-family="${BODY_FONT}" font-size="64" font-weight="800" fill="${COLOR.ink}">${kua}</text>
  ${ringLabels}
</svg>`;
}
