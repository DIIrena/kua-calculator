# Phase F: discovery and promotion assets

**Date:** 2026-06-16
**Status:** Asset pack. Owner produces the visuals and decides all publishing. No automation is wired.

## What this extends (and what it does not change)

The June 8 promotion system stands: `spec/anchor-pages-2026-06-08.md` (the 5 guide anchors), `spec/channels-2026-06-08.md` (channel plan), `spec/promotion-calendar-2026-06-08.md` (the 30-day calendar), `spec/brand-pin-palette.md` (the locked pin palette). That plan deliberately promoted guide pages because products were not launch-ready and Pinterest audiences want ideas, not "buy my PDF."

Products are now launch-ready (real covers where they exist, a guarded preview, and a fulfillment-confidence block on every product page). This document does two things only:

1. Updates the priority set to a **blend** of the proven guide anchors plus the launch-ready products.
2. Adds the asset prompts and copy for that blend, including product-cover pins where a real cover exists, diagram/text pins where it does not, and prepared-only email snippets.

It does NOT change the channel mix, the 30-day cadence, the Reddit posture, or the email-deferred decision. Pinterest stays first; email stays prepared, not sent.

## The 5-pick (blended) and why

| # | Promote | Type | Why it is in the first five |
|--|--|--|--|
| 1 | Free Kua Calculator | Free tool (hook) | The top of the funnel. Everyone can use it free; it is the lowest-friction first touch and feeds everything else. |
| 2 | 2026 Annual Planner | Product ($19) | The one product with full real cover artwork and sample pages, so it can be promoted visually today. The clearest commercial anchor. |
| 3 | Personal Feng Shui Compass | Product ($14) | The entry paid product and the first paid step in the funnel. Its cover is not produced yet, so it gets a diagram/text pin for now. |
| 4 | Southeast Wealth Area | Guide anchor | Proven Pinterest + SEO anchor from June 8. Keeps the authority-first, idea-led posture. |
| 5 | How to Read Any Room | Guide anchor | Proven Pinterest anchor. The "save-for-later" walkthrough that travels well on Pinterest. |

Not fully product-forward on purpose: guide anchors keep the calm, idea-led brand voice that differentiates against the manifestation-heavy feed, and they earn the saves that paid pins rarely do.

## Locked pin spec (recap)

- Size: **1000 x 1500** vertical.
- Palette (from `brand-pin-palette.md`): paper `#fcfcf8`, deep ink `#0e3b2c`, single accent clay `#d9531a`. One accent, never more.
- No people, no incense, no Buddha statues, no red envelopes, no oranges (fruit), no money trees, no coins, no Chinese-character overlays, no glowing/energy effects.
- Diagrams are generated as flat vector line art (Recraft V3, single-weight green stroke, one clay accent), exported, then the real title typography is set by hand in Canva or Illustrator (Hanken Grotesk). Same generated-vs-manual split as `spec/featured-product-asset-system.md`.
- Shared diagram negative prompt: `photograph, photorealistic, 3D, shading, gradients, drop shadow, texture, clutter, busy detail, text, words, letters, numbers, watermark, logo, people, mystical symbols, glowing, neon, red lanterns, coins, incense`.

---

## Asset prompts, per the five

### 1. Free Kua Calculator (guide anchor: find-your-kua-number)

- **Pin shape:** East/West compass chart (the master template from the June 8 plan).
- **Recraft prompt:** `flat vector line illustration of an eight-direction compass rose split down the middle into an East group and a West group, single-weight deep-green strokes on a warm paper ground, one small clay accent on the centre, architectural technical-drawing feel, precise, symmetrical, no text, generous margin` + shared negative.
- **Manual overlay (Canva):** title `Your Kua Number and Your Four Directions`; small footer `Free calculator at myfengshuihome.com`. Add the Kua numbers (1, 3, 4, 9 East / 2, 5, 6, 7, 8 West) as set type, not in the generated art.
- **Board:** Compass School Basics. **Links to:** `/guide/compass-school/find-your-kua-number` (the anchor page, not the calculator root).
- **Description:** `A simple chart of the four supportive directions for each Kua number. Free calculator at myfengshuihome.com.`

### 2. 2026 Annual Planner (product, real cover exists)

This is the only item with real cover artwork, so it gets a product-cover pin (no AI generation needed) plus a diagram pin.

- **Pin A, product-cover pin (Canva composition, no AI):** place the real `public/products/annual-feng-shui-planner-2026/cover-portrait.png` on a paper `#fcfcf8` ground, centred, with a soft shadow. Headline above: `The 2026 Feng Shui Planner`. Subline below: `The year ahead for your home, sector by sector.` Footer: `myfengshuihome.com`. No price on the pin (Pinterest dislikes hard price overlays); price lives on the page.
- **Pin B, year-sector diagram (Recraft prompt):** `flat vector line illustration of a 3 by 3 nine-sector annual chart, a small year marker, one sector cell softly accented in clay, single-weight deep-green strokes on warm paper, architectural plan-drawing feel, no text, generous margin` + shared negative. Overlay: `A calm read of the 2026 feng shui year`.
- **Board:** Feng Shui by the Calendar. **Links to:** `/products/annual-feng-shui-planner-2026`.
- **Description:** `A printable read of the 2026 feng shui year, sector by sector, with a day-by-day calendar. myfengshuihome.com.`

### 3. Personal Feng Shui Compass (product, no cover yet)

No real cover exists, so this gets a diagram/text pin now. Replace with a cover-based pin once the Compass cover is produced (see `spec/featured-product-asset-system.md`, Brief 1).

