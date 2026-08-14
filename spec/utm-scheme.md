# UTM scheme (2026-08-14)

One convention for every link we publish off-site, so any analytics view
can segment traffic by door and by channel from day one. Part of the
marketing-ux-plan Step 0.

## The link pattern

```
https://myfengshuihome.com/<door>?utm_source=<source>&utm_medium=<medium>&utm_campaign=<campaign>
```

- `<door>` - where the link lands. The two campaign doors are
  `/bazi-calculator` (identity hooks) and `/good-days` (home hooks).
  Product pins land on their product page.
- `utm_source` - exactly one of: `pinterest`, `instagram`, `tiktok`,
  `youtube`, `facebook`, `email`.
- `utm_medium` - `social` for all platform posts, `email` for our own
  sends, `bio` for the one link-in-bio.
- `utm_campaign` - the batch id: `wk<ISO week>-<hook>` where hook is
  `identity` or `home` (e.g. `wk34-identity`). Launch emails use the
  product slug (e.g. `launch-newsletter`).

Examples:

```
https://myfengshuihome.com/bazi-calculator?utm_source=pinterest&utm_medium=social&utm_campaign=wk34-identity
https://myfengshuihome.com/good-days?utm_source=tiktok&utm_medium=social&utm_campaign=wk34-home
https://myfengshuihome.com/bazi-calculator?utm_source=instagram&utm_medium=bio&utm_campaign=bio
```

## Internal cross-links

On-site funnel links keep the existing lightweight `?from=` convention
(`?from=kua-calculator` on the post-result cards). `from` marks internal
hops; `utm_*` marks off-site arrivals. Never mix the two on one link.

## Where the numbers are read

- Vercel Analytics: filter pageviews by `utm_source` / `utm_campaign`
  where the plan tier exposes UTM filters; top referrers otherwise.
- The weekly funnel readout (`node scripts/funnel-readout.mjs`) stays
  the source of truth for captures and orders. Extending it with a
  sessions-by-source column is an open task from the marketing-ux-plan.

## Rules

1. Every off-site link carries all three parameters. No naked links in
   captions, bios, or emails.
2. Lowercase everything; hyphens, never spaces.
3. One door per post. A caption never offers two links.
4. New source or medium values get added HERE first, then used.
