import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BuyButton from "@/components/BuyButton";
import FloatingWaitlistCTA from "@/components/FloatingWaitlistCTA";
import PlannerSourceTracker from "@/components/PlannerSourceTracker";

export const metadata: Metadata = {
  title:
    "2026 Annual Feng Shui Planner | The year in one printable book",
  description:
    "98 pages, 16 sections, a 245-day calendar, sector-by-sector treatments, and the 2026 annual chart explained. One printable book for the Chinese solar year.",
  alternates: {
    canonical:
      "https://myfengshuihome.com/products/annual-feng-shui-planner-2026",
  },
  openGraph: {
    type: "website",
    title: "2026 Annual Feng Shui Planner",
    description:
      "98 pages, 16 sections, a 245-day calendar, sector-by-sector treatments, and the 2026 annual chart explained.",
    url: "https://myfengshuihome.com/products/annual-feng-shui-planner-2026",
    images: [
      "https://myfengshuihome.com/products/annual-feng-shui-planner-2026/cover-thumb.png",
    ],
  },
};

type SearchParams = Promise<{ waitlist?: string; from?: string }>;

// Referrers we want to measure on the planner page. A visitor arriving
// with one of these in ?from records a planner_source_visit event. The
// allowlist keeps arbitrary query values out of the analytics stream.
const KNOWN_SOURCES = ["kua-calculator"];

const PLANNER_FAQ: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Do I need to know feng shui to use the Planner?",
    a: "No. The book explains what it needs as it goes. Every sector treatment carries a one-line definition before it asks you to do anything, and the back of the book has a glossary for the five or six terms that come up most.",
  },
  {
    q: "How is this different from the Personal Feng Shui Compass?",
    a: "The Planner reads the year for any home. The Compass reads you specifically, with your Kua number and your eight personal directions. Different jobs. They sit together on a shelf and answer different questions.",
  },
  {
    q: "Why does the calendar start on 1 June 2026, not 1 January?",
    a: "Because the 2026 Chinese solar year is what the Planner reads, and that year is already underway. The 245-day calendar covers the rest of it, from 1 June 2026 through 31 January 2027. The 2027 edition picks up from there.",
  },
  {
    q: "Will the same Planner work for everyone in my household?",
    a: "Yes. The 2026 annual chart is the same chart for every home in the same hemisphere. Personal directions are the layer that varies by person, and those live in the Personal Feng Shui Compass, which is a separate product.",
  },
  {
    q: "What happens after I join the waitlist?",
    a: "A warm confirmation lands in your inbox now. About a week later, a short note with one sample page so you can see the voice for yourself. When checkout opens we email you the launch page and the early price. You can unsubscribe at any point.",
  },
  {
    q: "When will the Planner actually ship?",
    a: "We are waiting on the business bank account to clear so live payments can be wired up. As soon as that lands and the file pass is finished, we ship. We will not promise a date we are not sure of.",
  },
  {
    q: "Is the Planner refundable?",
    a: "Yes. When checkout opens, every purchase carries a 30-day refund, no questions asked. That includes the Planner.",
  },
  {
    q: "Will there be a 2027 edition?",
    a: "Yes. The 2027 edition ships in January 2027 as a full twelve-month book. As a 2026 buyer you receive a 30 percent renewal offer when it goes live.",
  },
  {
    q: "Why do the 5 Yellow and the 2 Black stars get so much attention?",
    a: "Because in 2026 the 5 Yellow visits the south and the 2 Black sits in the northwest, and both are the cautious stars the tradition pays most attention to. The Planner names where they land, the single metal cure each one asks for, and the rooms that are most affected.",
  },
  {
    q: "Can I buy the book without a US address?",
    a: "The Planner is a digital purchase, sold from anywhere to anywhere. Once live checkout is wired, most readers with an international payment card should be able to buy. We will confirm the checkout details at launch.",
  },
];

