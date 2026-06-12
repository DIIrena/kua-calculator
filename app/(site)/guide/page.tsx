import type { Metadata } from "next";
import Link from "next/link";
import { GUIDE_CLUSTERS, pagesInCluster } from "@/lib/guide";
import GuideReadState from "@/components/GuideReadState";

export const metadata: Metadata = {
  title: "The Ultimate Feng Shui Guide | My Feng Shui Home",
  description:
    "Eleven clusters, thirty-eight pages of calm, jargon-free feng shui. Pick a reading path: start here, by room, by life area, by system, or fix a problem.",
  alternates: { canonical: "https://myfengshuihome.com/guide" },
};

type IntentLink = {
  href: string;
  label: string;
  note: string;
};

type IntentPath = {
  heading: string;
  tagline: string;
  description: string;
  entryLinks: ReadonlyArray<IntentLink>;
};

// Six reader-intent paths sit ABOVE the full cluster index. Each one
// points the reader to 3 to 5 entry pages, in natural reading order.
// Every link target is on the live site; no invented routes.
const INTENT_PATHS: ReadonlyArray<IntentPath> = [
  {
    heading: "Start here",
    tagline: "If you have never read a feng shui page before, read these in order.",
    description:
      "A first-time reader needs three things: a baseline of what feng shui is and is not, one personal number that the rest of the guide refers back to, and a short note on how this site approaches the tradition. About thirty minutes of reading, no jargon, no purchase.",
    entryLinks: [
      {
        href: "/guide/foundations/what-feng-shui-is-plainly",
        label: "What feng shui actually is",
        note: "The two-minute baseline. What the practice does, what it refuses to do.",
      },
      {
        href: "/kua-calculator",
        label: "Find your Kua number with the free calculator",
        note: "Your personal directions, used by Compass School pages later in the guide.",
      },
      {
        href: "/guide/compass-school/find-your-kua-number",
        label: "What your Kua number means",
        note: "The companion read for the calculator result.",
      },
      {
        href: "/methodology",
        label: "How this guide is written",
        note: "The editorial stance: practitioner voice, no outcome promises, sources named.",
      },
    ],
  },
  {
    heading: "Read by room",
    tagline: "Walk your home one room at a time and see what feng shui actually reads in each.",
    description:
      "Most readers arrive with a specific room in mind. Start with the room-reading method, then jump to the rooms that compound hardest. Each guide page pairs with a Space page for the same room, so you can move from theory to a working checklist.",
    entryLinks: [
      {
        href: "/guide/rooms/how-to-read-any-room",
        label: "How to read any room",
        note: "The four-thing walkthrough that the rest of the room work runs on.",
      },
      {
        href: "/guide/rooms/bedroom-kitchen-front-door",
        label: "Bedroom, kitchen, and front door",
        note: "The three rooms that compound hardest. Bed, stove, door.",
      },
      {
        href: "/space/bedroom",
        label: "The bedroom space page",
        note: "Working checklist version of the bedroom read.",
      },
      {
        href: "/space/kitchen",
        label: "The kitchen space page",
        note: "Working checklist version of the kitchen read.",
      },
      {
        href: "/guide/rooms/bathrooms-storage-problem-rooms",
        label: "Bathrooms, storage, and the awkward rooms",
        note: "The rooms most people apologise for, read carefully.",
      },
    ],
  },
  {
    heading: "Read by life area",
    tagline: "Start from what you want to work on (money, health, love) and read the pages tied to that sector.",
    description:
      "Feng shui maps nine life areas onto the floor plan. Pick the area you care about, read the sector page, then follow into the dedicated cluster where the work lives. The Personal Feng Shui Compass is the upcoming tool that ties your Kua to these sectors; the waitlist is open.",
    entryLinks: [
      {
        href: "/guide/bagua/the-nine-life-areas",
        label: "The nine life areas of the Bagua",
        note: "The hub map. Pick a sector, follow it to the deep dive.",
      },
      {
        href: "/guide/money/feng-shui-money-without-wishful-thinking",
        label: "Feng shui and money without wishful thinking",
        note: "The money cluster entry point. Flow, care, visibility, preparation.",
      },
      {
        href: "/guide/healthy-home/healthy-home-feng-shui-without-health-promises",
        label: "Healthy-home feng shui without health promises",
        note: "Conditions a home can support, not medical claims.",
      },
      {
        href: "/life/love",
        label: "Love as a life area",
        note: "The sector page for the southwest and the relationships read.",
      },
      {
        href: "/products/personal-feng-shui-compass",
        label: "Join the waitlist for the Personal Feng Shui Compass",
        note: "The tool that pairs your Kua number to each life area. Waitlist only.",
      },
    ],
  },
  {
    heading: "Learn the systems",
    tagline: "The theory layer, in the order that makes the rest of the guide stop sounding muddled.",
    description:
      "Feng shui is four schools, not one. This path walks the calculative and observational halves of Classical practice, the elements vocabulary, the Bagua map, and the disciplines that travel beside feng shui. Read these when you want to know why the moves work, not just which move to try.",
    entryLinks: [
      {
        href: "/guide/schools/four-feng-shui-schools-in-one-map",
        label: "The four feng shui schools in one map",
        note: "The taxonomy. One question per school.",
      },
      {
        href: "/guide/five-elements/five-elements-as-a-design-language",
        label: "The five elements as a design language",
        note: "The vocabulary layer beneath every cure.",
      },
      {
        href: "/guide/bagua/what-the-bagua-is",
        label: "What the Bagua actually is",
        note: "The map layer. A structured noticing device, not a magic overlay.",
      },
      {
        href: "/guide/compass-school/what-is-compass-school",
        label: "Compass School, and why it sits next to Form School",
        note: "The calculative half of Classical practice.",
      },
      {
        href: "/guide/sister-disciplines/what-belongs-to-feng-shui-and-what-sits-beside-it",
        label: "What sits beside feng shui, and what does not",
        note: "BaZi, Qi Men Dun Jia, crystals. Four tools, four questions.",
      },
    ],
  },
  {
    heading: "Fix a problem",
    tagline: "You already know what feels wrong. Start with cures and the problem-room pages.",
    description:
      "A cure is a small deliberate change to a room, judged by six levers. This path opens with what a cure actually is, the room-by-room cure kit, and the pages that handle the rooms people most often want to fix: bathrooms, storage, missing corners, and irregular floor plans.",
    entryLinks: [
      {
        href: "/guide/cures/what-feng-shui-cures-actually-are",
        label: "What feng shui cures actually are",
        note: "Cures as changes, not objects. The six levers.",
      },
      {
        href: "/guide/cures/five-element-cures-room-by-room",
        label: "Five-element cures, room by room",
        note: "Which element cure belongs in which room.",
      },
      {
        href: "/guide/cures/mirrors-plants-light-sound-and-symbols",
        label: "Mirrors, plants, light, sound, and symbols",
        note: "The five cure families, five short reads each.",
      },
      {
        href: "/guide/rooms/bathrooms-storage-problem-rooms",
        label: "Bathrooms, storage, and the awkward rooms",
        note: "The rooms most worth reading carefully.",
      },
      {
        href: "/guide/bagua/missing-corners-and-irregular-homes",
        label: "Missing corners and irregular homes",
        note: "L-shapes, multi-storey homes, sectors that span two rooms.",
      },
    ],
  },
  {
    heading: "Use the glossary",
    tagline: "Lost on a term? Jump in here and we will hand you back to the canonical page.",
    description:
      "Four scannable A-to-Z pages covering every term that recurs in the guide. Each entry links back to the cluster page where the topic is properly explained, so you can use the glossary as a side door into the main reading.",
    entryLinks: [
      {
        href: "/guide/glossary/glossary-core-feng-shui-terms",
        label: "Core feng shui terms",
        note: "Qi, yin and yang, sha qi, the Yi Jing. Foundation A to Z.",
      },
      {
        href: "/guide/glossary/glossary-schools-directions-and-bagua",
        label: "Schools, directions, and the Bagua",
        note: "Trigrams, the luopan, the 24 Mountains, the celestial animals.",
      },
      {
        href: "/guide/glossary/glossary-cures-rooms-and-elements",
        label: "Cures, rooms, and the five elements",
        note: "The productive and controlling cycles, command position, cure objects.",
      },
      {
        href: "/guide/glossary/glossary-timing-and-sister-disciplines",
        label: "Timing and sister disciplines",
        note: "Flying Stars, Periods, Li Chun, BaZi, Qi Men Dun Jia.",
      },
    ],
  },
];

