"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { COMPASS_CATALOGUE } from "@/lib/compass-catalogue";

// Product-waitlist server action. Used by BuyButton in waitlist mode
// while live payments are not yet wired. Captures email + product
// slug into public.product_waitlist (de-duped), sends a confirmation
// email, and redirects back to the product page with a success flag.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ProductMeta = {
  slug: string;
  title: string;
  /** Where to redirect on success / error - the product page. */
  redirectPath: string;
};

// Per-product copy for the confirmation email subject + body. Keep
// this aligned with the product titles on the landing pages.
const PRODUCTS: Record<string, ProductMeta> = {
  "personal-feng-shui-compass": {
    slug: "personal-feng-shui-compass",
    title: "Personal Feng Shui Compass",
    redirectPath: "/products/personal-feng-shui-compass",
  },
  "extended-personal-kua-report": {
    slug: "extended-personal-kua-report",
    title: "Extended Personal Kua Report",
    redirectPath: "/products/extended-personal-kua-report",
  },
  "annual-feng-shui-planner-2026": {
    slug: "annual-feng-shui-planner-2026",
    title: "2026 Feng Shui Planner: Mid-Year Edition",
    redirectPath: "/products/annual-feng-shui-planner-2026",
  },
  "move-in-kit": {
    slug: "move-in-kit",
    title: "Move-In Date Report",
    redirectPath: "/products/move-in-kit",
  },
  "bedroom-reset": {
    slug: "bedroom-reset",
    title: "Bedroom and Relationship Reset",
    redirectPath: "/products/bedroom-reset",
  },
  "business-money-feng-shui": {
    slug: "business-money-feng-shui",
    title: "Business and Money Feng Shui Kit",
    redirectPath: "/products/business-money-feng-shui",
  },
  "home-diagnostic-workbook": {
    slug: "home-diagnostic-workbook",
    title: "10-Step Home Diagnostic Workbook",
    redirectPath: "/products/home-diagnostic-workbook",
  },
  "daily-ritual-pack": {
    slug: "daily-ritual-pack",
    title: "Daily Ritual and Twenty Laws Pack",
    redirectPath: "/products/daily-ritual-pack",
  },
  "healthy-home-audit": {
    slug: "healthy-home-audit",
    title: "Healthy Home Audit",
    redirectPath: "/products/healthy-home-audit",
  },
  "five-elements-workbook": {
    slug: "five-elements-workbook",
    title: "Five Elements Home Styling Workbook",
    redirectPath: "/products/five-elements-workbook",
  },
  "starter-deck": {
    slug: "starter-deck",
    title: "Learn Feng Shui Starter Deck",
    redirectPath: "/products/starter-deck",
  },
  "bazi-basics": {
    slug: "bazi-basics",
    title: "BaZi Basics: Read Your Own Chart",
    redirectPath: "/products/bazi-basics",
  },
  "cures-catalog": {
    slug: "cures-catalog",
    title: "Cures and Crystals Catalogue",
    redirectPath: "/products/cures-catalog",
  },
  "whole-home-starter-bundle": {
    slug: "whole-home-starter-bundle",
    title: "Whole-Home Starter Bundle",
    redirectPath: "/products/whole-home-starter-bundle",
  },
  "good-days-calendar-2026": {
    slug: "good-days-calendar-2026",
    title: "2026 Good-Days Calendar",
    redirectPath: "/products/good-days-calendar-2026",
  },
  "seven-day-home-reset": {
    slug: "seven-day-home-reset",
    title: "7-Day Home Reset",
    redirectPath: "/products/seven-day-home-reset",
  },
};

// Downstream Compass catalogue: register each slug so its waitlist form works.
for (const e of COMPASS_CATALOGUE) {
  PRODUCTS[e.slug] = {
    slug: e.slug,
    title: `${e.topicLabel} Compass`,
    redirectPath: `/products/${e.slug}`,
  };
}

