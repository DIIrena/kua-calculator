# H1-07: How to Read Any Room pin (middle-zone artwork)

**Asset id:** H1-07
**Batch:** 2026-06-16-h1
**Kind:** image (Pinterest pin middle-zone diagram)

## Purpose

The ivory middle-zone diagram for the How to Read Any Room pin (a proven save-for-later Pinterest anchor). The agent generates the text-free checklist-over-floor-plan diagram only; the pin itself is hand-built in Illustrator from the locked master template.

## Source spec reference

`spec/phase-f-promotion-2026-06-16.md` item 5 (How to Read Any Room) and `spec/phase-h-visual-media-system-2026-06-16.md` section 3b (read-any-room checklist). Pin canvas, zones, palette, and typography from `spec/brand-pin-palette.md`.

## Recommended tool

Nano Banana Pro through the configured provider (Replicate if available), for the raster draft. Alternative: Recraft V3 for a strict flat single-weight vector. Record the choice in the manifest `tool` field.

## Exact prompt

```
flat vector line illustration, top third a small top-down home floor plan, lower two-thirds four empty numbered checklist rows, one clay accent on the first row, single-weight deep-green strokes on ivory, architectural plan-drawing feel, no text, generous margin, centered
```

## Negative prompt

```
photograph, photorealistic, 3D render, shading, gradients, drop shadow, texture, clutter, busy detail, text, words, letters, numbers, watermark, logo, people, faces, hands, mystical symbols, glowing, neon, multiple colours, Buddha statue, incense, red envelope, coins, money tree, dragon, lucky bamboo, oranges fruit, bagua mirror, Chinese-character overlay
```

Note: "numbered checklist rows" means empty rows shaped to receive numbers, not baked digits. The numbers and labels are set by hand in the pin.

## Aspect ratio and size

1:1, approximately 2048 x 2048 px. It fills the ivory middle zone of the 1000 x 1500 pin.

## Number of variations

4.

## Manual Illustrator / Photoshop step

Build the 1000 x 1500 pin from the locked master template (`spec/brand-pin-palette.md`): green top block with the orange heart-house logo and the title "How to Read Any Room: a 4-step walk" in EB Garamond Bold ivory; the orange divider at y=385; the generated diagram in the ivory middle zone; the four step labels set by hand (light, what the main seat sees, command position, use vs setup); the green bottom block with the ivory URL strip "myfengshuihome.com". Export the PNG to `Desktop/MFSH Pins/<folder>/exports/`. No price overlay.

## Target public path / off-site use

Off-site. No `public/` path. Publish to the Pinterest board "Feng Shui Walkthroughs". Links to `/guide/rooms/how-to-read-any-room`. Description (from phase-f): "Walk your home like a feng shui reader: four things to notice in every room. myfengshuihome.com."

## Acceptance checklist

- [ ] ivory ground `#fcfcf8`, deep green `#0e3b2c` line work
- [ ] one small true orange `#d9531a` detail only (the first row accent), no orange flood fill
- [ ] single consistent stroke weight, flat, no shading, gradients, or shadow
- [ ] no baked text, letters, or numbers
- [ ] correct motif: small floor plan in the top third, four empty numbered rows in the lower two-thirds
- [ ] no banned objects, no people or faces
- [ ] architecture-led, calm, generous margin, centered
- [ ] 4 variations generated and a contact sheet built

## After owner approval

1. Owner sets `selected_output` and `approval_status: approved` in `manifest.json`.
2. Owner builds the pin in Illustrator from the master template (above) and stages the diagram source into `visual-production/approved/pins/read-any-room/` for the record. The finished pin SVG and export stay on the owner's disk per `brand-pin-palette.md`.
3. Owner publishes the exported pin to the named board with the description above. No `public/` path, no code, no wiring.
