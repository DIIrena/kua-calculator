# Stripe Live Activation Walkthrough (Mens Sana LLC)

**Date:** 2026-06-12
**Who does this:** the owner (these are dashboard steps only Claude cannot do for you)
**Time needed:** about 2 to 3 hours total, can be split across two sittings
**Prerequisite:** the US business bank account is open (done) and you can see its
routing number + account number in your banking app (Wise/Mercury).

The goal: by the end, Stripe can charge real cards and pay out to the Mens Sana
bank account, and three live Prices exist (Planner, Compass, Calendar).

---

## Part A - Create / upgrade the Stripe account (20 min)

1. Go to `https://dashboard.stripe.com/register` (or sign in if the test
   account already exists from earlier).
2. Sign up with your business email. Use the same email you use for the
   project so notifications land in one inbox.
3. After email verification, the dashboard opens in **Test mode** (orange
   banner or a `Test mode` toggle at the top right). That is expected.
4. Click `Activate payments` (big button on the home screen, or
   `Settings` -> `Business settings` -> `Activate your account`).

## Part B - Business profile (30-40 min, have the WY filing open)

Stripe asks a fixed questionnaire. Answer exactly:

1. `Country`: United States.
2. `Type of business`: Company -> Limited Liability Company (LLC).
3. `Legal business name`: `Mens Sana LLC` (exactly as in the Wyoming filing).
4. `Employer Identification Number (EIN)`: the EIN you received from the IRS
   for Mens Sana LLC. (Stripe needs the EIN, not an SSN, for a US LLC with a
   foreign owner.)
5. `Registered business address`: `30 N Gould St Ste N, Sheridan, WY 82801,
   United States` (the registered mailing address from the filing).
6. `Business phone`: your phone number with country code. It is not shown
   publicly unless you choose so.
7. `Industry`: pick `Digital products` (under Software/Digital goods if the
   picker nests it).
8. `Business website`: `https://myfengshuihome.com`
9. `Product description`: paste:
   `Digital feng shui guides and planners sold as one-time PDF downloads.
   No subscriptions, no physical goods, no services.`
10. `Person details` (the owner/representative): your legal name, date of
    birth, home address, and ID. This is identity verification (KYC), it is
    private to Stripe, and it does NOT appear on the website or receipts.
    Your public anonymity is not affected: customers only ever see the
    business name and statement descriptor.
11. `Ownership`: you own 25% or more -> add yourself as beneficial owner.

## Part C - Payout bank account (10 min)

1. `Routing number` + `Account number`: from the Mens Sana US bank account
   (Wise US account details work: choose ACH routing number, not wire).
2. Payout schedule: leave the default (daily automatic). You can change to
   weekly later in `Settings` -> `Payouts`.

## Part D - Public details (the part customers see) (10 min)

1. `Statement descriptor`: `MYFENGSHUIHOME` (this is what appears on card
   statements; max 22 characters, no spaces needed).
2. `Shortened descriptor`: `MFSH` if asked.
3. `Customer support email`: `hello@myfengshuihome.com`.
4. `Support URL`: `https://myfengshuihome.com/refunds` (the refunds page that
   is being built; it will exist before launch).

## Part E - Stripe Tax (10 min)

1. In the left menu: `More` -> `Tax` (or `Settings` -> `Tax`).
2. Click `Enable Stripe Tax`.
3. `Origin address`: the WY registered address.
4. `Default product tax code`: search for and select
   `Digital products - downloadable` (code `txcd_10303100` family; the
   picker shows friendly names - choose the general digital goods one).
5. Do NOT register in any state yet. Stripe Tax will monitor thresholds and
   tell you if/when a state registration is ever needed. At launch volume
   this will be quiet for a long time.

## Part F - Create the three live Products + Prices (15 min)

Switch OFF Test mode (toggle top right) so you are in **Live mode**, then:

1. `Product catalog` -> `Add product`:
   - Name: `2026 Annual Feng Shui Planner`
   - Description: `98-page printable feng shui planner for the 2026 solar
     year, July 2026 - February 2027 edition. PDF + EPUB + calendar file.`
   - Price: `29.00 USD`, `One-time`.
   - Click `Add product`. Open it and copy the **Price ID** (starts with
     `price_`). Paste it into the shared notes for Claude.
2. `Add product` again:
   - Name: `Personal Feng Shui Compass`
   - Description: `Personalised feng shui PDF keyed to your Kua number and
     eight directions.`
   - Price: `14.00 USD`, `One-time`. Copy the **Price ID**.
3. `Add product` again:
   - Name: `2026 Good-Days Calendar`
   - Description: `Day-by-day feng shui calendar, July 2026 - February 2027,
     as a printable PDF and a phone calendar file.`
   - Price: `9.00 USD`, `One-time`. Copy the **Price ID**.

## Part G - API keys + webhook secret (10 min, hand to Claude)

1. `Developers` -> `API keys` (in Live mode):
   - Copy `Publishable key` (pk_live_...) and `Secret key` (sk_live_...).
2. `Developers` -> `Webhooks` -> `Add endpoint`:
   - Endpoint URL: `https://myfengshuihome.com/api/stripe-webhook`
   - Events: click `Select events` -> check `checkout.session.completed`
     (that single event is enough for v1).
   - Click `Add endpoint`, then copy the `Signing secret` (whsec_...).
3. Put these FIVE values into Vercel (Project -> `Settings` ->
   `Environment Variables`, environment: Production):
   - `STRIPE_SECRET_KEY` = sk_live_...
   - `STRIPE_PUBLISHABLE_KEY` = pk_live_...
   - `STRIPE_WEBHOOK_SECRET` = whsec_...
   - `STRIPE_PRICE_PLANNER` = price_... (from F1)
   - `STRIPE_PRICE_COMPASS` = price_... (from F2)
   - `STRIPE_PRICE_CALENDAR` = price_... (from F3)
   Also add the same six in Test-mode variants when testing
   (`sk_test_...` etc.) if Claude asks for a test pass first.
4. Tell Claude the keys are in Vercel. Never paste secret keys into chat,
   email, or any file in the repo.

## Part H - The first live test (after Claude wires checkout; 15 min)

1. Claude flips the Planner page to `stripe-live` on a preview deploy.
2. You buy the Planner yourself with a real card.
3. Check: card charged, delivery email arrives, PDF opens, order appears in
   Stripe (`Payments`) and in Supabase (`product_orders`).
4. Refund yourself: Stripe `Payments` -> click the payment -> `Refund`.
5. Done. Launch email can go out.

---

## Privacy notes (your anonymity)

- KYC identity (legal name, ID) is between you and Stripe. Not public.
- Customers see: `MYFENGSHUIHOME` on their card statement, `Mens Sana LLC`
  on receipts/invoices if full business name display is enabled (you can
  set `Public business name` to `My Feng Shui Home` in
  `Settings` -> `Public details` so receipts show the brand, not the LLC).
- The website never shows your legal name; the /refunds page names
  `Mens Sana LLC` as operator, which is the verifiable entity, not you.

## If Stripe stalls

If activation review takes more than 2 weeks or asks for documents you
cannot provide quickly, tell Claude: the fallback is Lemon Squeezy
(merchant of record) for the Planner only, which is a state-flag flip in
the code and requires only an email signup. Do not build both in parallel.
