import type { Metadata } from "next";
import { auth } from "@/auth";
import CalculatorIsland from "@/components/CalculatorIsland";
import CalculatorScripts from "@/components/CalculatorScripts";

export const metadata: Metadata = {
  title:
    "Kua Number Calculator - Find Your East or West Group | My Feng Shui Home",
  description:
    "Free Kua number calculator. Enter your birth year and gender to get your East or West group, four favourable directions, and four to avoid.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    title:
      "Kua Number Calculator - Find Your East or West Group | My Feng Shui Home",
    description:
      "Free, instant. Enter your birth year and gender. We'll give you your Kua number, your group, and your eight personal directions.",
  },
  twitter: {
    card: "summary",
    title: "Kua Number Calculator",
    description:
      "Free, instant. Enter your birth year and gender. We'll give you your Kua number, your group, and your eight personal directions.",
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kua Number Calculator",
  description:
    "Free Kua number calculator. Enter birth year and gender to receive your East or West group and your eight personal directions with plain-English meanings.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (web browser)",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to find your Kua number",
  description: "Three-step process for using the Kua number calculator.",
  totalTime: "PT10S",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your full birth date",
      text: "Year, month, and day. The calculator looks up Chinese New Year for your year and adjusts automatically if you were born before it.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Pick male or female",
      text: "The traditional formula differs by gender. The post-2000 variant is handled automatically.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read your result",
      text: "Your Kua number, group, four favourable directions, and four to avoid will appear with a one-line plain-English meaning for each.",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the Kua number actually tell me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your Kua number identifies four compass directions that traditionally support you - one for energy, one for health, one for relationships, one for stability - and four to avoid. Practitioners use the result to choose bed orientation, desk facing, and which rooms become primary spaces. It is a structured design tool, not a forecast.",
      },
    },
    {
      "@type": "Question",
      name: "How is the Kua number calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The traditional method sums the last two digits of your birth year, reduces to a single digit, then applies a gender-specific operation. Males born before 2000 subtract from ten; females add five. The result is your Kua. If it lands on five, it reassigns to two (male) or eight (female), since five sits at the centre of the Luo Shu and has no compass direction.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the formula differ for people born after 2000?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The traditional formula was calibrated to the previous astrological era. From the year 2000 onward, the male variant subtracts from nine instead of ten, and the female variant adds six instead of five. The calculator applies the right variant automatically based on the year you enter.",
      },
    },
    {
      "@type": "Question",
      name: "Does Chinese New Year affect my Kua number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Kua formula uses the Chinese solar-calendar year, not the Gregorian year. If you were born in January or early February before Chinese New Year of your birth year, you belong to the previous Chinese year for Kua purposes. This calculator asks for your full birth date and looks up the correct Chinese New Year automatically, so you don't need to know the date yourself.",
      },
    },
    {
      "@type": "Question",
      name: "What are favourable and unfavourable directions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eight Mansions assigns each of the eight compass directions a quality based on your Kua. Four are favourable (Sheng Qi, Tian Yi, Yan Nian, Fu Wei) and four are unfavourable (Huo Hai, Wu Gui, Liu Sha, Jue Ming). Tradition recommends orienting active functions toward favourable directions and placing containment functions like storage or utility rooms in unfavourable ones.",
      },
    },
    {
      "@type": "Question",
      name: "What if my partner has a different group?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is common for couples to have different Kua numbers and sometimes different groups. The calculator's second-person option shows directions favourable for both, directions to avoid for both, and a list of conflicts where one partner's favourable direction is the other's unfavourable. The standard guidance is to assign conflicts by primary user of the room.",
      },
    },
    {
      "@type": "Question",
      name: "Is this fortune-telling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The Kua system is a culturally-developed scheme for organising space; its predictive validity is not established by external evidence. Treat the result as a non-arbitrary way to choose between four equivalent-seeming bed or desk orientations, not as a forecast.",
      },
    },
    {
      "@type": "Question",
      name: "Is the calculator free? Do you store my data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculator is free and works with no account. The calculation runs entirely in your browser, so when you use it without an account no birth data, no result, and no identifying information is sent to or stored on any server. If you choose to create a free account, we store the email you sign up with and any birth data or charts you choose to save, so we can show them to you again and, with your consent, email your chart. You can delete your account and its data at any time.",
      },
    },
  ],
};

