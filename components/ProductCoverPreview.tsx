import Image from "next/image";

// Cover preview for a personalised product (Compass, Extended Kua Report,
// Move-In Date Report). The real cover carries the buyer's name and Kua,
// so this is a labelled sample cover rendered by
// scripts/build-product-cover.mjs into /public/products/<slug>/.
// Server component, no client JS.

type Props = {
  slug: string;
  title: string;
  note?: string;
};

export default function ProductCoverPreview({ slug, title, note }: Props) {
  return (
    <section
      className="product-section"
      aria-label="Cover preview"
      style={{ textAlign: "center" }}
    >
      <Image
        src={`/products/${slug}/cover-portrait.png`}
        alt={`${title}, sample cover.`}
        width={1024}
        height={1536}
        style={{
          width: "240px",
          maxWidth: "100%",
          height: "auto",
          borderRadius: "6px",
          border: "1px solid #e2dac5",
          boxShadow: "0 6px 24px rgba(42, 39, 30, 0.12)",
          display: "inline-block",
        }}
      />
      <p
        style={{
          fontSize: "0.85rem",
          color: "#4f5b53",
          marginTop: "0.75rem",
          lineHeight: 1.4,
        }}
      >
        {note ??
          "A sample cover. Your first name and your Kua number go on the copy we render for you."}
      </p>
    </section>
  );
}
