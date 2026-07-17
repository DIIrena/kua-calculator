/* Static JSX port of app/templates/_calculator.html.
   No logic lives here. Every element id is preserved exactly so the
   vanilla ui.js (loaded from /public/calculator/) can select on them.
   The two <template> elements are cloned by ui.js at render time.

   `isSignedIn` toggles the save-chart CTA: signed-in users see a
   Save form; everyone else sees a soft sign-in invitation. The CTA
   container (#save-chart-cta) is hidden until ui.js reveals it after
   a successful calculation. */

import { saveChart } from "@/app/actions/save-chart";

// IMPORTANT: do NOT import BuyButton on this surface. BuyButton imports
// trackEvent from @/lib/analytics, which is allowed on product pages
// but not on /kua-calculator or /embed per the tracker-free contract.
// Use the inline server-action form below instead.

type Props = {
  // showSaveCta=false omits the save-chart section entirely (used by /embed,
  // which stays account-free per the project hard rules).
  showSaveCta?: boolean;
  // isSignedIn switches the save CTA between a Save form (signed-in) and a
  // soft sign-in invitation. Ignored when showSaveCta is false.
  isSignedIn?: boolean;
};

export default function CalculatorIsland({
  showSaveCta = true,
  isSignedIn = false,
}: Props) {
  return (
    <>
      <form id="kua-form" className="kua-form" noValidate>
        <fieldset className="occupant" data-occupant="1">
          <legend className="visually-hidden">About you</legend>

          {/* The two-column grid lives on this inner div, not on the
              fieldset: Firefox ignores display:grid on fieldset, which
              left the date and gender fields stacked on desktop. */}
          <div className="occupant-grid">
          <div className="field field-date">
            <span className="field-label" id="date-1-label">
              Birth date
            </span>
            <div
              className="date-row"
              role="group"
              aria-labelledby="date-1-label"
              aria-describedby="date-1-help date-1-error"
            >
              <label className="date-sub">
                <span className="date-sub-label">Year</span>
                <input
                  id="year-1"
                  name="year-1"
                  type="number"
                  inputMode="numeric"
                  min="1900"
                  max="2050"
                  step="1"
                  placeholder="1985"
                  required
                />
              </label>
              <label className="date-sub">
                <span className="date-sub-label">Month</span>
                <select id="month-1" name="month-1" required defaultValue="">
                  <option value="">--</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </label>
              <label className="date-sub">
                <span className="date-sub-label">Day</span>
                <input
                  id="day-1"
                  name="day-1"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="31"
                  step="1"
                  placeholder="15"
                  required
                />
              </label>
            </div>
            <p id="date-1-help" className="field-help">
              Full date so we can handle the Chinese New Year boundary
              automatically. You don&apos;t need to look anything up.
            </p>
            <p
              id="date-1-error"
              className="field-error"
              aria-live="polite"
              hidden
            ></p>
          </div>

          <div className="field field-gender">
            <span className="field-label" id="gender-1-label">
              Gender
            </span>
            {/* Invisible twin of the Year/Month/Day sub-labels so the
                gender buttons line up with the date inputs when the two
                fields share a row. */}
            <span
              className="date-sub-label radio-align-spacer"
              aria-hidden="true"
            >
              &nbsp;
            </span>
            <div
              className="radio-row"
              role="radiogroup"
              aria-labelledby="gender-1-label"
              aria-describedby="gender-1-error"
            >
              <label className="radio">
                <input type="radio" name="gender-1" value="male" required />
                <span>Male</span>
              </label>
              <label className="radio">
                <input type="radio" name="gender-1" value="female" />
                <span>Female</span>
              </label>
            </div>
            <p
              id="gender-1-error"
              className="field-error"
              aria-live="polite"
              hidden
            ></p>
          </div>
          </div>
        </fieldset>

        {isSignedIn ? (
          <>
        <div className="couples-toggle-row">
          <button
            type="button"
            id="couples-toggle"
            className="disclosure"
            aria-expanded="false"
            aria-controls="occupant-2"
          >
            <span className="disclosure-icon" aria-hidden="true">
              +
            </span>
            <span className="disclosure-label">
              Add a second person (for couples and shared rooms)
            </span>
          </button>
        </div>

        <fieldset
          id="occupant-2"
          className="occupant occupant-secondary"
          data-occupant="2"
          hidden
        >
          <legend className="visually-hidden">
            About your partner or housemate
          </legend>

          <div className="occupant-grid">
          <div className="field field-date">
            <span className="field-label" id="date-2-label">
              Birth date
            </span>
            <div
              className="date-row"
              role="group"
              aria-labelledby="date-2-label"
              aria-describedby="date-2-error"
            >
              <label className="date-sub">
                <span className="date-sub-label">Year</span>
                <input
                  id="year-2"
                  name="year-2"
                  type="number"
                  inputMode="numeric"
                  min="1900"
                  max="2050"
                  step="1"
                  placeholder="1986"
                />
              </label>
              <label className="date-sub">
                <span className="date-sub-label">Month</span>
                <select id="month-2" name="month-2" defaultValue="">
                  <option value="">--</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </label>
              <label className="date-sub">
                <span className="date-sub-label">Day</span>
                <input
                  id="day-2"
                  name="day-2"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="31"
                  step="1"
                  placeholder="15"
                />
              </label>
            </div>
            <p
              id="date-2-error"
              className="field-error"
              aria-live="polite"
              hidden
            ></p>
          </div>

          <div className="field field-gender">
            <span className="field-label" id="gender-2-label">
              Gender
            </span>
            <span
              className="date-sub-label radio-align-spacer"
              aria-hidden="true"
            >
              &nbsp;
            </span>
            <div
              className="radio-row"
              role="radiogroup"
              aria-labelledby="gender-2-label"
              aria-describedby="gender-2-error"
            >
              <label className="radio">
                <input type="radio" name="gender-2" value="male" />
                <span>Male</span>
              </label>
              <label className="radio">
                <input type="radio" name="gender-2" value="female" />
                <span>Female</span>
              </label>
            </div>
            <p
              id="gender-2-error"
              className="field-error"
              aria-live="polite"
              hidden
            ></p>
          </div>
          </div>
        </fieldset>
          </>
        ) : (
          <div className="couples-locked">
            <p className="couples-locked-note">
              Combining two people, for couples and shared rooms, is a free
              account feature.{" "}
              <a href="/sign-in">Sign in or create a free account</a> to save
              your chart and combine two people.
            </p>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="cta-primary">
            Calculate my Kua number
          </button>
          <p className="privacy-note">
            Calculation runs in your browser. We never see your birth data.
          </p>
        </div>
      </form>

      <section id="result" className="result" aria-live="polite" hidden>
        {/* Populated by ui.js */}
      </section>

      {/* Post-result CTA stack. Revealed by ui.js after a successful
          calculation, alongside the save-chart card (when shown). The
          embed surface gets only the primary card; the planner and
          Compass cards are stripped via the .post-result-stack--embed
          class that ui.js sets when the calculator runs inside /embed
          (main#main carries data-embed).
          No third-party JS. No analytics import. The cards are plain
          links. */}
      <section
        id="post-result-cta"
        className="post-result-stack"
        aria-label="What to do next"
        hidden
      >
        <article
          className={
            isSignedIn
              ? "post-result-card secondary"
              : "post-result-card primary"
          }
        >
          <h3 className="post-result-card-heading">
            What your Kua number means.
          </h3>
          <p className="post-result-card-body">
            Your number sorts you into the East or West group and gives
            you four supportive directions. The guide page walks through
            what each one is for.
          </p>
          <p className="post-result-card-actions">
            <a
              href="/guide/compass-school/find-your-kua-number"
              className={isSignedIn ? "cta-secondary" : "cta-primary"}
            >
              Read what your number means
            </a>
          </p>
        </article>

        {/* The planner card reuses .post-result-card-compass so the existing
            embed CSS (.post-result-stack--embed .post-result-card-compass)
            hides it on /embed without a stylesheet change. */}
        <article className="post-result-card secondary post-result-card-compass post-result-card-planner">
          <h3 className="post-result-card-heading">
            The 2026 Feng Shui Planner.
          </h3>
          <p className="post-result-card-body">
            Your directions are the personal layer. The Planner reads the
            year on top of them, sector by sector, July 2026 through
            February 2027.
          </p>
          <p className="post-result-card-actions">
            <a
              href="/products/annual-feng-shui-planner-2026?from=kua-calculator"
              className="cta-secondary"
            >
              See the Planner
            </a>
          </p>
        </article>

        <article
          className="post-result-card secondary post-result-card-compass"
          aria-label="Personal Feng Shui Compass"
        >
          <h3 className="post-result-card-heading">
            Your Personal Feng Shui Compass.
          </h3>
          <p className="post-result-card-body">
            A short printable book keyed to your Kua and your eight
            personal directions: the four that support you, the four to
            handle with care, and a seven-day way to test the placement.
          </p>
          <p className="post-result-card-actions">
            <a
              href="/products/personal-feng-shui-compass?from=kua-calculator"
              className="cta-secondary"
            >
              See the Compass
            </a>
          </p>
        </article>
      </section>

      {showSaveCta ? (
      <section
        id="save-chart-cta"
        className="save-chart-cta"
        aria-label="Save this chart"
        hidden
      >
        {isSignedIn ? (
          <form
            id="save-chart-form"
            action={saveChart}
            className="save-chart-form"
          >
            {/* ui.js populates these hidden inputs after the calculation. */}
            <input type="hidden" name="year" id="save-year" />
            <input type="hidden" name="month" id="save-month" />
            <input type="hidden" name="day" id="save-day" />
            <input type="hidden" name="gender" id="save-gender" />

            <div className="field save-chart-label-field">
              <label className="field-label" htmlFor="save-label">
                Name this chart (optional)
              </label>
              <input
                id="save-label"
                name="label"
                type="text"
                maxLength={80}
                placeholder="e.g. Mine, or Alex"
              />
            </div>

            <button type="submit" className="cta-primary">
              Save my chart
            </button>
            <p className="save-chart-note">
              Saving keeps this chart on your account so you can view, print,
              or email it later.
            </p>
          </form>
        ) : (
          <div className="save-chart-signin">
            <h3>Save this chart to your account</h3>
            <p>
              Create a free account to keep this chart, view a printable
              version, and email it to yourself. The calculator stays free
              either way.
            </p>
            <p className="save-chart-actions">
              <a href="/sign-in" className="cta-primary">
                Sign in to save
              </a>
            </p>
          </div>
        )}
      </section>
      ) : null}

      {/* The two <template> elements are rendered as raw HTML via
          dangerouslySetInnerHTML. Setting innerHTML on a <template> populates
          its .content fragment (which ui.js clones), and React does not try to
          hydrate the children - this avoids a hydration mismatch. */}
      <template
        id="result-template"
        dangerouslySetInnerHTML={{
          __html: `
            <article class="result-card">
              <header class="result-header">
                <div class="result-summary">
                  <p class="result-eyebrow" style="color:#ffffff;">Your Kua</p>
                  <p class="result-kua" style="color:#ffffff;"><span data-bind="kua" style="color:#ffffff;"></span></p>
                  <p class="result-group"><span class="group-badge" data-bind="group-badge"></span></p>
                </div>
                <p class="result-line" data-bind="summary"></p>
              </header>
              <p class="cny-notice" data-bind="cny-notice" hidden></p>
              <h2 class="result-subhead">Your eight personal directions</h2>
              <ol class="direction-list" data-bind="directions"></ol>
              <aside class="methodology-strip">
                <h3>Want the methodology?</h3>
                <p>Read the full deep-dive on the Compass School and the Eight Mansions system that produces this result.</p>
                <p class="strip-links">
                  <a href="/methodology#5-the-kua-number" target="_blank" rel="noopener">How the Kua number works</a>
                  <a href="/methodology#east-group-and-west-group" target="_blank" rel="noopener">East and West groups</a>
                  <a href="/methodology#6-the-eight-mansions-ba-zhai" target="_blank" rel="noopener">The Eight Mansions</a>
                </p>
              </aside>
            </article>
          `,
        }}
      />

      <template
        id="direction-row-template"
        dangerouslySetInnerHTML={{
          __html: `
            <li class="direction-row" data-favourable="">
              <div class="direction-compass">
                <span class="direction-arrow" aria-hidden="true"></span>
                <span class="direction-label" data-bind="compassLabel"></span>
              </div>
              <div class="direction-quality">
                <p class="quality-pinyin"><span data-bind="pinyin"></span> <span class="quality-hanzi" data-bind="hanzi" aria-hidden="true"></span></p>
                <p class="quality-gloss" data-bind="gloss"></p>
              </div>
              <p class="direction-meaning" data-bind="meaning"></p>
              <p class="direction-badge"><span data-bind="badge"></span></p>
            </li>
          `,
        }}
      />
    </>
  );
}
