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

// Sample reader: Kua 4, East. KUA_MAP[4] = {N:SQ,NE:JM,E:YN,SE:FW,S:TY,SW:WG,W:LS,NW:HH}
// (classical rows; corrected 2026-07-17, CV2-015-DATA)
const TOKENS = {
  firstName: "Maya", kuaNumber: "4", kuaGroup: "East",
  shengQiDir: "North", tianYiDir: "South", yanNianDir: "East", fuWeiDir: "Southeast",
  huoHaiDir: "Northwest", wuGuiDir: "Southwest", liuShaDir: "West", jueMingDir: "Northeast",
  brandMark: "<svg></svg>", personalBagua: "<svg></svg>",
  elementIcons: "<svg></svg>", elementSwatches: "<svg></svg>",
  miniCompass: "<svg></svg>", bedPlacement: "<svg></svg>",
  deskPlacement: "<svg></svg>", floorPlanExample: "<svg></svg>",
  personalBaguaCompact: "<svg></svg>",
  kuaElement: "Wood", kuaElementColors: "greens", kuaElementMaterials: "plants",
  kuaElementDress: "slim cuts", kuaElementIcon: "<svg></svg>", yanNianActivation: "a recipe",
  direction: "North", directionShort: "N", pinyin: "Sheng Qi", gloss: "Generating energy",
  // Pillar-sector tokens (PRM-001). Values arbitrary; presence is the test.
  sectorName: "Southeast", sectorShort: "SE", sectorElement: "Wood",
  sectorTrigram: "Xun", sectorVerdict: "supportive", sectorStar: "Tan Lang",
  sectorPinyin: "Fu Wei", sectorGloss: "Stability",
  sectorVerdictPanel: "<div class=\"verdict-panel\"></div>",
  sectorMiniMap: "<svg></svg>", sectorElementIcon: "<svg></svg>",
  nineAreasMap: "<svg></svg>",
};

// The eight pillar blocks with a fixed compass sector; their markdown may
// carry {{#supportive}}/{{#cautious}} branch markers, resolved at load by
// lib/pillar-sectors.ts resolveSectorBranches. pillar-health (the Centre)
// and every other block must carry NO markers.
const SECTOR_BRANCH_BLOCKS = new Set([
  "pillar-wealth", "pillar-fame", "pillar-relationships", "pillar-creativity",
  "pillar-helpful-people", "pillar-career", "pillar-knowledge", "pillar-family",
]);

// Mirror of resolveSectorBranches in lib/pillar-sectors.ts.
function resolveBranches(src, verdict) {
  const drop = verdict === "supportive" ? "cautious" : "supportive";
  return src
    .replace(new RegExp(`\\{\\{#${verdict}\\}\\}([\\s\\S]*?)\\{\\{\\/${verdict}\\}\\}`, "g"), "$1")
    .replace(new RegExp(`\\{\\{#${drop}\\}\\}[\\s\\S]*?\\{\\{\\/${drop}\\}\\}`, "g"), "");
}

const MARKER_RE = /\{\{[#/](supportive|cautious)\}\}/;

const renderer = unified()
  .use(remarkParse).use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

const files = readdirSync(BLOCKS_DIR)
  .filter((f) => f.endsWith(".md") && f !== "ATTRIBUTION_BLOCKS.md");

let failures = 0;
for (const f of files) {
  const src = readFileSync(path.join(BLOCKS_DIR, f), "utf-8");
  const baseId = f.replace(/\.md$/, "").replace(/-(east|west|child)(-child)?$/, "");
  const problems0 = [];
  let resolved = src;
  if (SECTOR_BRANCH_BLOCKS.has(baseId)) {
    // Both verdicts must resolve to marker-free text.
    for (const verdict of ["supportive", "cautious"]) {
      const out = resolveBranches(src, verdict);
      if (MARKER_RE.test(out)) problems0.push(`UNBALANCED MARKERS (${verdict})`);
    }
    resolved = resolveBranches(src, "supportive");
  } else if (MARKER_RE.test(src)) {
    problems0.push("MARKERS IN UNMAPPED BLOCK");
  }
  const sub = resolved.replace(/\{\{(\w+)\}\}/g, (whole, k) => (k in TOKENS ? TOKENS[k] : whole));
  const leftover = sub.match(/\{\{\w+\}\}/g);
  const emDash = /—/.test(sub);
  let html = "", err = null;
  try { html = String(await renderer.process(sub)); } catch (e) { err = e.message; }
  const problems = [...problems0];
  if (leftover) problems.push(`UNRESOLVED ${[...new Set(leftover)].join(",")}`);
  if (emDash) problems.push("EM DASH");
  if (err) problems.push(`RENDER ERROR ${err}`);
  if (!/<h1/.test(html) && !err) problems.push("NO H1");
  // A shared block (no -east/-west variant suffix) must not hardcode ONE
  // group's name: mentioning exactly one of "East group" / "West group"
  // in the raw source means west-group buyers read east copy or vice
  // versa (the liu-sha v1 bug). Mentioning both (e.g. "East or West
  // group") is fine, as is the {{kuaGroup}} token.
  if (!/-(east|west)\.md$/.test(f)) {
    const hasEast = /\bEast[- ]group\b/i.test(src);
    const hasWest = /\bWest[- ]group\b/i.test(src);
    if (hasEast !== hasWest) problems.push("SINGLE-GROUP PHRASE");
  }
  if (problems.length) { failures++; console.log(`  FAIL ${f.padEnd(26)} ${problems.join("; ")}`); }
}
// Photo-folder budget: content/photos JPEGs must total <= 2.5MB so the
// finished PDF stays under Vercel's 4.5MB response limit.
try {
  const { statSync } = await import("node:fs");
  const photosDir = path.join(BLOCKS_DIR, "..", "photos");
  const jpgs = readdirSync(photosDir).filter((f) => f.endsWith(".jpg"));
  const total = jpgs.reduce(
    (n, f) => n + statSync(path.join(photosDir, f)).size,
    0,
  );
  if (total > 2.5 * 1024 * 1024) {
    failures++;
    console.log(
      `  FAIL content/photos/ over budget: ${(total / 1048576).toFixed(2)}MB of 2.50MB across ${jpgs.length} file(s)`,
    );
  } else if (jpgs.length) {
    console.log(
      `  photos: ${jpgs.length} plate(s), ${(total / 1048576).toFixed(2)}MB of 2.50MB budget`,
    );
  }
} catch {
  // folder absent: fine, the design falls back per lib/pdf/photos.ts
}

console.log(`\n${files.length} blocks checked, ${failures} failure(s).`);
process.exit(failures ? 1 : 0);
