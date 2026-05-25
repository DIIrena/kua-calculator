import { NextRequest } from "next/server";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import path from "node:path";
import { findArticle, CATEGORIES } from "@/lib/articles";

// Per-article OG image. 1200x630 PNG, brand-styled, generated on-demand.
// Reuses the same Hanken Grotesk TTFs the chart-image route bundles.
// Cached 1 hour with revalidation so we can re-render if the renderer
// changes without a hard cache-buster.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fontPath(file: string): string | null {
  const p = path.join(process.cwd(), "lib", "fonts", file);
  try {
    readFileSync(p);
    return p;
  } catch (err) {
    console.error("[og] font missing", file, err);
    return null;
  }
}

const FONT_FILES: string[] = [
  "HankenGrotesk-Regular.ttf",
  "HankenGrotesk-Bold.ttf",
  "HankenGrotesk-ExtraBold.ttf",
]
  .map(fontPath)
  .filter((p): p is string => p !== null);

// Brand tokens repeated inline because the SVG is rendered through
// Resvg, not the browser - it cannot reach app/globals.css.
const COLOR = {
  cream: "#f1e9d8",
  paper: "#fbf7ee",
  hairline: "#cfc4ab",
  green: "#4f5a36",
  greenDeep: "#3c4429",
  ink: "#2a271e",
  ink2: "#5f5848",
};

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Naive text wrap. Picks an estimate of how many chars fit per line at
// a given font size, then greedy-wraps by words.
function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if (current.length === 0) {
      current = w;
    } else if (current.length + 1 + w.length <= maxCharsPerLine) {
      current += " " + w;
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildSvg(args: { title: string; category: string }): string {
  const W = 1200;
  const H = 630;
  const PAD_X = 80;

  // Soft radial wash echoing the homepage hero.
  const titleLines = wrapText(args.title, 28).slice(0, 4);
  const titleFontSize = titleLines.length >= 4 ? 56 : titleLines.length === 3 ? 64 : 72;
  const titleLineHeight = Math.round(titleFontSize * 1.15);
  const titleTotalH = titleLines.length * titleLineHeight;
  const titleStartY = Math.round((H - titleTotalH) / 2) + Math.round(titleFontSize * 0.85);

  const eyebrow = `${args.category.toUpperCase()} · MYFENGSHUIHOME.COM`;

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="${PAD_X}" dy="${i === 0 ? 0 : titleLineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <radialGradient id="wash1" cx="20%" cy="0%" r="80%">
      <stop offset="0%" stop-color="${COLOR.green}" stop-opacity="0.12" />
      <stop offset="70%" stop-color="${COLOR.green}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="wash2" cx="100%" cy="100%" r="70%">
      <stop offset="0%" stop-color="#be6b43" stop-opacity="0.10" />
      <stop offset="70%" stop-color="#be6b43" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="${COLOR.cream}" />
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#wash1)" />
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#wash2)" />

  <text x="${PAD_X}" y="84" font-family="Hanken Grotesk" font-size="22" font-weight="600" letter-spacing="4" fill="${COLOR.green}">${escapeXml(eyebrow)}</text>

  <text font-family="Hanken Grotesk" font-size="${titleFontSize}" font-weight="800" fill="${COLOR.ink}" y="${titleStartY}">${titleTspans}</text>

  <text x="${PAD_X}" y="${H - 64}" font-family="Hanken Grotesk" font-size="26" font-weight="500" fill="${COLOR.ink2}">A calm, honest guide to feng shui for real homes.</text>

  <text x="${W - PAD_X}" y="${H - 64}" font-family="Hanken Grotesk" font-size="26" font-weight="600" fill="${COLOR.greenDeep}" text-anchor="end">myfengshuihome.com</text>
</svg>`;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const article = findArticle(slug);
  if (!article) {
    return new Response("Not found", { status: 404 });
  }

  const category = CATEGORIES[article.category].title;
  const svg = buildSvg({ title: article.title, category });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    background: COLOR.cream,
    font: {
      loadSystemFonts: false,
      fontFiles: FONT_FILES,
      defaultFontFamily: "Hanken Grotesk",
    },
  });
  const png = resvg.render().asPng();

  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": String(png.length),
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
