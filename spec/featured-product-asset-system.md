# Featured-product asset system

Production briefs and copy-paste generative-AI prompts for the covers, page images, and (deferred) video on myfengshuihome.com. The owner produces the assets from this file. Nothing is committed until it is generated, approved, exported, and installed (see the checklist).

The single most important rule in this revision: **product covers are not photographs.** Covers are a typographic + architectural-diagram family that matches the existing Planner and report covers. Generated daylit interior photography is a separate, optional class of lifestyle media (product-hero bands and social posts), never the cover itself.

## 1. Visual identity (every asset)

Architectural, calm, intelligent, warm. Real residential proportions, natural daylight (for lifestyle media), restrained styling, generous negative space.

Palette:

- Ivory `#fbf7ee` - the ground of every cover, and most frames.
- Deep green `#0e3b2c` - line work and typography.
- True orange `#d9531a` - exactly ONE focal accent per asset.

Shared negative prompt for STILL PHOTOGRAPHY (lifestyle media only):

```
mystical fantasy, glowing energy, magical aura, chakras, floating crystals, incense smoke, exaggerated luxury, gold ornamentation, generic spa, stereotypical Asian decoration, red lanterns, bagua mirror, dark cinematic lighting, heavy shadows, moody, text, words, letters, typography, watermark, logo, captions, people, hands, distorted anatomy, oversaturated, HDR, fisheye, cluttered, busy
```

Shared negative prompt for VECTOR DIAGRAMS (covers, symbols, icons):

```
photograph, photorealistic, 3D render, shading, gradients, drop shadow, texture, clutter, busy detail, text, words, letters, numbers, watermark, logo, mystical symbols, glowing, neon, multiple colours
```

AVOID at all times: mystical fantasy, glowing energy, chakras, floating crystals, exaggerated luxury, generic spa imagery, stereotypical Asian decoration, dark cinematic rooms, unreadable AI-generated text, distorted anatomy, and any unsupported outcome symbolism.

## 2. Two classes of asset (keep them separate)

- **Product covers (class A).** The cover identity. A typographic layout on an ivory ground with one architectural line diagram as the central motif, restrained green line work, one orange accent, and the real title set manually. One family, a distinct diagram per product. Tool: Recraft V3 for the diagram + Illustrator/Photoshop for the canvas and type. NO photography on the cover.
- **Lifestyle media (class B, optional).** Calm daylit interior photography for optional product-hero bands and social posts only. Tool: Midjourney v7 or Flux. These never replace a cover.

## 3. Dimensions (verified from the existing Planner assets)

- Square `cover-thumb.png` = **1500 x 1500** (shop grid + featured cards).
- Portrait `cover-portrait.png` = **1024 x 1536** (product-page hero).
- Sample pages `sample-1/2/3.png` ~ **935 x 1402** (2:3).

Personalised products (Compass family, Move-In, Couple) use anonymised representative sample pages ("your name here"), never a real buyer's PDF. The course (7-Day Reset) has no PDF samples.

---

## 4. Product covers (class A) - the diagram family

### Shared cover system

Every cover is built the same way so the six read as one family:

1. **Ground:** a flat warm-ivory `#fbf7ee` canvas at the exact pixel size.
2. **Central motif:** one architectural line diagram, deep green `#0e3b2c`, single consistent stroke weight, distinct per product (section 4 briefs).
3. **Accent:** exactly one true-orange `#d9531a` element inside the diagram.
4. **Typography (manual):** the title + subtitle in Hanken Grotesk, deep green, set by hand in Illustrator. The diagram is generated WITHOUT text.
5. **Brand mark (manual):** the small heart-house mark as the signature.

**Generated vs manual, for every cover:**

- *Generated (Recraft V3):* the green line diagram with its single orange accent, as a clean vector (SVG + a 2000px PNG), no text, no shading.
- *Manual (Illustrator or Photoshop):* the ivory canvas at the exact cover size, the title + subtitle typography, the heart-house mark, final alignment, and export to PNG (sRGB).

**Shared Recraft style suffix** (append to each diagram prompt):

```
flat vector line illustration, single consistent stroke weight, deep green strokes on a warm ivory ground, exactly one small terracotta-orange accent, architectural technical-drawing feel, precise, symmetrical where natural, no text, no shading, no gradients, generous margin, centered
```

Pair every diagram prompt with the vector negative prompt (section 1).

