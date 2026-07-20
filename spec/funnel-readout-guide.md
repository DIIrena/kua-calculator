# Weekly funnel readout (5 minutes, every Monday)

The funnel has three homes. Read them in order; act on the LARGEST drop.

## 1. Views (Vercel, 2 min)

1. Go to `vercel.com`, open the `my-feng-shui-home` project.
2. Click the `Analytics` tab.
3. Set the range to `Last 7 days`.
4. In `Pages`, note: views for `/` (homepage), `/products` (the shelf), and the
   individual `/products/...` pages.
5. In `Referrers`, note where visitors came from. Pinterest pins should carry
   UTM parameters (see the note below) so each pin shows up separately.

Reading it: homepage-to-shelf drop = the homepage offer strip is not pulling;
shelf-to-product-page drop = cards not enticing (C2 territory); product-page
views with no Stripe sessions = the page is not convincing (trust, previews).

## 2. Checkout (Stripe, 1 min)

1. Go to `dashboard.stripe.com`.
2. `Payments > Checkout sessions` (or Payments list): count sessions created
   vs completed in the last 7 days.

Reading it: sessions created but not completed = price shock or checkout
friction. No sessions at all = the problem is upstream on the site.

## 3. Database (terminal, 2 min)

1. Open a terminal in VS Code and paste:
   `cd "c:\Users\User\Documents\IRENA\AI AUTOMATION\my-claude-workspace\projects\kua-calculator"`
2. Then: `node scripts/funnel-readout.mjs`
3. It prints: orders + revenue by product, deliveries, course enrollments,
   newsletter list size and growth, product waitlists, accounts + opt-ins.

## Pin UTM note (do once per new pin)

Give every pin a link of the form:
`https://myfengshuihome.com/<page>?utm_source=pinterest&utm_campaign=<pin-name>`
Vercel Analytics records UTM values, so each pin's traffic becomes visible in
the Analytics tab without any extra code.
