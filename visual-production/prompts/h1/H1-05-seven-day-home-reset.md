# H1-05: 7-Day Home Reset cover

**Asset id:** H1-05
**Batch:** 2026-06-16-h1
**Kind:** image (product cover diagram, class A)

## Purpose

The seven-step spatial-sequence diagram motif for the 7-Day Home Reset cover (a course, no PDF samples). Gives the art-less product a real cover. The agent generates the text-free diagram only.

## Source spec reference

`spec/featured-product-asset-system.md`, Brief 5 (a seven-step spatial sequence), plus the shared cover system and shared Recraft style suffix in section 4. Identity rules from `spec/phase-h-visual-media-system-2026-06-16.md`.

## Recommended tool

Nano Banana Pro through the configured provider (Replicate if available), for the raster draft. Alternative: Recraft V3 for a strict flat vector with SVG export. Record the choice in the manifest `tool` field.

## Exact prompt

```
a seven-step path winding through seven small simple room outlines in sequence, connected by a thin line with seven dot nodes, the first node accented in terracotta orange, flat vector line illustration, single consistent stroke weight, deep green strokes on a warm ivory ground, exactly one small terracotta-orange accent, architectural technical-drawing feel, precise, symmetrical where natural, no text, no shading, no gradients, generous margin, centered
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

Build the ivory `#fcfcf8` canvas at the exact size (`cover-thumb.png` 1500 x 1500 new, `cover-portrait.png` 1024 x 1536 new). Place the seven-step path motif. Set "7-Day Home Reset" and subtitle "One calm task a day, room by room" in Hanken Grotesk, deep green `#0e3b2c`. Add the heart-house mark. Confirm the single orange accent (the first node). Export PNG (sRGB). Optional follow-on: seven small day-card graphics reusing the same path motif.

## Target public path / off-site use

After wiring: `public/products/seven-day-home-reset/cover-thumb.png` (new) and `public/products/seven-day-home-reset/cover-portrait.png` (new).

## Acceptance checklist

- [ ] ivory ground `#fcfcf8`, deep green `#0e3b2c` line work
- [ ] exactly one true orange `#d9531a` accent (the first node), no other colour
- [ ] single consistent stroke weight, flat, no shading, gradients, or shadow
- [ ] no baked text, letters, or numbers
- [ ] correct motif: seven small room outlines in sequence, a thin connecting line with seven dot nodes
- [ ] no banned objects, no people or faces
- [ ] architecture-led, calm, generous margin, centered
- [ ] 6 variations generated and a contact sheet built

## After owner approval

1. Owner sets `selected_output` and `approval_status: approved` in `manifest.json`.
2. Owner does the manual Illustrator step and stages finals into `visual-production/approved/products/seven-day-home-reset/`.
3. A separate wiring task copies the files into `public/` and adds `seven-day-home-reset` to `CARD_COVER_SLUGS` (and sets `assetLevel`) in `lib/product-assets.ts`. The production agent never performs wiring.
