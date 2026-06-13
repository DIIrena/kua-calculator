// Smoke test for the Extended Personal Kua Report content pipeline.
// Replicates lib/blocks.ts assembly in plain JS (no TS toolchain): for a
// sample Kua it resolves every block file the recipe references, applies
// the same group-variant fallback, substitutes tokens, renders markdown
// through the same unified pipeline, and asserts no {{token}} leaks.
//
// Usage: node scripts/smoke-extended.mjs

import { readFile } from "node:fs/promises";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const ROOT =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator";
const BLOCKS_DIR = path.join(ROOT, "content", "blocks");

// The extended recipe's block order (mirror of lib/products.ts).
const RECIPE = [
  "welcome-extended", "identity", "summary", "how-to-use",
  "sheng-qi", "tian-yi", "yan-nian", "fu-wei",
  "huo-hai", "wu-gui", "liu-sha", "jue-ming",
  "compatibility", "room-bedroom", "room-desk", "room-dining",
  "year-overlay", "experiment", "closing-extended",
];

// Sample reader: Kua 4, East group. Directions from KUA_MAP[4].
// { N:FW, NE:WG, E:TY, SE:SQ, S:YN, SW:HH, W:JM, NW:LS }
const TOKENS = {
  firstName: "Marco",
  kuaNumber: "4",
  kuaGroup: "East",
  shengQiDir: "Southeast",
  tianYiDir: "East",
  yanNianDir: "South",
  fuWeiDir: "North",
  huoHaiDir: "Southwest",
  wuGuiDir: "Northeast",
  liuShaDir: "Northwest",
  jueMingDir: "West",
  // SVG tokens render to <svg> markup at runtime; stub as a marker so the
  // unresolved-token check does not false-positive on them.
  brandMark: "<svg></svg>",
  personalBagua: "<svg></svg>",
  elementIcons: "<svg></svg>",
  elementSwatches: "<svg></svg>",
  // Direction-quality token (only meaningful in direction blocks).
  direction: "Southeast",
  directionShort: "SE",
  pinyin: "Sheng Qi",
  gloss: "Generating energy",
};

const GROUP = "east";

async function resolveBlock(id) {
  const candidates = [
    path.join(BLOCKS_DIR, `${id}-${GROUP}.md`),
    path.join(BLOCKS_DIR, `${id}.md`),
  ];
  for (const p of candidates) {
    try {
      return { path: p, text: await readFile(p, "utf-8") };
    } catch {
      /* next */
    }
  }
  throw new Error(`MISSING block file for "${id}" (tried ${candidates.join(", ")})`);
}

function substitute(text) {
  return text.replace(/\{\{(\w+)\}\}/g, (whole, key) =>
    key in TOKENS ? TOKENS[key] : whole,
  );
}

const renderer = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

let failures = 0;
let totalChars = 0;

for (const id of RECIPE) {
  try {
    const { path: p, text } = await resolveBlock(id);
    const substituted = substitute(text);
    const leftover = substituted.match(/\{\{\w+\}\}/g);
    const html = String(await renderer.process(substituted));
    totalChars += html.length;
    const hasH1 = /<h1/.test(html);
    const emDash = /—/.test(substituted);
    const status = [];
    if (leftover) status.push(`UNRESOLVED ${[...new Set(leftover)].join(",")}`);
    if (!hasH1) status.push("NO H1");
    if (emDash) status.push("EM DASH");
    if (status.length) {
      failures++;
      console.log(`  FAIL ${id.padEnd(18)} ${status.join("; ")}`);
    } else {
      console.log(`  ok   ${id.padEnd(18)} ${html.length} chars  (${path.basename(p)})`);
    }
  } catch (err) {
    failures++;
    console.log(`  FAIL ${id.padEnd(18)} ${err.message}`);
  }
}

console.log(
  `\n${RECIPE.length} blocks, ${totalChars} HTML chars, ${failures} failure(s).`,
);
process.exit(failures ? 1 : 0);
