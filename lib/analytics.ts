// Intentional no-op analytics helper.
//
// Pageview tracking is handled by Vercel Web Analytics via
// components/VercelAnalytics.tsx. Custom funnel events
// (waitlist_signup_attempt / _success / _error, planner_source_visit)
// are deferred until we either upgrade to Vercel Pro or wire Plausible.
// Until then, every existing call site keeps compiling and the call
// quietly does nothing. The waitlist form still posts to Supabase
// regardless; this helper does not gate any user-visible behaviour.
//
// To turn events back on later, replace the body of trackEvent with a
// single call to track() from @vercel/analytics (Vercel Pro) or to
// window.plausible (Plausible). No call site needs to change.

export function trackEvent(
  _eventName: string,
  _props?: Record<string, string | number | boolean>,
): void {
  return;
}
