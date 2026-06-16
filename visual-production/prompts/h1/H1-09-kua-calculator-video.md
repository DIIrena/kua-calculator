# H1-09: Kua calculator 15-second video

**Asset id:** H1-09
**Batch:** 2026-06-16-h1
**Kind:** video (short b-roll fill, no people)

## Purpose

A calm 15-second piece showing how fast and quiet the free Kua calculator is, to turn curiosity into a first use. The agent generates the non-capture b-roll motion only (the slow push across the ivory interface). The real walkthrough is screen-captured by the owner, and the final video is assembled by hand.

## Source spec reference

`spec/phase-h-visual-media-system-2026-06-16.md` section 4, Video 1 (Kua calculator walkthrough). B-roll negative profile (no people) per the same file and `spec/featured-product-asset-system.md` section 8.

## Recommended tool

Seedance 2 through the configured provider (Replicate if available), for the b-roll clips. Record the tool used in the manifest `tool` field.

## Exact prompt

```
slow, calm push across a clean ivory interface with deep-green text and one orange accent, no people, minimal motion, soft daylight, steady gentle camera move
```

## Negative prompt

```
people, faces, hands, text, words, letters, numbers, watermark, logo, fast motion, flicker, morphing, warping, glowing, neon, mystical symbols, dark cinematic lighting, heavy shadows, cluttered, Buddha statue, incense, red envelope, coins, money tree, dragon, Chinese-character overlay
```

## Aspect ratio and size

9:16 primary (1080 x 1920) for Pinterest, Instagram, and YouTube Shorts. A 16:9 variant (1920 x 1080) for the eventual product page. Per-clip duration approximately 5 seconds (within the 4 to 15 second range).

## Number of variations

3 (of the b-roll push clip).

## Manual Illustrator / Photoshop / editor step

Assemble the 15-second video by hand from these shots: (1) ivory title card "Find your Kua number, free" 2s; (2) screen capture of typing a birthday into the calculator 5s (owner records); (3) the result appears, eight directions highlighted 5s (owner records); (4) CTA card "myfengshuihome.com" 3s. The Seedance b-roll is fill for any non-capture motion. Burn in captions for sound-off viewing. On-screen text: "Find your Kua number" / "Free, no account" / "myfengshuihome.com". Soft minimal piano, low, with a single soft chime when the result appears. No price, no urgency, no fortune-telling language. Export the 9:16 master, the 16:9 variant, and a `poster.jpg` first frame.

## Target public path / off-site use

After wiring (deferred): `public/video/kua-calculator-walkthrough-15s.mp4` plus `.webm` and `poster.jpg`. Also distributed off-site to Pinterest, Instagram, and YouTube Shorts. Website wiring is deferred until the stills are done and traffic justifies a video component.

## Acceptance checklist

- [ ] ivory interface, deep green text, one true orange `#d9531a` accent
- [ ] no people, no faces, no hands anywhere
- [ ] calm minimal motion, no fast cuts, no flicker or morphing
- [ ] no banned objects, no glowing or mystical effects
- [ ] no fortune-telling language, no outcome promises, no consultation language, no urgency in any planned caption or card
- [ ] no price overlay
- [ ] 3 b-roll variations generated and a contact sheet (frame grid) built

## After owner approval

1. Owner sets `selected_output` and `approval_status: approved` in `manifest.json`.
2. Owner assembles the final 15-second video (above) with the screen captures and cards, and stages the masters into `visual-production/approved/video/`.
3. Owner distributes to Pinterest, Instagram, and YouTube Shorts. Website wiring (a video component plus the files in `public/video/`) is a separate, deferred, separately-approved task. The production agent never performs wiring.
