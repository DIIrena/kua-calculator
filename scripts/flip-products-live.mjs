// Flip every still-waitlist product page to live: BuyButton -> stripe-live,
// the hero launch-state line and the buy-section to live copy, the skip
// link to checkout, and remove the floating waitlist CTA. Idempotent: a
// page with no state="waitlist" is skipped (so the already-live Planner,
// Compass, and Calendar are untouched).
//
// Usage: node scripts/flip-products-live.mjs

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";

const ROOT =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator/app/(site)/products";

// Fulfilment type drives the live copy. Anything not listed is personalized.
const STATIC = new Set([
  "bedroom-reset", "business-money-feng-shui", "home-diagnostic-workbook",
  "daily-ritual-pack", "cures-catalog", "healthy-home-audit",
  "five-elements-workbook", "starter-deck", "bazi-basics",
  "whole-home-starter-bundle",
]);
const COURSE = new Set(["seven-day-home-reset"]);

const LAUNCH = {
  static:
    "Available now. The files arrive by email the moment you buy.",
  personalized:
    "Available now. After you pay, you fill in a short form and the personalised PDF is generated and emailed to you within about a minute.",
  course:
    "Available now. The welcome email arrives the moment you buy, then one short task email a day for seven days.",
};
const BUY = {
  static:
    "Secure checkout. 7-day refund, no questions asked. Your files arrive by email the moment you buy.",
  personalized:
    "Secure checkout. 7-day refund, no questions asked. You fill in a short form after paying and the PDF is emailed to you.",
  course:
    "Secure checkout. 7-day refund, no questions asked. The course begins the moment you buy.",
};

function typeFor(slug) {
  if (STATIC.has(slug)) return "static";
  if (COURSE.has(slug)) return "course";
  return "personalized";
}

const dirs = readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== "[slug]")
  .map((d) => d.name);

let flipped = 0;
const skipped = [];

for (const slug of dirs) {
  const path = `${ROOT}/${slug}/page.tsx`;
  if (!existsSync(path)) continue;
  let src = readFileSync(path, "utf-8");
  if (!src.includes('state="waitlist"')) {
    skipped.push(`${slug} (already live or no waitlist button)`);
    continue;
  }
  const type = typeFor(slug);

  // 1. Buy button -> live.
  src = src.replaceAll('state="waitlist"', 'state="stripe-live"');

  // 2. Hero launch-state line -> live (bounded to that element).
  src = src.replace(
    /<p className="product-hero-launch-state">[\s\S]*?<\/p>/,
    `<p className="product-hero-launch-state">\n          ${LAUNCH[type]}\n        </p>`,
  );

  // 3. Skip link.
  src = src.replaceAll("Skip to the waitlist →", "Skip to checkout →");

  // 4. Buy-section heading + paragraph -> live (everything between the
  //    section open and the BuyButton).
  src = src.replace(
    /(<section className="product-buy-section">)[\s\S]*?(<BuyButton)/,
    `$1\n        <h2>Buy now.</h2>\n        <p>\n          ${BUY[type]}\n        </p>\n        $2`,
  );

  // 5. Remove the floating waitlist CTA element + its import.
  src = src.replace(/\n\s*<FloatingWaitlistCTA \/>/, "");
  src = src.replace(
    /import FloatingWaitlistCTA from "@\/components\/FloatingWaitlistCTA";\n/,
    "",
  );

  writeFileSync(path, src);
  flipped++;
  console.log(`live  ${slug} (${type})`);
}

console.log(`\n${flipped} flipped, ${skipped.length} skipped.`);
for (const s of skipped) console.log(`  - ${s}`);
