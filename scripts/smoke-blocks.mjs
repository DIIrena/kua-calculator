// Smoke test EVERY content block: substitute the sample-Kua tokens, render
// through the same unified pipeline lib/blocks.ts uses, and report any
// unresolved {{token}}, em dash, or render error. Catches missing tokens,
// broken markdown, and stray dashes across the whole block library.
//
// Usage: node scripts/smoke-blocks.mjs

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const BLOCKS_DIR =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator/content/blocks";

// Sample reader: Kua 4, East. KUA_MAP[4] = {N:FW,NE:WG,E:TY,SE:SQ,S:YN,SW:HH,W:JM,NW:LS}
const TOKENS = {
  firstName: "Maya", kuaNumber: "4", kuaGroup: "East",
  shengQiDir: "Southeast", tianYiDir: "East", yanNianDir: "South", fuWeiDir: "North",
  huoHaiDir: "Southwest", wuGuiDir: "Northeast", liuShaDir: "Northwest", jueMingDir: "West",
  brandMark: "<svg></svg>", personalBagua: "<svg></svg>",
  elementIcons: "<svg></svg>", elementSwatches: "<svg></svg>",
  direction: "Southeast", directionShort: "SE", pinyin: "Sheng Qi", gloss: "Generating energy",
};

const renderer = unified()
  .use(remarkParse).use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

const files = readdirSync(BLOCKS_DIR)
  .filter((f) => f.endsWith(".md") && f !== "ATTRIBUTION_BLOCKS.md");

let failures = 0;
for (const f of files) {
  const src = readFileSync(path.join(BLOCKS_DIR, f), "utf-8");
  const sub = src.replace(/\{\{(\w+)\}\}/g, (whole, k) => (k in TOKENS ? TOKENS[k] : whole));
  const leftover = sub.match(/\{\{\w+\}\}/g);
  const emDash = /—/.test(sub);
  let html = "", err = null;
  try { html = String(await renderer.process(sub)); } catch (e) { err = e.message; }
  const problems = [];
  if (leftover) problems.push(`UNRESOLVED ${[...new Set(leftover)].join(",")}`);
  if (emDash) problems.push("EM DASH");
  if (err) problems.push(`RENDER ERROR ${err}`);
  if (!/<h1/.test(html) && !err) problems.push("NO H1");
  if (problems.length) { failures++; console.log(`  FAIL ${f.padEnd(26)} ${problems.join("; ")}`); }
}
console.log(`\n${files.length} blocks checked, ${failures} failure(s).`);
process.exit(failures ? 1 : 0);
