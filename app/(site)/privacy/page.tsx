import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | My Feng Shui Home",
  description:
    "What My Feng Shui Home stores, when it stores it, and how to delete your data.",
  robots: { index: true, follow: true },
};

// Minimal privacy page. Ships in Stage 1, before any emails are collected.
export default function PrivacyPage() {
  return (
    <div className="page-prose">
      <p className="eyebrow">My Feng Shui Home</p>
      <h1>Privacy</h1>
      <p>
        This page explains, in plain English, what we store and when. The short
        version: the calculator is free and runs in your browser, and an
        account is optional.
      </p>

      <h2>Using the calculator without an account</h2>
      <p>
        The Kua calculator is free and needs no account. The calculation runs
        entirely in your browser. When you use the calculator without an
        account, your birth data, your result, and any other information you
        type are <strong>not sent to or stored on any server</strong>. Nothing
        leaves your device.
      </p>
      <p>
        The embeddable widget at <code>/embed</code> works the same way: it has
        no account features and sends no data anywhere.
      </p>

      <h2>Using the calculator with an account</h2>
      <p>
        Creating an account is optional and free. If you choose to sign in, we
        use Supabase (our hosting and database provider) to store:
      </p>
      <ul>
        <li>
          <strong>Your email address</strong>, which you give when you sign in.
          It is how we identify your account and, with your consent, how we
          email your chart.
        </li>
        <li>
          <strong>Birth data and charts you choose to save.</strong> If you save
          your details or a chart to your account, that data is stored so we
          can show it to you again. Saving is always your choice; the
          calculator never saves anything on its own.
        </li>
        <li>
          <strong>Your marketing preference.</strong> The opt-in for emailed
          guidance is unchecked by default. We only email marketing content if
          you turn it on, and you can turn it off at any time on your account
          page.
        </li>
      </ul>

      <h2>Email</h2>
      <p>
        We use your email to send sign-in links and, if you opt in, your chart
        and occasional feng shui guidance. We do not sell or share your email.
      </p>

      <h2>Deleting your account</h2>
      <p>
        You can delete your account at any time from your{" "}
        <a href="/account">account page</a>. Deleting your account permanently
        removes your stored email, your saved birth data, and your saved
        charts.
      </p>

      <h2>Questions</h2>
      <p>
        This is a Stage 1 privacy summary and will be expanded as the product
        grows. If you have a question about your data, contact My Feng Shui
        Home.
      </p>
    </div>
  );
}
