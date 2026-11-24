import { JobOpening, ExperienceOption, CareerAreaOption } from "@/types/careers";
import { services } from "@/data/services";

/**
 * Current Job Openings:
 * Must remain EMPTY until real openings are verified. Never invent vacancies.
 */
export const openings: JobOpening[] = [];

export const experienceOptions: readonly ExperienceOption[] = [
  "Fresher",
  "Less than 1 year",
  "1 to 3 years",
  "3 to 5 years",
  "More than 5 years",
] as const;

export interface CareerAreaChoice {
  value: CareerAreaOption;
  label: string;
}

export const careerAreaOptions: CareerAreaChoice[] = [
  ...services.map((s) => ({
    value: s.slug as CareerAreaOption,
    label: s.title,
  })),
  {
    value: "other",
    label: "Other / not sure",
  },
];

export function getCareerAreaLabel(value: string): string {
  const match = careerAreaOptions.find((opt) => opt.value === value);
  return match ? match.label : "General Operations";
}
