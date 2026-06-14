import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title: "Office Compass | My Feng Shui Home",
  description:
    "Your desk and work seat read for your Kua: which direction to face for ambitious work, which for steady focus, and the command position. A short personalised PDF, $7.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/office-compass",
  },
  openGraph: {
    type: "website",
    title: "Office Compass",
    description: "Your desk and work seat read for your Kua: which direction to face for ambitious work, which for steady focus, and the command position.",
    url: "https://myfengshuihome.com/products/office-compass",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function OfficeCompassPage(props: {
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
          The <em>Office Compass</em>.
        </h1>
        <p className="product-lede">Your desk and work seat read for your Kua: which direction to face for ambitious work, which for steady focus, and the command position.</p>
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

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. 7-day refund. You fill in a short form after paying and the PDF is emailed to you.
        </p>
        <BuyButton
          productSlug="office-compass"
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
