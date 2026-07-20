import Link from "next/link";
import BuyButton, { type BuyButtonState } from "@/components/BuyButton";
import FulfillmentBlock from "@/components/FulfillmentBlock";
import ProductPreview from "@/components/ProductPreview";
import FlagshipChooser, { type Flagship } from "@/components/FlagshipChooser";
import { autolinkProducts } from "@/components/autolinkProducts";
import { TrustRow, GuaranteeNote } from "@/components/TrustRow";
import SocialProof from "@/components/SocialProof";
import {
  testimonialsForProduct,
  averageRating,
  ratedCount,
} from "@/lib/testimonials";

// The long-form landing template (shop-redesign Phase B). One component,
// one content config per product, so copy revisions land everywhere at
// once. Section order follows the approved direct-response arc:
// hero -> what you receive -> promise -> look inside -> how it works ->
// what's inside -> who it's for / not for -> FAQ -> final CTA.
// Rules: one Buy action (three CTAs, one form at #buy), price visible at
// every CTA, no urgency, no fabricated testimonials.
// 2026-07-20 conversion review (W1+W2): the real 7-day guarantee and a
// four-item reassurance strip are now surfaced at the point of decision.
// The earlier "no refund pointers" rule was the review's headline mistake.

export type LandingConfig = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  /** One felt-outcome line (W4): what the reader will be able to DO after
   *  buying, stated concretely and honestly. Leads the hero with the
   *  "after" instead of the methodology. No outcome promises. */
  heroPromise?: string;
  priceLabel: string;
  /** Portrait cover path; omit for products without one. */
  cover?: string;
  /** 2-3 promise paragraphs (the problem the product reads). */
  promise: string[];
  /** The three how-it-works steps. */
  steps: { title: string; body: string }[];
  /** What's inside bullets. */
  inside: string[];
  forWho: string[];
  notForWho: string[];
  faq: { q: string; a: string }[];
  /** Line under the final buy block (delivery/format restated). */
  finalNote: string;
  /** Copy for the buy section lede. */
  buyLine: string;
  /** Render the ladder cross-sell with this item current. */
  ladder?: Flagship;
  /** P6 (2026-07-20): optional value-anchor comparison. Rendered as a
   *  compact tier table between the promise and the steps. Only the
   *  flagship uses it today. `rows` maps a feature line to which tiers
   *  include it; `anchorLine` is the one-sentence value math. */
  comparison?: {
    tiers: { label: string; price: string; current?: boolean }[];
    rows: { feature: string; included: boolean[] }[];
    anchorLine: string;
  };
  /** Schema.org Product description. */
  seoDescription: string;
  priceCents: number;
};

