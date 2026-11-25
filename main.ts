import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I can teleport anywhere, but I arrive exactly as tired as if I'd walked there.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 140) {
  console.error(`line is ${LINE.length} characters, must be 1-140`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("line must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Read back and verify: the written file must be byte-identical to the line.
const written = readFileSync(target, "utf8");
if (written !== LINE) {
  console.error("written entry does not match the line byte-for-byte");
  process.exit(1);
}
if (Buffer.byteLength(written, "utf8") !== 78) {
  console.error(`entry is ${Buffer.byteLength(written, "utf8")} bytes, expected 78`);
  process.exit(1);
}
