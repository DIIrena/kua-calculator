import type { Metadata } from "next";
import Link from "next/link";

// /about page. The public author is shown as the initials "I.D.": the
// byline reads "Written by I.D., the architect behind My Feng Shui
// Home". No full name, no photo, no location, no public email are
// claimed on this surface.
//
// This page is the ONE place on the site where the credential
// (licensed M.Sc.Arch.) appears. Everywhere else the author is "an
// architect" or "the architect behind My Feng Shui Home". If the
// public author name ever changes, every visible reference here AND
// the AuthorByline rendered text AND the Person and Organization
// JSON-LD below must be replaced together.

export const metadata: Metadata = {
  title: "About My Feng Shui Home",
  description:
    "This site is run by an architect who reads feng shui as spatial guidance, not fortune-telling.",
  alternates: { canonical: "https://myfengshuihome.com/about" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://myfengshuihome.com/about",
    title: "About My Feng Shui Home",
    description:
      "Who runs this site, where the method comes from, and what this site is not.",
  },
};

// Organization JSON-LD. knowsAbout lists the topics the site teaches;
// none of them claim a formal certification.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "My Feng Shui Home",
  url: "https://myfengshuihome.com",
  logo: "https://myfengshuihome.com/icon.svg",
  description: "Feng shui guidance for real homes, written by an architect.",
  founder: {
    "@type": "Person",
    name: "I.D.",
    url: "https://myfengshuihome.com/about",
  },
  knowsAbout: [
    "Feng shui",
    "Residential architecture",
    "Interior space planning",
    "Compass School feng shui",
    "Five elements",
  ],
  sameAs: [],
};

// Person JSON-LD for the author. First name only, no location, no
// credential string (the credential lives in the visible byline above,
// not in structured data).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "I.D.",
  url: "https://myfengshuihome.com/about",
  jobTitle: "Architect",
  description:
    "Architect and lifelong feng shui reader. Writes My Feng Shui Home.",
  worksFor: {
    "@type": "Organization",
    name: "My Feng Shui Home",
    url: "https://myfengshuihome.com",
  },
};

