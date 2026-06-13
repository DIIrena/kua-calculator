# Product launch checklist

Every buildable product is built and on `main` (launched: false except the
Planner). This is the owner's path to take each live. Source of truth:
`lib/commerce.ts`.

Two things to understand first:

- The site runs its **own** Stripe Checkout (not a payment link). For each
  product you create a Stripe **Product + Price**, copy the **Price ID**
  (`price_...`), and paste it into the matching **Vercel env var** below.
  The Buy button POSTs to `/api/checkout`, which reads that env var.
- Skip **Stripe Tax** (it is a paid add-on collecting nothing at this
  volume; the checkout already falls back gracefully). Set each product's
  category to `Digital products > Media > Digital books` like the Planner.

---

## STEP 0 - one-time setup (do these ONCE, before the personalized/course products)

1. **`product-pdfs` bucket** (Supabase -> Storage -> New bucket): name
   `product-pdfs`, **private**, file size limit 25 MB, allowed type
   `application/pdf`. Needed by EVERY personalized product (Compass,
   Extended, Move-In, Couple, Pick-Three, the catalogue, the bundles).
   The `product-files` bucket already exists (the Planner uses it).
2. **Run migration `0007_move_in_extras.sql`** in Supabase SQL editor.
   Needed by Move-In, Couple, and both Pick-Three products (they store
   extra inputs in `product_responses.extras`).
3. **Run migration `0008_course_enrollments.sql`** in Supabase SQL editor.
   Needed by the 7-Day Home Reset.
4. **Set `CRON_SECRET`** in Vercel env (any long random string). Needed by
   the 7-Day Home Reset drip cron.
5. **Test the personalized render path once before mass-launching it.** It
   has never run in production. Launch the Personal Compass first, buy it
   once (a coupon for ~$1, like the Planner test), and confirm the PDF is
   rendered and emailed. If that works, every other personalized product
   works the same way.

---

## STEP 1 - the repeatable path for EVERY product

1. Stripe -> `Product catalog` -> `Add product`. Name = the product name
   below. Description = the description below. Category = Digital books.
2. Add a **one-time** price in **USD** at the amount below. Save. Open the
   price and copy its **Price ID** (`price_...`).
3. Vercel -> project -> `Settings` -> `Environment Variables` -> add the
   **env var key** below with the `price_...` value. Tick `Production`.
   Save.
4. **Static products only:** upload the file(s) to the `product-files`
   bucket at the exact path below.
5. Tell me "**<product> is ready**". I flip `launched: true` and switch the
   page Buy button to live, then push. (Batch several and I do them all at
   once.)

---

## TABLE A - STATIC products (pre-built PDF; UPLOAD required)

Upload each file from your PC to the `product-files` bucket. Local source
files live under `projects/annual-feng-shui-planner/build/`.

| Product (Stripe name) | Price | Vercel env var | Upload to `product-files/...` | Local source file |
|---|---|---|---|---|
| 2026 Good-Days Calendar | $9 | `STRIPE_PRICE_CALENDAR` | `good-days-calendar-2026/good-days-calendar.pdf` and `good-days-calendar-2026/calendar.ics` | `build/2026/good-days-calendar.pdf`, `build/2026/calendar.ics` |
| Bedroom and Relationship Reset | $14 | `STRIPE_PRICE_BEDROOM` | `bedroom-reset/bedroom-reset.pdf` | `build/products/bedroom-reset/bedroom-reset.pdf` |
| Business and Money Feng Shui Kit | $19 | `STRIPE_PRICE_MONEY_KIT` | `business-money-feng-shui/business-money-feng-shui.pdf` | `build/products/business-money-feng-shui/...pdf` |
| 10-Step Home Diagnostic Workbook | $14 | `STRIPE_PRICE_WORKBOOK` | `home-diagnostic-workbook/home-diagnostic-workbook.pdf` | `build/products/home-diagnostic-workbook/...pdf` |
| Daily Ritual and Twenty Laws Pack | $9 | `STRIPE_PRICE_RITUAL` | `daily-ritual-pack/daily-ritual-pack.pdf` | `build/products/daily-ritual-pack/...pdf` |
| Cures and Crystals Catalogue | $9 | `STRIPE_PRICE_CURES` | `cures-catalog/cures-catalog.pdf` | `build/products/cures-catalog/...pdf` |
| Healthy Home Audit | $19 | `STRIPE_PRICE_HEALTHY` | `healthy-home-audit/healthy-home-audit.pdf` | `build/products/healthy-home-audit/...pdf` |
| Five Elements Home Styling Workbook | $12 | `STRIPE_PRICE_ELEMENTS` | `five-elements-workbook/five-elements-workbook.pdf` | `build/products/five-elements-workbook/...pdf` |
| Learn Feng Shui Starter Deck | $9 | `STRIPE_PRICE_DECK` | `starter-deck/starter-deck.pdf` | `build/products/starter-deck/...pdf` |
| BaZi Basics: Read Your Own Chart | $14 | `STRIPE_PRICE_BAZI` | `bazi-basics/bazi-basics.pdf` | `build/products/bazi-basics/...pdf` |
| Whole-Home Starter Bundle | $29 | `STRIPE_PRICE_BUNDLE` | (no new file: it delivers the Workbook + Ritual + Cures PDFs above) | (none) |

