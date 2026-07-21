// The pillar-chapter data layer for the premium Nine Life Areas design.
// Maps each pillar content block to its fixed bagua sector and carries
// the per-chapter metadata the PDF design system needs (opener kicker,
// running footer, nine-areas map, verdict panel). The sector-to-area
// mapping is the classical Later Heaven assignment already stated in
// prose inside each pillar block; this file makes it computable.
//
// pillar-health is deliberately absent from PILLAR_TO_SECTOR: the
// health area reads at the Centre, which has no compass bearing and
// therefore no supportive/cautious verdict. Its chapter keeps a
// neutral panel.

import type { BlockId } from "@/lib/products";
import type { Compass, Direction, QualityCode } from "@/lib/directions";

export const PILLAR_TO_SECTOR: Partial<Record<BlockId, Compass>> = {
  "pillar-wealth": "SE",
  "pillar-fame": "S",
  "pillar-relationships": "SW",
  "pillar-creativity": "W",
  "pillar-helpful-people": "NW",
  "pillar-career": "N",
  "pillar-knowledge": "NE",
  "pillar-family": "E",
};

export type PillarMeta = {
  /** Human life-area label, used in kickers, footers, and the map. */
  areaLabel: string;
  /** Compass sector, or null for the Centre. */
  sector: Compass | null;
  /** Sector label for display ("Southeast", "Centre"). */
  sectorLabel: string;
  /** The sector's element in the classical assignment. */
  element: "wood" | "fire" | "earth" | "metal" | "water";
  elementLabel: string;
  /** Trigram name, or null for the Centre. */
  trigram: string | null;
  /** Compass bearing in degrees, or null for the Centre. */
  bearing: number | null;
  /** 1-based position in the nine-chapter reading order. */
  order: number;
};

export const PILLAR_META: Partial<Record<BlockId, PillarMeta>> = {
  "pillar-wealth": {
    areaLabel: "Wealth",
    sector: "SE",
    sectorLabel: "Southeast",
    element: "wood",
    elementLabel: "Wood",
    trigram: "Xun",
    bearing: 135,
    order: 1,
  },
  "pillar-fame": {
    areaLabel: "Recognition",
    sector: "S",
    sectorLabel: "South",
    element: "fire",
    elementLabel: "Fire",
    trigram: "Li",
    bearing: 180,
    order: 2,
  },
  "pillar-relationships": {
    areaLabel: "Relationships",
    sector: "SW",
    sectorLabel: "Southwest",
    element: "earth",
    elementLabel: "Earth",
    trigram: "Kun",
    bearing: 225,
    order: 3,
  },
  "pillar-creativity": {
    areaLabel: "Creativity",
    sector: "W",
    sectorLabel: "West",
    element: "metal",
    elementLabel: "Metal",
    trigram: "Dui",
    bearing: 270,
    order: 4,
  },
  "pillar-helpful-people": {
    areaLabel: "Helpful people",
    sector: "NW",
    sectorLabel: "Northwest",
    element: "metal",
    elementLabel: "Metal",
    trigram: "Qian",
    bearing: 315,
    order: 5,
  },
  "pillar-career": {
    areaLabel: "Career",
    sector: "N",
    sectorLabel: "North",
    element: "water",
    elementLabel: "Water",
    trigram: "Kan",
    bearing: 0,
    order: 6,
  },
  "pillar-knowledge": {
    areaLabel: "Knowledge",
    sector: "NE",
    sectorLabel: "Northeast",
    element: "earth",
    elementLabel: "Earth",
    trigram: "Gen",
    bearing: 45,
    order: 7,
  },
  "pillar-family": {
    areaLabel: "Family",
    sector: "E",
    sectorLabel: "East",
    element: "wood",
    elementLabel: "Wood",
    trigram: "Zhen",
    bearing: 90,
    order: 8,
  },
  "pillar-health": {
    areaLabel: "Health",
    sector: null,
    sectorLabel: "Centre",
    element: "earth",
    elementLabel: "Earth",
    trigram: null,
    bearing: null,
    order: 9,
  },
};

/** The older wandering-star name behind each Eight Mansions quality.
 *  Verified against the ENR-001 star-identity prose in the direction
 *  blocks (sheng-qi.md etc.), not from memory. */
