# The 2027 annual refresh path (P9, written 2026-07-20)

The yearly products are the store's built-in revenue events. This is the
complete map of what must change for 2027, where each piece lives, and who
gets emailed. Target: everything ready before January 2027 (the 2027 solar
year starts at Li Chun, 4 February 2027; the planner FAQ promises the 2027
edition ships in January).

## What carries a 2026 stamp today

1. **2026 Feng Shui Planner: Mid-Year Edition** ($19) - built in
   `projects/annual-feng-shui-planner/` (Python + Pandoc pipeline), synced
   into `public/` here. The 2027 edition is a full 12-month rebuild there.
2. **2026 Good-Days Calendar** ($9) - day-quality data + ICS. Same pipeline
   family; the 2027 version is a data regeneration plus new cover year.
3. **The 2026 overlay blocks** inside the personalised products
   (`content/blocks/`, the year-overlay chapters) - need a 2027 rewrite pass
   keyed to the Fire Goat year chart (south was the 2026 danger zone; the
   2027 star map differs).
4. **Advice base** (`projects/feng-shui/advice-base/advice.json`) - the 15+
   entries tagged `timing.value = "2026"` are isolated by that tag; add the
   2027 set alongside when the autumn guides publish (WOFS, Lillian Too
   et al., usually October-November).
5. **Storefront copy** - titles, one-liners, FAQ dates, planner page
   coverage window, `KNOWN_PAGES`, metadata.

## Who gets emailed at launch (already collecting)

- `product_waitlist` slug `annual-feng-shui-planner-2027` - joined via the
  waitlist card on the planner page (live since 2026-07-20). Send with
  `scripts/send-launch-email.mjs` (add the 2027 template).
- 2026 planner BUYERS (`product_orders` where product_slug =
  annual-feng-shui-planner-2026) - the FAQ promises them a 30 percent
  renewal offer; create a Stripe coupon at launch and email them separately.
- The newsletter list - one launch note.

## Suggested timeline

- October 2026: 2027 annual chart research lands (advice-base web pass);
  2027 overlay blocks drafted; planner build starts.
- November 2026: 2027 Planner + Good-Days rendered and reviewed; product
  pages built (new slugs, keep 2026 pages live for buyers).
- December 2026: waitlist + buyer emails drafted for owner approval.
- Early January 2027: launch; C0-style sends; 2026 editions delisted from
  the shelf but their URLs stay live.
