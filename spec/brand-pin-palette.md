# Brand pin palette and layout

**Date:** 2026-06-09 (palette swap), 2026-06-10 (layout + typography lock)
**Scope:** Every Pinterest pin for myfengshuihome.com
**Status:** Owner-approved. Use as the locked reference for every future pin file.

---

## What this document does

Codifies the locked brand palette, the pin canvas, the layout zones, the logo placement, the typography, and the banned-imagery list, so any future pin (compass chart, floor-plan diagrams, six-lever charts, walkthrough checklists, annual-cures split-panels, etc.) follows the same identity without re-asking.

This file is the Session 2b deliverable from `spec/promotion-calendar-2026-06-08.md`. The full brand system (web, email, PDF) lives in `brand/BRAND_BOOK.md`; this file is the pin-specific subset.

---

## Pin canvas

- **Size:** 1000 x 1500 px
- **Color mode:** RGB (Pinterest is screen, not print)
- **Ratio:** 2:3 (Pinterest standard)

---

## Brand palette (locked)

Matched to Pattern Palace 2026-06-09. Token names from the kua-calculator codebase are kept; only hex values changed.

| Role | Hex | RGB |
|---|---|---|
| Pool-table green | `#0e3b2c` | 14, 59, 44 |
| Ivory | `#fcfcf8` | 252, 252, 248 |
| True orange | `#d9531a` | 217, 83, 26 |

Secondary tokens (rarely used in pins, present for consistency with site):

| Role | Hex |
|---|---|
| Ivory-alt panel | `#f2f2ee` |
| Green-dark hover | `#0a2a20` |
| Orange-dark hover | `#b8430e` |
| Muted green-gray | `#4f5b53` |
| Soft border | `#e2dac5` |

### Single-accent rule

True orange is the only accent. It appears as the orange divider line and as the logo at the top of every pin. It must NOT appear as a background fill, a body text color, or a title text color. It must NOT appear in middle-zone artwork as a flood fill; one thin orange line or one small tinted detail per pin is the ceiling.

---

## Layout zones

Every pin uses three horizontal zones with inverted color blocks:

```
+------------------------------------------------+ y = 0
|                                                |
|    POOL-TABLE GREEN BLOCK                      |
|    1. Orange heart-house logo, centred,        |
|       ~160 px tall, top ~y=50                  |
|    2. Title text in ivory, EB Garamond Bold,   |
|       baseline ~y=315                          |
|                                                |
+================================================+ y = 385   orange divider, 2 pt
|                                                |
|                                                |
|                                                |
|    IVORY MIDDLE                                |
|    Variant artwork goes here                   |
|    (compass rose, floor plan, six-lever        |
|    grid, walkthrough checklist, etc.)          |
|                                                |
|                                                |
|                                                |
+------------------------------------------------+ y = 1387.7
|    POOL-TABLE GREEN BLOCK                      |
|    URL strip in ivory, EB Garamond Bold,       |
|    baseline ~y=1457                            |
+------------------------------------------------+ y = 1500
```

| Zone | Y range | Fill | Holds |
|---|---|---|---|
| Top block | 0 to 385 | Pool-table green `#0e3b2c` | Orange logo + ivory title |
| Divider | 385 | True orange `#d9531a` 2 pt stroke | Full-width single line |
| Middle | 385 to 1387.7 | Ivory `#fcfcf8` | Variant artwork only |
| Bottom block | 1387.7 to 1500 | Pool-table green | Ivory URL strip |

---

## Logo

- **Source:** `projects/kua-calculator/assets/logo.svg` (the heart-house brand mark).
- **Color on pins:** True orange `#d9531a`.
- **Size:** ~160 px tall (and the same wide, since the mark is square).
- **Position:** Centred horizontally at x=500. Top edge at ~y=50, bottom edge at ~y=210.

The logo is the single brand element that anchors every pin. Do not replace it with a different mark, do not crop it, do not skew or rotate it.

---

## Typography

### Title

