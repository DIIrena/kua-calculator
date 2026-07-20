import type { Metadata } from "next";
import ProductLanding, { type LandingConfig } from "@/components/ProductLanding";

// Whole-Home Starter Bundle on the landing template (B4). A static
// three-PDF set; the card sells convenience, not savings.

export const metadata: Metadata = {
  title: "Whole-Home Starter Bundle | My Feng Shui Home",
  description:
    "The Diagnostic Workbook, the Daily Ritual Pack, and the Cures Catalogue together: audit the home, build the rhythm, pick the cures. Three PDFs, one price.",
  alternates: {
    canonical:
      "https://myfengshuihome.com/products/whole-home-starter-bundle",
  },
  openGraph: {
    type: "website",
    title: "Whole-Home Starter Bundle",
    description:
      "Audit the home, build the rhythm, pick the cures. Three PDFs, one price. $29.",
    url: "https://myfengshuihome.com/products/whole-home-starter-bundle",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/whole-home-starter-bundle",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CONFIG: LandingConfig = {
  slug: "whole-home-starter-bundle",
  title: "The Whole-Home Starter Bundle",
  eyebrow: "The complete starter set",
  headline: "Read the home. Build the rhythm. Pick the cures.",
  subhead:
    "Three printable books that work as one method: the 10-Step Home Diagnostic Workbook to read your home, the Daily Ritual and Twenty Laws Pack to build the daily rhythm, and the Cures and Crystals Catalogue for the finishing layer. Three PDFs, one order, by email the moment you buy.",
  heroPromise:
    "By the end you will have read your home, set a simple daily rhythm, and picked only the cures worth keeping, the three moves that turn a one-time read into a habit.",
  priceLabel: "$29",
  priceCents: 2900,
  seoDescription:
    "Three printable feng shui workbooks in one set: a ten-step home audit, a daily practice pack, and an honestly-labelled cures reference.",
  promise: [
    "Starting feng shui from scratch has a sequencing problem: the cures make no sense before you have read the home, and the reading does not stick without a rhythm that keeps it alive. Buy one book and you usually have the middle of a method with no beginning or end.",
    "The Starter Bundle is the sequence, complete. The Diagnostic Workbook walks the home in ten steps and shows you what you are looking at. The Ritual Pack turns the findings into a small daily practice built on the tradition's twenty laws. The Cures Catalogue is the finishing layer: every cure and crystal on a labelled reference card, so you always know whether a claim is tested, traditional, or preference.",
    "It is the printable counterpart to the personalised readings: no birth data, no generated pages, just three well-made books that teach the method itself. Work through them in order over a few weekends, or keep them as the household reference shelf.",
  ],
  steps: [
    {
      title: "Pay once",
      body: "$29, one-time. No subscription.",
    },
    {
      title: "Three PDFs arrive",
      body: "By email, the moment you buy. No forms, no waiting.",
    },
    {
      title: "Work in order",
      body: "Diagnose first, build the rhythm second, choose the cures last.",
    },
  ],
  inside: [
    "The 10-Step Home Diagnostic Workbook: the room-by-room audit with worksheets.",
    "The Daily Ritual and Twenty Laws Pack: the tradition's operating rhythm, made doable.",
    "The Cures and Crystals Catalogue: every cure and crystal on a reference card, each labelled Tested, Traditional, or Preference.",
    "Three typeset PDFs. Bought separately they are $32; together, $29.",
  ],
  forWho: [
    "You are starting from zero and want the method, not fragments.",
    "You prefer teach-me books over generated readings.",
    "You want the household reference set on the (digital) shelf.",
  ],
  notForWho: [
    "You want a reading keyed to your birth data: that is what the Compasses do.",
    "You already own one of the three books: the overlap costs you the discount's worth.",
    "You want one quick answer. This is the long way in, on purpose.",
  ],
  faq: [
    {
      q: "How is this different from the Compass readings?",
      a: "The Compasses are generated readings keyed to your Kua. These three are teaching books, the same for every reader: the method itself. Many readers use both: a Compass for their own directions, the bundle for the household method.",
    },
    {
      q: "Do the three books repeat each other?",
      a: "No; they hand off. The Workbook ends in findings, the Ritual Pack starts from findings, and the Catalogue is the reference the other two point into.",
    },
    {
      q: "Is the discount real?",
      a: "The three books sell separately at $14, $9, and $9 ($32). The bundle is $29. We say so plainly because the real reason to buy the set is the sequence, not the three dollars.",
    },
    {
      q: "What format are they?",
      a: "Three typeset PDFs, emailed together the moment you buy. All three print cleanly at home; the Workbook and the Catalogue are built to be printed.",
    },
  ],
  buyLine:
    "Secure checkout. All three PDFs arrive by email the moment you buy.",
  finalNote:
    "Three printable PDFs, yours to keep. One-time, no subscription.",
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function WholeHomeStarterBundlePage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return <ProductLanding config={CONFIG} waitlistStatus={status} />;
}
