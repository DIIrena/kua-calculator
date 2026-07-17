import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";

// The 2026 Good-Days Calendar: the $9 companion product extracted
// from the Planner's day-calendar layer. Printable PDF + a phone
// calendar file (ICS). Launches alongside the Planner; the BuyButton
// state flips to stripe-live with the rest of the catalogue.

export const metadata: Metadata = {
  title: "2026 Good-Days Calendar | My Feng Shui Home",
  description:
    "A day-by-day traditional calendar for July 2026 through February 2027: 243 days marked Action, Rest, Neutral, or Caution, as a printable PDF and a phone calendar file.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/good-days-calendar-2026",
  },
  openGraph: {
    type: "website",
    title: "2026 Good-Days Calendar",
    description:
      "243 days marked Action, Rest, Neutral, or Caution. Printable PDF + phone calendar file.",
    url: "https://myfengshuihome.com/products/good-days-calendar-2026",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/good-days-calendar-2026",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function GoodDaysCalendarPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return (
    <div className="page-content product-page">
      <section className="product-hero">
        <p className="eyebrow">My Feng Shui Home</p>
        <h1 className="product-heading">
          The <em>2026 Good-Days Calendar</em>.
        </h1>
        <p className="product-lede">
          The 2026 Good-Days Calendar marks every day from July 2026
          through February 2027 as Action, Rest, Neutral, or Caution,
          using the traditional day-selection method. 243 days, each
          with a one-line note. $9, one-time. It comes as a printable
          PDF and as a phone calendar file, so the day's reading sits
          quietly in the calendar you already use.
        </p>
        <p className="product-hero-launch-state">
          Checkout is open. The files arrive by email the moment you buy:
          a printable PDF and the phone calendar file.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="good-days-calendar-2026" title="2026 Good-Days Calendar" />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            A printable PDF: one clean table per month, July 2026
            through February 2027, with the category and a one-line
            note for each day.
          </li>
          <li>
            A phone calendar file (ICS) with the same 243 days, ready
            for Apple Calendar or Google Calendar.
          </li>
          <li>
            A one-page guide to the four categories: what the
            tradition means by an Action day, a Rest day, a Neutral
            day, and a Caution day.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>Who it is for</h2>
        <p>
          You want the timing layer without the full Planner. You have
          a lease to sign, a renovation to schedule, a launch to date,
          or you simply like knowing which days the tradition reads as
          suited to starting things and which it reads as suited to
          finishing them.
        </p>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is not a forecast. The tradition reads days as better or
          worse suited to kinds of activity; it does not predict what
          happens on them. Treat it as a structured way to choose
          between otherwise equal days. If a date cannot move, the
          calendar does not ask you to move it.
        </p>
        <p>
          The full sector-by-sector reading of the year lives in the{" "}
          <Link href="/products/annual-feng-shui-planner-2026">
            2026 Feng Shui Planner
          </Link>
          , which includes this calendar. Buy the Planner and you do
          not need this product separately.
        </p>
      </section>

      <FulfillmentBlock slug="good-days-calendar-2026" />

      <section className="product-buy-section">
        <h2>Buy the Calendar.</h2>
        <p>
          $9, one-time. The printable PDF and the phone calendar file
          arrive by email the moment you buy.
        </p>
        <BuyButton
          productSlug="good-days-calendar-2026"
          priceLabel="$9"
          state="stripe-live"
          waitlistStatus={status}
        />
      </section>

      <section className="product-back-section">
        <p>
          <Link href="/products" className="article-back-link">
            ← Back to all products
          </Link>
        </p>
      </section>
    </div>
  );
}
