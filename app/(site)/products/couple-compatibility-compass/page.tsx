import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title: "Couple Compatibility Compass | My Feng Shui Home",
  description:
    "Two people, one home, read together. Both Kua maps laid over each other: where you agree, where to take turns, and how to settle the shared bed and table. $19.",
  alternates: {
    canonical:
      "https://myfengshuihome.com/products/couple-compatibility-compass",
  },
  openGraph: {
    type: "website",
    title: "Couple Compatibility Compass",
    description:
      "Both of your Kua maps read together: where you agree, where to take turns, and how to settle shared furniture. $19.",
    url: "https://myfengshuihome.com/products/couple-compatibility-compass",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function CoupleCompatibilityCompassPage(props: {
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
          The <em>Couple Compatibility Compass</em>.
        </h1>
        <p className="product-lede">
          A home is rarely arranged for one body. This reading takes both
          of your Kua numbers and lays your direction maps over each
          other: the directions you both find supportive, the ones where
          one of you is helped and the other asked to take care, and the
          corners you can both hand to storage. Then it settles the
          furniture you actually share, the bed and the table, with the
          tradition's rules for when two maps disagree.
        </p>
        <p className="product-hero-launch-state">
          Available now. After you pay, you fill in a short form and the personalised PDF is generated and emailed to you within about a minute.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            Both Kua profiles side by side: each person&apos;s number,
            group, and four supportive directions.
          </li>
          <li>
            <strong>Where you agree</strong> - the directions supportive
            for both of you, the easy ones for shared furniture.
          </li>
          <li>
            <strong>Where to take turns</strong> - the directions good for
            one and cautious for the other, and how to handle them.
          </li>
          <li>
            <strong>Where you both go gentle</strong> - the corners to
            hand to storage and utility.
          </li>
          <li>
            A practical recommendation for the shared bed and the shared
            table, with both your names on the cover.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $19, no subscription.</li>
          <li>
            You fill in two short profiles: a first name, birth date, and
            gender for each of you. We compute both Kua numbers
            server-side.
          </li>
          <li>
            Within about a minute, the PDF is generated and emailed to you
            with a download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It does not make a claim about your relationship, and it does
          not promise anything. It reads two direction profiles, not your
          floor plan, and gives you a structured, non-arbitrary way to
          choose between arrangements that otherwise look equal. The
          tradition makes the associations; you stay the experts on your
          own home.
        </p>
      </section>

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. 7-day refund. You fill in a short form after paying and the PDF is emailed to you.
        </p>
        <BuyButton
          productSlug="couple-compatibility-compass"
          priceLabel="$19"
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
