import { Fragment, type ReactNode } from "react";
import Link from "next/link";

// Turns product-name mentions inside plain-copy strings into links to
// the matching product page. Used by ProductLanding so every product
// page cross-links the others without hand-editing each content config.
// A mention of the page's own product is left as plain text.

// One alias per shop product, matched as the name appears in the copy.
// Optional groups absorb plurals and short forms actually used in the
// configs ("Complete Home Compasses", bare "Nine Life Areas", etc.).
const ALIASES: { slug: string; body: string }[] = [
  { slug: "personal-feng-shui-compass", body: "Personal Feng Shui Compass" },
  { slug: "complete-home-compass", body: "Complete Home Compass(?:es)?" },
  { slug: "all-twelve-spaces-compass", body: "Twelve Spaces(?: Compass(?:es)?)?" },
  { slug: "all-nine-pillars-compass", body: "Nine Life Areas(?: Compass)?" },
  { slug: "couple-compatibility-compass", body: "Couple Compatibility Compass" },
  { slug: "move-in-kit", body: "Move-In Date Report" },
  { slug: "seven-day-home-reset", body: "(?:7|Seven)-Day Home Reset" },
  { slug: "whole-home-starter-bundle", body: "Whole-Home Starter Bundle" },
  { slug: "cures-catalog", body: "Cures and Crystals(?: Catalogue)?" },
  { slug: "business-money-feng-shui", body: "Business and Money(?: Feng Shui Kit)?" },
];

const PATTERN = new RegExp(`(${ALIASES.map((a) => a.body).join("|")})`, "g");
const ANCHORED = ALIASES.map((a) => ({
  slug: a.slug,
  re: new RegExp(`^(?:${a.body})$`),
}));

function slugFor(match: string): string | null {
  for (const a of ANCHORED) {
    if (a.re.test(match)) return a.slug;
  }
  return null;
}

/**
 * Returns the text with any other-product mentions wrapped in links.
 * When nothing matches, returns the original string unchanged.
 */
export function autolinkProducts(
  text: string,
  currentSlug: string,
): ReactNode {
  const parts = text.split(PATTERN);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    // split() with one capture group puts matches at odd indices.
    if (i % 2 === 1) {
      const slug = slugFor(part);
      if (slug && slug !== currentSlug) {
        return (
          <Link
            key={i}
            href={`/products/${slug}`}
            className="product-inline-link"
          >
            {part}
          </Link>
        );
      }
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
