export interface JobOpening {
  id: string;
  title: string;
  location: string;
  summary: string;
}

export type ExperienceOption =
  | "Fresher"
  | "Less than 1 year"
  | "1 to 3 years"
  | "3 to 5 years"
  | "More than 5 years";

export type CareerAreaOption =
  | "security-services"
  | "housekeeping-janitorial"
  | "technical-services"
  | "support-staff-services"
  | "pest-control-disinfection"
  | "horticulture-services"
  | "specialized-cleaning"
  | "manpower-management"
  | "food-vending-supplies"
  | "other";

export interface CareerApplicationInput {
  name: string;
  phone: string;
  email?: string;
  area: CareerAreaOption;
  experience: ExperienceOption;
  location: string;
  education?: string;
  message?: string;
  consent: boolean;
  website?: string;
  startedAt?: number;
}

export interface CareerApplicationOutput {
  name: string;
  phone: string;
  email?: string;
  area: CareerAreaOption;
  experience: ExperienceOption;
  location: string;
  education?: string;
  message?: string;
  consent: boolean;
  website?: string;
  startedAt?: number;
}

export interface CareerApiResponse {
  ok: boolean;
  ref?: string;
  error?: string;
  errors?: Record<string, string>;
}
