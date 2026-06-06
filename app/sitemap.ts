import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { LIFE_AREAS } from "@/lib/life-areas";
import { SPACES } from "@/lib/spaces";

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
      url: `${SITE}/articles`,
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
      url: `${SITE}/checklist`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.5,
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

  return [
    ...staticEntries,
    ...articleEntries,
    ...lifeEntries,
    ...spaceEntries,
  ];
}
