// Server-side port of public/calculator/directions.js. Same lookup table,
// typed. The plain-English meanings match the client copy verbatim.

export type Compass = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export type QualityCode = "SQ" | "TY" | "YN" | "FW" | "HH" | "WG" | "LS" | "JM";

export type Direction = {
  compass: Compass;
  compassLabel: string;
  qualityCode: QualityCode;
  pinyin: string;
  hanzi: string;
  gloss: string;
  meaning: string;
  favourable: boolean;
  why: string;
  bullets: string[];
};

// QUALITY_DETAILS is exported so the chart view page can look up `why` and
// `bullets` from the qualityCode for charts saved before these fields
// existed in the snapshot.
export const QUALITY_DETAILS: Record<QualityCode, Omit<Direction, "compass" | "compassLabel">> = {
  SQ: {
    qualityCode: "SQ",
    pinyin: "Sheng Qi",
    hanzi: "生氣",
    gloss: "Generating energy",
    favourable: true,
    meaning:
      "Your most energising direction. Face it at your desk for ambitious work, or point your bed's headboard this way if you want to wake energetic.",
    why:
      "Traditionally the strongest of the four favourable directions. Said to support growth, recognition, and ambitious work.",
    bullets: [
      "Face this direction at your desk for projects you want to push forward",
      "Open the front door this way if the floor plan allows",
      "Display a vision board, aspirational art, or career milestones on this wall",
    ],
  },
  TY: {
    qualityCode: "TY",
    pinyin: "Tian Yi",
    hanzi: "天醫",
    gloss: "Heavenly doctor",
    favourable: true,
    meaning:
      "Your restorative direction. Practitioners often prioritise it for the bedroom over Sheng Qi. Also a steady choice for the dining seat.",
    why:
      "The healing direction. Traditionally chosen for recovery, restorative sleep, and family health.",
    bullets: [
      "Point your bed's headboard this way for restorative sleep",
      "Seat the head of the household here at the dining table",
      "Keep wellness items (vitamins, first aid) in a cabinet on this wall",
    ],
  },
  YN: {
    qualityCode: "YN",
    pinyin: "Yan Nian",
    hanzi: "延年",
    gloss: "Longevity",
    favourable: true,
    meaning:
      "Your relationship direction. The traditional choice for a couple's bed orientation and for any seat where steady connection matters.",
    why:
      "The relationship direction. Traditionally chosen by couples and elders for partnerships and connections that age well.",
    bullets: [
      "Orient a couple's bed this way for steady connection",
      "Use this corner for shared rituals: coffee, conversation, reading together",
      "Display family photos and meaningful relationship objects here",
    ],
  },
  FW: {
    qualityCode: "FW",
    pinyin: "Fu Wei",
    hanzi: "伏位",
    gloss: "Stability",
    favourable: true,
    meaning:
      "Your anchor direction. Use it for study, meditation, and deep-focus work where calm matters more than energy.",
    why:
      "The anchor direction. Traditionally associated with calm, deep focus, and self-knowledge.",
    bullets: [
      "Set up a meditation cushion or reading chair here",
      "Position your study desk to face this direction",
      "Use this area for morning routines and quiet practice",
    ],
  },
  HH: {
    qualityCode: "HH",
    pinyin: "Huo Hai",
    hanzi: "禍害",
    gloss: "Mishap",
    favourable: false,
    meaning:
      "The mildest direction to avoid. A hobby corner is fine here, but keep your main desk and bed elsewhere.",
    why:
      "The mildest of the four directions to avoid. Traditionally associated with small setbacks and minor friction.",
    bullets: [
      "Keep your main desk and bed away from this direction",
      "A storage cupboard or seasonal-items corner is appropriate",
      "Hobby supplies or rarely-used items are fine here; primary functions are not",
    ],
  },
  WG: {
    qualityCode: "WG",
    pinyin: "Wu Gui",
    hanzi: "五鬼",
    gloss: "Five ghosts",
    favourable: false,
    meaning:
      "Associated with arguments and friction. Avoid placing a conference seat or difficult-conversation chair here. Storage is a better use.",
    why:
      "Traditionally associated with arguments, miscommunication, and lost items.",
    bullets: [
      "Don't site a couch or chair used for difficult conversations here",
      "Avoid pointing the bed this way",
      "Laundry, cleaning supplies, and utility storage are appropriate uses",
    ],
  },
  LS: {
    qualityCode: "LS",
    pinyin: "Liu Sha",
    hanzi: "六煞",
    gloss: "Six killings",
    favourable: false,
    meaning:
      "A lower-priority direction. Generally avoid anchoring important functions here when the layout gives you a choice. Hallways, utility rooms, or rarely-entered spaces are an appropriate use.",
    why:
      "Traditionally associated with broken plans and crossed wires. A lower-priority direction, not a cause of any of these.",
    bullets: [
      "Hallways, corridors, and pass-through spaces are appropriate uses",
      "Avoid placing the bed or main desk here",
      "Closets and deep storage rooms work; active rooms do not",
    ],
  },
  JM: {
    qualityCode: "JM",
    pinyin: "Jue Ming",
    hanzi: "絕命",
    gloss: "Total loss",
    favourable: false,
    meaning:
      "The direction the tradition treats with the most care. Generally avoid pointing your head here in sleep, or facing it at your main work seat, when the layout gives you a choice. A bathroom or storage room is the standard lower-priority use.",
    why:
      "Traditionally the direction the system flags first of the four to treat with care. A lower-priority direction for beds and desks, not a verdict on your home.",
    bullets: [
      "Bathrooms and storage rooms are the traditional lower-priority uses",
      "Generally avoid pointing your head here in sleep when you have a choice",
      "Prefer a supportive direction for your main work seat",
    ],
  },
};