- **Font:** EB Garamond Bold (free on Google Fonts, no subscription).
- **Size:** 72 pt.
- **Color:** Ivory `#fcfcf8` (the title sits on the green top block).
- **Stroke:** None. Fill only.
- **Align:** Center horizontally, baseline ~y=315.
- **Live text only on master and variants.** Outline only on the final exported PNG, if at all.

### URL strip

- **Font:** EB Garamond Bold.
- **Size:** 36 pt.
- **Case:** Lowercase letters. Type literally `myfengshuihome.com`. Do not apply All Caps (`TT`) and do not apply Small Caps (`Tt`). Plain lowercase.
- **Tracking:** Illustrator Character panel `VA` field set to `50`.
- **Color:** Ivory `#fcfcf8`.
- **Stroke:** None.
- **Align:** Center horizontally, baseline ~y=1457.

The font was picked from Google Fonts on 2026-06-09 (Cormorant Garamond and Lora were the runners-up). Owner installed EB Garamond locally and confirmed Bold weight as the brand pin face.

---

## Banned imagery on every pin

The brand voice is calm-practitioner / editorial-atelier, not fortune-telling / Kinfolk-rustic. Do not include:

- Incense, Buddha statues, red envelopes, oranges (the fruit), coins, money trees, lucky bamboo.
- Chinese-character overlays.
- People, faces, body parts.
- Manifestation / vision-board / law-of-attraction aesthetics.
- Rustic ceramic, hand-thrown clay pottery, warm wood textures (these clash with the new ivory + green + orange palette).
- High-contrast display serifs (Didot, Bodoni) in headlines.
- Stock photography of any kind.

The aesthetic target is closer to a Pattern Palace editorial diagram than a typical feng shui Pinterest pin. Line-art, two-color, calm.

---

## Working files

Pin master files live on the owner's local disk, NOT in the git repo (Adobe `.ai` files are too large and not useful in git):

- Master: `Desktop/MFSH Pins/00 Masters/MFSH-master-pin.ai`
- Variant: `Desktop/MFSH Pins/01 Compass Chart/compass-chart.ai` (Session 3)
- Swatch library: `Desktop/MFSH Pins/MFSH-Brand.ase`
- Palette reference text: `Desktop/MFSH Pins/MFSH-palette.txt`
- Reference SVG (live-text rebuild template): `Desktop/MFSH Pins/00 Masters/master-template-reference.svg`

Final exports go to `Desktop/MFSH Pins/<folder>/exports/<slug>-YYYY-MM-DD.png` and from there to Pinterest. Source `.ai` files stay on the owner's machine.

---

## Pointers

Locked specs that drive this pin system:

- `spec/anchor-pages-2026-06-08.md` - the 5 anchor pages this pin system promotes
- `spec/channels-2026-06-08.md` - per-anchor channel plan (which pin gets which board)
- `spec/promotion-calendar-2026-06-08.md` - 30-day execution schedule
- `spec/week-1-session-2-pin-template.md` - Session 2 walkthrough (was Canva, now adapted for Illustrator)
- `brand/BRAND_BOOK.md` - the full brand system (web, email, PDF), of which this is a subset
- `projects/pattern-palace/static/css/styles.css` - the source palette this brand was matched to

Related project memory:

- [[project-mfsh-brand-palette]] - the brand palette decision and pin layout lock
- [[user-design-tools]] - owner uses Adobe Illustrator + Photoshop, not Canva
- [[feedback-stepwise-ops]] - the granular-walkthrough shape for ops checklists

---

## Out of scope for this document

- The actual artwork inside the middle zone (compass rose, floor plan, six-lever grid). Each pin gets its own session for that.
- The compass rose East / West group split itself. That is Session 3.
- Pinterest board structure (lives in `spec/channels-2026-06-08.md`).
- Per-pin description copy (lives in the per-session walkthroughs).
- Anything outside Pinterest (web, email, PDF use `brand/BRAND_BOOK.md` as canonical).
