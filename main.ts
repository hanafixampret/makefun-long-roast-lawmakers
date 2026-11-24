import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The senator who wrote the law requiring every government document to be a PDF just submitted his own AI-safety bill as a crooked phone photo of his laptop screen.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR
  ? join(process.env.MAKEFUN_OUTPUT_DIR, "output")
  : "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("round-trip mismatch");
if (ENTRY.length < 1 || ENTRY.length > 320)
  throw new Error(`entry length ${ENTRY.length} outside 1-320`);
if (ENTRY.trim() !== ENTRY || ENTRY.trim().length === 0)
  throw new Error("entry must not be blank or padded");
if (ENTRY.includes("  ")) throw new Error("entry has double spaces");
const sentences = ENTRY.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 1) throw new Error("entry must be one sentence");
console.error(`entry ok: ${ENTRY.length} chars, 1 sentence`);
