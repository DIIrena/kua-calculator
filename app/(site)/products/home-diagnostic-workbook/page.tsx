import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";

export const metadata: Metadata = {
  title: "10-Step Home Diagnostic Workbook | My Feng Shui Home",
  description:
    "Audit your own home the way a practitioner would: ten steps, fill-in worksheets, a myth-guard, and a 90-day re-evaluation. Printable workbook.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/home-diagnostic-workbook",
  },
  openGraph: {
    type: "website",
    title: "10-Step Home Diagnostic Workbook",
    description:
      "Audit your own home the way a practitioner would. Ten steps, fill-in worksheets, 90-day re-evaluation.",
    url: "https://myfengshuihome.com/products/home-diagnostic-workbook",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function DiagnosticWorkbookPage(props: {
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
          The <em>10-Step Home Diagnostic Workbook</em>.
        </h1>
        <p className="product-lede">
          The 10-Step Home Diagnostic Workbook is a 28-page printable
          that walks you through your own home the way a practitioner
          would walk it: ten steps, one room at a time, with a fill-in
          worksheet for each step and a re-evaluation you book with
          yourself 90 days later. $14, one-time. Pencil and ninety
          minutes is all it asks.
        </p>
        <p className="product-hero-launch-state">
          Available now. The files arrive by email the moment you buy.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="home-diagnostic-workbook" title="10-Step Home Diagnostic Workbook" />

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            The ten diagnostic steps, each as a spread: a short
            explanation page facing a worksheet page with room to
            write what you noticed, the one move you will try, and a
            date to revisit.
          </li>
          <li>
            A 90-day re-evaluation page: three check-ins you book
            with yourself, so the workbook becomes a record instead
            of a one-time read.
          </li>
          <li>
            A one-page myth-guard: the most common wrong turns,
            flagged before you take them.
          </li>
          <li>
            Recommendations labelled Tested, Traditional, or
            Preference throughout, the same labelling the guide uses.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>Who it is for</h2>
        <p>
          You have read enough feng shui to want to do something, and
          you would rather work through your own home methodically
          than collect more tips. The workbook gives the walkthrough
          structure; your home supplies the answers.
        </p>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. $14, no subscription.</li>
          <li>
            The PDF arrives by email within a minute. Print it,
            take a pencil, and walk the ten steps at your own pace.
          </li>
          <li>
            7-day refund. Reply to the delivery
            email any time for a fresh download link.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is not a structural survey. For load-bearing walls,
          damp, or anything that holds the building up, you want an
          architect or an engineer, not a workbook. This book reads
          how the home is arranged and used; it leaves the structure
          to the professionals who measure it.
        </p>
      </section>

      <FulfillmentBlock slug="home-diagnostic-workbook" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. 7-day refund. Your files arrive by email the moment you buy.
        </p>
        <BuyButton
          productSlug="home-diagnostic-workbook"
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
