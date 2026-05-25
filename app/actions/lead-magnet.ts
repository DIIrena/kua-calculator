"use server";

import { redirect } from "next/navigation";

// Lead-magnet server action invoked by LeadMagnetForm on /. Validates
// the email and sends a branded email pointing to /checklist (a
// printable page the visitor can save as PDF from their browser).
// Keeping the checklist as a real route, not a binary attachment,
// avoids a PDF generation dependency and lets us tweak the wording
// without re-publishing a file.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildHtml(siteUrl: string): string {
  const root = siteUrl.replace(/\/$/, "");
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Your 14-point room harmony checklist</title></head>
  <body style="margin:0;padding:32px 16px;background:#f1e9d8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#2a271e;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#fbf7ee;border:1px solid #cfc4ab;border-radius:14px;padding:32px;">
          <tr><td align="center" style="padding-bottom:16px;">
            <div style="font-family:'Brush Script MT',cursive;font-size:30px;color:#4f5a36;line-height:1;">My Feng Shui Home</div>
          </td></tr>
          <tr><td>
            <h1 style="margin:0 0 12px;font:700 22px sans-serif;color:#2a271e;">Your 14-point room harmony checklist.</h1>
            <p style="margin:0 0 12px;font:16px/1.55 sans-serif;color:#2a271e;">It is a one-page list of yes / no questions plus a second page telling you what your answers mean. Print it. Walk your home with it in your hand. Ten minutes.</p>
            <p style="margin:24px 0 0;text-align:center;">
              <a href="${root}/checklist" style="display:inline-block;background:#4f5a36;color:#ffffff;text-decoration:none;font:600 15px sans-serif;padding:13px 26px;border-radius:999px;">Open the checklist</a>
            </p>
            <p style="margin:16px 0 0;text-align:center;font:13px sans-serif;color:#5f5848;">Or save it to your home screen and come back when you have ten minutes.</p>
          </td></tr>
          <tr><td style="padding-top:24px;font:13px/1.5 sans-serif;color:#5f5848;border-top:1px solid #cfc4ab;">
            One email. The link. We do not add you to any list. You can sign up for a free account later if you want more.
          </td></tr>
        </table>
        <div style="font-size:12px;color:#5f5848;padding-top:14px;">
          <a href="${root}" style="color:#4f5a36;text-decoration:none;">myfengshuihome.com</a>
        </div>
      </td></tr>
    </table>
  </body>
</html>`;
}

const TEXT = `Your 14-point room harmony checklist.

It is a one-page list of yes / no questions plus a second page
telling you what your answers mean. Print it. Walk your home with
it in your hand. Ten minutes.

Open the checklist: https://myfengshuihome.com/checklist

My Feng Shui Home - myfengshuihome.com`;

export async function sendChecklist(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    redirect("/?checklist=invalid#what-it-is");
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";

  const apiKey = process.env.AUTH_RESEND_KEY;
  if (!apiKey) {
    console.error("[lead-magnet] AUTH_RESEND_KEY is not set");
    redirect("/?checklist=error#what-it-is");
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
        subject: "Your 14-point room harmony checklist",
        html: buildHtml(siteUrl),
        text: TEXT,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[lead-magnet] Resend error:", res.status, body.slice(0, 200));
      redirect("/?checklist=error#what-it-is");
    }
  } catch (err) {
    // Next.js redirect() throws a special error; rethrow it so the
    // redirect actually happens. Anything else is a true send failure.
    if ((err as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    console.error("[lead-magnet] send threw:", err);
    redirect("/?checklist=error#what-it-is");
  }

  redirect("/?checklist=sent#what-it-is");
}
