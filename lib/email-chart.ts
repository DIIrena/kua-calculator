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

  // <img src> pointing at the public chart-image API route. Gmail strips
  // inline <svg>, but renders external image URLs. The route returns a
  // PNG rasterised from the same bagua geometry the web view uses.
  // ?v= is bumped when the renderer changes (font fix, geometry
  // change) so Gmail's image proxy serves a fresh PNG instead of a
  // cached broken one from a previous deploy.
  const baseUrl = input.siteUrl.replace(/\/$/, "");
  const renderVersion = "2";
  const baguaImgHtml = `<img src="${baseUrl}/api/chart-image/${input.chartId}?v=${renderVersion}" width="320" alt="Bagua chart for Kua ${input.kua}" style="display:block;border:0;outline:none;text-decoration:none;max-width:100%;height:auto;" />`;

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
                ${baguaImgHtml}
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
