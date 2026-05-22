import { redirect } from "next/navigation";

// Temporary: / redirects to the calculator. In Stage 4 this becomes the
// My Feng Shui Home knowledge-hub home page.
export default function Home() {
  redirect("/kua-calculator");
}
