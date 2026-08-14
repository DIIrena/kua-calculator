import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import BaziCalculatorForm from "@/components/BaziCalculatorForm";

export const metadata: Metadata = {
  title: "Free BaZi Calculator (Four Pillars) | My Feng Shui Home",
  description:
    "A free BaZi calculator and Four Pillars calculator: get your Day Master, your four pillars, your five-element balance, and your Ten Gods in seconds. No sign-up to try.",
  alternates: { canonical: "https://myfengshuihome.com/bazi-calculator" },
  openGraph: {
    type: "website",
    title: "Free BaZi Calculator (Four Pillars)",
    description:
      "Get your Day Master and your full four pillars in seconds - a portrait of how you are built, read the way the tradition reads it.",
    url: "https://myfengshuihome.com/bazi-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BaZi Calculator (Four Pillars)",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  url: "https://myfengshuihome.com/bazi-calculator",
  description:
    "Free BaZi / Four Pillars calculator. Computes your Day Master, four pillars, five-element balance, and Ten Gods from your birth date, time, and birthplace.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

// FAQ schema mirrors the visible FAQ section below, question for
// question (search layer, marketing-ux-plan 2026-08-14).
const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Is the BaZi calculator free?",
    a: "Yes. Sign in free (Google or an email link) and run it as often as you like. Your chart saves to your account so you can return to it any time.",
  },
  {
    q: "What do I need to get my chart?",
    a: "Your birth date, your birth city, and your birth time if you know it. The calculator handles the solar-term boundaries and local time for you.",
  },
  {
    q: "What if I do not know my birth time?",
    a: "You still get a real chart. The calculator reads the six characters of your year, month, and day, and your Day Master, the heart of the chart, is unaffected.",
  },
  {
    q: "What is a Day Master?",
    a: "The single character of your day of birth, the one the whole chart revolves around. The tradition reads it as a portrait of how you are built, and every other character is described by its relationship to it.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function BaziCalculatorPage() {
  const session = await auth();
  const signedIn = Boolean(session?.user?.id);

  return (
    <div className="page-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="product-hero">
        <p className="eyebrow">My Feng Shui Home</p>
        <h1 className="product-heading">
          Free BaZi Calculator <em>(Four Pillars)</em>
        </h1>
        <p className="product-lede">
          Tell me when and where you were born, and I will show you your chart: the eight characters the
          tradition treats as a little portrait of how you are built. At the heart of it is your{" "}
          <strong>Day Master</strong> - the one character that is really you. It takes a few seconds, and it is free.
        </p>
      </section>

      <section className="product-section">
        <h2>Get your chart</h2>
        <BaziCalculatorForm signedIn={signedIn} />
      </section>

      <section className="product-section">
        <h2>What you will see</h2>
        <ul>
          <li>Your <strong>Day Master</strong>, and a friendly line on what a person like you tends to be.</li>
          <li>Your full <strong>four pillars</strong>, colour-coded, with the Day Master marked.</li>
          <li>Your <strong>five-element balance</strong> - where you run strong, and where you run quiet.</li>
          <li>Your <strong>Ten Gods</strong>, and the pattern your chart leans toward.</li>
        </ul>
      </section>

      <section className="faq" aria-labelledby="bazi-faq-heading">
        <div className="faq-inner">
          <h2 id="bazi-faq-heading">Common questions</h2>
          {FAQS.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}</summary>
              <div className="faq-answer">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Interim offer stack (marketing-ux-plan 2026-08-14, Path C item 6).
          When the Personal BaZi Reading ships, its card replaces the
          BaZi Basics card here and the locked-chapter tease moves into
          the result flow. */}
      <section className="product-section" aria-label="After your chart">
        <h2>After your chart</h2>
        <div className="free-tools-grid">
          <Link href="/products/bazi-basics" className="tool-card">
            <h3>The Birth Code: Your BaZi Chart, $14</h3>
            <p>
              The friendly guide that teaches you to read the chart you are
              looking at: your Day Master, your Ten Gods, your lucky element,
              and your decades ahead, one gentle chapter at a time.
            </p>
            <span className="tool-card-cta">See the guide &rarr;</span>
          </Link>
          <Link
            href="/products/personal-feng-shui-compass"
            className="tool-card"
          >
            <h3>Your Personal Feng Shui Compass, $19</h3>
            <p>
              BaZi reads the person. Feng shui reads the place the person
              lives. The Compass turns your Kua into placements for your own
              rooms: the bed, the desk, the dining seat.
            </p>
            <span className="tool-card-cta">See the Compass &rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
