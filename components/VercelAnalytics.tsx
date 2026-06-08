"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";

// Vercel Web Analytics loader. Mounted once in the (site) layout. Two
// hard constraints, both inherited from the previous Plausible wrapper:
//
//   1. The calculator core at /kua-calculator and the iframe-embeddable
//      /embed widget must stay free of any third-party JS. The
//      calculator can be embedded by other sites; the embed widget is
//      shipped to external pages. Both surfaces never send any visitor
//      data anywhere.
//   2. The private surfaces (/account, /sign-in, /privacy) should not
//      surface visitor behaviour to Vercel either.
//
// Mounting the wrapper here keeps the layout small while preserving the
// prefix allowlist that the original PlausibleScript used.

const EXCLUDED_PREFIXES = [
  "/kua-calculator",
  "/embed",
  "/account",
  "/sign-in",
  "/privacy",
];

export default function VercelAnalytics() {
  const pathname = usePathname() ?? "/";
  if (
    EXCLUDED_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    )
  ) {
    return null;
  }
  return <Analytics />;
}
