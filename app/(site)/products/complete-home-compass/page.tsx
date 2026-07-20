import type { Metadata } from "next";
import ProductLanding, { type LandingConfig } from "@/components/ProductLanding";

// The Complete Home Compass: the flagship, and the pilot page of the
// long-form landing template (shop-redesign B1). All copy lives in the
// config; the section system lives in components/ProductLanding.tsx.

export const metadata: Metadata = {
  title: "Complete Home Compass | My Feng Shui Home",
  description:
    "The whole library in one PDF: your eight directions in depth, compatibility, all twelve rooms, all nine life areas, and the 2026 overlay, read for your Kua. The flagship. $49.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/complete-home-compass",
  },
  openGraph: {
    type: "website",
    title: "Complete Home Compass",
    description:
      "Everything read for your Kua: directions, rooms, life areas, the year. $49.",
    url: "https://myfengshuihome.com/products/complete-home-compass",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/complete-home-compass",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CONFIG: LandingConfig = {
  slug: "complete-home-compass",
  title: "The Complete Home Compass",
  eyebrow: "The flagship reading",
  headline: "Your whole home, read as one system.",
  subhead:
    "Everything we read, in one book, keyed to you: your eight directions in depth, how your group pairs with another person, all twelve rooms, all nine life areas, and the shape of the 2026 year against your Kua. Around 115 to 165 typeset pages, generated for you, with your name on the cover.",
  heroPromise:
    "By the end you will have read every room and every life area of your home as one system, with a clear order of the changes to make first, the whole home worked through in a single book keyed to your Kua.",
  priceLabel: "$49",
  priceCents: 4900,
  cover: "/products/complete-home-compass/cover-portrait.png",
  seoDescription:
    "A personalised feng shui reading of the whole home: eight directions, twelve rooms, nine life areas, compatibility, and the 2026 overlay, keyed to your Kua number.",
  promise: [
    "Most feng shui advice arrives in fragments: a tip for the bedroom, a rule for the desk, a warning about mirrors. None of it is necessarily wrong, but a home is one system, and fragments read in isolation are how the advice starts to contradict itself. You fix the bedroom by the bedroom rule and break the money corner by the money rule, and nobody tells you which one should win.",
    "The Complete Home Compass reads everything together, and reads it for you specifically. Your Kua number decides which directions the tradition marks as supportive for you and which to handle with care, and that one thread runs through every chapter: every room, every life area, every placement call is made against your profile, not a generic reader's. Where a recommendation rests on design evidence, the book says so. Where it is tradition, it says that too, plainly.",
    "It reads your direction profile, not your floor plan, and it promises no outcomes. What it gives you is the complete, structured map for deciding how your home is arranged: one book, one system, no contradictions.",
  ],
  steps: [
    {
      title: "Pay once",
      body: "$49, one-time. No subscription, no upsells at checkout.",
    },
    {
      title: "Fill in three fields",
      body: "First name, birth date, gender. Your Kua is computed server-side; nothing else is asked.",
    },
    {
      title: "Your book arrives",
      body: "Within about a minute the full PDF is generated and emailed to you, your name on the cover, with a download link.",
    },
  ],
  inside: [
    "Your full Kua profile and a personalised bagua chart, with a one-page printable at-a-glance card.",
    "A find-your-eight-directions chapter: the phone-compass walkthrough, a worked floor-plan example, and a Room Map worksheet pre-filled with your directions.",
    "The your-Kua-element chapter and the five before-the-compass form checks the reference books pair with every direction.",
    "All eight direction chapters read for your Kua, each with a compass diagram, do-this and avoid-this lists, a practitioner tip, and a real home worked through.",
    "The compatibility chapter, for two people in one home.",
    "All twelve room chapters and all nine life-area chapters.",
    "The 2026 overlay, the hard-cases chapter, and the seven-day experiment with a printable log page.",
    "Around 115 to 165 typeset pages, in our brand, with your name on the cover.",
  ],
  forWho: [
    "You want the entire map in one place, not a corner at a time.",
    "You like knowing why: every call is labelled design evidence, tradition, or preference.",
    "You share the home: the compatibility chapter reads two profiles together.",
    "You would rather read one coherent book than reconcile twenty tips.",
  ],
  notForWho: [
    "You want a fortune. This is a structured reading of your direction profile, not a prediction.",
    "You want a floor-plan consultation. It reads your directions, not your blueprints, and we sell no consultations.",
    "You only need one room or your own directions: the smaller Compasses below do exactly that for less.",
  ],
  faq: [
    {
      q: "Do I need to know any feng shui first?",
      a: "No. The book explains what it needs as it goes, starting from your Kua number, and carries a glossary for the handful of terms that recur. The free calculator on this site is the only preparation that helps, and it takes ten seconds.",
    },
    {
      q: "How personalised is it really?",
      a: "The structure is the same for every reader; the readings are not. Your Kua number changes which directions are supportive, which rooms get which treatment, and what the 2026 overlay says for you. Two people with different Kua numbers receive genuinely different guidance on the same pages, and your name is on the cover.",
    },
    {
      q: "How is this different from the Personal Compass or the Twelve Spaces Compass?",
      a: "Depth. The Personal Compass ($19) reads just you: your eight directions. The Twelve Spaces Compass ($29) reads every room. The Complete Home Compass contains both readings plus the nine life areas, compatibility for two people, and the 2026 overlay, in one volume.",
    },
    {
      q: "Does it use my floor plan?",
      a: "No. It reads your direction profile, which applies to any home you live in, including the next one. That is a deliberate limit: it keeps the reading honest and useful without pretending to be an on-site consultation.",
    },
    {
      q: "What format does it arrive in, and can I print it?",
      a: "A typeset PDF, emailed within about a minute of the form. It prints cleanly at home on A4 or Letter; the at-a-glance card and the experiment log are designed to be printed and pinned up.",
    },
    {
      q: "We are two people with different Kua numbers. Whose book is it?",
      a: "The book is keyed to one person, and its compatibility chapter reads how your group pairs with the other person for the shared rooms. For two full books, each person orders their own.",
    },
  ],
  buyLine:
    "Secure checkout. After paying you fill in the three fields and the personalised PDF is generated and emailed to you within about a minute.",
  finalNote:
    "A personalised PDF, around 115 to 165 pages, yours to keep. One-time, no subscription.",
  ladder: "complete",
  // P6: the value anchor. Columns match the ladder; the flagship column
  // is highlighted. Feature rows are honest registry facts, no padding.
  comparison: {
    tiers: [
      { label: "Personal Compass", price: "$19" },
      { label: "Twelve Spaces", price: "$29" },
      { label: "Complete Home", price: "$49", current: true },
    ],
    rows: [
      { feature: "Your Kua profile and personal bagua chart", included: [true, true, true] },
      { feature: "All eight directions read in depth", included: [true, false, true] },
      { feature: "All twelve rooms, chapter by chapter", included: [false, true, true] },
      { feature: "All nine life areas, chapter by chapter", included: [false, false, true] },
      { feature: "East and West group compatibility", included: [false, false, true] },
      { feature: "The 2026 overlay for your Kua", included: [false, false, true] },
      { feature: "Seven-day experiment with a printable log", included: [true, true, true] },
      { feature: "Cut-out keepsake card of your directions", included: [true, true, true] },
    ],
    anchorLine:
      "Around 115 to 165 personalised pages for $49: less than half a dollar per page, and the two smaller books are both inside it.",
  },
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function CompleteHomeCompassPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return <ProductLanding config={CONFIG} waitlistStatus={status} />;
}
