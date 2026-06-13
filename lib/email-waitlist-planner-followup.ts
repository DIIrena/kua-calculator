// Week-later follow-up email for the 2026 Feng Shui Planner
// waitlist. Sent roughly 7 days after the confirmation email.
//
// The voice here is storytelling-copy, not practitioner: the goal is
// to remind the reader why they joined and to plant the brand voice
// gently. No CTA pressure, no countdown, no fake scarcity. One inline
// sample image, three short paragraphs, and a quiet link back.
//
// MVP status: this template is wired up but not yet on a scheduler.
// See app/actions/send-planner-followup.ts for the manual trigger.

export function buildPlannerFollowupHtml(
  siteUrl: string,
  sampleImageUrl: string,
): string {
  const root = siteUrl.replace(/\/$/, "");
  const productUrl = `${root}/products/annual-feng-shui-planner-2026`;
  // If a caller passes a path-only URL ("/products/..."), prefix it
  // with the site root so mail clients render it correctly.
  const image = sampleImageUrl.startsWith("http")
    ? sampleImageUrl
    : `${root}${sampleImageUrl.startsWith("/") ? "" : "/"}${sampleImageUrl}`;
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>A page from the 2026 Planner</title></head>
  <body style="margin:0;padding:32px 16px;background:#fcfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0e3b2c;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;background:#ffffff;border:1px solid #e2dac5;border-radius:14px;padding:32px;">
          <tr><td align="center" style="padding-bottom:16px;">
            <div style="font-family:'Brush Script MT',cursive;font-size:30px;color:#0e3b2c;line-height:1;">My Feng Shui Home</div>
          </td></tr>
          <tr><td>
            <h1 style="margin:0 0 12px;font:700 22px sans-serif;color:#0e3b2c;">A page from the planner.</h1>
            <p style="margin:0 0 14px;font:16px/1.65 sans-serif;color:#0e3b2c;">A week ago you joined the waitlist for the 2026 Feng Shui Planner. I wanted to show you the kind of page you will be reading when it lands. Below is one section from the middle of the book, the way it will look when you open the PDF on your kitchen counter.</p>
          </td></tr>
          <tr><td align="center" style="padding:8px 0 18px;">
            <img src="${image}" alt="A sample page from the 2026 Feng Shui Planner" width="440" style="display:block;width:100%;max-width:440px;height:auto;border:1px solid #e2dac5;border-radius:6px;" />
          </td></tr>
          <tr><td>
            <p style="margin:0 0 14px;font:16px/1.65 sans-serif;color:#0e3b2c;">Every practical chapter sits inside the same six-box structure. <em>What this means</em>, <em>do this</em>, <em>avoid this</em>, a <em>practitioner tip</em>, a <em>real home example</em>, and one closing line called <em>if you only do one thing</em>. You can read the whole section, or you can stop at the last line and still have everything you need.</p>
            <p style="margin:0 0 14px;font:16px/1.65 sans-serif;color:#0e3b2c;">The launch is still upcoming. We are waiting on the business bank account to clear so we can wire up live payments. There is no pressure from this side. When the date is firm we email you the launch page and the early price, and not a moment before.</p>
            <p style="margin:24px 0 0;text-align:center;">
              <a href="${productUrl}" style="display:inline-block;background:#0e3b2c;color:#ffffff;text-decoration:none;font:600 15px sans-serif;padding:13px 26px;border-radius:999px;">Re-read the planner page</a>
            </p>
          </td></tr>
          <tr><td style="padding-top:24px;font:13px/1.5 sans-serif;color:#4f5b53;border-top:1px solid #e2dac5;">
            You joined this list at myfengshuihome.com. You can unsubscribe at any time. We will not share your address.
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

export function buildPlannerFollowupText(): string {
  return `A page from the planner.

A week ago you joined the waitlist for the 2026 Annual Feng Shui
Planner. I wanted to show you the kind of page you will be reading
when it lands. The link below opens a sample section from the
middle of the book.

Every practical chapter sits inside the same six-box structure:
what this means, do this, avoid this, a practitioner tip, a real
home example, and one closing line called "if you only do one
thing". You can read the whole section, or you can stop at the
last line and still have everything you need.

The launch is still upcoming. We are waiting on the business bank
account to clear so we can wire up live payments. There is no
pressure from this side. When the date is firm we email you the
launch page and the early price, and not a moment before.

Re-read the planner page:
https://myfengshuihome.com/products/annual-feng-shui-planner-2026

You can unsubscribe at any time. We will not share your address.

My Feng Shui Home - myfengshuihome.com`;
}
