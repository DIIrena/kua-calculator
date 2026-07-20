// Weekly funnel readout. Read-only: queries Supabase for the numbers the
// dashboards do not show side by side, and prints one compact report.
//
// Usage (from projects/kua-calculator):
//   node scripts/funnel-readout.mjs            (last 7 days)
//   node scripts/funnel-readout.mjs --days=30
//
// The full weekly ritual (5 minutes) lives in spec/funnel-readout-guide.md:
// Vercel Analytics for views, Stripe for checkout sessions, this script
// for what landed in the database.

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function loadEnv() {
  const p = path.join(ROOT, ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}
loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([a-z-]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const days = Number(args.days) > 0 ? Number(args.days) : 7;
const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

async function rows(table, select, filter = "") {
  const url =
    `${SUPABASE_URL}/rest/v1/${table}?select=${encodeURIComponent(select)}` +
    (filter ? `&${filter}` : "");
  const res = await fetch(url, {
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
  });
  if (!res.ok) {
    console.error(`${table}: ${res.status} ${await res.text()}`);
    return [];
  }
  return res.json();
}

function count(list, keyFn) {
  const out = {};
  for (const r of list) {
    const k = keyFn(r);
    out[k] = (out[k] || 0) + 1;
  }
  return out;
}

const [orders, waitlist, deliveries, enrollments, profiles] = await Promise.all([
  rows("product_orders", "product_slug,amount_cents,created_at", `created_at=gte.${since}`),
  rows("product_waitlist", "product_slug,created_at"),
  rows("product_deliveries", "delivered_at", `delivered_at=gte.${since}`),
  rows("course_enrollments", "enrolled_at", `enrolled_at=gte.${since}`),
  rows("profiles", "marketing_opt_in,created_at"),
]);

const newsletterAll = waitlist.filter((w) => w.product_slug === "newsletter");
const newsletterNew = newsletterAll.filter((w) => w.created_at >= since);
const productWaits = waitlist.filter((w) => w.product_slug !== "newsletter");
const revenueCents = orders.reduce((s, o) => s + (Number(o.amount_cents) || 0), 0);
const optIns = profiles.filter((p) => p.marketing_opt_in).length;

console.log(`\nMy Feng Shui Home - funnel readout, last ${days} day(s)`);
console.log("=".repeat(52));
console.log(`Orders:               ${orders.length}   ($${(revenueCents / 100).toFixed(2)})`);
for (const [slug, n] of Object.entries(count(orders, (o) => o.product_slug))) {
  console.log(`  ${slug}: ${n}`);
}
console.log(`Deliveries rendered:  ${deliveries.length}`);
console.log(`Course enrollments:   ${enrollments.length}`);
console.log(`Newsletter list:      ${newsletterAll.length} total (+${newsletterNew.length} in window)`);
console.log(`Product waitlists:    ${productWaits.length} total`);
for (const [slug, n] of Object.entries(count(productWaits, (w) => w.product_slug))) {
  console.log(`  ${slug}: ${n}`);
}
console.log(`Accounts:             ${profiles.length} (${optIns} opted in to marketing)`);
console.log("\nNext stops (2 min each):");
console.log("  1. vercel.com > project > Analytics: views for /products and /products/*");
console.log("  2. dashboard.stripe.com > Payments: sessions created vs completed");
console.log("  3. Act on the LARGEST drop between steps, not on guesses.");
