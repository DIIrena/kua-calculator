import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import ProductGallery from "@/components/ProductGallery";

export const metadata: Metadata = {
  title: "Cures and Crystals Catalogue | My Feng Shui Home",
  description:
    "Every cure and crystal as a compact reference card: what it is, where it goes, what the tradition says, and the modern reading. Printable catalogue.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/cures-catalog",
  },
  openGraph: {
    type: "website",
    title: "Cures and Crystals Catalogue",
    description:
      "Every cure and crystal as a compact reference card, organised by the six cure families.",
    url: "https://myfengshuihome.com/products/cures-catalog",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function CuresCatalogPage(props: {
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
          The <em>Cures and Crystals Catalogue</em>.
        </h1>
        <p className="product-lede">
          The Catalogue puts every cure on a card: what it is, where
          it goes, what the tradition says, and what the modern
          reading adds, with each card labelled Tested, Traditional,
          or Preference so you always know which kind of claim you
          are reading. Around 25 cure cards organised by the six
          families (light, sound, water, plants, colour, objects),
          plus 15 crystal cards and a placement quick-table. $9,
          one-time. 23 pages.
        </p>
        <p className="product-hero-launch-state">
          The Catalogue is finished and checkout opens shortly. Join
          the waitlist and you get the launch price the day it does.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to the waitlist →</a>
        </p>
      </section>

      <ProductGallery slug="cures-catalog" title="Cures and Crystals Catalogue" />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            The cure cards, four to a page, organised by the six cure
            families. Each card: what it is, where it goes, what the
            tradition says, the modern reading, and its label.
          </li>
          <li>
            The crystal cards, same anatomy. Every crystal card is
            labelled Traditional or Preference, never Tested; the
            catalogue is plain about which kind of claim each one is.
          </li>
          <li>
            A placement quick-table: cure family by room, one page.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $9, no subscription.</li>
          <li>The PDF arrives by email within a minute.</li>
          <li>
            7-day refund, no questions asked. Reply to the delivery
            email any time for a fresh download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          Objects do not replace the structural moves. A cure is the
          finishing layer; the door, the bed, the stove, and the light
          do the heavy lifting. The catalogue says so on its own
          pages, card by card.
        </p>
      </section>

      <section className="product-buy-section">
        <h2>Join the waitlist.</h2>
        <p>
          The Catalogue launches shortly. Join the list and we email
          you the launch page and the early price.
        </p>
        <BuyButton
          productSlug="cures-catalog"
          priceLabel="$9"
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
    </div>
  );
}
