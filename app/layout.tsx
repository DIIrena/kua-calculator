import type { Metadata } from "next";
import { Hanken_Grotesk, Bilbo_Swash_Caps } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-hanken",
});

const bilboSwashCaps = Bilbo_Swash_Caps({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bilbo",
});

export const metadata: Metadata = {
  title:
    "Kua Number Calculator - Find Your East or West Group | My Feng Shui Home",
  description:
    "Free Kua number calculator. Enter your birth year and gender to get your East or West group, four favourable directions, and four to avoid.",
};

// Root layout: <html>, <body>, fonts, globals.css only. The site chrome
// (SiteHeader / SiteFooter) is added by the (site) route group layout, so
// the /embed route can render chrome-free for iframing.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${bilboSwashCaps.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
