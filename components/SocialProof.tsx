import {
  testimonialsForProduct,
  generalTestimonials,
  CREDIBILITY_NOTE,
  type Testimonial,
} from "@/lib/testimonials";

// Social proof block (W3). Renders real, consented quotes when they exist; a
// truthful credibility note when they do not. It never fabricates a review, a
// rating, or a customer count. Drop it on product pages (scope="product") and
// the homepage (scope="home").

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

  return (
    <section className="social-proof" aria-labelledby="proof-h">
      <h2 id="proof-h">What readers say</h2>
      <ul className="social-proof-list">
        {quotes.map((t) => (
          <li key={t.quote.slice(0, 32)} className="social-proof-item">
            <blockquote>
              <p>{t.quote}</p>
              <cite>{t.attribution}</cite>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}
