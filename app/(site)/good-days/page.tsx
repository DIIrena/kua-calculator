import type { Metadata } from "next";
import Link from "next/link";
import GoodDaysForm from "@/components/GoodDaysForm";
import calendar from "@/lib/day-calendar-2026.json";

// The free Good Days page (shop-redesign task A2). The traffic asset:
// every Favourable day from the verified day calendar, July 2026 to
// February 2027, readable on the page (SEO + Pinterest), with the
// printable copy delivered by email via GoodDaysForm. Upsells: the
// Complete Home Compass and the Move-In Date Report. No ads, ever.
// The old $9 good-days-calendar-2026 product URL 301s here.

export const metadata: Metadata = {
  title: "Good Days in 2026 and 2027: the Feng Shui Date Calendar | My Feng Shui Home",
  description:
    "Every favourable day for starting, signing, and moving from July 2026 to February 2027, with the reason for each. Free, readable on the page, printable by email.",
  alternates: { canonical: "https://myfengshuihome.com/good-days" },
  robots: { index: true, follow: true },
};

type Day = {
  date: string;
  label: string;
  officer: string;
  category: string;
  verdict: string;
  note: string;
};

// The month opened by default: today's month while the calendar covers
// it, otherwise the first month of the range.
const CURRENT_MONTH = (() => {
  const now = new Date().toISOString().slice(0, 7);
  return now >= "2026-07" && now <= "2027-02" ? now : "2026-07";
})();

const MONTH_NAMES: Record<string, string> = {
  "2026-07": "July 2026",
  "2026-08": "August 2026",
  "2026-09": "September 2026",
  "2026-10": "October 2026",
  "2026-11": "November 2026",
  "2026-12": "December 2026",
  "2027-01": "January 2027",
  "2027-02": "February 2027",
};

function trimNote(note: string): string {
  // The month-level sector suffix is Planner-depth detail; the free page
  // keeps the day's own reason.
  const cut = note.indexOf(" Month-level");
  return (cut > 0 ? note.slice(0, cut) : note).trim();
}

function dayNumber(iso: string): string {
  return String(Number(iso.slice(8, 10)));
}

export default function GoodDaysPage() {
  const days = (calendar as { days: Day[] }).days;
  const months = Object.keys(MONTH_NAMES);

  return (
    <div className="page-content">
      <article className="page-prose good-days-page">
        <p className="eyebrow">Free date calendar</p>
        <h1>Good days in 2026 and 2027.</h1>

        <section className="good-days-legend" aria-label="How to read this">
          <p>
            The tradition assigns each day one of twelve officers, and each
            officer a character. We group them plainly: <strong>favourable</strong>{" "}
            days suit beginnings and agreements; <strong>settling</strong> days
            suit finishing and tidying; <strong>neutral</strong> days are
            ordinary operating days; <strong>caution</strong> days suit routine
            over risk. This page lists the favourable days in full, and the
            caution dates so you can plan around them.
          </p>
        </section>

        {months.map((m) => {
          const monthDays = days.filter((d) => d.date.startsWith(m));
          const favourable = monthDays.filter((d) => d.verdict === "Favourable");
          const caution = monthDays.filter((d) => d.verdict === "Caution");
          const isCurrent = m === CURRENT_MONTH;
          return (
            <details
              key={m}
              className="good-days-month"
              open={isCurrent}
            >
              <summary>
                <span className="good-days-month-name">{MONTH_NAMES[m]}</span>
                <span className="good-days-month-count">
                  {favourable.length} favourable days
                </span>
              </summary>
              <ul className="good-days-list">
                {favourable.map((d) => (
                  <li key={d.date}>
                    <strong>{d.label}</strong>
                    <span className="good-days-officer"> {d.officer}. </span>
                    {trimNote(d.note)}
                  </li>
                ))}
              </ul>
              {caution.length > 0 ? (
                <p className="good-days-caution">
                  Handle with care in {MONTH_NAMES[m]}:{" "}
                  {caution.map((d) => dayNumber(d.date)).join(", ")}.
                </p>
              ) : null}
            </details>
          );
        })}

        <p className="good-days-more">
          March to December 2027 will be added here as soon as the 2027
          day calendar is verified.
        </p>

        <section className="good-days-email" id="gd-email" aria-label="Email me the calendar">
          <h2>Keep it by the calendar.</h2>
          <p>
            We can email you the link so it is easy to find again, and easy
            to print. The whole page prints cleanly.
          </p>
          <GoodDaysForm />
        </section>

        <section className="good-days-upsell" aria-label="Read the year for your own home">
          <h2>Want the year read for your own home?</h2>
          <p>
            The dates above are the same for everyone. Your home is not.
            The <Link href="/products/complete-home-compass">Complete Home
            Compass</Link> reads every room and life area for your Kua
            number, including the 2026 overlay, in one personalised volume
            ($49, one-time). Moving house? The{" "}
            <Link href="/products/move-in-kit">Move-In Date Report</Link>{" "}
            reads your own move-in window day by day against your Kua
            ($29, one-time).
          </p>
        </section>

        <p className="refunds-back">
          <Link href="/kua-calculator" className="article-back-link">
            &larr; Start free: find your Kua number
          </Link>
        </p>
      </article>
    </div>
  );
}
