export type GalleryCategory =
  | "Security deployments"
  | "Housekeeping"
  | "Facility operations"
  | "Training sessions";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  src: string | null;
  alt: string;
  description?: string;
}
