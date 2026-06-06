"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";

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
  "annual-feng-shui-planner-2026": {
    slug: "annual-feng-shui-planner-2026",
    title: "2026 Annual Feng Shui Planner",
    redirectPath: "/products/annual-feng-shui-planner-2026",
  },
  "move-in-kit": {
    slug: "move-in-kit",
    title: "Move-In Date Selection and Home Activation Kit",
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
};

function buildHtml(siteUrl: string, productTitle: string): string {
  const root = siteUrl.replace(/\/$/, "");
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>You are on the list - ${productTitle}</title></head>
  <body style="margin:0;padding:32px 16px;background:#f1e9d8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#2a271e;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#fbf7ee;border:1px solid #cfc4ab;border-radius:14px;padding:32px;">
          <tr><td align="center" style="padding-bottom:16px;">
            <div style="font-family:'Brush Script MT',cursive;font-size:30px;color:#4f5a36;line-height:1;">My Feng Shui Home</div>
          </td></tr>
          <tr><td>
            <h1 style="margin:0 0 12px;font:700 22px sans-serif;color:#2a271e;">You are on the list.</h1>
            <p style="margin:0 0 12px;font:16px/1.55 sans-serif;color:#2a271e;">Thank you for telling us you are interested in the <strong>${productTitle}</strong>. When it is ready, we will email you at this address with the launch price and the download link.</p>
            <p style="margin:0 0 12px;font:16px/1.55 sans-serif;color:#2a271e;">We will not put you on a marketing funnel. One email when the product ships. That is the whole promise.</p>
            <p style="margin:24px 0 0;text-align:center;">
              <a href="${root}/products" style="display:inline-block;background:#4f5a36;color:#ffffff;text-decoration:none;font:600 15px sans-serif;padding:13px 26px;border-radius:999px;">See the rest of our products</a>
            </p>
          </td></tr>
          <tr><td style="padding-top:24px;font:13px/1.5 sans-serif;color:#5f5848;border-top:1px solid #cfc4ab;">
            If you signed up by mistake, ignore this email and we will not contact you again.
          </td></tr>
        </table>
        <div style="font-size:12px;color:#5f5848;padding-top:14px;">
          <a href="${root}" style="color:#4f5a36;text-decoration:none;">myfengshuihome.com</a>
        </div>
      </td></tr>
    </table>
  </body>
</html>`;
}

function buildText(productTitle: string): string {
  return `You are on the list.

Thank you for telling us you are interested in the ${productTitle}.
When it is ready, we will email you at this address with the launch
price and the download link.

We will not put you on a marketing funnel. One email when the
product ships. That is the whole promise.

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
        subject: `You are on the list - ${product.title}`,
        html: buildHtml(siteUrl, product.title),
        text: buildText(product.title),
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
