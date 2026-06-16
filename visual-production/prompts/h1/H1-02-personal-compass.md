# H1-02: Personal Compass cover refresh

**Asset id:** H1-02
**Batch:** 2026-06-16-h1
**Kind:** image (product cover diagram, class A)

## Purpose

The compass-rose diagram motif for the Personal Feng Shui Compass cover (the entry paid product). Refreshes the portrait-only cover to the diagram family and adds a square card thumb. The agent generates the text-free diagram only.

## Source spec reference

`spec/featured-product-asset-system.md`, Brief 1 (compass rose), plus the shared cover system and shared Recraft style suffix in section 4. Identity rules from `spec/phase-h-visual-media-system-2026-06-16.md`.

## Recommended tool

Nano Banana Pro through the configured provider (Replicate if available), for the raster draft. Alternative: Recraft V3 for a strict flat vector with SVG export. Record the choice in the manifest `tool` field.

## Exact prompt

```
an eight-point compass rose inside an octagonal eight-direction ring, a small simple house outline with a heart at the exact centre, one compass arm accented in terracotta orange, flat vector line illustration, single consistent stroke weight, deep green strokes on a warm ivory ground, exactly one small terracotta-orange accent, architectural technical-drawing feel, precise, symmetrical where natural, no text, no shading, no gradients, generous margin, centered
```

## Negative prompt

```
photograph, photorealistic, 3D render, shading, gradients, drop shadow, texture, clutter, busy detail, text, words, letters, numbers, watermark, logo, people, faces, hands, mystical symbols, glowing, neon, multiple colours, Buddha statue, incense, red envelope, coins, money tree, dragon, lucky bamboo, oranges fruit, bagua mirror, Chinese-character overlay
```

## Aspect ratio and size

1:1, approximately 2048 x 2048 px (centered rose, generous ivory above for the title in the final layout).

## Number of variations

6.

## Manual Illustrator / Photoshop step

Build the ivory `#fcfcf8` canvas at the exact size (`cover-thumb.png` 1500 x 1500 new, `cover-portrait.png` 1024 x 1536 regenerated to the diagram family). Place the rose with generous ivory above for the title. Set "Personal Feng Shui Compass" and subtitle "Your Kua number, your eight directions" in Hanken Grotesk, deep green `#0e3b2c`. Add the heart-house mark. Confirm the single orange accent (one compass arm). Export PNG (sRGB).

## Target public path / off-site use

After wiring: `public/products/personal-feng-shui-compass/cover-thumb.png` (new) and `public/products/personal-feng-shui-compass/cover-portrait.png` (regenerate to the diagram family).

## Acceptance checklist

- [ ] ivory ground `#fcfcf8`, deep green `#0e3b2c` line work
- [ ] exactly one true orange `#d9531a` accent (one compass arm), no other colour
- [ ] single consistent stroke weight, flat, no shading, gradients, or shadow
- [ ] no baked text, letters, or numbers
- [ ] correct motif: eight-point rose inside an octagonal ring, small house-and-heart at the centre
- [ ] no banned objects, no people or faces
- [ ] architecture-led, calm, generous margin, centered
- [ ] 6 variations generated and a contact sheet built

## After owner approval

1. Owner sets `selected_output` and `approval_status: approved` in `manifest.json`.
2. Owner does the manual Illustrator step and stages finals into `visual-production/approved/products/personal-feng-shui-compass/`.
3. A separate wiring task copies the files into `public/` and adds `personal-feng-shui-compass` to `CARD_COVER_SLUGS` (and confirms `assetLevel`) in `lib/product-assets.ts`. The production agent never performs wiring.
