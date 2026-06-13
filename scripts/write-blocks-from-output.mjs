// Extract block markdown from a workflow output JSON file and write each
// to content/blocks/<filename>. Keeps the large content out of the main
// context. Usage: node scripts/write-blocks-from-output.mjs <output.json>

import { readFileSync, writeFileSync } from "node:fs";

const outPath = process.argv[2];
if (!outPath) throw new Error("pass the workflow output file path");

const BLOCKS_DIR =
  "c:/Users/User/Documents/IRENA/AI AUTOMATION/my-claude-workspace/projects/kua-calculator/content/blocks";

const data = JSON.parse(readFileSync(outPath, "utf-8"));
const result = Array.isArray(data) ? data : data.result;
if (!Array.isArray(result)) throw new Error("no result array in output");

let written = 0;
for (const item of result) {
  if (!item || !item.filename || typeof item.markdown !== "string") {
    console.log(`  SKIP malformed: ${JSON.stringify(item).slice(0, 80)}`);
    continue;
  }
  const md = item.markdown.endsWith("\n") ? item.markdown : item.markdown + "\n";
  writeFileSync(`${BLOCKS_DIR}/${item.filename}`, md);
  written++;
  const flag = item.pass === false ? " (verifier made fixes)" : "";
  console.log(`  wrote ${item.filename.padEnd(26)} ${md.length} chars${flag}`);
}
console.log(`\n${written} blocks written.`);