// Back-compat alias so existing imports keep working.
const QUALITIES = QUALITY_DETAILS;

const COMPASS_LABEL: Record<Compass, string> = {
  N: "North",
  NE: "Northeast",
  E: "East",
  SE: "Southeast",
  S: "South",
  SW: "Southwest",
  W: "West",
  NW: "Northwest",
};

const KUA_MAP: Record<number, Record<Compass, QualityCode>> = {
  1: { N: "FW", NE: "WG", E: "TY", SE: "SQ", S: "YN", SW: "JM", W: "HH", NW: "LS" },
  2: { N: "JM", NE: "SQ", E: "HH", SE: "WG", S: "LS", SW: "FW", W: "TY", NW: "YN" },
  3: { N: "TY", NE: "LS", E: "FW", SE: "YN", S: "SQ", SW: "HH", W: "JM", NW: "WG" },
  4: { N: "FW", NE: "WG", E: "TY", SE: "SQ", S: "YN", SW: "HH", W: "JM", NW: "LS" },
  6: { N: "LS", NE: "TY", E: "WG", SE: "HH", S: "JM", SW: "YN", W: "SQ", NW: "FW" },
  7: { N: "HH", NE: "YN", E: "JM", SE: "LS", S: "WG", SW: "TY", W: "FW", NW: "SQ" },
  8: { N: "WG", NE: "FW", E: "LS", SE: "JM", S: "HH", SW: "SQ", W: "YN", NW: "TY" },
  9: { N: "YN", NE: "JM", E: "SQ", SE: "TY", S: "FW", SW: "LS", W: "HH", NW: "WG" },
};

export const DIRECTION_ORDER: Compass[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const FAVOURABLE_ORDER: QualityCode[] = ["SQ", "TY", "YN", "FW"];
const UNFAVOURABLE_ORDER: QualityCode[] = ["HH", "WG", "LS", "JM"];

export function directionsForKua(kua: number): Record<Compass, Direction> {
  const map = KUA_MAP[kua];
  if (!map) throw new TypeError("kua must be 1, 2, 3, 4, 6, 7, 8, or 9.");
  const out = {} as Record<Compass, Direction>;
  DIRECTION_ORDER.forEach((compass) => {
    const code = map[compass];
    const q = QUALITIES[code];
    out[compass] = {
      ...q,
      compass,
      compassLabel: COMPASS_LABEL[compass],
    };
  });
  return out;
}

// Favourable rows first (best to mildest), then unfavourable (mildest to worst).
export function orderedDirectionsForKua(kua: number): Direction[] {
  const dirs = directionsForKua(kua);
  const byQuality: Partial<Record<QualityCode, Direction>> = {};
  DIRECTION_ORDER.forEach((c) => {
    byQuality[dirs[c].qualityCode] = dirs[c];
  });
  const rows: Direction[] = [];
  [...FAVOURABLE_ORDER, ...UNFAVOURABLE_ORDER].forEach((code) => {
    const d = byQuality[code];
    if (d) rows.push(d);
  });
  return rows;
}
