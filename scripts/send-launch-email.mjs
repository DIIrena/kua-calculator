// Launch-email sender for product waitlists.
//
// Reads the waitlist segment for one product from Supabase, dedupes,
// and sends the launch email via Resend, one send per address with a
// small delay (Resend free tier is rate-limited; ~2/sec is safe).
//
// SAFE BY DEFAULT: without --live it is a dry run - it prints the
// recipient count, writes the rendered email to scripts/out/ for
// review, and sends NOTHING.
//
// Usage (from projects/kua-calculator):
//   node scripts/send-launch-email.mjs --product=annual-feng-shui-planner-2026
//   node scripts/send-launch-email.mjs --product=annual-feng-shui-planner-2026 --live
//   node scripts/send-launch-email.mjs --product=personal-feng-shui-compass --live
//
// Reads env from .env.local (NEXT_PUBLIC_SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY, AUTH_RESEND_KEY). One email per address
// ever: a sent log is kept at scripts/out/sent-<product>.json so a
// re-run never double-sends.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "scripts", "out");

// ---------- tiny .env.local loader ----------
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
const RESEND_KEY = process.env.AUTH_RESEND_KEY;
const SITE = "https://myfengshuihome.com";
const FROM = "My Feng Shui Home <hello@myfengshuihome.com>";

// ---------- launch copy per product ----------
// Calm voice. A real deadline (the coupon expires in Stripe), no
// theater. One CTA. No outcome promises. No em dashes.
const TEMPLATES = {
  "annual-feng-shui-planner-2026": {
    subject: "The 2026 Annual Feng Shui Planner is ready. Your early price is inside.",
    heading: "It is ready.",
    paragraphs: [
      "You joined the waitlist for the 2026 Annual Feng Shui Planner. Checkout is now open.",
      "The Planner is a printable book of more than 80 pages for the 2026 solar year, July 2026 through February 2027: the annual chart explained, nine sector treatments, a 243-day day-by-day calendar (with a phone calendar file included), and a ten-step walkthrough for your own home.",
      "Your waitlist price: use the code EARLYLIST at checkout for 5 dollars off. The code works for 14 days, then it expires for good.",
      "7-day refund, code or no code.",
    ],
    ctaLabel: "See the Planner and buy",
    ctaUrl: `${SITE}/products/annual-feng-shui-planner-2026`,
  },
  "personal-feng-shui-compass": {
    subject: "The Personal Feng Shui Compass is live. Your early price is inside.",
    heading: "The Compass is live.",
    paragraphs: [
      "You joined the waitlist for the Personal Feng Shui Compass. Checkout is now open.",
      "It is a personalised PDF keyed to your Kua number: your East or West group, your four supportive directions and your four to handle with care, with traditional placements for the bed, the desk, and the dining seat, plus a seven-day experiment. You pay, fill in three fields, and the PDF is rendered and emailed to you within about a minute.",
      "Your waitlist price: use the code EARLYLIST at checkout for the launch discount. The code works for 14 days, then it expires for good.",
      "7-day refund.",
    ],
    ctaLabel: "See the Compass and buy",
    ctaUrl: `${SITE}/products/personal-feng-shui-compass`,
  },
};

function renderHtml(t) {
  const body = t.paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 12px;font:16px/1.6 sans-serif;color:#0e3b2c;">${p}</p>`,
    )
    .join("\n");
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:32px 16px;background:#fcfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0e3b2c;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #e2dac5;border-radius:14px;padding:32px;">
        <tr><td>
          <div style="font-family:'Brush Script MT',cursive;font-size:30px;color:#0e3b2c;line-height:1;">My Feng Shui Home</div>
          <hr style="border:none;border-top:1px solid #e2dac5;margin:18px 0 24px;" />
          <h1 style="margin:0 0 12px;font:700 22px sans-serif;color:#0e3b2c;">${t.heading}</h1>
          ${body}
          <p style="margin:18px 0 0;"><a href="${t.ctaUrl}" style="display:inline-block;background:#0e3b2c;color:#ffffff;text-decoration:none;font:600 15px sans-serif;padding:13px 26px;border-radius:999px;">${t.ctaLabel}</a></p>
        </td></tr>
        <tr><td style="padding-top:24px;font:13px/1.5 sans-serif;color:#4f5b53;border-top:1px solid #e2dac5;">
          You receive this because you joined this product's waitlist on myfengshuihome.com. This is the launch email you signed up for; there is no recurring newsletter behind it. Reply to this email and a person reads it.
        </td></tr>
      </table>
      <div style="font-size:12px;color:#4f5b53;padding-top:14px;">myfengshuihome.com</div>
    </td></tr>
  </table>
</body>
</html>`;
}

function renderText(t) {
  return [
    t.heading,
    "",
    ...t.paragraphs.flatMap((p) => [p, ""]),
    `${t.ctaLabel}: ${t.ctaUrl}`,
    "",
    "You receive this because you joined this product's waitlist on",
    "myfengshuihome.com. Reply to this email and a person reads it.",
  ].join("\n");
}

// ---------- main ----------
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([a-z-]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);

const product = args.product;
const live = args.live === true;

if (!product || !TEMPLATES[product]) {
  console.error(
    `Usage: node scripts/send-launch-email.mjs --product=<slug> [--live]\n` +
      `Known products: ${Object.keys(TEMPLATES).join(", ")}`,
  );
  process.exit(1);
}
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const template = TEMPLATES[product];
mkdirSync(OUT_DIR, { recursive: true });

// Fetch the waitlist segment via PostgREST.
const res = await fetch(
  `${SUPABASE_URL}/rest/v1/product_waitlist?product_slug=eq.${encodeURIComponent(product)}&select=email`,
  {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  },
);
if (!res.ok) {
  console.error(`Supabase query failed: ${res.status} ${await res.text()}`);
  process.exit(1);
}
const rows = await res.json();
const all = [...new Set(rows.map((r) => String(r.email).toLowerCase()))];

// Skip anyone already emailed in a prior run.
const sentLogPath = path.join(OUT_DIR, `sent-${product}.json`);
const alreadySent = existsSync(sentLogPath)
  ? new Set(JSON.parse(readFileSync(sentLogPath, "utf8")))
  : new Set();
const recipients = all.filter((e) => !alreadySent.has(e));

console.log(
  `Waitlist for ${product}: ${all.length} unique address(es), ` +
    `${alreadySent.size} already sent, ${recipients.length} to send.`,
);

// Always write the rendered email for review.
const previewPath = path.join(OUT_DIR, `launch-${product}.html`);
writeFileSync(previewPath, renderHtml(template));
console.log(`Preview written: ${previewPath}`);

if (!live) {
  console.log("\nDRY RUN. Nothing sent. Re-run with --live to send.");
  console.log("Recipients:", recipients.join(", ") || "(none)");
  process.exit(0);
}

if (!RESEND_KEY) {
  console.error("Missing AUTH_RESEND_KEY; cannot send.");
  process.exit(1);
}

const html = renderHtml(template);
const text = renderText(template);
const sentNow = [];
for (const to of recipients) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject: template.subject, html, text }),
  });
  if (r.ok) {
    sentNow.push(to);
    console.log(`sent: ${to}`);
  } else {
    console.error(`FAILED ${to}: ${r.status} ${await r.text()}`);
  }
  // ~2 per second to stay friendly with the rate limit.
  await new Promise((resolve) => setTimeout(resolve, 600));
}

writeFileSync(
  sentLogPath,
  JSON.stringify([...alreadySent, ...sentNow], null, 2),
);
console.log(
  `\nDone. ${sentNow.length} sent this run. Log: ${sentLogPath}`,
);
