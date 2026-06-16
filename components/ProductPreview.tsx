import Image from "next/image";
import { findCommerceProduct } from "@/lib/commerce";
import { assetLevel, KNOWN_PAGES } from "@/lib/product-assets";

// One guarded preview for every product page. It renders real cover and
// sample images ONLY for products whose files exist (per lib/product-
// assets.ts), so it can never point at a missing file. For products
// without artwork yet, it renders an honest "what you receive" anchor
// (no fake cover, no placeholder graphic), driven by the commerce
// registry. Server component. Replaces ProductGallery + ProductCoverPreview.

export default function ProductPreview({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const level = assetLevel(slug);

  if (level === "full") {
    const base = `/products/${slug}`;
    const figures = [
      {
        src: `${base}/cover-portrait.png`,
        w: 1024,
        h: 1536,
        alt: `${title}, front cover.`,
        cap: "The cover.",
      },
      {
        src: `${base}/sample-2.png`,
        w: 935,
        h: 1402,
        alt: `A page from inside ${title}.`,
        cap: "A page from inside.",
      },
      {
        src: `${base}/sample-3.png`,
        w: 935,
        h: 1402,
        alt: `Another page from inside ${title}.`,
        cap: "Another page.",
      },
    ];
    return (
      <section className="product-section product-preview" aria-label="Look inside">
        <h2>Look inside.</h2>
        <p>
          A few pages, so you can see the voice and the layout before you
          decide.
        </p>
        <div className="preview-grid">
          {figures.map((f) => (
            <figure key={f.src} className="preview-figure">
              <Image
                src={f.src}
                alt={f.alt}
                width={f.w}
                height={f.h}
                className="preview-img"
              />
              <figcaption className="preview-caption">
                <strong>{f.cap}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  if (level === "cover") {
    return (
      <section
        className="product-section product-preview product-preview-cover"
        aria-label="Cover preview"
      >
        <Image
          src={`/products/${slug}/cover-portrait.png`}
          alt={`${title}, sample cover.`}
          width={1024}
          height={1536}
          className="preview-cover-img"
        />
        <p className="preview-cover-note">
          A sample cover. Your first name and your Kua number go on the copy
          we render for you.
        </p>
      </section>
    );
  }

  // none: an honest "what you receive" anchor, driven by fulfillment.
  const p = findCommerceProduct(slug);
  const kind = p?.fulfillment ?? "personalized";
  const facts: string[] = [];
  if (kind === "course") {
    facts.push("A seven-day email course");
    facts.push("One short email a day, one small task each");
  } else if (kind === "static") {
    const n = p?.files?.length ?? 1;
    facts.push(n > 1 ? `${n} printable PDFs` : "A printable PDF");
    facts.push("Emailed the moment you buy");
  } else {
    facts.push("A personalised PDF, keyed to your Kua");
    facts.push("Emailed within about a minute of your form");
  }
  const pages = KNOWN_PAGES[slug];
  if (pages) facts.push(pages);

  return (
    <section className="product-section product-receive" aria-label="What you receive">
      <div className="receive-card">
        <p className="receive-eyebrow">What you receive</p>
        <p className="receive-title">{title}</p>
        <ul className="receive-facts">
          {facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
