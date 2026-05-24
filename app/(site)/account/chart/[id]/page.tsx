import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { createAdminClient } from "@/lib/supabase/server";
import BaguaDiagram from "@/components/BaguaDiagram";
import DirectionDetailCards from "@/components/DirectionDetailCards";
import BrandMark from "@/components/BrandMark";
import ChartPrintButton from "@/components/ChartPrintButton";
import { deleteChart } from "@/app/actions/save-chart";
import { sendChartEmail } from "@/app/actions/email-chart";
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
  props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ email?: string }>;
  },
) {
  const { id } = await props.params;
  const { email: emailStatus } = await props.searchParams;

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

  const favourable = result.directions.filter((d) => d.favourable);
  const avoid = result.directions.filter((d) => !d.favourable);

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
      {/* Print-only header: brand mark + tagline + Kua Calculator subhead.
          Hidden on screen via CSS; visible at the top of the printed page. */}
      <div className="print-only chart-print-header">
        <BrandMark />
        <p className="chart-print-subhead">Kua Calculator</p>
      </div>

      <p className="eyebrow no-print">My Feng Shui Home</p>
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

      <section className="chart-section chart-section-favourable" aria-labelledby="favourable-heading">
        <h2 id="favourable-heading" className="chart-section-heading">
          Your four favourable directions
        </h2>
        <DirectionDetailCards rows={favourable} />
      </section>

      <section className="chart-section chart-section-diagram" aria-labelledby="diagram-heading">
        <h2 id="diagram-heading" className="chart-section-heading">
          Your bagua chart
        </h2>
        <BaguaDiagram kua={result.kua} directionsByCompass={byCompass} />
      </section>

      <section className="chart-section chart-section-avoid" aria-labelledby="avoid-heading">
        <h2 id="avoid-heading" className="chart-section-heading">
          Your four directions to avoid
        </h2>
        <DirectionDetailCards rows={avoid} />
      </section>

      <section className="chart-actions-section no-print" aria-label="Chart actions">
        {emailStatus ? (
          <p
            className={`chart-email-status chart-email-status-${
              emailStatus === "sent" ? "ok" : "err"
            }`}
            role={emailStatus === "sent" ? "status" : "alert"}
          >
            {emailStatus === "sent"
              ? `Email sent to ${session.user.email}. Check your inbox in a minute.`
              : emailStatus === "rate-limit"
                ? "You have reached today's chart-email limit. Try again tomorrow."
                : "We could not send your chart email. Please try again in a moment."}
          </p>
        ) : null}

        <div className="chart-actions-row">
          <ChartPrintButton />
          <form action={sendChartEmail} className="chart-email-form">
            <input type="hidden" name="id" value={data.id} />
            <button type="submit" className="cta-secondary">
              Email me this chart
            </button>
          </form>
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

      {/* Print-only footer with the canonical site URL. */}
      <p className="print-only chart-print-footer">myfengshuihome.com</p>
    </div>
  );
}