Descriptions: use each product's one-line pitch from its page, e.g.
"A focused printable PDF reading the bedroom for your Kua, with the full
headboard, mirror, and shared-furniture checklist."

---

## TABLE B - PERSONALIZED products (rendered on demand; NO upload)

Need only a Stripe Price + the env var (and STEP 0). No file to upload.

### Headline personalized
| Product | Price | Vercel env var | Notes |
|---|---|---|---|
| Personal Feng Shui Compass | $14 | `STRIPE_PRICE_COMPASS` | Launch + test this one FIRST (proves the render path). |
| Extended Personal Kua Report | $39 | `STRIPE_PRICE_EXTENDED` | |
| Move-In Date Report | $29 | `STRIPE_PRICE_MOVEIN` | needs migration 0007 |
| Couple Compatibility Compass | $19 | `STRIPE_PRICE_COUPLE` | needs migration 0007 |
| Three Life Areas Compass (pick 3) | $17 | `STRIPE_PRICE_PICK3_PILLARS` | needs migration 0007 |
| Three Spaces Compass (pick 3) | $17 | `STRIPE_PRICE_PICK3_SPACES` | needs migration 0007 |
| Nine Life Areas Compass | $29 | `STRIPE_PRICE_ALL_PILLARS` | |
| Twelve Spaces Compass | $29 | `STRIPE_PRICE_ALL_SPACES` | |
| Complete Home Compass (flagship) | $49 | `STRIPE_PRICE_FLAGSHIP` | |

### Single-Space Compasses ($7 each)
| Product | Vercel env var |
|---|---|
| Bedroom Compass | `STRIPE_PRICE_BEDROOM_COMPASS` |
| Office Compass | `STRIPE_PRICE_OFFICE_COMPASS` |
| Dining Room Compass | `STRIPE_PRICE_DINING_ROOM_COMPASS` |
| Kitchen Compass | `STRIPE_PRICE_KITCHEN_COMPASS` |
| Living Room Compass | `STRIPE_PRICE_LIVING_ROOM_COMPASS` |
| Bathroom Compass | `STRIPE_PRICE_BATHROOM_COMPASS` |
| Entrance Compass | `STRIPE_PRICE_ENTRANCE_COMPASS` |
| Hallway Compass | `STRIPE_PRICE_HALLWAY_COMPASS` |
| Storage Compass | `STRIPE_PRICE_STORAGE_COMPASS` |
| Laundry Compass | `STRIPE_PRICE_LAUNDRY_COMPASS` |
| Balcony Compass | `STRIPE_PRICE_BALCONY_COMPASS` |
| Garage Compass | `STRIPE_PRICE_GARAGE_COMPASS` |

### Single-Life-Pillar Compasses ($7 each)
| Product | Vercel env var |
|---|---|
| Wealth Compass | `STRIPE_PRICE_WEALTH_COMPASS` |
| Recognition Compass | `STRIPE_PRICE_RECOGNITION_COMPASS` |
| Relationship Compass | `STRIPE_PRICE_RELATIONSHIP_COMPASS` |
| Creativity Compass | `STRIPE_PRICE_CREATIVITY_COMPASS` |
| Helpful People Compass | `STRIPE_PRICE_HELPFUL_PEOPLE_COMPASS` |
| Career Compass | `STRIPE_PRICE_CAREER_COMPASS` |
| Knowledge Compass | `STRIPE_PRICE_KNOWLEDGE_COMPASS` |
| Family Compass | `STRIPE_PRICE_FAMILY_COMPASS` |
| Health Compass | `STRIPE_PRICE_HEALTH_COMPASS` |
| Year Ahead Compass ($9) | `STRIPE_PRICE_YEAR_AHEAD_COMPASS` |

Description pattern for the catalogue: "Your <topic> read for your Kua. A
short personalised PDF: the traditional placements for this part of your
home, keyed to your number."

---

## TABLE C - COURSE (no upload)

| Product | Price | Vercel env var | Notes |
|---|---|---|---|
| 7-Day Home Reset | $19 | `STRIPE_PRICE_RESET` | needs migration 0008 + `CRON_SECRET` |

---

## RECOMMENDED LAUNCH ORDER (do not do all 40 at once)

Launching 40 products in one sitting is a lot of manual Stripe work and a
long shelf of waitlist cards. A focused first wave converts better and
proves the plumbing:

- **Wave 1 (proven, fast):** the static products that just need an upload
  (Good-Days Calendar, Bedroom Reset, Money Kit, Diagnostic Workbook,
  Ritual Pack, Cures, Healthy Home, Five Elements, Starter Deck, BaZi,
  Whole-Home Bundle). These reuse the Planner's exact, already-tested
  delivery path.
- **Wave 2 (test the render path):** Personal Compass first, confirm the
  PDF renders + emails, then Extended, Complete Home, the two $29 bundles,
  Couple, Move-In, the two Pick-Three.
- **Wave 3:** the 22 single-topic $7 Compasses, in batches.

The rest of your plan (real landing pages, images, video, examples,
reviews) is the polish phase after the money path is open.
