import type { Metadata } from "next";
import Link from "next/link";

// /editorial-method. Explains the four claim labels, how a guide page is
// built and fact-checked, the fields the labels draw on (described as
// areas of knowledge, not a list of specific titles or authors, so the
// private source library stays private), and the corrections policy.
// Footer-linked, and linked from every guide page. Server component.

export const metadata: Metadata = {
  title: "Editorial Method | My Feng Shui Home",
  description:
    "How we label key practical recommendations (design-supported, traditional, applied observation, or preference), how a guide page is built and fact-checked, and our corrections policy.",
  alternates: { canonical: "https://myfengshuihome.com/editorial-method" },
  robots: { index: true, follow: true },
};

export default function EditorialMethodPage() {
  return (
    <div className="page-content editorial-method">
      <p className="eyebrow">
        <Link href="/guide" className="article-back-link">
          &larr; Back to the guide
        </Link>
      </p>
      <h1 className="guide-page-heading">How we label and source claims</h1>

      <div className="markdown-content">
        <p>
          Feng shui mixes three different kinds of claim: things modern
          design research supports, things the classical tradition
          teaches, and things that come down to taste. This site keeps
          them separate. Key practical recommendations are labelled where
          their basis matters, using four labels. This page explains what
          each label means, how a page is put together, and where the
          thinking comes from.
        </p>

        <h2>The four labels</h2>
        <ul className="editorial-label-list">
          <li>
            <span className="guide-badge guide-badge-design-supported">
              Design-supported
            </span>{" "}
            The claim lines up with established work in environmental
            design, environmental psychology, or building science. We use
            it for moves like clearing clutter, improving daylight, layered
            lighting, clear circulation, entry-zone order, and ventilation
            or damp control. The label means the move has a plain,
            non-mystical rationale. It does not mean a single study proves
            it for your home.
          </li>
          <li>
            <span className="guide-badge guide-badge-traditional">
              Traditional feng shui
            </span>{" "}
            The claim is a classical teaching, offered as tradition: the
            wealth corner, the command position, the element pairings, the
            annual stars. We label these clearly so you always know when you
            are reading tradition rather than a design finding. Where a
            traditional rule also has a non-mystical design rationale, we
            name it beside the rule (command position, for instance, lines
            up with prospect-refuge in environmental design). Take them or
            leave them.
          </li>
          <li>
            <span className="guide-badge guide-badge-observation">
              Applied observation
            </span>{" "}
            The claim is a pattern noticed in practice - an architect&apos;s
            project observations, or a consistent practitioner observation
            - rather than a formal study. We use this label sparingly, and
            only for observations we can stand behind.
          </li>
          <li>
            <span className="guide-badge guide-badge-preference">
              Personal preference
            </span>{" "}
            The claim is a matter of taste. We say so, so you are never
            asked to treat a preference as a rule.
          </li>
        </ul>
        <p>When the answer is uncertain, we say it is uncertain.</p>

        <h2>How a page is built</h2>
        <p>
          Each guide page starts from the classical material, is checked
          against what modern design research actually supports, and is
          then written in plain language. Where a claim leans on design
          research it gets the Design-supported label; where it rests on
          the tradition it gets the Traditional label. We rewrite anything
          that reads as a promise about money, love, health, or success,
          because the practice supports the conditions a home is read in.
          It does not deliver outcomes.
        </p>

        <h2>References and further reading</h2>
        <p>
          A curated public bibliography for the substantive claims on this
          site. The design-supported entries are primary research or
          official standards; the traditional entries are recognized
          classical texts or academic scholarship. This is a starting list,
          not a complete one.
        </p>

        <h3>Architecture and environmental design</h3>
        <p>
          The ground the Design-supported label stands on for layout,
          clutter, light, and the command-position rationale.
        </p>
        <ul>
          <li>
            Appleton, Jay.{" "}
            <em>The Experience of Landscape</em>. John Wiley &amp; Sons,
            1975. The foundational text on prospect-refuge theory, the
            design rationale behind command position.
          </li>
          <li>
            McMains, Stephanie, and Sabine Kastner. &ldquo;Interactions of
            Top-Down and Bottom-Up Mechanisms in Human Visual Cortex.&rdquo;{" "}
            <em>Journal of Neuroscience</em> 31(2), 2011, 587-597.{" "}
            <a
              href="https://www.jneurosci.org/content/31/2/587"
              rel="noopener noreferrer"
            >
              jneurosci.org
            </a>
            . Visual clutter competes for limited processing capacity.
          </li>
          <li>
            Kaplan, Rachel, and Stephen Kaplan.{" "}
            <em>The Experience of Nature: A Psychological Perspective</em>.
            Cambridge University Press, 1989. Attention restoration: nature
            and greenery support focus and mood.
          </li>
          <li>
            Wilson, Edward O. <em>Biophilia</em>. Harvard University Press,
            1984.{" "}
            <a
              href="https://www.hup.harvard.edu/books/9780674074422"
              rel="noopener noreferrer"
            >
              hup.harvard.edu
            </a>
            . The human affinity for living things.
          </li>
        </ul>

        <h3>Indoor environment and health</h3>
        <p>
          Air, ventilation, and light in homes. This is also why we leave
          out claims the evidence does not support, such as the idea that
          houseplants meaningfully clean indoor air at household scale.
        </p>
        <ul>
          <li>
            U.S. Environmental Protection Agency. &ldquo;Introduction to
            Indoor Air Quality.&rdquo;{" "}
            <a
              href="https://www.epa.gov/indoor-air-quality-iaq/introduction-indoor-air-quality"
              rel="noopener noreferrer"
            >
              epa.gov
            </a>
            .
          </li>
          <li>
            ANSI/ASHRAE Standard 62.1, &ldquo;Ventilation and Acceptable
            Indoor Air Quality&rdquo; (current edition).{" "}
            <a
              href="https://www.ashrae.org/technical-resources/bookstore/standards-62-1-62-2"
              rel="noopener noreferrer"
            >
              ashrae.org
            </a>
            .
          </li>
          <li>
            Brainard, George C., et al. &ldquo;Action Spectrum for Melatonin
            Regulation in Humans.&rdquo; <em>Journal of Neuroscience</em>{" "}
            21(16), 2001, 6405-6412.{" "}
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/11487664/"
              rel="noopener noreferrer"
            >
              pubmed.ncbi.nlm.nih.gov
            </a>
            . Evening light timing suppresses melatonin.
          </li>
          <li>
            Brown, Timothy M., et al. &ldquo;Recommendations for daytime,
            evening, and nighttime indoor light exposure.&rdquo;{" "}
            <em>PLOS Biology</em> 20(3), 2022, e3001571.{" "}
            <a
              href="https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3001571"
              rel="noopener noreferrer"
            >
              journals.plos.org
            </a>
            . Expert consensus: bright days, dim evenings.
          </li>
          <li>
            International WELL Building Institute. WELL Building Standard v2,
            Light concept (Feature L03, Circadian Lighting Design), 2020.{" "}
            <a
              href="https://standard.wellcertified.com/v2/light/circadian-lighting-design"
              rel="noopener noreferrer"
            >
              standard.wellcertified.com
            </a>
            .
          </li>
          <li>
            Cummings, Bryan E., and Michael S. Waring. &ldquo;Potted plants
            do not improve indoor air quality.&rdquo;{" "}
            <em>
              Journal of Exposure Science &amp; Environmental Epidemiology
            </em>{" "}
            30, 2020, 253-261.{" "}
            <a
              href="https://www.nature.com/articles/s41370-019-0175-9"
              rel="noopener noreferrer"
            >
              nature.com
            </a>
            . Why we do not claim houseplants clean the air.
          </li>
          <li>
            Wolverton, B.C., W.L. Douglas, and K. Bounds. &ldquo;A Study of
            Interior Landscape Plants for Indoor Air Pollution
            Abatement.&rdquo; NASA Technical Memorandum, Stennis Space
            Center, 1989.{" "}
            <a
              href="https://ntrs.nasa.gov/citations/19930072988"
              rel="noopener noreferrer"
            >
              ntrs.nasa.gov
            </a>
            . The sealed-chamber study behind the original claim.
          </li>
        </ul>

        <h3>Classical feng shui</h3>
        <p>
          The Form School and Compass School traditions, the bagua, the
          five elements, and the cures. The source of the Traditional
          label.
        </p>
        <ul>
          <li>
            Bruun, Ole. <em>An Introduction to Feng Shui</em>. Cambridge
            University Press, 2008.{" "}
            <a
              href="https://www.cambridge.org/core/books/an-introduction-to-feng-shui/D865F3F94A854703B36D7780431C9D63"
              rel="noopener noreferrer"
            >
              cambridge.org
            </a>
            . An academic overview of the tradition.
          </li>
          <li>
            <em>Zangshu</em> (Book of Burial), attributed to Guo Pu
            (276-324 CE); English translation by Juwen Zhang,{" "}
            <em>
              A Translation of the Ancient Chinese The Book of Burial (Zang
              Shu) by Guo Pu
            </em>{" "}
            (Edwin Mellen Press, 2004). The classical Form School source.{" "}
            <a
              href="https://catalog.princeton.edu/catalog/9942093933506421"
              rel="noopener noreferrer"
            >
              Princeton University Library
            </a>
            .
          </li>
        </ul>

        <h3>Compass School and Eight Mansions</h3>
        <p>
          The Kua number, the East and West groups, and the eight personal
          directions the <Link href="/kua-calculator">calculator</Link>{" "}
          uses. The full method is on the{" "}
          <Link href="/methodology">methodology page</Link>.
        </p>
        <ul>
          <li>
            <em>Ba Zhai Ming Jing</em> (Eight Mansions Bright Mirror),
            classical Chinese text (Qing-era compilation, c. 1790);
            annotated English translation by Terence Chan, 2011.{" "}
            <a
              href="https://search.worldcat.org/oclc/1063650158"
              rel="noopener noreferrer"
            >
              worldcat.org
            </a>
            . The classical source for the Eight Mansions directions.
          </li>
        </ul>

        <h3>Flying Stars and timing</h3>
        <p>
          The Xuan Kong system of Periods and annual stars, and
          date-selection traditions. We keep the twenty-year Period
          separate from the annual star: we are in Period 9, which runs
          from 2024 to 2043, while the annual centre star moves each year (3
          in 2024, 2 in 2025, 1 in 2026). This is tradition, not a
          measurement of anything physical.
        </p>
        <ul>
          <li>
            Skinner, Stephen. <em>Flying Star Feng Shui</em>. Tuttle
            Publishing, 2002. A recognized English-language exposition of
            the Xuan Kong Flying Star tradition.
          </li>
        </ul>

        <h2>Corrections</h2>
        <p>
          When we find a factual error, we fix it. For anything material we
          note the change here with the date, so the record is visible.
        </p>
        <p>
          <strong>June 15, 2026.</strong> Corrected the Flying Stars
          article to distinguish Period 9 (2024-2043) from the annual
          centre stars: 3 in 2024, 2 in 2025, and 1 in 2026.
        </p>

        <h2>Who writes this</h2>
        <p>
          My Feng Shui Home is written and maintained by I.D., the
          architect behind the site, who reads feng shui as spatial
          guidance: architecture first, feng shui with structure.
        </p>
      </div>
    </div>
  );
}
