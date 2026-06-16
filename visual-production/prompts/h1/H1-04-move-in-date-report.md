# H1-04: Move-In Date Report cover

**Asset id:** H1-04
**Batch:** 2026-06-16-h1
**Kind:** image (product cover diagram, class A)

## Purpose

The doorway-plus-calendar diagram motif for the Move-In Date Report cover. Refreshes the portrait-only cover to the diagram family and adds a square card thumb. The agent generates the text-free diagram only.

## Source spec reference

`spec/featured-product-asset-system.md`, Brief 4 (a doorway plus a calendar grid), plus the shared cover system and shared Recraft style suffix in section 4. Identity rules from `spec/phase-h-visual-media-system-2026-06-16.md`. Note: the product folder is `move-in-kit`.

## Recommended tool

Nano Banana Pro through the configured provider (Replicate if available), for the raster draft. Alternative: Recraft V3 for a strict flat vector with SVG export. Record the choice in the manifest `tool` field.

## Exact prompt

```
a simple open doorway seen straight on with a threshold line and a small key, beside it a compact month calendar grid, one calendar day cell accented in terracotta orange, flat vector line illustration, single consistent stroke weight, deep green strokes on a warm ivory ground, exactly one small terracotta-orange accent, architectural technical-drawing feel, precise, symmetrical where natural, no text, no shading, no gradients, generous margin, centered
```

## Negative prompt

```
photograph, photorealistic, 3D render, shading, gradients, drop shadow, texture, clutter, busy detail, text, words, letters, numbers, watermark, logo, people, faces, hands, mystical symbols, glowing, neon, multiple colours, Buddha statue, incense, red envelope, coins, money tree, dragon, lucky bamboo, oranges fruit, bagua mirror, Chinese-character overlay
```

Note: the calendar grid is generated as empty cells (no numbers); any day numbering is set by hand if wanted, but the cover keeps it text-free.

## Aspect ratio and size

1:1, approximately 2048 x 2048 px (centered, generous margin).

## Number of variations

6.

## Manual Illustrator / Photoshop step

Build the ivory `#fcfcf8` canvas at the exact size (`cover-thumb.png` 1500 x 1500 new, `cover-portrait.png` 1024 x 1536 regenerated to the diagram family). Place the doorway-and-calendar motif. Set "Move-In Date Report" and subtitle "Your move-in window, read day by day" in Hanken Grotesk, deep green `#0e3b2c`. Add the heart-house mark. Confirm the single orange accent (one calendar day cell). Export PNG (sRGB).

## Target public path / off-site use

After wiring: `public/products/move-in-kit/cover-thumb.png` (new) and `public/products/move-in-kit/cover-portrait.png` (regenerate to the diagram family).

## Acceptance checklist

- [ ] ivory ground `#fcfcf8`, deep green `#0e3b2c` line work
- [ ] exactly one true orange `#d9531a` accent (one calendar day cell), no other colour
- [ ] single consistent stroke weight, flat, no shading, gradients, or shadow
- [ ] no baked text, letters, or numbers (empty calendar cells)
- [ ] correct motif: a straight-on open doorway with threshold and key, beside a compact month grid
- [ ] no banned objects, no people or faces
- [ ] architecture-led, calm, generous margin, centered
- [ ] 6 variations generated and a contact sheet built

## After owner approval

1. Owner sets `selected_output` and `approval_status: approved` in `manifest.json`.
2. Owner does the manual Illustrator step and stages finals into `visual-production/approved/products/move-in-kit/`.
3. A separate wiring task copies the files into `public/` and adds `move-in-kit` to `CARD_COVER_SLUGS` (and confirms `assetLevel`) in `lib/product-assets.ts`. The production agent never performs wiring.
