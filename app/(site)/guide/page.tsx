import type { Metadata } from "next";
import Link from "next/link";
import GuideLibrary from "@/components/GuideLibrary";
import { GUIDE_CLUSTERS, GUIDE_PAGES } from "@/lib/guide";

export const metadata: Metadata = {
  title: "The Ultimate Feng Shui Guide | My Feng Shui Home",
  description:
    "Thirty-eight short, jargon-free feng shui pages across eleven topics. Browse by topic, or search the whole library. Free, no account.",
  alternates: { canonical: "https://myfengshuihome.com/guide" },
};

const VALID = new Set(GUIDE_CLUSTERS.map((c) => c.slug));

export default async function GuideIndexPage(props: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await props.searchParams;
  const initialView = view && VALID.has(view) ? view : "all";

  const ordered = [...GUIDE_CLUSTERS].sort((a, b) => a.order - b.order);

  const categories = ordered.map((c) => ({
    slug: c.slug,
    label: c.label,
    count: GUIDE_PAGES.filter((p) => p.cluster === c.slug).length,
  }));

  // Pages in cluster reading-order, preserving each cluster's authored
  // page order (Array.prototype.sort is stable).
  const clusterRank = new Map(ordered.map((c, i) => [c.slug, i]));
  const pages = [...GUIDE_PAGES]
    .sort(
      (a, b) =>
        (clusterRank.get(a.cluster) ?? 99) - (clusterRank.get(b.cluster) ?? 99),
    )
    .map((p) => {
      const c = ordered.find((x) => x.slug === p.cluster);
      return {
        cluster: p.cluster,
        clusterLabel: c?.label ?? p.cluster,
        slug: p.slug,
        title: p.title,
        teaser: p.teaser,
        readingTime: p.readingTime,
        href: `/guide/${p.cluster}/${p.slug}`,
      };
    });

  return (
    <div className="page-content guide-library">
      <section className="products-hero">
        <h1 className="guide-index-heading">The Ultimate Feng Shui Guide</h1>
        <p className="guide-index-lede">
          Thirty-eight short pages across eleven topics. Pick a topic on
          the left, or search the whole library.
        </p>
        <div className="guide-legend" aria-label="What the labels mean">
          <p className="guide-legend-intro">
            Key practical recommendations are labelled where their basis
            matters:
          </p>
          <ul className="guide-legend-list">
            <li>
              <span className="guide-badge guide-badge-design-supported">
                Design-supported
              </span>{" "}
              backed by environmental-design or building-science research.
            </li>
            <li>
              <span className="guide-badge guide-badge-traditional">
                Traditional
              </span>{" "}
              a classical feng shui teaching, offered as tradition.
            </li>
            <li>
              <span className="guide-badge guide-badge-observation">
                Applied observation
              </span>{" "}
              a pattern noticed in practice, not a formal study.
            </li>
            <li>
              <span className="guide-badge guide-badge-preference">
                Preference
              </span>{" "}
              a matter of taste. Take it or leave it.
            </li>
          </ul>
          <p className="guide-legend-link">
            <Link href="/editorial-method">
              How we label and source claims
            </Link>
          </p>
        </div>
      </section>

      <GuideLibrary
        key={initialView}
        initialView={initialView}
        categories={categories}
        pages={pages}
      />
    </div>
  );
}