### Brief 0 - 2026 Annual Planner (family template; assets exist)

The reference for the family. Diagram system: the existing **annual sector chart** language (a 3 by 3 nine-cell year chart with one cell accented). Files exist: `cover-thumb.png` (1500x1500), `cover-portrait.png` (1024x1536), 3 samples. If refreshing, keep the same chart motif and only modernise the type.

### Brief 1 - Personal Feng Shui Compass

- Folder: `public/products/personal-feng-shui-compass/`
- Diagram system: **a compass rose.**
- Recraft prompt:
  ```
  an eight-point compass rose inside an octagonal eight-direction ring, a small simple house outline with a heart at the exact centre, one compass arm accented in terracotta orange, [shared Recraft style suffix]
  ```
- Manual: ivory canvas; title "Personal Feng Shui Compass" + subtitle "Your Kua number, your eight directions" (Hanken Grotesk, green); heart-house mark; centre the rose with generous ivory above for the title.
- Files: `cover-thumb.png` 1500x1500 (NEW), `cover-portrait.png` 1024x1536 (regenerate to the diagram family), `sample-1..3.png`.

### Brief 2 - Complete Home Compass (flagship)

- Folder: `public/products/complete-home-compass/`
- Diagram system: **a nine-sector floor plan.**
- Recraft prompt:
  ```
  a simple residential floor-plan square divided into a 3 by 3 nine-sector grid, thin interior wall lines and one doorway gap, the centre cell softly accented in terracotta orange, [shared Recraft style suffix]
  ```
- Manual: title "Complete Home Compass" + "Every room and life area, read for your Kua"; the richest layout of the family.
- Files: `cover-thumb.png` (NEW), `cover-portrait.png` (NEW), `sample-1..3.png`.

### Brief 3 - Couple Compatibility Compass

- Folder: `public/products/couple-compatibility-compass/`
- Diagram system: **two intersecting direction diagrams.**
- Recraft prompt:
  ```
  two overlapping eight-direction compass rings side by side forming a vesica overlap in the middle, the shared overlap region accented in terracotta orange, [shared Recraft style suffix]
  ```
- Manual: title "Couple Compatibility Compass" + "Two people, one home".
- Files: `cover-thumb.png` (NEW), `cover-portrait.png` (NEW), `sample-1..3.png`.

### Brief 4 - Move-In Date Report

- Folder: `public/products/move-in-kit/`
- Diagram system: **a doorway plus a calendar grid.**
- Recraft prompt:
  ```
  a simple open doorway seen straight on with a threshold line and a small key, beside it a compact month calendar grid, one calendar day cell accented in terracotta orange, [shared Recraft style suffix]
  ```
- Manual: title "Move-In Date Report" + "Your move-in window, read day by day".
- Files: `cover-thumb.png` (NEW), `cover-portrait.png` (regenerate to the diagram family), `sample-1..3.png`.

### Brief 5 - 7-Day Home Reset (course; no PDF samples)

- Folder: `public/products/seven-day-home-reset/`
- Diagram system: **a seven-step spatial sequence.**
- Recraft prompt:
  ```
  a seven-step path winding through seven small simple room outlines in sequence, connected by a thin line with seven dot nodes, the first node accented in terracotta orange, [shared Recraft style suffix]
  ```
- Manual: title "7-Day Home Reset" + "One calm task a day, room by room".
- Files: `cover-thumb.png` (NEW), `cover-portrait.png` (NEW). Optional: seven small "day card" graphics reusing the same path motif.

---

## 5. Lifestyle media (class B, optional) - separate from covers

Calm daylit interior photography for optional product-hero bands and social posts. These are NOT covers and never carry the title typography of a cover. Tool: Midjourney v7 (`--style raw --v 7`) or Flux 1.1 Pro. Pair with the still-photography negative (section 1).

- **Product-hero / social interior (generic template):**
  ```
  Editorial interior photograph of a calm, light-filled corner of a real home, soft natural daylight, warm ivory walls, restrained Scandinavian-Japanese styling, one small terracotta-orange object as the only colour accent, a deep-green plant, real residential proportions, generous negative space, architectural and warm, 35mm, eye level --ar 1:1 --style raw --v 7
  ```
  Vary the room to the product (study for Compass, open living space for Complete Home, serene shared bedroom for Couple, bright nearly-empty room with a doorway for Move-In, freshly tidied corner for 7-Day Reset). Files under `public/products/<slug>/hero.jpg` (optional) or `public/social/`.
