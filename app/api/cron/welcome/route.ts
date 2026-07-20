// Daily welcome-sequence cron. Mirrors the course drip cron's shape:
// Vercel calls it with the CRON_SECRET bearer token; ?dry=1 lists what
// WOULD send without sending or advancing.
//
// HARD GATE: WELCOME_SEQUENCE_ENABLED must be exactly "true" or the run
// reports enabled:false and touches nothing. The owner flips the flag
// per spec/welcome-sequence-runbook.md.
//
// Audience: the consented note lists only, product_waitlist slugs
// "newsletter" and "good-days" (deduped by email). Unsubscribed
// addresses are gone from those lists, so they are skipped naturally
// and their sequence row goes dormant.

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/resend";
import { unsubscribeUrl } from "@/lib/unsubscribe-token";
import {
  WELCOME_STEPS,
  welcomeEmailHtml,
  welcomeEmailText,
} from "@/lib/welcome-sequence";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";
const NOTE_SLUGS = ["newsletter", "good-days"];
// A cron firing more than once a day cannot double-send.
const MIN_HOURS_BETWEEN = 20;
const MAX_PER_RUN = 100;

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[cron/welcome] CRON_SECRET not configured");
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const enabled = process.env.WELCOME_SEQUENCE_ENABLED === "true";
  const dry = new URL(req.url).searchParams.get("dry") === "1";
  const admin = createAdminClient();

  // 1. Current consented audience.
  const { data: listRows, error: listErr } = await admin
    .from("product_waitlist")
    .select("email, created_at, product_slug")
    .in("product_slug", NOTE_SLUGS);
  if (listErr) {
    console.error("[cron/welcome] audience query failed:", listErr.message);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
  // Dedupe by email, keeping the EARLIEST join date.
  const joined = new Map<string, string>();
  for (const r of listRows ?? []) {
    const email = String(r.email).toLowerCase();
    const prev = joined.get(email);
    if (!prev || r.created_at < prev) joined.set(email, r.created_at);
  }

  // 2. Sequence progress.
  const { data: seqRows, error: seqErr } = await admin
    .from("newsletter_sequence")
    .select("email, last_step, last_sent_at");
  if (seqErr) {
    console.error("[cron/welcome] sequence query failed:", seqErr.message);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
  const progress = new Map(
    (seqRows ?? []).map((r) => [String(r.email).toLowerCase(), r]),
  );

  const now = Date.now();
  const spacingCutoff = now - MIN_HOURS_BETWEEN * 60 * 60 * 1000;

  type Due = { email: string; step: (typeof WELCOME_STEPS)[number] };
  const due: Due[] = [];
  for (const [email, joinedAt] of joined) {
    const row = progress.get(email);
    const lastStep = row?.last_step ?? 0;
    if (lastStep >= 3) continue;
    const lastSent = row?.last_sent_at ? Date.parse(row.last_sent_at) : null;
    if (lastSent && lastSent > spacingCutoff) continue;
    const ageDays = (now - Date.parse(joinedAt)) / (24 * 60 * 60 * 1000);
    const next = WELCOME_STEPS.find((s) => s.step === lastStep + 1);
    if (next && ageDays >= next.dueAfterDays) {
      due.push({ email, step: next });
      if (due.length >= MAX_PER_RUN) break;
    }
  }

  if (!enabled || dry) {
    return NextResponse.json({
      enabled,
      dry,
      audience: joined.size,
      wouldSend: due.map((d) => ({ step: d.step.step, subject: d.step.subject })),
    });
  }

  let sent = 0;
  const failures: string[] = [];
  for (const { email, step } of due) {
    const unsub = unsubscribeUrl(SITE, email, "newsletter");
    const result = await sendEmail({
      to: email,
      subject: step.subject,
      html: welcomeEmailHtml(step, unsub),
      text: welcomeEmailText(step, unsub),
    });
    if (!result.ok) {
      console.error(`[cron/welcome] send failed for step ${step.step}:`, result.error);
      failures.push(email);
      continue;
    }
    const { error: upErr } = await admin.from("newsletter_sequence").upsert({
      email,
      last_step: step.step,
      last_sent_at: new Date().toISOString(),
    });
    if (upErr) {
      console.error("[cron/welcome] progress upsert failed:", upErr.message);
    }
    sent += 1;
  }

  return NextResponse.json({
    enabled,
    audience: joined.size,
    sent,
    failed: failures.length,
  });
}
