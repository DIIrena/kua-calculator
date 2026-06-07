// Registry for /guide, the ultimate-feng-shui-guide tree planned in
// myfengshuihome-platform-strategy.md (§4 sitemap, §5 article plan).
//
// The guide is the web-voiced expression of the 22-chapter source
// library at projects/feng-shui/content/. Each guide page is a
// deliberate adaptation of one slice of one chapter, not a wholesale
// import. Per the platform-relationship addendum at the top of the
// strategy doc: the chapter library is the source; the deployed site
// is the truth.
//
// Two-level layout:
//   /guide                          - index of clusters
//   /guide/[cluster]                - one cluster's pages
//   /guide/[cluster]/[slug]         - one guide page
//
// Markdown body lives at content/guide/<cluster>/<slug>.md.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export type GuideCluster = {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  /** Sort order on the /guide index. Lower numbers come first. */
  order: number;
  /** Source chapters this cluster draws from, e.g. ["01"] or ["06"]. */
  sourceChapters: ReadonlyArray<string>;
};

export type GuidePage = {
  cluster: string;
  slug: string;
  title: string;
  description: string;
  /** Short hook for the cluster-page list. */
  teaser: string;
  /** ISO date string. Shown at the foot of the page. */
  lastUpdated: string;
  /** Gated pages require a signed-in session to read. */
  gated: boolean;
  /** Plain-English estimate, e.g. "5 minutes". */
  readingTime: string;
};

// Clusters seeded at scaffold time. Foundations is the only cluster
// with a live page in this scaffold pass; the rest are intentionally
// empty here and get filled as we adapt each one deliberately.
export const GUIDE_CLUSTERS: ReadonlyArray<GuideCluster> = [
  {
    slug: "foundations",
    label: "Foundations",
    tagline: "What feng shui actually is, plainly.",
    description:
      "The basics, without the jargon. What feng shui is, what it isn't, and the small set of ideas the rest of the guide stands on.",
    order: 1,
    sourceChapters: ["01"],
  },
];

export const GUIDE_PAGES: ReadonlyArray<GuidePage> = [
  {
    cluster: "foundations",
    slug: "what-feng-shui-is-plainly",
    title: "What feng shui is, plainly.",
    description:
      "A two-minute, jargon-free read on what feng shui is, what it isn't, and the small idea the rest of the guide depends on.",
    teaser:
      "The two-minute version, before the rest of the guide. No jargon. No outcome promises.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "3 minutes",
  },
];

export function findCluster(slug: string): GuideCluster | null {
  return GUIDE_CLUSTERS.find((c) => c.slug === slug) ?? null;
}

export function pagesInCluster(clusterSlug: string): GuidePage[] {
  return GUIDE_PAGES.filter((p) => p.cluster === clusterSlug);
}

export function findGuidePage(
  cluster: string,
  slug: string,
): GuidePage | null {
  return (
    GUIDE_PAGES.find((p) => p.cluster === cluster && p.slug === slug) ?? null
  );
}

export async function renderGuidePage(
  cluster: string,
  slug: string,
): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "guide",
    cluster,
    `${slug}.md`,
  );
  const source = await readFile(filePath, "utf-8");

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(source);

  return String(file);
}
