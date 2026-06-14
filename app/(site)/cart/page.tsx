import type { Metadata } from "next";
import CartContents from "@/components/CartContents";

export const metadata: Metadata = {
  title: "Your cart | My Feng Shui Home",
  robots: { index: false, follow: true },
};

export default async function CartPage(props: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { checkout } = await props.searchParams;
  return (
    <div className="page-content">
      <CartContents status={checkout ?? null} />
    </div>
  );
}