- **Recraft prompt:** `flat vector line illustration of an eight-point compass rose inside an octagonal ring with a small house-and-heart glyph at the centre, one compass arm accented in clay, single-weight deep-green strokes on warm paper, precise, symmetrical, no text, generous margin` + shared negative.
- **Manual overlay:** title `Your Kua, Your Eight Directions`; subline `A personalised reading for your own home.` Footer URL.
- **Board:** Compass School Basics. **Links to:** `/products/personal-feng-shui-compass`.
- **Description:** `A short personalised PDF that reads your Kua number and your eight directions for the bed, the desk, and the dining seat. myfengshuihome.com.`

### 4. Southeast Wealth Area (guide anchor)

- **Pin shape:** floor plan with the six levers (per the June 8 channel plan).
- **Recraft prompt:** `flat vector line illustration of a top-down residential floor plan with the south-east corner softly tinted clay, six small labelled icon slots arranged around it, single-weight deep-green strokes on warm paper, architectural plan-drawing feel, no text, generous margin` + shared negative.
- **Manual overlay:** title `The Southeast Corner, Read in Six Steps`; the six lever labels (element, placement, visibility, proportion, timing, room use) set by hand.
- **Board:** Reading Your Home Corner by Corner. **Links to:** `/guide/money/the-southeast-wealth-area-and-how-to-read-it`.
- **Description:** `A calm way to read the south-east area of your home in six steps. No activating, no manifesting. myfengshuihome.com.`

### 5. How to Read Any Room (guide anchor)

- **Pin shape:** four-step checklist over a small floor plan.
- **Recraft prompt:** `flat vector line illustration, top third a small top-down home floor plan, lower two-thirds four empty numbered checklist rows, single-weight deep-green strokes on warm paper, one clay accent on the first row, no text, generous margin` + shared negative.
- **Manual overlay:** title `How to Read Any Room: a 4-step walk`; the four step labels set by hand (light, what the main seat sees, command position, use vs setup). Footer URL.
- **Board:** Feng Shui Walkthroughs. **Links to:** `/guide/rooms/how-to-read-any-room`.
- **Description:** `Walk your home like a feng shui reader: four things to notice in every room. myfengshuihome.com.`

---

## Launch posts (Pinterest / Instagram captions, ready)

Calm voice, no urgency, no consultation language, no fortune-telling verbs.

**Post 1 (the free tool, the hook):**
`Your birth year and gender point to four directions the tradition says support you, and four to handle with more care. You can find yours in about ten seconds, free, with no account. Calm, practical, no fortune-telling. myfengshuihome.com`

**Post 2 (the architect-led posture):**
`Most feng shui advice mixes the practical with the mystical and labels nothing. We separate them: which moves the design evidence supports, which are traditional, and which are simply preference, said plainly on every page. Written by an architect. myfengshuihome.com`

**Post 3 (the Planner, soft commercial):**
`If you like knowing which days suit starting things and which suit finishing them, the 2026 Planner reads the year for your home, sector by sector, with a day-by-day calendar. A printable book, yours to keep. myfengshuihome.com`

---

## Email snippets (PREPARED ONLY - do not send yet; no automation wired)

These are drafts for when the owner decides the list is ready. No send. No sequence wired. Per the June 8 decision, the planner waitlist send waits until the list crosses roughly 150 subscribers, and general sends wait for an explicitly opted-in list.

**Snippet A - soft launch / welcome (general list):**
> Subject: A calm way into feng shui for your home
>
> Hello, and thank you for being here. My Feng Shui Home is a quiet, practical guide to feng shui for real homes, written by an architect. If you would like somewhere to start: the free Kua calculator gives you your number and your eight directions in about ten seconds, and the guide reads the home room by room with no jargon and no promises. Nothing here asks you to believe anything. It just gives you a structured way to notice your space. - I.D.

**Snippet B - one practical idea (nurture):**
> Subject: One small change you can try tonight
>
> Here is a move that costs nothing: from where you sleep, can you see the door without lying directly in its path? The tradition calls this the command position, and the design reason is simple - a clear view of the way in is easier to settle near. Try shifting the bed and give it a week. If you want your own directions read for your Kua, the Personal Feng Shui Compass does exactly that. - I.D.

**Snippet C - the Planner (waitlist, when the list is ready):**
> Subject: The 2026 Feng Shui Planner is ready
>
> The 2026 Planner you asked about is finished and available. It reads the feng shui year for your home, sector by sector, with a day-by-day calendar from July 2026 through February 2027, delivered as a printable PDF, an EPUB, and a phone calendar file. One-time, yours to keep, with a 7-day refund. No subscription, no upsell. If the timing is not right, the calculator and the guide stay free forever. - I.D.

---

## OG / social images (shipped in code this phase)

A generated, branded OG card (`/api/og/product/[slug]`, 1200 x 630, title + price + one calm line, brand colours) is now wired into all 44 product pages, the homepage (the calculator card), and the shop. These are generated cards, not covers, so they work for every product whether or not a cover exists. The Planner keeps its real cover as its OG image.

## What NOT to do (carry-over)

- No banned imagery on any pin (list above). No `activate`, `manifest`, or `charge` anywhere.
- No paid ads on any channel, no tracking pixels on `/kua-calculator` or `/embed`.
- No consultation or service language. No urgency, no countdowns, no scarcity.
- No email send and no automation until the owner decides the list is ready.
- Pins link to the relevant page, not the calculator root, and never to a checkout.
