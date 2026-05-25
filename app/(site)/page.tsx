import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import HomeRoomPicker from "@/components/HomeRoomPicker";

export const metadata: Metadata = {
  title: "My Feng Shui Home - a calm, honest feng shui guide for real homes",
  description:
    "A calm, honest feng shui guide for real homes. Start with your free Kua number, get the 14-point room harmony checklist, then walk your home with a structured method.",
  alternates: { canonical: "https://myfengshuihome.com/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "My Feng Shui Home - a calm, honest feng shui guide",
    description:
      "Start with your free Kua number, get the 14-point room harmony checklist, then walk your home with a structured method.",
    url: "https://myfengshuihome.com/",
  },
};

// Structured data: WebSite + FAQPage. Helps Google rich results and AI
// systems (ChatGPT, Perplexity, Google AI Overviews) cite the page.
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "My Feng Shui Home",
  url: "https://myfengshuihome.com/",
  description:
    "A calm, honest feng shui guide for real homes. Free Kua number calculator, room walkthrough method, and the optional Home Harmony Map.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://myfengshuihome.com/articles?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// FAQ answers kept in the 40-60 word AI-snippet-extraction window.
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
    a: "Magazines mix the practical bits with the mystical bits and label nothing. We separate them. You get the structured design version first, the traditional symbolism named honestly second, and a clear note on what the evidence supports.",
  },
  {
    q: "Do I need to know my birthday for this?",
    a: "Only if you want your Kua number, which keys the personal direction recommendations. The room walkthrough and the 14-point checklist work without it. You can use the whole free site without sharing a birthday at all.",
  },
  {
    q: "What is the Kua number?",
    a: "Your Kua number is a single digit from one to nine based on your birth year and gender. It sorts you into an East or West group and names four directions that traditionally support you and four to avoid. It takes ten seconds to calculate.",
  },
  {
    q: "Is the site free?",
    a: "The calculator, the methodology page, the room harmony checklist, and the teaser articles are all free with no account. Saving charts and reading the gated articles is free with an account. The Home Harmony Map, our personalised guide, is the only paid item.",
  },
  {
    q: "What is the Home Harmony Map?",
    a: "It is a personalised eighteen-page PDF keyed to your Kua number. It contains a bagua of your home, a one-room-per-page walkthrough, a money corner page, a bedroom page, and a printable diagnostic worksheet. Twenty-nine dollars, one-time, no subscription.",
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

// Server component. Reads the session so the diagnostic teaser section
// can show the gated half to signed-out visitors and the link to the
// full article to signed-in visitors. Also reads ?checklist=sent|invalid|error
// so the lead-magnet form can render inline confirmation.
export default async function HomePage(props: {
  searchParams: Promise<{ checklist?: string }>;
}) {
  const { checklist: checklistStatus } = await props.searchParams;
  const session = await auth();
  const isSignedIn = Boolean(session?.user?.id);

  return (
    <>
      {/* Section 1 - Hero (PAS framework + Question hook) */}
      <section className="home-hero" aria-labelledby="home-hero-heading">
        <div className="home-hero-inner">
          <p className="eyebrow">A calm, honest guide to feng shui for real homes.</p>
          <h1 id="home-hero-heading" className="home-hero-heading">
            Your home is already trying to tell you something.
          </h1>
          <p className="home-hero-lede">
            Most feng shui advice is <em>vague</em>, expensive, or borrowed from
            a magazine. We do the opposite. We give you the{" "}
            <strong>structured</strong> version, in plain English, free where it
            should be free, and small enough to actually finish tonight.
          </p>
          <p className="home-hero-lede">
            Start with your Kua number. It is the door into the rest.
          </p>
          <div className="home-hero-actions">
            <Link href="/kua-calculator" className="cta-primary">
              Find my Kua number
            </Link>
            <a href="#what-it-is" className="home-hero-link">
              What is feng shui, really?
            </a>
          </div>
        </div>
      </section>

      {/* Section 2 - What feng shui actually is (Pratfall + Specificity) */}
      <section className="home-section honest-block" id="what-it-is" aria-labelledby="what-it-is-heading">
        <div className="page-narrow">
          <h2 id="what-it-is-heading">What feng shui actually is. And what it isn&apos;t.</h2>

          <p>
            Feng shui is <strong>not</strong> a fortune. It is not a way to make
            money appear. It is not a list of red things to put by your front door.
          </p>

          <p>Here is the honest version.</p>

          <p>
            Feng shui is a <strong>structured way of looking at a room</strong>.
            It asks where the door is. Where the bed is. Where the stove is.
            Where the light comes in. Where the air moves. Where <em>you</em> sit
            when you work.
          </p>

          <p>Then it gives you a small number of changes to try.</p>

          <p>
            Some of those changes are <em>testable</em>. Better light helps you
            read. A bed you can see the door from helps you sleep. A clean stove
            makes you cook more.
          </p>

          <p>
            Some of them are <em>traditional</em>. The wealth corner. The mirror
            rules. The five-element pairings. We name those honestly, every time,
            and we tell you what the evidence does and does not say.
          </p>

          <p>That is the whole deal.</p>

          <p>
            If you want the <strong>shortest</strong> way in, start with your
            Kua number. It tells you which four directions in your home are
            working <em>with</em> you and which four are working against you. It
            takes ten seconds.
          </p>

          <p className="honest-block-actions">
            <Link href="/kua-calculator" className="cta-primary">
              Find my Kua number
            </Link>
          </p>

          <p className="honest-block-lead">
            Prefer to read first? Here is the{" "}
            <strong>14-point room harmony checklist</strong> we use ourselves.
            One page. No email needed for the questions; we will send the{" "}
            <em>what-your-answers-mean</em> page if you want it.
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

      {/* Section 3 - Free tools (Jobs-to-be-done) */}
      <section className="home-section free-tools" aria-labelledby="free-tools-heading">
        <div className="page-narrow">
          <h2 id="free-tools-heading">Start here. Free, no account.</h2>
          <p className="home-section-lede">
            Two doors into the practice. Either one works. The calculator is
            faster; the methodology page is deeper.
          </p>
          <div className="free-tools-grid">
            <Link href="/kua-calculator" className="tool-card">
              <h3>The Kua number calculator</h3>
              <p>
                Enter your birth date and gender. Ten seconds. Get your number,
                your East or West group, and your four favourable and four
                unfavourable directions, each with a plain-English meaning.
              </p>
              <span className="tool-card-cta">Calculate my Kua &rarr;</span>
            </Link>
            <Link href="/methodology" className="tool-card">
              <h3>The methodology</h3>
              <p>
                The Compass School in nine sections. How the Kua number is
                derived, how the Eight Mansions work, and the honest limits of
                what feng shui can claim. Read in fifteen minutes.
              </p>
              <span className="tool-card-cta">Read the methodology &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4 - Diagnostic walkthrough teaser (Specificity + Cliffhanger) */}
      <section className="home-section diagnostic-teaser" aria-labelledby="diagnostic-teaser-heading">
        <div className="page-narrow">
          <h2 id="diagnostic-teaser-heading">
            The seven-step walkthrough practitioners use
          </h2>
          <p className="home-section-lede">
            This is the method consultants use when they walk through a home for
            the first time. Two of the seven steps are below. The rest is a free
            article when you sign in.
          </p>

          <ol className="diagnostic-teaser-list">
            <li>
              <h3>Step 1. Stand at the front door, looking in.</h3>
              <p>
                The front door is the <strong>mouth of qi</strong>. Note what
                you see first. A wall? A mirror? A long corridor? The first
                thing visitors see sets the tone of the whole home.
              </p>
            </li>
            <li>
              <h3>Step 2. Find the centre of the floor plan.</h3>
              <p>
                Mark the geometric centre of your home. This is your{" "}
                <em>tai chi</em>. Every Eight Mansions sector is measured from
                here. Keep it open and uncluttered if you can.
              </p>
            </li>
          </ol>

          <div className="diagnostic-teaser-gate">
            {isSignedIn ? (
              <Link
                href="/articles/diagnostic-walkthrough"
                className="cta-primary"
              >
                Read the full seven-step walkthrough
              </Link>
            ) : (
              <>
                <p className="diagnostic-teaser-gate-note">
                  Five more steps. Free when you sign in.
                </p>
                <Link href="/sign-in" className="cta-primary">
                  Continue with a free account
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 5 - Pick a room (Curiosity + Endowment) */}
      <section className="home-section room-picker-section" aria-labelledby="room-picker-heading">
        <div className="page-narrow">
          <h2 id="room-picker-heading">Pick a room you want to fix.</h2>
          <p className="home-section-lede">
            Tap a room. See the one move that matters most. The full nine-room
            walkthrough lives inside the Home Harmony Map.
          </p>
          <HomeRoomPicker />
        </div>
      </section>

      {/* Section 6 - The paid offer (FAB + Goal-Gradient) */}
      <section className="home-section map-offer" aria-labelledby="map-offer-heading">
        <div className="page-narrow">
          <p className="eyebrow">Our one paid product</p>
          <h2 id="map-offer-heading">The Home Harmony Map</h2>
          <p className="home-section-lede">
            One personalised PDF. Eighteen pages, keyed to <em>your</em> Kua
            number. The bagua of your home, a one-page walkthrough for every
            room, a money corner page, a bedroom page, and a printable
            diagnostic worksheet.
          </p>
          <ul className="map-offer-bullets">
            <li>
              A printed bagua map of <em>your</em> home keyed to your Kua number
              and your front-door facing
            </li>
            <li>
              A nine-sector room walkthrough naming the one change that matters
              most in each space
            </li>
            <li>
              Your four favourable directions marked for <strong>sleep</strong>,{" "}
              <strong>work</strong>, <strong>study</strong>, and{" "}
              <strong>meditation</strong>
            </li>
            <li>
              A money-corner activation page (the wealth corner, the wallet
              check, the dirty-stove sweep)
            </li>
            <li>
              A bedroom-and-relationships page (bed position, mirror check,
              headboard rule)
            </li>
          </ul>
          <p className="map-offer-price">
            <strong>$29</strong> one-time. No subscription. Printable.
          </p>
          <Link href="/home-harmony-map" className="cta-primary">
            Get the Home Harmony Map
          </Link>
        </div>
      </section>

      {/* Section 7 - FAQ (FAQPage schema) */}
      <section className="home-section faq-section" aria-labelledby="faq-heading">
        <div className="page-narrow">
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

      {/* Section 8 - Honest framing footer block (Transparency) */}
      <section className="home-section honest-footer-block" aria-labelledby="honest-footer-heading">
        <div className="page-narrow">
          <h2 id="honest-footer-heading">A short note on honesty.</h2>
          <p>
            We do not promise outcomes. Feng shui is a structured design
            tradition, not a prediction. We tell you which moves the evidence
            supports, which moves are traditional, and which moves are simply
            preference. If we do not know, we say so.
          </p>
          <p>
            The Kua calculation runs in your browser. Anonymous use stays
            anonymous. Anything you save to an account is stored on Supabase and
            is deletable at any time from your account page.
          </p>
        </div>
      </section>

      {/* Section 9 - Final CTA strip (single-choice close) */}
      <section className="home-final-cta" aria-labelledby="final-cta-heading">
        <div className="home-final-cta-inner">
          <h2 id="final-cta-heading">
            Start with your Kua number. Ten seconds.
          </h2>
          <Link href="/kua-calculator" className="cta-primary">
            Find my Kua number
          </Link>
        </div>
      </section>

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
