export type GalleryCategoryId =
  | "security"
  | "housekeeping"
  | "facility"
  | "training";

export interface GalleryCategory {
  id: GalleryCategoryId;
  label: string;
  folder: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string | null;
  category: GalleryCategoryId;
  featured: boolean;
  order: number;
  blurDataURL: string;
}