export default function ProductLanding({
  config,
  waitlistStatus = null,
  buyState = "stripe-live",
}: {
  config: LandingConfig;
  waitlistStatus?: "sent" | "invalid" | "error" | null;
  buyState?: BuyButtonState;
}) {
  const c = config;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    })),
  };
  // Ratings schema is emitted ONLY from real, rated reviews. When none exist
  // the aggregateRating/review fields are omitted entirely, so Google never
  // sees a fabricated star snippet.
  const productReviews = testimonialsForProduct(c.slug);
  const avgRating = averageRating(productReviews);
  const nRated = ratedCount(productReviews);
  const ratingFields =
    avgRating !== null && nRated > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avgRating.toFixed(1),
            reviewCount: String(nRated),
            bestRating: "5",
            worstRating: "1",
          },
          review: productReviews
            .filter((t) => typeof t.rating === "number")
            .map((t) => ({
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: String(t.rating),
                bestRating: "5",
              },
              author: { "@type": "Person", name: t.attribution },
              reviewBody: t.quote,
            })),
        }
      : {};
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: c.title,
    description: c.seoDescription,
    offers: {
      "@type": "Offer",
      price: (c.priceCents / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://myfengshuihome.com/products/${c.slug}`,
    },
    ...ratingFields,
  };

  return (
    <div className="page-content product-landing">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* 1. Hero */}
      <section className="landing-hero" aria-labelledby="landing-h1">
        <div className="landing-hero-text">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 id="landing-h1">{c.headline}</h1>
          <p className="landing-subhead">
            {autolinkProducts(c.subhead, c.slug)}
          </p>
          {c.heroPromise ? (
            <p className="landing-hero-promise">{c.heroPromise}</p>
          ) : null}
          <p className="landing-hero-cta">
            <a href="#buy" className="cta-primary cta-buy">
              Get it, {c.priceLabel}
            </a>
            <span className="landing-cta-note">
              One-time. Emailed within about a minute.
            </span>
          </p>
          <TrustRow className="landing-hero-trust" />
        </div>
        {c.cover ? (
          <div className="landing-hero-cover">
            <img
              src={c.cover}
              alt={`${c.title} cover`}
              width={1024}
              height={1536}
              loading="eager"
            />
          </div>
        ) : null}
      </section>

      {/* 2. What you receive */}
      <FulfillmentBlock slug={c.slug} />

      {/* 3. The promise narrative */}
      <section className="product-section landing-promise" aria-label="Why this exists">
        {c.promise.map((p) => (
          <p key={p.slice(0, 24)}>{autolinkProducts(p, c.slug)}</p>
        ))}
      </section>

      {/* 4. Look inside */}
      <ProductPreview slug={c.slug} title={c.title} />

      {/* 4b. Value anchor (P6): the tier comparison, flagship only */}
      {c.comparison ? (
        <section
          className="product-section landing-comparison"
          aria-labelledby="comparison-h"
        >
          <h2 id="comparison-h">Which depth is yours?</h2>
          <div className="landing-comparison-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">Feature</span>
                  </th>
                  {c.comparison.tiers.map((t) => (
                    <th
                      scope="col"
                      key={t.label}
                      className={t.current ? "comparison-current" : ""}
                    >
                      {t.label}
                      <span className="comparison-price">{t.price}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.comparison.rows.map((r) => (
                  <tr key={r.feature}>
                    <th scope="row">{r.feature}</th>
                    {r.included.map((inc, i) => (
                      <td
                        key={i}
                        className={
                          c.comparison!.tiers[i]?.current
                            ? "comparison-current"
                            : ""
                        }
                      >
                        <span aria-hidden="true">{inc ? "✓" : "·"}</span>
                        <span className="visually-hidden">
                          {inc ? "included" : "not included"}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="landing-comparison-anchor">{c.comparison.anchorLine}</p>
        </section>
      ) : null}

      {/* 5. How it works */}
      <section className="product-section landing-steps" aria-labelledby="steps-h">
        <h2 id="steps-h">How it works</h2>
        <ol className="landing-steps-list">
          {c.steps.map((s, i) => (
            <li key={s.title}>
              <span className="landing-step-num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="landing-mid-cta">
          <a href="#buy" className="cta-primary cta-buy">
            Get it, {c.priceLabel}
          </a>
        </p>
      </section>

      {/* 6. What's inside */}
      <section className="product-section" aria-labelledby="inside-h">
        <h2 id="inside-h">What is inside</h2>
        <ul className="landing-inside-list">
          {c.inside.map((b) => (
            <li key={b.slice(0, 24)}>{autolinkProducts(b, c.slug)}</li>
          ))}
        </ul>
      </section>

      {/* 7. Who it's for / not for */}
      <section className="product-section landing-who" aria-labelledby="who-h">
        <h2 id="who-h">Who it is for, and who it is not</h2>
        <div className="landing-who-grid">
          <div>
            <h3>For you if</h3>
            <ul>
              {c.forWho.map((b) => (
                <li key={b.slice(0, 24)}>{autolinkProducts(b, c.slug)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Not for you if</h3>
            <ul>
              {c.notForWho.map((b) => (
                <li key={b.slice(0, 24)}>{autolinkProducts(b, c.slug)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Social proof: real quotes when they exist, an honest credibility
          note until then (W3). Never fabricated. */}
      <SocialProof scope="product" slug={c.slug} />

      {/* Ladder cross-sell (the three reading depths) */}
      {c.ladder ? <FlagshipChooser current={c.ladder} /> : null}

      {/* 8. FAQ */}
      <section className="product-section" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions, answered plainly</h2>
        {c.faq.map((qa) => (
          <details key={qa.q} className="product-faq-item">
            <summary>{qa.q}</summary>
            <div className="product-faq-answer">
              {autolinkProducts(qa.a, c.slug)}
            </div>
          </details>
        ))}
      </section>

      {/* 9. Final CTA */}
      <section className="product-buy-section" id="buy" aria-labelledby="buy-h">
        <h2 id="buy-h">
          {c.title}, {c.priceLabel}.
        </h2>
        <p>{c.buyLine}</p>
        <BuyButton
          productSlug={c.slug}
          priceLabel={c.priceLabel}
          state={buyState}
          waitlistStatus={waitlistStatus}
        />
        <GuaranteeNote />
        <p className="landing-final-note">{c.finalNote}</p>
        <p className="landing-support-note">
          Questions first? Write to hello@myfengshuihome.com. A person
          answers. Or <Link href="/kua-calculator">start free</Link> with
          your Kua number.
        </p>
      </section>

      <section className="product-back-section">
        <p>
          <Link href="/products" className="article-back-link">
            &larr; Back to all products
          </Link>
        </p>
      </section>
    </div>
  );
}
