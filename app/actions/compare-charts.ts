"use server";

import { redirect } from "next/navigation";

// Small redirect server action used by the Compare two charts form on
// /account. Reads chart_a and chart_b from the FormData and sends the
// visitor to /account/compare/[a]/[b]. The compare route does the
// auth check and the ownership scoping.
export async function compareCharts(formData: FormData) {
  const a = String(formData.get("chart_a") ?? "").trim();
  const b = String(formData.get("chart_b") ?? "").trim();
  if (!a || !b || a === b) redirect("/account?error=compare-pick-two");
  redirect(`/account/compare/${a}/${b}`);
}
