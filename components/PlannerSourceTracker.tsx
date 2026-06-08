"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Fires a single planner_source_visit event on mount when the planner
// page is reached from a known referrer (passed via ?from=...). This is
// how we measure the free Kua calculator -> planner flow WITHOUT loading
// any analytics on the calculator page itself, which stays tracker-free.
// The calculator page only carries a plain link with the ?from param;
// the event is recorded here, on the planner page, which sits inside the
// (site) layout where Vercel Web Analytics is mounted. trackEvent itself
// currently no-ops; it starts firing when a paid analytics tier is on.
export default function PlannerSourceTracker({ source }: { source: string }) {
  useEffect(() => {
    trackEvent("planner_source_visit", { source });
  }, [source]);

  return null;
}
