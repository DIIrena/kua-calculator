// Minimal analytics helper for Plausible. Safe to call from anywhere in
// client code: if Plausible has not loaded (env var missing, route
// excluded, ad-blocker active, server-rendering), every call is a no-op.

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

export function trackEvent(
  eventName: string,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  const fn = window.plausible;
  if (typeof fn !== "function") return;
  try {
    fn(eventName, props ? { props } : undefined);
  } catch {
    // Swallow. Analytics must never break the page.
  }
}
