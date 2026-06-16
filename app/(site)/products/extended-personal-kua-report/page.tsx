import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";

export const metadata: Metadata = {
  title:
    "Extended Personal Kua Report | The deep reading of your Kua and your rooms",
  description:
    "A personalised PDF that reads your Kua in depth: your eight directions, how your group pairs with another, and your bedroom, desk, and dining seat read for your number. Plus a 2026 year overlay. No outcome promises.",
  alternates: {
    canonical:
      "https://myfengshuihome.com/products/extended-personal-kua-report",
  },
  openGraph: {
    type: "website",
    title: "Extended Personal Kua Report",
    description:
      "The deep reading: your eight directions, your rooms read for your Kua, and a 2026 overlay. $39.",
    url: "https://myfengshuihome.com/products/extended-personal-kua-report",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/extended-personal-kua-report",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function ExtendedPersonalKuaReportPage(props: {
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
          The <em>Extended Personal Kua Report</em>.
        </h1>
        <p className="product-lede">
          The Personal Feng Shui Compass reads your eight directions. This
          report keeps all of that and goes further into the rooms you
          actually live in. It reads your bedroom, your desk, and your
          dining seat for your Kua number, explains how your group pairs
          with a partner in either group, and overlays the shape of the
          2026 solar year on your directions. It is the longer reading,
          for the person who wants the whole picture in one printable
          book.
        </p>
        <p className="product-hero-launch-state">
          Available now. After you pay, you fill in a short form and the personalised PDF is generated and emailed to you within about a minute.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      <ProductPreview slug="extended-personal-kua-report" title="Extended Personal Kua Report" />

      <section className="product-section">
        <h2>Who it is for</h2>
        <p>
          You have read your Kua, perhaps in the Compass, and you want to
          take it room by room. You want to know which wall the headboard
          belongs on, which way to face at the desk, where to sit at the
          table, and how your number reads against someone you share a
          home with. You want one book that answers all of it, keyed to
          your name and your number.
        </p>
      </section>

      <section className="product-section">
        <h2>What it adds beyond the Compass</h2>
        <ul>
          <li>
            <strong>A compatibility chapter.</strong> How the East and
            West groups relate, and what it means when two people in a
            home fall on the same side or different sides.
          </li>
          <li>
            <strong>A bedroom chapter, read for you.</strong> Which of
            your directions the tradition gives to the headboard in an
            ordinary season and in a season of push, and how to read the
            room from the door inward.
          </li>
          <li>
            <strong>A desk and work chapter, read for you.</strong> Which
            direction to face for ambitious work and which for steady
            focus, and how to turn the chair when the desk cannot move.
          </li>
          <li>
            <strong>A dining and shared-table chapter, read for you.</strong>{" "}
            Where the head of the household sits, and the seat the
            tradition gives to connection.
          </li>
          <li>
            <strong>A 2026 overlay.</strong> A plain look at how this
            solar year&apos;s cautious and supportive sectors fall against
            your directions, and where to read the year in full.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            Your full Kua profile: your number, your East or West group,
            and a personalised bagua chart with your supportive sectors
            highlighted.
          </li>
          <li>
            A one-page at-a-glance summary card you can flip back to
            without re-reading the book.
          </li>
          <li>
            Eight direction chapters, four supportive and four to handle
            with care, each read for your Kua.
          </li>
          <li>
            Five further chapters: compatibility, the bedroom, the desk,
            the dining table, and the 2026 overlay.
          </li>
          <li>
            A seven-day experiment to test a single change in your home.
          </li>
          <li>
            Roughly 34 to 46 typeset pages, designed in our brand and
            keyed to your name on the cover.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>You pay once. There is no subscription, no recurring fee.</li>
          <li>
            You fill in a short form: first name, birth date, gender. We
            compute your Kua server-side, applying the Chinese New Year
            cutoff if you were born in January or early February.
          </li>
          <li>
            Within about a minute, the PDF is generated and emailed to
            you with a download link. Reply to the delivery email any time
            for a fresh one.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is not a reading of your floor plan. The report reads your
          direction profile, the eight directions that follow from your
          Kua. It does not know where your bedroom door is, and it never
          asks. The tradition supplies the rules; you apply them to your
          own rooms. You stay the expert on your own home.
        </p>
        <p>
          It does not promise outcomes. What it offers is a structured way
          to choose between arrangements that otherwise look equivalent.
          That is what a decision tool is.
        </p>
      </section>

      <FulfillmentBlock slug="extended-personal-kua-report" />

      <section className="product-buy-section">
        <h2>Buy now.</h2>
        <p>
          Secure checkout. 7-day refund. You fill in a short form after paying and the PDF is emailed to you.
        </p>
        <BuyButton
          productSlug="extended-personal-kua-report"
          priceLabel="$39"
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
