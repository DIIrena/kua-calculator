import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { GUIDE_CLUSTERS, GUIDE_PAGES } from "@/lib/guide";
import { LIFE_AREAS } from "@/lib/life-areas";
import { SPACES } from "@/lib/spaces";
import { COMPASS_CATALOGUE } from "@/lib/compass-catalogue";

// Sitemap generated at build time. Lists every public URL with a
// lastModified date so search engines (and AI crawlers) know what
// changed. Account pages and /embed are intentionally excluded - they
// are noindex via their own metadata.

const SITE = "https://myfengshuihome.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE}/kua-calculator`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/methodology`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/about`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE}/articles`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE}/guide`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE}/life`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/space`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/products`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE}/products/personal-feng-shui-compass`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE}/products/extended-personal-kua-report`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE}/products/seven-day-home-reset`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/annual-feng-shui-planner-2026`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/move-in-kit`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/bedroom-reset`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/business-money-feng-shui`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/good-days-calendar-2026`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/home-diagnostic-workbook`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/daily-ritual-pack`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/cures-catalog`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/healthy-home-audit`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/five-elements-workbook`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/starter-deck`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/bazi-basics`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/whole-home-starter-bundle`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/complete-home-compass`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${SITE}/products/all-twelve-spaces-compass`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/all-nine-pillars-compass`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/couple-compatibility-compass`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/products/pick-three-pillars`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${SITE}/products/pick-three-spaces`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${SITE}/checklist`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE}/refunds`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE}/privacy`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const articleEntries: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE}/articles/${a.slug}`,
    lastModified: new Date(a.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guideClusterEntries: MetadataRoute.Sitemap = GUIDE_CLUSTERS.map((c) => ({
    url: `${SITE}/guide/${c.slug}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guidePageEntries: MetadataRoute.Sitemap = GUIDE_PAGES.map((p) => ({
    url: `${SITE}/guide/${p.cluster}/${p.slug}`,
    lastModified: new Date(p.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const lifeEntries: MetadataRoute.Sitemap = LIFE_AREAS.map((l) => ({
    url: `${SITE}/life/${l.slug}`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const spaceEntries: MetadataRoute.Sitemap = SPACES.map((s) => ({
    url: `${SITE}/space/${s.slug}`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const compassEntries: MetadataRoute.Sitemap = COMPASS_CATALOGUE.map((e) => ({
    url: `${SITE}/products/${e.slug}`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [
    ...staticEntries,
    ...articleEntries,
    ...guideClusterEntries,
    ...guidePageEntries,
    ...lifeEntries,
    ...spaceEntries,
    ...compassEntries,
  ];
}
