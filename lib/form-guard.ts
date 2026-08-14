// Bot guard for the public email-capture forms (footer subscribe,
// Good-Days, checklist, product waitlists). Two invisible signals,
// rendered by components/FormGuardFields.tsx:
//
//  - "website": a honeypot text input humans never see or fill.
//  - "fgt": the client-side mount timestamp. Headless scripts that
//    replay the POST without running the page's JS never carry it,
//    and scripted browsers that submit instantly carry one younger
//    than any human submission.
//
// Added 2026-08-14 after a list-bombing run flooded product_waitlist
// (~65 fake newsletter signups between 08-10 and 08-14). Callers treat
// a non-null return as "pretend success": no insert, no email, no
// signal to the bot that it was caught.

const MIN_HUMAN_MS = 3000;

export function botCheck(formData: FormData): string | null {
  const honeypot = String(formData.get("website") ?? "");
  if (honeypot.trim() !== "") return "honeypot filled";

  const fgt = String(formData.get("fgt") ?? "");
  if (!fgt) return "timing field missing";
  const mountedAt = Number(fgt);
  if (!Number.isFinite(mountedAt)) return "timing field malformed";

  const age = Date.now() - mountedAt;
  // Only the instant-submit window is rejected. Negative ages (client
  // clock ahead of the server) and old pages left open are both human
  // patterns and pass.
  if (age >= 0 && age < MIN_HUMAN_MS) return `submitted in ${age}ms`;

  return null;
}
