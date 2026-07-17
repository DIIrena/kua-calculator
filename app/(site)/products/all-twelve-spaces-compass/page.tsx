import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";

export const metadata: Metadata = {
  title: "Twelve Spaces Compass | My Feng Shui Home",
  description:
    "Every room of your home read for your Kua in one PDF: bedroom, office, dining, kitchen, living room, bathroom, entrance, hallway, storage, laundry, balcony, garage. $29.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/all-twelve-spaces-compass",
  },
  openGraph: {
    type: "website",
    title: "Twelve Spaces Compass",
    description: "Every room of your home read for your Kua, in one PDF. $29.",
    url: "https://myfengshuihome.com/products/all-twelve-spaces-compass",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/all-twelve-spaces-compass",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function AllTwelveSpacesCompassPage(props: {
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
          The <em>Twelve Spaces Compass</em>.
        </h1>
        <p className="product-lede">
          Twelve rooms, read one at a time for your Kua: the bedroom, the
          office, the dining table, the kitchen, the living room, the
          bathroom, the entrance, the hallways, storage, laundry, the
          balcony, and the garage. Each chapter gives the traditional
          placements for that room keyed to your number, so you can walk
          your whole home with one book in hand. The twelve single-room
          readings together, at a bundle price.
        </p>
        <p className="product-hero-launch-state">
          Available now. After you pay, you fill in a short form and the personalised PDF is generated and emailed to you within about a minute.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="all-twelve-spaces-compass" title="Twelve Spaces Compass" />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            One chapter for each of the twelve rooms, read for your Kua
            number and your East or West group.
          </li>
          <li>
            For every room: which supportive directions to use, which
            cautious ones to keep for other jobs, and the command position
            where it applies.
          </li>
          <li>One small move per room, with your name on the cover.</li>
          <li>
            A whole-home walkthrough you can follow room by room over a
            weekend.
          </li>
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
          It reads your direction profile, the eight directions that
          follow from your Kua, not your floor plan, and it does not
          promise outcomes. It is a structured way to decide how each room
          is set up, not a fortune.
        </p>
      </section>

      <FulfillmentBlock slug="all-twelve-spaces-compass" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. You fill in a short form after paying and the PDF is emailed to you.
        </p>
        <BuyButton
          productSlug="all-twelve-spaces-compass"
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
