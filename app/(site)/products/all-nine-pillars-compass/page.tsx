import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";

export const metadata: Metadata = {
  title: "Nine Life Areas Compass | My Feng Shui Home",
  description:
    "All nine life-area corners of your home read for your Kua in one PDF: wealth, recognition, relationships, creativity, helpful people, career, knowledge, family, and the health centre. $29.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/all-nine-pillars-compass",
  },
  openGraph: {
    type: "website",
    title: "Nine Life Areas Compass",
    description:
      "All nine bagua life-area corners read for your Kua, in one PDF. $29.",
    url: "https://myfengshuihome.com/products/all-nine-pillars-compass",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/all-nine-pillars-compass",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function AllNinePillarsCompassPage(props: {
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
          The <em>Nine Life Areas Compass</em>.
        </h1>
        <p className="product-lede">
          The bagua splits a home into nine life areas, each in a fixed
          compass corner: wealth, recognition, relationships, creativity,
          helpful people, career, knowledge, family, and the health
          centre. This reading takes all nine at once and reads each
          corner against your Kua, so you know which areas of your home
          the tradition treats as doubly strong for you and which to tend
          more gently. The nine single-area readings, in one book, at a
          bundle price.
        </p>
        <p className="product-hero-launch-state">
          Available now. After you pay, you fill in a short form and the personalised PDF is generated and emailed to you within about a minute.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="all-nine-pillars-compass" title="Nine Life Areas Compass" />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            One chapter for each of the nine life areas, read for your Kua
            number and your East or West group.
          </li>
          <li>
            For every area: the fixed compass corner it sits in, what the
            tradition associates with it, and how to find and tend yours.
          </li>
          <li>
            How to check each corner against your own eight directions, so
            you know where your home is naturally strong.
          </li>
          <li>One small move per area, with your name on the cover.</li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $29, no subscription.</li>
          <li>
            You fill in three fields: first name, birth date, gender. We
            compute your Kua server-side.
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
          It reads your direction profile, not your floor plan, and it
          does not promise outcomes. The life areas are corners the
          tradition associates with parts of life; tending them is a
          structured way to decide where to put your attention, not a
          fortune.
        </p>
      </section>

      <FulfillmentBlock slug="all-nine-pillars-compass" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. You fill in a short form after paying and the PDF is emailed to you.
        </p>
        <BuyButton
          productSlug="all-nine-pillars-compass"
          priceLabel="$29"
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
