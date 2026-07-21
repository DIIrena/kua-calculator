// Smoke the premium Nine Areas personalisation across ALL 8 Kua numbers:
// resolve each pillar block's branch markers with the verdict the buyer's
// chart actually produces, and assert the structural contract of the
// resolved chapter. Content-independent by design; the prose can evolve
// without touching this script.
//
// Per (Kua x pillar chapter) it asserts:
//   - exactly one {{sectorVerdictPanel}} token, under "## Your reading"
//   - zero branch markers survive resolution
//   - zero em/en dashes and zero "check which list" homework remnants
//   - supportive and cautious resolutions genuinely differ (both branches
//     carry real prose, not an empty shell)
// Plus: pillar-health carries no markers, welcome-pillars carries the
// {{nineAreasMap}} token, closing-pillars carries no leftover both-branch.
//
// Usage: node scripts/smoke-pillars.mjs

import { readFileSync } from "node:fs";
import path from "node:path";

const BLOCKS_DIR = path.join(process.cwd(), "content", "blocks");

// Mirror of lib/directions.ts KUA_MAP favourability: SQ/TY/YN/FW = true.
const KUA_MAP = {
  1: { N: "FW", NE: "WG", E: "TY", SE: "SQ", S: "YN", SW: "JM", W: "HH", NW: "LS" },
  2: { N: "JM", NE: "SQ", E: "HH", SE: "WG", S: "LS", SW: "FW", W: "TY", NW: "YN" },
  3: { N: "TY", NE: "LS", E: "FW", SE: "YN", S: "SQ", SW: "HH", W: "JM", NW: "WG" },
  4: { N: "SQ", NE: "JM", E: "YN", SE: "FW", S: "TY", SW: "WG", W: "LS", NW: "HH" },
  6: { N: "LS", NE: "TY", E: "WG", SE: "HH", S: "JM", SW: "YN", W: "SQ", NW: "FW" },
  7: { N: "HH", NE: "YN", E: "JM", SE: "LS", S: "WG", SW: "TY", W: "FW", NW: "SQ" },
  8: { N: "WG", NE: "FW", E: "LS", SE: "JM", S: "HH", SW: "SQ", W: "YN", NW: "TY" },
  9: { N: "YN", NE: "HH", E: "SQ", SE: "TY", S: "FW", SW: "LS", W: "WG", NW: "JM" },
};
const FAVOURABLE = new Set(["SQ", "TY", "YN", "FW"]);

// Mirror of lib/pillar-sectors.ts PILLAR_TO_SECTOR.
const PILLAR_TO_SECTOR = {
  "pillar-wealth": "SE",
  "pillar-fame": "S",
  "pillar-relationships": "SW",
  "pillar-creativity": "W",
  "pillar-helpful-people": "NW",
  "pillar-career": "N",
  "pillar-knowledge": "NE",
  "pillar-family": "E",
};

// Mirror of resolveSectorBranches.
function resolve(src, verdict) {
  const drop = verdict === "supportive" ? "cautious" : "supportive";
  return src
    .replace(new RegExp(`\\{\\{#${verdict}\\}\\}([\\s\\S]*?)\\{\\{\\/${verdict}\\}\\}`, "g"), "$1")
    .replace(new RegExp(`\\{\\{#${drop}\\}\\}[\\s\\S]*?\\{\\{\\/${drop}\\}\\}`, "g"), "");
}

const MARKER_RE = /\{\{[#/](supportive|cautious)\}\}/;
const HOMEWORK_RE = /check which list|cannot assume which/i;
const DASH_RE = /[–—]/;

let failures = 0;
const fail = (msg) => { failures++; console.log(`  FAIL ${msg}`); };

const read = (f) => readFileSync(path.join(BLOCKS_DIR, f), "utf-8");

for (const [blockId, sector] of Object.entries(PILLAR_TO_SECTOR)) {
  const src = read(`${blockId}.md`);

  const supportiveOut = resolve(src, "supportive");
  const cautiousOut = resolve(src, "cautious");
  if (supportiveOut === cautiousOut)
    fail(`${blockId}: supportive and cautious resolutions are identical (empty branches?)`);

  for (const kua of Object.keys(KUA_MAP)) {
    const verdict = FAVOURABLE.has(KUA_MAP[kua][sector]) ? "supportive" : "cautious";
    const out = verdict === "supportive" ? supportiveOut : cautiousOut;
    const panelCount = (out.match(/\{\{sectorVerdictPanel\}\}/g) || []).length;
    if (panelCount !== 1)
      fail(`${blockId} (Kua ${kua}): ${panelCount} sectorVerdictPanel tokens, expected 1`);
    if (!/## Your reading/.test(out))
      fail(`${blockId} (Kua ${kua}): missing "## Your reading" heading`);
    if (MARKER_RE.test(out)) fail(`${blockId} (Kua ${kua}): markers survive resolution`);
    if (HOMEWORK_RE.test(out)) fail(`${blockId} (Kua ${kua}): both-branch homework remnant`);
    if (DASH_RE.test(out)) fail(`${blockId} (Kua ${kua}): em/en dash`);
  }
}

const health = read("pillar-health.md");
if (MARKER_RE.test(health)) fail("pillar-health: markers present (Centre must have none)");
if ((health.match(/\{\{sectorVerdictPanel\}\}/g) || []).length !== 1)
  fail("pillar-health: expected exactly one sectorVerdictPanel token");

const welcome = read("welcome-pillars.md");
if (!/\{\{nineAreasMap\}\}/.test(welcome)) fail("welcome-pillars: missing nineAreasMap token");

const closing = read("closing-pillars.md");
if (MARKER_RE.test(closing)) fail("closing-pillars: unexpected branch markers");
if (HOMEWORK_RE.test(closing)) fail("closing-pillars: both-branch homework remnant");

console.log(
  failures
    ? `\nsmoke-pillars: ${failures} failure(s).`
    : "\nsmoke-pillars: 8 pillar chapters x 8 Kua numbers + framing blocks, all green.",
);
process.exit(failures ? 1 : 0);
