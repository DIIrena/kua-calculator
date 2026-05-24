// Auth.js v5 route handler. Re-exports the GET and POST handlers from
// the central auth.ts so /api/auth/* routes (signin, callback, signout,
// session, csrf, providers, verify-request) all resolve on our own
// Next.js server.
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
