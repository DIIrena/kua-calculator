// HTML to PDF renderer. Headless Chromium via puppeteer-core, with the
// chromium binary supplied by @sparticuz/chromium-min on Vercel (a small
// stub that fetches the real binary from a remote pack the first time
// it is invoked in a function lifecycle).
//
// Two execution paths:
//   - Production (NODE_ENV === "production"): @sparticuz/chromium-min
//     downloads the binary from CHROMIUM_PACK_URL on cold start (~3-5s
//     extra the first time, free on warm starts).
//   - Local dev: uses the locally-installed Chrome at the path in the
//     CHROME_EXECUTABLE_PATH env var, falling back to a sensible default
//     for Windows. macOS / Linux developers should set the env var.
//
// The remote pack URL pin to the same major version as the installed
// @sparticuz/chromium-min. Bump both together (npm update + this URL)
// when upgrading.

import puppeteer, { type Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

// Pinned to the version installed in package.json. Update this URL
// whenever @sparticuz/chromium-min is bumped.
const CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v148.0.0/chromium-v148.0.0-pack.x64.tar";

const DEFAULT_LOCAL_CHROME: Record<NodeJS.Platform, string> = {
  win32: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  linux: "/usr/bin/google-chrome",
  aix: "",
  android: "",
  freebsd: "",
  haiku: "",
  openbsd: "",
  sunos: "",
  cygwin: "",
  netbsd: "",
};

async function launchBrowser(): Promise<Browser> {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    const executablePath = await chromium.executablePath(CHROMIUM_PACK_URL);
    return puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: true,
    });
  }

  // Local dev. Use system Chrome.
  const explicit = process.env.CHROME_EXECUTABLE_PATH;
  const executablePath = explicit ?? DEFAULT_LOCAL_CHROME[process.platform];
  if (!executablePath) {
    throw new Error(
      `No Chrome executable for platform ${process.platform}. ` +
        `Set CHROME_EXECUTABLE_PATH in .env.local.`,
    );
  }

  return puppeteer.launch({
    executablePath,
    headless: true,
  });
}

export type RenderOptions = {
  /** A4 margin in millimetres. Default 20mm all round. */
  margin?: { top: number; right: number; bottom: number; left: number };
  /** Print background colours and images. Defaults to true (we use a
   *  cream paper colour as a CSS background). */
  printBackground?: boolean;
};

/**
 * Render an HTML document to a PDF Buffer. The HTML must be self-contained
 * (inline CSS, inline SVG, @font-face for any custom fonts loaded from a
 * file:// or data: URL). Network resources are not blocked but will slow
 * the cold start.
 */
export async function renderToPdf(
  html: string,
  options: RenderOptions = {},
): Promise<Buffer> {
  const margin = options.margin ?? { top: 20, right: 20, bottom: 20, left: 20 };

  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();

    // setContent + waitUntil load gets us past the DOM parse and the
    // initial resource fetch. document.fonts.ready waits for any
    // @font-face rules to actually apply (Chromium can fire "load"
    // before the fonts have been computed onto the box layout).
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluateHandle("document.fonts.ready");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: options.printBackground ?? true,
      margin: {
        top: `${margin.top}mm`,
        right: `${margin.right}mm`,
        bottom: `${margin.bottom}mm`,
        left: `${margin.left}mm`,
      },
      preferCSSPageSize: false,
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
