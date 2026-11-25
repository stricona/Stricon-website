import { ServiceItem } from "@/types/service";

export const serviceCategories = {
  security: {
    name: "Security Services",
    slug: "security",
    description: "Professional security guarding and premises protection.",
  },
  facility: {
    name: "Facility Management",
    slug: "facility",
    description: "Integrated facility upkeep, maintenance, and environmental hygiene services.",
  },
  manpower: {
    name: "Manpower Services",
    slug: "manpower",
    description: "Structured corporate staffing, office support personnel, and workforce management.",
  },
} as const;

export const integratedServices: string[] = [
  "Housekeeping and janitorial",
  "Security services",
  "Garden & lawn maintenance",
  "Pest control",
  "Loader services",
  "Façade cleaning",
  "Staffing",
  "Food and vending",
  "Mechanical, electrical & plumbing maintenance",
  "Carpet cleaning",
  "Upholstery cleaning",
  "Supply of personal hygiene and consumables",
  "Minor civil works and fit outs",
  "Minor repair and maintenance",
  "Vendor management",
  "Disinfection & fumigation",
];

export const services: ServiceItem[] = [
  {
    slug: "security-services",
    title: "Security Services",
    category: "security",
    icon: "ShieldCheck",
    shortSummary:
      "We provide professional security services and guarding personnel for facility protection.",
    summary:
      "We provide professional security services and guarding personnel for facility protection.",
    intro:
      "STRICON provides security services in Hyderabad through highly trained and professional in-house teams under a self delivery model. We develop customized management plans to meet the needs of every organization. STRICON is a Facility Management & Security Services Provider with valid PSARA Licence.",
    includes: [],
    includedServices: [],
    relatedSlugs: [
      "housekeeping-janitorial",
      "support-staff-services",
      "manpower-management",
    ],
    image: null,
    faqs: [],
    seoDescription:
      "STRICON provides security services in Hyderabad through highly trained in-house teams with valid PSARA Licence under a self delivery model.",
  },
  {
    slug: "housekeeping-janitorial",
    title: "Housekeeping & Janitorial Services",
    category: "facility",
    icon: "Sparkles",
    shortSummary:
      "We provide comprehensive housekeeping and janitorial services to keep facilities clean and sanitized.",
    summary:
      "We provide comprehensive housekeeping and janitorial services to keep facilities clean and sanitized.",
    intro:
      "STRICON provides housekeeping & janitorial services in Hyderabad through highly trained and professional in-house teams under a self delivery model. We develop customized management plans to meet the needs of every organization.",
    includes: [],
    includedServices: [],
    relatedSlugs: [
      "specialized-cleaning",
      "pest-control-disinfection",
      "food-vending-supplies",
    ],
    image: null,
    faqs: [],
    seoDescription:
      "STRICON provides housekeeping & janitorial services in Hyderabad through highly trained and professional in-house teams under a self delivery model.",
  },
  {
    slug: "technical-services",
    title: "Technical Services",
    category: "facility",
    icon: "Wrench",
    shortSummary:
      "We provide technical services covering mechanical, electrical and plumbing maintenance, minor repairs, and minor civil works.",
    summary:
      "We provide technical services covering mechanical, electrical and plumbing maintenance, minor repairs, and minor civil works.",
    intro:
      "STRICON provides technical services in Hyderabad through highly trained and professional in-house teams under a self delivery model. We develop customized management plans to meet the needs of every organization.",
    includes: [
      "Mechanical, Electrical & Plumbing maintenance",
      "Minor repair and maintenance",
      "Minor civil works and fit outs",
    ],
    includedServices: [
      "Mechanical, Electrical & Plumbing maintenance",
      "Minor repair and maintenance",
      "Minor civil works and fit outs",
    ],
    relatedSlugs: [
      "housekeeping-janitorial",
      "security-services",
      "specialized-cleaning",
    ],
    image: null,
    faqs: [],
    seoDescription:
      "STRICON provides technical services in Hyderabad through highly trained and professional in-house teams under a self delivery model.",
  },
  {
    slug: "support-staff-services",
    title: "Support Staff Services",
    category: "manpower",
    icon: "Users",
    shortSummary:
      "We provide essential support staff services covering office support personnel, front desk management, and loader services.",
    summary:
      "We provide essential support staff services covering office support personnel, front desk management, and loader services.",
    intro:
      "STRICON provides support staff services in Hyderabad through highly trained and professional in-house teams under a self delivery model. We develop customized management plans to meet the needs of every organization.",
    includes: ["Support staff", "Front desk management", "Loader services"],
    includedServices: [
      "Support staff",
      "Front desk management",
      "Loader services",
    ],
    relatedSlugs: [
      "manpower-management",
      "security-services",
      "housekeeping-janitorial",
    ],
    image: null,
    faqs: [],
    seoDescription:
      "STRICON provides support staff services in Hyderabad through highly trained and professional in-house teams under a self delivery model.",
  },
  {
    slug: "pest-control-disinfection",
    title: "Pest Control, Disinfection & Fumigation",
    category: "facility",
    icon: "Bug",
    shortSummary:
      "We provide pest control, disinfection, and fumigation services for facilities.",
    summary:
      "We provide pest control, disinfection, and fumigation services for facilities.",
    intro:
      "STRICON provides pest control, disinfection & fumigation in Hyderabad through highly trained and professional in-house teams under a self delivery model. We develop customized management plans to meet the needs of every organization.",
    includes: ["Pest control", "Disinfection", "Fumigation"],
    includedServices: ["Pest control", "Disinfection", "Fumigation"],
    relatedSlugs: [
      "housekeeping-janitorial",
      "specialized-cleaning",
      "food-vending-supplies",
    ],
    image: null,
    faqs: [],
    seoDescription:
      "STRICON provides pest control, disinfection & fumigation in Hyderabad through highly trained and professional in-house teams under a self delivery model.",
  },
  {
    slug: "horticulture-services",
    title: "Horticulture Services",
    category: "facility",
    icon: "Trees",
    shortSummary:
      "We provide horticulture services focused on comprehensive garden and lawn maintenance.",
    summary:
      "We provide horticulture services focused on comprehensive garden and lawn maintenance.",
    intro:
      "STRICON provides horticulture services in Hyderabad through highly trained and professional in-house teams under a self delivery model. We develop customized management plans to meet the needs of every organization.",
    includes: ["Garden & lawn maintenance"],
    includedServices: ["Garden & lawn maintenance"],
    relatedSlugs: [
      "housekeeping-janitorial",
      "technical-services",
      "security-services",
    ],
    image: null,
    faqs: [],
    seoDescription:
      "STRICON provides horticulture services in Hyderabad through highly trained and professional in-house teams under a self delivery model.",
  },
  {
    slug: "specialized-cleaning",
    title: "Specialized Cleaning",
    category: "facility",
    icon: "Brush",
    shortSummary:
      "We provide specialized cleaning services including chair and carpet shampooing, upholstery cleaning, and façade cleaning.",
    summary:
      "We provide specialized cleaning services including chair and carpet shampooing, upholstery cleaning, and façade cleaning.",
    intro:
      "STRICON provides specialized cleaning in Hyderabad through highly trained and professional in-house teams under a self delivery model. We develop customized management plans to meet the needs of every organization.",
    includes: [
      "Chair & carpet shampooing",
      "Carpet cleaning",
      "Upholstery cleaning",
      "Façade cleaning",
    ],
    includedServices: [
      "Chair & carpet shampooing",
      "Carpet cleaning",
      "Upholstery cleaning",
      "Façade cleaning",
    ],
    relatedSlugs: [
      "housekeeping-janitorial",
      "pest-control-disinfection",
      "technical-services",
    ],
    image: null,
    faqs: [],
    seoDescription:
      "STRICON provides specialized cleaning in Hyderabad through highly trained and professional in-house teams under a self delivery model.",
  },
  {
    slug: "manpower-management",
    title: "Manpower Management Services",
    category: "manpower",
    icon: "UserCheck",
    shortSummary:
      "We provide manpower management services including staffing, payroll processing, attendance systems, and vendor management.",
    summary:
      "We provide manpower management services including staffing, payroll processing, attendance systems, and vendor management.",
    intro:
      "STRICON provides manpower management services in Hyderabad through highly trained and professional in-house teams under a self delivery model. We develop customized management plans to meet the needs of every organization.",
    includes: [
      "Staffing",
      "Payroll processing",
      "Attendance system",
      "Vendor management",
    ],
    includedServices: [
      "Staffing",
      "Payroll processing",
      "Attendance system",
      "Vendor management",
    ],
    relatedSlugs: [
      "support-staff-services",
      "security-services",
      "technical-services",
    ],
    image: null,
    faqs: [],
    seoDescription:
      "STRICON provides manpower management services in Hyderabad through highly trained and professional in-house teams under a self delivery model.",
  },
  {
    slug: "food-vending-supplies",
    title: "Food & Vending Services",
    category: "facility",
    icon: "Coffee",
    shortSummary:
      "We provide food and vending services and supply personal hygiene items and consumables.",
    summary:
      "We provide food and vending services and supply personal hygiene items and consumables.",
    intro:
      "STRICON provides food & vending services in Hyderabad through highly trained and professional in-house teams under a self delivery model. We develop customized management plans to meet the needs of every organization.",
    includes: [
      "Food & vending services",
      "Supply of personal hygiene and consumables",
    ],
    includedServices: [
      "Food & vending services",
      "Supply of personal hygiene and consumables",
    ],
    relatedSlugs: [
      "housekeeping-janitorial",
      "support-staff-services",
      "pest-control-disinfection",
    ],
    image: null,
    faqs: [],
    seoDescription:
      "STRICON provides food & vending services in Hyderabad through highly trained and professional in-house teams under a self delivery model.",
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: ServiceItem): ServiceItem[] {
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is ServiceItem => s !== undefined);
}

export function getAdjacentServices(slug: string): {
  prev: ServiceItem;
  next: ServiceItem;
} | undefined {
  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) return undefined;

  const prev =
    index === 0 ? services[services.length - 1] : services[index - 1];
  const next =
    index === services.length - 1 ? services[0] : services[index + 1];

  return { prev, next };
}
