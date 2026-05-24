import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { createAdminClient } from "@/lib/supabase/server";
import BaguaDiagram from "@/components/BaguaDiagram";
import DirectionTable from "@/components/DirectionTable";
import ChartPrintButton from "@/components/ChartPrintButton";
import { deleteChart } from "@/app/actions/save-chart";
import type { Direction, Compass } from "@/lib/directions";

export const metadata: Metadata = {
  title: "Your chart | My Feng Shui Home",
  description: "Your saved Kua chart: bagua diagram and direction table.",
  robots: { index: false, follow: true },
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type StoredResult = {
  kua: number;
  group: "east" | "west";
  cnyAdjustment?: {
    adjusted: boolean | null;
    year: number;
    cnyLabel?: string;
    cnyYear?: number;
    message?: string;
  };
  directions: Direction[];
};

export default async function ChartViewPage(
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params;

  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const userId = session.user.id;

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("saved_charts")
    .select(
      "id, user_id, birth_year, birth_month, birth_day, gender, kua_number, kua_group, result, label, created_at",
    )
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error || !data) notFound();

  const result = data.result as StoredResult | null;
  if (!result || !Array.isArray(result.directions)) notFound();

  const byCompass: Record<Compass, Direction> = result.directions.reduce(
    (acc, d) => {
      acc[d.compass as Compass] = d;
      return acc;
    },
    {} as Record<Compass, Direction>,
  );

  const birthDate =
    data.birth_year && data.birth_month && data.birth_day
      ? `${MONTHS[data.birth_month - 1]} ${data.birth_day}, ${data.birth_year}`
      : null;

  const groupLabel = result.group === "east" ? "East group" : "West group";
  const summary =
    result.group === "east"
      ? "Your favourable directions are in the East quadrant: north, south, east, and southeast."
      : "Your favourable directions are in the West quadrant: northeast, southwest, west, and northwest.";

  return (
    <div className="page-narrow chart-page">
      <p className="eyebrow">My Feng Shui Home</p>
      <h1 className="chart-heading" style={{ marginTop: 0 }}>
        {data.label ? data.label : `Kua ${result.kua} chart`}
      </h1>
      <p className="chart-meta">
        {groupLabel}
        {birthDate ? <> · Born {birthDate} ({data.gender})</> : null}
      </p>
      <p className="chart-summary">{summary}</p>

      {result.cnyAdjustment?.adjusted === true ? (
        <p className="chart-cny-notice">
          Your birth date is before Chinese New Year ({result.cnyAdjustment.cnyLabel}),
          so the Kua formula uses {result.cnyAdjustment.year} as your Chinese
          solar-calendar year, not {result.cnyAdjustment.cnyYear}.
        </p>
      ) : null}
      {result.cnyAdjustment?.adjusted === null ? (
        <p className="chart-cny-notice">{result.cnyAdjustment.message}</p>
      ) : null}

      <section className="chart-section" aria-labelledby="diagram-heading">
        <h2 id="diagram-heading" className="chart-section-heading">
          The bagua chart
        </h2>
        <BaguaDiagram kua={result.kua} directionsByCompass={byCompass} />
      </section>

      <section className="chart-section" aria-labelledby="table-heading">
        <h2 id="table-heading" className="chart-section-heading">
          Your eight directions
        </h2>
        <DirectionTable rows={result.directions} />
      </section>

      <section className="chart-actions-section" aria-label="Chart actions">
        <div className="chart-actions-row">
          <ChartPrintButton />
          <Link href="/account" className="chart-back-link">
            Back to your account
          </Link>
        </div>

        <form action={deleteChart} className="chart-delete-form">
          <input type="hidden" name="id" value={data.id} />
          <button type="submit" className="btn-danger">
            Delete this chart
          </button>
        </form>
      </section>
    </div>
  );
}
