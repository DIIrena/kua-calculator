import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { createAdminClient } from "@/lib/supabase/server";
import BaguaDiagram from "@/components/BaguaDiagram";
import type { Compass, Direction } from "@/lib/directions";
import { buildSharedRooms } from "@/lib/shared-rooms";

export const metadata: Metadata = {
  title: "Compare two charts | My Feng Shui Home",
  description:
    "Compare two saved Kua charts side by side: shared favourable directions, shared directions to avoid, and conflicts to assign by primary user.",
  robots: { index: false, follow: true },
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type StoredResult = {
  kua: number;
  group: "east" | "west";
  directions: Direction[];
};

type SavedChartRow = {
  id: string;
  birth_year: number | null;
  birth_month: number | null;
  birth_day: number | null;
  gender: string | null;
  kua_number: number | null;
  kua_group: string | null;
  label: string | null;
  result: StoredResult | null;
};

function chartTitle(c: SavedChartRow): string {
  return c.label ?? `Kua ${c.kua_number ?? "?"} chart`;
}

function chartMeta(c: SavedChartRow): string {
  const groupLabel =
    c.kua_group === "east"
      ? "East group"
      : c.kua_group === "west"
        ? "West group"
        : "Group unknown";
  const birthDate =
    c.birth_year && c.birth_month && c.birth_day
      ? `${MONTHS[c.birth_month - 1]} ${c.birth_day}, ${c.birth_year}`
      : null;
  return birthDate
    ? `Kua ${c.kua_number ?? "?"} · ${groupLabel} · Born ${birthDate}`
    : `Kua ${c.kua_number ?? "?"} · ${groupLabel}`;
}

function asByCompass(rs: StoredResult): Record<Compass, Direction> {
  return rs.directions.reduce(
    (acc, d) => {
      acc[d.compass as Compass] = d;
      return acc;
    },
    {} as Record<Compass, Direction>,
  );
}

export default async function CompareChartsPage(
  props: { params: Promise<{ a: string; b: string }> },
) {
  const { a, b } = await props.params;

  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const userId = session.user.id;

  if (!a || !b || a === b) redirect("/account?error=compare-pick-two");

  const admin = createAdminClient();
  const { data: rows, error } = await admin
    .from("saved_charts")
    .select(
      "id, birth_year, birth_month, birth_day, gender, kua_number, kua_group, label, result",
    )
    .eq("user_id", userId)
    .in("id", [a, b]);

  if (error || !rows || rows.length !== 2) notFound();

  // Preserve the URL order: a then b, regardless of what the DB returned.
  const chartA = rows.find((r) => r.id === a) as SavedChartRow | undefined;
  const chartB = rows.find((r) => r.id === b) as SavedChartRow | undefined;
  if (!chartA || !chartB || !chartA.result || !chartB.result) notFound();

  const dirsA = asByCompass(chartA.result);
  const dirsB = asByCompass(chartB.result);
  const groups = buildSharedRooms(dirsA, dirsB);

  return (
    <div className="page-content compare-page">
      <p className="eyebrow">My Feng Shui Home</p>
      <h1 className="compare-heading" style={{ marginTop: 0 }}>
        Shared rooms
      </h1>
      <p className="compare-intro">
        Two charts compared. Use the lists below to assign directions in
        rooms you both use.
      </p>

      <section className="compare-people" aria-label="The two people compared">
        <article className="compare-person">
          <h2 className="compare-person-name">{chartTitle(chartA)}</h2>
          <p className="compare-person-meta">{chartMeta(chartA)}</p>
          <BaguaDiagram
            kua={chartA.result.kua}
            directionsByCompass={dirsA}
          />
          <p className="compare-person-link">
            <Link href={`/account/chart/${chartA.id}`}>View this chart</Link>
          </p>
        </article>
        <article className="compare-person">
          <h2 className="compare-person-name">{chartTitle(chartB)}</h2>
          <p className="compare-person-meta">{chartMeta(chartB)}</p>
          <BaguaDiagram
            kua={chartB.result.kua}
            directionsByCompass={dirsB}
          />
          <p className="compare-person-link">
            <Link href={`/account/chart/${chartB.id}`}>View this chart</Link>
          </p>
        </article>
      </section>

      <CompareGroup
        heading="Favourable for both"
        tone="good"
        description="Safe choices for a shared bed orientation, dining seating, or a couple's workspace."
        entries={groups.both}
        labels={{ a: chartTitle(chartA), b: chartTitle(chartB) }}
      />
      <CompareGroup
        heading="Avoid for both"
        tone="bad"
        description="Keep important functions out of these directions in shared rooms."
        entries={groups.avoid}
        labels={{ a: chartTitle(chartA), b: chartTitle(chartB) }}
      />
      {groups.mixed.length > 0 ? (
        <CompareGroup
          heading="One favourable, one to avoid"
          tone="mixed"
          description="Assign these rooms by primary user. The person who spends more active time there should get their favourable orientation."
          entries={groups.mixed}
          labels={{ a: chartTitle(chartA), b: chartTitle(chartB) }}
        />
      ) : null}

      <section className="compare-actions">
        <Link href="/account" className="chart-back-link">
          Back to your account
        </Link>
      </section>
    </div>
  );
}

function CompareGroup({
  heading,
  tone,
  description,
  entries,
  labels,
}: {
  heading: string;
  tone: "good" | "bad" | "mixed";
  description: string;
  entries: import("@/lib/shared-rooms").SharedEntry[];
  labels: { a: string; b: string };
}) {
  return (
    <section className={`compare-group compare-group-${tone}`}>
      <h2 className="compare-group-heading">{heading}</h2>
      <p className="compare-group-desc">{description}</p>
      {entries.length === 0 ? (
        <p className="compare-group-empty">(None in this category.)</p>
      ) : (
        <ul className="compare-group-list">
          {entries.map((e) => (
            <li key={e.compass} className="compare-group-row">
              <p className="compare-group-compass">{e.compassLabel}</p>
              <p className="compare-group-detail">
                <strong>{labels.a}:</strong> {e.a.pinyin} (
                {e.a.gloss.toLowerCase()})
                {" · "}
                <strong>{labels.b}:</strong> {e.b.pinyin} (
                {e.b.gloss.toLowerCase()})
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
