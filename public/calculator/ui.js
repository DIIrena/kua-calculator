/* ============================================================
   ui.js
   Wires the form to the calculation logic and renders the
   result card. Pure DOM, no framework.

   Depends on:
     - cny.js:        effectiveKuaYear, MONTH_NAME
     - directions.js: directionsForKua, orderedDirectionsForKua, DIRECTION_ORDER
     - kua.js:        calculateKua, kuaGroup
   ============================================================ */

(function () {
  "use strict";

  var COMPASS_ARROW = {
    N: "↑", NE: "↗", E: "→", SE: "↘",
    S: "↓", SW: "↙", W: "←", NW: "↖"
  };

  function $(sel, root) { return (root || document).querySelector(sel); }

  function readOccupant(prefix) {
    var yearInput = $("#year-" + prefix);
    var monthInput = $("#month-" + prefix);
    var dayInput = $("#day-" + prefix);
    var genderInput = document.querySelector("input[name='gender-" + prefix + "']:checked");
    return {
      yearRaw: yearInput ? yearInput.value.trim() : "",
      year: yearInput ? parseInt(yearInput.value, 10) : NaN,
      monthRaw: monthInput ? monthInput.value.trim() : "",
      month: monthInput ? parseInt(monthInput.value, 10) : NaN,
      dayRaw: dayInput ? dayInput.value.trim() : "",
      day: dayInput ? parseInt(dayInput.value, 10) : NaN,
      gender: genderInput ? genderInput.value : ""
    };
  }

  function showError(fieldId, message) {
    var el = $("#" + fieldId + "-error");
    if (!el) { return; }
    el.textContent = message;
    el.hidden = false;
  }

  function clearError(fieldId) {
    var el = $("#" + fieldId + "-error");
    if (!el) { return; }
    el.textContent = "";
    el.hidden = true;
  }

  function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  function validateOccupant(prefix, required) {
    var data = readOccupant(prefix);
    var valid = true;
    clearError("date-" + prefix);
    clearError("gender-" + prefix);

    var anyDate = data.yearRaw || data.monthRaw || data.dayRaw;
    var allDate = data.yearRaw && data.monthRaw && data.dayRaw;
    var now = new Date().getFullYear();

    if (required || allDate) {
      // Full date required.
      if (!allDate) {
        showError("date-" + prefix, "Please enter your full birth date: year, month, and day.");
        valid = false;
      } else {
        if (!Number.isInteger(data.year) || data.year < 1900 || data.year > now + 1) {
          showError("date-" + prefix, "Year must be between 1900 and " + (now + 1) + ".");
          valid = false;
        } else if (!Number.isInteger(data.month) || data.month < 1 || data.month > 12) {
          showError("date-" + prefix, "Pick a month from the list.");
          valid = false;
        } else {
          var maxDay = daysInMonth(data.year, data.month);
          if (!Number.isInteger(data.day) || data.day < 1 || data.day > maxDay) {
            showError("date-" + prefix, "Day must be between 1 and " + maxDay + " for that month.");
            valid = false;
          }
        }
      }
    } else if (anyDate && !allDate) {
      showError("date-" + prefix, "Fill in all three fields, or clear them to skip this person.");
      valid = false;
    }

    var genderMissing = !data.gender;
    if (required && genderMissing) {
      showError("gender-" + prefix, "Please choose male or female.");
      valid = false;
    } else if (!required) {
      if (allDate && genderMissing) {
        showError("gender-" + prefix, "Choose male or female for this person, or clear the date to skip.");
        valid = false;
      } else if (!allDate && !genderMissing && anyDate) {
        // Already flagged above as incomplete date.
      } else if (!allDate && !genderMissing) {
        showError("date-" + prefix, "Add a birth date, or clear the gender to skip.");
        valid = false;
      }
    }

    return { valid: valid, data: data, hasInput: anyDate || !genderMissing };
  }

  function renderDirectionRow(rowTemplate, row) {
    var node = rowTemplate.content.firstElementChild.cloneNode(true);
    node.dataset.favourable = row.favourable ? "true" : "false";
    node.querySelector("[data-bind='compassLabel']").textContent = row.compassLabel;
    var arrow = node.querySelector(".direction-arrow");
    if (arrow) { arrow.textContent = COMPASS_ARROW[row.compass] || ""; }
    node.querySelector("[data-bind='pinyin']").textContent = row.pinyin;
    var hanzi = node.querySelector("[data-bind='hanzi']");
    if (hanzi) { hanzi.textContent = row.hanzi; }
    node.querySelector("[data-bind='gloss']").textContent = row.gloss;
    node.querySelector("[data-bind='meaning']").textContent = row.meaning;
    node.querySelector("[data-bind='badge']").textContent = row.favourable
      ? "★ Favourable"
      : "× Avoid";
    return node;
  }

  // Two people each keep their own Kua number (feng shui has no single
  // "couple" number). Add a second summary panel so Person 2's number is
  // shown as prominently as Person 1's, and label Person 1's parts, so it
  // is clear both were calculated - not just the first person.
  function setupCoupleResult(card, occ1, occ2) {
    var header = card.querySelector(".result-header");
    if (header) { header.classList.add("result-header--couple"); }

    var eyebrow1 = card.querySelector(".result-eyebrow");
    if (eyebrow1) { eyebrow1.textContent = "Person 1"; }

    var p2group = occ2.group === "east" ? "East group" : "West group";
    var panel = document.createElement("div");
    panel.className = "result-summary result-summary-second";

    var eb = document.createElement("p");
    eb.className = "result-eyebrow";
    eb.style.color = "#ffffff";
    eb.textContent = "Person 2";

    var num = document.createElement("p");
    num.className = "result-kua";
    num.style.color = "#ffffff";
    var span = document.createElement("span");
    span.style.color = "#ffffff";
    span.textContent = String(occ2.kua);
    num.appendChild(span);

    var grp = document.createElement("p");
    grp.className = "result-group";
    var badge = document.createElement("span");
    badge.className = "group-badge";
    badge.dataset.group = occ2.group;
    badge.textContent = p2group;
    grp.appendChild(badge);

    panel.appendChild(eb);
    panel.appendChild(num);
    panel.appendChild(grp);

    var firstSummary = card.querySelector(".result-summary");
    if (firstSummary && firstSummary.parentNode) {
      firstSummary.parentNode.insertBefore(panel, firstSummary.nextSibling);
    }

    var line = card.querySelector(".result-line");
    if (line) {
      line.textContent =
        "You each keep your own Kua number. The guide below shows which directions work for both of you in the rooms you share.";
    }
    // Couple view: drop the single-person eight-directions block; the
    // shared-rooms combination below is what matters for two people.
    var subhead = card.querySelector(".result-subhead");
    if (subhead) { subhead.hidden = true; }
    var directions = card.querySelector("[data-bind='directions']");
    if (directions) { directions.hidden = true; }
    var cny = card.querySelector(".cny-notice");
    if (cny) { cny.hidden = true; }
  }

  function renderResult(occupant1, occupant2) {
    var resultRoot = $("#result");
    var resultTemplate = $("#result-template");
    var rowTemplate = $("#direction-row-template");

    resultRoot.innerHTML = "";
    var card = resultTemplate.content.firstElementChild.cloneNode(true);

    card.querySelector("[data-bind='kua']").textContent = String(occupant1.kua);

    var groupLabel = occupant1.group === "east" ? "East group" : "West group";
    var groupBadge = card.querySelector("[data-bind='group-badge']");
    groupBadge.textContent = groupLabel;
    groupBadge.dataset.group = occupant1.group;

    var summarySentence = occupant1.group === "east"
      ? "Your favourable directions are in the East quadrant: north, south, east, and southeast."
      : "Your favourable directions are in the West quadrant: northeast, southwest, west, and northwest.";
    card.querySelector("[data-bind='summary']").textContent = summarySentence;

    // Chinese New Year adjustment notice
    var cnyNotice = card.querySelector("[data-bind='cny-notice']");
    if (cnyNotice) {
      if (occupant1.cnyAdjustment && occupant1.cnyAdjustment.adjusted === true) {
        cnyNotice.textContent = "Your birth date is before Chinese New Year (" + occupant1.cnyAdjustment.cnyLabel + "), so the Kua formula uses " + occupant1.cnyAdjustment.year + " as your Chinese solar-calendar year, not " + occupant1.cnyAdjustment.cnyYear + ".";
        cnyNotice.hidden = false;
      } else if (occupant1.cnyAdjustment && occupant1.cnyAdjustment.adjusted === null) {
        cnyNotice.textContent = occupant1.cnyAdjustment.message;
        cnyNotice.hidden = false;
      } else {
        cnyNotice.hidden = true;
      }
    }

    if (!occupant2) {
      var rowsContainer = card.querySelector("[data-bind='directions']");
      occupant1.rows.forEach(function (row) {
        rowsContainer.appendChild(renderDirectionRow(rowTemplate, row));
      });
    } else {
      setupCoupleResult(card, occupant1, occupant2);
    }

    if (occupant2 && typeof window.renderSharedRooms === "function") {
      window.renderSharedRooms(card, occupant1, occupant2);
    }

    resultRoot.appendChild(card);
    resultRoot.hidden = false;

    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultRoot.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }

  function buildOccupant(data) {
    var adjustment = window.effectiveKuaYear(data.year, data.month, data.day);
    var kuaYear = adjustment.year;
    var kua = window.calculateKua(kuaYear, data.gender);
    return {
      year: data.year,
      month: data.month,
      day: data.day,
      gender: data.gender,
      kuaYear: kuaYear,
      kua: kua,
      group: window.kuaGroup(kua),
      rows: window.orderedDirectionsForKua(kua),
      cnyAdjustment: adjustment
    };
  }

  function handleSubmit(event) {
    event.preventDefault();

    var o1 = validateOccupant("1", true);
    var occupant2Panel = document.querySelector("[data-occupant='2']");
    var o2 = { valid: true, data: null, hasInput: false };
    if (occupant2Panel && !occupant2Panel.hidden) {
      o2 = validateOccupant("2", false);
    }

    if (!o1.valid || !o2.valid) {
      var firstInvalid = document.querySelector(".field-error:not([hidden])");
      if (firstInvalid) {
        var related = document.querySelector("#" + firstInvalid.id.replace("-error", ""));
        if (related && related.focus) { related.focus(); }
      }
      return;
    }

    try {
      var occ1 = buildOccupant(o1.data);
      var occ2 = (o2.data && o2.hasInput && o2.data.yearRaw && o2.data.gender) ? buildOccupant(o2.data) : null;
      renderResult(occ1, occ2);
      revealSaveChartCta(occ1);
      revealPostResultCta(occ1);
    } catch (err) {
      showError("date-1", err.message || "Sorry, something went wrong. Check your inputs and try again.");
    }
  }

  // Show the save-chart CTA section (signed-in: Save form; signed-out:
  // sign-in invitation). Populates the form's hidden inputs from
  // occupant 1 so the server action gets the same date/gender the
  // calculation used. Silently no-ops on pages without the CTA (/embed).
  function revealSaveChartCta(occ1) {
    var cta = document.getElementById("save-chart-cta");
    if (!cta) return;
    cta.hidden = false;
    var yearInput = document.getElementById("save-year");
    var monthInput = document.getElementById("save-month");
    var dayInput = document.getElementById("save-day");
    var genderInput = document.getElementById("save-gender");
    if (yearInput) yearInput.value = String(occ1.year);
    if (monthInput) monthInput.value = String(occ1.month);
    if (dayInput) dayInput.value = String(occ1.day);
    if (genderInput) genderInput.value = occ1.gender;
  }

  // Reveal the post-result CTA stack (methodology + Compass waitlist +
  // planner footer link). On the /embed surface, hide the Compass
  // waitlist card and the planner footer link so the embed stays
  // minimal and tracker-free. Detection looks for data-embed="true" on
  // main#main (set by app/embed/layout.tsx). No fetch / XHR / beacon
  // is introduced here; the file stays vanilla and tracker-free.
  function revealPostResultCta(occ1) {
    var stack = document.getElementById("post-result-cta");
    if (!stack) return;
    stack.hidden = false;
    var mainEl = document.querySelector("main#main");
    var isEmbed = mainEl && mainEl.dataset && mainEl.dataset.embed === "true";
    if (isEmbed) {
      stack.classList.add("post-result-stack--embed");
    }
    // Personalise the Compass offer line with the reader's own result
    // (W5, 2026-07-20 conversion review). This only reads occ1, which was
    // computed in the browser; nothing is sent anywhere. No fetch/XHR/beacon.
    var offerLine = stack.querySelector("[data-bind='kua-offer']");
    if (offerLine && occ1) {
      var groupLabel = occ1.group === "east" ? "East group" : "West group";
      offerLine.textContent =
        "You are Kua " + occ1.kua + ", " + groupLabel + ".";
      offerLine.hidden = false;
    }
  }

  function initCouplesToggle() {
    var toggle = $("#couples-toggle");
    var panel = $("#occupant-2");
    if (!toggle || !panel) { return; }
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      var next = !expanded;
      toggle.setAttribute("aria-expanded", String(next));
      panel.hidden = !next;
      var icon = toggle.querySelector(".disclosure-icon");
      if (icon) { icon.textContent = next ? "−" : "+"; }
      var label = toggle.querySelector(".disclosure-label");
      if (label) {
        label.textContent = next
          ? "Hide second person"
          : "Add a second person (for couples and shared rooms)";
      }
      if (next) {
        var firstField = $("#year-2");
        if (firstField && firstField.focus) { firstField.focus(); }
      }
    });
  }

  // Submit handler delegated from document. React mounts a new
  // <form id="kua-form"> on every client-side navigation to a page
  // that contains the calculator; the old form-level binding would
  // not carry over and the default browser submit (a page reload)
  // would fire instead. Document delegation always catches it.
  function handleDocumentSubmit(e) {
    var form = e.target;
    if (!form || form.id !== "kua-form") { return; }
    handleSubmit(e);
  }

  // Same problem for the couples toggle button: a new instance on
  // each navigation. Delegate the click to document so it always works.
  function handleCouplesToggleClick(e) {
    var toggle =
      e.target && e.target.closest && e.target.closest("#couples-toggle");
    if (!toggle) { return; }
    var panel = document.getElementById("occupant-2");
    if (!panel) { return; }
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    var next = !expanded;
    toggle.setAttribute("aria-expanded", String(next));
    panel.hidden = !next;
    var icon = toggle.querySelector(".disclosure-icon");
    if (icon) { icon.textContent = next ? "−" : "+"; }
    var label = toggle.querySelector(".disclosure-label");
    if (label) {
      label.textContent = next
        ? "Hide second person"
        : "Add a second person (for couples and shared rooms)";
    }
    if (next) {
      var firstField = document.getElementById("year-2");
      if (firstField && firstField.focus) { firstField.focus(); }
    }
  }

  function init() {
    // Idempotent: if init has already run, do not double-bind.
    if (document.documentElement.dataset.kuaInit === "1") { return; }
    document.documentElement.dataset.kuaInit = "1";

    document.addEventListener("submit", handleDocumentSubmit);
    document.addEventListener("click", handleCouplesToggleClick);

    document.addEventListener("input", function (e) {
      if (e.target && e.target.id && /^(year|day)-\d$/.test(e.target.id)) {
        var prefix = e.target.id.split("-")[1];
        clearError("date-" + prefix);
      }
    });
    document.addEventListener("change", function (e) {
      if (e.target && e.target.id && /^month-\d$/.test(e.target.id)) {
        var prefix = e.target.id.split("-")[1];
        clearError("date-" + prefix);
      }
      if (e.target && e.target.name && /^gender-\d$/.test(e.target.name)) {
        var p = e.target.name.split("-")[1];
        clearError("gender-" + p);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ----------------------------------------------------------
  // Shared-rooms renderer
  // ----------------------------------------------------------

  function buildSharedRooms(occ1, occ2) {
    var dirs1 = window.directionsForKua(occ1.kua);
    var dirs2 = window.directionsForKua(occ2.kua);
    var both = [];
    var avoid = [];
    var mixed = [];
    window.DIRECTION_ORDER.forEach(function (compass) {
      var a = dirs1[compass];
      var b = dirs2[compass];
      var entry = { compass: compass, compassLabel: a.compassLabel, a: a, b: b };
      if (a.favourable && b.favourable) { both.push(entry); }
      else if (!a.favourable && !b.favourable) { avoid.push(entry); }
      else { mixed.push(entry); }
    });
    return { both: both, avoid: avoid, mixed: mixed };
  }

  function renderSharedSection(title, entries, tone, description) {
    var section = document.createElement("div");
    section.className = "shared-group shared-group-" + tone;

    var h = document.createElement("h4");
    h.textContent = title;
    section.appendChild(h);

    if (description) {
      var p = document.createElement("p");
      p.className = "shared-desc";
      p.textContent = description;
      section.appendChild(p);
    }

    if (entries.length === 0) {
      var none = document.createElement("p");
      none.className = "shared-empty";
      none.textContent = "(None in this category.)";
      section.appendChild(none);
      return section;
    }

    var ul = document.createElement("ul");
    ul.className = "shared-list";
    entries.forEach(function (e) {
      var li = document.createElement("li");
      var head = document.createElement("p");
      head.className = "shared-compass";
      head.textContent = e.compassLabel;
      li.appendChild(head);

      var detail = document.createElement("p");
      detail.className = "shared-detail";
      detail.textContent = "Person 1: " + e.a.pinyin + " (" + e.a.gloss.toLowerCase() + "). Person 2: " + e.b.pinyin + " (" + e.b.gloss.toLowerCase() + ").";
      li.appendChild(detail);
      ul.appendChild(li);
    });
    section.appendChild(ul);
    return section;
  }

  window.renderSharedRooms = function (card, occ1, occ2) {
    var groups = buildSharedRooms(occ1, occ2);

    var section = document.createElement("section");
    section.className = "shared-rooms";
    section.setAttribute("aria-labelledby", "shared-heading");

    var h = document.createElement("h2");
    h.id = "shared-heading";
    h.className = "result-subhead";
    h.textContent = "Shared rooms";
    section.appendChild(h);

    var intro = document.createElement("p");
    intro.className = "shared-intro";
    intro.textContent = "Person 1 is Kua " + occ1.kua + " (" + (occ1.group === "east" ? "East" : "West") + " group). Person 2 is Kua " + occ2.kua + " (" + (occ2.group === "east" ? "East" : "West") + " group). Use the lists below to assign directions in rooms you both use.";
    section.appendChild(intro);

    section.appendChild(renderSharedSection(
      "Favourable for both",
      groups.both,
      "good",
      "Safe choices for a shared bed orientation, dining seating, or a couple's workspace."
    ));

    section.appendChild(renderSharedSection(
      "Avoid for both",
      groups.avoid,
      "bad",
      "Keep important functions out of these directions in shared rooms."
    ));

    if (groups.mixed.length > 0) {
      section.appendChild(renderSharedSection(
        "One favourable, one unfavourable",
        groups.mixed,
        "mixed",
        "Assign these rooms by primary user. The person who spends more active time there should get their favourable orientation."
      ));
    }

    var strip = card.querySelector(".methodology-strip");
    if (strip) {
      card.insertBefore(section, strip);
    } else {
      card.appendChild(section);
    }
  };
})();
