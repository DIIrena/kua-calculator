import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";
import FlagshipChooser from "@/components/FlagshipChooser";

export const metadata: Metadata = {
  title:
    "Personal Feng Shui Compass | A personalised PDF reading your Kua",
  description:
    "A personalised PDF of roughly 50 typeset pages reading your Kua number, your East or West group, your four supportive directions, and your four to handle with care. With diagrams, real-home examples, and printable worksheets. No outcome promises.",
  alternates: {
    canonical:
      "https://myfengshuihome.com/products/personal-feng-shui-compass",
  },
  openGraph: {
    type: "website",
    title: "Personal Feng Shui Compass",
    description:
      "A personalised PDF reading your Kua and your eight directions. $14.",
    url: "https://myfengshuihome.com/products/personal-feng-shui-compass",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/personal-feng-shui-compass",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function PersonalFengShuiCompassPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return (
    <div className="page-content product-page">
      {/* Opening - storytelling voice */}
      <section className="product-hero">
        <p className="eyebrow">My Feng Shui Home</p>
        <h1 className="product-heading">
          The <em>Personal Feng Shui Compass</em>.
        </h1>
        <p className="product-lede">
          Pick an ordinary morning. The kettle is beginning to sound,
          the light has reached one familiar surface, and for no
          dramatic reason the room feels easy to be in. Then think of
          another morning in the same home, when the chair, the bed,
          or the angle of your body felt slightly wrong. The Personal
          Feng Shui Compass is a small printable book that reads your
          Kua number and tells you which directions in your home
          traditionally support you, and which the tradition asks you
          to handle with care. It is the foundation product we built
          first because it is the one you will use longest.
        </p>
        <p className="product-hero-launch-state">
          Checkout is open. You pay once, fill in three fields, and the
          personalised PDF is generated and emailed to you within about a
          minute.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to checkout →</a>
        </p>
      </section>

      {/* Practical sections - practitioner voice */}
      <ProductPreview slug="personal-feng-shui-compass" title="Personal Feng Shui Compass" />

      <section className="product-section">
        <h2>Who it is for</h2>
        <p>
          You are someone who ran the free Kua calculator, found the
          result interesting, and would like the deeper reading. You
          want to know what each of your eight personal directions
          actually means for the bed, the desk, the dining seat, the
          chair you read in. You want something you can read, test,
          and finish in one weekend.
        </p>
      </section>

      <section className="product-section">
        <h2>What it helps with</h2>
        <ul>
          <li>
            Choosing which wall the headboard should sit against, in
            an ordinary season and in a season of push.
          </li>
          <li>
            Choosing which direction to face at the desk, the dining
            seat, and the chair where the long conversations happen.
          </li>
          <li>
            Knowing which corners of your home the tradition would
            give to storage, the bathroom, or the laundry, and why.
          </li>
          <li>
            Testing a single change for a week to see whether it
            actually helps in your home.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>What is inside</h2>
        <ul>
          <li>
            Your Kua profile - your number, your East or West group,
            and a personalised bagua chart with your four supportive
            sectors highlighted.
          </li>
          <li>
            A one-page printable <em>at-a-glance</em> card: your whole
            reading on a single sheet, built to be pinned.
          </li>
          <li>
            A <em>your Kua element</em> chapter: the colours, materials,
            and dressing customs the tradition attaches to your own
            element, and where to spend them on your favourable walls.
          </li>
          <li>
            A <em>before the compass</em> chapter with the five form
            checks the reference books always pair with direction work:
            the command position, solid backing for the bed, mirrors,
            sharp edges, and beams.
          </li>
          <li>
            A <em>find your eight directions</em> chapter: a
            twenty-minute phone-compass walkthrough with a worked
            floor-plan example, ending in a Room Map worksheet
            pre-filled with your own directions.
          </li>
          <li>
            Eight direction chapters, each read for your Kua, each with
            a compass diagram showing where it falls for you, concrete
            do-this and avoid-this lists, a practitioner tip, and a
            real home worked through - plus the traditional recipe for
            activating your own relationship corner.
          </li>
          <li>
            Bed and desk placement diagrams that settle the two rules
            people mix up: where the head points, and where the body
            faces.
          </li>
          <li>
            A <em>hard cases</em> chapter: a partner in the opposite
            group, studios, the bed that cannot move, renting, and
            open-plan homes.
          </li>
          <li>
            The seven-day experiment with a printable log page, so your
            first change gets an honest verdict.
          </li>
          <li>
            Roughly 50 typeset pages, designed in our brand and keyed
            to your name on the cover.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <ol>
          <li>
            You pay once. There is no subscription, no recurring fee.
          </li>
          <li>
            You fill in a short form: first name, birth date, gender.
            We compute your Kua server-side (and apply the Chinese New
            Year cutoff if you were born in January or early February).
          </li>
          <li>
            Within about a minute, the PDF is generated and emailed to
            you with a download link. Reply to the delivery email any
            time for a fresh one.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>What it is not</h2>
        <p>
          It is not a personalised reading of your floor plan. The
          Compass reads your <em>direction profile</em> - the eight
          directions that follow from your Kua. It does not know which
          wall your bedroom door is on, and it never asks. The
          tradition supplies the rules; you apply them to your own
          room. You stay the expert on your own home.
        </p>
        <p>
          It does not promise outcomes. The tradition does not, and
          neither will we. What it offers is a structured way to
          choose between arrangements that otherwise look equivalent.
          That is what a decision tool is.
        </p>
      </section>

      <FlagshipChooser current="compass" />

      {/* Closing - buy */}
      <FulfillmentBlock slug="personal-feng-shui-compass" />

      <section className="product-buy-section">
        <h2>Buy the Compass.</h2>
        <p>
          $14, one-time. After paying you fill in three fields and the
          PDF is generated and emailed to you within about a minute.
        </p>
        <BuyButton
          productSlug="personal-feng-shui-compass"
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
