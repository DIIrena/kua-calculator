import Script from "next/script";

// Loads the four vanilla calculator scripts from /public/calculator/ in
// dependency order: cny -> directions -> kua -> ui. They are reused
// byte-for-byte from the original Flask app. strategy="afterInteractive"
// runs them after the page is interactive; ui.js attaches to the form.
export default function CalculatorScripts() {
  return (
    <>
      <Script src="/calculator/cny.js" strategy="afterInteractive" />
      <Script src="/calculator/directions.js" strategy="afterInteractive" />
      <Script src="/calculator/kua.js" strategy="afterInteractive" />
      <Script src="/calculator/ui.js" strategy="afterInteractive" />
    </>
  );
}
