// Daily drip cron for email courses (the 7-Day Home Reset). Configured
// in vercel.json to run once a day. Vercel sends the CRON_SECRET as a
// Bearer token; we reject anything else.
//
// Each run, for every active enrolment not yet at day 7 whose last email
// went out more than ~20 hours ago, send the next day's email and
// advance day_sent. The welcome (day 0) is sent by the webhook at
// enrolment, so the cron sends days 1..7.
//
// ?dry=1 lists what WOULD send without sending or advancing (still
// requires the cron secret), for safe inspection.

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/resend";
import { buildCourseEmail } from "@/lib/email-course";
import { unsubscribeUrl } from "@/lib/unsubscribe-token";
import { findCourse, courseEmailForDay } from "@/lib/courses/seven-day-reset";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";

// Daily spacing gate. A cron that fires more than once a day cannot
// double-send: the prior email must be at least this old.
const MIN_HOURS_BETWEEN = 20;
// Safety cap per run so a backlog cannot blow the function time budget.
const MAX_PER_RUN = 200;

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[cron/drip] CRON_SECRET not configured");
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const dry = new URL(req.url).searchParams.get("dry") === "1";
  const admin = createAdminClient();

  const cutoff = new Date(
    Date.now() - MIN_HOURS_BETWEEN * 60 * 60 * 1000,
  ).toISOString();

  const { data: due, error } = await admin
    .from("course_enrollments")
    .select("id, email, course_slug, day_sent")
    .eq("unsubscribed", false)
    .lt("day_sent", 7)
    .or(`last_sent_at.is.null,last_sent_at.lte.${cutoff}`)
    .order("enrolled_at", { ascending: true })
    .limit(MAX_PER_RUN + 1);

  if (error) {
    console.error("[cron/drip] query failed:", error.message);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }

  const rows = due ?? [];
  const capped = rows.length > MAX_PER_RUN;
  const batch = capped ? rows.slice(0, MAX_PER_RUN) : rows;
  if (capped) {
    console.warn(
      `[cron/drip] ${rows.length} enrolments due, capping this run at ${MAX_PER_RUN}; the rest go next run.`,
    );
  }

  const sent: Array<{ email: string; course: string; day: number }> = [];
  const skipped: Array<{ email: string; reason: string }> = [];

  for (const row of batch) {
    const course = findCourse(row.course_slug);
    if (!course) {
      skipped.push({ email: row.email, reason: `unknown course ${row.course_slug}` });
      continue;
    }
    const nextDay = row.day_sent + 1;
    const emailDef = courseEmailForDay(course, nextDay);
    if (!emailDef) {
      skipped.push({ email: row.email, reason: `no email for day ${nextDay}` });
      continue;
    }

    if (dry) {
      sent.push({ email: row.email, course: course.slug, day: nextDay });
      continue;
    }

    const mail = buildCourseEmail({
      subject: emailDef.subject,
      preheader: emailDef.preheader,
      body: emailDef.body,
      unsubscribeUrl: unsubscribeUrl(SITE, row.email, course.slug),
    });
    const result = await sendEmail({
      to: row.email,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
    if (!result.ok) {
      // Do not advance day_sent: a failed send retries next run.
      console.error(`[cron/drip] send failed for ${row.email} day ${nextDay}: ${result.error}`);
      skipped.push({ email: row.email, reason: "send failed" });
      continue;
    }

    const { error: updErr } = await admin
      .from("course_enrollments")
      .update({ day_sent: nextDay, last_sent_at: new Date().toISOString() })
      .eq("id", row.id);
    if (updErr) {
      // Sent but not advanced: it would resend next run. Log loudly.
      console.error(`[cron/drip] advance failed for ${row.email} after day ${nextDay}: ${updErr.message}`);
    }
    sent.push({ email: row.email, course: course.slug, day: nextDay });
  }

  return NextResponse.json({
    ok: true,
    dry,
    due: rows.length,
    capped,
    sent: sent.length,
    sentDetail: sent,
    skipped,
  });
}
