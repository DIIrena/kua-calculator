// Registry for /guide, the ultimate-feng-shui-guide tree planned in
// myfengshuihome-platform-strategy.md (section 4 sitemap, section 5
// article plan).
//
// The guide is the web-voiced expression of the 22-chapter source
// library at projects/feng-shui/content/. Each guide page is a
// deliberate adaptation of one slice of one chapter, not a wholesale
// import. Per the platform-relationship addendum at the top of the
// strategy doc: the chapter library is the source; the deployed site
// is the truth.
//
// Two-level layout:
//   /guide                          - index of clusters
//   /guide/[cluster]                - one cluster's pages
//   /guide/[cluster]/[slug]         - one guide page
//
// Markdown body lives at content/guide/<cluster>/<slug>.md.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export type GuideCluster = {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  /** Sort order on the /guide index. Lower numbers come first. */
  order: number;
  /** Source chapters this cluster draws from, e.g. ["01"] or ["06"]. */
  sourceChapters: ReadonlyArray<string>;
};

export type GuidePage = {
  cluster: string;
  slug: string;
  title: string;
  description: string;
  /** Short hook for the cluster-page list. */
  teaser: string;
  /** ISO date string. Shown at the foot of the page. */
  lastUpdated: string;
  /** Gated pages require a signed-in session to read. */
  gated: boolean;
  /** Plain-English estimate, e.g. "5 minutes". */
  readingTime: string;
};

// Clusters seeded at scaffold time. Foundations is the only cluster
// with a live page in this scaffold pass; the rest are intentionally
// empty here and get filled as we adapt each one deliberately.
export const GUIDE_CLUSTERS: ReadonlyArray<GuideCluster> = [
  {
    slug: "foundations",
    label: "Foundations",
    tagline: "What feng shui actually is, plainly.",
    description:
      "The basics, without the jargon. What feng shui is, what it isn't, and the small set of ideas the rest of the guide stands on.",
    order: 1,
    sourceChapters: ["01"],
  },
  {
    slug: "compass-school",
    label: "Compass School",
    tagline: "The calculative half of Classical feng shui, made scannable.",
    description:
      "The calculative half of Classical feng shui in three pages: what it is, your Kua number and your four directions, and where to put the bed, the chair, and the door.",
    order: 2,
    sourceChapters: ["06"],
  },
  {
    slug: "five-elements",
    label: "The five elements",
    tagline: "The vocabulary beneath every feng shui move.",
    description:
      "Wu Xing as a design language in three pages: the materials vocabulary, four questions for reading a real room, and the two cycles made usable as a fix kit.",
    order: 3,
    sourceChapters: ["02"],
  },
  {
    slug: "bagua",
    label: "The Bagua",
    tagline: "The map layer you put over a real floor plan.",
    description:
      "Four pages on the Bagua: what the map layer actually is, the nine sectors named one by one, how to orient it (compass or front-door), and what to do when the floor plan is not a clean rectangle.",
    order: 4,
    sourceChapters: ["03"],
  },
  {
    slug: "rooms",
    label: "Rooms",
    tagline: "Walk your home room by room, and rank what to fix first.",
    description:
      "Four pages on the room-by-room layer: how to read any room as a walk-not-verdict, the three highest-stakes rooms (bedroom, kitchen, front door), the active-use rooms (living, dining, home office), and the leakage and awkward cases.",
    order: 5,
    sourceChapters: ["10"],
  },
  {
    slug: "schools",
    label: "Schools of feng shui",
    tagline: "A practitioner's map of Form, Compass, Flying Stars, and BTB.",
    description:
      "Three pages on how the major schools fit together: the four feng shui schools in one map, the Form vs Compass divide that runs through Classical practice, and where Flying Stars and BTB sit alongside the core.",
    order: 6,
    sourceChapters: ["04", "05", "07", "08"],
  },
  {
    slug: "cures",
    label: "Cures",
    tagline: "Cures as practical adjustments, read through six levers.",
    description:
      "Four pages on cures as practical adjustments, not magic objects. What a cure actually is, the five-element cure per room, the five cure families, and the rule that decides what rotates each year vs what stays put.",
    order: 7,
    sourceChapters: ["09"],
  },
  {
    slug: "money",
    label: "Money",
    tagline: "Money as flow, care, visibility, and preparation.",
    description:
      "Four pages on the places in the home where money is handled: the southeast sector, the kitchen, the desk, and the door. No promises, no activation, no magic. The six levers applied to flow, care, visibility, and preparation.",
    order: 8,
    sourceChapters: ["18"],
  },
];

