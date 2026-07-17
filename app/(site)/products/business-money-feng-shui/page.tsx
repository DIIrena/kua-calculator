import type { Metadata } from "next";
import ProductLanding, { type LandingConfig } from "@/components/ProductLanding";

// Business and Money Feng Shui Kit on the landing template (B4).

export const metadata: Metadata = {
  title: "Business and Money Feng Shui Kit | My Feng Shui Home",
  description:
    "The office, the desk, the wealth corner, the kitchen stove. The practical money-channel reading for your home and business, keyed to your Kua.",
  alternates: {
    canonical:
      "https://myfengshuihome.com/products/business-money-feng-shui",
  },
  openGraph: {
    type: "website",
    title: "Business and Money Feng Shui Kit",
    description:
      "The office, the desk, the wealth corner, the stove: the money-channel reading. $19.",
    url: "https://myfengshuihome.com/products/business-money-feng-shui",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/business-money-feng-shui",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CONFIG: LandingConfig = {
  slug: "business-money-feng-shui",
  title: "The Business and Money Feng Shui Kit",
  eyebrow: "The money channel",
  headline: "Where money runs through your home.",
  subhead:
    "A kitchen with a clean stove. A desk you want to sit at. A wealth corner the household quietly tends. The tradition reads these as one channel, and this focused printable book reads that channel for your home and your work, with a chapter on applying your own Kua to each.",
  priceLabel: "$19",
  priceCents: 1900,
  cover: "/products/business-money-feng-shui/cover-portrait.png",
  seoDescription:
    "A practical feng shui reading of the money channel in a home: the desk, the office, the wealth corner, and the stove, with honest labelling of tradition versus design evidence.",
  promise: [
    "Money advice is the loudest, least honest corner of feng shui: wealth vases, frog figurines, promises. This Kit takes the opposite posture. The tradition does have a coherent reading of how money moves through a home, and it runs through unglamorous places: the stove, the desk, the corner you never dust.",
    "The Kit reads that channel end to end: the desk (position, facing, the wall behind you, the window), the wealth corner walkthrough including which symbolic cures the tradition uses and which we deliberately leave out, and the kitchen and stove section, the part most people skip and the part the tradition weighs heaviest.",
    "Every claim is labelled: design evidence, tradition, or preference. There is a daily money practice drawn from the tradition, with no mysticism attached, and a worked example of a freelancer's home office showing how the moves combine. No promised outcomes, ever: a home cannot sign clients. It can make the work seat easier to sit down at.",
  ],
  steps: [
    {
      title: "Pay once",
      body: "$19, one-time. No subscription.",
    },
    {
      title: "The PDF arrives",
      body: "By email, the moment you buy. No forms, no waiting.",
    },
    {
      title: "Read with your Kua",
      body: "The applying-your-number chapter keys the desk and corner readings to your own directions (free calculator, ten seconds).",
    },
  ],
  inside: [
    "The desk reading: position, facing, the wall behind, the window.",
    "The wealth-corner walkthrough, with the small symbolic cures the tradition uses and the ones we leave out, named.",
    "The kitchen and stove section: the part most people skip and the part that quietly matters most in the traditional reading.",
    "A daily money practice drawn from the tradition. No mysticism, no promises.",
    "A worked example: a freelancer's home office, showing how the moves combine.",
  ],
  forWho: [
    "You work from home, or your kitchen table is sometimes an office.",
    "You have heard of the wealth corner and want it read honestly, not sold to.",
    "You want the desk, the corner, and the stove treated as one system.",
  ],
  notForWho: [
    "You want a promise of income. This book will not make one.",
    "You want your full direction profile read: that is the Personal Compass; the two pair well.",
    "You expect crystals-fix-everything content. The cures chapter is the most sceptical text we publish.",
  ],
  faq: [
    {
      q: "Is this personalised to my Kua?",
      a: "It is a printable book, the same for every reader, with a dedicated chapter for applying your own Kua number to the desk and corner readings. Find your number free with the calculator, then read with it in hand.",
    },
    {
      q: "Does it apply to a business premises or just a home?",
      a: "Both. The channel reading is the same method at both scales: the seat, the facing, the corner, and what stands behind you. The worked example is a home office because that is where most readers work.",
    },
    {
      q: "Will it tell me to buy a wealth vase or a money frog?",
      a: "No. The wealth-corner chapter names the traditional cures, explains what the tradition claims for them, labels every claim, and tells you plainly which ones we consider preference rather than practice.",
    },
    {
      q: "What format is it?",
      a: "A typeset PDF, emailed the moment you buy. It prints cleanly at home.",
    },
  ],
  buyLine:
    "Secure checkout. The PDF arrives by email the moment you buy.",
  finalNote: "A printable PDF, yours to keep. One-time, no subscription.",
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function BusinessMoneyPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return <ProductLanding config={CONFIG} waitlistStatus={status} />;
}
