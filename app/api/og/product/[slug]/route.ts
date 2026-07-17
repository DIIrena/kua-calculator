import { NextRequest } from "next/server";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import path from "node:path";
import { STORE_PRODUCTS } from "@/lib/storefront";

// Per-product (and shop) OG image. 1200x630 PNG, brand-styled, generated
// on demand with the same Resvg + Hanken Grotesk pipeline as the article
// OG route. A generated branded card (title + price + one calm line), NOT
// a product cover: it never points at artwork, so it works for every
// product whether or not a cover exists. Cached 1 hour.

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

const COLOR = {
  cream: "#fcfcf8",
  hairline: "#e2dac5",
  green: "#0e3b2c",
  greenDeep: "#0a2a20",
  clay: "#d9531a",
  ink: "#0e3b2c",
  ink2: "#4f5b53",
};

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if (current.length === 0) current = w;
    else if (current.length + 1 + w.length <= maxCharsPerLine) current += " " + w;
    else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildSvg(args: {
  eyebrow: string;
  title: string;
  price: string | null;
  tagline: string;
}): string {
  const W = 1200;
  const H = 630;
  const PAD_X = 80;

  const titleLines = wrapText(args.title, 24).slice(0, 3);
  const titleFontSize =
    titleLines.length >= 3 ? 60 : titleLines.length === 2 ? 70 : 78;
  const titleLineHeight = Math.round(titleFontSize * 1.12);
  const titleStartY = 240;
  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="${PAD_X}" dy="${i === 0 ? 0 : titleLineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  const tagLines = wrapText(args.tagline, 56).slice(0, 2);
  const tagStartY = titleStartY + titleLines.length * titleLineHeight + 36;
  const tagTspans = tagLines
    .map(
      (line, i) =>
        `<tspan x="${PAD_X}" dy="${i === 0 ? 0 : 34}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  const chip =
    args.price && args.price.trim()
      ? (() => {
          const label = args.price.trim();
          const chipW = label.length * 24 + 56;
          const x = W - PAD_X - chipW;
          return `<rect x="${x}" y="54" width="${chipW}" height="52" rx="26" fill="${COLOR.clay}" />
  <text x="${x + chipW / 2}" y="90" text-anchor="middle" font-family="Hanken Grotesk" font-size="28" font-weight="800" fill="${COLOR.cream}">${escapeXml(label)}</text>`;
        })()
      : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <radialGradient id="wash1" cx="20%" cy="0%" r="80%">
      <stop offset="0%" stop-color="${COLOR.green}" stop-opacity="0.12" />
      <stop offset="70%" stop-color="${COLOR.green}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="wash2" cx="100%" cy="100%" r="70%">
      <stop offset="0%" stop-color="${COLOR.clay}" stop-opacity="0.10" />
      <stop offset="70%" stop-color="${COLOR.clay}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="${COLOR.cream}" />
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#wash1)" />
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#wash2)" />

  <text x="${PAD_X}" y="84" font-family="Hanken Grotesk" font-size="22" font-weight="600" letter-spacing="4" fill="${COLOR.green}">${escapeXml(args.eyebrow)}</text>
  ${chip}

  <text font-family="Hanken Grotesk" font-size="${titleFontSize}" font-weight="800" fill="${COLOR.ink}" y="${titleStartY}">${titleTspans}</text>

  <text font-family="Hanken Grotesk" font-size="28" font-weight="500" fill="${COLOR.ink2}" y="${tagStartY}">${tagTspans}</text>

  <text x="${PAD_X}" y="${H - 60}" font-family="Hanken Grotesk" font-size="26" font-weight="500" fill="${COLOR.ink2}">Feng shui for real homes.</text>
  <text x="${W - PAD_X}" y="${H - 60}" font-family="Hanken Grotesk" font-size="26" font-weight="600" fill="${COLOR.greenDeep}" text-anchor="end">myfengshuihome.com</text>
</svg>`;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  let card: { eyebrow: string; title: string; price: string | null; tagline: string } | null = null;

  if (slug === "shop") {
    card = {
      eyebrow: "MY FENG SHUI HOME",
      title: "The Shop",
      price: null,
      tagline:
        "Printable guides, personalised Kua readings, and tools. One-time prices, instant delivery.",
    };
  } else {
    const p = STORE_PRODUCTS.find((x) => x.slug === slug);
    if (p) {
      card = {
        eyebrow: "MY FENG SHUI HOME",
        title: p.title,
        price: p.priceCents > 0 ? p.priceLabel : "Free",
        tagline: p.oneLiner,
      };
    }
  }

  if (!card) return new Response("Not found", { status: 404 });

  const svg = buildSvg(card);
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
