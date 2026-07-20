// The welcome sequence: the THREE emails approved by the owner on
// 2026-07-18 (spec/welcome-emails-2026-07-18.md), wired verbatim. Copy
// changes belong in that spec first, owner-approved, then here.
//
// Audience: the consented note lists only (product_waitlist slugs
// "newsletter" and "good-days"). Cadence: step 1 on join, step 2 about
// day 3, step 3 about day 7. Then nothing scheduled.
//
// NOTHING SENDS unless WELCOME_SEQUENCE_ENABLED=true (see the cron at
// app/api/cron/welcome/route.ts and spec/welcome-sequence-runbook.md).

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://myfengshuihome.com";

export type SequenceStep = {
  step: 1 | 2 | 3;
  /** Days after joining the list when this step becomes due. */
  dueAfterDays: number;
  subject: string;
  paragraphsHtml: string[];
  text: string;
};

function p(html: string): string {
  return `<p style="margin:0 0 12px;font:16px/1.6 sans-serif;color:#0e3b2c;">${html}</p>`;
}

export const WELCOME_STEPS: SequenceStep[] = [
  {
    step: 1,
    dueAfterDays: 0,
    subject: "A way into feng shui for your home",
    paragraphsHtml: [
      p("Hello, and thank you for joining :)"),
      p(
        "My Feng Shui Home is a practical guide to feng shui written by an architect. It gives you a structured way to notice your space, and it says plainly which recommendations rest on design evidence and which are tradition.",
      ),
      p("Two free things worth keeping:"),
      `<ul style="margin:0 0 12px;padding-left:20px;font:16px/1.6 sans-serif;color:#0e3b2c;">
<li>The Kua calculator gives you your number and your eight directions in about ten seconds: <a href="${SITE}/kua-calculator" style="color:#d9531a;">myfengshuihome.com/kua-calculator</a></li>
<li>The Good Days calendar lists every favourable date from July 2026 to February 2027, with the reason for each: <a href="${SITE}/good-days" style="color:#d9531a;">myfengshuihome.com/good-days</a></li>
</ul>`,
      p("Have a great day!"),
      p("I.D."),
    ],
    text: [
      "Hello, and thank you for joining :)",
      "",
      "My Feng Shui Home is a practical guide to feng shui written by an",
      "architect. It gives you a structured way to notice your space, and",
      "it says plainly which recommendations rest on design evidence and",
      "which are tradition.",
      "",
      "Two free things worth keeping:",
      "",
      "- The Kua calculator gives you your number and your eight",
      `  directions in about ten seconds: ${SITE}/kua-calculator`,
      "- The Good Days calendar lists every favourable date from July",
      `  2026 to February 2027, with the reason for each: ${SITE}/good-days`,
      "",
      "Have a great day!",
      "",
      "I.D.",
    ].join("\n"),
  },
  {
    step: 2,
    dueAfterDays: 3,
    subject: "One small change you can try tonight",
    paragraphsHtml: [
      p("Here is a move that costs nothing."),
      p(
        "From where you sleep, can you see the door without lying directly in its path? The tradition calls this the command position. The design reason is simple: a clear view of the way in is easier to settle near, and a bed directly in the door line sits in the room's busiest sight line.",
      ),
      p(
        "Try shifting the bed and give it a week. Notice whether the room reads differently when you walk in.",
      ),
      p(
        `If you would like your own directions read properly, the Personal Feng Shui Compass reads your Kua and your eight directions in depth, with a seven-day experiment to test the placement. $19, one-time: <a href="${SITE}/products/personal-feng-shui-compass" style="color:#d9531a;">myfengshuihome.com/products/personal-feng-shui-compass</a>`,
      ),
      p("I.D."),
    ],
    text: [
      "Here is a move that costs nothing.",
      "",
      "From where you sleep, can you see the door without lying directly",
      "in its path? The tradition calls this the command position. The",
      "design reason is simple: a clear view of the way in is easier to",
      "settle near, and a bed directly in the door line sits in the",
      "room's busiest sight line.",
      "",
      "Try shifting the bed and give it a week. Notice whether the room",
      "reads differently when you walk in.",
      "",
      "If you would like your own directions read properly, the Personal",
      "Feng Shui Compass reads your Kua and your eight directions in",
      "depth, with a seven-day experiment to test the placement. $19,",
      `one-time: ${SITE}/products/personal-feng-shui-compass`,
      "",
      "I.D.",
    ].join("\n"),
  },
  {
    step: 3,
    dueAfterDays: 7,
    subject: "When one room is not enough",
    paragraphsHtml: [
      p(
        "Most feng shui advice hands you fragments: a tip for the bedroom, a rule for the desk, a warning about mirrors. A home is one system, and reading it room by room without the connections is how the advice starts to contradict itself.",
      ),
      p(
        `That is what the Complete Home Compass is for. It reads everything for your Kua in one personalised book: all eight directions, all twelve rooms, all nine life areas, and more, around 115 to 165 your personal pages. $49, one-time, emailed within about a minute: <a href="${SITE}/products/complete-home-compass" style="color:#d9531a;">myfengshuihome.com/products/complete-home-compass</a>`,
      ),
      p(
        `If a whole book is more than you need right now, check out the free guide on the website <a href="${SITE}/guide" style="color:#d9531a;">myfengshuihome.com/guide</a> or find your cup of tea: <a href="${SITE}/products" style="color:#d9531a;">myfengshuihome.com/products</a>`,
      ),
      p("I.D."),
    ],
    text: [
      "Most feng shui advice hands you fragments: a tip for the bedroom,",
      "a rule for the desk, a warning about mirrors. A home is one",
      "system, and reading it room by room without the connections is",
      "how the advice starts to contradict itself.",
      "",
      "That is what the Complete Home Compass is for. It reads everything",
      "for your Kua in one personalised book: all eight directions, all",
      "twelve rooms, all nine life areas, and more, around 115 to 165",
      "your personal pages. $49, one-time, emailed within about a",
      `minute: ${SITE}/products/complete-home-compass`,
      "",
      "If a whole book is more than you need right now, check out the",
      `free guide on the website ${SITE}/guide or find your`,
      `cup of tea: ${SITE}/products`,
      "",
      "I.D.",
    ].join("\n"),
  },
];

/** Render a sequence step as a full branded HTML email. */
export function welcomeEmailHtml(step: SequenceStep, unsubUrl: string): string {
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:32px 16px;background:#fcfcf8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0e3b2c;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #e2dac5;border-radius:14px;padding:32px;">
        <tr><td>
          <div style="font-family:'Brush Script MT',cursive;font-size:30px;color:#0e3b2c;line-height:1;">My Feng Shui Home</div>
          <hr style="border:none;border-top:1px solid #e2dac5;margin:18px 0 24px;" />
          ${step.paragraphsHtml.join("\n")}
        </td></tr>
        <tr><td style="padding-top:24px;font:13px/1.5 sans-serif;color:#4f5b53;border-top:1px solid #e2dac5;">
          You receive this because you subscribed to notes on myfengshuihome.com.
          <a href="${unsubUrl}" style="color:#4f5b53;">Unsubscribe with one click</a>
          and your address is deleted from the list. Reply and a person reads it.
        </td></tr>
      </table>
      <div style="font-size:12px;color:#4f5b53;padding-top:14px;">myfengshuihome.com</div>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Plain-text variant with the unsubscribe pointer appended. */
export function welcomeEmailText(step: SequenceStep, unsubUrl: string): string {
  return `${step.text}\n\nUnsubscribe with one click (deletes your address):\n${unsubUrl}\n`;
}
