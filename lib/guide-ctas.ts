// Cluster-level default CTAs for guide pages (marketing-ux-plan
// 2026-08-14, Path E). A guide page that sets its own `cta` in
// lib/guide.ts keeps it; every other page inherits its cluster's
// default here, so all 38 pages end with one contextual next step.
// One block per page, never a banner farm.

export type GuideCta = {
  rationale: string;
  label: string;
  href: string;
};

export const CLUSTER_CTAS: Record<string, GuideCta> = {
  foundations: {
    rationale:
      "The shortest way from reading to doing is your own Kua number: ten seconds, free, and the rest of the guide starts speaking to your rooms.",
    label: "Get your free Kua reading",
    href: "/kua-calculator?from=guide",
  },
  "compass-school": {
    rationale:
      "You have met the system. The Personal Feng Shui Compass reads it for your own rooms: your eight directions, the bed, the desk, the dining seat.",
    label: "See the Personal Compass, $19",
    href: "/products/personal-feng-shui-compass?from=guide",
  },
  "five-elements": {
    rationale:
      "The Five Elements Home Styling Workbook turns this vocabulary into a walk through your own rooms, five words at a time.",
    label: "See the Workbook, $12",
    href: "/products/five-elements-workbook?from=guide",
  },
  bagua: {
    rationale:
      "The Nine Life Areas Compass lays this map over your own floor plan: every area read for your Kua, chapter by chapter.",
    label: "See the Nine Life Areas Compass, $29",
    href: "/products/all-nine-pillars-compass?from=guide",
  },
  rooms: {
    rationale:
      "The Twelve Spaces Compass walks every room of your home the way this section walks the idea: one chapter per room, read for your Kua.",
    label: "See the Twelve Spaces Compass, $29",
    href: "/products/all-twelve-spaces-compass?from=guide",
  },
  schools: {
    rationale:
      "When you want everything the schools can say about one home, the Complete Home Compass is the whole map in a single personalised book.",
    label: "See the Complete Home Compass, $49",
    href: "/products/complete-home-compass?from=guide",
  },
  cures: {
    rationale:
      "The Cures and Crystals Catalogue is the ten-second lookup version of this section: what it is, where it goes, what the tradition says.",
    label: "See the Catalogue, $9",
    href: "/products/cures-catalog?from=guide",
  },
  money: {
    rationale:
      "The Business and Money Feng Shui Kit sets up the desk, the stove, and the wealth corner like you mean it.",
    label: "See the Money Kit, $19",
    href: "/products/business-money-feng-shui?from=guide",
  },
  "healthy-home": {
    rationale:
      "The Healthy Home Audit turns these conditions into worksheets: air, light, damp, sound, room by room.",
    label: "See the Healthy Home Audit, $19",
    href: "/products/healthy-home-audit?from=guide",
  },
  "sister-disciplines": {
    rationale:
      "BaZi reads the person the way feng shui reads the place. Your chart takes a few seconds, and it is free.",
    label: "Get your free BaZi chart",
    href: "/bazi-calculator?from=guide",
  },
  glossary: {
    rationale:
      "The Learn Feng Shui Starter Deck turns this vocabulary into twenty-four printable flashcards and the first five moves.",
    label: "See the Starter Deck, $9",
    href: "/products/starter-deck?from=guide",
  },
};
