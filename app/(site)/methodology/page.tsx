import type { Metadata } from "next";
import { renderMethodology } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "The Compass School and Kua Methodology | My Feng Shui Home",
  description:
    "The Compass School deep-dive: luopan compass, 24 Mountains, Kua number formula with worked examples, and the Eight Mansions personal-direction system.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    locale: "en_US",
    title: "The Compass School and Kua Methodology",
    description:
      "How the Kua number is calculated and how the Eight Mansions personal-direction system works. Self-contained reference for the calculator.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Compass School and Kua Methodology",
  description:
    "Deep-dive on the Compass School: the luopan, the 24 Mountains, the Kua number formula with worked examples, and the Eight Mansions personal-direction system.",
  author: { "@type": "Organization", name: "My Feng Shui Home" },
  publisher: { "@type": "Organization", name: "My Feng Shui Home" },
  datePublished: "2026-05-13",
  dateModified: "2026-05-22",
  inLanguage: "en",
};

export default async function MethodologyPage() {
  const bodyHtml = await renderMethodology();

  return (
    <>
      <article className="methodology">
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />

        <aside className="embed-snippet" aria-labelledby="embed-heading">
          <h3 id="embed-heading">Embed the calculator</h3>
          <p>
            Drop the tool into your own page with a single iframe. Calculation
            runs in the visitor&apos;s browser; no data leaves their device.
          </p>
          <pre>
            <code>
              {
                '<iframe src="/embed" width="100%" height="900" style="border:0;max-width:720px;" loading="lazy" title="Kua number calculator"></iframe>'
              }
            </code>
          </pre>
        </aside>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
