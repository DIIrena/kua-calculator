// Pick-Three bundles: the buyer chooses any three life areas (or any
// three rooms), and the report assembles those three topic blocks. Shared
// by the success-page form (renders the options) and fulfill-pick3 (which
// validates the choice and assembles a synthetic recipe).

export type Pick3Option = { block: string; label: string };

export type Pick3Config = {
  /** Cover wording: "Maya's Three Life Areas Compass". */
  topicLabel: string;
  /** Lowercase plural for prose, e.g. "life areas" / "rooms". */
  nounPlural: string;
  options: Pick3Option[];
};

export const PICK3: Record<string, Pick3Config> = {
  "pick-three-pillars": {
    topicLabel: "Three Life Areas",
    nounPlural: "life areas",
    options: [
      { block: "pillar-wealth", label: "Wealth" },
      { block: "pillar-fame", label: "Recognition" },
      { block: "pillar-relationships", label: "Relationships" },
      { block: "pillar-creativity", label: "Creativity" },
      { block: "pillar-helpful-people", label: "Helpful People" },
      { block: "pillar-career", label: "Career" },
      { block: "pillar-knowledge", label: "Knowledge" },
      { block: "pillar-family", label: "Family" },
      { block: "pillar-health", label: "Health" },
    ],
  },
  "pick-three-spaces": {
    topicLabel: "Three Spaces",
    nounPlural: "rooms",
    options: [
      { block: "room-bedroom", label: "Bedroom" },
      { block: "room-desk", label: "Office" },
      { block: "room-dining", label: "Dining Room" },
      { block: "space-kitchen", label: "Kitchen" },
      { block: "space-living-room", label: "Living Room" },
      { block: "space-bathroom", label: "Bathroom" },
      { block: "space-entrance", label: "Entrance" },
      { block: "space-hallway", label: "Hallway" },
      { block: "space-storage", label: "Storage" },
      { block: "space-laundry", label: "Laundry" },
      { block: "space-balcony", label: "Balcony" },
      { block: "space-garage", label: "Garage" },
    ],
  },
};

export function findPick3(slug: string): Pick3Config | null {
  return PICK3[slug] ?? null;
}
