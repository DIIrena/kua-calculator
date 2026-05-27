"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { calculateKua, kuaGroup, type Gender } from "@/lib/kua";
import { orderedDirectionsForKua } from "@/lib/directions";
import { effectiveKuaYear } from "@/lib/cny";
import { sendChartEmailInternal } from "@/app/actions/email-chart";

// Save a Kua chart for the signed-in user. Recomputes the result on the
// server so the client cannot persist a chart that doesn't match its
// inputs. Stores inputs + computed result and redirects to the new chart's
// view page.
export async function saveChart(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const userId = session.user.id;

  const toInt = (v: FormDataEntryValue | null) => {
    const n = parseInt(String(v ?? ""), 10);
    return Number.isFinite(n) ? n : NaN;
  };

  const year = toInt(formData.get("year"));
  const month = toInt(formData.get("month"));
  const day = toInt(formData.get("day"));
  const genderRaw = String(formData.get("gender") ?? "").trim();
  const label = (formData.get("label") as string | null)?.trim() || null;

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    redirect("/kua-calculator?error=missing-date");
  }
  if (genderRaw !== "male" && genderRaw !== "female") {
    redirect("/kua-calculator?error=missing-gender");
  }
  const gender = genderRaw as Gender;

  const adjustment = effectiveKuaYear(year, month, day);
  const kuaYear = adjustment.year;
  const kua = calculateKua(kuaYear, gender);
  const group = kuaGroup(kua);
  const rows = orderedDirectionsForKua(kua);

  const result = {
    kua,
    group,
    cnyAdjustment: adjustment,
    directions: rows,
  };

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("saved_charts")
    .insert({
      user_id: userId,
      birth_year: year,
      birth_month: month,
      birth_day: day,
      gender,
      kua_number: kua,
      kua_group: group,
      result,
      label,
    })
    .select("id")
    .single();

  if (error || !data) {
    redirect("/account?error=save-failed");
  }

  // Auto-send the chart email when the account holder is opted in.
  // Fires exactly once per chart (one save -> one auto-send attempt).
  // Failures are logged inside sendChartEmailInternal and do not block
  // the redirect to the chart view.
  const sessionEmail = session.user.email;
  if (sessionEmail) {
    const { data: profile } = await admin
      .from("profiles")
      .select("marketing_opt_in")
      .eq("id", userId)
      .single();
    if (profile?.marketing_opt_in) {
      await sendChartEmailInternal({
        userId,
        toEmail: sessionEmail,
        chartId: data.id,
        label,
        result,
        birthYear: year,
        birthMonth: month,
        birthDay: day,
        gender,
      });
    }
  }

  revalidatePath("/account");
  redirect(`/account/chart/${data.id}`);
}

// Rename a saved chart. Empty string clears the label (the dashboard
// then falls back to "Kua N chart"). Trimmed to 80 chars to keep the
// dashboard layout sane. Always scoped by user_id so a user cannot
// rename another user's chart.
export async function updateChartLabel(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const userId = session.user.id;

  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/account?error=missing-chart");

  const raw = String(formData.get("label") ?? "").trim();
  const label = raw.length > 0 ? raw.slice(0, 80) : null;

  const admin = createAdminClient();
  await admin
    .from("saved_charts")
    .update({ label })
    .eq("id", id)
    .eq("user_id", userId);

  revalidatePath("/account");
  revalidatePath(`/account/chart/${id}`);
  redirect("/account");
}

export async function deleteChart(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const userId = session.user.id;

  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/account");

  const admin = createAdminClient();
  // Scope by user_id as well as id so a user cannot delete another user's
  // chart even if they craft the id.
  await admin
    .from("saved_charts")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  revalidatePath("/account");
  redirect("/account");
}
