"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/resend";

// Footer newsletter subscribe. Captures an email into the shared
// product_waitlist table with product_slug = "newsletter" (no new
// table, idempotent on email+slug) and sends a Resend confirmation.
// Returns a status object for the client form (useActionState); no
// redirect, so the form gives inline feedback without leaving the page.
//
// No third-party JS, no analytics import: this is a plain server action,
// safe to render in the footer of every (site) page including
// /kua-calculator.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeState = {
  status: "idle" | "ok" | "invalid" | "error";
  message?: string;
};

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { status: "invalid", message: "Please enter a valid email address." };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (url && !url.includes("PLACEHOLDER")) {
    try {
      const admin = createAdminClient();
      await admin.from("product_waitlist").upsert(
        { email, product_slug: "newsletter" },
        { onConflict: "email,product_slug", ignoreDuplicates: true },
      );
    } catch (err) {
      console.error("[subscribe] upsert failed:", err);
      return {
        status: "error",
        message: "Something went wrong. Please try again in a minute.",
      };
    }
  }

  const apiKey = process.env.AUTH_RESEND_KEY;
  if (apiKey) {
    const site =
      process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";
    const root = site.replace(/\/+$/, "");
    const html = `<!doctype html><html lang="en"><body style="margin:0;padding:32px 16px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0e3b2c;">
  <div style="max-width:520px;margin:0 auto;">
    <h1 style="font:700 22px sans-serif;margin:0 0 12px;">You are on the list.</h1>
    <p style="font:16px/1.6 sans-serif;margin:0 0 12px;">Thank you for subscribing to My Feng Shui Home. We send occasional feng shui notes: a few calm, practical ideas for real homes.</p>
    <p style="font:16px/1.6 sans-serif;margin:0 0 12px;">You can unsubscribe any time by replying to this email.</p>
    <p style="font:14px sans-serif;margin:18px 0 0;"><a href="${root}" style="color:#0e3b2c;">myfengshuihome.com</a></p>
  </div>
</body></html>`;
    const text = `You are on the list.

Thank you for subscribing to My Feng Shui Home. We send occasional feng shui notes: a few calm, practical ideas for real homes.

You can unsubscribe any time by replying to this email.

${root}`;
    const sent = await sendEmail({
      to: email,
      subject: "You are subscribed - My Feng Shui Home",
      html,
      text,
    });
    if (!sent.ok) {
      // The email is captured; the confirmation is a nice-to-have.
      console.error("[subscribe] confirmation send failed:", sent.error);
    }
  }

  return { status: "ok", message: "You are on the list. Check your inbox." };
}
