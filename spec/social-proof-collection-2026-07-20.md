# Collecting real testimonials (owner runbook, W3)

The site now has a social-proof block on every product page and the homepage.
Until real quotes exist it shows an honest credibility note (who writes the
readings and how) - never a fake review. This is the one conversion lever we
will not fake, ever. Here is how to fill it with real ones.

## The rule

Only real, verbatim quotes from real buyers who said yes to being shown. No
composed quotes, no "representative" quotes, no stock faces, no invented star
counts. First name or initials only for attribution.

## How to collect the first ones (fastest ethical path)

1. **Ask every buyer, once.** In the delivery email (or a short follow-up two
   or three days later), add one line: "If this was useful, I would love a
   sentence on what it helped you decide - just reply to this email. Say no and
   nothing changes." Replies are consent to be quoted by first name; if unsure,
   reply once to confirm "may I show this with your first name?"
2. **Sweeten the first batch.** Offer the first ~20 reviewers a free upgrade
   (for a Personal Compass buyer, the Complete Home Compass; for a $9 buyer, a
   $19 product) in exchange for an honest sentence - positive or not. Honest,
   not glowing, is the instruction.
3. **Mine what already exists.** Any kind reply, Pinterest comment, or DM you
   have already received counts if the person consents to it being shown.

## How to add a quote to the site

Open `lib/testimonials.ts` and append to the `TESTIMONIALS` array:

```ts
{
  quote: "Their exact words, verbatim, nothing added.",
  attribution: "Maja, bought the Complete Home Compass",
  productSlug: "complete-home-compass", // omit for a general brand quote
},
```

- `productSlug` present -> the quote shows on that product page (and any general
  quote also shows there).
- `productSlug` omitted -> a brand-level quote; shows on the homepage and on
  every product page.
- The homepage and product pages switch from the credibility note to the quote
  cards automatically the moment the array is non-empty. No other change needed;
  redeploy and they are live.

## What good looks like

Specific beats gushing. "I finally knew which wall the bed should go against and
moved it that night" converts better than "Amazing product!!!" Keep the specific,
decision-shaped ones.
