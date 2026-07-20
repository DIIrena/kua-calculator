# Walkthrough: sending the overdue waitlist + first newsletter emails

You have 23 people who left their email on the site and have never received anything:
20 newsletter subscribers (footer form, collecting since June 7) and 1 person each on
the Planner, Personal Compass and Move-In Report waitlists. Nothing sends until you run
the `--live` commands in Part C. Every command below is safe to run as written.

## Part A - Review the four emails (5 minutes)

1. Open File Explorer and go to
   `Documents\IRENA\AI AUTOMATION\my-claude-workspace\projects\kua-calculator\scripts\out`
2. Double-click `launch-newsletter.html`. It opens in your browser exactly as the
   20 subscribers will see it. Read it.
3. Do the same for `launch-annual-feng-shui-planner-2026.html`,
   `launch-personal-feng-shui-compass.html`, and `launch-move-in-kit.html`.
4. If you want any sentence changed, tell Claude what to change and re-run Part B
   afterward to regenerate the previews.

## Part B - Decide about the discount code (2 minutes, one decision)

The Planner and Personal Compass emails promise the code `EARLYLIST` at checkout.
That code does not exist in Stripe yet. Pick ONE:

**Option 1 - create the code (a nicer welcome for the two oldest signups):**
1. Go to `dashboard.stripe.com` and sign in.
2. In the left sidebar click `Product catalogue`, then the `Coupons` tab.
3. Click `+ New coupon`.
4. In `Name` type `EARLYLIST`.
5. Choose `Fixed amount discount`, amount `5.00`, currency `USD`.
6. Under `Redemption limits` tick `Limit the date range when customers can redeem this coupon`
   and set the end date to 14 days from today.
7. Click `Create coupon`.
8. Still in Coupons, click the new coupon, then `+ Create promotion code`.
9. In `Code` type `EARLYLIST` (customers type this at checkout). Click `Create`.

**Option 2 - skip the code:** do nothing in Stripe. In Part C, add ` --no-coupon`
to the two commands marked with (*). The discount sentences are removed automatically.

## Part C - Send (one command per group, in this order)

1. Open a terminal in VS Code (`Terminal > New Terminal`).
2. Paste this first (note the quotes):
   `cd "c:\Users\User\Documents\IRENA\AI AUTOMATION\my-claude-workspace\projects\kua-calculator"`
3. Send the three product emails first (tiny groups):
   - `node scripts/send-launch-email.mjs --product=annual-feng-shui-planner-2026 --live` (*)
   - `node scripts/send-launch-email.mjs --product=personal-feng-shui-compass --live` (*)
   - `node scripts/send-launch-email.mjs --product=move-in-kit --live`
4. Then the first newsletter to all 20:
   - `node scripts/send-launch-email.mjs --product=newsletter --live`
5. Each command prints `sent: <address>` per person and finishes with
   `Done. N sent this run.`

Safety built in: re-running any command never emails the same address twice (a sent
log is kept in `scripts\out\sent-<product>.json`), and about 2 emails go out per
second to respect the Resend rate limit.

## Part D - The week after (2 minutes total)

1. Replies land at `hello@myfengshuihome.com`. Anyone who replies `unsubscribe`:
   tell Claude and the address is removed from the list the same day.
2. Watch Stripe for checkouts. These are the warmest 23 people the site has;
   if any group converts, that is the signal the C4 welcome sequence will work.
