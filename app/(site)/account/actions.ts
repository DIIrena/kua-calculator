"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, signOut } from "@/auth";
import { createAdminClient } from "@/lib/supabase/server";

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
