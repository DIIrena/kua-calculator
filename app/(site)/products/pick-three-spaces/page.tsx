import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title: "Three Spaces Compass | My Feng Shui Home",
  description:
    "Choose any three rooms and get them read for your Kua in one PDF. Build your own focused bundle. $17.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/pick-three-spaces",
  },
  openGraph: {
    type: "website",
    title: "Three Spaces Compass",
    description: "Pick any three rooms, read for your Kua. $17.",
    url: "https://myfengshuihome.com/products/pick-three-spaces",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function PickThreeSpacesPage(props: {
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
          The <em>Three Spaces Compass</em>.
        </h1>
        <p className="product-lede">
          Build your own focused bundle. Choose any three rooms, from the
          bedroom, office, dining room, kitchen, living room, bathroom,
          entrance, hallway, storage, laundry, balcony, or garage, and get
          each one read for your Kua in a single PDF. Cheaper than three
          single readings, scoped to the rooms you actually want to work
          on first.
        </p>
        <p className="product-hero-launch-state">
          Available now. After you pay, you fill in a short form and the personalised PDF is generated and emailed to you within about a minute.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $17, no subscription.</li>
          <li>
            You fill in three fields and tick the three rooms you want. We
            compute your Kua server-side.
          </li>
          <li>
            Within about a minute, a PDF with your three chosen rooms is
            generated and emailed to you with a download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It reads your direction profile, the eight directions that
          follow from your Kua, not your floor plan, and it does not
          promise outcomes. It is a structured way to decide how each
          chosen room is set up, not a fortune.
        </p>
      </section>

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. 7-day refund. You fill in a short form after paying and the PDF is emailed to you.
        </p>
        <BuyButton
          productSlug="pick-three-spaces"
          priceLabel="$17"
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
