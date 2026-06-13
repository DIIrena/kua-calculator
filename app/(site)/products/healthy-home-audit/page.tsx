import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import ProductGallery from "@/components/ProductGallery";

export const metadata: Metadata = {
  title: "Healthy Home Audit | My Feng Shui Home",
  description:
    "An audit workbook for the conditions a home can support: air, light, damp, sound, temperature, scent, water, clutter, circulation. Nine spreads. No medical claims.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/healthy-home-audit",
  },
  openGraph: {
    type: "website",
    title: "Healthy Home Audit",
    description:
      "Nine condition audits with fill-in worksheets, a room-by-room health check, and a daily-rhythm page.",
    url: "https://myfengshuihome.com/products/healthy-home-audit",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function HealthyHomeAuditPage(props: {
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
          The <em>Healthy Home Audit</em>.
        </h1>
        <p className="product-lede">
          The Healthy Home Audit is a 34-page printable workbook that
          reads the nine conditions a home can support: air, light,
          damp, sound, temperature, scent, water, clutter, and
          circulation. Each condition gets a page to read and a page to
          fill in. $19, one-time. It reads conditions, not health, and
          says so on its own pages.
        </p>
        <p className="product-hero-launch-state">
          Available now. The files arrive by email the moment you buy.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductGallery slug="healthy-home-audit" title="Healthy Home Audit" />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            Nine condition audits, each a spread: an explanation page
            facing a worksheet with checkboxes and room to note what
            you found, the one move you will try, and a date to
            revisit.
          </li>
          <li>
            A room-by-room health check for the three rooms that carry
            the most: bedroom, kitchen, bathroom.
          </li>
          <li>
            A daily-rhythm page that turns the audit into a cadence:
            ventilation, light, and the small resets.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $19, no subscription.</li>
          <li>
            The PDF arrives by email within a minute. Print it and walk
            the nine conditions with a pencil.
          </li>
          <li>
            7-day refund, no questions asked. Reply to the delivery
            email any time for a fresh download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It makes no medical claims. These pages read conditions and
          conditions are all they read; they do not diagnose, treat,
          or explain anything happening in a body. Mould and persistent
          damp are jobs for proper remediation, and if something about
          your health concerns you, that belongs with a doctor. Nothing
          in this workbook stands in front of that.
        </p>
      </section>

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. 7-day refund, no questions asked. Your files arrive by email the moment you buy.
        </p>
        <BuyButton
          productSlug="healthy-home-audit"
          priceLabel="$19"
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