export default function GuideIndexPage() {
  const ordered = [...GUIDE_CLUSTERS].sort((a, b) => a.order - b.order);

  return (
    <div className="page-content guide-index">
      <p className="eyebrow">The guide</p>
      <h1 className="guide-index-heading">The Ultimate Feng Shui Guide</h1>
      <p className="guide-index-lede">
        Thirty-eight short pages. No fortunes for sale. Pick the path
        that matches what you came here for, or browse the whole
        library further down.
      </p>
      <GuideReadState mode="summary" total={38} />

      <section
        className="guide-intent-paths"
        aria-label="Pick a reading path"
      >
        {INTENT_PATHS.map((path) => (
          <article
            key={path.heading}
            className="guide-intent-path-card"
            aria-labelledby={`intent-${path.heading.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <h2
              id={`intent-${path.heading.toLowerCase().replace(/\s+/g, "-")}`}
              className="guide-intent-path-heading"
            >
              {path.heading}
            </h2>
            <p className="guide-intent-path-tagline">{path.tagline}</p>
            <p className="guide-intent-path-description">{path.description}</p>
            <ul className="guide-intent-path-links">
              {path.entryLinks.map((link) => (
                <li key={link.href} className="guide-intent-path-link-item">
                  <Link href={link.href} className="guide-intent-path-link">
                    <span className="guide-intent-link-label">
                      {link.label}
                    </span>
                    <span className="guide-intent-link-note">{link.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section
        className="guide-full-library"
        aria-label="Browse the full library"
      >
        <h2 className="guide-library-heading">Browse the full library</h2>
        <p className="guide-library-orientation">
          All eleven clusters, in reading order. Use this when you
          already know what you want.
        </p>
        <ul className="guide-cluster-grid">
          {ordered.map((c) => {
            const count = pagesInCluster(c.slug).length;
            return (
              <li key={c.slug}>
                <Link
                  href={`/guide/${c.slug}`}
                  className="guide-cluster-card"
                >
                  <p className="guide-cluster-card-eyebrow">{c.label}</p>
                  <h3 className="guide-cluster-card-tagline">{c.tagline}</h3>
                  <p className="guide-cluster-card-desc">{c.description}</p>
                  <p className="guide-cluster-card-meta">
                    Read {count} {count === 1 ? "page" : "pages"} &rarr;
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <aside className="guide-tools-aside" aria-label="Free tools and waitlists">
        <h2 className="guide-tools-heading">Tools next to the guide</h2>
        <p>
          A few practical tools sit next to the guide. The{" "}
          <Link href="/kua-calculator">Kua calculator</Link> gives you
          your four supportive directions in under a minute. The{" "}
          <Link href="/products/personal-feng-shui-compass">
            Personal Feng Shui Compass
          </Link>{" "}
          and the{" "}
          <Link href="/products/annual-feng-shui-planner-2026">
            2026 Annual Feng Shui Planner
          </Link>{" "}
          are on the way; the waitlist is open if you want a quiet
          note when they land.
        </p>
      </aside>
    </div>
  );
}
