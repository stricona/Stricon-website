/**
 * scripts/gallery-sync.mjs
 * Scans public/images/gallery/<folder>/ and writes src/data/gallery.generated.json
 * Merges with owner metadata in src/data/gallery-meta.ts
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const GALLERY_PUBLIC_DIR = path.join(ROOT_DIR, "public", "images", "gallery");
const GENERATED_JSON_PATH = path.join(ROOT_DIR, "src", "data", "gallery.generated.json");

const CATEGORIES = [
  { id: "security", label: "Security deployments", folder: "security" },
  { id: "housekeeping", label: "Housekeeping", folder: "housekeeping" },
  { id: "facility", label: "Facility operations", folder: "facility" },
  { id: "training", label: "Training sessions", folder: "training" },
];

const VALID_EXTS = new Set([".webp", ".jpg", ".jpeg", ".png"]);

async function loadGalleryMeta() {
  try {
    const metaMod = await import("../src/data/gallery-meta.ts");
    return metaMod.galleryMeta || {};
  } catch (err) {
    console.warn("Could not import gallery-meta.ts dynamically:", err.message);
    return {};
  }
}

export async function syncGallery() {
  console.log("\n📸 Running STRICON Gallery Sync...\n");

  const galleryMeta = await loadGalleryMeta();
  const matchedMetaKeys = new Set();
  const genericAltWarnings = [];
  const unknownFolderWarnings = [];
  const photos = [];

  // 1. Check for unknown folders in public/images/gallery
  if (fs.existsSync(GALLERY_PUBLIC_DIR)) {
    const entries = fs.readdirSync(GALLERY_PUBLIC_DIR, { withFileTypes: true });
    const validFolders = new Set(CATEGORIES.map((c) => c.folder));
    for (const entry of entries) {
      if (entry.isDirectory() && !validFolders.has(entry.name)) {
        unknownFolderWarnings.push(entry.name);
      }
    }
  }

  // 2. Scan each valid category folder
  for (const cat of CATEGORIES) {
    const catDir = path.join(GALLERY_PUBLIC_DIR, cat.folder);
    if (!fs.existsSync(catDir)) continue;

    const files = fs
      .readdirSync(catDir)
      .filter((file) => {
        if (file === ".gitkeep") return false;
        const ext = path.extname(file).toLowerCase();
        return VALID_EXTS.has(ext);
      })
      .sort((a, b) => a.localeCompare(b));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(catDir, file);
      const ext = path.extname(file);
      const nameWithoutExt = path.basename(file, ext);
      const photoId = `${cat.id}/${nameWithoutExt}`;

      try {
        const metadata = await sharp(filePath).metadata();
        const width = metadata.width || 1200;
        const height = metadata.height || 800;

        // Generate tiny ~10px wide base64 blur WebP placeholder
        const blurBuffer = await sharp(filePath)
          .resize({ width: 10, withoutEnlargement: true })
          .webp({ quality: 20 })
          .toBuffer();
        const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

        // Look up owner metadata
        const meta = galleryMeta[photoId];
        if (meta) {
          matchedMetaKeys.add(photoId);
        }

        const defaultAlt = `${cat.label} photo`;
        const alt = (meta && meta.alt && meta.alt.trim()) || defaultAlt;
        if (alt === defaultAlt) {
          genericAltWarnings.push(photoId);
        }

        const caption = (meta && meta.caption && meta.caption.trim()) || null;
        const featured = Boolean(meta && meta.featured);
        const order =
          meta && typeof meta.order === "number" ? meta.order : (i + 1) * 10;

        photos.push({
          id: photoId,
          src: `/images/gallery/${cat.folder}/${file}`,
          width,
          height,
          alt,
          caption,
          category: cat.id,
          featured,
          order,
          blurDataURL,
        });
      } catch (err) {
        console.error(`Error processing image ${filePath}:`, err.message);
      }
    }
  }

  // Sort photos stably by order, then by id
  photos.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.id.localeCompare(b.id);
  });

  // Write generated JSON
  fs.writeFileSync(GENERATED_JSON_PATH, JSON.stringify(photos, null, 2) + "\n", "utf-8");
  console.log(`✅ Synced ${photos.length} photos to ${path.relative(ROOT_DIR, GENERATED_JSON_PATH)}`);

  // Report warnings
  if (genericAltWarnings.length > 0) {
    console.warn(`\n⚠️  The following ${genericAltWarnings.length} photos use default generic alt text (update in src/data/gallery-meta.ts):`);
    genericAltWarnings.forEach((id) => console.warn(`   • ${id}`));
  }

  const allMetaKeys = Object.keys(galleryMeta);
  const unmatchedMeta = allMetaKeys.filter((k) => !matchedMetaKeys.has(k));
  if (unmatchedMeta.length > 0) {
    console.warn(`\n⚠️  The following ${unmatchedMeta.length} metadata keys in gallery-meta.ts match no actual photo:`);
    unmatchedMeta.forEach((k) => console.warn(`   • ${k}`));
  }

  if (unknownFolderWarnings.length > 0) {
    console.warn(`\n⚠️  Unknown folders in public/images/gallery (not in galleryCategories):`);
    unknownFolderWarnings.forEach((f) => console.warn(`   • ${f}`));
  }

  console.log("");
  return photos;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncGallery().catch((err) => {
    console.error("Gallery sync failed:", err);
    process.exit(1);
  });
}
