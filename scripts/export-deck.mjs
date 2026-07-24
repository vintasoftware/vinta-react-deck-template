// Export a deck to PDF and/or PPTX.
//
// Renders every slide with the deck's own `?shot=N` mode (native 1920×1080,
// pixel-perfect, no chrome) through a bundled headless Chromium (Playwright),
// then assembles the frames into a PDF (one slide per page) and/or a 16:9 PPTX
// (one full-bleed image per slide). Because it drives the real deck, the export
// always matches the slideshow — fonts, photos, code highlighting and all.
//
// Requires Playwright's Chromium (installed once via `npx playwright install
// chromium`, or automatically by `npm install` through the postinstall hook).
//
// Usage:
//   node scripts/export-deck.mjs [options]
//     --deck   main|template|examples   which deck to export (default: main)
//     --format pdf|pptx|both            output(s) to produce   (default: both)
//     --out    <dir>                    output directory       (default: export)
//     --scale  <n>                      device pixel ratio     (default: 2)
//     --build                           run `npm run build` first

import { createServer } from "node:http";
import { readFile, mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, extname } from "node:path";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import PptxGenJS from "pptxgenjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");

// ---- args ------------------------------------------------------------------
const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};
const has = (name) => args.includes(`--${name}`);

const deck = opt("deck", "main");
const format = opt("format", "both");
const outDir = resolve(root, opt("out", "export"));
const scale = Number(opt("scale", "2"));

const DECK_PATH = { main: "/", template: "/template", examples: "/examples" };
if (!(deck in DECK_PATH)) {
  console.error(`Unknown --deck "${deck}". Use one of: ${Object.keys(DECK_PATH).join(", ")}`);
  process.exit(1);
}
if (!["pdf", "pptx", "both"].includes(format)) {
  console.error(`Unknown --format "${format}". Use pdf, pptx or both.`);
  process.exit(1);
}

// ---- build if needed -------------------------------------------------------
async function ensureBuild() {
  const fresh = existsSync(join(distDir, "index.html"));
  if (has("build") || !fresh) {
    console.log(has("build") ? "Building deck…" : "No dist/ found — building deck…");
    const r = spawnSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });
    if (r.status !== 0) process.exit(r.status ?? 1);
  }
}

// ---- static server for dist/ (with SPA fallback) ---------------------------
const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".json": "application/json",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
  ".map": "application/json", ".ico": "image/x-icon",
};

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      let filePath = join(distDir, decodeURIComponent(url.pathname));
      const ok = existsSync(filePath) && (await stat(filePath)).isFile();
      if (!ok) filePath = join(distDir, "index.html"); // SPA fallback
      const body = await readFile(filePath);
      res.writeHead(200, {
        "Content-Type": MIME[extname(filePath).toLowerCase()] ?? "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(body);
    } catch {
      res.writeHead(500).end("error");
    }
  });
  return new Promise((res) => {
    server.listen(0, "127.0.0.1", () => res({ server, port: server.address().port }));
  });
}

// ---- capture ---------------------------------------------------------------
async function capture() {
  const { server, port } = await startServer();
  const base = `http://127.0.0.1:${port}`;
  const deckUrl = base + (DECK_PATH[deck] === "/" ? "" : DECK_PATH[deck]);

  let browser;
  try {
    browser = await chromium.launch({ args: ["--force-color-profile=srgb"] });
  } catch (err) {
    server.close();
    console.error(
      "Could not launch Chromium. Install the browser with " +
        "`npx playwright install chromium` and try again.\n",
    );
    throw err;
  }

  try {
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: scale,
    });

    // Count slides: the `?print` view stacks each slide with a data attribute.
    await page.goto(`${deckUrl}?print`, { waitUntil: "networkidle" });
    const count = await page.$$eval("[data-print-slide]", (els) => els.length);
    if (!count) throw new Error(`No slides found in the "${deck}" deck at ${deckUrl}`);
    console.log(`Capturing ${count} slide${count === 1 ? "" : "s"} from the "${deck}" deck…`);

    const frames = [];
    for (let i = 1; i <= count; i++) {
      await page.goto(`${deckUrl}?shot=${i}`, { waitUntil: "networkidle" });
      await page.waitForSelector("[data-slide]");
      // Ensure webfonts + images have fully settled before the pixel grab.
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map((img) =>
            img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }),
          ),
        );
      });
      const buf = await page.screenshot({
        type: "png",
        clip: { x: 0, y: 0, width: 1920, height: 1080 },
      });
      frames.push(buf);
      process.stdout.write(`\r  slide ${i}/${count}`);
    }
    process.stdout.write("\n");
    return frames;
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

// ---- assemble PDF ----------------------------------------------------------
async function writePdf(frames, file) {
  const pdf = await PDFDocument.create();
  // PowerPoint 16:9 page size in points (13.333in × 7.5in).
  const W = 960, H = 540;
  for (const buf of frames) {
    const png = await pdf.embedPng(buf);
    const page = pdf.addPage([W, H]);
    page.drawImage(png, { x: 0, y: 0, width: W, height: H });
  }
  await writeFile(file, await pdf.save());
  console.log(`  → ${file}`);
}

// ---- assemble PPTX ---------------------------------------------------------
async function writePptx(frames, file) {
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "DECK16x9", width: 13.333, height: 7.5 });
  pptx.layout = "DECK16x9";
  for (const buf of frames) {
    const slide = pptx.addSlide();
    slide.addImage({
      data: `data:image/png;base64,${buf.toString("base64")}`,
      x: 0, y: 0, w: 13.333, h: 7.5,
    });
  }
  await pptx.writeFile({ fileName: file });
  console.log(`  → ${file}`);
}

// ---- main ------------------------------------------------------------------
async function main() {
  await ensureBuild();
  const frames = await capture();
  await mkdir(outDir, { recursive: true });

  const stamp = `vinta-${deck}`;
  console.log("Writing files…");
  if (format === "pdf" || format === "both") {
    await writePdf(frames, join(outDir, `${stamp}.pdf`));
  }
  if (format === "pptx" || format === "both") {
    await writePptx(frames, join(outDir, `${stamp}.pptx`));
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
