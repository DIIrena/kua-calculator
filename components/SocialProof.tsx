import {
  testimonialsForProduct,
  generalTestimonials,
  averageRating,
  ratedCount,
  CREDIBILITY_NOTE,
  type Testimonial,
} from "@/lib/testimonials";

// Social proof block (W3 + stars). Renders real, consented quotes with the
// star rating the buyer actually gave; a truthful credibility note when no
// real quotes exist. It never fabricates a review, a rating, or a count. The
// stars appear only for reviews that carry a genuine rating.

/** A five-star row. `value` is the real rating; the rest render as empty. */
function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <span
      className="stars"
      role="img"
      aria-label={`Rated ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          aria-hidden="true"
          className={n <= full ? "star star--on" : "star"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function SocialProof({
  scope,
  slug,
}: {
  scope: "product" | "home";
  slug?: string;
}) {
  const quotes: Testimonial[] =
    scope === "product" && slug
      ? testimonialsForProduct(slug)
      : generalTestimonials();

  if (quotes.length === 0) {
    // Honest interim proof: no invented quotes, just who makes this and how.
    return (
      <section className="social-proof social-proof--note" aria-labelledby="proof-h">
        <h2 id="proof-h">{CREDIBILITY_NOTE.heading}</h2>
        <p className="social-proof-note">{CREDIBILITY_NOTE.body}</p>
      </section>
    );
  }

  const avg = averageRating(quotes);
  const nRated = ratedCount(quotes);

  return (
    <section className="social-proof" aria-labelledby="proof-h">
      <div className="social-proof-head">
        <h2 id="proof-h">What readers say</h2>
        {avg !== null ? (
          <p className="social-proof-aggregate">
            <Stars value={avg} />
            <span className="social-proof-aggregate-text">
              {avg.toFixed(1)} from {nRated}{" "}
              {nRated === 1 ? "reader" : "readers"}
            </span>
          </p>
        ) : null}
      </div>
      <ul className="social-proof-list">
        {quotes.map((t) => (
          <li key={t.quote.slice(0, 32)} className="social-proof-item">
            <blockquote>
              {typeof t.rating === "number" ? <Stars value={t.rating} /> : null}
              <p>{t.quote}</p>
              <cite>{t.attribution}</cite>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}
