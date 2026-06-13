import Image from "next/image";

// "Look inside" preview for a product page. Shows the cover plus two
// representative interior pages, rasterised from the product PDF into
// /public/products/<slug>/ by source/build_product_thumbnails.py in the
// annual-feng-shui-planner project. Server component, no client JS.
//
// Image set per product:
//   cover-portrait.png  1024 x 1536  (the cover)
//   sample-2.png        935 x 1402   (an interior page ~45% through)
//   sample-3.png        935 x 1402   (an interior page ~80% through)

type Props = {
  slug: string;
  /** Product title, used for descriptive alt text. */
  title: string;
};

export default function ProductGallery({ slug, title }: Props) {
  const base = `/products/${slug}`;
  return (
    <section className="product-section" aria-label="Look inside">
      <h2>Look inside.</h2>
      <p>
        A few pages, so you can see the voice and the layout before you
        decide.
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
            src={`${base}/cover-portrait.png`}
            alt={`${title}, front cover.`}
            width={1024}
            height={1536}
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
            <strong>The cover.</strong>
          </figcaption>
        </figure>
        <figure style={{ margin: 0 }}>
          <Image
            src={`${base}/sample-2.png`}
            alt={`A page from inside ${title}.`}
            width={935}
            height={1402}
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
            <strong>A page from inside.</strong>
          </figcaption>
        </figure>
        <figure style={{ margin: 0 }}>
          <Image
            src={`${base}/sample-3.png`}
            alt={`Another page from inside ${title}.`}
            width={935}
            height={1402}
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
            <strong>Another page.</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
