export interface PhotoMeta {
  alt?: string;
  caption?: string;
  featured?: boolean;
  order?: number;
}

/**
 * STRICON Gallery Owner Metadata
 *
 * Key format: `<category>/<file-name-without-extension>`
 * Example:
 *   "security/team-briefing": {
 *     alt: "STRICON security squad receiving morning briefing",
 *     caption: "Morning shift protocol briefing at client facility",
 *     featured: true,
 *     order: 1,
 *   }
 *
 * Rules:
 * - Never invent captions or client names.
 * - If omitted, `alt` defaults to generic "{category label} photo",
 *   `caption` defaults to null, `featured` defaults to false,
 *   and `order` defaults to filename order.
 */
export const galleryMeta: Record<string, PhotoMeta> = {};
