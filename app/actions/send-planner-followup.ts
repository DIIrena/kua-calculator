"use server";

// MVP: triggered manually. To wire to a 7-day delay later, integrate
// with a scheduled job (a Vercel cron route hitting a server action,
// a Supabase cron, or similar) or with a transactional email-platform
// automation (Resend audiences + delays, ConvertKit/MailerLite tagged
// sequences). This file is the template + send call; the schedule is
// not part of MVP and is intentionally out of scope.
//
// Usage today:
//   await sendPlannerFollowup("reader@example.com");
//
// What it does:
//   1. Validates the email
//   2. Sends the follow-up via Resend with the cover-portrait as the
//      sample image (the same file referenced from the landing page)
//   3. Returns { ok: true } or { ok: false, error: string }
//
// What it does NOT do:
//   - Look up which waitlist sign-ups are 7 days old
//   - Mark anyone as "followup sent" to avoid duplicates
//   - Run on a schedule
//
// Those three concerns belong to the scheduler we will pick when
// volumes justify the wiring. For now this is the artifact a human
// or a future cron route calls one address at a time.

import {
  buildPlannerFollowupHtml,
  buildPlannerFollowupText,
} from "@/lib/email-waitlist-planner-followup";
import { sendEmail } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SendPlannerFollowupResult =
  | { ok: true }
  | { ok: false; error: string };

export async function sendPlannerFollowup(
  rawEmail: string,
): Promise<SendPlannerFollowupResult> {
  const email = String(rawEmail ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Invalid email address" };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";

  // The sample image used in the follow-up. The treatment page is
  // the right teaser: it shows the six-box structure that defines
  // the practitioner voice across the planner. If a different sample
  // is preferred, swap the path here.
  const sampleImagePath =
    "/products/annual-feng-shui-planner-2026/sample-page-treatment.png";

  const html = buildPlannerFollowupHtml(siteUrl, sampleImagePath);
  const text = buildPlannerFollowupText();

  const result = await sendEmail({
    to: email,
    subject: "A page from the 2026 Feng Shui Planner",
    html,
    text,
  });

  if (!result.ok) {
    console.error(
      "[send-planner-followup] Resend send failed:",
      result.error,
    );
    return { ok: false, error: result.error };
  }
  return { ok: true };
}