function buildHtml(siteUrl: string, productTitle: string): string {
  const root = siteUrl.replace(/\/$/, "");
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>You are on the list - ${productTitle}</title></head>
  <body style="margin:0;padding:32px 16px;background:#fcfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0e3b2c;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #e2dac5;border-radius:14px;padding:32px;">
          <tr><td align="center" style="padding-bottom:16px;">
            <div style="font-family:'Brush Script MT',cursive;font-size:30px;color:#0e3b2c;line-height:1;">My Feng Shui Home</div>
          </td></tr>
          <tr><td>
            <h1 style="margin:0 0 12px;font:700 22px sans-serif;color:#0e3b2c;">You are on the list.</h1>
            <p style="margin:0 0 12px;font:16px/1.55 sans-serif;color:#0e3b2c;">Thank you for telling us you are interested in the <strong>${productTitle}</strong>.</p>
            <p style="margin:0 0 12px;font:16px/1.55 sans-serif;color:#0e3b2c;">When this product ships, we email you the launch page and the early price. You can unsubscribe any time.</p>
            <p style="margin:24px 0 0;text-align:center;">
              <a href="${root}/products" style="display:inline-block;background:#0e3b2c;color:#ffffff;text-decoration:none;font:600 15px sans-serif;padding:13px 26px;border-radius:999px;">See the rest of our products</a>
            </p>
          </td></tr>
          <tr><td style="padding-top:24px;font:13px/1.5 sans-serif;color:#4f5b53;border-top:1px solid #e2dac5;">
            If you signed up by mistake, ignore this email and we will not contact you again.
          </td></tr>
        </table>
        <div style="font-size:12px;color:#4f5b53;padding-top:14px;">
          <a href="${root}" style="color:#0e3b2c;text-decoration:none;">myfengshuihome.com</a>
        </div>
      </td></tr>
    </table>
  </body>
</html>`;
}

function buildText(productTitle: string): string {
  return `You are on the list.

Thank you for telling us you are interested in the ${productTitle}.

When this product ships, we email you the launch page and the
early price. You can unsubscribe any time.

My Feng Shui Home - myfengshuihome.com`;
}

// Planner-specific HTML. Richer than the generic version: inline cover
// image, one sensory practitioner paragraph, and the 2027 renewal
// note. File formats are deliberately not named here; they are kept
// private until purchase.
function buildHtmlPlanner(siteUrl: string): string {
  const root = siteUrl.replace(/\/$/, "");
  const coverUrl = `${root}/products/annual-feng-shui-planner-2026/cover-portrait.png`;
  const productUrl = `${root}/products/annual-feng-shui-planner-2026`;
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>You are on the list - 2026 Feng Shui Planner</title></head>
  <body style="margin:0;padding:32px 16px;background:#fcfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0e3b2c;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;background:#ffffff;border:1px solid #e2dac5;border-radius:14px;padding:32px;">
          <tr><td align="center" style="padding-bottom:16px;">
            <div style="font-family:'Brush Script MT',cursive;font-size:30px;color:#0e3b2c;line-height:1;">My Feng Shui Home</div>
          </td></tr>
          <tr><td align="center" style="padding-bottom:18px;">
            <img src="${coverUrl}" alt="The 2026 Feng Shui Planner cover" width="190" height="285" style="display:block;width:190px;height:auto;border:1px solid #e2dac5;border-radius:6px;" />
          </td></tr>
          <tr><td>
            <h1 style="margin:0 0 12px;font:700 22px sans-serif;color:#0e3b2c;">You are on the list.</h1>
            <p style="margin:0 0 12px;font:16px/1.6 sans-serif;color:#0e3b2c;">Thank you for your interest in the <strong>2026 Feng Shui Planner</strong>. Good news: checkout is open and the Planner is available now. The button below takes you straight to the product page.</p>
            <p style="margin:0 0 12px;font:16px/1.6 sans-serif;color:#0e3b2c;font-style:italic;color:#0e3b2c;">Picture the kettle doing its quiet steaming. You sit with the planner on the table, find your front door on the chart, find the south corner, find the one room the year asks you to leave a little alone, and you know where to start. The planner does that work for the whole solar year, room by room and month by month.</p>
            <p style="margin:0 0 12px;font:16px/1.6 sans-serif;color:#0e3b2c;">The 2027 edition follows in January 2027 as a full twelve-month book. As a 2026 buyer you receive a <strong>30 percent renewal offer</strong> when it ships.</p>
            <p style="margin:24px 0 0;text-align:center;">
              <a href="${productUrl}" style="display:inline-block;background:#0e3b2c;color:#ffffff;text-decoration:none;font:600 15px sans-serif;padding:13px 26px;border-radius:999px;">Open the planner page</a>
            </p>
          </td></tr>
          <tr><td style="padding-top:24px;font:13px/1.5 sans-serif;color:#4f5b53;border-top:1px solid #e2dac5;">
            You can unsubscribe any time. If you signed up by mistake, ignore this email and we will not contact you again.
          </td></tr>
        </table>
        <div style="font-size:12px;color:#4f5b53;padding-top:14px;">
          <a href="${root}" style="color:#0e3b2c;text-decoration:none;">myfengshuihome.com</a>
        </div>
      </td></tr>
    </table>
  </body>
</html>`;
}

