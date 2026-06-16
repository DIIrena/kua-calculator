# Phase H: visual media system (production dashboard)

**Date:** 2026-06-16
**Status:** Dashboard prepared for review. No code edited, no images generated, nothing published.

## What this is

One place for every image and video decision, so the plan stops being scattered. It consolidates and points at, rather than duplicates:

- `spec/featured-product-asset-system.md` - the six product-cover briefs and the lifestyle/video section.
- `spec/phase-f-promotion-2026-06-16.md` - the blended 5-pick, pin prompts, launch posts, email snippets.
- `spec/brand-pin-palette.md` - the locked pin canvas, palette, three-zone layout, typography, banned imagery.
- `spec/week-1-session-2-pin-template.md` and `spec/week-1-session-3-compass-chart.md` - the hand-built Illustrator pin workflow (master template + the first published pin).
- `spec/channels-2026-06-08.md` and `spec/promotion-calendar-2026-06-08.md` - which pin goes to which board, on which day.

When this dashboard and a referenced spec disagree on a detail, the referenced spec wins for that detail; this file is the index and the priority order.

## Identity rules (apply to every asset, no exceptions)

- **Palette:** ivory `#fcfcf8`, deep green `#0e3b2c`, true orange `#d9531a`. Orange is a single accent only, never a background or a body/title text colour. (The site canvas and pins both use `#fcfcf8`; the earlier `#fbf7ee` in the cover briefs should be read as the same ivory and aligned to `#fcfcf8`.)
- **Identity:** architecture-led, calm, editorial-atelier. Diagrams, covers, floor plans, gentle movement, and real product previews over generic photography.
- **Banned:** Buddha statues, incense, red envelopes, coins, money trees, dragons, lucky bamboo, oranges (the fruit), Chinese-character overlays, dark luxury interiors, cluttered AI interiors, generic stock photography, faces (the author is "I.D.", no face), glowing/energy effects, manifestation/vision-board aesthetics.
- **Language on any overlay or caption:** no fortune-telling verbs (activate, manifest, charge), no outcome promises, no consultation/service language, no fake testimonials, no urgency.
- **Type:** Hanken Grotesk for the website and product covers; EB Garamond Bold for pins (per the locked pin palette).

---

## 1. Current asset inventory

### Images that already exist

| Asset | Where | Notes |
|--|--|--|
| 11 product covers (square `cover-thumb.png` + portrait `cover-portrait.png`) | `public/products/<slug>/` | The printables + the Planner. Wired to shop cards and product pages. |
| Sample interior pages (`sample-1/2/3.png`) for 10 of those | `public/products/<slug>/` | Drive the "Look inside" preview. The Planner has a cover but differently-named samples. |
| Generated OG/social cards | `/api/og/product/[slug]` (code, shipped) | 1200x630 branded cards for all 44 products + homepage + shop. Not files; generated on demand. |
| Compass-chart Pinterest pin | Owner's disk + live on the `Compass School Basics` board | The first published pin (Session 3). |
| Brand logo (heart-house) | `projects/kua-calculator/assets/logo.svg` | The single brand mark; orange on pins. |

### Products with a cover (11)

annual-feng-shui-planner-2026, good-days-calendar-2026, bedroom-reset, business-money-feng-shui, home-diagnostic-workbook, daily-ritual-pack, cures-catalog, healthy-home-audit, five-elements-workbook, starter-deck, bazi-basics.

### Products with sample pages (10)

The 11 above except the Planner (whose sample pages are named differently and which renders its own cover, so it is preview-level "cover", not "full").

### Products with a portrait cover only (3)

personal-feng-shui-compass, extended-personal-kua-report, move-in-kit. Each has a `cover-portrait.png` sample cover (shown on the product page) but no square `cover-thumb.png`, so their shop cards stay text-first until a thumb is produced.

### Products with no art (30)

The 22 single-topic compasses (bedroom-compass ... year-ahead-compass) and 8 others: complete-home-compass, couple-compatibility-compass, all-nine-pillars-compass, all-twelve-spaces-compass, pick-three-pillars, pick-three-spaces, whole-home-starter-bundle, seven-day-home-reset. These have no artwork yet and currently show the honest "what you receive" anchor; they are the priority for owner-produced covers. (11 with full covers + 3 portrait-only + 30 with none = 44.)

### Pages that feel too text-only

