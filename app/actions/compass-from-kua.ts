"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";

// Compass-from-Kua server action. Captures an email address from the
// Personal Feng Shui Compass card in the post-result CTA stack on
// /kua-calculator. Writes into the same public.product_waitlist table
// used by every other waitlist on the site (no new table), with
// product_slug = "personal-feng-shui-compass". Redirects back to
// /kua-calculator with a status param so the calculator surface can
// render a small inline confirmation.
//
// Hard rules respected by this action:
//   - No third-party JS. The form posts to a server action; the
//     calculator surface stays tracker-free.
//   - No analytics import. Do NOT import lib/analytics here.
//   - No new database table. Reuses product_waitlist + email send.
//   - No outcome promises in the confirmation copy.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PRODUCT_SLUG = "personal-feng-shui-compass";
const PRODUCT_TITLE = "Personal Feng Shui Compass";
const REDIRECT_BASE = "/kua-calculator";

function buildHtml(siteUrl: string): string {
  const root = siteUrl.replace(/\/+$/, "");
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:32px 16px;background:#fcfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0e3b2c;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #e2dac5;border-radius:14px;padding:32px;">
        <tr><td>
          <div style="font-family:'Brush Script MT',cursive;font-size:30px;color:#0e3b2c;line-height:1;">My Feng Shui Home</div>
          <hr style="border:none;border-top:1px solid #e2dac5;margin:18px 0 24px;" />
          <h1 style="margin:0 0 12px;font:700 22px sans-serif;color:#0e3b2c;">You are on the list.</h1>
          <p style="margin:0 0 12px;font:16px/1.55 sans-serif;color:#0e3b2c;">Thank you for telling us you are interested in the <strong>${PRODUCT_TITLE}</strong>. It is the small printable book keyed to your Kua and your eight personal directions.</p>
          <p style="margin:0 0 12px;font:16px/1.55 sans-serif;color:#0e3b2c;">The file is finished. Checkout opens once the business bank account clears and live payments are wired up. When it does, we email you the launch page and the early price at this address.</p>
          <p style="margin:18px 0 0;">
            <a href="${root}/products/personal-feng-shui-compass" style="display:inline-block;background:#0e3b2c;color:#ffffff;text-decoration:none;font:600 15px sans-serif;padding:13px 26px;border-radius:999px;">Open the Compass page</a>
          </p>
        </td></tr>
        <tr><td style="padding-top:24px;font:13px/1.5 sans-serif;color:#4f5b53;border-top:1px solid #e2dac5;">
          You can unsubscribe any time by replying to this email.
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

function buildText(siteUrl: string): string {
  const root = siteUrl.replace(/\/+$/, "");
  return `My Feng Shui Home

You are on the list.

Thank you for telling us you are interested in the ${PRODUCT_TITLE}.
It is the small printable book keyed to your Kua and your eight
personal directions.

The file is finished. Checkout opens once the business bank account
clears and live payments are wired up. When it does, we email you
the launch page and the early price at this address.

Open the Compass page: ${root}/products/personal-feng-shui-compass

You can unsubscribe any time by replying to this email.

My Feng Shui Home - ${root}
`;
}

export async function joinCompassFromKua(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!EMAIL_RE.test(email)) {
    redirect(`${REDIRECT_BASE}?compass=invalid`);
  }

  // Insert into Supabase. Reuses the existing product_waitlist table;
  // the (email, product_slug) unique index means a second signup is a
  // silent no-op. The "source" metadata is encoded in the product slug
  // family the calculator surface targets, not a separate column, so we
  // do not need a schema migration.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (url && !url.includes("PLACEHOLDER")) {
    try {
      const admin = createAdminClient();
      await admin
        .from("product_waitlist")
        .upsert(
          { email, product_slug: PRODUCT_SLUG },
          { onConflict: "email,product_slug", ignoreDuplicates: true },
        );
    } catch (err) {
      console.error("[compass-from-kua] supabase upsert failed:", err);
      // Do not fail the user; still send the confirmation.
    }
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";
  const apiKey = process.env.AUTH_RESEND_KEY;
  if (!apiKey) {
    console.error("[compass-from-kua] AUTH_RESEND_KEY is not set");
    redirect(`${REDIRECT_BASE}?compass=error`);
  }

  const subject = `You are on the list - ${PRODUCT_TITLE}`;
  const html = buildHtml(siteUrl);
  const text = buildText(siteUrl);

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
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(
        "[compass-from-kua] Resend error:",
        res.status,
        body.slice(0, 200),
      );
      redirect(`${REDIRECT_BASE}?compass=error`);
    }
  } catch (err) {
    if ((err as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    console.error("[compass-from-kua] send threw:", err);
    redirect(`${REDIRECT_BASE}?compass=error`);
  }

  redirect(`${REDIRECT_BASE}?compass=sent`);
}
