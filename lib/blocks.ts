// Content-block loader for the modular product engine. Reads a markdown
// file from content/blocks/, substitutes personalisation tokens, renders
// to HTML, and returns the HTML string. The PDF assembler concatenates
// the rendered blocks for a product's recipe (see lib/products.ts).
//
// Token format:  {{firstName}}, {{kuaNumber}}, {{kuaGroup}},
//                {{direction}}, {{directionShort}}, {{pinyin}}, {{gloss}}
//
// Variants:  blocks that differ by East / West group can be split into
//            two files (e.g. identity-east.md, identity-west.md). The
//            loader checks for a variant file first and falls back to
//            the base file if no variant exists.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import type { BlockId, Product } from "@/lib/products";
import {
  directionsForKua,
  type Compass,
  type Direction,
  type QualityCode,
} from "@/lib/directions";
import type { KuaGroup } from "@/lib/kua";
import {
  brandMarkSvg,
  personalBaguaSvg,
  elementIconsSvg,
  elementSwatchesSvg,
  miniCompassSvg,
  bedPlacementSvg,
  deskPlacementSvg,
  floorPlanExampleSvg,
  elementIconSvg,
} from "@/lib/pdf/svg-marks";
import {
  kuaElement,
  elementProfile,
  yanNianActivation,
} from "@/lib/kua-element";
import {
  PILLAR_TO_SECTOR,
  PILLAR_META,
  WANDERING_STAR,
  resolveSectorBranches,
  sectorVerdictFor,
  sectorVerdictPanelHtml,
} from "@/lib/pillar-sectors";
import { nineAreasMapSvg, sectorMiniMapSvg } from "@/lib/pdf/svg-marks";

/** Age threshold (exclusive) below which we prefer the `-child.md`
 *  variant of a block if it exists. Below this we swap the adult
 *  sensory anchors (coffee, work, the difficult meeting) for child-
 *  appropriate ones (juice, schoolbag, sandwich). */
export const CHILD_AGE_THRESHOLD = 13;

export type BlockContext = {
  firstName: string;
  kuaNumber: number;
  kuaGroup: KuaGroup;
  /** The customer's age in years, computed from birth date at form
   *  submission time. Drives variant selection for child vs adult
   *  voice. Optional for legacy callers; defaults to adult. */
  ageYears?: number;
  /** Compass -> Direction (full quality detail). */
  byCompass: Record<Compass, Direction>;
  /** Quality code -> Direction (inverse view of byCompass). Direction
   *  blocks read from here to discover which compass direction THIS
   *  customer's Kua maps the quality to. */
  byQuality: Record<QualityCode, Direction>;
};

export function buildContext(
  firstName: string,
  kuaNumber: number,
  kuaGroup: KuaGroup,
  ageYears?: number,
): BlockContext {
  const byCompass = directionsForKua(kuaNumber);
  const byQuality = {} as Record<QualityCode, Direction>;
  (Object.keys(byCompass) as Compass[]).forEach((c) => {
    byQuality[byCompass[c].qualityCode] = byCompass[c];
  });
  return { firstName, kuaNumber, kuaGroup, ageYears, byCompass, byQuality };
}

// Direction-quality blocks. Maps the block ID to the QualityCode whose
// direction the customer's reading is about for this block.
const BLOCK_TO_QUALITY: Partial<Record<BlockId, QualityCode>> = {
  "sheng-qi": "SQ",
  "tian-yi": "TY",
  "yan-nian": "YN",
  "fu-wei": "FW",
  "huo-hai": "HH",
  "wu-gui": "WG",
  "liu-sha": "LS",
  "jue-ming": "JM",
};

