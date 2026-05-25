// Server-side renderer for the chart email. Builds the HTML and plain-text
// versions of an email containing a person's Kua chart. Inline-styled so it
// renders across email clients (Gmail, Apple Mail, Outlook). Brand palette
// matches auth.ts's sign-in email and the on-site brand book.
//
// Uses an HTML-table layout for the 8 direction "cards" because tables are
// the only layout primitive that renders reliably in Outlook. SVG of the
// bagua is intentionally not inlined - some clients strip SVG. Instead the
// email links to the full chart view (/account/chart/[id]) where the bagua
// renders properly.

import type { Direction, QualityCode } from "@/lib/directions";
import { QUALITY_DETAILS } from "@/lib/directions";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Brand tokens (kept literal here so the email is portable; mirrors
// brand/BRAND_BOOK.md and the site's :root variables).
const COLOR = {
  cream:    "#f1e9d8",
  paper:    "#fbf7ee",
  sand:     "#e0d3b8",
  hairline: "#cfc4ab",
  green:    "#4f5a36",
  greenSoft:"#d8debf",
  claySoft: "#f0d5c0",
  clayDeep: "#9c5331",
  ink:      "#2a271e",
  ink2:     "#5f5848",
};

const SCRIPT_FONT = "Brush Script MT, Lucida Handwriting, cursive";
const BODY_FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";

export type ChartEmailInput = {
  toEmail: string;
  siteUrl: string;
  chartId: string;
  label: string | null;
  kua: number;
  group: "east" | "west";
  birthYear: number | null;
  birthMonth: number | null;
  birthDay: number | null;
  gender: string | null;
  directions: Direction[]; // ordered favourable-first
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function birthDateString(input: ChartEmailInput): string | null {
  if (!input.birthYear || !input.birthMonth || !input.birthDay) return null;
  return `${MONTHS[input.birthMonth - 1]} ${input.birthDay}, ${input.birthYear}`;
}

// Inline-styled SVG bagua for the email. Same geometry as
// components/BaguaDiagram.tsx but written as a string with every
// fill / stroke / font attribute inline, because email clients do
// not load external CSS. Sized to render at 320px on screen
// (viewBox is the larger drawing space). Gmail and Apple Mail
// render this; Outlook desktop strips SVG, so the table layout
// below is the universal fallback.
const COMPASS_ORDER: ReadonlyArray<"N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"> = [
  "N", "NE", "E", "SE", "S", "SW", "W", "NW",
];
const COMPASS_ANGLE: Record<string, number> = {
  N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315,
};
const CARDINAL_SET = new Set(["N", "E", "S", "W"]);

function buildBaguaSvgHtml(
  kua: number,
  directionsByCompass: Record<string, { compass: string; compassLabel: string; pinyin: string; favourable: boolean }>,
): string {
  const CENTER_X = 280;
  const CENTER_Y = 310;
  const R_OUTER = 220;
  const R_INNER = 76;
  const R_LABEL_TOP = 178;
  const R_LABEL_MID = 138;
  const R_ICON = 100;
  const R_RING_LABEL = 260;
  const HALF_RAD = (22.5 * Math.PI) / 180;

  const x = R_OUTER * Math.sin(HALF_RAD);
  const y = -R_OUTER * Math.cos(HALF_RAD);
  const xi = R_INNER * Math.sin(HALF_RAD);
  const yi = -R_INNER * Math.cos(HALF_RAD);
  const segPath =
    `M ${-xi} ${yi} ` +
    `L ${-x} ${y} ` +
    `A ${R_OUTER} ${R_OUTER} 0 0 1 ${x} ${y} ` +
    `L ${xi} ${yi} ` +
    `A ${R_INNER} ${R_INNER} 0 0 0 ${-xi} ${yi} Z`;

  const ringLabelPos = (angleDeg: number, r: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: CENTER_X + r * Math.sin(rad),
      y: CENTER_Y - r * Math.cos(rad),
    };
  };

  const segments = COMPASS_ORDER
    .map((compass) => {
      const dir = directionsByCompass[compass];
      if (!dir) return "";
      const angle = COMPASS_ANGLE[compass];
      const fill = dir.favourable ? COLOR.greenSoft : COLOR.claySoft;
      const icon = dir.favourable ? "&#9733;" : "&#10005;";
      return `
        <g transform="rotate(${angle})">
          <path d="${segPath}" fill="${fill}" stroke="${COLOR.paper}" stroke-width="2" />
          <text x="0" y="${-R_LABEL_TOP}" text-anchor="middle" dominant-baseline="central" font-family="${BODY_FONT}" font-size="24" font-weight="700" fill="${COLOR.ink}">${compass}</text>
          <text x="0" y="${-R_LABEL_MID}" text-anchor="middle" dominant-baseline="central" font-family="${BODY_FONT}" font-size="16" font-weight="600" fill="${COLOR.ink}">${dir.pinyin}</text>
          <text x="0" y="${-R_ICON}" text-anchor="middle" dominant-baseline="central" font-family="${BODY_FONT}" font-size="20" font-weight="700" fill="${COLOR.ink}">${icon}</text>
        </g>`;
    })
    .join("");

  const ringLabels = COMPASS_ORDER
    .map((compass) => {
      const pos = ringLabelPos(COMPASS_ANGLE[compass], R_RING_LABEL);
      const cardinal = CARDINAL_SET.has(compass);
      const size = cardinal ? 15 : 12;
      const weight = cardinal ? 700 : 500;
      const fill = cardinal ? COLOR.ink : COLOR.ink2;
      const label = directionsByCompass[compass]?.compassLabel ?? compass;
      return `<text x="${pos.x}" y="${pos.y}" text-anchor="middle" dominant-baseline="central" font-family="${BODY_FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}">${label}</text>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 560 600" width="320" height="343" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bagua chart for Kua ${kua}">
      <circle cx="${CENTER_X}" cy="${CENTER_Y}" r="${R_OUTER + 10}" fill="${COLOR.paper}" />
      <g transform="translate(${CENTER_X} ${CENTER_Y})">${segments}</g>
      <circle cx="${CENTER_X}" cy="${CENTER_Y}" r="${R_INNER - 4}" fill="#ffffff" stroke="${COLOR.hairline}" stroke-width="1" />
      <text x="${CENTER_X}" y="${CENTER_Y - 28}" text-anchor="middle" font-family="${BODY_FONT}" font-size="11" font-weight="500" fill="${COLOR.ink2}" letter-spacing="0.08em">YOUR KUA</text>
      <text x="${CENTER_X}" y="${CENTER_Y + 16}" text-anchor="middle" dominant-baseline="central" font-family="${BODY_FONT}" font-size="64" font-weight="800" fill="${COLOR.ink}">${kua}</text>
      ${ringLabels}
    </svg>`;
}

function chartTitle(input: ChartEmailInput): string {
  return input.label ?? `Kua ${input.kua} chart`;
}

// One row of the 8-direction list. Uses a single-cell table so background
// colour and border render in Outlook.
function directionRowHtml(d: Direction): string {
  const accent = d.favourable ? COLOR.green : COLOR.clayDeep;
  const tint = d.favourable ? COLOR.greenSoft : COLOR.claySoft;
  const icon = d.favourable ? "&#9733;" : "&#10005;"; // ★ ✕
  const statusLabel = d.favourable ? "Favourable" : "Avoid";
  const fallback = QUALITY_DETAILS[d.qualityCode as QualityCode];
  const bullets = (d.bullets ?? fallback?.bullets ?? []).slice(0, 3);
  const bulletsHtml = bullets
    .map(
      (b) =>
        `<li style="margin:0 0 4px 0;color:${COLOR.ink};font:14px/1.4 ${BODY_FONT};">${escapeHtml(b)}</li>`,
    )
    .join("");

  return `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;margin:0 0 10px 0;">
    <tr>
      <td style="padding:12px 14px;background:${COLOR.paper};border:1px solid ${COLOR.hairline};border-left:4px solid ${accent};border-radius:6px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="font:600 16px ${BODY_FONT};color:${COLOR.ink};padding:0 0 4px 0;">
              ${escapeHtml(d.compassLabel)}
            </td>
            <td align="right" style="padding:0 0 4px 0;">
              <span style="display:inline-block;padding:2px 10px;background:${tint};color:${COLOR.ink};font:600 11px ${BODY_FONT};letter-spacing:0.04em;text-transform:uppercase;border-radius:999px;">
                ${icon} ${statusLabel}
              </span>
            </td>
          </tr>
        </table>
        <p style="margin:0 0 8px 0;font:600 14px ${BODY_FONT};color:${COLOR.ink};">
          ${escapeHtml(d.pinyin)} <span style="color:${COLOR.ink2};font-weight:400;font-style:italic;">${escapeHtml(d.gloss)}</span>
        </p>
        <ul style="margin:0;padding:0 0 0 18px;">${bulletsHtml}</ul>
      </td>
    </tr>
  </table>`;
}

function sectionHtml(title: string, rows: Direction[]): string {
  return `
  <h2 style="margin:24px 0 10px 0;font:600 18px ${BODY_FONT};color:${COLOR.ink};">
    ${escapeHtml(title)}
  </h2>
  ${rows.map(directionRowHtml).join("")}`;
}

export function buildChartEmail(input: ChartEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const title = chartTitle(input);
  const subject = `${title} · My Feng Shui Home`;
  const groupLabel = input.group === "east" ? "East group" : "West group";
  const birth = birthDateString(input);
  const favourable = input.directions.filter((d) => d.favourable);
  const avoid = input.directions.filter((d) => !d.favourable);
  const viewUrl = `${input.siteUrl.replace(/\/$/, "")}/account/chart/${input.chartId}`;

  const metaLine = birth ? `${groupLabel} · Born ${birth}` : groupLabel;

  const byCompass = input.directions.reduce(
    (acc, d) => {
      acc[d.compass] = d;
      return acc;
    },
    {} as Record<string, (typeof input.directions)[number]>,
  );
  const baguaSvg = buildBaguaSvgHtml(input.kua, byCompass);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:${COLOR.cream};font-family:${BODY_FONT};color:${COLOR.ink};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${COLOR.cream};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:${COLOR.paper};border:1px solid ${COLOR.hairline};border-radius:14px;padding:32px;">
            <tr>
              <td align="center" style="padding-bottom:8px;">
                <div style="font-family:${SCRIPT_FONT};font-size:30px;line-height:1;color:${COLOR.green};">My Feng Shui Home</div>
                <div style="margin-top:6px;font:600 11px ${BODY_FONT};letter-spacing:0.08em;text-transform:uppercase;color:${COLOR.green};">
                  Kua Calculator
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 0 0 0;">
                <h1 style="margin:0 0 4px 0;font:700 22px ${BODY_FONT};color:${COLOR.ink};">
                  ${escapeHtml(title)}
                </h1>
                <p style="margin:0;color:${COLOR.ink2};font:14px ${BODY_FONT};">
                  ${escapeHtml(metaLine)}
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:18px 0 8px 0;">
                ${baguaSvg}
              </td>
            </tr>

            <tr>
              <td style="padding:8px 0 0 0;">
                ${sectionHtml("Your four favourable directions", favourable)}
                ${sectionHtml("Your four directions to avoid", avoid)}
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:24px 0 0 0;">
                <a href="${escapeHtml(viewUrl)}" style="display:inline-block;background:${COLOR.green};color:#ffffff;text-decoration:none;font:600 15px ${BODY_FONT};padding:13px 26px;border-radius:999px;">
                  View the full chart with the bagua
                </a>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:24px 0 0 0;">
                <p style="margin:0;font:12px ${BODY_FONT};color:${COLOR.ink2};">
                  You are receiving this because you saved a chart and
                  opted in to chart emails. You can change this anytime
                  in your account.
                </p>
              </td>
            </tr>
          </table>

          <div style="font-size:12px;color:${COLOR.ink2};padding-top:14px;">
            <a href="${escapeHtml(input.siteUrl)}" style="color:${COLOR.green};text-decoration:none;">myfengshuihome.com</a>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const directionLine = (d: Direction): string =>
    `- ${d.compassLabel} (${d.compass}) - ${d.pinyin} (${d.gloss}) - ${d.favourable ? "Favourable" : "Avoid"}`;

  const text = [
    `${title}`,
    "",
    metaLine,
    "",
    "Your four favourable directions:",
    ...favourable.map(directionLine),
    "",
    "Your four directions to avoid:",
    ...avoid.map(directionLine),
    "",
    `View the full chart with the bagua: ${viewUrl}`,
    "",
    "My Feng Shui Home - myfengshuihome.com",
  ].join("\n");

  return { subject, html, text };
}
