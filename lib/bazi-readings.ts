import type { BaziChart, Element } from "@/lib/bazi";

// The light "teaser" content for the free calculator: a warm one-liner per Day
// Master and per dominant pattern, distilled from the BaZi Basics portraits.
// This is the taste; the full portrait and reading live in the paid Personal
// BaZi Reading. Voice: a feng shui master telling a friend, plainly and kindly.

// One-line hook per Day Master (stem index 0 = Jia ... 9 = Gui).
export const DAY_MASTER_HOOKS: string[] = [
  "upright and principled, the steady one others lean on",   // Jia
  "adaptable and quick to read a room, hard to knock down",  // Yi
  "warm and generous, the person who lights up the table",   // Bing
  "focused and gentle, warm to one person at a time",        // Ding
  "calm and dependable, the anchor everyone gathers around",  // Wu
  "nurturing and patient, the one in whom things grow",      // Ji
  "decisive and direct, built to see things through",        // Geng
  "precise and tasteful, with a real eye for quality",       // Xin
  "ambitious and restless, always heading somewhere",        // Ren
  "quiet and intuitive, understanding more than you say",    // Gui
];

export type GodGroup = "Peers" | "Output" | "Wealth" | "Officer" | "Resource";

// A plain, warm phrase for the chart's dominant lean.
export const GROUP_LEANS: Record<GodGroup, string> = {
  Peers: "standing on your own feet and among equals",
  Output: "making, creating, and expressing yourself",
  Wealth: "enterprise and the everyday exchange of value",
  Officer: "structure, responsibility, and roles people trust you with",
  Resource: "learning, support, and going deep rather than fast",
};

const TEN_GOD_GROUP: Record<string, GodGroup> = {
  "Companion": "Peers", "Rob Wealth": "Peers",
  "Eating God": "Output", "Hurting Officer": "Output",
  "Direct Wealth": "Wealth", "Indirect Wealth": "Wealth",
  "Direct Officer": "Officer", "Seven Killings": "Officer",
  "Direct Resource": "Resource", "Indirect Resource": "Resource",
};

// The dominant Ten Gods group in a chart. Ties resolved by a fixed order so the
// teaser is deterministic.
export function dominantGroup(chart: BaziChart): GodGroup {
  const counts: Record<GodGroup, number> = { Peers: 0, Output: 0, Wealth: 0, Officer: 0, Resource: 0 };
  for (const p of chart.pillars) {
    for (const g of [p.stemGod, p.branchGod]) {
      const grp = TEN_GOD_GROUP[g];
      if (grp) counts[grp] += 1;
    }
  }
  const order: GodGroup[] = ["Officer", "Resource", "Output", "Wealth", "Peers"];
  let best: GodGroup = "Peers";
  let bestN = -1;
  for (const g of order) {
    if (counts[g] > bestN) { bestN = counts[g]; best = g; }
  }
  return best;
}

// The strongest element in the chart (ties by production-cycle order).
export function strongestElement(chart: BaziChart): Element {
  const order: Element[] = ["Wood", "Fire", "Earth", "Metal", "Water"];
  let best: Element = "Wood";
  let bestN = -1;
  for (const e of order) {
    if (chart.elementCounts[e] > bestN) { bestN = chart.elementCounts[e]; best = e; }
  }
  return best;
}
