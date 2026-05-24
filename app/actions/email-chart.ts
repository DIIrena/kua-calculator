"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { buildChartEmail } from "@/lib/email-chart";
import { sendEmail } from "@/lib/resend";
import { consumeChartEmailQuota } from "@/lib/rate-limit";
import type { Direction } from "@/lib/directions";

type StoredResult = {
  kua: number;
  group: "east" | "west";
  directions: Direction[];
};

// Server action invoked by the "Email me this chart" button on
// /account/chart/[id]. Auth-gates, scopes the chart by user_id, enforces
// the per-day rate limit, renders the email, sends via Resend, and
// redirects back to the chart page with a status query param so the
// page can show inline feedback.
export async function sendChartEmail(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const userId = session.user.id;
  const sessionEmail = session.user.email;
  if (!sessionEmail) {
    redirect("/account?error=no-email-on-session");
  }

  const chartId = String(formData.get("id") ?? "").trim();
  if (!chartId) redirect("/account");

  const admin = createAdminClient();
  const { data: chart, error } = await admin
    .from("saved_charts")
    .select(
      "id, birth_year, birth_month, birth_day, gender, kua_number, kua_group, label, result",
    )
    .eq("id", chartId)
    .eq("user_id", userId)
    .single();
  if (error || !chart) redirect("/account");

  const result = chart.result as StoredResult | null;
  if (!result || !Array.isArray(result.directions)) {
    redirect(`/account/chart/${chartId}?email=error`);
  }

  const quota = await consumeChartEmailQuota(userId);
  if (!quota.ok) {
    redirect(`/account/chart/${chartId}?email=rate-limit`);
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";
  const email = buildChartEmail({
    toEmail: sessionEmail,
    siteUrl,
    chartId,
    label: chart.label,
    kua: result.kua,
    group: result.group,
    birthYear: chart.birth_year,
    birthMonth: chart.birth_month,
    birthDay: chart.birth_day,
    gender: chart.gender,
    directions: result.directions,
  });

  const send = await sendEmail({
    to: sessionEmail,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
  if (!send.ok) {
    console.error("[email-chart] Resend send failed:", send.error);
    redirect(`/account/chart/${chartId}?email=error`);
  }

  redirect(`/account/chart/${chartId}?email=sent`);
}

// Server-internal auto-send used by save-chart.ts when marketing_opt_in
// is true. Mirrors sendChartEmail but does not redirect (a server-action
// invoked from inside another server action cannot redirect cleanly).
// Failures are swallowed and logged so the chart save itself never fails
// on a downstream email problem.
export async function sendChartEmailInternal(args: {
  userId: string;
  toEmail: string;
  chartId: string;
  label: string | null;
  result: StoredResult;
  birthYear: number | null;
  birthMonth: number | null;
  birthDay: number | null;
  gender: string | null;
}): Promise<void> {
  try {
    const quota = await consumeChartEmailQuota(args.userId);
    if (!quota.ok) {
      console.warn("[email-chart] auto-send skipped: rate limit reached");
      return;
    }
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";
    const email = buildChartEmail({
      toEmail: args.toEmail,
      siteUrl,
      chartId: args.chartId,
      label: args.label,
      kua: args.result.kua,
      group: args.result.group,
      birthYear: args.birthYear,
      birthMonth: args.birthMonth,
      birthDay: args.birthDay,
      gender: args.gender,
      directions: args.result.directions,
    });
    const send = await sendEmail({
      to: args.toEmail,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    if (!send.ok) {
      console.error("[email-chart] auto-send failed:", send.error);
    }
  } catch (err) {
    console.error("[email-chart] auto-send threw:", err);
  }
}
