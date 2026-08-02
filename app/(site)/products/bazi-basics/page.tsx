import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";
import { FourPillarsSample } from "@/components/ProductSampleDiagrams";
import ProductHero from "@/components/ProductHero";

export const metadata: Metadata = {
  title: "BaZi Basics: Read Your Own Chart | My Feng Shui Home",
  description:
    "Read your own birth chart the way the tradition reads it: the four pillars, your day master, and the ten relationships that show how you are built.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/bazi-basics",
  },
  openGraph: {
    type: "website",
    title: "BaZi Basics: Read Your Own Chart",
    description:
      "Read your own birth chart the way the tradition reads it: structure, day master, and the Ten Gods - language for how you are built.",
    url: "https://myfengshuihome.com/products/bazi-basics",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/bazi-basics",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function BaziBasicsPage(props: {
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
          <em>BaZi Basics: Read Your Own Chart</em>.
        </h1>
        <p className="product-lede">
          BaZi reads a birth moment the way a botanist reads a seed
          packet: what kind of plant this is, and which conditions it
          tends to favour. This primer teaches the four pillars, the
          day master, and the Ten Gods, enough to read your own chart
          the way the tradition reads it, and to come away with language
          for how you are built. $14, one-time. 24 pages.
        </p>
        <p className="product-hero-launch-state">
          Available now. The files arrive by email the moment you buy.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="bazi-basics" title="BaZi Basics: Read Your Own Chart" />

      <ProductHero
        slug="bazi-basics"
        alt="A quiet study desk at evening lamplight with an open primer and a reading lamp"
      />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            What BaZi is, taught from scratch: the four pillars, the
            stems and branches, and how to find your chart with a free
            calculator.
          </li>
          <li>
            The day master and the ten stems, each given a short
            portrait of the qualities the tradition associates with it.
          </li>
          <li>
            The Ten Gods explained as relationships between elements,
            each as a card: what it represents, how it shows up, and
            what it is really about. A worked example chart read start to finish.
          </li>
        </ul>
        <FourPillarsSample />
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $14, no subscription.</li>
          <li>
            The PDF arrives by email within a minute. Bring your own
            chart from any free four-pillars calculator and read along.
          </li>
          <li>
            Reply to the delivery
            email any time for a fresh download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>Why it helps</h2>
        <p>
          You come away with language for how you are built: your day
          master, the ten relationships around it, and the quiet "yes,
          that is me" of reading your own chart. It is a mirror drawn
          from the moment you were born, and it keeps giving the longer
          you sit with it.
        </p>
      </section>

      <FulfillmentBlock slug="bazi-basics" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. Your files arrive by email the moment you buy.
        </p>
        <BuyButton
          productSlug="bazi-basics"
          priceLabel="$14"
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
