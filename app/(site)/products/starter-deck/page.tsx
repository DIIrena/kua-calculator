import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";

export const metadata: Metadata = {
  title: "Learn Feng Shui Starter Deck | My Feng Shui Home",
  description:
    "Twenty-four printable flashcards of the working feng shui vocabulary, plus a bagua grid and a getting-started sequence. For beginners.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/starter-deck",
  },
  openGraph: {
    type: "website",
    title: "Learn Feng Shui Starter Deck",
    description:
      "Twenty-four flashcards and one map: the working vocabulary of feng shui, cut to fit your hand.",
    url: "https://myfengshuihome.com/products/starter-deck",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/starter-deck",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function StarterDeckPage(props: {
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
          The <em>Learn Feng Shui Starter Deck</em>.
        </h1>
        <p className="product-lede">
          The vocabulary of feng shui, cut to fit your hand. Twenty-four
          printable flashcards hold the most load-bearing terms in the
          practice, one per card, in six groups that build on each
          other, plus a printable bagua grid and a getting-started
          sequence. $9, one-time. 15 pages. Learn the words, print the
          map, make the moves.
        </p>
        <p className="product-hero-launch-state">
          Available now. The files arrive by email the moment you buy.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="starter-deck" title="Learn Feng Shui Starter Deck" />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            Twenty-four flashcards with dashed cut guides, four to a
            page: each card holds the term, how to say it, a one-line
            definition, and one line showing the term at work in a real
            room.
          </li>
          <li>
            A printable bagua grid you can lay beside your own floor
            plan.
          </li>
          <li>
            A getting-started sequence: the first five moves a beginner
            makes, in order, each labelled Tested or Traditional.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $9, no subscription.</li>
          <li>
            The PDF arrives by email within a minute. Print, cut, and
            keep one group at a time on the desk.
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
          It is not the whole guide. It is the door into it: the words
          you need before the rest of the practice stops sounding like
          a single muddled tradition. Everything the cards name is
          covered in more depth in the free guide.
        </p>
      </section>

      <FulfillmentBlock slug="starter-deck" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. Your files arrive by email the moment you buy.
        </p>
        <BuyButton
          productSlug="starter-deck"
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
