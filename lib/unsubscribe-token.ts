// Signed, stateless unsubscribe links for course emails. The token is an
// HMAC of "email:courseSlug" keyed with AUTH_SECRET, so a link cannot be
// forged to unsubscribe an address the sender did not encode, and no
// token needs to be stored. The email is carried base64url in the URL so
// the unsubscribe route knows which row to flip.

import { createHmac, timingSafeEqual } from "node:crypto";

function secret(): string {
  return process.env.AUTH_SECRET || "";
}

function sign(email: string, courseSlug: string): string {
  return createHmac("sha256", secret())
    .update(`${email.toLowerCase()}:${courseSlug}`)
    .digest("base64url");
}

/** Build the unsubscribe URL for an email + course. */
export function unsubscribeUrl(
  site: string,
  email: string,
  courseSlug: string,
): string {
  const root = site.replace(/\/$/, "");
  const e = Buffer.from(email.toLowerCase()).toString("base64url");
  const t = sign(email, courseSlug);
  return `${root}/api/unsubscribe?e=${e}&c=${encodeURIComponent(courseSlug)}&t=${t}`;
}

/**
 * Verify an unsubscribe request. Returns the decoded email if the token
 * is valid for (email, courseSlug), otherwise null.
 */
export function verifyUnsubscribe(
  emailB64: string,
  courseSlug: string,
  token: string,
): string | null {
  let email: string;
  try {
    email = Buffer.from(emailB64, "base64url").toString("utf-8");
  } catch {
    return null;
  }
  if (!email || !secret()) return null;
  const expected = sign(email, courseSlug);
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  return timingSafeEqual(a, b) ? email : null;
}
