# H1-01: Complete Home Compass cover

**Asset id:** H1-01
**Batch:** 2026-06-16-h1
**Kind:** image (product cover diagram, class A)

## Purpose

The diagram motif for the Complete Home Compass cover (the flagship product). Turns the art-less product page and the featured row into a real shop card. The agent generates the text-free diagram only; the owner sets it into the cover canvas.

## Source spec reference

`spec/featured-product-asset-system.md`, Brief 2 (nine-sector floor plan), plus the shared cover system and shared Recraft style suffix in section 4. Identity rules from `spec/phase-h-visual-media-system-2026-06-16.md`.

## Recommended tool

Nano Banana Pro through the configured provider (Replicate if available), for the raster draft. Alternative: Recraft V3 if a strict flat single-weight vector with SVG export is wanted. Record whichever is used in the manifest `tool` field.

## Exact prompt

```
a simple residential floor-plan square divided into a 3 by 3 nine-sector grid, thin interior wall lines and one doorway gap, the centre cell softly accented in terracotta orange, flat vector line illustration, single consistent stroke weight, deep green strokes on a warm ivory ground, exactly one small terracotta-orange accent, architectural technical-drawing feel, precise, symmetrical where natural, no text, no shading, no gradients, generous margin, centered
```

## Negative prompt

```
photograph, photorealistic, 3D render, shading, gradients, drop shadow, texture, clutter, busy detail, text, words, letters, numbers, watermark, logo, people, faces, hands, mystical symbols, glowing, neon, multiple colours, Buddha statue, incense, red envelope, coins, money tree, dragon, lucky bamboo, oranges fruit, bagua mirror, Chinese-character overlay
```

## Aspect ratio and size

1:1, approximately 2048 x 2048 px (the centered diagram, generous margin). The owner re-lays it into the cover canvases.

## Number of variations

6.

## Manual Illustrator / Photoshop step

Build the ivory `#fcfcf8` canvas at the exact cover size (square `cover-thumb.png` 1500 x 1500 and portrait `cover-portrait.png` 1024 x 1536). Place the generated diagram. Set the title "Complete Home Compass" and subtitle "Every room and life area, read for your Kua" in Hanken Grotesk, deep green `#0e3b2c`. Add the heart-house mark. Confirm exactly one true-orange `#d9531a` accent. Export PNG (sRGB). The richest layout of the cover family. Sample pages are a separate follow-on, not part of this draft.

## Target public path / off-site use

After wiring: `public/products/complete-home-compass/cover-thumb.png` (new) and `public/products/complete-home-compass/cover-portrait.png` (new).

## Acceptance checklist

- [ ] ivory ground `#fcfcf8`, deep green `#0e3b2c` line work
- [ ] exactly one true orange `#d9531a` accent (the centre cell), no other colour
- [ ] single consistent stroke weight, flat, no shading, gradients, or shadow
- [ ] no baked text, letters, or numbers
- [ ] correct motif: a 3 by 3 nine-sector grid with thin walls and one doorway gap
- [ ] no banned objects (Buddha, incense, red envelope, coins, money tree, dragon, Chinese characters, bagua mirror, lucky bamboo)
- [ ] no people or faces
- [ ] architecture-led, calm, generous margin, centered
- [ ] 6 variations generated and a contact sheet built

## After owner approval

1. Owner sets `selected_output` and `approval_status: approved` in `manifest.json`.
2. Owner does the manual Illustrator step above and stages the final cover files into `visual-production/approved/products/complete-home-compass/`.
3. A separate, separately-approved wiring task copies the approved files into `public/` and adds `complete-home-compass` to `CARD_COVER_SLUGS` (and sets `assetLevel`) in `lib/product-assets.ts`. The production agent never performs wiring.