export const WANDERING_STAR: Record<QualityCode, string> = {
  SQ: "Tan Lang",
  TY: "Ju Men",
  YN: "Wu Qu",
  FW: "Fu Bi",
  HH: "Lu Cun",
  WG: "Lian Zhen",
  LS: "Wen Qu",
  JM: "Po Jun",
};

/** Static chapter start pages for the nine-areas map. The chapter
 *  signatures are fixed-length by design (opener page, body, tips page,
 *  recap page, all page-break-forced; photo bands are fixed-height with
 *  or without an image), so these are stable across Kua numbers. Filled
 *  from measured renders at PRM-009; 0 means "not yet measured" and the
 *  map falls back to chapter-order badges instead of page numbers. */
export const CHAPTER_PLAN: Partial<Record<BlockId, number>> = {
  "pillar-wealth": 0,
  "pillar-fame": 0,
  "pillar-relationships": 0,
  "pillar-creativity": 0,
  "pillar-helpful-people": 0,
  "pillar-career": 0,
  "pillar-knowledge": 0,
  "pillar-family": 0,
  "pillar-health": 0,
};

/** Resolve the branch markers in a pillar block's markdown. Keeps the
 *  region matching the buyer's verdict for the block's sector, strips
 *  the other. Blocks without a verdict (null) pass through untouched,
 *  which the smoke scripts turn into a loud failure if markers exist. */
export function resolveSectorBranches(
  src: string,
  verdict: "supportive" | "cautious" | null,
): string {
  if (verdict === null) return src;
  const drop = verdict === "supportive" ? "cautious" : "supportive";
  return src
    .replace(
      new RegExp(`\\{\\{#${verdict}\\}\\}([\\s\\S]*?)\\{\\{\\/${verdict}\\}\\}`, "g"),
      "$1",
    )
    .replace(
      new RegExp(`\\{\\{#${drop}\\}\\}[\\s\\S]*?\\{\\{\\/${drop}\\}\\}`, "g"),
      "",
    );
}

/** The buyer's verdict for a pillar block, or null when the block has
 *  no fixed sector (pillar-health, and every non-pillar block). */
export function sectorVerdictFor(
  blockId: BlockId,
  byCompass: Record<Compass, Direction>,
): "supportive" | "cautious" | null {
  const sector = PILLAR_TO_SECTOR[blockId];
  if (!sector) return null;
  return byCompass[sector].favourable ? "supportive" : "cautious";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** The rendered "Your reading" panel for a pillar chapter: the resolved
 *  verdict, the star that lands on the sector for this buyer, and its
 *  gloss. Layout lives here (TS), prose lives in the markdown blocks.
 *  pillar-health gets the neutral Centre variant. */
export function sectorVerdictPanelHtml(
  blockId: BlockId,
  firstName: string,
  byCompass: Record<Compass, Direction>,
): string {
  const meta = PILLAR_META[blockId];
  if (!meta) return "";
  const name = escapeHtml(firstName);

  if (!meta.sector) {
    return `<div class="verdict-panel verdict-panel--centre">
<p class="verdict-panel__kicker">Your reading, ${name}</p>
<p class="verdict-panel__verdict">The Centre is the same still point in every chart.</p>
<p class="verdict-panel__detail">No star lands here and no verdict applies. The Centre asks the same of everyone: keep it open and clear, before you turn to any corner.</p>
</div>`;
  }

  const dir = byCompass[meta.sector];
  const supportive = dir.favourable;
  const star = WANDERING_STAR[dir.qualityCode];
  const verdictLine = supportive
    ? `${meta.sectorLabel} is one of your supportive directions. This corner is doubly yours - lean in.`
    : `${meta.sectorLabel} is one of your directions to handle with care. Tend this corner gently - do not anchor to it.`;
  return `<div class="verdict-panel verdict-panel--${supportive ? "supportive" : "cautious"}">
<p class="verdict-panel__kicker">Your reading, ${name}</p>
<p class="verdict-panel__verdict">${supportive ? "&#10022;" : "&#9675;"} ${verdictLine}</p>
<p class="verdict-panel__detail">For your Kua, the ${escapeHtml(meta.areaLabel.toLowerCase())} sector carries your ${escapeHtml(dir.pinyin)} direction - the star ${escapeHtml(star)}, read as ${escapeHtml(dir.gloss.toLowerCase())}.</p>
</div>`;
}
