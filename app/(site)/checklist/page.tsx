import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The 14-point room harmony checklist | My Feng Shui Home",
  description:
    "A one-page yes/no checklist for walking through your home. Plus the page that tells you what your answers mean.",
  robots: { index: false, follow: true },
};

const QUESTIONS: ReadonlyArray<{ q: string; meaning: string }> = [
  {
    q: "Is the path from your front door to the kitchen open and unobstructed?",
    meaning:
      "A clear path from the door to the kitchen lets qi (and people) move through the home. A blocked path means visitors and energy stall in the entrance.",
  },
  {
    q: "Is every bulb in your entrance and main hallway working?",
    meaning:
      "Light in the entrance is the simplest measurable improvement you can make. Working bulbs everywhere means your home reads as welcoming the moment you walk in.",
  },
  {
    q: "Is the area inside your front door clear of shoes, bags, and clutter?",
    meaning:
      "The first six feet of the home sets the tone of the whole space. Clear means calm. Cluttered means the rest of the home will feel cluttered too.",
  },
  {
    q: "From your bed, can you see the bedroom door without turning your head?",
    meaning:
      "This is the command position. It lowers nervous-system load at night because you do not have to keep checking behind you. People sleep better within a week of rotating the bed.",
  },
  {
    q: "Is your bed positioned so that no large mirror reflects you while you sleep?",
    meaning:
      "Tradition says a mirror across from the bed disturbs rest. Modern reading agrees that movement in your peripheral vision while half-asleep keeps the nervous system alert.",
  },
  {
    q: "Does your bed have a solid headboard or a wall behind it?",
    meaning:
      "Bed pushed against a wall, with a real headboard, gives a sense of support. No headboard, or bed floating in the middle of the room, can feel unmoored. Add a headboard.",
  },
  {
    q: "Is your stove clean? Every burner?",
    meaning:
      "In the Compass School the stove is the wealth gateway; in plain design terms, a clean stove makes you cook more. People who cook more eat better and spend less. Both readings agree.",
  },
  {
    q: "Are all the windows you actually use clean, inside and out?",
    meaning:
      "Clean windows let more daylight in. Daylight regulates sleep, mood, and concentration. The cheapest, most overlooked move in the whole checklist.",
  },
  {
    q: "Is your kitchen sink clear, with no dishes left overnight?",
    meaning:
      "Standing water in a dirty sink is wealth-corner trouble in the tradition and quiet domestic stress in the modern reading. Sink clear at bedtime. Every night.",
  },
  {
    q: "Can you sit at your main workspace without your back to the door?",
    meaning:
      "Same command-position rule as the bedroom. Back to the door drains low-grade alertness all day. If you cannot move the desk, hang one small mirror so the door is in your peripheral view.",
  },
  {
    q: "Are there any working clocks, kettles, or fridges in your home that make annoying sounds?",
    meaning:
      "Sound is part of the energetic environment. A ticking, humming, or buzzing object you have stopped consciously hearing is still costing you attention. Fix or replace it.",
  },
  {
    q: "Are there any broken items in your home you have been meaning to fix?",
    meaning:
      "In the tradition, broken means stuck. In the modern reading, broken means cognitive load (you remember it every time you see it). Fix it, throw it out, or genuinely decide to leave it.",
  },
  {
    q: "Is your wallet tidy, with no expired cards or crumpled receipts?",
    meaning:
      "Chapter 18 of the source material puts the wallet in the wealth chain. Modern reading: wallet hygiene is one of the smallest measurable changes that shifts how you think about money.",
  },
  {
    q: "Does the centre of your home have something heavy, dirty, or chaotic in it?",
    meaning:
      "The geometric centre of the floor plan is the tai chi. Open and uncluttered is best. Heavy storage, a litter box, or chaos in the centre traditionally drags on the whole home.",
  },
];

export default function ChecklistPage() {
  return (
    <div className="checklist-page page-narrow">
      <header className="checklist-header no-print">
        <p className="eyebrow">A printable one-pager from My Feng Shui Home.</p>
        <h1>The 14-point room harmony checklist.</h1>
        <p>
          Print this. Walk your home with it in your hand. Ten minutes. The
          meanings of your answers are on the second page below.
        </p>
        <p className="checklist-actions">
          <button
            type="button"
            className="cta-primary"
            // Inline print trigger so we do not need an extra client component.
            // The button works without JS too via the inline onclick fallback,
            // but Next renders this as a normal button. JS-disabled visitors
            // can still use Cmd/Ctrl+P.
            // eslint-disable-next-line react/no-unknown-property
            data-print-button="true"
          >
            Print or save as PDF
          </button>
          <Link href="/" className="checklist-back-link">
            Back to the homepage
          </Link>
        </p>
      </header>

      <article className="checklist-paper">
        <h2 className="checklist-paper-heading">Page 1. The 14 questions.</h2>
        <ol className="checklist-questions">
          {QUESTIONS.map((item, i) => (
            <li key={i} className="checklist-question">
              <span className="checklist-question-text">{item.q}</span>
              <span className="checklist-answer-cells" aria-hidden="true">
                <span className="checklist-answer-cell">Yes</span>
                <span className="checklist-answer-cell">No</span>
              </span>
            </li>
          ))}
        </ol>

        <h2 className="checklist-paper-heading checklist-page-break">
          Page 2. What your answers mean.
        </h2>
        <p className="checklist-meaning-intro">
          Every <strong>no</strong> below is a small move. None of them costs
          money. Most of them take under five minutes once you decide to do
          them.
        </p>
        <ol className="checklist-meanings">
          {QUESTIONS.map((item, i) => (
            <li key={i}>
              <p className="checklist-meaning-q">
                <strong>Q{i + 1}.</strong> {item.q}
              </p>
              <p className="checklist-meaning-a">{item.meaning}</p>
            </li>
          ))}
        </ol>

        <p className="checklist-paper-footer">
          From <strong>myfengshuihome.com</strong>. A calm, honest feng shui
          guide. Free.
        </p>
      </article>

      {/* Tiny inline script so the print button works without making this
          a client component. */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            'document.addEventListener("click",function(e){var t=e.target;if(t&&t.getAttribute&&t.getAttribute("data-print-button")==="true"){window.print();}});',
        }}
      />
    </div>
  );
}
