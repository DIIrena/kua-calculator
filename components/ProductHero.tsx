import { HERO_SLUGS, HERO_TALL } from "@/lib/product-assets";

// A guarded lifestyle-photo band for a product page, shown below the cover /
// preview. Renders only when the slug has an installed hero at
// public/products/<slug>/hero.jpg (tracked in HERO_SLUGS), so a page never
// points at a missing file. Tall (portrait) heroes are capped narrower so
// they do not dominate the column.
export default function ProductHero({ slug, alt }: { slug: string; alt: string }) {
  if (!HERO_SLUGS.has(slug)) return null;
  const tall = HERO_TALL.has(slug);
  return (
    <figure className={`product-hero-photo${tall ? " is-tall" : ""}`}>
      <img
        src={`/products/${slug}/hero.jpg`}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}