- **Homepage hero band** (beside the calculator): `--ar 16:9` -> 1920x1080.
  ```
  a calm daylit corner of a real home, a window seat, restrained styling, one orange accent, generous left negative space for a headline, architectural and warm --ar 16:9 --style raw --v 7
  ```
  Left 40% kept clear (headline is live HTML). File `public/hero/home-hero.jpg`.
- **About hero** (no face; keeps the author initials private): `--ar 3:2`.
  ```
  an architect's calm desk from above, a clean drafting sheet with faint pencil floor-plan lines, a wooden ruler, a small plant, warm ivory paper, one orange pencil as the accent, soft daylight, restrained, generous negative space --ar 3:2 --style raw --v 7
  ```
  File `public/about/about-hero.jpg`.
- **Checklist preview** (lead magnet): `--ar 4:5`.
  ```
  a printed checklist on warm ivory paper on a light desk, soft daylight, a pencil, one orange paperclip accent, top-down, restrained, generous margin --ar 4:5 --style raw --v 7
  ```
  File `public/lead/checklist-preview.jpg`.
- **Icon system** (room icons x6, free-tools icons x3, guide topic glyphs): Recraft V3 vector, single-weight green line on transparent, optional one orange accent. Per-icon seed:
  ```
  minimal single-weight line icon, [subject], geometric, calm, flat, no fill, deep green stroke on transparent, centred, generous padding
  ```
  Subjects - rooms: bed, stove/pot, sofa, dining table, bath, balcony rail; tools: a simple calculator, an open book, a compass rose; topics: one glyph per guide cluster. Files `public/icons/<name>.svg`.

---

## 6. Copy-paste prompt library (grouped by AI tool)

### Recraft V3 (vector - the cover diagrams, symbols, icons)

Use the diagram prompts in section 4 and the icon seed in section 5. Style: "line art, single weight, no fill." Stroke `#0e3b2c`; one element `#d9531a`. Export SVG + a 2000px PNG. Pair with the vector negative prompt (section 1).

### Illustrator / Photoshop (manual - every cover)

Build the ivory canvas at the exact size, place the Recraft diagram, set the title + subtitle in Hanken Grotesk (green), add the heart-house mark, confirm the single orange accent, export PNG (sRGB).

### Midjourney v7 / Flux 1.1 Pro (lifestyle media only)

Use the section 5 photography prompts. Global suffix `--style raw --v 7`. Pair with the still-photography negative via:

```
--no mystical, glowing, crystals, text, watermark, people, luxury, spa, lanterns, dark, cluttered
```

For Flux, drop the `--ar/--v` flags, set the aspect in the UI, and put the full still-photography negative in the negative field.

---

## 7. Production checklist

| Asset | Class | Needed | Generated | Approved | Exported | Installed |
|--|--|--|--|--|--|--|
| Compass cover (thumb + portrait) - compass-rose diagram | A | yes | - | - | - | - |
| Compass samples 1-3 | A | yes | - | - | - | - |
| Complete Home cover (thumb + portrait) - nine-sector floor plan | A | yes | - | - | - | - |
| Complete Home samples 1-3 | A | yes | - | - | - | - |
| Couple cover (thumb + portrait) - two intersecting diagrams | A | yes | - | - | - | - |
| Couple samples 1-3 | A | yes | - | - | - | - |
| Move-In cover (thumb + portrait) - doorway + calendar | A | yes | - | - | - | - |
| Move-In samples 1-3 | A | yes | - | - | - | - |
| 7-Day Reset cover (thumb + portrait) - seven-step sequence | A | yes | - | - | - | - |
| Homepage hero | B | optional | - | - | - | - |
| About hero | B | optional | - | - | - | - |
| Checklist preview | B | optional | - | - | - | - |
| Per-product lifestyle hero (5) | B | optional | - | - | - | - |
| Icon set (rooms / tools / topics) | B | yes | - | - | - | - |

Install path convention: `public/products/<slug>/cover-thumb.png`, `cover-portrait.png`, `sample-1.png`..`sample-3.png`; lifestyle media under `public/hero/`, `public/about/`, `public/lead/`, `public/social/`, `public/icons/`.

---

## 8. DEFERRED - video production (prompts + storyboards only)

Not built into the website in this round. No video component ships now. Same visual identity. Tools: b-roll clips -> Runway Gen-3 / Kling 1.6 / Luma; talking presenter -> HeyGen (owner or avatar); captions burned in for sound-off viewing.

