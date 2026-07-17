import type { Metadata } from "next";
import ProductLanding, { type LandingConfig } from "@/components/ProductLanding";

// Cures and Crystals Catalogue on the landing template (B4). The $9
// entry item: honestly-labelled reference cards.

export const metadata: Metadata = {
  title: "Cures and Crystals Catalogue | My Feng Shui Home",
  description:
    "Every cure and crystal as a compact reference card: what it is, where it goes, what the tradition says, and the modern reading. Printable catalogue.",
  alternates: {
    canonical: "https://myfengshuihome.com/products/cures-catalog",
  },
  openGraph: {
    type: "website",
    title: "Cures and Crystals Catalogue",
    description:
      "Every cure and crystal on a labelled reference card. Printable. $9.",
    url: "https://myfengshuihome.com/products/cures-catalog",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/cures-catalog",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const CONFIG: LandingConfig = {
  slug: "cures-catalog",
  title: "The Cures and Crystals Catalogue",
  eyebrow: "The honest reference",
  headline: "Every cure on a card, every claim labelled.",
  subhead:
    "Around 25 cure cards organised by the six families (light, sound, water, plants, colour, objects), 15 crystal cards, and a one-page placement quick-table. Each card says what it is, where it goes, what the tradition claims, and what the modern reading adds, labelled Tested, Traditional, or Preference. 23 pages, $9.",
  priceLabel: "$9",
  priceCents: 900,
  cover: "/products/cures-catalog/cover-portrait.png",
  seoDescription:
    "A printable reference catalogue of feng shui cures and crystals, each on a compact card with its claims labelled tested, traditional, or preference.",
  promise: [
    "Cures are where feng shui shopping happens, and where the honesty usually stops: a crystal is promised to do something no crystal has ever been shown to do, and the buyer has no way to tell tradition from sales copy.",
    "The Catalogue is the reference that tells you. Every cure sits on one compact card: what it is, where the tradition places it, what it claims, and what the modern reading adds. Every claim carries one of three labels: Tested, Traditional, or Preference. The crystal cards are never labelled Tested, because none of them are, and the Catalogue says so in print.",
    "It is the cheapest book we sell and the most sceptical, and it makes the household's smallest decisions quick: the placement quick-table pairs cure families with rooms on a single page you can pin inside a cupboard door.",
  ],
  steps: [
    {
      title: "Pay once",
      body: "$9, one-time. No subscription.",
    },
    {
      title: "The PDF arrives",
      body: "By email, the moment you buy.",
    },
    {
      title: "Print the cards",
      body: "Four cards to a page; the quick-table is one page, built to be pinned.",
    },
  ],
  inside: [
    "Around 25 cure cards, four to a page, organised by the six cure families: light, sound, water, plants, colour, objects.",
    "15 crystal cards, same anatomy, labelled Traditional or Preference, never Tested.",
    "A placement quick-table: cure family by room, one page.",
    "23 pages, typeset, printable.",
  ],
  forWho: [
    "You keep seeing cures recommended and want one honest reference.",
    "You would rather check a card than search the internet's claims.",
    "You want the smallest, cheapest way to try our approach.",
  ],
  notForWho: [
    "You want to be told crystals will change your life: this book will say the opposite, in print.",
    "You want a reading of your home or your directions: this is a reference, not a reading.",
  ],
  faq: [
    {
      q: "What do the three labels mean?",
      a: "Tested means there is a defensible modern reason (a mirror spreads light whether or not you believe in it). Traditional means the tradition prescribes it and we report that faithfully without endorsing it. Preference means it is taste. Every card carries exactly one label per claim.",
    },
    {
      q: "Is this anti-crystal?",
      a: "It is honest about crystals. The cards report what the tradition and modern practice claim, label it, and let you decide. If you enjoy crystals, the cards tell you where the tradition would put them; nothing more is promised.",
    },
    {
      q: "Does it work with the other books?",
      a: "Yes: it is the reference layer of the Starter Bundle, and the Compass readings point at cure families the Catalogue details. It also stands alone fine.",
    },
    {
      q: "What format is it?",
      a: "A 23-page typeset PDF, emailed the moment you buy, designed for home printing: cards four to a page, quick-table on one.",
    },
  ],
  buyLine: "Secure checkout. The PDF arrives by email the moment you buy.",
  finalNote: "A 23-page printable PDF, yours to keep. One-time, no subscription.",
};

type SearchParams = Promise<{ waitlist?: string }>;

export default async function CuresCatalogPage(props: {
  searchParams: SearchParams;
}) {
  const { waitlist } = await props.searchParams;
  const status =
    waitlist === "sent" || waitlist === "invalid" || waitlist === "error"
      ? (waitlist as "sent" | "invalid" | "error")
      : null;

  return <ProductLanding config={CONFIG} waitlistStatus={status} />;
}
