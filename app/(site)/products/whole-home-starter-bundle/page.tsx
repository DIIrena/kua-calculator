import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title: "Whole-Home Starter Bundle | My Feng Shui Home",
  description:
    "The Diagnostic Workbook, the Daily Ritual Pack, and the Cures Catalogue together: audit the home, build the rhythm, pick the cures. Three PDFs, one price.",
  alternates: {
    canonical:
      "https://myfengshuihome.com/products/whole-home-starter-bundle",
  },
  openGraph: {
    type: "website",
    title: "Whole-Home Starter Bundle",
    description:
      "Workbook + Ritual Pack + Cures Catalogue. Three PDFs, one price.",
    url: "https://myfengshuihome.com/products/whole-home-starter-bundle",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function StarterBundlePage(props: {
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
          The <em>Whole-Home Starter Bundle</em>.
        </h1>
        <p className="product-lede">
          Three books that work as one method: the{" "}
          <Link href="/products/home-diagnostic-workbook">
            10-Step Home Diagnostic Workbook
          </Link>{" "}
          to read your home, the{" "}
          <Link href="/products/daily-ritual-pack">
            Daily Ritual and Twenty Laws Pack
          </Link>{" "}
          to build the daily rhythm, and the{" "}
          <Link href="/products/cures-catalog">
            Cures and Crystals Catalogue
          </Link>{" "}
          to pick the finishing layer. $29 together; bought separately
          they come to $32.
        </p>
        <p className="product-hero-launch-state">
          The three books are finished and checkout opens shortly. Join
          the waitlist and you get the launch price the day it does.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to the waitlist →</a>
        </p>
      </section>

      <section
        className="product-section"
        aria-label="The three books in the bundle"
      >
        <h2>The three books.</h2>
        <p>Everything in the bundle, on one shelf.</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.25rem",
            marginTop: "1.25rem",
          }}
        >
          {[
            {
              slug: "home-diagnostic-workbook",
              label: "10-Step Home Diagnostic Workbook",
            },
            {
              slug: "daily-ritual-pack",
              label: "Daily Ritual and Twenty Laws Pack",
            },
            { slug: "cures-catalog", label: "Cures and Crystals Catalogue" },
          ].map((b) => (
            <figure key={b.slug} style={{ margin: 0 }}>
              <Link href={`/products/${b.slug}`}>
                <Image
                  src={`/products/${b.slug}/cover-portrait.png`}
                  alt={`${b.label}, front cover.`}
                  width={1024}
                  height={1536}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e2dac5",
                    display: "block",
                  }}
                />
              </Link>
              <figcaption
                style={{
                  fontSize: "0.8rem",
                  color: "#4f5b53",
                  marginTop: "0.5rem",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {b.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="product-section">
        <h2>How the three fit together</h2>
        <ol>
          <li>
            <strong>Audit first.</strong> The Workbook walks the ten
            steps and leaves you with a written read of your own home.
          </li>
          <li>
            <strong>Then the rhythm.</strong> The Ritual Pack turns the
            findings into a morning and evening practice, one law per
            week.
          </li>
          <li>
            <strong>Cures last.</strong> The Catalogue is the reference
            you reach for when a specific corner asks for a specific
            fix. Objects are the finishing layer, not the foundation.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $29, no subscription.</li>
          <li>
            All three PDFs arrive by email within a minute (76 pages
            across the set).
          </li>
          <li>
            7-day refund, no questions asked, covering the whole
            bundle.
          </li>
        </ol>
      </section>

      <section className="product-buy-section">
        <h2>Join the waitlist.</h2>
        <p>
          The Bundle launches shortly. Join the list and we email you
          the launch page and the early price.
        </p>
        <BuyButton
          productSlug="whole-home-starter-bundle"
          priceLabel="$29"
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
