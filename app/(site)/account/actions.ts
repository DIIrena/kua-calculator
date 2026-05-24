"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, signOut } from "@/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { calculateKua, kuaGroup, type Gender } from "@/lib/kua";
import { orderedDirectionsForKua } from "@/lib/directions";
import { effectiveKuaYear } from "@/lib/cny";
import { sendChartEmailInternal } from "@/app/actions/email-chart";

// Save the account holder's birth data and marketing preference. Scoped
// by the NextAuth session user id. Writes through the service-role
// Supabase client (RLS is off on these tables; access control lives
// here in the server action).
export async function saveDetails(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const userId = session.user.id;

  const toInt = (v: FormDataEntryValue | null) => {
    const n = parseInt(String(v ?? ""), 10);
    return Number.isFinite(n) ? n : null;
  };

  const admin = createAdminClient();
  await admin
    .from("profiles")
    .update({
      birth_year: toInt(formData.get("birth_year")),
      birth_month: toInt(formData.get("birth_month")),
      birth_day: toInt(formData.get("birth_day")),
      gender: (formData.get("gender") as string) || null,
      marketing_opt_in: formData.get("marketing_opt_in") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  revalidatePath("/account");
}

// Save the birth-data form fields AND create a saved chart from them
// AND email the chart to the signed-in user. Single click for "I want
// my Kua chart in my inbox right now." Reuses the form bound to
// saveDetails via a second submit button with formAction.
export async function saveAndEmailMyChart(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const userId = session.user.id;
  const sessionEmail = session.user.email;
  if (!sessionEmail) redirect("/account?error=no-email-on-session");

  const toInt = (v: FormDataEntryValue | null) => {
    const n = parseInt(String(v ?? ""), 10);
    return Number.isFinite(n) ? n : NaN;
  };

  const year = toInt(formData.get("birth_year"));
  const month = toInt(formData.get("birth_month"));
  const day = toInt(formData.get("birth_day"));
  const genderRaw = String(formData.get("gender") ?? "").trim();
  const optIn = formData.get("marketing_opt_in") === "on";

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    redirect("/account?error=birth-date-required");
  }
  if (genderRaw !== "male" && genderRaw !== "female") {
    redirect("/account?error=gender-required");
  }
  const gender = genderRaw as Gender;

  const admin = createAdminClient();

  // Persist the profile fields too so the dashboard reflects the
  // values the user just submitted.
  await admin
    .from("profiles")
    .update({
      birth_year: year,
      birth_month: month,
      birth_day: day,
      gender,
      marketing_opt_in: optIn,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  // Compute the chart on the server (same path as saveChart).
  const adjustment = effectiveKuaYear(year, month, day);
  const kuaYear = adjustment.year;
  const kua = calculateKua(kuaYear, gender);
  const group = kuaGroup(kua);
  const rows = orderedDirectionsForKua(kua);
  const result = { kua, group, cnyAdjustment: adjustment, directions: rows };

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
      label: "My chart",
    })
    .select("id")
    .single();
  if (error || !data) {
    redirect("/account?error=save-failed");
  }

  // Explicit user request, so we always attempt the email here even
  // when marketing_opt_in is off. Rate limit still applies; failures
  // are swallowed inside sendChartEmailInternal and surfaced as the
  // ?email=error pill on the chart page.
  await sendChartEmailInternal({
    userId,
    toEmail: sessionEmail,
    chartId: data.id,
    label: "My chart",
    result,
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    gender,
  });

  revalidatePath("/account");
  redirect(`/account/chart/${data.id}?email=sent`);
}

// Delete the account holder's account. Removes the row from
// next_auth.users; the on-delete-cascade FKs on next_auth.sessions,
// next_auth.accounts, public.profiles and public.saved_charts clear
// the rest. Then signs out and returns to the calculator.
export async function deleteAccount() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const userId = session.user.id;

  const admin = createAdminClient();
  await admin.schema("next_auth").from("users").delete().eq("id", userId);

  await signOut({ redirect: false });
  redirect("/kua-calculator");
}
