// One-off script: render an SVG pin to a 1000x1500 PNG using Resvg.
// Loads EB Garamond from system fonts (must be installed on the host).
//
// Usage:
//   node scripts/render-pin-png.mjs <input.svg> <output.png>

import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/render-pin-png.mjs <input.svg> <output.png>");
  process.exit(1);
}

const svg = readFileSync(inputPath);
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1000 },
  font: {
    loadSystemFonts: true,
    defaultFontFamily: "EB Garamond",
    fontFiles: [],
  },
  background: "#fcfcf8",
});
const pngData = resvg.render().asPng();
writeFileSync(outputPath, pngData);
const { width, height } = resvg.render();
console.log(`Rendered ${inputPath} -> ${outputPath} (${pngData.length} bytes)`);