export const GUIDE_PAGES: ReadonlyArray<GuidePage> = [
  {
    cluster: "foundations",
    slug: "what-feng-shui-is-plainly",
    title: "What feng shui is, plainly.",
    description:
      "A two-minute, jargon-free read on what feng shui is, what it isn't, and the small idea the rest of the guide depends on.",
    teaser:
      "The two-minute version, before the rest of the guide. No jargon. No outcome promises.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "3 minutes",
  },
  {
    cluster: "compass-school",
    slug: "what-is-compass-school",
    title: "What Compass School is, and why it sits next to Form School.",
    description:
      "A short read on Compass School (Li Qi Pai), how it differs from Form School, the four sub-schools, and why Ba Zhai (Eight Mansions) is the practical place to start.",
    teaser:
      "Compass School in four minutes. What it does, why it sits next to Form School, and what to read next.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "4 minutes",
  },
  {
    cluster: "compass-school",
    slug: "find-your-kua-number",
    title: "Find your Kua number and your four directions.",
    description:
      "Your Kua number, the East/West group split, the four favourable directions (Sheng Qi, Tian Yi, Yan Nian, Fu Wei), and how to handle a mixed-group household.",
    teaser:
      "Your Kua number sorts you into East or West group and assigns four supportive directions. Here is what each one is for.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "4 minutes",
  },
  {
    cluster: "compass-school",
    slug: "three-orientations",
    title: "Three orientations the tradition weights most.",
    description:
      "The three placements Eight Mansions weights most: where the head of the bed points, where your chair faces, and where the front door opens. One move to try this week.",
    teaser:
      "Bed, chair, door, in that order of leverage. What the tradition reads in each, and one move to try this week.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "4 minutes",
  },
  {
    cluster: "five-elements",
    slug: "five-elements-as-a-design-language",
    title: "The five elements as a design language.",
    description:
      "Wu Xing is a vocabulary, not a horoscope. The materials, finishes, and shapes that map to Wood, Fire, Earth, Metal, and Water, with a quick way to read a piece of furniture as more than one element at once.",
    teaser:
      "The vocabulary layer. Materials, finishes, and shapes mapped to Wood, Fire, Earth, Metal, and Water. Read a room the way a tailor reads a fabric.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    cluster: "five-elements",
    slug: "reading-a-room-in-element-terms",
    title: "How to read a room in element terms.",
    description:
      "Four questions you can ask in any room: materials, shapes, feel, and use. A two-minute diagnostic that turns the five-element vocabulary into a working read of a real space.",
    teaser:
      "Four questions, two minutes per room. The diagnostic that turns the vocabulary into a working read.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    cluster: "five-elements",
    slug: "the-productive-and-controlling-cycles",
    title: "The cycles, made usable.",
    description:
      "The two cycles that do almost all the practical work. Use the productive cycle first; reach for the controlling cycle when a room has too much of something and adding more would only feed the problem.",
    teaser:
      "Productive first, controlling in reserve. One rule that turns the cycles into a fix kit instead of a list to memorise.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    cluster: "bagua",
    slug: "what-the-bagua-is",
    title: "What the Bagua is.",
    description:
      "The Bagua is a structured way of looking at a floor plan, not a manifestation board. Eight sectors plus a centre, each carrying a direction, an element, and a life area. Early Heaven and Later Heaven explained.",
    teaser:
      "Not a magic overlay. A structured noticing device. Eight sectors plus a centre, each tied to a direction, an element, and a life area.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    cluster: "bagua",
    slug: "the-nine-life-areas",
    title: "The nine life areas.",
    description:
      "The nine sectors named one by one. South to fame, south-west to love, west to creativity, north-west to travel, north to career, north-east to knowledge, east to health, south-east to money, centre to wellbeing. Each links to its life-area deep dive.",
    teaser:
      "South to fame, north to career, south-east to money, centre to wellbeing. The nine sectors as the hub between the cluster and the per-area deep dives.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    cluster: "bagua",
    slug: "compass-vs-front-door-methods",
    title: "Compass method or front-door method.",
    description:
      "The two ways to orient the Bagua over a home. The Classical compass method ties the map to magnetic north; the BTB front-door method anchors it to the entry. How to pick one, why switching mid-walk is the most common beginner mistake.",
    teaser:
      "Compass or door. Pick one before anything else lines up. The Classical method and the BTB method explained without making you feel lost.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    cluster: "bagua",
    slug: "missing-corners-and-irregular-homes",
    title: "Missing corners and irregular homes.",
    description:
      "The Bagua was drawn for a square; real homes are L-shaped, multi-storey, or one studio. How to read missing corners, sectors that span two rooms, multi-storey plans, single-room Bagua, and what the centre is asking for.",
    teaser:
      "L-shapes, multi-storey homes, sectors that span two rooms, single-room Bagua, and the centre. The Bagua applied to the house you actually live in.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    cluster: "rooms",
    slug: "how-to-read-any-room",
    title: "How to read any room.",
    description:
      "The walkthrough method: walk in the order qi walks (door, kitchen, bedroom, then the rest), read four things in each room, take notes, rank findings after the walk, and pick the lens (sector, direction, or elements) that fits.",
    teaser:
      "A reading is a walk, not a verdict. Four things to read in each room, in order, plus the three lenses that sharpen the same walk.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "6 minutes",
  },
  {
    cluster: "rooms",
    slug: "bedroom-kitchen-front-door",
    title: "Bedroom, kitchen, and front door.",
    description:
      "The three highest-stakes rooms, read for room layout rather than facing direction. The wall the bed sits against, where the stove sits in the room, what the front door opens onto. Form School's room-layout angle.",
    teaser:
      "The three rooms that compound hardest. Where the bed sits, where the stove sits, what the door opens onto. Layout, not facing.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "6 minutes",
  },
  {
    cluster: "rooms",
    slug: "living-dining-home-office",
    title: "Living room, dining room, and home office.",
    description:
      "The active-use rooms, read through zones, main seat per zone, and layered lighting. Why subtraction beats addition in the living room, why round and oval tables hold the meal, and why the home office desk needs solid backing.",
    teaser:
      "The active-use rooms reward zoning and restraint. Name the zones, set the main seat, layer the lights. Decoration finishes the room; design sets it up.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "6 minutes",
  },
  {
    cluster: "rooms",
    slug: "bathrooms-storage-problem-rooms",
    title: "Bathrooms, storage, and problem rooms.",
    description:
      "The rooms people apologise for. Containment as the bathroom's organising idea, storage rooms as deliberate rooms not overflow, and four short cases for problem rooms: slanted ceilings, beams, dead-ends, and mixed-use.",
    teaser:
      "The rooms most people apologise for are the rooms most worth reading carefully. Containment, deliberate storage, and four short cases for the awkward ones.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "6 minutes",
  },
  {
    cluster: "schools",
    slug: "four-feng-shui-schools-in-one-map",
    title: "The four feng shui schools, in one map.",
    description:
      "Form School reads the place. Compass School reads the directional fit. Flying Stars adds time. BTB anchors the Bagua to the front door. Four schools, four questions, one each. A map for the rest of the guide.",
    teaser:
      "Four schools, four questions, one each. The map that makes the rest of the guide stop sounding like a single muddled tradition.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    cluster: "schools",
    slug: "form-school-vs-compass-school",
    title: "Form School vs Compass School.",
    description:
      "The two halves of Classical practice. What Form School reads, what Compass School reads, why Form comes first, and when each leads. The four Celestial Animals, sha qi, the luopan, and Eight Mansions, at a map altitude.",
    teaser:
      "The two halves of Classical practice. Form reads the place; Compass reads the fit. Why Form comes first, and when each leads.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "6 minutes",
  },
  {
    cluster: "schools",
    slug: "flying-stars-btb-and-timing",
    title: "Flying Stars, BTB, and when timing enters the picture.",
    description:
      "Flying Stars adds a moving calendar to Compass School. BTB is a separate 20th-century lineage anchored to the front door. The two layers that sit outside the Form-and-Compass core, what each one is for, and how not to mix them.",
    teaser:
      "When timing enters the picture. The annual layer of Flying Stars and the alternate lineage of BTB, kept separate and held lightly.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "6 minutes",
  },
  {
    cluster: "cures",
    slug: "what-feng-shui-cures-actually-are",
    title: "What feng shui cures actually are.",
    description:
      "A cure is a small, deliberate change to a room. It has a purpose you can name and a contraindication you can name. Six levers (element, placement, visibility, proportion, timing, room use) and the six families of cure objects.",
    teaser:
      "Cures are changes, not objects. Six levers decide whether any cure works, and the catalogue falls into six families.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    cluster: "cures",
    slug: "five-element-cures-room-by-room",
    title: "Five-element cures, room by room.",
    description:
      "Which element cure belongs in which room. Bedroom Earth for rest. A Wood bridge between stove and sink. Living Wood with warm layered light in the living room. Metal and Wood as supporting cures in the home office.",
    teaser:
      "Which element cure belongs in which room. The productive route first, the six levers applied room by room.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "6 minutes",
  },
  {
    cluster: "cures",
    slug: "mirrors-plants-light-sound-and-symbols",
    title: "Mirrors, plants, light, sound, and symbols.",
    description:
      "The five cure families that do the most work in a real room. Mirrors that redirect, plants that refresh, light that brightens, sound that softens a moving-air corner, and symbols that carry the occupant's meaning.",
    teaser:
      "Five families, five short reads. Mirrors redirect. Plants refresh. Light brightens. Sound softens. Symbols carry meaning. Most of the work is subtraction.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "6 minutes",
  },
  {
    cluster: "cures",
    slug: "annual-cures-vs-permanent-fixes",
    title: "Annual cures vs permanent fixes.",
    description:
      "Most cures are decided once and left alone. A small number are checked each Li Chun. Three questions decide which is which: is it structural, is it an element imbalance, or is it an annual visiting-star position?",
    teaser:
      "Most cures stay. Two corners are checked each year. Three questions decide which is which.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    cluster: "money",
    slug: "feng-shui-money-without-wishful-thinking",
    title: "Feng shui and money without wishful thinking.",
    description:
      "Money is handled, not summoned. The four observable things that the home's money places respond to (flow, care, visibility, preparation) and the six levers from the cures cluster applied to the southeast, the kitchen, the door, the desk, and storage.",
    teaser:
      "Money is handled, not summoned. Four observable things, six levers, five places in the home where money is handled.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "5 minutes",
  },
  {
    cluster: "money",
    slug: "the-southeast-wealth-area-and-how-to-read-it",
    title: "The southeast wealth area and how to read it.",
    description:
      "The corner is a surface, not a shrine. Six short reads on the southeast: element, placement, visibility, proportion, timing, and room use. Walk to it, see what is actually there, pick one act of care for the week.",
    teaser:
      "A surface, not a shrine. Six short reads on the southeast: element, placement, visibility, proportion, timing, room use.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "6 minutes",
  },
  {
    cluster: "money",
    slug: "kitchen-stove-and-money-flow",
    title: "Kitchen, stove, and money flow.",
    description:
      "The kitchen as a flow system. Fire (stove) and Water (sink) with Wood as the bridge. The six levers applied to the kitchen, and the four kinds of small unfixed thing that quietly drain attention before they drain money.",
    teaser:
      "Money walks in as groceries and walks out as cooked meals. The kitchen as a flow system, read through six levers.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "6 minutes",
  },
  {
    cluster: "money",
    slug: "desk-door-and-business-money",
    title: "Desk, door, and business money.",
    description:
      "The door is the entry. The desk is the residence. The four questions for the entry (flow, care, visibility, preparation) and the six levers applied to the desk you actually work at. Plus the studio or treatment room for anyone earning from home.",
    teaser:
      "Door as the entry. Desk as the residence. The working zones where money paper arrives, lives, and gets handled.",
    lastUpdated: "2026-06-07",
    gated: false,
    readingTime: "6 minutes",
  },
];

export function findCluster(slug: string): GuideCluster | null {
  return GUIDE_CLUSTERS.find((c) => c.slug === slug) ?? null;
}

export function pagesInCluster(clusterSlug: string): GuidePage[] {
  return GUIDE_PAGES.filter((p) => p.cluster === clusterSlug);
}

export function findGuidePage(
  cluster: string,
  slug: string,
): GuidePage | null {
  return (
    GUIDE_PAGES.find((p) => p.cluster === cluster && p.slug === slug) ?? null
  );
}

export async function renderGuidePage(
  cluster: string,
  slug: string,
): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "guide",
    cluster,
    `${slug}.md`,
  );
  const source = await readFile(filePath, "utf-8");

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(source);

  return String(file);
}