| Page | Today | The gap |
|--|--|--|
| Homepage `/` | Text hero + the calculator island | No hero image; the first screen is type-only above the calculator |
| `/about` | All prose | No founder/architect visual; the credibility page has nothing to look at |
| `/guide` + the 5 anchor pages | Prose + the generated OG card | No in-page diagrams; the anchor diagrams live only as pins, not on the pages they promote |
| The 30 art-less product pages | Honest "what you receive" anchor | Truthful but visually light; covers are the real fix (owner-produced) |
| `/products` featured row | Planner cover + text-first cards | Mixed look until more featured covers exist (accepted, calm) |

---

## 2. Website visual improvement plan

Diagram-first and architecture-led, per the identity rules. Each item notes the asset, the reason, and whether shipping it needs code.

| Surface | Visual to add | Why | Code? |
|--|--|--|--|
| Homepage `/` | One calm architectural line illustration as a hero band beside/under the headline (a simple floor plan with a compass overlay, green line on ivory, one orange accent). Optional alt: a calm, uncluttered, daylit real-room photo. | Gives the first screen a brand image without competing with the calculator. Diagram preferred over a photo. | Yes (add an image to the hero) |
| `/guide` | A small "what the four labels mean" diagram strip is already present as the legend; optionally a single line-art "reading a home" header diagram. | Reinforces the system visually at the library entrance. | Yes (one header image) |
| `/products` | Keep the curated layout; the real win is more product covers (owner-produced) filling the mixed grid. No new decorative art. | The grid reads as a shop once covers land; nothing else needed. | No (covers drop into existing wiring) |
| Product pages | The owner-produced diagram covers for the 30 art-less products (per the cover briefs), then real sample pages where the PDF supports it. | Turns the honest anchor into a real cover + "Look inside". The single highest-impact visual work. | Yes (one line in `lib/product-assets.ts` per product, after the file is installed) |
| `/about` | An architect's-desk line illustration (a drafting sheet with faint floor-plan lines, a ruler, one orange pencil), or a calm real desk photo from above, no face. | The credibility page earns a calm, on-identity image that keeps "I.D." private. | Yes (add an image to the about hero) |
| Top 5 guide anchor pages | Embed each anchor's diagram (the same artwork as its pin) as a figure inside the page: compass chart, southeast six-lever floor plan, bed-stove-door plan, read-any-room checklist, annual-cures split. | The diagram that earns the Pinterest save should also live on the page it promotes. This is a figure embed, not a content rewrite. | Yes (one figure per page; deferred, and only if it does not count as a guide rewrite) |

---

## 3. Image prompt library

The covers and pins follow established systems; this section indexes them and adds the website and about prompts. Generated diagrams use Recraft V3 (flat vector line, single green stroke, one orange accent); the real typography is set by hand afterward (Illustrator for pins and covers).

Shared diagram negative prompt: `photograph, photorealistic, 3D, shading, gradients, drop shadow, texture, clutter, busy detail, text, words, letters, numbers, watermark, logo, people, faces, mystical symbols, glowing, neon, red lanterns, coins, incense, Buddha, dragon`.

### 3a. Product cover prompts

Use the six briefs in `spec/featured-product-asset-system.md` (Personal Compass, Complete Home, Couple, Move-In, 7-Day Reset, plus the Planner template). Each is a diagram-led cover: ivory ground, a distinct green line diagram, one orange accent, real title set by hand. Do not re-spec here; that file is canonical. The single-topic compasses reuse the Personal Compass compass-rose system at smaller scale.

### 3b. Guide diagram prompts (anchor artwork = pin middle-zone artwork)

These double as the ivory middle-zone artwork in the locked pin template and as in-page figures.

- **Compass chart (find-your-kua):** DONE (Session 3). Eight-direction rose split East/West, Kua numbers set by hand.
- **Southeast six-lever floor plan:** `flat vector line illustration, top-down residential floor plan, the south-east corner softly tinted clay, six small empty icon slots arranged around it, single-weight deep-green strokes on ivory, architectural plan-drawing feel, no text` + shared negative. Labels (element, placement, visibility, proportion, timing, room use) set by hand.
- **Bed-stove-door plan:** `flat vector line illustration, overhead plan of three rooms, a bed against a solid wall with a clear view of the door, a stove with the cook facing the room, an entry that does not point straight through, three small numbered nodes, single-weight deep-green strokes on ivory, no text` + shared negative.
- **Read-any-room checklist:** `flat vector line illustration, top third a small top-down home floor plan, lower two-thirds four empty numbered checklist rows, one clay accent on the first row, single-weight deep-green strokes on ivory, no text` + shared negative.
- **Annual-cures split (month 2):** `flat vector line illustration split into two stacked panels, top a nine-sector annual chart, bottom a row of permanent-fixture glyphs (bed, stove, door), one clay accent on a single calendar mark, single-weight deep-green strokes on ivory, no text` + shared negative.

