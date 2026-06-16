import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";

export const metadata: Metadata = {
  title: "Daily Ritual and Twenty Laws Pack | My Feng Shui Home",
  description:
    "The twenty traditional laws as printable cards, plus morning and evening checklists for a calm daily rhythm. A short printable pack.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/daily-ritual-pack",
  },
  openGraph: {
    type: "website",
    title: "Daily Ritual and Twenty Laws Pack",
    description:
      "Twenty traditional laws as printable cards + morning and evening checklists.",
    url: "https://myfengshuihome.com/products/daily-ritual-pack",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/daily-ritual-pack",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function DailyRitualPackPage(props: {
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
          The <em>Daily Ritual and Twenty Laws Pack</em>.
        </h1>
        <p className="product-lede">
          The smallest book on the shelf, on purpose. The pack prints
          the twenty laws the tradition keeps coming back to as
          quarter-page cards (one law, a three-sentence reading, one
          small daily act), plus a morning checklist and an evening
          checklist for the home. $9, one-time. 13 pages. Print it,
          cut the cards, keep one on the desk a week at a time.
        </p>
        <p className="product-hero-launch-state">
          Available now. The files arrive by email the moment you buy.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="daily-ritual-pack" title="Daily Ritual and Twenty Laws Pack" />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            The twenty laws as printable cards with dashed cut guides,
            four to a page: the law in one line, a short reading, and
            one small act you can do that day.
          </li>
          <li>
            The morning sequence and the evening sequence as two
            facing checklists: open, light, water, clear, close.
          </li>
          <li>A weekly review quarter-page.</li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $9, no subscription.</li>
          <li>The PDF arrives by email within a minute. Print and cut.</li>
          <li>
            7-day refund. Reply to the delivery
            email any time for a fresh download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          The laws are traditional framings, not guarantees. They are
          kept because households have found them worth keeping, and
          the pack presents them that way: as a practice to try, one
          week at a time, not a promise about what follows.
        </p>
      </section>

      <FulfillmentBlock slug="daily-ritual-pack" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. 7-day refund. Your files arrive by email the moment you buy.
        </p>
        <BuyButton
          productSlug="daily-ritual-pack"
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
