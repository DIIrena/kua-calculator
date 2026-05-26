// Dev-only sample PDF route. Renders a sample Personal Feng Shui Compass
// for any signed-in account. Useful for visually verifying voice + layout
// without going through Stripe + webhook + form. NOT linked from any
// nav; you navigate to it directly:
//
//   /api/dev/sample-compass?name=Marco&year=1990&month=4&day=15&gender=male
//
// Defaults to Marco / 1990-04-15 / male, which produces Kua 4 East group.
// In production this route requires auth (a signed-in account). Anyone
// signed in can call it; we are the only account so this is enough.

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { calculateKua, kuaGroup } from "@/lib/kua";
import { buildContext, assembleProductHtml } from "@/lib/blocks";
import { findProduct } from "@/lib/products";
import { buildHtml } from "@/lib/pdf/template";
import { renderToPdf } from "@/lib/pdf/render";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "unauthorized; sign in first" },
      { status: 401 },
    );
  }

  const url = new URL(request.url);
  const firstName = (url.searchParams.get("name") || "Marco").slice(0, 40);
  const birthYear = parseInt(url.searchParams.get("year") || "1990", 10);
  const genderParam = url.searchParams.get("gender") || "male";
  const gender =
    genderParam === "female" ? ("female" as const) : ("male" as const);

  let kua: number;
  let group: "east" | "west";
  try {
    kua = calculateKua(birthYear, gender);
    group = kuaGroup(kua);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 400 },
    );
  }

  const context = buildContext(firstName, kua, group);
  const product = findProduct("personal-compass");
  if (!product) {
    return NextResponse.json(
      { error: "product not found" },
      { status: 500 },
    );
  }

  const blocksHtml = await assembleProductHtml(product, context);
  const html = buildHtml(product, context, blocksHtml);

  let pdf: Buffer;
  try {
    pdf = await renderToPdf(html);
  } catch (err) {
    console.error("[sample-compass] render failed:", err);
    return NextResponse.json(
      {
        error: "render failed",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }

  const filename = `${firstName}-Personal-Feng-Shui-Compass.pdf`;
  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