### 3c. Homepage visual prompts

- **Primary (diagram, preferred):** `flat vector line illustration of a simple home floor plan with a light eight-direction compass overlaid at the centre, single-weight deep-green strokes on a warm ivory ground, one small terracotta-orange accent on one direction, architectural plan-drawing feel, calm, generous negative space, no text` + shared negative. Export wide (1920x1080) with the left 40% clear for the live HTML headline. Install `public/hero/home-hero.png` (or `.svg`).
- **Optional (photo, only if calm and uncluttered):** `editorial photograph of a calm, light-filled corner of a real home, a window seat, restrained styling, one small terracotta-orange object as the only accent, warm ivory walls, natural daylight, generous negative space, architectural --ar 16:9 --style raw --v 7`. Midjourney v7. Avoid dark, luxury, or cluttered results.

### 3d. About / founder-story visual prompts

No face (the author is "I.D."). Architecture-led.

- **Primary (diagram/illustration):** `flat vector line illustration of an architect's drafting desk seen from above, a clean sheet with faint pencil floor-plan lines, a wooden ruler, a single orange pencil as the only accent, single-weight deep-green strokes on warm ivory, calm, generous margin, no text` + shared negative. Install `public/about/about-hero.png`.
- **Optional (photo):** `editorial top-down photograph of an architect's calm desk, a clean drafting sheet with faint floor-plan lines, a ruler, a small plant, warm ivory paper, one orange pencil accent, soft daylight, restrained --ar 3:2 --style raw --v 7`. No hands, no face.

### 3e. Pinterest pin prompts

The pin itself is hand-built in Illustrator from the locked master template (`brand-pin-palette.md`: 1000x1500, green top block with the orange logo + EB Garamond Bold ivory title, orange divider at y=385, ivory middle, green bottom URL strip). The AI prompt only generates the ivory middle-zone diagram (use 3b above). Boards, target URLs, and descriptions are in `spec/phase-f-promotion-2026-06-16.md` and `spec/channels-2026-06-08.md`. Do not put price overlays on pins.

### 3f. Social post image prompts

- **Generated OG/share cards:** DONE in code (`/api/og/product/[slug]`, 1200x630, title + price + one line, brand colours). These cover link-shares automatically.
- **Standalone social cards (Instagram 1080x1350 / 1080x1080):** reuse the pin middle-zone diagrams on the ivory ground with the green/orange identity and a Hanken Grotesk caption set by hand. Same banned list. No price, no urgency.

---

## 4. Video prompt library

Videos are deferred from the website (no video component ships yet, per the asset system). These are prepared prompts; embedding any of them is a future code change. Founder content shows no face: hands, drawings, screen capture, and voiceover only, or a transparently-described avatar. Captions are burned in for sound-off viewing.

Two negative profiles: b-roll/diagram shots exclude people; the founder voiceover shots may show hands and a desk but never a face.

### Video 1 - Kua calculator walkthrough (15s)

- **Purpose:** show how fast and calm the free tool is; convert curiosity into a first use.
- **Page/channel:** product/homepage (later), Pinterest, Instagram, YouTube Shorts.
- **Visual style:** ivory screen, green/orange UI accents, gentle cuts, no people.
- **Shot list:** (1) ivory title card "Find your Kua number, free" 2s; (2) screen capture: type a birthday into the calculator 5s; (3) the result appears, eight directions highlighted 5s; (4) CTA card "myfengshuihome.com" 3s.
- **AI video prompt (for any non-capture b-roll):** `slow, calm push across a clean ivory interface with deep-green text and one orange accent, no people, minimal motion`.
- **Voiceover:** "Your birthday points to four directions the tradition says support you, and four to handle with care. Find yours free, in about ten seconds."
- **On-screen text:** "Find your Kua number" / "Free, no account" / "myfengshuihome.com".
- **Music/sound:** soft minimal piano, low; a single soft chime when the result appears.
- **Thumbnail prompt:** `ivory card, the words space for a title, a small green compass rose, one orange accent, calm, no text baked` (title set by hand).
- **Filename:** `public/video/kua-calculator-walkthrough-15s.mp4` (+ `.webm`, + `poster.jpg`).
- **Primary platform:** website + Pinterest + Instagram + YouTube Shorts (9:16; 16:9 variant for the product page).

