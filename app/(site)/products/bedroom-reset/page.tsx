import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";
import ProductHero from "@/components/ProductHero";

export const metadata: Metadata = {
  title:
    "Bedroom and Relationship Reset | My Feng Shui Home",
  description:
    "A focused PDF reading the bedroom for your Kua, with the full headboard, mirror, and shared-furniture checklist. Practical and printable.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/bedroom-reset",
  },
  openGraph: {
    type: "website",
    title: "Bedroom and Relationship Reset",
    description:
      "A focused PDF reading the bedroom for your Kua.",
    url: "https://myfengshuihome.com/products/bedroom-reset",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/bedroom-reset",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function BedroomResetPage(props: {
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
          The <em>Bedroom and Relationship Reset</em>.
        </h1>
        <p className="product-lede">
          Most homes have one bedroom that has been arranged the way
          it has been arranged because the closet happened to be on
          that wall. The Reset is a focused printable book that walks
          you through the bedroom from the door inward, against your
          Kua, with the small moves the tradition has long associated
          with rest and steady connection.
        </p>
        <p className="product-hero-launch-state">
          Available now. The files arrive by email the moment you buy.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="bedroom-reset" title="Bedroom and Relationship Reset" />

      <ProductHero
        slug="bedroom-reset"
        alt="A serene couples bedroom with the bed in command position at soft dawn light"
      />

      <section className="product-section">
        <h2>Who it is for</h2>
        <p>
          You want the bedroom done right. You may share it with a
          partner, or you may sleep alone. Either way, you want a
          structured walkthrough that takes an afternoon and leaves
          you with a room you have actually decided on rather than
          inherited.
        </p>
      </section>

      <section className="product-section">
        <h2>What it helps with</h2>
        <ul>
          <li>
            Picking the headboard wall based on your Kua and the
            traditional bed-direction reading.
          </li>
          <li>
            Working out the mirror question, the door-and-bed line,
            and the under-bed storage rule.
          </li>
          <li>
            For couples: the East and West conversation, and the
            traditional way to seat the shared bed when two Kua
            numbers disagree.
          </li>
          <li>
            For solo readers: how to prepare a bedroom for connection
            without making the bed feel like it is waiting.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            A printable bedroom checklist (headboard, mirror, door,
            under-bed, bedside, light).
          </li>
          <li>
            The four bed-orientation readings for your Kua, ranked.
          </li>
          <li>
            A focused section for couples, with a worked example of
            two different Kua numbers settling into one room.
          </li>
          <li>
            A short single-reader section, for setting the room up
            around your own rest first.
          </li>
          <li>
            A small seven-day experiment to test a single change.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $14, no subscription.</li>
          <li>
            The PDF arrives by email within a minute. It carries the
            bed-direction readings for all nine Kua numbers, so you
            look up yours (and your partner&apos;s) inside the book.
            No forms to fill.
          </li>
          <li>
            Reply to the delivery
            email any time for a fresh download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>Why it helps</h2>
        <p>
          It gives you a structured way to set up the bedroom - which
          wall the headboard wants, which side the bed sits - using a
          method the tradition has refined over a long time. The reward
          is a room that feels calmer to sleep in, and one less thing to
          second-guess at the end of the day.
        </p>
      </section>

      <FulfillmentBlock slug="bedroom-reset" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. Your files arrive by email the moment you buy.
        </p>
        <BuyButton
          productSlug="bedroom-reset"
          priceLabel="$14"
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