**Two negative-prompt profiles for video:**

- *B-roll (no presenter):* the still-photography negative (section 1), which excludes people and hands.
- *Presenter shots (HeyGen or filmed):* a presenter profile that does NOT exclude people or hands. Use: `distorted anatomy, extra fingers, deformed hands, waxy skin, uncanny, dark cinematic lighting, glowing, mystical, cluttered background, unreadable on-screen text`.

### V1. Homepage hero ambient loop (b-roll)

- Placement: site hero. 16:9, 9-12s, muted, looped, poster fallback.
- Storyboard: (s1) soft morning light across an ivory wall; (s2) a slow push toward a window seat; (s3) light settling on one orange cushion.
- Per-shot prompt (Runway image-to-video from a Midjourney still): `slow calm push-in, gentle light shift across a serene daylit ivory living room, almost still`.
- VO: none. On-screen text: none. Motion: 5% slow push, no cuts. Music: soft ambient pad, low.
- Negative: b-roll profile + `fast motion, flicker, morphing`.
- Thumbnail: the window-seat still. Caption/CTA: n/a.
- Files: `public/video/home-hero-loop.mp4` + `.webm` + `poster.jpg`.

### V2. Personal Compass explainer (presenter + screen capture)

- Placement: product page + (later) social. 16:9 + 9:16, 45-60s, click-to-play, captioned.
- Storyboard + per-shot prompt:
  - s1 (0-5s, hook): presenter to camera, "Your home already has directions that suit you." [HeyGen, calm ivory set. PRESENTER negative profile - do not exclude people or hands.]
  - s2 (5-20s): screen-capture of the free calculator - enter a birthday, the Kua + eight directions appear.
  - s3 (20-35s): "Your Kua number offers four traditionally supportive directions, and four to handle with care," over a clean motion-graphic of the eight directions.
  - s4 (35-50s): the Compass PDF (bed / desk / dining) page-flip. [b-roll profile.]
  - s5 (50-60s): CTA card.
- Voiceover: the storyboard lines, calm and affirmative, no outcome promises.
- On-screen text: key phrases, Hanken Grotesk, green on ivory. Motion: gentle cuts, no zooms. Music: warm minimal piano, low.
- Thumbnail prompt: `calm ivory set, a person mid-sentence, warm daylight, one orange accent, editorial` (presenter profile).
- Caption/CTA: "Find your Kua number free, then read your Compass. Link in bio."
- Files: `public/video/compass-explainer-16x9.mp4` (+ 9x16 variant).

### V3. Room walkthrough template + Bedroom + Kitchen

- Placement: reels + product/guide pages. 9:16 + 16:9, 25-40s, captioned.
- Template storyboard: (hook) "How an architect reads a [room]"; (read) the thing to look at first; (why) one calm line, with the label said aloud ("the tradition reads it this way; here is the design reason"); (one change) a single adjustment; (CTA).
- Bedroom: read = the bed's relationship to the door (command position, a traditional rule; prospect-refuge is the design reason). Kitchen: read = the stove, the sink, and a clear path between them.
- Per-shot prompts: Midjourney stills of the calm room -> Runway gentle motion (b-roll profile); or owner-filmed b-roll.
- Voiceover: the four lines. On-screen text: the hook + the read. Music: soft.
- Thumbnail: the room still with the hook text added manually.
- Caption/CTA: "Find your free Kua number. Link in bio."
- Files: `public/video/room-bedroom-9x16.mp4`, `room-kitchen-9x16.mp4`. (Living, dining, bathroom, terrace: same template, deferred.)

### V4. Reel library (3 to start)

- 9:16, 7-20s, hook within 1.5s, captioned.
- R1: "Your Kua number offers four traditionally supportive directions." (hook still -> calculator capture -> CTA).
- R2: "Three feng shui changes that cost nothing." (three quick b-roll changes + captions).
- R3: "Where the tradition would put your desk, by your Kua number." (desk still -> directions graphic -> CTA).
- Each: per-shot Midjourney/Runway prompt of the calm scene (b-roll profile); voiceover optional; burned captions; soft music; thumbnail = first frame + manual hook text; CTA "Free Kua calculator, link in bio."
- Files: `public/video/reel-1-9x16.mp4`, `reel-2-9x16.mp4`, `reel-3-9x16.mp4`.
