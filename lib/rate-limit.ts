// Per-user-per-day rate limit, backed by public.email_sends.
// One row per (user_id, day). UPSERT increments.

import { createAdminClient } from "@/lib/supabase/server";

const DEFAULT_DAILY_CAP = 9;

function todayKey(): string {
  // ISO yyyy-mm-dd in UTC. Aligning to UTC keeps the limit deterministic
  // across timezones and across server cold starts.
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; limit: number; usedToday: number };

// Atomic-ish increment. There is a small race window between read and
// upsert; for a 5/day limit on chart emails that is acceptable.
export async function consumeChartEmailQuota(
  userId: string,
  dailyCap: number = DEFAULT_DAILY_CAP,
): Promise<RateLimitResult> {
  const admin = createAdminClient();
  const day = todayKey();

  const { data: existing } = await admin
    .from("email_sends")
    .select("count")
    .eq("user_id", userId)
    .eq("day", day)
    .maybeSingle();

  const usedToday = existing?.count ?? 0;
  if (usedToday >= dailyCap) {
    return { ok: false, limit: dailyCap, usedToday };
  }

  const nextCount = usedToday + 1;
  await admin
    .from("email_sends")
    .upsert(
      { user_id: userId, day, count: nextCount },
      { onConflict: "user_id,day" },
    );

  return { ok: true, remaining: dailyCap - nextCount };
}
