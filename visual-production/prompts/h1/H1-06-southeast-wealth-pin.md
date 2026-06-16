# H1-06: Southeast Wealth pin (middle-zone artwork)

**Asset id:** H1-06
**Batch:** 2026-06-16-h1
**Kind:** image (Pinterest pin middle-zone diagram)

## Purpose

The ivory middle-zone diagram for the Southeast Wealth Area pin (a proven Pinterest and SEO anchor). The agent generates the text-free floor-plan diagram only; the pin itself is hand-built in Illustrator from the locked master template.

## Source spec reference

`spec/phase-f-promotion-2026-06-16.md` item 4 (Southeast Wealth Area) and `spec/phase-h-visual-media-system-2026-06-16.md` section 3b (southeast six-lever floor plan). Pin canvas, zones, palette, and typography from `spec/brand-pin-palette.md`.

## Recommended tool

Nano Banana Pro through the configured provider (Replicate if available), for the raster draft. Alternative: Recraft V3 for a strict flat single-weight vector. Record the choice in the manifest `tool` field.

## Exact prompt

```
flat vector line illustration, top-down residential floor plan, the south-east corner softly tinted clay, six small empty icon slots arranged around it, single-weight deep-green strokes on ivory, architectural plan-drawing feel, no text, generous margin, centered
```

## Negative prompt

```
photograph, photorealistic, 3D render, shading, gradients, drop shadow, texture, clutter, busy detail, text, words, letters, numbers, watermark, logo, people, faces, hands, mystical symbols, glowing, neon, multiple colours, Buddha statue, incense, red envelope, coins, money tree, dragon, lucky bamboo, oranges fruit, bagua mirror, Chinese-character overlay
```

## Aspect ratio and size

1:1, approximately 2048 x 2048 px. It fills the ivory middle zone of the 1000 x 1500 pin (the zone from y=385 to y=1387.7, roughly square).

## Number of variations

4.

## Manual Illustrator / Photoshop step

Build the 1000 x 1500 pin from the locked master template (`spec/brand-pin-palette.md`): pool-table green `#0e3b2c` top block with the orange `#d9531a` heart-house logo and the title "The Southeast Corner, Read in Six Steps" in EB Garamond Bold ivory; the true-orange divider at y=385; the generated diagram placed in the ivory `#fcfcf8` middle zone; the six lever labels set by hand (element, placement, visibility, proportion, timing, room use); the green bottom block with the ivory URL strip "myfengshuihome.com". Export the PNG to `Desktop/MFSH Pins/<folder>/exports/`. No price overlay.

## Target public path / off-site use

Off-site. No `public/` path. Publish to the Pinterest board "Reading Your Home Corner by Corner". Links to `/guide/money/the-southeast-wealth-area-and-how-to-read-it`. Description (from phase-f): "A calm way to read the south-east area of your home in six steps. No activating, no manifesting. myfengshuihome.com."

## Acceptance checklist

- [ ] ivory ground `#fcfcf8`, deep green `#0e3b2c` line work
- [ ] one small true orange `#d9531a` detail only (the south-east corner tint), no orange flood fill
- [ ] single consistent stroke weight, flat, no shading, gradients, or shadow
- [ ] no baked text, letters, or numbers (labels are set by hand in the pin)
- [ ] correct motif: top-down floor plan, south-east corner tinted, six empty icon slots around it
- [ ] no banned objects, no people or faces
- [ ] architecture-led, calm, generous margin, centered
- [ ] 4 variations generated and a contact sheet built

## After owner approval

1. Owner sets `selected_output` and `approval_status: approved` in `manifest.json`.
2. Owner builds the pin in Illustrator from the master template (above) and stages the diagram source into `visual-production/approved/pins/southeast-wealth/` for the record. The finished pin SVG and export stay on the owner's disk per `brand-pin-palette.md`.
3. Owner publishes the exported pin to the named board with the description above. No `public/` path, no code, no wiring.
