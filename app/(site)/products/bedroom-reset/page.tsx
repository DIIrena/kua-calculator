import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import ProductGallery from "@/components/ProductGallery";
import FloatingWaitlistCTA from "@/components/FloatingWaitlistCTA";

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
          The Reset is finished and checkout opens shortly. Join the
          waitlist and you get the launch price the day it does.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to the waitlist →</a>
        </p>
      </section>

      <ProductGallery slug="bedroom-reset" title="Bedroom and Relationship Reset" />

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
            A short single-reader section that does not promise a
            partner arrives.
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
            7-day refund, no questions asked. Reply to the delivery
            email any time for a fresh download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is not a guarantee about sleep or relationships. The
          tradition does not promise those, and neither will we. It
          is a structured way to choose how the bedroom is set up,
          using a method the tradition has refined over a long time.
        </p>
      </section>

      <section className="product-buy-section">
        <h2>Join the waitlist.</h2>
        <p>
          The Bedroom Reset is in development. When checkout goes
          live, we email you the launch page and the early price.
        </p>
        <BuyButton
          productSlug="bedroom-reset"
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

      <FloatingWaitlistCTA />
    </div>
  );
}