export default function AboutPage() {
  return (
    <>
      <article className="about-page">
        <header className="about-hero">
          <p className="about-eyebrow">About</p>
          <h1 className="about-h1">
            About the architect behind My Feng Shui Home.
          </h1>
          <p className="about-subhead">
            Feng shui, read through an architect&apos;s eyes: structure
            first, energy with it, calm and practical throughout.
          </p>
          <p className="about-byline">
            Written by I.D., the architect behind My Feng Shui Home.
            Licensed M.Sc.Arch. architect and lifelong feng shui reader.
          </p>
        </header>

        <section className="about-section" aria-labelledby="moment">
          <h2 id="moment" className="about-section-title">
            The moment that shaped this site
          </h2>
          <div className="about-section-body">
            <p>
              One moment stayed with me. I was working as an architect on
              a retail space for an investor. The building was around one
              hundred years old, with a basement, concrete beams, and all
              the structural limitations that come with old construction.
            </p>
            <p>
              The investor wanted to consult feng shui practitioners, so
              she took me with her. I expected them to review the space
              and comment on the entrance, the movement of people, the
              placement of counters, the light, the flow. Instead, they
              became fascinated by the project. At one point they told the
              investor she did not really need them, because, in their
              words, &ldquo;the architect girl&rdquo; had already made the
              feng shui better than they would have. That &ldquo;architect
              girl&rdquo; was me.
            </p>
            <p>
              It was a kind compliment. What happened next is the part I
              still think about. They looked at the basement ceiling and
              asked if I could change the direction of the concrete beams
              so they would run diagonally. The building was one hundred
              years old. Those beams were part of the structure. Changing
              them in that way was not a design choice and not a feng shui
              cure. It was structurally dangerous. If someone had followed
              that advice without understanding architecture, the building
              could have been seriously damaged.
            </p>
            <p>
              I do not think those practitioners meant harm. They were
              reading the space the way they had been taught to read it.
              But that day taught me how easily feng shui advice can drift
              away from the building it is meant to serve. Energy matters.
              Flow matters. Orientation matters. Structure matters first.
              A building has laws before it has symbolism. Load-bearing
              walls, beams, moisture, fire safety, circulation, light, and
              human use are the ground every energetic reading has to
              stand on.
            </p>
            <p>
              That experience shaped how I built this guide. Architecture
              first. Feng shui with structure. Energy without superstition.
              Practical changes, never dangerous ones.
            </p>
          </div>
        </section>

        <aside
          className="about-pullquote"
          aria-label="The central thesis of the site"
        >
          <p className="about-pullquote-text">
            Architecture taught me that a home must stand. Feng shui
            taught me that a home must breathe.
          </p>
          <p className="about-pullquote-attribution">
            The central thesis of My Feng Shui Home
          </p>
        </aside>

        <section className="about-section" aria-labelledby="positioning">
          <h2 id="positioning" className="about-section-title">
            How I read feng shui
          </h2>
          <ul className="about-positioning-list">
            <li>Architecture first.</li>
            <li>Feng shui with structure.</li>
            <li>Energy, grounded in structure.</li>
            <li>Practical, reversible changes.</li>
          </ul>
        </section>

        <section className="about-section" aria-labelledby="why-this-site">
          <h2 id="why-this-site" className="about-section-title">
            Why this site exists
          </h2>
          <div className="about-section-body">
            <p>
              I have read feng shui books since I was a child. At first,
              I read them with curiosity. Later, as I studied
              architecture, I started reading them differently. Underneath
              the symbols and colours, I noticed orientation, movement,
              light, proportion, entrance, rest, work, and the quiet way a
              space shapes the person living inside it.
            </p>
            <p>
              Something always frustrated me. Every book gave advice. Some
              were beautiful. Some were practical. Some were deeply
              traditional. But I could not find one clear, structured
              place where feng shui was explained like a real system. Much
              of it lived in shades of grey: part wisdom, part tradition,
              part mysticism, part personal interpretation.
            </p>
            <p>
              As an architect, I wanted structure. I wanted to know what
              belongs where. What is classical. What is modern. What is
              practical. What is symbolic. What a person can actually do
              in a real home, without fear, superstition, or confusion.
            </p>
          </div>
        </section>

        <section className="about-section" aria-labelledby="what-i-did">
          <h2 id="what-i-did" className="about-section-title">
            What I did about it
          </h2>
          <div className="about-section-body">
            <p>
              I started building the guide I wanted to read. I compared
              schools, repeated rules, contradictions, cures, directions,
              rooms, elements, and timing systems, until the material
              stopped being a pile of advice and started being a map.
            </p>
            <p>
              My Feng Shui Home was created from that map. The{" "}
              <Link href="/methodology">methodology page</Link> explains
              how the site approaches the tradition.
            </p>
          </div>
        </section>

        <section className="about-section" aria-labelledby="voice">
          <h2 id="voice" className="about-section-title">
            Feng shui, in my voice
          </h2>
          <div className="about-section-body">
            <p>
              For me, feng shui is about clearing the path. When a space
              is arranged with more awareness, energy moves more freely.
              Attention moves more freely. The room can feel easier to
              use. The mind has fewer small frictions to fight.
            </p>
            <p>
              Feng shui, to me, is calm and practical: a thoughtful way
              to make better conditions around you. A desk facing a
              better direction. A bed in a calmer position. An entrance
              that is clear and open. Small things, repeated every day,
              become part of your daily rhythm. I keep it grounded, and
              free of promises about money, love, health, or success.
            </p>
          </div>
        </section>

        <section className="about-section" aria-labelledby="what-it-is">
          <h2 id="what-it-is" className="about-section-title">
            What this site is
          </h2>
          <div className="about-section-body">
            <p>
              My Feng Shui Home is educational. It is a place to read feng
              shui carefully, see where the ideas come from, and decide
              which small changes you want to try in your own home.
            </p>
            <p>
              This site is educational. For professional architectural,
              structural, medical, financial, or legal matters, please
              consult a qualified professional. If you want to understand
              the method behind the calculators, the{" "}
              <Link href="/methodology">methodology page</Link> lays it
              out in full. If you want to understand how your account
              data is handled, the{" "}
              <Link href="/privacy">privacy page</Link> covers it.
            </p>
          </div>
        </section>

        <section className="about-section" aria-labelledby="how-to-use">
          <h2 id="how-to-use" className="about-section-title">
            How to use the guide
          </h2>
          <div className="about-section-body">
            <p>
              Read the idea before you apply it. Look at your room. Notice
              what is already true: where the door is, where the light
              comes in, where you sleep, where you work. Then try one
              change, live with it for a week or two, and notice what
              shifts.
            </p>
            <p>
              To do something is often better than doing nothing. Move the
              bed. Clear the entrance. Check the stove. Face a better
              direction. Bring light into a stale corner. The changes on
              this site are meant to be low-risk, observable, and
              reversible. If a suggestion does not fit your home, leave
              it. The guide is here to support you, not to instruct you.
            </p>
          </div>
        </section>

        <section className="about-closing" aria-labelledby="where-to-start">
          <h2 id="where-to-start" className="about-section-title">
            Where to start
          </h2>
          <div className="about-section-body">
            <p>
              If you would like to read the system from the beginning, the{" "}
              <Link href="/guide">Ultimate Feng Shui Guide</Link> collects
              the chapters in order, from the basics through the
              room-by-room work. Read one section, try one change, and
              come back when you are ready for the next.
            </p>
            <p className="about-closing-secondary">
              Prefer something concrete first? You can{" "}
              <Link href="/kua-calculator">find your Kua number</Link>. It
              tells you which four directions support you and which four
              are traditionally handled with more care, and gives you
              something specific to test in your own home.
            </p>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd),
        }}
      />
    </>
  );
}
