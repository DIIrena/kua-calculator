import { NextRequest } from "next/server";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import path from "node:path";
import { createAdminClient } from "@/lib/supabase/server";
import { buildBaguaSvgString } from "@/lib/bagua-svg";
import type { Compass, Direction } from "@/lib/directions";

// Public PNG renderer for the bagua diagram. The chart UUID acts as
// the access key (122 bits of entropy is enough for an image that
// only shows the bagua - no birth date, no email, no name).
// Used by the chart email because Gmail strips inline <svg>; an
// <img src=public-URL> tag works everywhere.
//
// Runs on the Node runtime because @resvg/resvg-js uses a native
// binding that the Edge runtime does not support.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Vercel's serverless Linux has no system fonts; without fonts Resvg
// renders the shapes but silently skips every <text> element (the
// bagua segments and centre disc come out, but no compass labels or
// Kua number). We bundle Hanken Grotesk via @fontsource and tell Resvg
// to read those woff files from the function's node_modules. The
// files are force-included in the function bundle via next.config.ts
// outputFileTracingIncludes.
function fontPath(file: string): string | null {
  const p = path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "hanken-grotesk",
    "files",
    file,
  );
  try {
    // Validate the file is actually present at request time so a
    // bundling regression on a future deploy degrades gracefully.
    readFileSync(p);
    return p;
  } catch (err) {
    console.error("[chart-image] font missing", file, err);
    return null;
  }
}

const FONT_FILES: string[] = [
  "hanken-grotesk-latin-400-normal.woff",
  "hanken-grotesk-latin-700-normal.woff",
  "hanken-grotesk-latin-800-normal.woff",
]
  .map(fontPath)
  .filter((p): p is string => p !== null);

type StoredResult = {
  kua: number;
  group: "east" | "west";
  directions: Direction[];
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!UUID_RE.test(id)) {
    return new Response("Not found", { status: 404 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("saved_charts")
    .select("kua_number, result")
    .eq("id", id)
    .single();
  if (error || !data || !data.result) {
    return new Response("Not found", { status: 404 });
  }

  const result = data.result as StoredResult;
  if (!Array.isArray(result.directions)) {
    return new Response("Not found", { status: 404 });
  }

  const byCompass: Record<Compass, Direction> = result.directions.reduce(
    (acc, d) => {
      acc[d.compass as Compass] = d;
      return acc;
    },
    {} as Record<Compass, Direction>,
  );

  const svg = buildBaguaSvgString(result.kua, byCompass, { width: 640 });

  // Render to PNG at 2x density so it stays crisp when an email client
  // scales it down to ~320px display.
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 640 },
    background: "transparent",
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
      // 1 hour max-age (not immutable). Charts themselves never
      // change content, but the renderer might (e.g. the font fix
      // we just shipped); without revalidation, Gmail's image
      // proxy would serve a stale broken render forever.
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
