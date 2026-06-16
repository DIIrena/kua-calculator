import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";
import FlagshipChooser from "@/components/FlagshipChooser";

export const metadata: Metadata = {
  title: "Complete Home Compass | My Feng Shui Home",
  description:
    "The whole library in one PDF: your eight directions in depth, compatibility, all twelve rooms, all nine life areas, and the 2026 overlay, read for your Kua. The flagship. $49.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/complete-home-compass",
  },
  openGraph: {
    type: "website",
    title: "Complete Home Compass",
    description:
      "Everything read for your Kua: directions, rooms, life areas, the year. $49.",
    url: "https://myfengshuihome.com/products/complete-home-compass",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/complete-home-compass",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function CompleteHomeCompassPage(props: {
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
          The <em>Complete Home Compass</em>.
        </h1>
        <p className="product-lede">
          Everything we read, in one book, keyed to you. Your eight
          directions in depth, how your group pairs with another, all
          twelve rooms, all nine life areas, and the shape of the 2026
          year against your Kua. It is the whole library bound into a
          single personalised volume, for the reader who wants the entire
          map in one place rather than a corner at a time.
        </p>
        <p className="product-hero-launch-state">
          Available now. After you pay, you fill in a short form and the personalised PDF is generated and emailed to you within about a minute.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="complete-home-compass" title="Complete Home Compass" />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            Your full Kua profile and a personalised bagua chart, with the
            one-page at-a-glance summary.
          </li>
          <li>
            All eight direction chapters, four supportive and four to
            handle with care, read for your Kua.
          </li>
          <li>The compatibility chapter, for two people in one home.</li>
          <li>All twelve room chapters and all nine life-area chapters.</li>
          <li>The 2026 overlay and a seven-day experiment.</li>
          <li>
            Around 95 to 145 typeset pages, in our brand, with your name on
            the cover.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $49, no subscription.</li>
          <li>
            You fill in three fields: first name, birth date, gender. We
            compute your Kua server-side.
          </li>
          <li>
            Within a minute or two, the full PDF is generated and emailed
            to you with a download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is long, but it is still a reading of your direction profile,
          not your floor plan, and it does not promise outcomes. It is the
          complete structured map for deciding how your home is arranged,
          not a fortune.
        </p>
      </section>

      <FlagshipChooser current="complete" />

      <FulfillmentBlock slug="complete-home-compass" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. 7-day refund. You fill in a short form after paying and the PDF is emailed to you.
        </p>
        <BuyButton
          productSlug="complete-home-compass"
          priceLabel="$49"
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
