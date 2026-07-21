// Photo plate loader for the premium PDF design. Reads JPEGs from
// content/photos/ and returns them as data URIs for inline embedding,
// mirroring the base64 font pattern in template.ts. The folder is a
// private sibling of content/blocks (NOT public/, which is web-served).
//
// Graceful fallback is the contract: a missing file returns null and
// the design system renders the same FIXED-HEIGHT band as a sand
// gradient with the sector's element icon instead. Page counts are
// therefore identical with and without photos, so the render pipeline
// never blocks on image delivery and the static CHAPTER_PLAN holds.
//
// Naming manifest (12 files, owner-generated via the prompts file at
// spec/image-prompts-nine-areas-2026-07-21.md):
//   cover.jpg  intro.jpg  closing.jpg
//   pillar-wealth.jpg      pillar-fame.jpg    pillar-relationships.jpg
//   pillar-creativity.jpg  pillar-helpful-people.jpg  pillar-career.jpg
//   pillar-knowledge.jpg   pillar-family.jpg  pillar-health.jpg
//
// Budget: <= 250KB per JPEG, <= 2.5MB folder total (smoke-enforced);
// keeps the finished PDF ~3MB, under Vercel's 4.5MB response limit.

import { readFileSync } from "node:fs";
import path from "node:path";

const PHOTOS_DIR = path.join(process.cwd(), "content", "photos");

// Warm-invocation cache, like fontsCache in template.ts. null is cached
// too: a missing file stays missing for the life of the instance.
const cache = new Map<string, string | null>();

/** The photo as a data URI, or null when the file is absent. `name` is
 *  the bare manifest name without extension, e.g. "pillar-wealth". */
export function photoDataUri(name: string): string | null {
  if (cache.has(name)) return cache.get(name)!;
  let uri: string | null = null;
  try {
    const buf = readFileSync(path.join(PHOTOS_DIR, `${name}.jpg`));
    uri = `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    uri = null;
  }
  cache.set(name, uri);
  return uri;
}
