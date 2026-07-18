/* ============================================================
   directions.js

   Eight Mansions (Ba Zhai) direction-quality lookup for every
   Kua number, plus plain-English copy for each quality.

   Sources:
     - methodology.md (chapter 6) worked examples for Kua 4 and 9.
     - Widely-published cultural-commons Eight Mansions tables for
       the remaining six Kuas, preserving the same East/West
       group structure (East-group favourable: N, S, E, SE;
       West-group favourable: NE, SW, W, NW).

   Honest framing rule: every meaning describes a use, not an
   outcome. No "will give you", no "guarantees".
   ============================================================ */

(function (root) {
  "use strict";

  // Quality metadata. Reused across all Kua numbers.
  var QUALITIES = {
    SQ: {
      pinyin: "Sheng Qi",
      hanzi: "生氣",
      gloss: "Generating energy",
      favourable: true,
      meaning: "Your most energising direction. Face it at your desk for ambitious work, or point your bed's headboard this way if you want to wake energetic."
    },
    TY: {
      pinyin: "Tian Yi",
      hanzi: "天醫",
      gloss: "Heavenly doctor",
      favourable: true,
      meaning: "Your restorative direction. Practitioners often prioritise it for the bedroom over Sheng Qi. Also a steady choice for the dining seat."
    },
    YN: {
      pinyin: "Yan Nian",
      hanzi: "延年",
      gloss: "Longevity",
      favourable: true,
      meaning: "Your relationship direction. The traditional choice for a couple's bed orientation and for any seat where steady connection matters."
    },
    FW: {
      pinyin: "Fu Wei",
      hanzi: "伏位",
      gloss: "Stability",
      favourable: true,
      meaning: "Your anchor direction. Use it for study, meditation, and deep-focus work where calm matters more than energy."
    },
    HH: {
      pinyin: "Huo Hai",
      hanzi: "禍害",
      gloss: "Mishap",
      favourable: false,
      meaning: "The mildest direction to avoid. A hobby corner is fine here, but keep your main desk and bed elsewhere."
    },
    WG: {
      pinyin: "Wu Gui",
      hanzi: "五鬼",
      gloss: "Five ghosts",
      favourable: false,
      meaning: "Associated with arguments and friction. Avoid placing a conference seat or difficult-conversation chair here. Storage is a better use."
    },
    LS: {
      pinyin: "Liu Sha",
      hanzi: "六煞",
      gloss: "Six killings",
      favourable: false,
      meaning: "A lower-priority direction. Generally avoid anchoring important functions here when the layout gives you a choice. Hallways, utility rooms, or rarely-entered spaces are an appropriate use."
    },
    JM: {
      pinyin: "Jue Ming",
      hanzi: "絕命",
      gloss: "Total loss",
      favourable: false,
      meaning: "The direction the tradition treats with the most care. Generally avoid pointing your head here in sleep, or facing it at your main work seat, when the layout gives you a choice. A bathroom or storage room is the standard lower-priority use."
    }
  };

  var COMPASS_LABEL = {
    N: "North", NE: "Northeast", E: "East", SE: "Southeast",
    S: "South", SW: "Southwest", W: "West", NW: "Northwest"
  };

  // Per-Kua mapping of direction -> quality code, per the classical
  // Da You Nian (Eight Mansions) pairing table. Kua 4 and Kua 9 were
  // corrected 2026-07-17 (owner-approved, CV2-015-DATA): the earlier
  // rows had been copied from chapter 6's hedged "approximately this
  // mapping" examples. Keep in sync with lib/directions.ts.
  var KUA_MAP = {
    1: { N: "FW", NE: "WG", E: "TY", SE: "SQ", S: "YN", SW: "JM", W: "HH", NW: "LS" },
    2: { N: "JM", NE: "SQ", E: "HH", SE: "WG", S: "LS", SW: "FW", W: "TY", NW: "YN" },
    3: { N: "TY", NE: "LS", E: "FW", SE: "YN", S: "SQ", SW: "HH", W: "JM", NW: "WG" },
    4: { N: "SQ", NE: "JM", E: "YN", SE: "FW", S: "TY", SW: "WG", W: "LS", NW: "HH" },
    6: { N: "LS", NE: "TY", E: "WG", SE: "HH", S: "JM", SW: "YN", W: "SQ", NW: "FW" },
    7: { N: "HH", NE: "YN", E: "JM", SE: "LS", S: "WG", SW: "TY", W: "FW", NW: "SQ" },
    8: { N: "WG", NE: "FW", E: "LS", SE: "JM", S: "HH", SW: "SQ", W: "YN", NW: "TY" },
    9: { N: "YN", NE: "HH", E: "SQ", SE: "TY", S: "FW", SW: "LS", W: "WG", NW: "JM" }
  };

  var DIRECTION_ORDER = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  function directionsForKua(kua) {
    if (!KUA_MAP[kua]) {
      throw new TypeError("kua must be 1, 2, 3, 4, 6, 7, 8, or 9.");
    }
    var map = KUA_MAP[kua];
    var result = {};
    DIRECTION_ORDER.forEach(function (compass) {
      var qualityCode = map[compass];
      var q = QUALITIES[qualityCode];
      result[compass] = {
        compass: compass,
        compassLabel: COMPASS_LABEL[compass],
        qualityCode: qualityCode,
        pinyin: q.pinyin,
        hanzi: q.hanzi,
        gloss: q.gloss,
        meaning: q.meaning,
        favourable: q.favourable
      };
    });
    return result;
  }

  // Order the eight rows for display: favourable first (best to mildest),
  // then unfavourable (mildest to worst).
  var FAVOURABLE_ORDER = ["SQ", "TY", "YN", "FW"];
  var UNFAVOURABLE_ORDER = ["HH", "WG", "LS", "JM"];

  function orderedDirectionsForKua(kua) {
    var dirs = directionsForKua(kua);
    var rows = [];
    var byQuality = {};
    DIRECTION_ORDER.forEach(function (compass) {
      byQuality[dirs[compass].qualityCode] = dirs[compass];
    });
    FAVOURABLE_ORDER.concat(UNFAVOURABLE_ORDER).forEach(function (code) {
      if (byQuality[code]) { rows.push(byQuality[code]); }
    });
    return rows;
  }

  root.directionsForKua = directionsForKua;
  root.orderedDirectionsForKua = orderedDirectionsForKua;
  root.DIRECTION_ORDER = DIRECTION_ORDER;
})(typeof window !== "undefined" ? window : globalThis);
