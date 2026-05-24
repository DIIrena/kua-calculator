// Thin Resend HTTP helper. Used by the chart email server action and by
// any future transactional emails. Auth.js v5's magic-link email has its
// own inline fetch in auth.ts (it pre-dates this helper); keeping the
// helper minimal lets the two coexist without churn.

const RESEND_FROM = "My Feng Shui Home <hello@myfengshuihome.com>";

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export type SendEmailResult =
  | { ok: true }
  | { ok: false; error: string };

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.AUTH_RESEND_KEY;
  if (!apiKey) {
    return { ok: false, error: "AUTH_RESEND_KEY is not set" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 240)}` };
    }
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: msg };
  }
}
