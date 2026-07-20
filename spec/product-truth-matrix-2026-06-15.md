# Product truth matrix - 2026-06-15

Every buyable product on myfengshuihome.com, audited against the live repo on 2026-06-15. Source of truth: `lib/commerce.ts` (price, fulfilment, delivered files, launched), `lib/compass-catalogue.ts` (the 22 single-topic Compasses), each product page's `BuyButton state`, the on-page refund copy, and the on-disk asset inventory under `public/products/`.

## Column legend

- **Price** - `priceCents / 100` from the registry (Stripe owns the canonical charge).
- **Stripe state** - `launched` flag in `lib/commerce.ts`. `launched: true` lets `/api/checkout` create a session; the live Stripe Price ID must be present in the product's env var for a real charge. All 44 are `launched: true`.
- **Fulfilment** - `static` (files emailed by the webhook), `kua` / `movein` / `couple` / `pick3` (personalised render via the post-checkout form), or `course` (enrol + drip).
- **Delivered files** - what the buyer receives.
- **Page state** - the `BuyButton state` prop on the product page. All 44 are `stripe-live`.
- **Store** - listed in the `/products` storefront. `featured` marks the three `featured: true` cards.
- **Meta $** - the product page metadata price vs the registry price. `=` means they match.
- **Refund** - the on-page refund wording. All 44 read `7-day refund` (the Good-Days page "no questions asked" tail was removed 2026-06-15).
- **Assets** - on-disk under `public/products/<slug>/`. `FULL` = cover-thumb + cover-portrait + 3 samples; `PORTRAIT` = cover-portrait only; `NONE` = no folder yet.
- **Test** - the checkout + delivery test for that fulfilment family. None have been run yet (`untested`).

## Global invariants (true for all 44 rows unless flagged)

Stripe state `launched`; page state `stripe-live`; Store `listed`; Meta $ `=`; Refund `7-day refund`; Test `untested`.

## Matrix (44 rows)

