# Product launch checklist (self-service)

Tick a product off when you have done its 2-3 steps, then paste me the
list of finished ones and I flip them live in one push.

**Status:** 3 live (Planner, Personal Compass, Good-Days Calendar).
The rest are built and waiting on a Stripe Price.

## Dashboard links
- **Stripe** (create product): https://dashboard.stripe.com/products/create  (make sure Test mode is OFF)
- **Vercel** (env vars): https://vercel.com/dashboard -> your project -> `Settings` -> `Environment Variables`
- **Supabase** (uploads): https://supabase.com/dashboard -> your project -> `Storage` -> `product-files`

## The loop for every product
1. Stripe -> `Add product`: paste the **Name** + **Description** below; category `Digital products > Media > Digital books`; add a **one-time USD** price at the **amount**; save; copy the **Price ID** (`price_...`).
2. Vercel -> Environment Variables: add the **env var** below with the `price_...` value, `Production` ticked, save.
3. **Static products only:** upload the file(s) to `product-files/<path>` in Supabase.
4. Paste me the finished product names. I set `launched: true` + live and push.

One-time setup (already done by you): `product-pdfs` bucket, migrations 0007 + 0008. Set `CRON_SECRET` in Vercel before launching the 7-Day Reset.

---

## ALREADY LIVE
- [x] 2026 Feng Shui Planner: Mid-Year Edition - $19 - `STRIPE_PRICE_PLANNER`
- [x] Personal Feng Shui Compass - $14 - `STRIPE_PRICE_COMPASS`
- [x] 2026 Good-Days Calendar - $9 - `STRIPE_PRICE_CALENDAR`

---

## STATIC products (Stripe + Vercel + UPLOAD). Local files: `projects/annual-feng-shui-planner/build/`

| Done | Name | $ | Stripe description | Vercel env var | Upload to `product-files/...` |
|---|---|---|---|---|---|
| [ ] | Bedroom and Relationship Reset | 14 | A focused printable PDF reading the bedroom for your Kua, with the headboard, mirror, and shared-furniture checklist, plus bed-direction readings for all nine Kua numbers. | `STRIPE_PRICE_BEDROOM` | `bedroom-reset/bedroom-reset.pdf` |
| [ ] | Business and Money Feng Shui Kit | 19 | A printable kit for the office, the desk, the wealth corner, and the kitchen stove: the practical money-channel reading for your home and business. | `STRIPE_PRICE_MONEY_KIT` | `business-money-feng-shui/business-money-feng-shui.pdf` |
| [ ] | 10-Step Home Diagnostic Workbook | 14 | Audit your own home the way a practitioner would: ten steps, fill-in worksheets, and a 90-day re-evaluation. | `STRIPE_PRICE_WORKBOOK` | `home-diagnostic-workbook/home-diagnostic-workbook.pdf` |
| [ ] | Daily Ritual and Twenty Laws Pack | 9 | The twenty traditional laws as printable cards, plus morning and evening checklists for a calm daily rhythm. | `STRIPE_PRICE_RITUAL` | `daily-ritual-pack/daily-ritual-pack.pdf` |
| [ ] | Cures and Crystals Catalogue | 9 | Every cure and crystal as a compact reference card: what it is, where it goes, and what the tradition says. | `STRIPE_PRICE_CURES` | `cures-catalog/cures-catalog.pdf` |
| [ ] | Healthy Home Audit | 19 | Nine conditions a home can support, air, light, damp, sound and more, audited with worksheets. No medical claims. | `STRIPE_PRICE_HEALTHY` | `healthy-home-audit/healthy-home-audit.pdf` |
| [ ] | Five Elements Home Styling Workbook | 12 | Read any room in five words, Wood, Fire, Earth, Metal, Water, and learn the two rules of what belongs next to what. | `STRIPE_PRICE_ELEMENTS` | `five-elements-workbook/five-elements-workbook.pdf` |
| [ ] | Learn Feng Shui Starter Deck | 9 | Twenty-four printable flashcards of the working vocabulary, a bagua grid, and the first five moves a beginner makes. | `STRIPE_PRICE_DECK` | `starter-deck/starter-deck.pdf` |
| [ ] | BaZi Basics: Read Your Own Chart | 14 | An educational primer on the four pillars and the Ten Gods: read your own birth chart, and know where the reading stops. | `STRIPE_PRICE_BAZI` | `bazi-basics/bazi-basics.pdf` |
| [ ] | Whole-Home Starter Bundle | 29 | The Diagnostic Workbook, the Daily Ritual Pack, and the Cures Catalogue together. Three PDFs, one price. | `STRIPE_PRICE_BUNDLE` | none (needs the 3 PDFs above uploaded) |

---

## PERSONALIZED products (Stripe + Vercel only, NO upload)

