"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient, createAdminClient } from "@/lib/supabase/server";

// Save the account holder's birth data and marketing preference to their
// profiles row. Scoped by RLS to the current user.
export async function saveDetails(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const toInt = (v: FormDataEntryValue | null) => {
    const n = parseInt(String(v ?? ""), 10);
    return Number.isFinite(n) ? n : null;
  };

  await supabase
    .from("profiles")
    .update({
      birth_year: toInt(formData.get("birth_year")),
      birth_month: toInt(formData.get("birth_month")),
      birth_day: toInt(formData.get("birth_day")),
      gender: (formData.get("gender") as string) || null,
      marketing_opt_in: formData.get("marketing_opt_in") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  revalidatePath("/account");
}

// Delete the account holder's account. The schema's on delete cascade
// removes their profiles row and saved_charts rows. Requires the
// service-role key, which bypasses RLS and is server-only.
export async function deleteAccount() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const admin = createAdminClient();
  await admin.auth.admin.deleteUser(user.id);
  await supabase.auth.signOut();

  redirect("/kua-calculator");
}
