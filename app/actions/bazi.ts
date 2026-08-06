"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { computeBazi, type BaziChart } from "@/lib/bazi";

// The BaZi calculator is public and email-gated: anyone can run it, and to
// reveal the reading a visitor enters their email (captured as a lead). The
// chart is recomputed on the server so a client can never persist a chart that
// does not match its inputs. If the visitor happens to be signed in, we skip
// the email (using the account's) and link the chart to their account. Shaped
// for useActionState.

export type BaziActionState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "ok"; chart: BaziChart; chartId: string; input: SavedInput };

export interface SavedInput {
  year: number;
  month: number;
  day: number;
  hour: number | null;
  minute: number | null;
  city: string | null;
  timeKnown: boolean;
}

const MONTHS_MAX = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function computeBaziAction(
  _prev: BaziActionState,
  formData: FormData,
): Promise<BaziActionState> {
  const session = await auth();
  const userId = session?.user?.id ?? null;
  const sessionEmail = session?.user?.email ?? null;

  // Email gate: required to reveal the reading unless already signed in.
  const emailRaw = String(formData.get("email") ?? "").trim().toLowerCase();
  const email = userId ? (sessionEmail ?? emailRaw) : emailRaw;
  if (!userId && !EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email to see your reading." };
  }
  const optIn = String(formData.get("optIn") ?? "") === "on";

  // Birth date: an <input type="date"> gives YYYY-MM-DD.
  const dateRaw = String(formData.get("birthdate") ?? "").trim();
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateRaw);
  if (!m) return { status: "error", message: "Please enter your birth date." };
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (year < 1900 || year > 2100) {
    return { status: "error", message: "Birth year must be between 1900 and 2100." };
  }
  if (month < 1 || month > 12 || day < 1 || day > MONTHS_MAX[month - 1]) {
    return { status: "error", message: "That birth date does not look valid." };
  }

  const timeKnown = String(formData.get("timeKnown") ?? "") === "on";
  let hour: number | null = null;
  let minute: number | null = null;
  if (timeKnown) {
    const timeRaw = String(formData.get("birthtime") ?? "").trim();
    const tm = /^(\d{2}):(\d{2})$/.exec(timeRaw);
    if (!tm) {
      return { status: "error", message: "Enter your birth time, or untick 'I know my birth time'." };
    }
    hour = Number(tm[1]);
    minute = Number(tm[2]);
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      return { status: "error", message: "That birth time does not look valid." };
    }
  }

  const tz = Number(formData.get("tz"));
  const tzOffsetHours = Number.isFinite(tz) ? tz : 0;
  const city = String(formData.get("city") ?? "").trim().slice(0, 80) || null;

  const chart = computeBazi({
    year,
    month,
    day,
    hour: timeKnown ? (hour as number) : undefined,
    minute: timeKnown ? (minute as number) : undefined,
    tzOffsetHours,
  });

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("bazi_charts")
    .insert({
      user_id: userId,
      email: email || null,
      opt_in: optIn,
      birth_year: year,
      birth_month: month,
      birth_day: day,
      birth_hour: hour,
      birth_minute: minute,
      tz_offset: tzOffsetHours,
      city,
      time_known: timeKnown,
      day_master: chart.dayMaster.stem.pinyin,
      result: chart,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { status: "error", message: "We could not build your chart just now. Please try again in a moment." };
  }

  return {
    status: "ok",
    chart,
    chartId: data.id,
    input: { year, month, day, hour, minute, city, timeKnown },
  };
}

// Delete a saved BaZi chart. Scoped by user_id so a user cannot delete another
// user's chart even if they craft the id.
export async function deleteBaziChart(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const userId = session.user.id;

  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/account");

  const admin = createAdminClient();
  await admin.from("bazi_charts").delete().eq("id", id).eq("user_id", userId);

  revalidatePath("/account");
  redirect("/account");
}
