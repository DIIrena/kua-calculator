// Registry of all /articles entries. Metadata lives in TypeScript here
// instead of front-matter in the .md files because we want type safety,
// avoid a YAML parser dep, and make the "gated" flag easy to grep for.
// The markdown body lives next to it in content/articles/<slug>.md.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import type { LifeArea } from "@/lib/life-areas";
import type { Space } from "@/lib/spaces";

export type ArticleCategory =
  | "foundations"
  | "bagua"
  | "room-by-room"
  | "methodology";

export type Article = {
  slug: string;
  title: string;
  description: string;
  /** Short hook for the article-index card. */
  teaser: string;
  /** ISO date string. Shown at the foot of the article ("Last updated"). */
  lastUpdated: string;
  /** Gated articles require a signed-in session to read. */
  gated: boolean;
  /** Reading-time estimate, e.g. "5 minutes". */
  readingTime: string;
  /** Cluster the article belongs to. Drives the /articles/category/* pages. */
  category: ArticleCategory;
  /** Bagua life areas this article is relevant to. Drives the
      /life/[area] pages and the related-articles selection there. */
  lifeAreas?: LifeArea[];
  /** Rooms/spaces this article is relevant to. Drives the
      /space/[room] pages. */
  spaces?: Space[];
  /** Manually-curated related slugs. Falls back to same-category articles. */
  relatedSlugs?: string[];
  /** Optional in-article-CTA override. Default is "run the calculator". */
  cta?: {
    label: string;
    href: string;
    rationale?: string;
  };
};

// Category copy used by /articles/category/[slug] and the homepage cards.
export const CATEGORIES: Record<
  ArticleCategory,
  { title: string; tagline: string; description: string }
> = {
  foundations: {
    title: "Foundations",
    tagline: "What feng shui actually is.",
    description:
      "The basics, written without jargon. What feng shui is, what it isn't, why some of it is testable and some of it is tradition.",
  },
  bagua: {
    title: "The bagua map",
    tagline: "Where your home's nine life areas sit.",
    description:
      "The most useful diagram in feng shui. How to overlay it on your floor plan, what each of the nine sectors traditionally governs, and which one to start with.",
  },
  "room-by-room": {
    title: "Room by room",
    tagline: "Practical changes you can finish tonight.",
    description:
      "The kitchen, the bedroom, the entrance, the workspace. One concrete move per room with the reason behind it. Most cost nothing.",
  },
  methodology: {
    title: "The methodology",
    tagline: "What holds up and what does not, for the curious skeptic.",
    description:
      "Twelve myths debunked, the evidence-where-evidence-exists, and the design-psychology bridge for readers who arrived skeptical.",
  },
};