| # | slug | title | Price | Stripe | Fulfilment | Delivered files | Page state | Store | Meta $ | Refund | Assets | Test |
|--|--|--|--|--|--|--|--|--|--|--|--|--|
| 1 | annual-feng-shui-planner-2026 | 2026 Feng Shui Planner: Mid-Year Edition | $19 | launched | static | PDF + EPUB + ICS | stripe-live | featured | = | 7-day | FULL | untested |
| 2 | personal-feng-shui-compass | Personal Feng Shui Compass | $14 | launched | kua | rendered PDF | stripe-live | featured | = | 7-day | PORTRAIT | untested |
| 3 | extended-personal-kua-report | Extended Personal Kua Report | $39 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | PORTRAIT | untested |
| 4 | move-in-kit | Move-In Date Report | $29 | launched | movein | rendered PDF | stripe-live | listed | = | 7-day | PORTRAIT | untested |
| 5 | seven-day-home-reset | 7-Day Home Reset | $19 | launched | course | 8 emails (welcome + 7) | stripe-live | listed | = | 7-day | NONE | untested |
| 6 | good-days-calendar-2026 | 2026 Good-Days Calendar | $9 | launched | static | PDF + ICS | stripe-live | listed | = | 7-day | FULL | untested |
| 7 | bedroom-reset | Bedroom and Relationship Reset | $14 | launched | static | PDF | stripe-live | listed | = | 7-day | FULL | untested |
| 8 | business-money-feng-shui | Business and Money Feng Shui Kit | $19 | launched | static | PDF | stripe-live | listed | = | 7-day | FULL | untested |
| 9 | home-diagnostic-workbook | 10-Step Home Diagnostic Workbook | $14 | launched | static | PDF | stripe-live | listed | = | 7-day | FULL | untested |
| 10 | daily-ritual-pack | Daily Ritual and Twenty Laws Pack | $9 | launched | static | PDF | stripe-live | listed | = | 7-day | FULL | untested |
| 11 | cures-catalog | Cures and Crystals Catalogue | $9 | launched | static | PDF | stripe-live | listed | = | 7-day | FULL | untested |
| 12 | healthy-home-audit | Healthy Home Audit | $19 | launched | static | PDF | stripe-live | listed | = | 7-day | FULL | untested |
| 13 | five-elements-workbook | Five Elements Home Styling Workbook | $12 | launched | static | PDF | stripe-live | listed | = | 7-day | FULL | untested |
| 14 | starter-deck | Learn Feng Shui Starter Deck | $9 | launched | static | PDF | stripe-live | listed | = | 7-day | FULL | untested |
| 15 | bazi-basics | BaZi Basics: Read Your Own Chart | $14 | launched | static | PDF | stripe-live | listed | = | 7-day | FULL | untested |
| 16 | whole-home-starter-bundle | Whole-Home Starter Bundle | $29 | launched | static | 3 PDFs (diagnostic + ritual + cures) | stripe-live | listed | = | 7-day | NONE | untested |
| 17 | bedroom-compass | Bedroom Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 18 | office-compass | Office Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 19 | dining-room-compass | Dining Room Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 20 | kitchen-compass | Kitchen Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 21 | living-room-compass | Living Room Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 22 | bathroom-compass | Bathroom Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 23 | entrance-compass | Entrance Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 24 | hallway-compass | Hallway Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 25 | storage-compass | Storage Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 26 | laundry-compass | Laundry Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 27 | balcony-compass | Balcony Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 28 | garage-compass | Garage Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 29 | wealth-compass | Wealth Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 30 | recognition-compass | Recognition Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 31 | relationship-compass | Relationship Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 32 | creativity-compass | Creativity Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 33 | helpful-people-compass | Helpful People Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 34 | career-compass | Career Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 35 | knowledge-compass | Knowledge Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 36 | family-compass | Family Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 37 | health-compass | Health Compass | $7 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 38 | year-ahead-compass | Year Ahead Compass | $9 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 39 | all-nine-pillars-compass | Nine Life Areas Compass | $29 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 40 | all-twelve-spaces-compass | Twelve Spaces Compass | $29 | launched | kua | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 41 | complete-home-compass | Complete Home Compass | $49 | launched | kua | rendered PDF | stripe-live | featured | = | 7-day | NONE | untested |
| 42 | couple-compatibility-compass | Couple Compatibility Compass | $19 | launched | couple | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 43 | pick-three-pillars | Three Life Areas Compass | $17 | launched | pick3 | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |
| 44 | pick-three-spaces | Three Spaces Compass | $17 | launched | pick3 | rendered PDF | stripe-live | listed | = | 7-day | NONE | untested |

## Summary

- **44 products**, all `launched: true`, all pages `stripe-live`, all listed, all `7-day refund`, all metadata prices matching the registry. No price/refund/state inconsistencies remain after the 2026-06-15 fixes.
- **Assets:** 11 FULL (rows 1, 6-15), 3 PORTRAIT (rows 2-4), 30 NONE. The three featured products that still need covers are Personal Feng Shui Compass (square thumb + samples), Complete Home Compass (all), and Couple Compatibility Compass (all); Move-In and 7-Day Reset also need work for the featured set. Cover production is owner-led per `spec/featured-product-asset-system.md`.
- **Fulfilment families and their (untested) checkout + delivery tests:**
  - `static` (rows 1, 6-16): buy -> webhook emails signed file URLs -> links download.
  - `kua` (rows 2, 3, 17-41): buy -> post-checkout form -> PDF renders + emails; re-submit re-signs the same PDF.
  - `movein` (row 4): move-in-window form renders the day-calendar report.
  - `couple` (row 42): two-person form renders the compatibility report.
  - `pick3` (rows 43, 44): three-choice form assembles + renders.
  - `course` (row 5): buy -> enrol + welcome email -> drip cron sends days 1-7; unsubscribe works.
- **No test has been run for any family.** Running one purchase per family is the remaining verification before treating fulfilment as proven.

## Addendum 2026-07-20

Fulfilment verification: the owner confirmed on 2026-07-20 that live test
purchases were run and delivery works ("I already tested and it is live and
working"). The Test column's "untested" status above is superseded for the
tested families; the funnel readout (scripts/funnel-readout.mjs) shows the
3 test orders. Catalogue note: the shop shelf now lists 10 products
(VISIBLE_SLUGS in lib/storefront.ts); everything else keeps a live URL but
is delisted from the shelf.
