export type ServiceGroupCategory = "security" | "facility" | "manpower";

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  category: ServiceGroupCategory;
  icon: string;
  shortSummary: string;
  summary: string; // backwards compatibility with Phase 1/2 components
  intro: string;
  includes: string[];
  includedServices: string[]; // backwards compatibility with Phase 1/2 components
  relatedSlugs: string[];
  image: string | null;
  faqs: ServiceFAQ[];
  seoDescription: string;
}

export type ServiceCategory = ServiceItem;
