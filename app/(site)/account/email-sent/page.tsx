import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BrandMark from "@/components/BrandMark";

export const metadata: Metadata = {
  title: "Email sent | My Feng Shui Home",
  description:
    "Your saved Kua chart was emailed to your account address.",
  robots: { index: false, follow: false },
};

type Status = "sent" | "rate-limit" | "send-failed" | "threw";

export default async function EmailSentPage(props: {
  searchParams: Promise<{ status?: string; chart?: string }>;
}) {
  const { status: statusRaw, chart } = await props.searchParams;
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const email = session.user.email ?? "your account address";

  const status: Status = (() => {
    if (statusRaw === "sent" || statusRaw === "rate-limit" || statusRaw === "send-failed" || statusRaw === "threw") {
      return statusRaw;
    }
    return "sent";
  })();

  const isSuccess = status === "sent";
  const isRateLimit = status === "rate-limit";

  const heading = isSuccess
    ? "Email sent"
    : isRateLimit
      ? "Daily limit reached"
      : "Email could not be sent";

  const body = isSuccess
    ? `Your chart was emailed to ${email}. It should arrive within a minute. If you do not see it, check your spam folder, just in case.`
    : isRateLimit
      ? "You have reached today's chart-email limit of five per day. Your chart was still saved to your account. Please try emailing it again tomorrow."
      : "Something went wrong while sending the email. Your chart was still saved to your account. You can try emailing it again from the chart page.";

  return (
    <div className="page-narrow email-sent-page">
      <BrandMark />

      <h1
        className={
          isSuccess ? "email-sent-heading" : "email-sent-heading email-sent-heading-err"
        }
      >
        {heading}
      </h1>

      <p className="email-sent-body">{body}</p>

      <div className="email-sent-actions">
        {chart ? (
          <Link href={`/account/chart/${chart}`} className="cta-primary">
            View this chart
          </Link>
        ) : null}
        <Link href="/account" className="cta-secondary">
          Back to your account
        </Link>
      </div>
    </div>
  );
}
