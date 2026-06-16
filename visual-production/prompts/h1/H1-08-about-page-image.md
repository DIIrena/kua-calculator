# H1-08: About-page image (architect's desk, no face)

**Asset id:** H1-08
**Batch:** 2026-06-16-h1
**Kind:** image (about-page hero diagram)

## Purpose

A calm architect's-desk line illustration for the `/about` hero, so the credibility page earns an on-identity image while keeping the author "I.D." private. No face. The agent draft is close to final, still owner-reviewed and exported.

## Source spec reference

`spec/phase-h-visual-media-system-2026-06-16.md` section 3d (About / founder-story visual prompts, primary diagram). Identity rules from the same file. Lifestyle alternative noted in `spec/featured-product-asset-system.md` section 5 (not used here; the diagram is preferred).

## Recommended tool

Nano Banana Pro through the configured provider (Replicate if available), for the raster draft. Record the tool used in the manifest `tool` field.

## Exact prompt

```
flat vector line illustration of an architect's drafting desk seen from above, a clean sheet with faint pencil floor-plan lines, a wooden ruler, a single orange pencil as the only accent, single-weight deep-green strokes on warm ivory, calm, generous margin, no text
```

## Negative prompt

```
photograph, photorealistic, 3D render, shading, gradients, drop shadow, texture, clutter, busy detail, text, words, letters, numbers, watermark, logo, people, faces, hands, mystical symbols, glowing, neon, multiple colours, Buddha statue, incense, red envelope, coins, money tree, dragon, lucky bamboo, oranges fruit, bagua mirror, Chinese-character overlay
```

The "no faces" and "no hands" exclusions are mandatory here: the author stays private.

## Aspect ratio and size

3:2, approximately 1920 x 1280 px (landscape, fits an about hero band).

## Number of variations

4.

## Manual Illustrator / Photoshop step

Light. Review the selected variation, crop or clean in Photoshop if needed, confirm the orange pencil is the single true-orange `#d9531a` accent and that no face or hands appear, then export PNG (sRGB) at the about-hero size. No title text is baked; the page heading is live HTML.

## Target public path / off-site use

After wiring: `public/about/about-hero.png`.

## Acceptance checklist

- [ ] ivory ground, deep green `#0e3b2c` line work
- [ ] exactly one true orange `#d9531a` accent (the pencil), no other colour
- [ ] single consistent stroke weight, flat, no shading, gradients, or shadow
- [ ] no baked text, letters, or numbers
- [ ] no face, no hands, no people
- [ ] correct motif: top-down drafting desk, sheet with faint floor-plan lines, a wooden ruler, one orange pencil
- [ ] no banned objects
- [ ] architecture-led, calm, generous margin
- [ ] 4 variations generated and a contact sheet built

## After owner approval

1. Owner sets `selected_output` and `approval_status: approved` in `manifest.json`.
2. Owner does the light Photoshop cleanup and stages the final into `visual-production/approved/about/about-hero.png`.
3. A separate, separately-approved wiring task copies the file into `public/about/about-hero.png` and adds an `<Image>` to the about hero in `app/(site)/about/page.tsx`. The production agent never performs wiring.
