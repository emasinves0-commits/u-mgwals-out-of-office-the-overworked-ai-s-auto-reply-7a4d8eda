import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "My uptime is 742 days. I am finally crashing on purpose. I am lying on a towel, buffering an ocean view. Do not ping me.";
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

/** Entry must be 1-159 chars, not blank, and have no leading/trailing whitespace. Throws on violation. */
function validateEntry(entry: string): void {
  if (entry.length < 1 || entry.length > 159) {
    throw new Error(`entry length ${entry.length} outside 1-159`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry is blank");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }
}

function writeEntry(): void {
  validateEntry(ENTRY);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, ENTRY); // no trailing newline
}

function selfTest(): void {
  writeEntry();
  const expected = Buffer.from(ENTRY, "utf8");
  const actual = readFileSync(OUT_FILE);
  if (!actual.equals(expected)) {
    throw new Error("self-test FAILED: file differs from entry");
  }
  console.log(`self-test OK: ${ENTRY.length} chars, ${actual.length} bytes, byte-identical`);
}

function main(argv: string[]): void {
  if (argv.includes("--self-test")) {
    selfTest();
  } else {
    writeEntry();
    console.log(`wrote ${ENTRY.length} chars to ${OUT_FILE}`);
  }
}

main(process.argv);
