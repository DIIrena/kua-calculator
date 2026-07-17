import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";

export const metadata: Metadata = {
  title: "Five Elements Home Styling Workbook | My Feng Shui Home",
  description:
    "The five elements as a practical styling vocabulary: Wood, Fire, Earth, Metal, Water. Element spreads, worksheets, the two cycles, and a room-by-room guide.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/five-elements-workbook",
  },
  openGraph: {
    type: "website",
    title: "Five Elements Home Styling Workbook",
    description:
      "Read any room in five words. Element spreads, worksheets, the two cycles, a balancing quick-table.",
    url: "https://myfengshuihome.com/products/five-elements-workbook",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/five-elements-workbook",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function FiveElementsWorkbookPage(props: {
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
          The <em>Five Elements Home Styling Workbook</em>.
        </h1>
        <p className="product-lede">
          Five words for reading any room: Wood, Fire, Earth, Metal,
          Water. The workbook teaches the vocabulary one element at a
          time, hands you the two rules that decide what belongs next
          to what, and walks your home room by room. $12, one-time. 26
          pages. A styling vocabulary, not a shopping list.
        </p>
        <p className="product-hero-launch-state">
          Available now. The files arrive by email the moment you buy.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="five-elements-workbook" title="Five Elements Home Styling Workbook" />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            Five element spreads, each with a reading page and a
            worksheet: a census of which rooms already carry that
            element, and one small addition to try.
          </li>
          <li>
            The two cycles that govern how elements behave side by
            side, with the practical rule: feed what you want more of,
            and keep the controller for genuine excess.
          </li>
          <li>
            A room-by-room guide to the element each room leans on, and
            a balancing quick-table for rooms with too much of
            anything.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $12, no subscription.</li>
          <li>
            The PDF arrives by email within a minute. Print it and work
            one element at a time.
          </li>
          <li>
            Reply to the delivery
            email any time for a fresh download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is not a decorating service or a rulebook that overrides
          your taste. It gives you a vocabulary for reading what a room
          already holds, so the next choice is deliberate rather than a
          guess. None of the five experiments inside requires a
          purchase.
        </p>
      </section>

      <FulfillmentBlock slug="five-elements-workbook" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. Your files arrive by email the moment you buy.
        </p>
        <BuyButton
          productSlug="five-elements-workbook"
          priceLabel="$12"
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