export const ARTICLES: ReadonlyArray<Article> = [
  // ---------- existing seed articles (updated with category) ----------
  {
    slug: "myths",
    title: "Four feng shui myths we don't believe",
    description:
      "Feng shui is full of recycled magazine advice. Four common myths, with what is actually going on behind each.",
    teaser:
      "Four common myths, traced back to what is actually going on. A longer twelve-myth list is on this site too.",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "4 minutes",
    category: "methodology",
    lifeAreas: ["money", "love"],
    spaces: ["bedroom", "kitchen", "living-room"],
    relatedSlugs: [
      "twelve-feng-shui-myths-holding-you-back",
      "feng-shui-or-good-design",
      "whats-the-evidence",
    ],
  },
  {
    slug: "five-elements",
    title: "The five elements, defined",
    description:
      "Wood, fire, earth, metal, water. What each element means in a room, and how the cycles work, without the mystique.",
    teaser:
      "The vocabulary of feng shui. Five elements, two cycles, no mystique.",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "5 minutes",
    category: "foundations",
    lifeAreas: ["money", "love", "health", "career"],
    spaces: ["living-room", "bedroom", "kitchen", "dining-room"],
    relatedSlugs: [
      "what-is-feng-shui-really",
      "bagua-map-wealth-corner",
      "twenty-six-changes-this-weekend",
    ],
  },
  {
    slug: "diagnostic-walkthrough",
    title: "The seven-step home walkthrough",
    description:
      "The structured method consultants use to assess a home for the first time. Seven steps. Done in an afternoon.",
    teaser:
      "The seven-step method consultants use. Free with an account; sign-up takes ten seconds.",
    lastUpdated: "2026-05-25",
    gated: true,
    readingTime: "7 minutes",
    category: "methodology",
    lifeAreas: ["money", "love", "health", "career", "centre"],
    spaces: ["living-room", "bedroom", "kitchen", "dining-room", "bathroom", "terrace"],
    relatedSlugs: [
      "twenty-six-changes-this-weekend",
      "kitchen-stove-and-money",
      "bagua-map-wealth-corner",
    ],
  },
  // ---------- 5 new SEO lead articles ----------
  {
    slug: "what-is-feng-shui-really",
    title: "What is feng shui, really? A skeptic-friendly primer",
    description:
      "Feng shui without the jargon. Two thousand words on what it actually is, what it isn't, and why some of its advice survives a hard look.",
    teaser:
      "What feng shui is, what it is not, and which parts survive a hard look. Two thousand words, written so a sceptic stays.",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "9 minutes",
    category: "foundations",
    lifeAreas: ["money", "love", "health", "career"],
    spaces: ["living-room", "bedroom", "kitchen", "dining-room", "bathroom", "terrace"],
    relatedSlugs: [
      "five-elements",
      "bagua-map-wealth-corner",
      "twelve-feng-shui-myths-holding-you-back",
    ],
  },
  {
    slug: "twenty-six-changes-this-weekend",
    title: "Twenty-six feng shui changes you can make this weekend",
    description:
      "Twenty-six universally-safe moves grouped by where you'll do them. Most cost nothing. The whole list is finishable in one afternoon.",
    teaser:
      "Universally-safe moves you can finish this weekend. Twenty-six of them, ranked by what changes first.",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "9 minutes",
    category: "room-by-room",
    lifeAreas: ["money", "love", "health", "career", "creativity"],
    spaces: ["living-room", "bedroom", "kitchen", "dining-room", "bathroom", "terrace"],
    relatedSlugs: [
      "kitchen-stove-and-money",
      "bagua-map-wealth-corner",
      "what-is-feng-shui-really",
    ],
  },
  {
    slug: "bagua-map-wealth-corner",
    title: "The bagua map: where is your wealth corner (and why it matters)",
    description:
      "The single most useful diagram in feng shui, explained clearly. How to overlay it on your floor plan and find the wealth corner.",
    teaser:
      "The single most useful diagram in feng shui. Find your wealth corner in ten minutes.",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "7 minutes",
    category: "bagua",
    lifeAreas: ["money", "centre"],
    spaces: ["living-room", "kitchen", "dining-room"],
    relatedSlugs: [
      "what-is-feng-shui-really",
      "five-elements",
      "kitchen-stove-and-money",
    ],
  },
  {
    slug: "kitchen-stove-and-money",
    title: "Why your kitchen stove matters for money",
    description:
      "The kitchen stove is the wealth gateway in Classical feng shui, and the most overlooked design choice in the modern reading. One move, big effect.",
    teaser:
      "The single highest-leverage thing you can do in the kitchen, tonight, for free.",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "7 minutes",
    category: "room-by-room",
    lifeAreas: ["money", "health"],
    spaces: ["kitchen"],
    relatedSlugs: [
      "twenty-six-changes-this-weekend",
      "bagua-map-wealth-corner",
      "twelve-feng-shui-myths-holding-you-back",
    ],
  },
  {
    slug: "twelve-feng-shui-myths-holding-you-back",
    title: "Twelve feng shui myths holding you back (and what's actually true)",
    description:
      "Twelve common feng shui myths debunked, each with an evidence-aware reading of what's actually going on.",
    teaser:
      "The twelve most stubborn feng shui myths, taken apart one at a time.",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "9 minutes",
    category: "methodology",
    lifeAreas: ["money", "love"],
    spaces: ["bedroom", "kitchen", "living-room", "bathroom"],
    relatedSlugs: [
      "myths",
      "feng-shui-or-good-design",
      "whats-the-evidence",
    ],
  },
  // ---------- 3 skeptic-killer articles ----------
  {
    slug: "whats-the-evidence",
    title: "What's the evidence behind feng shui? A hard look",
    description:
      "We separate the parts of feng shui that survive a scientific review from the parts that are pure tradition. Twenty-two hundred words, no defensiveness.",
    teaser:
      "Which parts of feng shui survive an evidence review? A non-defensive look.",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "11 minutes",
    category: "methodology",
    lifeAreas: ["health", "money"],
    spaces: ["bedroom", "living-room", "kitchen"],
    relatedSlugs: [
      "feng-shui-or-good-design",
      "five-tests-you-can-run",
      "twelve-feng-shui-myths-holding-you-back",
    ],
  },
  {
    slug: "feng-shui-or-good-design",
    title: "Feng shui or just good design? Why both can be true",
    description:
      "Where feng shui and contemporary environmental design psychology agree, where they disagree, and why the disagreement doesn't matter as much as you think.",
    teaser:
      "Where feng shui and modern design psychology agree, and why the overlap is bigger than you think.",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "8 minutes",
    category: "methodology",
    lifeAreas: ["health", "career"],
    spaces: ["bedroom", "living-room", "kitchen", "dining-room"],
    relatedSlugs: [
      "whats-the-evidence",
      "five-tests-you-can-run",
      "twenty-six-changes-this-weekend",
    ],
  },
  {
    slug: "five-tests-you-can-run",
    title: "If you're skeptical: five tests anyone can run this week",
    description:
      "Five small, observable feng shui changes you can run as an experiment on your own home. Each takes one evening. Each has a way to tell if it's working.",
    teaser:
      "Five small experiments. Each one evening. Each with a way to check if it actually worked.",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "8 minutes",
    category: "methodology",
    lifeAreas: ["health", "money"],
    spaces: ["bedroom", "living-room", "kitchen", "bathroom", "terrace"],
    relatedSlugs: [
      "whats-the-evidence",
      "feng-shui-or-good-design",
      "twenty-six-changes-this-weekend",
    ],
  },
];

export function findArticle(slug: string): Article | null {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function articlesInCategory(cat: ArticleCategory): Article[] {
  return ARTICLES.filter((a) => a.category === cat);
}

export function articlesForLifeArea(area: LifeArea): Article[] {
  return ARTICLES.filter((a) => a.lifeAreas?.includes(area));
}

export function articlesForSpace(space: Space): Article[] {
  return ARTICLES.filter((a) => a.spaces?.includes(space));
}

/**
 * Returns up to `n` articles related to the given one. Manual list wins;
 * falls back to other articles in the same category.
 */
export function relatedTo(article: Article, n: number = 3): Article[] {
  const manual = (article.relatedSlugs ?? [])
    .map((s) => findArticle(s))
    .filter((a): a is Article => a !== null);
  if (manual.length >= n) return manual.slice(0, n);

  const fallback = articlesInCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .filter((a) => !manual.find((m) => m.slug === a.slug));

  return [...manual, ...fallback].slice(0, n);
}

// Renders the markdown body of an article to HTML.
export async function renderArticle(slug: string): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "articles",
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