| Done | Name | $ | Stripe description | Vercel env var |
|---|---|---|---|---|
| [ ] | Extended Personal Kua Report | 39 | A personalised PDF reading your Kua in depth: your eight directions, how your group pairs with another, and your bedroom, desk, and dining seat read for your number, plus a 2026 overlay. | `STRIPE_PRICE_EXTENDED` |
| [ ] | Move-In Date Report | 29 | A personalised PDF reading your move-in window against the verified 2026 day calendar, with your Kua directions for the new home and a first-week activation checklist. | `STRIPE_PRICE_MOVEIN` |
| [ ] | Couple Compatibility Compass | 19 | Two people, one home, read together: both Kua maps laid over each other, where you agree, where to take turns, and how to settle the shared bed and table. | `STRIPE_PRICE_COUPLE` |
| [ ] | Three Life Areas Compass (pick three) | 17 | Choose any three of the nine life areas and get each read for your Kua in one PDF. | `STRIPE_PRICE_PICK3_PILLARS` |
| [ ] | Three Spaces Compass (pick three) | 17 | Choose any three rooms and get each read for your Kua in one PDF. | `STRIPE_PRICE_PICK3_SPACES` |
| [ ] | Nine Life Areas Compass | 29 | All nine bagua life-area corners read for your Kua in one PDF: wealth, recognition, relationships, creativity, helpful people, career, knowledge, family, and the health centre. | `STRIPE_PRICE_ALL_PILLARS` |
| [ ] | Twelve Spaces Compass | 29 | Every room read for your Kua in one PDF: bedroom, office, dining, kitchen, living room, bathroom, entrance, hallway, storage, laundry, balcony, and garage. | `STRIPE_PRICE_ALL_SPACES` |
| [ ] | Complete Home Compass (flagship) | 49 | The flagship: your eight directions in depth, compatibility, all twelve rooms, all nine life areas, and the 2026 overlay, read for your Kua in one volume. | `STRIPE_PRICE_FLAGSHIP` |

### Single-topic Compasses (all $7 except Year Ahead $9). Description = "Your <topic> read for your Kua: a short personalised PDF of the traditional placements for that part of your home, keyed to your number."

| Done | Name | $ | Vercel env var |
|---|---|---|---|
| [ ] | Bedroom Compass | 7 | `STRIPE_PRICE_BEDROOM_COMPASS` |
| [ ] | Office Compass | 7 | `STRIPE_PRICE_OFFICE_COMPASS` |
| [ ] | Dining Room Compass | 7 | `STRIPE_PRICE_DINING_ROOM_COMPASS` |
| [ ] | Kitchen Compass | 7 | `STRIPE_PRICE_KITCHEN_COMPASS` |
| [ ] | Living Room Compass | 7 | `STRIPE_PRICE_LIVING_ROOM_COMPASS` |
| [ ] | Bathroom Compass | 7 | `STRIPE_PRICE_BATHROOM_COMPASS` |
| [ ] | Entrance Compass | 7 | `STRIPE_PRICE_ENTRANCE_COMPASS` |
| [ ] | Hallway Compass | 7 | `STRIPE_PRICE_HALLWAY_COMPASS` |
| [ ] | Storage Compass | 7 | `STRIPE_PRICE_STORAGE_COMPASS` |
| [ ] | Laundry Compass | 7 | `STRIPE_PRICE_LAUNDRY_COMPASS` |
| [ ] | Balcony Compass | 7 | `STRIPE_PRICE_BALCONY_COMPASS` |
| [ ] | Garage Compass | 7 | `STRIPE_PRICE_GARAGE_COMPASS` |
| [ ] | Wealth Compass | 7 | `STRIPE_PRICE_WEALTH_COMPASS` |
| [ ] | Recognition Compass | 7 | `STRIPE_PRICE_RECOGNITION_COMPASS` |
| [ ] | Relationship Compass | 7 | `STRIPE_PRICE_RELATIONSHIP_COMPASS` |
| [ ] | Creativity Compass | 7 | `STRIPE_PRICE_CREATIVITY_COMPASS` |
| [ ] | Helpful People Compass | 7 | `STRIPE_PRICE_HELPFUL_PEOPLE_COMPASS` |
| [ ] | Career Compass | 7 | `STRIPE_PRICE_CAREER_COMPASS` |
| [ ] | Knowledge Compass | 7 | `STRIPE_PRICE_KNOWLEDGE_COMPASS` |
| [ ] | Family Compass | 7 | `STRIPE_PRICE_FAMILY_COMPASS` |
| [ ] | Health Compass | 7 | `STRIPE_PRICE_HEALTH_COMPASS` |
| [ ] | Year Ahead Compass | 9 | `STRIPE_PRICE_YEAR_AHEAD_COMPASS` |

---

## COURSE (Stripe + Vercel; needs `CRON_SECRET` set)

| Done | Name | $ | Stripe description | Vercel env var |
|---|---|---|---|---|
| [ ] | 7-Day Home Reset | 19 | A seven-day email course: one short email a day, one small task each, room by room. Nothing to buy, nothing to redecorate. | `STRIPE_PRICE_RESET` |

---

## Notes
- All prices are **one-time, USD**.
- Skip **Stripe Tax** (the checkout falls back gracefully). Category = Digital books for every product.
- Personalized + course products need NO upload; they render/email on demand.
- The personalized render path is now proven (Compass is live). If a Compass-family purchase ever fails to deliver, it is almost always a missing/typo'd env var.
