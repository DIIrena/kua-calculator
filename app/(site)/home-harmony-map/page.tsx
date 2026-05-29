import type { Metadata } from "next";
import Link from "next/link";
import { sendChecklist } from "@/app/actions/lead-magnet";

export const metadata: Metadata = {
  title: "The Personal Feng Shui Compass - personalised feng shui PDF | My Feng Shui Home",
  description:
    "A personalised PDF keyed to your Kua number: your East or West group, your four supportive directions, your four cautious directions, traditional placements, and a seven-day experiment. One-time $14. Launching soon.",
  alternates: { canonical: "https://myfengshuihome.com/home-harmony-map" },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "The Personal Feng Shui Compass",
  description:
    "A personalised feng shui PDF keyed to your Kua number. Your East or West group, your four supportive directions, your four cautious directions, traditional placements for the bed, desk, and dining seat, and a seven-day experiment.",
  brand: { "@type": "Brand", name: "My Feng Shui Home" },
  category: "Digital Download",
  offers: {
    "@type": "Offer",
    price: "14",
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
    url: "https://myfengshuihome.com/home-harmony-map",
  },
};

export default async function HomeHarmonyMapPage(props: {
  searchParams: Promise<{ checklist?: string }>;
}) {
  const { checklist: status } = await props.searchParams;

  return (
    <div className="sales-page">
      {/* ============================================================
          Hero - VALUE first, no price. Single primary CTA points at
          the early list (where the price IS visible). The reader
          opts in to learn more, NOT to buy unseen.
          ============================================================ */}
      <section className="sales-hero">
        <div className="page-content">
          <p className="eyebrow">A personalised feng shui guide, keyed to your Kua.</p>
          <h1 className="sales-hero-heading">
            Read your eight directions, keyed to <em>you</em>.
          </h1>
          <p className="sales-hero-lede">
            A printable, personalised PDF. It reads which four of your eight
            directions the tradition treats as supportive, which four it asks
            you to handle with more care, and the traditional placements that
            follow from your Kua.
          </p>
          <p className="sales-hero-lede">
            Built from the same source material that working practitioners
            charge hundreds of dollars to walk you through. Yours for a
            <strong> one-time, no-subscription</strong> price.
          </p>
          <div className="sales-hero-actions">
            <a href="#whats-inside" className="cta-primary">
              See what's inside
            </a>
            <a href="#early-list" className="home-hero-link">
              I'm in - get on the early list &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          Trust signals (early, pre-value). For a new product with
          no testimonials yet, lean on process credentials and the
          honest "what makes us different" line.
          ============================================================ */}
      <section className="sales-trust home-section home-section-cream">
        <div className="page-content">
          <ul className="sales-trust-list" role="list">
            <li>
              <strong>Twenty-two source chapters</strong>, audited for
              copyright firewall and zero-em-dash voice consistency.
            </li>
            <li>
              <strong>Classical + practical</strong>. Compass School at the
              core; the Western pragmatic layer named honestly.
            </li>
            <li>
              <strong>Honest framing every line.</strong> No outcome promises.
              Every claim labelled as testable, traditional, or preference.
            </li>
          </ul>
        </div>
      </section>

      {/* ============================================================
          Problem recognition - name the reader's pain in 2-3 sentences.
          ============================================================ */}
      <section className="home-section home-section-paper sales-problem">
        <div className="page-prose">
          <h2>Most feng shui advice is too vague to act on.</h2>
          <p>
            You search for "feng shui bedroom" and get the same recycled
            article on five different sites. You look up "wealth corner" and
            find half-a-dozen different answers. You ask a friend and get a
            shrug.
          </p>
          <p>
            What you want is the <strong>specific</strong> version. The one
            that takes your Kua number, reads your eight directions, and tells
            you which ones the tradition treats as supportive and where to put
            the bed, the desk, and the seat where you eat. The Personal Feng
            Shui Compass is that.
          </p>
        </div>
      </section>

      {/* ============================================================
          What you get - benefit-language bullets.
          ============================================================ */}
      <section
        className="home-section home-section-cream"
        id="whats-inside"
        aria-labelledby="whats-inside-heading"
      >
        <div className="page-content">
          <h2 id="whats-inside-heading">What you get.</h2>
          <p className="home-section-lede">
            One personalised PDF, keyed to your Kua number and your East or West
            group. It reads your direction profile, not your floor plan, so it
            travels with you to any home you live in.
          </p>
          <ul className="sales-benefits-list">
            <li>
              <h3>Your Kua profile and a bagua chart of your eight directions.</h3>
              <p>
                Your number, your East or West group, and a printed bagua chart
                of the eight directions, keyed to <em>you</em>. The page you put
                on the fridge so you stop looking it up.
              </p>
            </li>
            <li>
              <h3>Your four supportive directions, each read for your Kua.</h3>
              <p>
                Sheng Qi, Tian Yi, Yan Nian, and Fu Wei, named with the compass
                direction each one points to for your number. The four the
                tradition reads as working <em>with</em> you.
              </p>
            </li>
            <li>
              <h3>Your four cautious directions, framed honestly.</h3>
              <p>
                The four the tradition asks you to handle with more care, framed
                as lower-priority placements, not curses. Each one with a quiet,
                useful job: storage, the hallway, the bathroom.
              </p>
            </li>
            <li>
              <h3>Traditional placements for the bed, the desk, and the dining seat.</h3>
              <p>
                Where the tradition points each one for your directions. Which
                way to face the bed, where to sit to do focused work, and the
                seat that supports a shared meal.
              </p>
            </li>
            <li>
              <h3>A seven-day experiment.</h3>
              <p>
                One move to try, then leave for a week and notice, without
                forcing the question, whether anything feels different. If it
                does, keep it. If it does not, you have lost only the minutes it
                took to move a chair.
              </p>
            </li>
            <li>
              <h3>Honest framing on every page.</h3>
              <p>
                Personalised to your direction profile from your Kua, not to
                your home layout. It hands you the compass; you stay the expert
                on your own rooms. No outcome promises, ever.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ============================================================
          How it works - 3 steps to reduce perceived complexity.
          ============================================================ */}
      <section className="home-section home-section-paper sales-how">
        <div className="page-content">
          <h2>How it works.</h2>
          <p className="home-section-lede">
            Three steps. The whole process takes about five minutes.
          </p>
          <ol className="sales-how-list">
            <li>
              <h3>You enter your birth date and gender.</h3>
              <p>
                A short form. We calculate your Kua number and your East or West
                group from it. About sixty seconds.
              </p>
            </li>
            <li>
              <h3>We generate your personalised PDF.</h3>
              <p>
                Keyed to your Kua and your eight directions, delivered to your
                inbox. Branded, printable, yours to keep.
              </p>
            </li>
            <li>
              <h3>You print it. You walk your home with it.</h3>
              <p>
                The Compass is a working tool, not a coffee-table book. The
                point is to mark it up and use it.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ============================================================
          What it is NOT - honest framing handling objections.
          ============================================================ */}
      <section className="home-section home-section-cream sales-not">
        <div className="page-content">
          <h2>What it is not.</h2>
          <ul className="sales-not-list">
            <li>
              <strong>Not</strong> a subscription. You pay once. You own the
              file.
            </li>
            <li>
              <strong>Not</strong> a fortune. We do not tell you what is going
              to happen. We tell you which directions the tradition treats as
              supportive, and you decide what to do with that.
            </li>
            <li>
              <strong>Not</strong> a hundred-page ebook. It is a <em>working
              compass</em>. You print it, mark it up, test one move.
            </li>
            <li>
              <strong>Not</strong> keyed to your floor plan. It is personalised
              to your <em>direction profile</em> from your Kua, so it does not
              know your layout. You stay the expert on your own rooms. Two
              different people get two different readings.
            </li>
          </ul>
        </div>
      </section>

      {/* ============================================================
          Objection FAQ.
          ============================================================ */}
      <section className="home-section home-section-paper sales-faq">
        <div className="page-prose">
          <h2>Questions before you join.</h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>What if I don't like it?</summary>
              <div className="faq-answer">
                <p>
                  Email us within thirty days and we delete the order, refund
                  the $14, and remove you from the list. No questions, no
                  forms.
                </p>
              </div>
            </details>
            <details className="faq-item">
              <summary>Do I need to know my Kua number first?</summary>
              <div className="faq-answer">
                <p>
                  No. The intake form asks for your birth date and gender,
                  and we calculate the Kua for you. (The <Link href="/kua-calculator">free calculator</Link> uses the same logic if you want to see your number first.)
                </p>
              </div>
            </details>
            <details className="faq-item">
              <summary>Will it work for a rented flat?</summary>
              <div className="faq-answer">
                <p>
                  Yes. The Compass reads your directions, not your lease. The
                  placements are furniture-free: which way to face the bed, the
                  desk, the seat where you eat. Renters get the same reading as
                  owners.
                </p>
              </div>
            </details>
            <details className="faq-item">
              <summary>Will it work for a small apartment?</summary>
              <div className="faq-answer">
                <p>
                  Yes. Your eight directions are the same in any home you live
                  in. The Compass reads them from your Kua, so the reading
                  travels with you whatever the size or shape of the place.
                </p>
              </div>
            </details>
            <details className="faq-item">
              <summary>Is this fortune-telling?</summary>
              <div className="faq-answer">
                <p>
                  No. Feng shui is a structured design tradition. We tell you
                  which moves the evidence supports, which moves are
                  traditional, and which are preference. We never promise an
                  outcome.
                </p>
              </div>
            </details>
            <details className="faq-item">
              <summary>How long until I see something?</summary>
              <div className="faq-answer">
                <p>
                  The Compass asks for a seven-day experiment: make one move,
                  leave it for a week, and notice without forcing the question.
                  Some changes settle quickly; some are slower. The honest
                  framing on every page tells you which is which.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ============================================================
          Price + final CTA. Price appears HERE - after value, social
          proof, problem recognition, benefits, how it works, what it
          is not, and objection handling. By the time the reader sees
          $14, they have already mentally owned the value.
          ============================================================ */}
      <section
        className="home-section home-section-cream sales-price-section"
        id="price"
        aria-labelledby="price-heading"
      >
        <div className="page-content">
          <div className="sales-price-block">
            <p className="eyebrow">The Personal Feng Shui Compass</p>
            <h2 id="price-heading" className="sales-price-heading">
              One-time, fourteen dollars.
            </h2>
            <p className="sales-price-amount">$14</p>
            <p className="sales-price-suffix">
              No subscription. Yours to keep. Thirty-day refund.
            </p>
            <a href="#early-list" className="cta-primary sales-price-cta">
              Join the early list
            </a>
            <p className="sales-price-note">
              The Compass launches soon. Early-list members get the heads-up the
              day it goes live, plus the <strong>14-point room harmony
              checklist</strong> in their inbox tonight.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          Risk reversal - explicit. Removes the final objection.
          ============================================================ */}
      <section className="home-section home-section-paper sales-reversal">
        <div className="page-prose">
          <h2>The thirty-day guarantee, no fine print.</h2>
          <p>
            If the Compass does not earn its keep in your home in the first
            month, email us. We refund the $14, delete the order, and remove
            you from the list. We do not ask why. We do not send a
            cancellation survey. We do not put you in a marketing funnel.
          </p>
          <p>
            We can do this because the Compass is good. If we ever start getting
            a lot of refund requests, that is the universe telling us to make
            it better.
          </p>
        </div>
      </section>

      {/* ============================================================
          Early-list capture. This is the actual conversion moment in
          Stage 4 (Stripe is Stage 5). Reuses sendChecklist so the
          visitor gets the checklist email immediately - real value
          delivered, list captured.
          ============================================================ */}
      <section
        className="home-section home-section-cream sales-early"
        id="early-list"
        aria-labelledby="early-list-heading"
      >
        <div className="page-prose">
          <h2 id="early-list-heading">Join the early list.</h2>
          <p>
            Drop your email. We send <strong>one email</strong> with the
            14-point room harmony checklist (PDF link, printable, free) and
            <strong> one more email</strong> when the Compass goes live. That is
            two emails total. No marketing list. No upsells.
          </p>

          {status === "sent" ? (
            <p
              className="lead-magnet-status lead-magnet-status-ok"
              role="status"
            >
              You are on the list. We sent the checklist; check your inbox
              in a minute.
            </p>
          ) : status === "invalid" ? (
            <p
              className="lead-magnet-status lead-magnet-status-err"
              role="alert"
            >
              That does not look like a valid email. Try again?
            </p>
          ) : status === "error" ? (
            <p
              className="lead-magnet-status lead-magnet-status-err"
              role="alert"
            >
              We could not send the email right now. Please try again in a
              minute.
            </p>
          ) : null}

          <form action={sendChecklist} className="lead-magnet-form">
            <label className="lead-magnet-label" htmlFor="early-list-email">
              Your email
            </label>
            <div className="lead-magnet-row">
              <input
                id="early-list-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="lead-magnet-input"
              />
              <button type="submit" className="cta-primary lead-magnet-submit">
                Join the early list
              </button>
            </div>
          </form>

          <p className="sales-back">
            <Link href="/" className="article-back-link">
              &larr; Back to the homepage
            </Link>
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </div>
  );
}
