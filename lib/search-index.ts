// Builds the global site search index from the existing content
// registries. Server-only (imports lib/guide, which uses node:fs). The
// /search page calls buildSearchIndex() and passes the result to the
// client SiteSearch component. No external service, no analytics: the
// whole index is a plain array serialised into the page.

import { GUIDE_PAGES, GUIDE_CLUSTERS } from "@/lib/guide";
import { ARTICLES } from "@/lib/articles";
import { SPACES } from "@/lib/spaces";
import { LIFE_AREAS } from "@/lib/life-areas";
import { STORE_PRODUCTS } from "@/lib/storefront";
import type { SearchEntry } from "@/lib/search-types";

const clusterLabel = (slug: string) =>
  GUIDE_CLUSTERS.find((c) => c.slug === slug)?.label ?? slug;

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // Start here. The free calculator is always the first start item.
  entries.push({
    id: "start-calculator",
    type: "start",
    title: "Free Kua Calculator",
    subtitle: "Your Kua number and your eight directions, in ten seconds.",
    href: "/kua-calculator",
    keywords:
      "kua number calculator directions east west group birthday start begin free tool desk bed",
  });
  entries.push({
    id: "start-guide",
    type: "start",
    title: "The Ultimate Feng Shui Guide",
    subtitle: "Thirty-eight short pages across eleven topics.",
    href: "/guide",
    keywords: "guide learn library start read pages topics",
  });
  entries.push({
    id: "start-shop",
    type: "start",
    title: "Shop all products",
    subtitle: "Printables, personalised readings, bundles, and a course.",
    href: "/products",
    keywords: "shop products buy store printables compass planner",
  });

  // Guide pages. The glossary cluster is surfaced as its own group.
  for (const p of GUIDE_PAGES) {
    const glossary = p.cluster === "glossary";
    entries.push({
      id: `guide-${p.cluster}-${p.slug}`,
      type: glossary ? "glossary" : "guide",
      title: p.title,
      subtitle: p.teaser,
      href: `/guide/${p.cluster}/${p.slug}`,
      keywords: `${clusterLabel(p.cluster)} ${p.description}`,
    });
  }

  // Articles.
  for (const a of ARTICLES) {
    entries.push({
      id: `article-${a.slug}`,
      type: "article",
      title: a.title,
      subtitle: a.teaser,
      href: `/articles/${a.slug}`,
      keywords: `${a.description} ${(a.lifeAreas ?? []).join(" ")} ${(
        a.spaces ?? []
      ).join(" ")}`,
    });
  }

  // Rooms / space pages.
  for (const s of SPACES) {
    entries.push({
      id: `room-${s.slug}`,
      type: "room",
      title: s.label,
      subtitle: s.tagline,
      href: `/space/${s.slug}`,
      keywords: `room space ${s.shortDescription}`,
    });
  }

  // Life areas.
  for (const l of LIFE_AREAS) {
    entries.push({
      id: `life-${l.slug}`,
      type: "life",
      title: l.label,
      subtitle: l.tagline,
      href: `/life/${l.slug}`,
      keywords: `life area ${l.bagua} ${l.shortDescription}`,
    });
  }

  // Products. The free calculator is the Start-here item, not a product.
  for (const pr of STORE_PRODUCTS) {
    if (pr.category === "free") continue;
    entries.push({
      id: `product-${pr.slug}`,
      type: "product",
      title: pr.title,
      subtitle: pr.oneLiner,
      href: pr.href,
      keywords: `product ${pr.category} ${pr.priceLabel}`,
    });
  }

  return entries;
}
