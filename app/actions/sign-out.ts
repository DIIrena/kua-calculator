"use server";

import { signOut } from "@/auth";

// Server action: clears the NextAuth session and sends the visitor home.
// Used by the sign-out button in the header.
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
