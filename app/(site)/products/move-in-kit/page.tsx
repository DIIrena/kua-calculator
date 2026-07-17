import type { Metadata } from "next";
import ProductLanding, { type LandingConfig } from "@/components/ProductLanding";

// Move-In Date Report on the long-form landing template (B3). The
// life-event product: a move-in window read day by day.

export const metadata: Metadata = {
  title: "Move-In Date Report | My Feng Shui Home",
  description:
    "A personalised PDF that reads your move-in window against the verified 2026 day calendar, with your Kua directions for the new home and a first-week activation checklist. July 2026 to February 2027.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/move-in-kit",
  },
  openGraph: {
    type: "website",
    title: "Move-In Date Report",
    description:
      "Your move-in window read day by day, your Kua directions for the new home, and a first-week checklist. $29.",
    url: "https://myfengshuihome.com/products/move-in-kit",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/move-in-kit",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CONFIG: LandingConfig = {
  slug: "move-in-kit",
  title: "The Move-In Date Report",
  eyebrow: "For the move",
  headline: "Choose your move-in day with a method, not a guess.",
  subhead:
    "You give us the window you might move within; we read every day in it against the verified 2026 day calendar and your own Kua. Your best days pulled out, the ones to handle with care flagged, your directions for the new home, and a first-week sequence for settling in.",
  priceLabel: "$29",
  priceCents: 2900,
  cover: "/products/move-in-kit/cover-portrait.png",
  seoDescription:
    "A personalised reading of a move-in window against the traditional 2026 day calendar, with Kua directions for the new home and a first-week checklist.",
  promise: [
    "The box is taped, the keys are in your hand, and the only thing left is choosing the day you walk in. Most people pick whatever the van company had free. The tradition has an actual method for this, and it takes your birth data and your dates, not your hopes.",
    "The Move-In Date Report reads every day in your window against the verified 2026 day calendar: which dates it treats as favourable for a move, which suit settling, and which to handle with care, each with the reason named. Then it adds the part no generic calendar can: your own Kua directions for the new home, so the bed and the main work seat start in the right place on day one.",
    "It closes with a first-week sequence: the threshold, light and air, the kitchen, the bed, the work seat, in order. A calm structured start, not a superstition checklist, and it says plainly which parts are tradition.",
  ],
  steps: [
    {
      title: "Pay once",
      body: "$29, one-time. No subscription.",
    },
    {
      title: "Give us your window",
      body: "Your name, birth date, gender, and the date range you might move within (inside July 2026 to February 2027).",
    },
    {
      title: "Your report arrives",
      body: "Within about a minute the personalised PDF is generated and emailed to you.",
    },
  ],
  inside: [
    "A day-by-day reading of your move-in window: each date marked favourable, settling, neutral, or handle-with-care, with the reason.",
    "Your best move days pulled out as a short list, and the care days listed separately so planning takes one glance.",
    "Your four supportive directions for the new home, read from your Kua, for placing the bed and the main work seat.",
    "The first-week activation sequence: threshold, light and air, kitchen, bed, work seat, in order.",
  ],
  forWho: [
    "You are moving between July 2026 and February 2027 and the date is still yours to choose.",
    "You want the new home to start deliberately, not by removal-van logistics alone.",
    "You like a one-glance answer backed by a visible method.",
  ],
  notForWho: [
    "Your date is already fixed and unchangeable: the report still reads your week-one setup, but its main job is choosing the day.",
    "You want a guarantee the move goes well. It reads a traditional calendar; it promises nothing.",
    "Your window falls outside July 2026 to February 2027 (the verified calendar's current range).",
  ],
  faq: [
    {
      q: "What if none of my possible days is favourable?",
      a: "The report never leaves you with a blank. Every day is graded, so if the window is tight you see the best available day and what the tradition suggests pairing with it: which jobs to do on the settling days either side.",
    },
    {
      q: "Where do the day readings come from?",
      a: "From the traditional twelve-officers day calendar for the 2026 solar year, the same verified dataset behind our free Good Days page and the Planner. The free page shows everyone's dates; the report reads your specific window and adds your Kua layer.",
    },
    {
      q: "The free Good Days page exists. Why pay?",
      a: "The free page lists the generally favourable dates for everyone. The report reads your exact window day by day including the in-between days, pulls out your best options, and adds what the free page cannot: your own directions for the new home and the first-week sequence.",
    },
    {
      q: "We are a couple with different Kua numbers.",
      a: "The date reading is shared (the calendar is the calendar), and the report is keyed to one person's directions for the setup. For both profiles read together, the Couple Compatibility Compass on our sister site reads two people as a pair.",
    },
    {
      q: "What format does it arrive in?",
      a: "A typeset PDF, emailed within about a minute of the form. Print the day list and pin it where the packing happens.",
    },
  ],
  buyLine:
    "Secure checkout. After paying you fill in the short form, including your possible date window, and the personalised PDF is emailed within about a minute.",
  finalNote:
    "A personalised PDF, yours to keep. One-time, no subscription.",
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function MoveInKitPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return <ProductLanding config={CONFIG} waitlistStatus={status} />;
}
