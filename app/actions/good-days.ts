"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";

// Good Days lead-magnet action (mirrors lead-magnet.ts / sendChecklist).
// Emails a link to the free printable /good-days page. By default the
// email is NOT stored anywhere (same honest promise as the checklist).
// If the visitor ticks the optional notes checkbox, the address is
// upserted into product_waitlist under the "good-days" slug so a future
// owner-approved welcome sequence has a consented list. Nothing is ever
// auto-sent beyond the single link email.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildHtml(siteUrl: string): string {
  const root = siteUrl.replace(/\/$/, "");
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Your good days calendar</title></head>
  <body style="margin:0;padding:32px 16px;background:#fcfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0e3b2c;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #e2dac5;border-radius:14px;padding:32px;">
          <tr><td align="center" style="padding-bottom:16px;">
            <div style="font-family:'Brush Script MT',cursive;font-size:30px;color:#0e3b2c;line-height:1;">My Feng Shui Home</div>
          </td></tr>
          <tr><td>
            <h1 style="margin:0 0 12px;font:700 22px sans-serif;color:#0e3b2c;">Your good days, July 2026 to February 2027.</h1>
            <p style="margin:0 0 12px;font:16px/1.55 sans-serif;color:#0e3b2c;">Every favourable day the tradition marks for starting, signing, and moving, with the reason for each, month by month. Open it any time, or print it and pin it by the calendar.</p>
            <p style="margin:24px 0 0;text-align:center;">
              <a href="${root}/good-days" style="display:inline-block;background:#0e3b2c;color:#ffffff;text-decoration:none;font:600 15px sans-serif;padding:13px 26px;border-radius:999px;">Open the good days calendar</a>
            </p>
          </td></tr>
          <tr><td style="padding-top:24px;font:13px/1.5 sans-serif;color:#4f5b53;border-top:1px solid #e2dac5;">
            One email. The link. Nothing else is sent unless you asked for the occasional notes.
          </td></tr>
        </table>
        <div style="font-size:12px;color:#4f5b53;padding-top:14px;">
          <a href="${root}" style="color:#0e3b2c;text-decoration:none;">myfengshuihome.com</a>
        </div>
      </td></tr>
    </table>
  </body>
</html>`;
}

const TEXT = `Your good days, July 2026 to February 2027.

Every favourable day the tradition marks for starting, signing, and
moving, with the reason for each, month by month.

Open the calendar: https://myfengshuihome.com/good-days

My Feng Shui Home - myfengshuihome.com`;

export async function sendGoodDays(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const wantsNotes = formData.get("notes") === "yes";

  if (!EMAIL_RE.test(email)) {
    redirect("/good-days?email=invalid#gd-email");
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";

  const apiKey = process.env.AUTH_RESEND_KEY;
  if (!apiKey) {
    console.error("[good-days] AUTH_RESEND_KEY is not set");
    redirect("/good-days?email=error#gd-email");
  }

  if (wantsNotes) {
    try {
      const admin = createAdminClient();
      await admin
        .from("product_waitlist")
        .upsert(
          { email, product_slug: "good-days" },
          { onConflict: "email,product_slug", ignoreDuplicates: true },
        );
    } catch (err) {
      console.error("[good-days] supabase upsert failed:", err);
      // Do not fail the visitor; still send the link email.
    }
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "My Feng Shui Home <hello@myfengshuihome.com>",
        to: email,
        subject: "Your good days calendar, July 2026 to February 2027",
        html: buildHtml(siteUrl),
        text: TEXT,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[good-days] Resend error:", res.status, body.slice(0, 200));
      redirect("/good-days?email=error#gd-email");
    }
  } catch (err) {
    if ((err as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    console.error("[good-days] send threw:", err);
    redirect("/good-days?email=error#gd-email");
  }

  redirect("/good-days?email=sent#gd-email");
}
