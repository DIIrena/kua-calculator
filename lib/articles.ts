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

export type Article = {
  slug: string;
  title: string;
  description: string;
  /** One-line teaser shown on the index. */
  teaser: string;
  /** ISO date string. Shown at the foot of the article ("Last updated"). */
  lastUpdated: string;
  /** Gated articles require a signed-in session to read. */
  gated: boolean;
  /** Estimated reading time, plain English. */
  readingTime: string;
};

export const ARTICLES: ReadonlyArray<Article> = [
  {
    slug: "myths",
    title: "Four feng shui myths we don't believe",
    description:
      "Feng shui is full of recycled magazine advice. Four common myths, with the honest reading on each.",
    teaser:
      "Four common myths, with the honest reading on each. (Free; a longer twelve-myth list is on the way.)",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "4 minutes",
  },
  {
    slug: "five-elements",
    title: "The five elements, in plain English",
    description:
      "Wood, fire, earth, metal, water. What each element means in a room, and how the cycles work, without the mystique.",
    teaser:
      "The vocabulary of feng shui. Five elements, two cycles, no mystique. (Free.)",
    lastUpdated: "2026-05-25",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    slug: "diagnostic-walkthrough",
    title: "The seven-step home walkthrough",
    description:
      "The structured method consultants use to assess a home for the first time. Seven steps. Done in an afternoon.",
    teaser:
      "The seven-step method consultants use. The full article is free with an account; sign-up takes ten seconds.",
    lastUpdated: "2026-05-25",
    gated: true,
    readingTime: "7 minutes",
  },
];

export function findArticle(slug: string): Article | null {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
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
