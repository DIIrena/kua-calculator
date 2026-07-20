import type { Metadata } from "next";
import ProductLanding, { type LandingConfig } from "@/components/ProductLanding";

// Personal Feng Shui Compass on the long-form landing template
// (shop-redesign B2). The entry rung of the ladder: roughly 50 pages
// reading one person's Kua and eight directions.

export const metadata: Metadata = {
  title:
    "Personal Feng Shui Compass | A personalised PDF reading your Kua",
  description:
    "A personalised PDF of roughly 50 typeset pages reading your Kua number, your East or West group, your four supportive directions, and your four to handle with care. With diagrams, real-home examples, and printable worksheets. No outcome promises.",
  alternates: {
    canonical:
      "https://myfengshuihome.com/products/personal-feng-shui-compass",
  },
  openGraph: {
    type: "website",
    title: "Personal Feng Shui Compass",
    description:
      "A personalised PDF reading your Kua and your eight directions. $19.",
    url: "https://myfengshuihome.com/products/personal-feng-shui-compass",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/personal-feng-shui-compass",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CONFIG: LandingConfig = {
  slug: "personal-feng-shui-compass",
  title: "The Personal Feng Shui Compass",
  eyebrow: "The foundation reading",
  headline: "Your eight directions, read properly.",
  subhead:
    "A personalised book of roughly 50 typeset pages reading your Kua number: your East or West group, the four directions the tradition says support you, the four to handle with care, and exactly what to do with each in a real home. Your name on the cover, emailed within about a minute.",
  heroPromise:
    "By the end you will know which wall your bed's headboard should sit against, which way to face your desk, and where the long conversations belong, and you can change one of them tonight.",
  priceLabel: "$19",
  priceCents: 1900,
  cover: "/products/personal-feng-shui-compass/cover-portrait.png",
  seoDescription:
    "A personalised feng shui reading of one person's Kua number and eight directions, with diagrams, worked examples, and printable worksheets.",
  promise: [
    "Pick an ordinary morning. The kettle is beginning to sound, the light has reached one familiar surface, and for no dramatic reason the room feels easy to be in. Then think of another morning in the same home, when the chair, the bed, or the angle of your body felt slightly wrong. The tradition has a structured way of talking about that difference, and it starts with one number.",
    "The Personal Feng Shui Compass reads your Kua number and tells you which directions in your home traditionally support you and which to handle with care, then walks you through using them: which wall the headboard sits against, which way the desk faces, where the long conversations happen. Every recommendation is labelled: design evidence, tradition, or preference, said plainly.",
    "It is the foundation product we built first, because it is the one you will use longest: your Kua number does not change, and the reading travels with you to every home you will ever live in.",
  ],
  steps: [
    {
      title: "Pay once",
      body: "$19, one-time. No subscription.",
    },
    {
      title: "Fill in three fields",
      body: "First name, birth date, gender. Your Kua is computed server-side.",
    },
    {
      title: "Your book arrives",
      body: "Within about a minute the personalised PDF is generated and emailed to you, your name on the cover.",
    },
  ],
  inside: [
    "Your Kua profile: your number, your East or West group, and a personalised bagua chart with your four supportive sectors highlighted.",
    "A one-page printable at-a-glance card: your whole reading on a single sheet, built to be pinned.",
    "A your-Kua-element chapter: the colours and materials the tradition attaches to your element, and where to use them.",
    "A before-the-compass chapter: the five form checks the reference books pair with direction work, command position first.",
    "A find-your-eight-directions chapter: a twenty-minute phone-compass walkthrough with a worked floor-plan example and a Room Map worksheet.",
    "Eight direction chapters, each read for your Kua, with a compass diagram, do-this and avoid-this lists, and a practitioner tip.",
    "A seven-day experiment with a printable log page, so you can test one change honestly.",
  ],
  forWho: [
    "You want your own directions read in depth, not generic tips.",
    "You move the furniture yourself and want to know which wall wins.",
    "You like a reading you can print, pin up, and test for a week.",
    "You are starting out: this is the first paid step after the free calculator.",
  ],
  notForWho: [
    "You want the whole home read: the Twelve Spaces and Complete Home Compasses below go further.",
    "You want a prediction. This reads your direction profile; it promises nothing about outcomes.",
    "You expect a consultation. It is a book, deliberately, and priced like one.",
  ],
  faq: [
    {
      q: "What exactly is a Kua number?",
      a: "A number from 1 to 9 the tradition computes from your birth date and gender. It sorts you into the East or West group and gives you four traditionally supportive directions and four to handle with care. The free calculator on this site shows yours in about ten seconds.",
    },
    {
      q: "I already used the free calculator. What does the book add?",
      a: "The calculator gives you the four labels. The book reads them: what each direction is traditionally for, how to find where it falls in your rooms, what to do about the bed, the desk, and the dining seat, and how to test a change for a week. About 50 pages of reading versus ten seconds of result.",
    },
    {
      q: "How personalised is it?",
      a: "The reading is computed from your birth data: your chapters, your highlighted sectors, and your worksheets follow your Kua, and your name is on the cover. The sample pages on this page show the real layout with a sample reader's details.",
    },
    {
      q: "Does it use my floor plan?",
      a: "No. It reads your direction profile, which applies to any home, including the next one. The find-your-directions chapter shows you how to map it onto your actual rooms with your phone's compass.",
    },
    {
      q: "What if my birth date is near the Chinese New Year boundary?",
      a: "The calculation handles the solar-year boundary automatically, the same way the free calculator does. You enter your birth date; the book takes care of the rest.",
    },
  ],
  buyLine:
    "Secure checkout. After paying you fill in three fields and the personalised PDF is generated and emailed to you within about a minute.",
  finalNote:
    "A personalised PDF of roughly 50 pages, yours to keep. One-time, no subscription.",
  ladder: "compass",
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function PersonalFengShuiCompassPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return <ProductLanding config={CONFIG} waitlistStatus={status} />;
}
