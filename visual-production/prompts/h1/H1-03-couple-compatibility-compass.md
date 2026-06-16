# H1-03: Couple Compatibility Compass cover

**Asset id:** H1-03
**Batch:** 2026-06-16-h1
**Kind:** image (product cover diagram, class A)

## Purpose

The two-intersecting-rings diagram motif for the Couple Compatibility Compass cover. Gives the art-less product a real cover. The agent generates the text-free diagram only.

## Source spec reference

`spec/featured-product-asset-system.md`, Brief 3 (two intersecting direction diagrams), plus the shared cover system and shared Recraft style suffix in section 4. Identity rules from `spec/phase-h-visual-media-system-2026-06-16.md`.

## Recommended tool

Nano Banana Pro through the configured provider (Replicate if available), for the raster draft. Alternative: Recraft V3 for a strict flat vector with SVG export. Record the choice in the manifest `tool` field.

## Exact prompt

```
two overlapping eight-direction compass rings side by side forming a vesica overlap in the middle, the shared overlap region accented in terracotta orange, flat vector line illustration, single consistent stroke weight, deep green strokes on a warm ivory ground, exactly one small terracotta-orange accent, architectural technical-drawing feel, precise, symmetrical where natural, no text, no shading, no gradients, generous margin, centered
```

## Negative prompt

```
photograph, photorealistic, 3D render, shading, gradients, drop shadow, texture, clutter, busy detail, text, words, letters, numbers, watermark, logo, people, faces, hands, mystical symbols, glowing, neon, multiple colours, Buddha statue, incense, red envelope, coins, money tree, dragon, lucky bamboo, oranges fruit, bagua mirror, Chinese-character overlay
```

## Aspect ratio and size

1:1, approximately 2048 x 2048 px (centered, generous margin).

## Number of variations

6.

## Manual Illustrator / Photoshop step

Build the ivory `#fcfcf8` canvas at the exact size (`cover-thumb.png` 1500 x 1500 new, `cover-portrait.png` 1024 x 1536 new). Place the two-ring motif. Set "Couple Compatibility Compass" and subtitle "Two people, one home" in Hanken Grotesk, deep green `#0e3b2c`. Add the heart-house mark. Confirm the single orange accent (the vesica overlap region). Export PNG (sRGB).

## Target public path / off-site use

After wiring: `public/products/couple-compatibility-compass/cover-thumb.png` (new) and `public/products/couple-compatibility-compass/cover-portrait.png` (new).

## Acceptance checklist

- [ ] ivory ground `#fcfcf8`, deep green `#0e3b2c` line work
- [ ] exactly one true orange `#d9531a` accent (the overlap region), no other colour
- [ ] single consistent stroke weight, flat, no shading, gradients, or shadow
- [ ] no baked text, letters, or numbers
- [ ] correct motif: two overlapping eight-direction rings with a clear vesica overlap
- [ ] no banned objects, no people or faces
- [ ] architecture-led, calm, generous margin, centered
- [ ] 6 variations generated and a contact sheet built

## After owner approval

1. Owner sets `selected_output` and `approval_status: approved` in `manifest.json`.
2. Owner does the manual Illustrator step and stages finals into `visual-production/approved/products/couple-compatibility-compass/`.
3. A separate wiring task copies the files into `public/` and adds `couple-compatibility-compass` to `CARD_COVER_SLUGS` (and sets `assetLevel`) in `lib/product-assets.ts`. The production agent never performs wiring.
