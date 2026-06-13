import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title: "BaZi Basics: Read Your Own Chart | My Feng Shui Home",
  description:
    "An educational primer on the four pillars, the day master, and the Ten Gods: enough to read your own birth chart the way the tradition reads it. Not fortune-telling.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/bazi-basics",
  },
  openGraph: {
    type: "website",
    title: "BaZi Basics: Read Your Own Chart",
    description:
      "Read your own birth chart the way the tradition reads it. A self-description system, not a prediction.",
    url: "https://myfengshuihome.com/products/bazi-basics",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function BaziBasicsPage(props: {
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
          <em>BaZi Basics: Read Your Own Chart</em>.
        </h1>
        <p className="product-lede">
          BaZi reads a birth moment the way a botanist reads a seed
          packet: what kind of plant this is, and which conditions it
          tends to favour. This primer teaches the four pillars, the
          day master, and the Ten Gods, enough to read your own chart
          the way the tradition reads it, and to know exactly where the
          reading stops. $14, one-time. 24 pages.
        </p>
        <p className="product-hero-launch-state">
          The primer is finished and checkout opens shortly. Join the
          waitlist and you get the launch price the day it does.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to the waitlist →</a>
        </p>
      </section>

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            What BaZi is, taught from scratch: the four pillars, the
            stems and branches, and how to find your chart with a free
            calculator.
          </li>
          <li>
            The day master and the ten stems, each given a short
            portrait of the qualities the tradition associates with it.
          </li>
          <li>
            The Ten Gods explained as relationships between elements,
            each as a card: what it represents, how it shows up, and
            what it is not. A worked example chart read start to finish.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $14, no subscription.</li>
          <li>
            The PDF arrives by email within a minute. Bring your own
            chart from any free four-pillars calculator and read along.
          </li>
          <li>
            7-day refund, no questions asked. Reply to the delivery
            email any time for a fresh download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is not fortune-telling. Nothing in these pages forecasts
          events, dates, windfalls, or losses. BaZi is a traditional
          self-description system, not a prediction of your life: the
          chart describes a structure laid down at birth, and what
          happens inside that structure is decided by choices,
          circumstances, and people, none of which appear in any
          pillar.
        </p>
      </section>

      <section className="product-buy-section">
        <h2>Join the waitlist.</h2>
        <p>
          The primer launches shortly. Join the list and we email you
          the launch page and the early price.
        </p>
        <BuyButton
          productSlug="bazi-basics"
          priceLabel="$14"
          state="waitlist"
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
