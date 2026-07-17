import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import HomeRoomPicker from "@/components/HomeRoomPicker";
import CalculatorIsland from "@/components/CalculatorIsland";
import CalculatorScripts from "@/components/CalculatorScripts";
import { ARTICLES, CATEGORIES, type ArticleCategory } from "@/lib/articles";

const HOMEPAGE_CATEGORY_ORDER: ReadonlyArray<ArticleCategory> = [
  "foundations",
  "bagua",
  "room-by-room",
  "methodology",
];

export const metadata: Metadata = {
  title: "My Feng Shui Home - free Kua calculator + feng shui for real homes",
  description:
    "Find your Kua number free, right on the homepage. Then feng shui for real homes, where key practical recommendations are labelled by their basis: design-supported, traditional, applied observation, or preference.",
  alternates: { canonical: "https://myfengshuihome.com/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "My Feng Shui Home - free Kua calculator + feng shui for real homes",
    description:
      "Find your Kua number free, right on the homepage. Then feng shui for real homes, where key practical recommendations are labelled by their basis: design-supported, traditional, applied observation, or preference.",
    url: "https://myfengshuihome.com/",
    images: [
      {
        url: "https://myfengshuihome.com/api/og/product/kua-calculator",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "My Feng Shui Home",
  url: "https://myfengshuihome.com/",
  description:
    "Feng shui for real homes. Free Kua number calculator, room walkthrough method, and focused personalised guides.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://myfengshuihome.com/articles?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "Is feng shui real?",
    a: "Feng shui is real as a structured design method. It looks at where doors, beds, stoves, light, and people sit in a room, then proposes small changes. Some changes are testable design choices. Some are traditional. We name which is which on every page.",
  },
  {
    q: "Do I have to redecorate?",
    a: "No. Most useful feng shui moves are tiny. A clean stove. A bulb replaced. A bed turned ninety degrees so you can see the door. The 14-point checklist on this page is finishable in one afternoon and asks for no new furniture.",
  },
  {
    q: "How is this different from a magazine article on feng shui?",
    a: "Magazines mix the practical bits with the mystical bits and label nothing. We separate them. You get the structured design version first, the traditional symbolism clearly labelled second, and a clear note on what the evidence supports.",
  },
  {
    q: "Do I need to know my birthday for this?",
    a: "Only if you want your Kua number, which keys the personal direction recommendations. The room walkthrough and the 14-point checklist work without it. You can use the whole free site without sharing a birthday at all.",
  },
  {
    q: "What is the Kua number?",
    a: "Your Kua number is a single digit from one to nine based on your birth year and gender. It sorts you into an East or West group and names four directions that traditionally support you and four to handle with care. It takes ten seconds to calculate.",
  },
  {
    q: "Is the site free?",
    a: "The calculator, the methodology page, the room harmony checklist, and the teaser articles are all free with no account. Saving charts and reading the gated articles is free with an account. The paid guides and tools live on the shop page. The free side of the site is the same site forever - paid content is opt-in.",
  },
  {
    q: "What is the Personal Feng Shui Compass?",
    a: "It is a personalised PDF keyed to your Kua number. It reads your East or West group, your four supportive directions and your four cautious directions, with traditional placements for the bed, the desk, and the dining seat, plus a seven-day experiment. It is personalised to your direction profile, the eight directions that follow from your Kua, not to your floor plan. $19, one-time, no subscription. It is available now in the shop.",
  },
  {
    q: "What about Western feng shui versus Classical feng shui?",
    a: "Both are used by working practitioners. Classical schools use a compass and birth data. Western BTB uses the front door as the reference. We teach the Classical Compass School (which produces your Kua number) and we link both methods in the methodology page.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default async function HomePage(props: {
  searchParams: Promise<{ checklist?: string }>;
}) {
  const { checklist: checklistStatus } = await props.searchParams;
  const session = await auth();
  const isSignedIn = Boolean(session?.user?.id);

  return (
    <>
      {/* Section 1 - Hero + the calculator. The calculator sits at the
          top so a first visit can calculate (and, on opt-in, save and be
          emailed) straight away. */}
      <section className="hero" aria-labelledby="home-hero-heading">
        <div className="hero-inner">
          <p className="eyebrow">Free Kua number calculator</p>
          <h1 id="home-hero-heading">
            Feng shui for real homes. Start with your Kua number.
          </h1>
          <p className="lede">
            Enter your birth date and gender. You&apos;ll get your East or West
            group, your four supportive directions, and four to handle with
            care, each with one short line on how to use it. Ten seconds, free,
            Chinese New Year boundary handled automatically.
          </p>
        </div>
      </section>

      <section
        className="calculator-section"
        aria-label="Kua number calculator"
      >
        <div className="calculator-inner">
          <CalculatorIsland isSignedIn={isSignedIn} />
        </div>
      </section>

      {/* Section 2 - What feng shui actually is (affirmative) */}
      <section
        className="home-section home-section-paper honest-block"
        id="what-it-is"
        aria-labelledby="what-it-is-heading"
      >
        <div className="page-prose">
          <h2 id="what-it-is-heading">What feng shui actually is.</h2>
          <p>
            Feng shui is a <strong>structured way of looking at a room</strong>.
            It asks where the door is. Where the bed is. Where the stove is.
            Where the light comes in. Where the air moves. Where <em>you</em> sit
            when you work.
          </p>
          <p>Then it gives you a small number of changes to try.</p>
          <p>
            Some of those changes have a plain, practical rationale. Better
            light helps you read. A clean stove makes you cook more. A clear
            path to the door is easier to walk.
          </p>
          <p>
            Some of them are <em>traditional</em>: the wealth corner, the mirror
            rules, the five-element pairings. Where a recommendation is
            traditional, we say so, and we tell you what the evidence supports.
          </p>
          <p className="home-credibility">
            Underneath the schools and the cures, feng shui is a way of
            reading space: orientation, movement, light, proportion,
            entrance, rest. My Feng Shui Home reads it that way because
            the site is written by an architect.
          </p>
          <p>
            The shortest way in is your Kua number. It names the four
            directions in your home that traditionally <em>support</em> you and
            the four to handle with more care. It is right at the top of this
            page, and it takes ten seconds.
          </p>
        </div>
      </section>

      {/* Section 3 - Free tools */}
      <section
        className="home-section home-section-cream free-tools"
        aria-labelledby="free-tools-heading"
      >
        <div className="page-content">
          <h2 id="free-tools-heading">Start here. Free, no account.</h2>
          <p className="home-section-lede">
            Three doors into the practice. The calculator is fastest; the
            guide is deepest; the methodology page sits between them.
          </p>
          <div className="free-tools-grid">
            <Link href="/kua-calculator" className="tool-card">
              <h3>The Kua number calculator</h3>
              <p>
                Enter your birth date and gender. Ten seconds. Get your number,
                your East or West group, and your four favourable and four
                unfavourable directions, each with a one-line meaning.
              </p>
              <span className="tool-card-cta">Calculate my Kua &rarr;</span>
            </Link>
            <Link href="/guide" className="tool-card">
              <h3>The Ultimate Feng Shui Guide</h3>
              <p>
                Thirty-eight short pages across eleven topics. Browse by
                topic or search the whole library. No purchase, no account.
              </p>
              <span className="tool-card-cta">Open the guide &rarr;</span>
            </Link>
            <Link href="/methodology" className="tool-card">
              <h3>The methodology</h3>
              <p>
                The Compass School in nine sections. How the Kua number is
                derived, how the Eight Mansions work, and the limits of
                what feng shui can claim. Read in fifteen minutes.
              </p>
              <span className="tool-card-cta">Read the methodology &rarr;</span>
            </Link>
          </div>
          <p className="free-tools-next">
            When you want the next practical tool for your own home,{" "}
            <Link href="/products">see what to use</Link>.
          </p>
        </div>
      </section>

      {/* Section 4 - Read more (category cards). Replaces the
          single-teaser section: with 11 articles live, the homepage
          should send the reader into the article system. */}
      <section
        className="home-section home-section-paper categories-section"
        aria-labelledby="categories-heading"
      >
        <div className="page-content">
          <h2 id="categories-heading">Read more. Learn deeper.</h2>
          <p className="home-section-lede">
            Eleven short articles in four groups. Most
            are free with no account. Pick a door.
          </p>
          <div className="home-categories-grid">
            {HOMEPAGE_CATEGORY_ORDER.map((cat) => {
              const meta = CATEGORIES[cat];
              const count = ARTICLES.filter((a) => a.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/articles/category/${cat}`}
                  className="home-category-card"
                >
                  <p className="home-category-card-eyebrow">{meta.title}</p>
                  <h3 className="home-category-card-tagline">{meta.tagline}</h3>
                  <p className="home-category-card-desc">
                    {meta.description}
                  </p>
                  <p className="home-category-card-meta">
                    {count} {count === 1 ? "article" : "articles"} &rarr;
                  </p>
                </Link>
              );
            })}
          </div>
          {isSignedIn ? null : (
            <p className="categories-section-note">
              A few of the deeper articles unlock with a free account.{" "}
              <Link href="/sign-in" className="home-hero-link">
                Sign in
              </Link>{" "}
              to read them. (Ten seconds; no credit card.)
            </p>
          )}
        </div>
      </section>

      {/* Section 5 - Pick a room */}
      <section
        className="home-section home-section-cream room-picker-section"
        aria-labelledby="room-picker-heading"
      >
        <div className="page-content">
          <h2 id="room-picker-heading">Pick a room you want to fix.</h2>
          <p className="home-section-lede">
            Tap a room. See the one move that matters most. The Personal Feng
            Shui Compass reads your Kua and your eight directions, so you can
            tell which directions support each room in your own home.
          </p>
          <HomeRoomPicker />
        </div>
      </section>

      {/* Section 5b - The 14-point checklist (lead magnet). Sits after
          the free value, before the paid offer. */}
      <section
        className="home-section home-section-paper checklist-section"
        aria-labelledby="checklist-heading"
      >
        <div className="page-prose">
          <h2 id="checklist-heading">The 14-point room harmony checklist.</h2>
          <p>
            One page, free. Print it, walk your home, and see what is
            already working.
          </p>

          {checklistStatus === "sent" ? (
            <p
              className="lead-magnet-status lead-magnet-status-ok"
              role="status"
            >
              Sent. Check your inbox in a minute. Open the email, click the
              link to the checklist, print it, walk your home.
            </p>
          ) : checklistStatus === "invalid" ? (
            <p
              className="lead-magnet-status lead-magnet-status-err"
              role="alert"
            >
              That does not look like a valid email. Try again?
            </p>
          ) : checklistStatus === "error" ? (
            <p
              className="lead-magnet-status lead-magnet-status-err"
              role="alert"
            >
              We could not send the email right now. Please try again in a
              minute.
            </p>
          ) : null}

          <LeadMagnetForm preFilledEmail={session?.user?.email ?? null} />
        </div>
      </section>

      {/* Section 6 - The paid offer (spotlight + shelf teaser) */}
      <section className="home-section map-offer" aria-labelledby="map-offer-heading">
        <div className="page-content">
          <p className="eyebrow">Paid guides and tools</p>
          <h2 id="map-offer-heading" className="home-section-heading">
            Our paid products are printable guides and focused tools.
          </h2>
          <p className="home-section-lede">
            Each gives you a structured way to decide what to do in the
            room you are standing in. One-time prices, instant delivery, no
            outcome promises. The spotlight one is below; the rest of the
            shelf is one click away.
          </p>
          <div className="map-offer-grid">
            <div className="map-offer-text">
              <h3>The Complete Home Compass</h3>
              <p>
                The flagship: everything we read, in one book, keyed to you.
                Your eight directions in depth, how your group pairs with
                another, all twelve rooms, all nine life areas, and the shape
                of the 2026 year against your Kua. Around 115 to 165 typeset
                pages, generated for you and emailed within about a minute.
              </p>
              <ul className="map-offer-bullets">
                <li>Your full Kua profile and a personalised bagua chart</li>
                <li>
                  All eight direction chapters: four supportive, four to
                  handle with care
                </li>
                <li>All twelve room chapters and all nine life-area chapters</li>
                <li>The 2026 overlay and a seven-day experiment</li>
                <li>Your name on the cover; emailed within about a minute</li>
              </ul>
            </div>
            <aside className="map-offer-price-card" aria-label="Price">
              <p className="map-offer-price-eyebrow">The Complete Home Compass</p>
              <p className="map-offer-price-amount">$49</p>
              <p className="map-offer-price-suffix">
                Available now. One-time, no subscription.
              </p>
              <Link
                href="/products/complete-home-compass"
                className="cta-primary"
              >
                Get the Complete Home Compass
              </Link>
              <p className="map-offer-price-note">
                A personalised PDF, yours to keep.
              </p>
            </aside>
          </div>

          <div className="map-offer-shelf-teaser">
            <p>
              Also on the shelf: the{" "}
              <strong>Personal Feng Shui Compass</strong>, the{" "}
              <strong>Twelve Spaces Compass</strong>, the{" "}
              <strong>Move-In Date Report</strong>, and the{" "}
              <strong>Business and Money Kit</strong>. Each is its own
              focused book.
            </p>
            <p>
              <Link href="/products" className="article-back-link">
                See all paid guides and tools &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Section 7 - FAQ */}
      <section
        className="home-section home-section-cream faq-section"
        aria-labelledby="faq-heading"
      >
        <div className="page-prose">
          <h2 id="faq-heading">Common questions</h2>
          <div className="faq-list">
            {FAQ.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8 - What we promise / what we don't */}
      <section
        className="home-section home-section-sand honest-footer-block"
        aria-labelledby="honest-footer-heading"
      >
        <div className="page-prose">
          <h2 id="honest-footer-heading">What you can expect.</h2>
          <p>
            Feng shui is a structured design tradition. Key practical
            recommendations are labelled where their basis matters:
            design-supported, traditional feng shui, applied observation, or
            personal preference. We say so when the answer is uncertain, and we
            describe what a move supports, leaving the outcome to your own home.
          </p>
          <p>
            The Kua calculation runs in your browser. Anonymous use stays
            anonymous. Anything you save to an account is stored on Supabase
            and is deletable at any time from your account page.
          </p>
        </div>
      </section>

      <CalculatorScripts />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
