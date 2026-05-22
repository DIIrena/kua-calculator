import type { Metadata } from "next";
import CalculatorIsland from "@/components/CalculatorIsland";
import CalculatorScripts from "@/components/CalculatorScripts";

export const metadata: Metadata = {
  title: "Kua Number Calculator | My Feng Shui Home",
  description:
    "Free Kua number calculator. Enter birth year and gender to receive your East or West group and your eight personal directions.",
  robots: { index: false, follow: true },
};

// Iframe-embeddable calculator. Stays free of accounts and Supabase. The
// privacy line is true here because the embed never captures email.
export default function EmbedPage() {
  return (
    <div className="embed-shell">
      <div className="embed-inner">
        <CalculatorIsland />
      </div>
      <p className="embed-tagline">
        <a href="/methodology" target="_blank" rel="noopener">
          Read the methodology
        </a>
        <span aria-hidden="true">·</span>
        Calculation runs in this iframe. No data leaves the visitor&apos;s
        browser.
      </p>
      <CalculatorScripts />
    </div>
  );
}