export default async function PlannerPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist, from } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;
  const plannerSource = from && KNOWN_SOURCES.includes(from) ? from : null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PLANNER_FAQ.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    })),
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "2026 Annual Feng Shui Planner",
    description:
      "A 98-page printable planner for the 2026 Chinese solar year: the annual chart explained, nine sector treatments, monthly notes, a 245-day calendar, and a ten-step diagnostic walkthrough.",
    image: [
      "https://myfengshuihome.com/products/annual-feng-shui-planner-2026/cover-portrait.png",
    ],
    brand: { "@type": "Brand", name: "My Feng Shui Home" },
    offers: {
      "@type": "Offer",
      url: "https://myfengshuihome.com/products/annual-feng-shui-planner-2026",
      priceCurrency: "USD",
      price: "29",
      availability: "https://schema.org/PreOrder",
      priceValidUntil: "2027-01-31",
      seller: { "@type": "Organization", name: "My Feng Shui Home" },
    },
  };

  return (
    <div className="page-content product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {plannerSource ? <PlannerSourceTracker source={plannerSource} /> : null}
      <section className="product-hero">
        <p className="eyebrow">My Feng Shui Home</p>
        <h1 className="product-heading">
          The <em>2026 Annual Feng Shui Planner</em>.
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.75rem",
            alignItems: "flex-start",
          }}
        >
          <Image
            src="/products/annual-feng-shui-planner-2026/cover-portrait.png"
            alt="The 2026 Annual Feng Shui Planner, front cover."
            width={1024}
            height={1536}
            priority
            style={{
              width: "260px",
              maxWidth: "100%",
              height: "auto",
              borderRadius: "6px",
              border: "1px solid #e2dac5",
              boxShadow: "0 6px 24px rgba(42, 39, 30, 0.12)",
              flex: "0 0 auto",
            }}
          />
          <div style={{ flex: "1 1 320px" }}>
            <p className="product-lede">
              Pick a quiet morning in early February. The kettle is doing
              the small steaming thing it does. You sit at the kitchen
              table with a cup in your hands and you realise the year
              has begun and you do not quite know where in the house to
              start. Which corner asks for a gentle hand. Which corner
              is ready to do real work. Which weekends are the wrong
              ones for a renovation. Which day is the right one to sign
              something that matters.
            </p>
            <p className="product-lede" style={{ marginTop: "0.9rem" }}>
              The Planner answers those four questions for the whole of
              the 2026 Chinese solar year, in a calm voice, in 98
              printable pages. One book. One year. One shelf.
            </p>
            <p className="product-hero-anchor" style={{ marginTop: "1.1rem" }}>
              <a href="#waitlist">Skip to the waitlist →</a>
            </p>
          </div>
        </div>
      </section>

      <section className="product-section" aria-label="Look inside the book">
        <h2>Look inside.</h2>
        <p>
          Three pages from the working draft, to show you the voice and
          the shape of the book before you decide.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.25rem",
            marginTop: "1.25rem",
          }}
        >
          <figure style={{ margin: 0 }}>
            <Image
              src="/products/annual-feng-shui-planner-2026/sample-page-cover.png"
              alt="The Planner cover page."
              width={935}
              height={1320}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "4px",
                border: "1px solid #e2dac5",
                display: "block",
              }}
            />
            <figcaption
              style={{
                fontSize: "0.85rem",
                color: "#4f5b53",
                marginTop: "0.5rem",
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              <strong>The cover.</strong> The frame the year sits in.
            </figcaption>
          </figure>
          <figure style={{ margin: 0 }}>
            <Image
              src="/products/annual-feng-shui-planner-2026/sample-page-treatment.png"
              alt="A sector treatment page showing the six-box structure: what this means, do this, avoid this, practitioner tip, real home example, if you only do one thing."
              width={935}
              height={1320}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "4px",
                border: "1px solid #e2dac5",
                display: "block",
              }}
            />
            <figcaption
              style={{
                fontSize: "0.85rem",
                color: "#4f5b53",
                marginTop: "0.5rem",
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              <strong>A sector treatment.</strong> The six-box layout
              every practical page uses.
            </figcaption>
          </figure>
          <figure style={{ margin: 0 }}>
            <Image
              src="/products/annual-feng-shui-planner-2026/sample-page-calendar.png"
              alt="A day from the 245-day calendar with its symbol and one-line reason."
              width={935}
              height={1320}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "4px",
                border: "1px solid #e2dac5",
                display: "block",
              }}
            />
            <figcaption
              style={{
                fontSize: "0.85rem",
                color: "#4f5b53",
                marginTop: "0.5rem",
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              <strong>A day in the calendar.</strong> One symbol, one
              short reason.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="product-section">
        <h2>What you get</h2>
        <p>
          A 98-page printable book. Sixteen sections read in roughly
          the order a practitioner walks a home: the shape of the
          year, the cautious corners, the bright ones, months, days,
          your actual rooms, then the cures and the reference layer at
          the back.
        </p>
        <ul>
          <li>
            <strong>The 2026 annual chart, plotted and explained.</strong>{" "}
            Where every star sits this year and what that means for the
            nine sectors of your home.
          </li>
          <li>
            <strong>The 5 Yellow and the 2 Black.</strong> The year&apos;s
            two cautious stars, where they land in 2026 (south and
            northwest), and the single metal cure each one asks for.
          </li>
          <li>
            <strong>Three Killings, Tai Sui, and Sui Po for 2026.</strong>{" "}
            The three directions to leave undisturbed, named and mapped,
            with the practical &quot;what to leave alone&quot; guidance.
          </li>
          <li>
            <strong>A Period 9 refresher.</strong> A short chapter on
            the wider weather pattern (2024 to 2043) so the 2026 chart
            sits inside the bigger picture.
          </li>
          <li>
            <strong>Nine sector treatments.</strong> One for each
            compass corner of your home, all using the same six-box
            structure: what this means, do this, avoid this, a
            practitioner tip, a real home example, and if you only do
            one thing.
          </li>
          <li>
            <strong>Monthly star notes.</strong> Twelve short chapters
            covering which sectors tip into a heavier mood each month.
          </li>
          <li>
            <strong>A 245-day calendar.</strong> Every day from 1 June
            2026 through 31 January 2027, classified into one of four
            categories: good for action, good for rest and planning,
            neutral, or caution.
          </li>
          <li>
            <strong>A ten-step annual diagnostic walkthrough.</strong>{" "}
            The practitioner method for bringing the year&apos;s chart
            into your actual rooms, with a compass and a floor plan.
          </li>
          <li>
            <strong>A worked example.</strong> A fictional reader called
            Pavel and his flat, so you see the walkthrough done before
            you do your own.
          </li>
          <li>
            <strong>A cures quick-reference, a glossary, and a
            preparation note.</strong> The reference layer at the back
            of the book.
          </li>
          <li>
            <strong>The 2026 Home Action Summary.</strong> A closing
            single-page resume of the year&apos;s eight most important
            moves, designed to live on a kitchen counter.
          </li>
        </ul>
      </section>

      <section className="product-section">
        <h2>What is inside, in more detail</h2>
        <p>
          Every practical chapter uses the same six-box structure so
          you always know where the action item lives. <em>What this
          means</em> sets the small frame. <em>Do this</em> and{" "}
          <em>Avoid this</em> are bulleted moves in the imperative.{" "}
          <em>Practitioner tip</em> is the thing experience teaches.{" "}
          <em>Real home example</em> is a specific reader and a
          specific flat. <em>If you only do one thing</em> is one
          sentence at the end of every section. You can stop reading at
          that line and still have value.
        </p>
        <p>
          Two findings from the 2026 chart are worth flagging up
          front. The south carries a double affliction this year: the 5
          Yellow visits the wider south, and Tai Sui (the year&apos;s
          guardian) sits in the middle slice. The Planner treats the
          south as the strict no-renovation corner for the whole solar
          year and walks you through the small cure that covers both.
          The September month (M8 Rooster, 7 September to 7 October)
          carries the heaviest editorial weight; the Planner splits the
          month into two halves and tells you how to read the seam.
        </p>
        <p>
          The 245-day calendar is the part you will use most. Each day
          carries one of four symbols (a green tick, a circle, a dot,
          or a cross) and a one-line reason. Glance at the symbol on
          the morning of a signing, a launch, a move-in, or a meeting
          that matters. The calendar is a filter, not an oracle.
        </p>
      </section>

      <section className="product-section">
        <h2>How it works</h2>
        <p>
          The Planner is on a waitlist while we finish the checkout
          system. We are waiting on the business bank account to clear
          so live payments can be wired up. You can unsubscribe at any
          point, and we will not share your address.
        </p>
        <ol>
          <li>
            <strong>Join the waitlist.</strong> A warm confirmation
            lands in your inbox with what to expect from here.
          </li>
          <li>
            <strong>Roughly a week later,</strong> a short follow-up
            note with one sample page so you can see the voice and the
            structure for yourself.
          </li>
          <li>
            <strong>When checkout goes live,</strong> we email you the
            launch page and the early price. The Planner is the same
            for every buyer (the 2026 chart is the same chart), so
            there is no birth-data form for this one.
          </li>
          <li>
            <strong>The 2027 edition</strong> ships in January 2027 as
            a full twelve-month book. As a 2026 buyer you receive a 30
            percent renewal offer.
          </li>
        </ol>
      </section>

      <section className="product-section">
        <h2>Who it is for</h2>
        <p>
          You like to plan a year on paper. You want to know which
          sector of your home the 2026 stars treat gently and which
          they ask you to be careful with. You want a calm reference
          you can keep on a desk and open when a question comes up.
          You do not need to know any feng shui to use the book; the
          Planner explains what it needs as it goes.
        </p>
        <h2 style={{ marginTop: "1.5rem" }}>Who it is not for</h2>
        <p>
          You want a horoscope or a prediction of how your year will
          go. You want hourly date selection or a personal natal-chart
          reading. You want a quick mystical product without method or
          attribution. None of those are what this Planner is. It is
          a structured way to decide what to do in the rooms you are
          standing in, sector by sector, month by month, day by day.
        </p>
      </section>

      <section className="product-section">
        <h2>Honest framing</h2>
        <p>
          Feng shui does not promise outcomes. The Planner does not
          predict your year and it will not tell you what will happen.
          What it does is shape conditions: the small moves the
          tradition has long associated with each sector for this
          particular chart, written so you can act on them without
          having to learn the system first. The year is not the book.
          The year is what you do with it.
        </p>
      </section>

      <section className="product-section product-faq" aria-label="Frequently asked questions">
        <h2>Common questions</h2>
        {PLANNER_FAQ.map((qa) => (
          <details key={qa.q} className="product-faq-item">
            <summary>{qa.q}</summary>
            <div className="product-faq-answer">{qa.a}</div>
          </details>
        ))}
      </section>

      <section className="product-buy-section">
        <h2>Join the waitlist.</h2>
        <p>
          The Planner is in the final stages of being put together.
          When checkout goes live, we email you the launch page and
          the early price. You can unsubscribe any time.
        </p>
        <BuyButton
          productSlug="annual-feng-shui-planner-2026"
          priceLabel="$29"
          state="waitlist"
          waitlistStatus={status}
          waitlistNote="You receive a confirmation now, one sample-page note about a week later, and a launch email when checkout opens. You can unsubscribe any time."
        />
      </section>

      <section className="product-section">
        <h2>A different job from the Compass</h2>
        <p>
          The Planner reads the year for any home. If you also want
          your personal directions, the eight compass bearings the
          tradition associates with you specifically, that is what the{" "}
          <Link href="/products/personal-feng-shui-compass">
            Personal Feng Shui Compass
          </Link>{" "}
          covers. The Planner reads the year. The Compass reads you.
          They are different jobs and they sit together neatly on a
          shelf.
        </p>
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
