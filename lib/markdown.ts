import { readFile } from "fs/promises";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

// Renders content/methodology.md to HTML at build time.
// rehype-slug adds id attributes to headings; github-slugger (which it
// uses) keeps leading digits, so "## 5. The Kua number" becomes the id
// "5-the-kua-number", matching the result-card deep-link anchors.
export async function renderMethodology(): Promise<string> {
  const filePath = path.join(process.cwd(), "content", "methodology.md");
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