function substituteTokens(
  template: string,
  context: BlockContext,
  blockId: BlockId,
): string {
  const quality = BLOCK_TO_QUALITY[blockId];
  const direction = quality ? context.byQuality[quality] : null;

  // Pillar-chapter layer: the block's fixed bagua sector (if any) and
  // the buyer's Direction landing on it. Powers the resolved verdict
  // tokens; all of them return "" for blocks without a sector, per the
  // stray-token-never-crashes convention.
  const pillarSector = PILLAR_TO_SECTOR[blockId];
  const pillarDir = pillarSector ? context.byCompass[pillarSector] : null;
  const pillarMeta = PILLAR_META[blockId];

  // Inline SVG tokens. Generated lazily so blocks that do not use them
  // do not pay the string-concatenation cost.
  let cachedBrandMark: string | null = null;
  let cachedPersonalBagua: string | null = null;
  let cachedElementIcons: string | null = null;
  let cachedElementSwatches: string | null = null;

  // Per-quality direction tokens. The summary block uses all eight to
  // build the at-a-glance table; other blocks may use them too.
  const dirLabel = (q: QualityCode): string =>
    context.byQuality[q]?.compassLabel ?? "";

  const tokens: Record<string, () => string> = {
    firstName: () => context.firstName,
    kuaNumber: () => String(context.kuaNumber),
    kuaGroup: () => (context.kuaGroup === "east" ? "East" : "West"),
    direction: () => direction?.compassLabel ?? "",
    directionShort: () => direction?.compass ?? "",
    pinyin: () => direction?.pinyin ?? "",
    gloss: () => direction?.gloss ?? "",
    // Per-quality direction tokens (the customer's compass direction
    // for each named quality).
    shengQiDir: () => dirLabel("SQ"),
    tianYiDir: () => dirLabel("TY"),
    yanNianDir: () => dirLabel("YN"),
    fuWeiDir: () => dirLabel("FW"),
    huoHaiDir: () => dirLabel("HH"),
    wuGuiDir: () => dirLabel("WG"),
    liuShaDir: () => dirLabel("LS"),
    jueMingDir: () => dirLabel("JM"),
    brandMark: () => (cachedBrandMark ??= brandMarkSvg()),
    // Per-chapter visuals (CV2-002). Empty string when the block has
    // no direction mapping, so a stray token can never crash a render.
    miniCompass: () =>
      direction
        ? miniCompassSvg(
            direction.compass,
            direction.compassLabel,
            direction.pinyin,
            direction.favourable,
          )
        : "",
    bedPlacement: () =>
      direction
        ? bedPlacementSvg(
            direction.compass,
            direction.compassLabel,
            direction.favourable,
          )
        : "",
    deskPlacement: () =>
      direction
        ? deskPlacementSvg(
            direction.compass,
            direction.compassLabel,
            direction.favourable,
          )
        : "",
    floorPlanExample: () => floorPlanExampleSvg(),
    // Kua-element layer (CV3). All derive from the Kua number alone.
    kuaElement: () => elementProfile(context.kuaNumber).label,
    kuaElementColors: () => elementProfile(context.kuaNumber).colors,
    kuaElementMaterials: () => elementProfile(context.kuaNumber).materials,
    kuaElementDress: () => elementProfile(context.kuaNumber).dress,
    kuaElementIcon: () => elementIconSvg(kuaElement(context.kuaNumber)),
    yanNianActivation: () => yanNianActivation(context.kuaNumber),
    personalBagua: () =>
      (cachedPersonalBagua ??= personalBaguaSvg(
        context.kuaNumber,
        context.kuaGroup,
        context.byQuality,
      )),
    personalBaguaCompact: () =>
      personalBaguaSvg(
        context.kuaNumber,
        context.kuaGroup,
        context.byQuality,
        true,
      ),
    elementIcons: () =>
      (cachedElementIcons ??= elementIconsSvg(context.kuaGroup)),
    elementSwatches: () =>
      (cachedElementSwatches ??= elementSwatchesSvg(context.kuaGroup)),
    // Pillar-sector tokens (premium Nine Areas design). Resolved from
    // the block's fixed sector against the buyer's chart.
    sectorName: () => pillarMeta?.sectorLabel ?? "",
    sectorShort: () => pillarSector ?? "",
    sectorElement: () => pillarMeta?.elementLabel ?? "",
    sectorTrigram: () => pillarMeta?.trigram ?? "",
    sectorVerdict: () =>
      pillarDir ? (pillarDir.favourable ? "supportive" : "handle with care") : "",
    sectorStar: () => (pillarDir ? WANDERING_STAR[pillarDir.qualityCode] : ""),
    sectorPinyin: () => pillarDir?.pinyin ?? "",
    sectorGloss: () => pillarDir?.gloss ?? "",
    sectorVerdictPanel: () =>
      pillarMeta
        ? sectorVerdictPanelHtml(blockId, context.firstName, context.byCompass)
        : "",
    sectorMiniMap: () =>
      pillarMeta ? sectorMiniMapSvg(pillarMeta, pillarDir?.favourable ?? null) : "",
    sectorElementIcon: () =>
      pillarMeta ? elementIconSvg(pillarMeta.element) : "",
    nineAreasMap: () => nineAreasMapSvg(context.byCompass),
  };

  return template.replace(/\{\{(\w+)\}\}/g, (whole, key) => {
    const fn = tokens[key];
    return fn ? fn() : whole;
  });
}

async function readBlockFile(
  blockId: BlockId,
  group: KuaGroup,
  ageYears?: number,
): Promise<string> {
  const baseDir = path.join(process.cwd(), "content", "blocks");
  const isChild =
    typeof ageYears === "number" && ageYears < CHILD_AGE_THRESHOLD;

  // Variant fallback chain, most specific first:
  //   identity-east-child.md  (group + child)
  //   identity-child.md       (child only)
  //   identity-east.md        (group only)
  //   identity.md             (base)
  const candidates: string[] = [];
  if (isChild) {
    candidates.push(path.join(baseDir, `${blockId}-${group}-child.md`));
    candidates.push(path.join(baseDir, `${blockId}-child.md`));
  }
  candidates.push(path.join(baseDir, `${blockId}-${group}.md`));
  candidates.push(path.join(baseDir, `${blockId}.md`));

  for (const p of candidates) {
    try {
      return await readFile(p, "utf-8");
    } catch {
      // try the next candidate
    }
  }
  throw new Error(`No content block file found for ${blockId} (group=${group}, child=${isChild})`);
}

const renderer = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

export async function loadBlock(
  blockId: BlockId,
  context: BlockContext,
): Promise<string> {
  const source = await readBlockFile(
    blockId,
    context.kuaGroup,
    context.ageYears,
  );
  const branched = resolveSectorBranches(
    source,
    sectorVerdictFor(blockId, context.byCompass),
  );
  const substituted = substituteTokens(branched, context, blockId);
  const file = await renderer.process(substituted);
  return String(file);
}

export async function assembleProductHtml(
  product: Product,
  context: BlockContext,
): Promise<string> {
  const parts = await Promise.all(
    product.blocks.map(async (blockId) => {
      const html = await loadBlock(blockId, context);
      return `<section class="block block--${blockId}">${html}</section>`;
    }),
  );
  return parts.join("\n");
}
