import type { Metadata } from "next";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FloatingWaitlistCTA from "@/components/FloatingWaitlistCTA";

export const metadata: Metadata = {
  title:
    "Personal Feng Shui Compass | A personalised PDF reading your Kua",
  description:
    "A personalised, 25-30 page PDF reading your Kua number, your East or West group, your four supportive directions, and your four to handle with care. No outcome promises.",
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
          The Compass file is finished. Checkout is not live yet; join
          the waitlist and we email you the moment it opens.
        </p>
        <p className="product-hero-anchor">
          <a href="#waitlist">Skip to the waitlist →</a>
        </p>
      </section>

      {/* Practical sections - practitioner voice */}
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
            A short orientation explainer (how to read a direction for
            sleeping, for sitting, and for a door).
          </li>
          <li>
            One-page <em>at-a-glance</em> summary card you can flip
            back to without re-reading the whole book.
          </li>
          <li>
            Four chapters for your four supportive directions (Sheng
            Qi, Tian Yi, Yan Nian, Fu Wei), each read for your Kua.
          </li>
          <li>
            Four shorter chapters for your four cautious directions,
            framed as lower-priority placements, not curses.
          </li>
          <li>
            A seven-day experiment to test a single change in your
            home.
          </li>
          <li>
            Roughly 25 to 30 typeset pages, designed in our brand and
            keyed to your name on the cover.
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
            you. A copy stays on your account dashboard so you can
            re-download it any time.
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

      {/* Closing - storytelling + waitlist CTA */}
      <section className="product-buy-section">
        <h2>Join the waitlist.</h2>
        <p>
          The Compass is finished. The checkout is not. When checkout
          goes live, we email you the launch page and the early price.
          You can unsubscribe any time.
        </p>
        <BuyButton
          productSlug="personal-feng-shui-compass"
          priceLabel="$14"
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

      <FloatingWaitlistCTA />
    </div>
  );
}
