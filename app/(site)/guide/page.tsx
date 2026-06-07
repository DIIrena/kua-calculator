import type { Metadata } from "next";
import Link from "next/link";
import { GUIDE_CLUSTERS, pagesInCluster } from "@/lib/guide";

export const metadata: Metadata = {
  title: "The ultimate feng shui guide | My Feng Shui Home",
  description:
    "A calm, plain-English guide to feng shui. Built from a 22-chapter source library, adapted one cluster at a time. Free reading, no account needed.",
  alternates: { canonical: "https://myfengshuihome.com/guide" },
};

export default function GuideIndexPage() {
  const ordered = [...GUIDE_CLUSTERS].sort((a, b) => a.order - b.order);

  return (
    <div className="page-content guide-index">
      <p className="eyebrow">The guide</p>
      <h1 className="guide-index-heading">
        The ultimate feng shui guide.
      </h1>
      <p className="guide-index-lede">
        A calm, plain-English guide to feng shui. We are building it
        cluster by cluster from a 22-chapter source library, adapting
        each page deliberately. Free reading. No account required.
      </p>

      <section className="guide-cluster-grid" aria-label="Browse by cluster">
        {ordered.map((c) => {
          const count = pagesInCluster(c.slug).length;
          return (
            <Link
              key={c.slug}
              href={`/guide/${c.slug}`}
              className="guide-cluster-card"
            >
              <p className="guide-cluster-card-eyebrow">{c.label}</p>
              <h2 className="guide-cluster-card-tagline">{c.tagline}</h2>
              <p className="guide-cluster-card-desc">{c.description}</p>
              <p className="guide-cluster-card-meta">
                {count} {count === 1 ? "page" : "pages"} &rarr;
              </p>
            </Link>
          );
        })}
      </section>

      <p className="guide-index-roadmap">
        More clusters land as we adapt them. The 22-chapter source
        library covers Five Elements, the Bagua, the four schools of
        feng shui, room by room, money, the bedroom, healthy home,
        rituals, BaZi, Qi Men Dun Jia, crystals, and the diagnostic
        walkthrough. Each cluster becomes a small set of focused
        pages, written in the same calm voice as the rest of the site.
      </p>
    </div>
  );
}
