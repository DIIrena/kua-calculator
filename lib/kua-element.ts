// Per-Kua element personalisation layer (CV3, 2026-07-17).
//
// Two data families, both mined from the audited advice base in
// projects/feng-shui/advice-base/advice.json (each entry there carries
// its own source book + locator):
//
//   - KUA_ELEMENT + ELEMENT_PROFILES: the element each Kua number
//     carries, with the colour / material / form / dressing vocabulary
//     the tradition attaches to that element. ADV-0042..0046 (kua-
//     element dressing), ADV-0290..0294 (element vocabulary),
//     ADV-0231 (direction elements).
//   - YAN_NIAN_ACTIVATION: the per-Kua traditional recipe for
//     activating the personal (Yan Nian) corner. ADV-0162..0169.
//     The corners named by the source match the classical Yan Nian
//     direction of each Kua, which is why the recipe lives in the
//     Yan Nian chapter.
//
// Kua 5 never reaches this table: calculateKua substitutes 2 (male)
// or 8 (female) upstream, which matches the source's own Kua 5
// handling (ADV-0166).

export type FiveElement = "water" | "wood" | "fire" | "earth" | "metal";

export const KUA_ELEMENT: Record<number, FiveElement> = {
  1: "water",
  2: "earth",
  3: "wood",
  4: "wood",
  6: "metal",
  7: "metal",
  8: "earth",
  9: "fire",
};

export type ElementProfile = {
  /** Capitalised display name. */
  label: string;
  /** Colour families the tradition gives this element (wear + bring in). */
  colors: string;
  /** Materials, objects, and forms associated with the element. */
  materials: string;
  /** The "prosperity dressing" note, folk custom, phrased as custom. */
  dress: string;
};

export const ELEMENT_PROFILES: Record<FiveElement, ElementProfile> = {
  water: {
    label: "Water",
    colors: "deep blues, navy, black, and clean white",
    materials:
      "glass, mirrors, wave patterns, and flowing, curved forms; water imagery sits naturally near you",
    dress:
      "light, flowing fabrics - linen, long lines, soft drape - in light blue, white, and navy",
  },
  wood: {
    label: "Wood",
    colors: "every shade of green and turquoise, with black and light blue as supports",
    materials:
      "living plants, fresh flowers, wooden furniture, cotton, and natural weaves; tall, upright forms",
    dress:
      "slim cuts and a little unconventionality; the tradition lets Wood people break the dress code others follow",
  },
  fire: {
    label: "Fire",
    colors: "reds, purples, oranges, and pinks, with green as the feeding support",
    materials:
      "good lighting, candles, leather, and angular, pointed forms; a well-lit room is already a Fire cure",
    dress:
      "floral patterns and floral details; pink, red, and green worn together read as this element's signature",
  },
  earth: {
    label: "Earth",
    colors: "beige, cream, champagne, yellow, and brown, warmed with small red details",
    materials:
      "ceramics, stone, natural crystal, and square, stable, low forms; heavy is a compliment here",
    dress:
      "fitted, body-hugging clothes in the earth palette, with a red accent where you want warmth",
  },
  metal: {
    label: "Metal",
    colors: "white, gray, silver, and gold, grounded with brown",
    materials:
      "metal objects, round forms, watches, and quality jewelry; fewer pieces, better made",
    dress:
      "impeccable tailoring above all; the cut matters more than the colour, and quality reads louder than quantity",
  },
};

/** Per-Kua traditional recipe for activating the personal corner (the
 *  Yan Nian direction). Phrased as traditional activators, custom not
 *  levers; the chapter that renders these adds the honest framing. */
export const YAN_NIAN_ACTIVATION: Record<number, string> = {
  1: "brighten it with white, yellow, or warm red accents, add a lamp with a warm red shade, and keep one paired symbol there - the classic is a pair of mandarin ducks, or any image of two birds together",
  2: "give it metal and earth: a six-rod metal wind chime, white or gray tones on that wall, and a ceramic or metal vase kept clean and standing",
  3: "give it wood fed by water: a pair of goldfish in a small aquarium, or a generous vase of peonies, or a wide bowl of clean water growing one small green plant",
  4: "activate it with a dragon image or small figure, a jade bead, and one healthy flowering plant that you actually tend",
  6: "warm it with earth and fire: a small crystal light or a lamp with a light-red shade, and a lump of natural quartz",
  7: "warm it with earth and fire: a small crystal light or a lamp with a light-red shade, and a lump of natural quartz",
  8: "give it metal and a quiet lunar note: a six- or seven-rod wind chime and a small moon symbol",
  9: "give it water in motion: a well-lit aquarium, a metal vase carrying luck symbols, or simply a good picture of clean moving water",
};

export function kuaElement(kua: number): FiveElement {
  const el = KUA_ELEMENT[kua];
  if (!el) throw new TypeError("kua must be 1, 2, 3, 4, 6, 7, 8, or 9.");
  return el;
}

export function elementProfile(kua: number): ElementProfile {
  return ELEMENT_PROFILES[kuaElement(kua)];
}

export function yanNianActivation(kua: number): string {
  const a = YAN_NIAN_ACTIVATION[kua];
  if (!a) throw new TypeError("kua must be 1, 2, 3, 4, 6, 7, 8, or 9.");
  return a;
}
