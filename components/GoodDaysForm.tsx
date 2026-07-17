import { sendGoodDays } from "@/app/actions/good-days";

// Email-capture form for the free Good Days page. Posts to the
// sendGoodDays server action, which emails a link to this page and,
// only when the optional box is ticked, stores the address for the
// future (owner-gated) notes list. Mirrors LeadMagnetForm.

export default function GoodDaysForm() {
  return (
    <form action={sendGoodDays} className="lead-magnet-form">
      <label className="lead-magnet-label" htmlFor="gd-email-input">
        Your email
      </label>
      <div className="lead-magnet-row">
        <input
          id="gd-email-input"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="lead-magnet-input"
        />
        <button type="submit" className="cta-primary lead-magnet-submit">
          Email me the calendar
        </button>
      </div>
      <p className="lead-magnet-checkbox-row">
        <label htmlFor="gd-notes">
          <input id="gd-notes" name="notes" type="checkbox" value="yes" />{" "}
          Also send me the occasional calm feng shui note (optional)
        </label>
      </p>
      <p className="lead-magnet-note">
        One email with the link. Unless you tick the box, we do not add you
        to any list.
      </p>
    </form>
  );
}