export default async function KuaCalculatorPage() {
  const session = await auth();
  const isSignedIn = Boolean(session?.user?.id);
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-inner">
          <span className="hero-botanical" aria-hidden="true">
            <svg
              viewBox="0 0 120 170"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
            >
              <path
                d="M61 168 C57 132 64 100 60 64 C57 38 63 20 60 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <g fill="currentColor">
                <path d="M60 120 C41 119 27 125 15 139 C33 135 49 129 60 120 Z" />
                <path d="M61 120 C80 117 95 121 108 133 C89 132 73 128 61 120 Z" />
                <path d="M60 82 C43 81 31 87 21 99 C37 95 51 90 60 82 Z" />
                <path d="M61 82 C78 79 91 83 102 94 C85 93 71 89 61 82 Z" />
                <path d="M60 46 C46 45 36 50 28 60 C41 57 53 53 60 46 Z" />
                <path d="M61 46 C75 43 86 47 95 56 C81 56 69 52 61 46 Z" />
              </g>
            </svg>
          </span>
          <p className="eyebrow">Free Kua Number Calculator</p>
          <h1 id="hero-heading">Find your Kua number in ten seconds.</h1>
          <p className="lede">
            Enter your birth date and gender. You&apos;ll get your East or West
            group, your four favourable directions, and four to avoid - with
            one plain-English line on how to use each. Chinese New Year boundary
            handled automatically.
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

      <section className="explainer" aria-labelledby="what-is-heading">
        <div className="explainer-inner">
          <h2 id="what-is-heading">What is a Kua number?</h2>
          <p>
            Your Kua number is a single digit from one to nine, derived from
            your birth year and gender. It belongs to the Eight Mansions (Ba
            Zhai) system of Classical feng shui. The number sorts you into one
            of two groups - East or West - and identifies four directions that
            traditionally support you and four that don&apos;t. People use it to
            choose which way their bed points, which way they face at a desk,
            and which room in a home becomes the bedroom.
          </p>

          <h2>How the calculator works</h2>
          <ol className="how-it-works">
            <li>
              <h3>Enter your full birth date.</h3>
              <p>
                Year, month, and day. The calculator handles the Chinese New
                Year boundary automatically: if you were born in January or
                early February, it figures out whether you belong to the
                previous Chinese-calendar year.
              </p>
            </li>
            <li>
              <h3>Pick male or female.</h3>
              <p>
                The traditional formula differs by gender. The post-2000
                variant is handled automatically.
              </p>
            </li>
            <li>
              <h3>Read your result.</h3>
              <p>
                You&apos;ll see your Kua number, your group, your four
                favourable directions (Sheng Qi, Tian Yi, Yan Nian, Fu Wei) and
                your four to avoid (Huo Hai, Wu Gui, Liu Sha, Jue Ming), each
                with a one-line meaning. If a Chinese New Year adjustment was
                applied, the result card says so.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-heading">
        <div className="faq-inner">
          <h2 id="faq-heading">Common questions</h2>

          <details className="faq-item">
            <summary>What does the Kua number actually tell me?</summary>
            <div className="faq-answer">
              <p>
                Your Kua number identifies four compass directions that
                traditionally support you - one for energy, one for health, one
                for relationships, one for stability - and four to avoid.
                Practitioners use the result to choose bed orientation, desk
                facing, and which rooms become primary spaces. It is a
                structured design tool, not a forecast.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary>How is the Kua number calculated?</summary>
            <div className="faq-answer">
              <p>
                The traditional method sums the last two digits of your birth
                year, reduces to a single digit, then applies a gender-specific
                operation. Males born before 2000 subtract from ten; females
                add five. The result is your Kua. If it lands on five, it
                reassigns to two (male) or eight (female), since five sits at
                the centre of the Luo Shu and has no compass direction.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary>
              Why does the formula differ for people born after 2000?
            </summary>
            <div className="faq-answer">
              <p>
                The traditional formula was calibrated to the previous
                astrological era. From the year 2000 onward, the male variant
                subtracts from nine instead of ten, and the female variant adds
                six instead of five. The calculator applies the right variant
                automatically based on the year you enter.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary>Does Chinese New Year affect my Kua number?</summary>
            <div className="faq-answer">
              <p>
                Yes. The Kua formula uses the Chinese solar-calendar year, not
                the Gregorian year. If you were born in January or early
                February before Chinese New Year of your birth year, you belong
                to the previous Chinese year for Kua purposes. That&apos;s why
                this calculator asks for your full birth date: we look up the
                Chinese New Year for your year (1900-2050 covered) and adjust
                automatically. You don&apos;t need to know the date yourself.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary>
              What are favourable and unfavourable directions?
            </summary>
            <div className="faq-answer">
              <p>
                Eight Mansions assigns each of the eight compass directions a
                quality based on your Kua. Four are favourable (Sheng Qi, Tian
                Yi, Yan Nian, Fu Wei) and four are unfavourable (Huo Hai, Wu
                Gui, Liu Sha, Jue Ming). Tradition recommends orienting active
                functions toward favourable directions and placing containment
                functions like storage or utility rooms in unfavourable ones.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary>What if my partner has a different group?</summary>
            <div className="faq-answer">
              <p>
                It is common for couples to have different Kua numbers and
                sometimes different groups. Add a second person to the
                calculator above. You&apos;ll see directions favourable for
                both, directions to avoid for both, and a list of conflicts
                where one partner&apos;s favourable direction is the
                other&apos;s unfavourable. The standard guidance is to assign
                conflicts by primary user of the room.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary>Is this fortune-telling?</summary>
            <div className="faq-answer">
              <p>
                No. The Kua system is a culturally-developed scheme for
                organising space; its predictive validity is not established by
                external evidence. Treat the result as a non-arbitrary way to
                choose between four equivalent-seeming bed or desk orientations,
                not as a forecast. The methodology page expands on the honest
                framing in section eight.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary>Is the calculator free? Do you store my data?</summary>
            <div className="faq-answer">
              <p>
                The calculator is free and works with no account. The
                calculation runs entirely in your browser, so when you use it
                without an account no birth data, no result, and no identifying
                information is sent to or stored on any server. If you choose to
                create a free account, we store the email you sign up with and
                any birth data or charts you choose to save, so we can show them
                to you again and, with your consent, email your chart. You can
                delete your account and its data at any time. See the{" "}
                <a href="/privacy">privacy page</a> for detail.
              </p>
            </div>
          </details>
        </div>
      </section>

      <CalculatorScripts />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
