# "Look inside" audit - the 10 shelf products (2026-07-29)

What each visible product shows a buyer *before* they pay. Three kinds of proof:

- **Preview** - real sample pages from the book. `full` = a sample spread;
  `cover` = only the front cover; `none` = text only, no art.
- **Photo** - a lifestyle photo on the page (from `HERO_SLUGS`).
- **Diagram** - an inline sample diagram peeking at the method.

(Corrected for landing-page products, whose hero renders inside
`ProductLanding` and so was invisible to a page-file grep.)

## Coverage of the 10 shelf products

| # | Product | Price | Preview | Photo | Diagram | Verdict |
|---|---------|-------|---------|-------|---------|---------|
| L1 | Personal Compass | $19 | sample spread | - | - | thin |
| L2 | Twelve Spaces Compass | $29 | **cover only** | - | - | **weak** |
| L3 | Complete Home Compass | $49 | **cover only** | - | - | **weakest** |
| M1 | Move-In Date Report | $29 | cover only | - | - | weak |
| M2 | 7-Day Home Reset | $19 | cover only | - | - | ok (course) |
| M3 | Good-Days Calendar | free | (calendar page) | yes | - | good |
| K1 | Nine Life Areas Compass | $29 | cover only | - | - | weak |
| K2 | Business & Money Kit | $19 | sample spread | yes | yes | **strong** |
| K3 | Whole-Home Bundle | $29 | 3 kit covers | yes | - | good |
| K4 | Cures & Crystals Catalogue | $9 | sample spread | yes | - | good |

## The headline finding

**The ladder - the spine of the whole shop - has the least proof, and the
flagship has the least of all.** The two higher tiers you most want to sell,
Twelve Spaces ($29) and Complete Home ($49), show a buyer nothing but a front
cover. Personal ($19) at least shows sample pages, but no photo and no diagram.

Meanwhile a $9 kit (Business & Money) is the best-proven page on the site.
That is upside-down: the cheapest kit out-sells its own look-inside against the
$49 flagship.

## The good news: the assets already exist

We just spent this whole recharge building rich interiors for exactly these
books - **34 chapter diagrams, four cautious-chapter photos, four full-bleed
part-title dividers, personalised covers**. They are already rendered in the
sample PDFs at `scripts/out/previews/*.pdf`. So the fix is not new creative
work; it is **surfacing what is already inside.**

### Recommended fix (priority order)

1. **Give the ladder a real "look inside."** For each of Personal / Twelve
   Spaces / Complete Home, extract 3 real page-images from the rendered sample
   PDF and show them as a preview strip:
   - Complete Home: a **part-title divider**, a **chapter opener with a photo**,
     and a **diagram page** (e.g. the five-element cycle or a room plan).
   - Twelve Spaces: a **room opener** + a **room diagram** + a **contents peek**.
   - Personal: a **direction chapter** + the **bagua chart** + the **experiment**.
   This is a script that crops pages from the PDFs we already render.

2. **Add the comparison table to the flagship page**, not just the shop, so the
   $49 buyer sees the ladder logic where they are deciding.

3. **Nine Life Areas + Move-In**: same treatment, one sample strip each.

4. **Shop cards**: let the three ladder cards show a tiny **diagram thumbnail**
   as the "peek", so the shelf itself hints at what is inside.

### Lower priority

- The 22 single-topic compasses (balcony, bathroom, career, ...) are `none`
  preview and delisted from the shop, so they are not urgent. If any get
  promoted back onto the shelf, they need a preview first.

## One-line summary

Stop selling the ladder with covers. Show the pages. We already built them.