function buildTextPlanner(siteUrl: string): string {
  const root = siteUrl.replace(/\/$/, "");
  return `You are on the list.

Thank you for your interest in the 2026 Feng Shui Planner.
Good news: checkout is open and the Planner is available now.
Open the product page here:
${root}/products/annual-feng-shui-planner-2026

Picture the kettle doing its quiet steaming. You sit with the
planner on the table, find your front door on the chart, find the
south corner, find the one room the year asks you to leave a little
alone, and you know where to start. The planner does that work for
the whole solar year, room by room and month by month.

The 2027 edition follows in January 2027 as a full twelve-month
book. As a 2026 buyer you receive a 30 percent renewal offer when
it ships.

You can unsubscribe any time.

My Feng Shui Home - myfengshuihome.com`;
}

export async function joinProductWaitlist(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const productSlug = String(formData.get("productSlug") ?? "").trim();

  const product = PRODUCTS[productSlug];
  if (!product) {
    redirect("/products?waitlist=unknown-product");
  }
  const redirectBase = product.redirectPath;

  if (!EMAIL_RE.test(email)) {
    redirect(`${redirectBase}?waitlist=invalid`);
  }

  // Insert into Supabase. The unique (email, product_slug) index
  // means a second signup is a silent no-op via on-conflict-do-nothing.
  // If the DB is not configured (placeholder env), we skip the insert
  // but still send the confirmation email so the form does not error
  // out at build time.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (url && !url.includes("PLACEHOLDER")) {
    try {
      const admin = createAdminClient();
      await admin
        .from("product_waitlist")
        .upsert(
          { email, product_slug: productSlug },
          { onConflict: "email,product_slug", ignoreDuplicates: true },
        );
    } catch (err) {
      console.error("[product-waitlist] supabase upsert failed:", err);
      // Do not fail the user; still send the confirmation.
    }
  }

  // Send the confirmation email via Resend.
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";
  const apiKey = process.env.AUTH_RESEND_KEY;
  if (!apiKey) {
    console.error("[product-waitlist] AUTH_RESEND_KEY is not set");
    redirect(`${redirectBase}?waitlist=error`);
  }

  // Branch per product. The planner gets the richer template with
  // the inline cover, the file-bundle naming, and the 30% renewal
  // note. Everything else uses the generic confirmation.
  const isPlanner = product.slug === "annual-feng-shui-planner-2026";
  const subject = isPlanner
    ? "You are on the list - 2026 Feng Shui Planner"
    : `You are on the list - ${product.title}`;
  const html = isPlanner
    ? buildHtmlPlanner(siteUrl)
    : buildHtml(siteUrl, product.title);
  const text = isPlanner
    ? buildTextPlanner(siteUrl)
    : buildText(product.title);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "My Feng Shui Home <hello@myfengshuihome.com>",
        to: email,
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(
        "[product-waitlist] Resend error:",
        res.status,
        body.slice(0, 200),
      );
      redirect(`${redirectBase}?waitlist=error`);
    }
  } catch (err) {
    if ((err as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    console.error("[product-waitlist] send threw:", err);
    redirect(`${redirectBase}?waitlist=error`);
  }

  redirect(`${redirectBase}?waitlist=sent`);
}
