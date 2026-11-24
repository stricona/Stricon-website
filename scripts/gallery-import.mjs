/**
 * scripts/gallery-import.mjs
 * Imports raw photos from gallery-inbox/<folder>/ into public/images/gallery/<folder>/
 * - Strips EXIF/GPS/metadata
 * - Resizes long edge to max 1800px (no upscaling)
 * - Converts to optimized WebP (~80 quality)
 * - Retains raw inbox files
 * - Invokes gallery:sync
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { syncGallery } from "./gallery-sync.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const INBOX_DIR = path.join(ROOT_DIR, "gallery-inbox");
const PUBLIC_DIR = path.join(ROOT_DIR, "public", "images", "gallery");

const CATEGORIES = ["security", "housekeeping", "facility", "training"];
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export async function importGallery() {
  console.log("\n📥 Running STRICON Gallery Import from gallery-inbox/...\n");

  const results = [];

  for (const cat of CATEGORIES) {
    const catInbox = path.join(INBOX_DIR, cat);
    const catPublic = path.join(PUBLIC_DIR, cat);

    if (!fs.existsSync(catInbox)) continue;
    if (!fs.existsSync(catPublic)) {
      fs.mkdirSync(catPublic, { recursive: true });
    }

    const files = fs.readdirSync(catInbox).filter((f) => f !== ".gitkeep");

    for (const file of files) {
      const srcPath = path.join(catInbox, file);
      const stat = fs.statSync(srcPath);

      if (stat.isDirectory()) continue;

      const ext = path.extname(file).toLowerCase();
      const rawBase = path.basename(file, ext);

      // Skip non-image files
      if (!IMAGE_EXTS.has(ext)) {
        results.push({
          file: `${cat}/${file}`,
          result: "SKIPPED",
          outputSize: "-",
          warning: "Non-image file skipped",
        });
        continue;
      }

      const slug = slugify(rawBase) || "photo";
      const destFilename = `${slug}.webp`;
      const destPath = path.join(catPublic, destFilename);

      // Check idempotency: if dest exists and is newer than src
      if (fs.existsSync(destPath)) {
        const destStat = fs.statSync(destPath);
        if (destStat.mtimeMs >= stat.mtimeMs) {
          results.push({
            file: `${cat}/${file}`,
            result: "UP TO DATE",
            outputSize: formatBytes(destStat.size),
            warning: destStat.size > 400 * 1024 ? "Output size > 400 KB" : "-",
          });
          continue;
        }
      }

      try {
        const image = sharp(srcPath);
        const metadata = await image.metadata();

        const warnings = [];
        if (metadata.width && metadata.width < 1000) {
          warnings.push("Low resolution (<1000px wide)");
        }

        // Auto-rotate by EXIF orientation, resize max 1800px on long edge without enlarging,
        // and re-encode to WebP without metadata (stripping EXIF & GPS)
        await sharp(srcPath)
          .rotate()
          .resize({
            width: 1800,
            height: 1800,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toFile(destPath);

        const outStat = fs.statSync(destPath);
        if (outStat.size > 400 * 1024) {
          warnings.push("Output size > 400 KB");
        }

        results.push({
          file: `${cat}/${file}`,
          result: "CONVERTED",
          outputSize: formatBytes(outStat.size),
          warning: warnings.length > 0 ? warnings.join("; ") : "-",
        });
      } catch (err) {
        results.push({
          file: `${cat}/${file}`,
          result: "ERROR",
          outputSize: "-",
          warning: err.message,
        });
      }
    }
  }

  // Print results table
  if (results.length === 0) {
    console.log("No raw photos found in gallery-inbox/ subfolders.");
  } else {
    console.log("───────────────────────────────────────────────────────────────────────────────────");
    console.log("| File                                | Result       | Size      | Warnings / Info |");
    console.log("───────────────────────────────────────────────────────────────────────────────────");
    for (const r of results) {
      const fileCol = r.file.padEnd(35).slice(0, 35);
      const resCol = r.result.padEnd(12).slice(0, 12);
      const sizeCol = r.outputSize.padEnd(9).slice(0, 9);
      console.log(`| ${fileCol} | ${resCol} | ${sizeCol} | ${r.warning} |`);
    }
    console.log("───────────────────────────────────────────────────────────────────────────────────\n");
  }

  // Run sync after import
  await syncGallery();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  importGallery().catch((err) => {
    console.error("Gallery import failed:", err);
    process.exit(1);
  });
}
