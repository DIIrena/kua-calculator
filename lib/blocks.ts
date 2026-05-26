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

export type BlockContext = {
  firstName: string;
  kuaNumber: number;
  kuaGroup: KuaGroup;
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
): BlockContext {
  const byCompass = directionsForKua(kuaNumber);
  const byQuality = {} as Record<QualityCode, Direction>;
  (Object.keys(byCompass) as Compass[]).forEach((c) => {
    byQuality[byCompass[c].qualityCode] = byCompass[c];
  });
  return { firstName, kuaNumber, kuaGroup, byCompass, byQuality };
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

  const tokens: Record<string, string> = {
    firstName: context.firstName,
    kuaNumber: String(context.kuaNumber),
    kuaGroup: context.kuaGroup === "east" ? "East" : "West",
    direction: direction?.compassLabel ?? "",
    directionShort: direction?.compass ?? "",
    pinyin: direction?.pinyin ?? "",
    gloss: direction?.gloss ?? "",
  };

  return template.replace(/\{\{(\w+)\}\}/g, (whole, key) => {
    return tokens[key] ?? whole;
  });
}

async function readBlockFile(
  blockId: BlockId,
  group: KuaGroup,
): Promise<string> {
  const baseDir = path.join(process.cwd(), "content", "blocks");
  const variantPath = path.join(baseDir, `${blockId}-${group}.md`);
  const basePath = path.join(baseDir, `${blockId}.md`);
  try {
    return await readFile(variantPath, "utf-8");
  } catch {
    return await readFile(basePath, "utf-8");
  }
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
  const source = await readBlockFile(blockId, context.kuaGroup);
  const substituted = substituteTokens(source, context, blockId);
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
