// Delivery email builders for the buy flow. Three emails:
//
//   1. Static delivery: signed download links, sent by the webhook the
//      moment a static product (Planner, Calendar) is paid.
//   2. Personalisation invite: sent by the webhook when a personalized
//      product (Compass) is paid, pointing at the post-checkout form.
//   3. Personalised delivery: the rendered PDF link, sent by the
//      fulfil action after the form is submitted.
//
// Voice rules: no outcome promises, no em dashes, no refund
// pointers (the policy lives at /legal), one calm cross-sell line maximum.

const BRAND = "My Feng Shui Home";

function shell(bodyHtml: string): string {
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:32px 16px;background:#fcfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0e3b2c;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #e2dac5;border-radius:14px;padding:32px;">
        <tr><td>
          <div style="font-family:'Brush Script MT',cursive;font-size:30px;color:#0e3b2c;line-height:1;">${BRAND}</div>
          <hr style="border:none;border-top:1px solid #e2dac5;margin:18px 0 24px;" />
          ${bodyHtml}
        </td></tr>
        <tr><td style="padding-top:24px;font:13px/1.5 sans-serif;color:#4f5b53;border-top:1px solid #e2dac5;">
          Reply to this email if a link
          stops working and we send a fresh one.
        </td></tr>
      </table>
      <div style="font-size:12px;color:#4f5b53;padding-top:14px;">myfengshuihome.com</div>
    </td></tr>
  </table>
</body>
</html>`;
}

function linkButton(href: string, label: string): string {
  return `<p style="margin:14px 0 0;"><a href="${href}" style="display:inline-block;background:#0e3b2c;color:#ffffff;text-decoration:none;font:600 15px sans-serif;padding:13px 26px;border-radius:999px;">${label}</a></p>`;
}

// Review request appended to delivery emails (2026-07-20). The single
// fastest, most honest way to get real reviews: ask the buyer who now has
// the product in hand. Reply-to-email keeps it frictionless and consented;
// the owner records genuine replies (with the reader's rating) into
// lib/testimonials.ts. No incentive is stated here, no pressure, and it is
// explicitly optional, so nothing about it is deceptive or coercive.
function reviewRequestHtml(): string {
  return `<div style="margin:26px 0 0;padding:16px 18px;background:#f2f2ee;border-radius:10px;">
    <p style="margin:0 0 6px;font:600 15px sans-serif;color:#0e3b2c;">One small favour, if it was useful</p>
    <p style="margin:0;font:14px/1.6 sans-serif;color:#4f5b53;">If this helped you decide something about your home, I would love a sentence on what it was, and a rating out of 5 if you like. Just reply to this email. Real notes from readers help other people more than anything else we can say, and it is always optional.</p>
  </div>`;
}

function reviewRequestText(): string {
  return [
    "One small favour, if it was useful:",
    "If this helped you decide something about your home, I would love a",
    "sentence on what it was, and a rating out of 5 if you like. Just reply",
    "to this email. Always optional.",
  ].join("\n");
}

export function buildStaticDeliveryEmail(input: {
  productTitle: string;
  links: Array<{ url: string; label: string }>;
  crossSellLine?: { text: string; url: string; label: string };
}): { subject: string; html: string; text: string } {
  const subject = `Your ${input.productTitle} is ready`;

  const linksHtml = input.links
    .map((l) => linkButton(l.url, l.label))
    .join("\n");

  const crossSellHtml = input.crossSellLine
    ? `<p style="margin:24px 0 0;font:14px/1.6 sans-serif;color:#4f5b53;">${input.crossSellLine.text} <a href="${input.crossSellLine.url}" style="color:#0e3b2c;">${input.crossSellLine.label}</a></p>`
    : "";

  const html = shell(`
    <h1 style="margin:0 0 12px;font:700 22px sans-serif;color:#0e3b2c;">Your ${input.productTitle} is ready.</h1>
    <p style="margin:0 0 12px;font:16px/1.6 sans-serif;color:#0e3b2c;">Thank you for the purchase. Your files are below. The links work for 7 days; if one expires, reply to this email and we send a fresh one.</p>
    ${linksHtml}
    ${crossSellHtml}
    ${reviewRequestHtml()}
  `);

  const text = [
    `Your ${input.productTitle} is ready.`,
    "",
    "Thank you for the purchase. Your files:",
    "",
    ...input.links.map((l) => `${l.label}: ${l.url}`),
    "",
    "Links work for 7 days. Reply to this email for a fresh link.",
    input.crossSellLine
      ? `\n${input.crossSellLine.text} ${input.crossSellLine.url}`
      : "",
    "",
    reviewRequestText(),
    "",
    "Questions? Just reply to this email.",
    `${BRAND} - myfengshuihome.com`,
  ].join("\n");

  return { subject, html, text };
}

export function buildPersonalizationInviteEmail(input: {
  productTitle: string;
  formUrl: string;
}): { subject: string; html: string; text: string } {
  const subject = `One step left: personalise your ${input.productTitle}`;

  const html = shell(`
    <h1 style="margin:0 0 12px;font:700 22px sans-serif;color:#0e3b2c;">Payment received. One step left.</h1>
    <p style="margin:0 0 12px;font:16px/1.6 sans-serif;color:#0e3b2c;">Your ${input.productTitle} is personalised to your Kua number. Fill in three fields (first name, birth date, gender) and the PDF is generated and emailed to you within about a minute.</p>
    ${linkButton(input.formUrl, "Personalise my reading")}
    <p style="margin:18px 0 0;font:14px/1.6 sans-serif;color:#4f5b53;">The link stays valid; come back any time if now is not the moment.</p>
  `);

  const text = [
    "Payment received. One step left.",
    "",
    `Your ${input.productTitle} is personalised to your Kua number.`,
    "Fill in three fields and the PDF is generated and emailed to you:",
    "",
    input.formUrl,
    "",
    "Questions? Just reply to this email.",
    `${BRAND} - myfengshuihome.com`,
  ].join("\n");

  return { subject, html, text };
}

export function buildPersonalizedDeliveryEmail(input: {
  productTitle: string;
  firstName: string;
  downloadUrl: string;
}): { subject: string; html: string; text: string } {
  const subject = `${input.firstName}, your ${input.productTitle} is ready`;

  const html = shell(`
    <h1 style="margin:0 0 12px;font:700 22px sans-serif;color:#0e3b2c;">Your ${input.productTitle} is ready.</h1>
    <p style="margin:0 0 12px;font:16px/1.6 sans-serif;color:#0e3b2c;">It is keyed to your Kua number, with your name on the cover. The link works for 7 days; if it expires, reply to this email and we send a fresh one. If you sign in with this email address, the file also stays on your account page.</p>
    ${linkButton(input.downloadUrl, "Download my PDF")}
    ${reviewRequestHtml()}
  `);

  const text = [
    `Your ${input.productTitle} is ready.`,
    "",
    "It is keyed to your Kua number, with your name on the cover.",
    "",
    `Download: ${input.downloadUrl}`,
    "",
    "The link works for 7 days. Reply to this email for a fresh one.",
    "",
    reviewRequestText(),
    "",
    "Questions? Just reply to this email.",
    `${BRAND} - myfengshuihome.com`,
  ].join("\n");

  return { subject, html, text };
}
