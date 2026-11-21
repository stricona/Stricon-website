import { ServiceCategory } from "@/types/service";

export const services: ServiceCategory[] = [
  {
    slug: "security-services",
    title: "Security Services",
    summary: "We provide professional security services and guarding personnel for facility protection.",
    includedServices: [
      "Security Services",
      "Guarding personnel",
    ],
    icon: "ShieldCheck",
  },
  {
    slug: "housekeeping-janitorial",
    title: "Housekeeping & Janitorial Services",
    summary: "We provide comprehensive housekeeping and janitorial services to keep facilities clean and sanitized.",
    includedServices: [
      "Housekeeping services",
      "Janitorial services",
    ],
    icon: "Sparkles",
  },
  {
    slug: "technical-services",
    title: "Technical Services",
    summary: "We provide technical services covering mechanical, electrical and plumbing maintenance, minor repairs, and minor civil works.",
    includedServices: [
      "Mechanical, Electrical & Plumbing maintenance",
      "Minor repair and maintenance",
      "Minor civil works and fit-outs",
    ],
    icon: "Wrench",
  },
  {
    slug: "support-staff-services",
    title: "Support Staff Services",
    summary: "We provide essential support staff services covering office support personnel, front desk management, and loader services.",
    includedServices: [
      "Support staff",
      "Front desk management",
      "Loader services",
    ],
    icon: "Users",
  },
  {
    slug: "pest-control-disinfection",
    title: "Pest Control, Disinfection & Fumigation",
    summary: "We provide pest control, disinfection, and fumigation services for facilities.",
    includedServices: [
      "Pest control",
      "Disinfection",
      "Fumigation",
    ],
    icon: "Bug",
  },
  {
    slug: "horticulture-services",
    title: "Horticulture Services",
    summary: "We provide horticulture services focused on comprehensive garden and lawn maintenance.",
    includedServices: [
      "Garden & lawn maintenance",
    ],
    icon: "Trees",
  },
  {
    slug: "specialized-cleaning",
    title: "Specialized Cleaning",
    summary: "We provide specialized cleaning services including chair and carpet shampooing, upholstery cleaning, and façade cleaning.",
    includedServices: [
      "Chair & carpet shampooing",
      "Carpet cleaning",
      "Upholstery cleaning",
      "Façade cleaning",
    ],
    icon: "Brush",
  },
  {
    slug: "manpower-management",
    title: "Manpower Management Services",
    summary: "We provide manpower management services including staffing, payroll processing, attendance systems, and vendor management.",
    includedServices: [
      "Staffing",
      "Payroll processing",
      "Attendance system",
      "Vendor management",
    ],
    icon: "UserCheck",
  },
  {
    slug: "food-vending-supplies",
    title: "Food & Vending Services",
    summary: "We provide food and vending services and supply personal hygiene items and consumables.",
    includedServices: [
      "Food & vending services",
      "Supply of personal hygiene and consumables",
    ],
    icon: "Coffee",
  },
];

export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return services.find((service) => service.slug === slug);
}
