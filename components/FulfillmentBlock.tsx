import { findCommerceProduct } from "@/lib/commerce";

// A calm, consistent fulfillment-confidence block, driven by the commerce
// registry so the wording is correct per fulfillment family (static,
// personalized, course). Presentation only: it reads the registry, it
// does not touch checkout, Stripe, pricing, or the cart. Server component.

function staticFormat(files?: { path: string; label: string }[]): string {
  if (!files || !files.length) return "Printable PDF.";
  const exts = new Set(
    files.map((f) => f.path.split(".").pop()?.toLowerCase()),
  );
  const parts: string[] = [];
  if (exts.has("pdf")) parts.push("PDF");
  if (exts.has("epub")) parts.push("EPUB");
  if (exts.has("ics")) parts.push("a phone calendar file");
  return parts.length ? `${parts.join(", ")}.` : "Printable files.";
}

export default function FulfillmentBlock({ slug }: { slug: string }) {
  const p = findCommerceProduct(slug);
  if (!p) return null;

  let whatYouGet: string;
  let arrives: string;
  let format: string;
  let redownload: string;

  if (p.fulfillment === "static") {
    whatYouGet =
      p.files && p.files.length > 1
        ? `${p.files.length} files: ${p.files.map((f) => f.label).join("; ")}.`
        : `${p.files?.[0]?.label ?? "A printable PDF"}.`;
    arrives = "Emailed the moment you buy, with secure download links.";
    format = staticFormat(p.files);
    redownload =
      "Reply to the delivery email any time for fresh links, or re-download from your account page when signed in.";
  } else if (p.fulfillment === "course") {
    whatYouGet =
      "A seven-day email course: one short email a day, one small task each.";
    arrives =
      "The welcome email arrives the moment you buy, then one email a day for seven days.";
    format = "Seven emails. Nothing to download.";
    redownload =
      "Each day's email links back to its lesson; you can unsubscribe at any time.";
  } else {
    whatYouGet =
      "A personalised PDF, generated from your details and keyed to your Kua.";
    arrives =
      "You fill in a short form after paying; the PDF is generated and emailed within about a minute.";
    format = "A personalised PDF.";
    redownload = "Reply to the delivery email any time for a fresh copy.";
  }

  const rows: { k: string; v: string }[] = [
    { k: "What you get", v: whatYouGet },
    { k: "How it arrives", v: arrives },
    { k: "Format", v: format },
    { k: "Checkout", v: "Secure checkout. One-time purchase, no subscription." },
    { k: "Support", v: "A person answers at hello@myfengshuihome.com." },
    { k: "Re-download", v: redownload },
  ];

  return (
    <section
      className="product-section fulfillment-block"
      aria-labelledby="fulfil-h"
    >
      <h2 id="fulfil-h">What you get, and how it arrives</h2>
      <dl className="fulfillment-list">
        {rows.map((r) => (
          <div key={r.k} className="fulfillment-row">
            <dt>{r.k}</dt>
            <dd>{r.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
