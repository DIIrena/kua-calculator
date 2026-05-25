import { sendChecklist } from "@/app/actions/lead-magnet";

// Inline lead-magnet form. Posts directly to the sendChecklist server
// action, which validates the email, rate-limits, sends the PDF via
// Resend, then redirects with a status query param so the page
// renders inline feedback. Pre-fills the email when the visitor is
// signed in.

type Props = {
  preFilledEmail: string | null;
};

export default function LeadMagnetForm({ preFilledEmail }: Props) {
  return (
    <form action={sendChecklist} className="lead-magnet-form">
      <label className="lead-magnet-label" htmlFor="lead-magnet-email">
        Your email
      </label>
      <div className="lead-magnet-row">
        <input
          id="lead-magnet-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={preFilledEmail ?? ""}
          placeholder="you@example.com"
          className="lead-magnet-input"
        />
        <button type="submit" className="cta-primary lead-magnet-submit">
          Email me the checklist
        </button>
      </div>
      <p className="lead-magnet-note">
        One email. The PDF. We do not add you to any list. You can sign up later
        if you want more.
      </p>
    </form>
  );
}
