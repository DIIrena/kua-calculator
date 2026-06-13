// The downstream Compass catalogue: the Single-Space and Single-Life-Pillar
// Compasses, plus the Year Ahead Compass. All run on the same personalised
// engine as the Personal Compass (name / birth date / gender form), each a
// short focused reading assembled as [welcome-mini, <topic block>,
// closing-mini]. This manifest is the single source of truth; lib/products.ts
// builds the recipes from it, lib/commerce.ts builds the commerce entries,
// the product-waitlist action registers the slugs, and a generator writes
// the page files.
//
// Adding a Compass is one entry here plus its topic block under
// content/blocks/.

export type CompassKind = "space" | "pillar" | "year";

export type CompassEntry = {
  /** Public page slug + commerce slug + recipe slug (all the same). */
  slug: string;
  /** Word before "Compass" in the title, and the cover accent stays "Compass". */
  topicLabel: string;
  /** The content block ID carrying the reading (reused or new). */
  topicBlock: string;
  kind: CompassKind;
  priceCents: number;
  /** Shelf + page one-liner. */
  oneLiner: string;
};

export const COMPASS_CATALOGUE: CompassEntry[] = [
  // --- 12 Single-Space Compasses ($7) ---
  {
    slug: "bedroom-compass",
    topicLabel: "Bedroom",
    topicBlock: "room-bedroom",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your bedroom read for your Kua: the headboard wall in an ordinary season and a season of push, and the corners to keep for storage.",
  },
  {
    slug: "office-compass",
    topicLabel: "Office",
    topicBlock: "room-desk",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your desk and work seat read for your Kua: which direction to face for ambitious work, which for steady focus, and the command position.",
  },
  {
    slug: "dining-room-compass",
    topicLabel: "Dining Room",
    topicBlock: "room-dining",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your table read for your Kua: where the head of the household sits, the seat for connection, and the seat with momentum.",
  },
  {
    slug: "kitchen-compass",
    topicLabel: "Kitchen",
    topicBlock: "space-kitchen",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your kitchen read for your Kua: the stove, the cook's position, and the supportive direction to face while you work.",
  },
  {
    slug: "living-room-compass",
    topicLabel: "Living Room",
    topicBlock: "space-living-room",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your living room read for your Kua: the main seat in command position, the conversation circle, and the corner to keep clear.",
  },
  {
    slug: "bathroom-compass",
    topicLabel: "Bathroom",
    topicBlock: "space-bathroom",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your bathroom read for your Kua: why a draining room suits a cautious direction, and how to keep it dry, closed, and in order.",
  },
  {
    slug: "entrance-compass",
    topicLabel: "Entrance",
    topicBlock: "space-entrance",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your front door and entrance read for your Kua: the approach, the threshold, and the first few steps in.",
  },
  {
    slug: "hallway-compass",
    topicLabel: "Hallway",
    topicBlock: "space-hallway",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your hallways read for your Kua: keeping pass-through space clear, lit, and unpinched, and slowing a long straight run.",
  },
  {
    slug: "storage-compass",
    topicLabel: "Storage",
    topicBlock: "space-storage",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your storage and closets read for your Kua: giving the cautious directions a quiet, contained job so the good walls stay free.",
  },
  {
    slug: "laundry-compass",
    topicLabel: "Laundry",
    topicBlock: "space-laundry",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your laundry read for your Kua: why utility space suits a cautious direction, kept dry, tidy, and in working order.",
  },
  {
    slug: "balcony-compass",
    topicLabel: "Balcony",
    topicBlock: "space-balcony",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your balcony or terrace read for your Kua: the home's breathing edge, a calm sitting corner, light, air, and a little green.",
  },
  {
    slug: "garage-compass",
    topicLabel: "Garage",
    topicBlock: "space-garage",
    kind: "space",
    priceCents: 700,
    oneLiner:
      "Your garage or utility space read for your Kua: a heavy room suited to a cautious direction, kept ordered with a clean threshold.",
  },
  // --- 9 Single-Life-Pillar Compasses ($7) ---
  {
    slug: "wealth-compass",
    topicLabel: "Wealth",
    topicBlock: "pillar-wealth",
    kind: "pillar",
    priceCents: 700,
    oneLiner:
      "Your wealth corner (the Southeast) read for your Kua: what the tradition gives this sector and how to find and tend yours.",
  },
  {
    slug: "recognition-compass",
    topicLabel: "Recognition",
    topicBlock: "pillar-fame",
    kind: "pillar",
    priceCents: 700,
    oneLiner:
      "Your recognition corner (the South) read for your Kua: the sector the tradition ties to reputation, kept bright and clear.",
  },
  {
    slug: "relationship-compass",
    topicLabel: "Relationship",
    topicBlock: "pillar-relationships",
    kind: "pillar",
    priceCents: 700,
    oneLiner:
      "Your relationship corner (the Southwest) read for your Kua: the sector the tradition ties to partnership, and how to tend it.",
  },
  {
    slug: "creativity-compass",
    topicLabel: "Creativity",
    topicBlock: "pillar-creativity",
    kind: "pillar",
    priceCents: 700,
    oneLiner:
      "Your creativity corner (the West) read for your Kua: the sector the tradition ties to projects, children, and play.",
  },
  {
    slug: "helpful-people-compass",
    topicLabel: "Helpful People",
    topicBlock: "pillar-helpful-people",
    kind: "pillar",
    priceCents: 700,
    oneLiner:
      "Your helpful-people corner (the Northwest) read for your Kua: the sector the tradition ties to mentors, support, and travel.",
  },
  {
    slug: "career-compass",
    topicLabel: "Career",
    topicBlock: "pillar-career",
    kind: "pillar",
    priceCents: 700,
    oneLiner:
      "Your career corner (the North) read for your Kua: the sector the tradition ties to your path and work, kept clear and moving.",
  },
  {
    slug: "knowledge-compass",
    topicLabel: "Knowledge",
    topicBlock: "pillar-knowledge",
    kind: "pillar",
    priceCents: 700,
    oneLiner:
      "Your knowledge corner (the Northeast) read for your Kua: the sector the tradition ties to study, stillness, and self-knowledge.",
  },
  {
    slug: "family-compass",
    topicLabel: "Family",
    topicBlock: "pillar-family",
    kind: "pillar",
    priceCents: 700,
    oneLiner:
      "Your family corner (the East) read for your Kua: the sector the tradition ties to roots, household, and new growth.",
  },
  {
    slug: "health-compass",
    topicLabel: "Health",
    topicBlock: "pillar-health",
    kind: "pillar",
    priceCents: 700,
    oneLiner:
      "Your health centre (the middle of the home) read for your Kua: the heart that touches every area, kept open and clear.",
  },
  // --- Year Ahead Compass ($9) ---
  {
    slug: "year-ahead-compass",
    topicLabel: "Year Ahead",
    topicBlock: "year-overlay",
    kind: "year",
    priceCents: 900,
    oneLiner:
      "The 2026 solar year read against your Kua: how the year's cautious and supportive corners fall on your own directions.",
  },
];

/** Stripe Price env var key for a catalogue product, e.g. STRIPE_PRICE_BEDROOM_COMPASS. */
export function compassEnvKey(slug: string): string {
  return `STRIPE_PRICE_${slug.replace(/-/g, "_").toUpperCase()}`;
}

/** The block recipe for a catalogue product: shared mini framing wrapping the topic block. */
export function compassBlocks(entry: CompassEntry): string[] {
  return ["welcome-mini", entry.topicBlock, "closing-mini"];
}
