/* ============================================================
   kua.js
   Pure client-side calculation of the Kua number and group.
   No DOM access, no side effects, no globals other than the
   two functions attached to window at the bottom.

   References: methodology.md section 5 (Kua formulas) and 6
   (Eight Mansions group split).

   Quick verification in a browser console:
     calculateKua(1978, 'male')   // 4
     calculateKua(1985, 'female') // 9
   ============================================================ */

(function (root) {
  "use strict";

  function reduceToSingleDigit(n) {
    while (n > 9) {
      n = String(n)
        .split("")
        .reduce(function (sum, digit) { return sum + Number(digit); }, 0);
    }
    return n;
  }

  function calculateKua(year, gender) {
    if (!Number.isInteger(year)) {
      throw new TypeError("year must be an integer (e.g. 1978).");
    }
    var currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear + 1) {
      throw new TypeError(
        "year must be between 1900 and " + (currentYear + 1) + "."
      );
    }
    if (gender !== "male" && gender !== "female") {
      throw new TypeError("gender must be 'male' or 'female'.");
    }

    var lastTwo = year % 100;
    var reduced = reduceToSingleDigit(lastTwo);
    var post2000 = year >= 2000;
    var kua;

    if (gender === "male") {
      var subtractFrom = post2000 ? 9 : 10;
      kua = subtractFrom - reduced;
      if (kua <= 0) { kua += 9; }
      if (kua === 5) { kua = 2; }
    } else {
      var addend = post2000 ? 6 : 5;
      kua = reduceToSingleDigit(reduced + addend);
      if (kua === 5) { kua = 8; }
    }

    return kua;
  }

  function kuaGroup(kua) {
    if (kua === 1 || kua === 3 || kua === 4 || kua === 9) { return "east"; }
    if (kua === 2 || kua === 6 || kua === 7 || kua === 8) { return "west"; }
    throw new TypeError("kua must be an integer between 1 and 9, excluding 5.");
  }

  root.calculateKua = calculateKua;
  root.kuaGroup = kuaGroup;
})(typeof window !== "undefined" ? window : globalThis);
