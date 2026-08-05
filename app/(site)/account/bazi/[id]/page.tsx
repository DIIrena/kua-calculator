import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { createAdminClient } from "@/lib/supabase/server";
import BaziResult from "@/components/BaziResult";
import { deleteBaziChart } from "@/app/actions/bazi";
import type { BaziChart } from "@/lib/bazi";

export const metadata: Metadata = {
  title: "Your BaZi chart | My Feng Shui Home",
  description: "Your saved BaZi chart: Day Master, four pillars, element balance, and Ten Gods.",
  robots: { index: false, follow: true },
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default async function BaziChartViewPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const userId = session.user.id;

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("bazi_charts")
    .select("id, user_id, birth_year, birth_month, birth_day, birth_hour, birth_minute, city, time_known, result, created_at")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error || !data) notFound();
  const chart = data.result as BaziChart | null;
  if (!chart || !Array.isArray(chart.pillars)) notFound();

  const bornLine =
    `Born ${MONTHS[data.birth_month - 1]} ${data.birth_day}, ${data.birth_year}` +
    (data.time_known && typeof data.birth_hour === "number"
      ? ` at ${String(data.birth_hour).padStart(2, "0")}:${String(data.birth_minute ?? 0).padStart(2, "0")}`
      : " (time unknown)") +
    (data.city ? ` · ${data.city}` : "");

  return (
    <div className="page-content">
      <p className="eyebrow">My Feng Shui Home</p>
      <h1 className="chart-heading" style={{ marginTop: 0 }}>Your BaZi chart</h1>

      <BaziResult chart={chart} bornLine={bornLine} />

      <section style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <Link href="/products/bazi-basics" className="cta-secondary">Read what it means (BaZi Basics)</Link>
        <Link href="/account" className="chart-back-link">Back to your account</Link>
        <form action={deleteBaziChart}>
          <input type="hidden" name="id" value={data.id} />
          <button type="submit" className="btn-danger-sm">Delete this chart</button>
        </form>
      </section>
    </div>
  );
}
