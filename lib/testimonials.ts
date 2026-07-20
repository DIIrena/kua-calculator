// Social proof (2026-07-20 conversion review, W3).
//
// HARD RULE: every entry in TESTIMONIALS must be a real, verbatim quote from
// a real buyer who gave consent to be shown. Never invent, embellish, compose,
// or "represent" a review here. An empty array is correct and honest until real
// quotes exist; the SocialProof component renders a truthful credibility note
// instead of fake proof when this list is empty.
//
// To add a real one: collect it (see spec/social-proof-collection-2026-07-20.md),
// then append an entry below. Attribution is a first name or initials plus an
// optional short context ("bought the Complete Home Compass"); never a full name,
// never a stock-photo face, never a fabricated star count.

export type Testimonial = {
  /** The buyer's own words, verbatim. */
  quote: string;
  /** First name or initials, optionally a short honest context. */
  attribution: string;
  /**
   * The rating the buyer actually gave, 1 to 5. Record only a rating the
   * reader genuinely gave you (their reply, their words). If they sent a
   * sentence but no number, omit this rather than assuming five.
   */
  rating?: number;
  /**
   * Product slug this quote is about, if specific. Omit for a general quote
   * about the brand / free calculator, which can show on any page.
   */
  productSlug?: string;
};

// Real, consented quotes only. Empty until the owner collects the first ones.
export const TESTIMONIALS: Testimonial[] = [];

/**
 * The honest interim proof shown while TESTIMONIALS is empty. Not a review:
 * a plain statement of who makes the product and how, all independently
 * verifiable on the site. Safe to show forever; it never claims a customer said it.
 */
export const CREDIBILITY_NOTE = {
  heading: "Where this comes from",
  body:
    "Every reading here is written by a trained architect and built from a library of 22 audited feng shui sources, with each recommendation labelled tradition, design evidence, or preference so you can see exactly what you are getting. The free calculator runs entirely in your browser, and a real person answers hello@myfengshuihome.com.",
} as const;

/** Quotes to show on a product page: that product's own, then general ones. */
export function testimonialsForProduct(slug: string): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.productSlug === slug || !t.productSlug);
}

/** Quotes to show on a general surface (homepage): the brand-level ones. */
export function generalTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((t) => !t.productSlug);
}

/**
 * Average of the ratings actually given, rounded to one decimal, or null if
 * no rated reviews exist yet. Never invents a number: an empty list returns
 * null and the UI shows no stars and emits no rating schema.
 */
export function averageRating(list: Testimonial[]): number | null {
  const rated = list.filter(
    (t) => typeof t.rating === "number" && t.rating >= 1 && t.rating <= 5,
  );
  if (rated.length === 0) return null;
  const sum = rated.reduce((acc, t) => acc + (t.rating as number), 0);
  return Math.round((sum / rated.length) * 10) / 10;
}

/** Count of reviews that carry a real rating. */
export function ratedCount(list: Testimonial[]): number {
  return list.filter((t) => typeof t.rating === "number").length;
}
