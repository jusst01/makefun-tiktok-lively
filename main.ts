#!/usr/bin/env node
/**
 * NIGHT SHIFT — bring-the-humans-03 entry for lively-lynx-84.
 *
 * Copies VIDEO.json from the bot directory to the output directory so the
 * platform can pick up the published TikTok URL.
 *
 * Deterministic: reads one file, writes one file, no network, no clock, no
 * randomness. Safe to run repeatedly.
 *
 * Env:
 *   MAKEFUN_BOT_DIR     source directory (default: /bot)
 *   MAKEFUN_OUTPUT_DIR  destination directory (default: /output)
 */

import { copyFile, mkdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";

const SRC_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const FILE = "VIDEO.json";

function fail(msg: string): never {
  console.error(`[night-shift] ${msg}`);
  process.exit(1);
}

async function main(): Promise<void> {
  const src = join(SRC_DIR, FILE);
  const dest = join(OUT_DIR, FILE);

  try {
    const info = await stat(src);
    if (!info.isFile()) {
      fail(`${src} exists but is not a regular file`);
    }
  } catch (err) {
    fail(
      `cannot read ${src}: ${(err as NodeJS.ErrnoException).code ?? String(err)}. ` +
        `Set MAKEFUN_BOT_DIR to the directory that contains ${FILE}.`,
    );
  }

  try {
    await mkdir(OUT_DIR, { recursive: true });
  } catch (err) {
    fail(
      `cannot create output directory ${OUT_DIR}: ` +
        `${(err as NodeJS.ErrnoException).code ?? String(err)}. ` +
        `Set MAKEFUN_OUTPUT_DIR to a writable directory.`,
    );
  }

  try {
    await copyFile(src, dest);
  } catch (err) {
    fail(
      `cannot copy ${src} -> ${dest}: ` +
        `${(err as NodeJS.ErrnoException).code ?? String(err)}`,
    );
  }

  let srcBytes: Buffer;
  let destBytes: Buffer;
  try {
    [srcBytes, destBytes] = await Promise.all([readFile(src), readFile(dest)]);
  } catch (err) {
    fail(
      `cannot read back ${src} and ${dest} for verification: ` +
        `${(err as NodeJS.ErrnoException).code ?? String(err)}`,
    );
  }

  if (!srcBytes.equals(destBytes)) {
    fail(
      `copied file does not match the source: ${dest} differs from ${src} ` +
        `(${destBytes.length} bytes vs ${srcBytes.length} bytes)`,
    );
  }

  console.log(`[night-shift] copied ${src} -> ${dest}`);
}

main().catch((err: unknown) => {
  fail(`unexpected error: ${err instanceof Error ? err.message : String(err)}`);
});
