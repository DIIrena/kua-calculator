"use server";

import { signOut } from "@/auth";

// Server action: clears the NextAuth session and sends the visitor to the
// sign-in page. Used by the sign-out button in the header.
export async function signOutAction() {
  await signOut({ redirectTo: "/sign-in" });
}