### Video 2 - How to read any room (20s)

- **Purpose:** teach the four-step walk; earn a save and a guide visit.
- **Page/channel:** Pinterest, Instagram, YouTube Shorts (promotes the guide anchor).
- **Visual style:** the read-any-room line diagram animating step by step, green on ivory, one orange accent.
- **Shot list:** (1) title "How to read any room" 2s; (2-5) four steps reveal one at a time over the floor-plan diagram, ~4s each; (6) CTA card 2s.
- **AI video prompt:** `gentle sequential reveal of a flat green-line floor-plan diagram on ivory, one numbered step lighting up at a time with a small orange accent, no people, calm`.
- **Voiceover:** "A reading is a walk, not a verdict. In each room, notice four things: how the light moves, what the main seat sees, whether it sits in command position, and what the room is asked to do."
- **On-screen text:** the four step labels; footer URL.
- **Music/sound:** soft, unhurried; a quiet tick as each step appears.
- **Thumbnail prompt:** `ivory card, a small green-line home floor plan, four faint numbered dots, one orange accent, no text baked`.
- **Filename:** `public/video/read-any-room-20s.mp4` (+ poster).
- **Primary platform:** Pinterest + Instagram + YouTube Shorts (9:16).

### Video 3 - 2026 Planner flip-through (20s)

- **Purpose:** show the real product so the Planner feels tangible.
- **Page/channel:** the Planner product page (later), Pinterest, Instagram.
- **Visual style:** the real Planner pages flipping on an ivory ground, calm daylight, no people; uses the real PDF spreads.
- **Shot list:** (1) the cover 3s; (2-4) a few interior spreads page-flipping (the year chart, a sector treatment, the day calendar) ~5s each; (5) CTA card 2s.
- **AI video prompt:** mostly real screen-recorded or rendered page flips; for any motion fill: `calm page-flip of a printed book on a warm ivory surface, soft daylight, no hands, no people`.
- **Voiceover:** "The 2026 Planner reads the feng shui year for your home, sector by sector, with a day-by-day calendar. A printable book, yours to keep."
- **On-screen text:** "The 2026 Feng Shui Planner" / "Printable. Yours to keep." / URL. No price overlay.
- **Music/sound:** warm minimal piano, low; soft page-turn sounds.
- **Thumbnail prompt:** use the real Planner cover, centred on ivory, soft shadow (no AI; reuse `cover-portrait.png`).
- **Filename:** `public/video/planner-flipthrough-20s.mp4` (+ poster).
- **Primary platform:** product page (16:9) + Pinterest + Instagram (9:16).

### Video 4 - Architect / founder story (30s)

- **Purpose:** the credibility piece; why an architect reads feng shui this way. No face.
- **Page/channel:** `/about` (later), YouTube Shorts, Instagram.
- **Visual style:** architect's hands at a drafting desk, pencil on floor-plan lines, calm daylight, ivory and green, one orange pencil; voiceover over the work; no face shown.
- **Shot list:** (1) a hand drawing a floor plan 6s; (2) a compass placed on the plan 6s; (3) a slow pan across a calm daylit room 6s; (4) a sheet labelled in clean type 6s; (5) CTA card 6s.
- **AI video prompt:** `top-down calm footage of hands drawing a simple floor plan with a pencil on warm ivory paper, a wooden ruler, one orange pencil, soft daylight, no face` (b-roll-with-hands profile; faces excluded).
- **Voiceover:** "I am an architect. I read feng shui the way I read a building: structure first, light and flow with it, and I say plainly which moves the design evidence supports and which are tradition. Architecture taught me a home must stand. Feng shui taught me it must breathe."
- **On-screen text:** "Architecture first." / "Feng shui with structure." / "Written by I.D." / URL.
- **Music/sound:** warm, restrained strings or piano, low; soft pencil-on-paper texture.
- **Thumbnail prompt:** `top-down architect's desk, a floor-plan sheet, a wooden ruler, one orange pencil on warm ivory, soft daylight, no face, no text baked`.
- **Filename:** `public/video/architect-story-30s.mp4` (+ poster).
- **Primary platform:** about page + YouTube Shorts + Instagram (9:16).

### Video 5 - Product shop overview (15s)

