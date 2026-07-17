import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import ProductPreview from "@/components/ProductPreview";
import FulfillmentBlock from "@/components/FulfillmentBlock";

export const metadata: Metadata = {
  title: "Laundry Compass | My Feng Shui Home",
  description:
    "Your laundry read for your Kua: why utility space suits a cautious direction, kept dry, tidy, and in working order. A short personalised PDF, $7.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/laundry-compass",
  },
  openGraph: {
    type: "website",
    title: "Laundry Compass",
    description: "Your laundry read for your Kua: why utility space suits a cautious direction, kept dry, tidy, and in working order.",
    url: "https://myfengshuihome.com/products/laundry-compass",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/laundry-compass",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function LaundryCompassPage(props: {
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
          The <em>Laundry Compass</em>.
        </h1>
        <p className="product-lede">Your laundry read for your Kua: why utility space suits a cautious direction, kept dry, tidy, and in working order.</p>
        <p className="product-hero-launch-state">
          Available now. After you pay, you fill in a short form and the
          personalised PDF is generated and emailed to you within about a
          minute.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="laundry-compass" title="Laundry Compass" />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            A short reading keyed to your Kua number and your East or West
            group.
          </li>
          <li>
            The traditional placements for this part of your home: the
            supportive directions to use, and the cautious ones to keep for
            other jobs.
          </li>
          <li>One small move to try, with a seven-day way to test it.</li>
          <li>
            A few typeset pages, in our brand, with your name on the cover.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $7, no subscription.</li>
          <li>
            You fill in three fields: first name, birth date, gender. We
            compute your Kua server-side, applying the Chinese New Year
            cutoff if you were born in January or early February.
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
          It reads your direction profile, the eight directions that follow
          from your Kua, not your floor plan. It does not promise outcomes.
          It is a structured way to choose between arrangements that
          otherwise look equivalent, not a fortune.
        </p>
      </section>

      <FulfillmentBlock slug="laundry-compass" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. You fill in a
          short form after paying and the PDF is emailed to you.
        </p>
        <BuyButton
          productSlug="laundry-compass"
          priceLabel="$7"
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
