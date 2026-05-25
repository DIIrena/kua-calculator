import { NextRequest } from "next/server";
import { Resvg } from "@resvg/resvg-js";
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
  });
  const png = resvg.render().asPng();

  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": String(png.length),
      // Charts are immutable snapshots (result jsonb is frozen at
      // save time), so cache aggressively.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
