/* Static JSX port of app/templates/_calculator.html.
   No logic lives here. Every element id is preserved exactly so the
   vanilla ui.js (loaded from /public/calculator/) can select on them.
   The two <template> elements are cloned by ui.js at render time. */

export default function CalculatorIsland() {
  return (
    <>
      <form id="kua-form" className="kua-form" noValidate>
        <fieldset className="occupant" data-occupant="1">
          <legend className="visually-hidden">About you</legend>

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
        </fieldset>

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
        </fieldset>

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
                  <p class="result-eyebrow">Your Kua</p>
                  <p class="result-kua"><span data-bind="kua"></span></p>
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
