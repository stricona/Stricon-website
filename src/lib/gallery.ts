import type { GalleryCategoryId, GalleryPhoto } from "@/types/gallery";
import { galleryCategories } from "@/data/gallery";
import generatedPhotosRaw from "@/data/gallery.generated.json";

const rawPhotos = generatedPhotosRaw as GalleryPhoto[];

/**
 * Returns all gallery photos sorted by order, then by id.
 */
export function getGalleryPhotos(): GalleryPhoto[] {
  return [...rawPhotos].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.id.localeCompare(b.id);
  });
}

/**
 * Returns gallery photos for a specific category id.
 */
export function getPhotosByCategory(id: GalleryCategoryId): GalleryPhoto[] {
  return getGalleryPhotos().filter((photo) => photo.category === id);
}

/**
 * Returns up to n featured photos for home preview:
 * Photos flagged as featured first (sorted by order), then filled round-robin
 * across available categories until n photos are collected.
 * Never returns duplicates.
 */
export function getFeaturedPhotos(n: number = 6): GalleryPhoto[] {
  const allPhotos = getGalleryPhotos();
  if (allPhotos.length <= n) {
    return allPhotos;
  }

  const selected: GalleryPhoto[] = [];
  const selectedIds = new Set<string>();

  // 1. First pick explicitly featured photos
  const featured = allPhotos.filter((p) => p.featured);
  for (const photo of featured) {
    if (selected.length >= n) break;
    if (!selectedIds.has(photo.id)) {
      selected.push(photo);
      selectedIds.add(photo.id);
    }
  }

  if (selected.length >= n) {
    return selected;
  }

  // 2. Prepare buckets of remaining unselected photos by category
  const categoryIds = galleryCategories.map((c) => c.id);
  const remainingByCategory: Record<GalleryCategoryId, GalleryPhoto[]> = {
    security: [],
    housekeeping: [],
    facility: [],
    training: [],
  };

  for (const photo of allPhotos) {
    if (!selectedIds.has(photo.id)) {
      remainingByCategory[photo.category].push(photo);
    }
  }

  // 3. Round-robin one per category until n is reached or no photos left
  let addedInPass = true;
  while (selected.length < n && addedInPass) {
    addedInPass = false;
    for (const catId of categoryIds) {
      if (selected.length >= n) break;
      const bucket = remainingByCategory[catId];
      if (bucket && bucket.length > 0) {
        const nextPhoto = bucket.shift()!;
        if (!selectedIds.has(nextPhoto.id)) {
          selected.push(nextPhoto);
          selectedIds.add(nextPhoto.id);
          addedInPass = true;
        }
      }
    }
  }

  return selected;
}

/**
 * Returns true if at least one photo exists in the gallery.
 */
export function hasGalleryPhotos(): boolean {
  return rawPhotos.length > 0;
}

/**
 * Returns counts of photos per category, omitting categories with 0 photos.
 */
export function getCategoryCounts(): Partial<Record<GalleryCategoryId, number>> {
  const counts: Partial<Record<GalleryCategoryId, number>> = {};
  for (const photo of rawPhotos) {
    counts[photo.category] = (counts[photo.category] || 0) + 1;
  }
  return counts;
}
