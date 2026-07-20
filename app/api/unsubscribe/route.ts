// One-click unsubscribe for course emails. The link in each email
// carries the address (base64url) + course slug + an HMAC token. We
// verify the token, flip unsubscribed on the matching enrolment, and
// return a plain confirmation page. No auth, no session: the token is
// the authorisation.

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { verifyUnsubscribe } from "@/lib/unsubscribe-token";

export const dynamic = "force-dynamic";

function page(title: string, body: string, status: number): NextResponse {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} - My Feng Shui Home</title></head>
<body style="margin:0;padding:48px 16px;background:#fcfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0e3b2c;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #e2dac5;border-radius:14px;padding:32px;text-align:center;">
    <div style="font-family:'Brush Script MT',cursive;font-size:28px;color:#0e3b2c;">My Feng Shui Home</div>
    <h1 style="font:700 22px sans-serif;margin:18px 0 12px;">${title}</h1>
    <p style="font:16px/1.6 sans-serif;color:#4f5b53;margin:0;">${body}</p>
    <p style="margin:24px 0 0;"><a href="https://myfengshuihome.com" style="color:#d9531a;">myfengshuihome.com</a></p>
  </div>
</body></html>`;
  return new NextResponse(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const e = url.searchParams.get("e") ?? "";
  const c = url.searchParams.get("c") ?? "";
  const t = url.searchParams.get("t") ?? "";

  const email = verifyUnsubscribe(e, c, t);
  if (!email || !c) {
    return page(
      "Link not valid",
      "This unsubscribe link is not valid. If you keep getting emails you did not ask for, reply to one of them and we will remove you by hand.",
      400,
    );
  }

  const admin = createAdminClient();

  // The note lists live in product_waitlist (slugs "newsletter" and
  // "good-days"). Unsubscribing from notes means deleting the rows on
  // BOTH lists: one click, fully out, we keep nothing.
  if (c === "newsletter" || c === "good-days") {
    const { error } = await admin
      .from("product_waitlist")
      .delete()
      .eq("email", email)
      .in("product_slug", ["newsletter", "good-days"]);
    if (error) {
      console.error("[unsubscribe] newsletter delete failed:", error.message);
      return page(
        "Something went wrong",
        "We could not process that just now. Reply to any of the emails and we will remove you by hand.",
        500,
      );
    }
    return page(
      "You are unsubscribed",
      "Your address is removed from the list entirely. Nothing else changes, and you can browse or subscribe again any time.",
      200,
    );
  }

  const { error } = await admin
    .from("course_enrollments")
    .update({ unsubscribed: true })
    .eq("email", email)
    .eq("course_slug", c);

  if (error) {
    console.error("[unsubscribe] update failed:", error.message);
    return page(
      "Something went wrong",
      "We could not process that just now. Reply to any of the emails and we will remove you by hand.",
      500,
    );
  }

  return page(
    "You are unsubscribed",
    "You will not get any more emails from this series. Nothing else changes, and you can buy or browse any time.",
    200,
  );
}
