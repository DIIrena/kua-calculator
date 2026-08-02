# Shop plan: let the ladder organize the shop (2026-07-29)

## The problem, stated plainly

The shop is already curated down to **10 products** (not 40). But the
`Storefront` component renders all 10 in **one uniform grid with no section
labels and no hierarchy**. So the eye lands on a flat wall of ten cards and has
to do the sorting itself. That is the "too complicated" feeling. The products
are fine; the *presentation is flat*.

The three groups already exist in the code (`LADDER_SLUGS`, `MOMENT_SLUGS`,
`KIT_SLUGS` in `lib/storefront.ts`) - they are just not shown as groups.

## The principle

A shop should ask the visitor **one clear question first**, then let everything
else be obviously optional. Our one question is the ladder:

> "One book, three depths - which Compass?"

Everything else on the shelf is an *add-on to that decision*, not a competitor
with it. So the ladder becomes the spine, and the rest sits below it, labelled
and visibly secondary.

## The tree

```
/products  (the shop)
│
├─ 0 · START FREE  ......................  a tiny strip, top of page
│     └─ Kua Number Calculator ............ free    (know your number in 10s)
│
├─ 1 · THE LADDER  .....................  the ONE decision, the hero of the page
│     │   "One book, three depths - which Compass?"
│     │   (the comparison table lives here, as the spine)
│     ├─ Personal Compass ................. $19   just you: your 8 directions
│     ├─ Twelve Spaces Compass ............ $29   every room of your home
│     └─ Complete Home Compass ............ $49   everything, the whole map  ★most complete
│
├─ 2 · FOR A MOMENT  ...................  situational - "something is happening"
│     ├─ Move-In Date Report .............. $29   choosing a moving day
│     ├─ 7-Day Home Reset (course) ........ $19   a calm week, one email a day
│     └─ Good-Days Calendar ............... free  the favourable-days page
│
└─ 3 · KITS & TOOLS  ...................  printable add-ons, not personalised
      ├─ Nine Life Areas Compass ......... $29   wealth to health, area by area
      ├─ Business & Money Kit ............ $19   desk, stove, wealth corner
      ├─ Whole-Home Starter Bundle ....... $29   3 kits together, save vs. separate
      └─ Cures & Crystals Catalogue ...... $9    the honest reference
```

## Why this order

1. **Start free (level 0)** removes all risk and pulls the cold visitor in:
   "you can get value here for nothing." It is a thin strip, not a shelf.
2. **The ladder (level 1)** is the whole point of the page. It gets the space,
   the comparison table, and the three biggest cards. Most buyers should be
   able to decide here and stop.
3. **For a moment (level 2)** catches the visitor who did not come for the
   ladder: they are moving house, or want a gentle weekly nudge, or just want
   the free calendar. Small cards, clearly a different job.
4. **Kits & tools (level 3)** are the "yes, and" purchases: cheaper printable
   extras that deepen a compass the buyer already owns. Smallest cards, last.

The visitor now reads the page as: *free taste → the main choice → extras.*
Three altitudes, not one wall.

## What changes in the build (for later, not now)

- `components/Storefront.tsx`: render the three groups as **labelled sections**
  with a short one-line intro each, instead of one flat `CardGrid`. Give the
  ladder row visual weight (bigger cards / the comparison table as its header);
  render moment + kit rows smaller and quieter.
- Add a slim **free-tools strip** at the top (Kua calculator; the Good-Days
  free page can also sit in "For a moment").
- No product is added or removed. No route changes. This is presentation only.

## Open questions for the owner

1. Should the **free Kua calculator** get a card on the shop (it currently does
   not appear on the shelf at all), or stay off it?
2. Are the three group names right - **"The Ladder / For a Moment / Kits &
   Tools"** - or do you want warmer labels (e.g. "Start here", "Life moments",
   "Add-ons")?
3. Do you want the ladder shown as **three cards + the table**, or the **table
   alone** as the whole ladder section (cards would be redundant)?