- **Purpose:** orient a new visitor to what the shop offers, calmly.
- **Page/channel:** `/products` (later), Instagram, YouTube Shorts.
- **Visual style:** a calm scroll of the curated shop (featured + the chooser), green/orange accents, no people.
- **Shot list:** (1) title "One-time guides and tools" 2s; (2) screen capture: the "What should I use?" chooser picking an option 6s; (3) a glance at the featured row and the by-room chips 5s; (4) CTA card 2s.
- **AI video prompt:** screen-recorded; for fill: `calm slow scroll of a clean ivory shop layout with green text and one orange accent, no people`.
- **Voiceover:** "Printable guides, personalised readings keyed to your Kua, and a few tools. Not sure what to use? Tell the chooser what you are after, and it points you to one good fit."
- **On-screen text:** "Printables, readings, tools" / "One-time. 7-day refund." / URL. No urgency.
- **Music/sound:** soft, neutral, low.
- **Thumbnail prompt:** `ivory card, a small green grid of cards, one orange accent, calm, no text baked`.
- **Filename:** `public/video/shop-overview-15s.mp4` (+ poster).
- **Primary platform:** products page + Instagram + YouTube Shorts (9:16).

---

## 5. Priority order

### Create first (highest leverage, lowest risk)

1. **The five featured product covers** (Personal Compass, Complete Home, Couple, Move-In, 7-Day Reset) per the cover briefs. They drop into existing wiring and turn the featured row and the art-less pages into a real shop. The Planner already has one.
2. **The southeast six-lever pin and the read-any-room pin** (the next two pins in the launch sequence), built in Illustrator from the master template.
3. **The about-page architect's-desk image** - one calm asset that makes the credibility page feel finished.

### Can wait

4. The homepage hero diagram (nice, not blocking; the calculator is the hero).
5. Embedding the anchor diagrams as in-page figures on the guide pages.
6. The single-topic compass covers (22) - reuse the compass-rose system at small scale once the featured five are done.
7. Video 1 (calculator walkthrough) and Video 3 (Planner flip-through) - the two highest-value videos, once stills are done.

### Should not be created (now or at all)

- Any video or image showing the founder's face, a fake testimonial, or a "results" claim.
- Mystical or fortune-telling imagery, or anything on the banned list.
- Dark luxury or cluttered AI interiors.
- A second pin per anchor (crops, colour variants) before the first set has run - the calendar defers these to month 2.
- Generic stock photography anywhere.
- Video components wired into the site before the stills and the first traffic data justify it.

---

## 6. Install map

Off-site assets (pins, social posts, most video distribution) have no `public/` path and need no code; they go straight to the channel. On-site assets are listed with their exact path, the consumer, and whether shipping needs code.

| Asset | public/ path | Used by | Code change needed |
|--|--|--|--|
| Product square cover | `public/products/<slug>/cover-thumb.png` | Shop card (`components/Storefront.tsx` via `lib/storefront.ts` + `CARD_COVER_SLUGS`) | Yes: add `<slug>` to `CARD_COVER_SLUGS` in `lib/product-assets.ts` |
| Product portrait cover | `public/products/<slug>/cover-portrait.png` | `components/ProductPreview.tsx` | Yes: set `assetLevel("cover" or "full")` in `lib/product-assets.ts` |
| Product sample pages | `public/products/<slug>/sample-2.png`, `sample-3.png` | `components/ProductPreview.tsx` "Look inside" | Yes: set `assetLevel("full")` in `lib/product-assets.ts` |
| Generated OG cards | none (route `/api/og/product/[slug]`) | All product pages + homepage + shop | Already shipped |
| Homepage hero image | `public/hero/home-hero.png` (or `.svg`) | `app/(site)/page.tsx` hero | Yes: add an `<Image>` to the hero |
| About hero image | `public/about/about-hero.png` | `app/(site)/about/page.tsx` | Yes: add an `<Image>` |
| Guide anchor figure | `public/guide-diagrams/<anchor>.png` | The five anchor pages (`content/guide/...` or the page template) | Yes: embed one figure per page; deferred, only if it is not a guide rewrite |
| Pinterest pins | none (Illustrator on owner's disk, then Pinterest) | Pinterest boards | No |
| Standalone social cards | none (or `public/social/` if ever reused on site) | Instagram, etc. | No |
| Videos | `public/video/<name>.mp4` + `.webm` + `poster.jpg` | A future video component on the relevant page | Yes: add a video component; deferred |

---

## Stop point

This dashboard is prepared for review. No code changed, no images generated, nothing published. On approval, work proceeds in the Priority order above: the five featured covers first (drop-in, one line of code each), then the next two pins, then the about image - each as its own small, reviewed step.
