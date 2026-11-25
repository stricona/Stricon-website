import { z } from "zod";

export const SERVICE_SLUGS = [
  "security-services",
  "housekeeping-janitorial",
  "technical-services",
  "support-staff-services",
  "pest-control-disinfection",
  "horticulture-services",
  "specialized-cleaning",
  "manpower-management",
  "food-vending-supplies",
  "integrated",
  "other",
] as const;

export type ServiceSlugOption = (typeof SERVICE_SLUGS)[number];

export const SERVICE_OPTIONS: { value: ServiceSlugOption; label: string }[] = [
  { value: "security-services", label: "Security Services" },
  {
    value: "housekeeping-janitorial",
    label: "Housekeeping & Janitorial Services",
  },
  { value: "technical-services", label: "Technical Services" },
  { value: "support-staff-services", label: "Support Staff Services" },
  {
    value: "pest-control-disinfection",
    label: "Pest Control, Disinfection & Fumigation",
  },
  { value: "horticulture-services", label: "Horticulture Services" },
  { value: "specialized-cleaning", label: "Specialized Cleaning" },
  {
    value: "manpower-management",
    label: "Manpower Management Services",
  },
  { value: "food-vending-supplies", label: "Food & Vending Services" },
  { value: "integrated", label: "Integrated / bundled services" },
  { value: "other", label: "Other / not sure" },
];

export function getServiceLabel(service: string): string {
  const match = SERVICE_OPTIONS.find((s) => s.value === service);
  return match ? match.label : service;
}

/**
 * Normalizes Indian phone number to 10 digits starting with 6-9.
 * Accepts +91, 91, 0 prefixes, spaces, dashes, and parentheses.
 */
export function normalizeIndianPhone(input: string): string | null {
  if (!input || typeof input !== "string") return null;
  const cleaned = input.replace(/[\s\-()]/g, "");
  const match = cleaned.match(/^(?:\+?91|0)?([6-9]\d{9})$/);
  return match ? match[1] : null;
}

/**
 * Shared Name & Phone Validation Rules
 */
const nameRule = z
  .string()
  .trim()
  .min(1, "Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(80, "Name cannot exceed 80 characters");

const phoneRule = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .refine((val) => normalizeIndianPhone(val) !== null, {
    message: "Enter a valid 10 digit mobile number",
  })
  .transform((val) => normalizeIndianPhone(val) || val);

export const enquirySchema = z.object({
  name: nameRule,
  company: z
    .string()
    .max(120, "Company name cannot exceed 120 characters")
    .optional()
    .default(""),
  phone: phoneRule,
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address")
    .max(120, "Email cannot exceed 120 characters"),
  service: z.enum(SERVICE_SLUGS, {
    message: "Please select a service",
  }),
  location: z
    .string()
    .trim()
    .min(1, "Location is required")
    .min(2, "Location must be at least 2 characters")
    .max(160, "Location cannot exceed 160 characters"),
  manpower: z
    .string()
    .max(60, "Manpower details cannot exceed 60 characters")
    .optional()
    .default(""),
  message: z
    .string()
    .max(1000, "Message cannot exceed 1000 characters")
    .optional()
    .default(""),
  consent: z.literal(true, {
    message: "You must consent to being contacted regarding this enquiry",
  }),
  // Bot protection fields (hidden from human users)
  website: z.string().optional().default(""),
  startedAt: z.number().optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryOutput = z.output<typeof enquirySchema>;

export const CAREER_AREA_SLUGS = [
  "security-services",
  "housekeeping-janitorial",
  "technical-services",
  "support-staff-services",
  "pest-control-disinfection",
  "horticulture-services",
  "specialized-cleaning",
  "manpower-management",
  "food-vending-supplies",
  "other",
] as const;

export type CareerAreaSlug = (typeof CAREER_AREA_SLUGS)[number];

export const EXPERIENCE_CHOICES = [
  "Fresher",
  "Less than 1 year",
  "1 to 3 years",
  "3 to 5 years",
  "More than 5 years",
] as const;

export type ExperienceChoice = (typeof EXPERIENCE_CHOICES)[number];

export const careerSchema = z.object({
  name: nameRule,
  phone: phoneRule,
  email: z
    .string()
    .trim()
    .max(120, "Email cannot exceed 120 characters")
    .optional()
    .refine(
      (val) => !val || val === "" || z.string().email().safeParse(val).success,
      { message: "Enter a valid email address" }
    )
    .default(""),
  area: z.enum(CAREER_AREA_SLUGS, {
    message: "Please select an area of interest",
  }),
  experience: z.enum(EXPERIENCE_CHOICES, {
    message: "Please select your experience level",
  }),
  location: z
    .string()
    .trim()
    .min(1, "Location is required")
    .min(2, "Location must be at least 2 characters")
    .max(120, "Location cannot exceed 120 characters"),
  education: z
    .string()
    .trim()
    .max(80, "Education cannot exceed 80 characters")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .max(800, "Message cannot exceed 800 characters")
    .optional()
    .default(""),
  consent: z.literal(true, {
    message: "I agree that STRICON may contact me about my application.",
  }),
  website: z.string().optional().default(""),
  startedAt: z.number().optional(),
});

export type CareerInput = z.input<typeof careerSchema>;
export type CareerOutput = z.output<typeof careerSchema>;
