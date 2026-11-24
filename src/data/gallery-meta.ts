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
 */
export const galleryMeta: Record<string, PhotoMeta> = {
  "security/corporate-security-team": {
    alt: "STRICON corporate security officers stationed at modern entrance lobby",
    caption: "Corporate security deployment and access control",
    featured: true,
    order: 1,
  },
  "security/security-operations-squad": {
    alt: "STRICON security squad on operational duty",
    caption: "On-site security personnel maintaining perimeter safety",
    featured: false,
    order: 2,
  },
  "housekeeping/corporate-housekeeping-lobby": {
    alt: "STRICON commercial housekeeping staff maintaining corporate office floor",
    caption: "Commercial housekeeping and specialized floor maintenance",
    featured: true,
    order: 3,
  },
  "facility/facility-operations-control": {
    alt: "STRICON facility management engineer and technician inspecting HVAC control panel",
    caption: "Integrated facility management and technical systems operations",
    featured: true,
    order: 4,
  },
  "training/onsite-staff-training": {
    alt: "STRICON security staff attending continuous on-site training session",
    caption: "Continuous training and site-specific SOP orientation",
    featured: true,
    order: 5,
  },
  "training/sop-training-session": {
    alt: "STRICON security personnel during standard operating procedure training",
    caption: "Standard operating procedures and protocol instruction",
    featured: true,
    order: 6,
  },
};
