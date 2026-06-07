# Architect Spec - Phase 5A: Measurement + Conversion Polish

Date: 2026-06-07
Status: SHIPPED. Built in alignment with the existing Plausible implementation already in the repo.
Follows Phase 4 (waitlist-mode launch, shipped + validated 2026-06-07 at commit `bbec323`).

---

## PROJECT BRIEF

```
Name:          kua-calculator (myfengshuihome.com) - Phase 5A
Type:          website (measurement + conversion polish)
Client:        Internal (My Feng Shui Home)
Deliverables:  1. Analytics for the planner waitlist funnel (Plausible)
               2. Conversion polish on the waitlist (trust strip, email
                  pre-fill, anchor, floating CTA)
               3. FAQ on the planner page (practitioner voice)
               4. Calculator -> planner measurement without tracking the
                  calculator page
               5. Build + verify, commit + push
Deadline feel: normal
Tech stack:    Next.js 16.2.6, React 19.2.4, TypeScript, Vercel hosting.
               Plausible Analytics (cookieless, no consent banner).
Assets:        Practitioner voice skill; existing FAQPage JSON-LD pattern;
               Phase 4 BuyButton + product pages.
```

Explicit out of scope (user instruction): no payment wiring (Stripe / Lemon Squeezy), no full marketing plan, no article writing. Payment (Phase 5B) stays gated on the bank-account decision.

---

## ANALYTICS PROVIDER: Plausible (not Vercel)

The site uses **Plausible Analytics**, and the helper + loader were already scaffolded in the repo before this phase (`lib/analytics.ts`, `components/PlausibleScript.tsx`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in `.env.example`). Plausible is the right fit and the chosen provider because:

- It is cookieless, needs no consent banner, and is the privacy-pure match for a brand whose calculator core and `/embed` are deliberately tracker-free.
- The Phase 4 strategy doc named "Plausible or GA4" as the candidate; Plausible was the intent.
- Custom events (Plausible "goals") cover the funnel; it is lighter and cheaper than the Vercel Pro tier that Vercel custom events require.

An earlier draft of this spec proposed Vercel Web Analytics. That was wrong (it missed the existing Plausible scaffold) and is superseded. No Vercel analytics package is installed.

### Privacy boundary (honors the CLAUDE.md hard rule)

`PlausibleScript` mounts once in `app/(site)/layout.tsx` and self-excludes these prefixes, so they never load any third-party JS:

```
/kua-calculator   (calculator core stays tracker-free and embeddable)
/embed            (embeddable widget)
/account          (private surface)
/sign-in          (private surface)
/privacy          (private surface)
```

The script is also a no-op whenever `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is unset, so local dev and previews stay tracker-free unless explicitly opted in. Events carry only navigation / intent metadata (a product slug, a source name), never birth data or PII. The calculator engine (`public/calculator/*.js`) and `CalculatorIsland` are untouched.

---

## EVENTS

| Event | Props | Fires on | Surface |
|---|---|---|---|
| `waitlist_signup_attempt` | `{ productSlug }` | form submit | `BuyButton` (all products) |
| `waitlist_signup_success` | `{ productSlug }` | land with `?waitlist=sent` | `BuyButton` |
| `waitlist_signup_error` | `{ productSlug, reason }` | land with invalid/error | `BuyButton` |
| `planner_source_visit` | `{ source }` | mount, when `?from=` is a known source | `PlannerSourceTracker` on planner page |
| (planner page view) | n/a | automatic Plausible pageview by path | planner page |

Event props use the `productSlug` key (not `product`).

### Calculator -> planner measurement (privacy-preserving)

The `/kua-calculator` page stays fully tracker-free. Instead of tracking a click there, it carries a plain link to the planner with a source param:

```
/products/annual-feng-shui-planner-2026?from=kua-calculator
```

The planner page (where Plausible runs) reads `?from`, checks it against an allowlist (`KNOWN_SOURCES = ["kua-calculator"]`), and `PlannerSourceTracker` fires `planner_source_visit { source }` on mount. This shows the calculator -> planner flow without putting any analytics on the calculator page. The allowlist keeps arbitrary query values out of the analytics stream.

---

## CONVERSION POLISH (in `BuyButton`, waitlist branch)

- `#waitlist` anchor for in-page "skip to waitlist" links.
- Trust microstrip: "No subscription. No recurring fee. Buy once, keep the files."
- Cross-page email pre-fill via `localStorage` (a visitor who joined one waitlist sees their address pre-filled on the next product page).
- Provider-neutral payment copy throughout (no Stripe-specific wording in any customer-facing FAQ or note).
- Floating waitlist CTA (`FloatingWaitlistCTA`) and a 10-question practitioner-voice FAQ with `FAQPage` JSON-LD on the planner page.

---

## COMPONENTS

| File | Role | Client? |
|---|---|---|
| `lib/analytics.ts` | `trackEvent()` - safe no-op Plausible wrapper | n/a |
| `components/PlausibleScript.tsx` | Plausible loader, mounted in `(site)` layout, excludes private + calculator surfaces | yes |
| `components/BuyButton.tsx` | waitlist form + funnel events + conversion polish | yes |
| `components/PlannerSourceTracker.tsx` | fires `planner_source_visit` from a known `?from` source | yes |
| `components/FloatingWaitlistCTA.tsx` | floating CTA on the planner page | yes |

---

## VERIFICATION

- `npm run build` succeeds (TypeScript clean, all routes generated).
- `PlausibleScript` present in `(site)` layout, absent from root layout; excludes `/kua-calculator`, `/embed`, `/account`, `/sign-in`, `/privacy`.
- `public/calculator/*.js` and `CalculatorIsland` unchanged; calculator page carries only a plain link (no analytics).
- Event props use `{ productSlug }`. Calculator -> planner measured via `planner_source_visit`.
- Zero em dashes, zero outcome promises.
