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
};

const QUALITIES: Record<QualityCode, Omit<Direction, "compass" | "compassLabel">> = {
  SQ: {
    qualityCode: "SQ",
    pinyin: "Sheng Qi",
    hanzi: "生氣",
    gloss: "Generating energy",
    favourable: true,
    meaning:
      "Your most energising direction. Face it at your desk for ambitious work, or point your bed's headboard this way if you want to wake energetic.",
  },
  TY: {
    qualityCode: "TY",
    pinyin: "Tian Yi",
    hanzi: "天醫",
    gloss: "Heavenly doctor",
    favourable: true,
    meaning:
      "Your restorative direction. Practitioners often prioritise it for the bedroom over Sheng Qi. Also a steady choice for the dining seat.",
  },
  YN: {
    qualityCode: "YN",
    pinyin: "Yan Nian",
    hanzi: "延年",
    gloss: "Longevity",
    favourable: true,
    meaning:
      "Your relationship direction. The traditional choice for a couple's bed orientation and for any seat where steady connection matters.",
  },
  FW: {
    qualityCode: "FW",
    pinyin: "Fu Wei",
    hanzi: "伏位",
    gloss: "Stability",
    favourable: true,
    meaning:
      "Your anchor direction. Use it for study, meditation, and deep-focus work where calm matters more than energy.",
  },
  HH: {
    qualityCode: "HH",
    pinyin: "Huo Hai",
    hanzi: "禍害",
    gloss: "Mishap",
    favourable: false,
    meaning:
      "The mildest direction to avoid. A hobby corner is fine here, but keep your main desk and bed elsewhere.",
  },
  WG: {
    qualityCode: "WG",
    pinyin: "Wu Gui",
    hanzi: "五鬼",
    gloss: "Five ghosts",
    favourable: false,
    meaning:
      "Associated with arguments and friction. Avoid placing a conference seat or difficult-conversation chair here. Storage is a better use.",
  },
  LS: {
    qualityCode: "LS",
    pinyin: "Liu Sha",
    hanzi: "六煞",
    gloss: "Six killings",
    favourable: false,
    meaning:
      "Avoid anchoring important functions here. Hallways, utility rooms, or rarely-entered spaces are an appropriate use.",
  },
  JM: {
    qualityCode: "JM",
    pinyin: "Jue Ming",
    hanzi: "絕命",
    gloss: "Total loss",
    favourable: false,
    meaning:
      "Traditionally the most inauspicious direction for you. Don't sleep with your head pointing here, and don't face it at your main work seat. A bathroom or storage room is the standard 'containment' use.",
  },
};

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
