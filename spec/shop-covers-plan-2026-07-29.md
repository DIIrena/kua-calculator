# Shop card covers - what we have, what's missing, the plan (2026-07-29)

## How a shop card picks its image (today)

`lib/storefront.ts` chooses, in order:

1. **`cover-mockup.png`** - the real cover composited as a printed booklet on a
   soft background (built by `scripts/build-mockup-cover.mjs`). The good one.
2. else **`cover-thumb.png`** - a flat square crop of the cover.
3. else **nothing** - a text-only card.

So "give a card a real cover" almost always means: **build its mockup and add
its slug to `MOCKUP_COVER_SLUGS`.**

## What we have vs. what's missing

| Product | portrait cover | book mockup | card shows today |
|---------|:---:|:---:|---|
| personal-feng-shui-compass | Y | **Y** | book mockup ✔ |
| all-twelve-spaces-compass | Y | **Y** | book mockup ✔ |
| complete-home-compass | Y | **Y** | book mockup ✔ |
| all-nine-pillars-compass | Y | **Y** | book mockup ✔ |
| move-in-kit | Y | **Y** | book mockup ✔ |
| seven-day-home-reset | Y | **Y** | book mockup ✔ |
| business-money-feng-shui | Y | **Y** | book mockup ✔ |
| cures-catalog | Y | **Y** | book mockup ✔ |
| annual-feng-shui-planner-2026 | Y | **-** | flat thumb → *can be a mockup* |
| bazi-basics | Y | **-** | flat thumb → *can be a mockup* |
| bedroom-reset | Y | **-** | flat thumb → *can be a mockup* |
| couple-compatibility-compass | Y | **-** | flat thumb → *can be a mockup* |
| daily-ritual-pack | Y | **-** | flat thumb → *can be a mockup* |
| five-elements-workbook | Y | **-** | flat thumb → *can be a mockup* |
| good-days-calendar-2026 | Y | **-** | flat thumb → *can be a mockup* |
| healthy-home-audit | Y | **-** | flat thumb → *can be a mockup* |
| home-diagnostic-workbook | Y | **-** | flat thumb → *can be a mockup* |
| starter-deck | Y | **-** | flat thumb → *can be a mockup* |
| whole-home-starter-bundle | **-** | **-** | the still-life photo (blank books) |
| extended-personal-kua-report | Y | **-** | text-only (no thumb) |
| 21 single-topic Compasses ($7) | **-** | **-** | **no cover art at all** |

## The two problems, kept separate

**Problem 1 - presentation.** Ten products already have a real cover but show a
flat thumb instead of the nice book mockup. This is a one-command fix.

**Problem 2 - the covers themselves.** The non-personal covers (planner, kits,
workbooks, catalogue) are **plain typographic covers** - a title and subtitle on
ivory. They are clean, but they did **not** get the premium magazine treatment
the personal Compasses got (photo + big Didone masthead). So even a perfect
mockup still wraps a plain cover. That is a design decision for you (below).

## The plan

### A. Instant win - mockups for the 10 that already have covers  *(do now)*
Run the existing script for the ten portrait-only products and register them:

```
node scripts/build-mockup-cover.mjs annual-feng-shui-planner-2026 bazi-basics \
  bedroom-reset couple-compatibility-compass daily-ritual-pack \
  five-elements-workbook good-days-calendar-2026 healthy-home-audit \
  home-diagnostic-workbook starter-deck
```
then add those slugs to `MOCKUP_COVER_SLUGS` in `lib/product-assets.ts`. Every
one of their cards becomes a tangible book render. **Uses the covers we already
have; zero new art.**

### B. The Whole-Home Bundle - real covers on the books  *(do now, it's on the shelf)*
This is the card you flagged. Two ways to show real covers:

1. **Recommended: a purpose-built 3-book bundle mockup.** Extend the mockup
   script to fan three booklets showing the *real* component covers - the
   Diagnostic Workbook, the Daily Ritual Pack, and the Cures Catalogue (their
   `cover-portrait.png` files, which we have). Clean, sharp, reads instantly as
   "three books." Use it as the card; keep the styled still-life as the *page
   hero*.
2. **Alternative: composite covers onto the still-life photo.** Warp the three
   real covers onto the angled book faces in the existing photo. Prettier and
   more editorial, but fiddlier (perspective, lighting) and re-does if the
   photo changes.

### C. The design decision - redesign the plain covers?  *(your call)*
Do you want the non-personal covers **redesigned to match the personal
magazine covers** (a photo + the Didone masthead), so the whole shelf feels
like one premium line? This is a real project (about 13 covers), but it is the
difference between "clean" and "the same shop." If yes, I will propose a cover
system and we generate the photo/art per product.

### D. The 21 single-topic Compasses - no cover art  *(defer)*
These have no cover image at all, but they are delisted from the shop, so they
are not urgent. If any get promoted to the shelf (or run in ads), each needs a
cover first - and they could share one templated cover keyed by room/area.

## Suggested order

1. **B** (bundle - the one shelf card that is clearly wrong).
2. **A** (ten free mockups - makes the rest of the catalogue look real).
3. **C** (decide on the redesign - the big lever, but a choice).
4. **D** (only if singles get promoted).
