import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FloatingWaitlistCTA from "@/components/FloatingWaitlistCTA";

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
          The reading is ready. Checkout is not live yet; join the
          waitlist and we email you the moment it opens.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to the waitlist →</a>
        </p>
      </section>

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

      <section className="product-buy-section">
        <h2>Join the waitlist.</h2>
        <p>
          When checkout goes live, we email you the launch page and the
          early price. You can unsubscribe any time.
        </p>
        <BuyButton
          productSlug="complete-home-compass"
          priceLabel="$49"
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
