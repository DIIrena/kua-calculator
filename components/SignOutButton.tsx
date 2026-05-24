import { signOutAction } from "@/app/actions/sign-out";

// Server Component button. POSTs to the sign-out server action, which
// calls NextAuth signOut and redirects to the home page.
export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button type="submit" className="account-link">
        Sign out
      </button>
    </form>
  );
}
