import { ContactEnquiry, CareerApplication } from "@/types/enquiry";

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
}

/**
 * Validation stub for contact enquiry submissions
 */
export function validateContactEnquiry(data: Partial<ContactEnquiry>): ValidationResult {
  const errors: Record<string, string[]> = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = ["Name is required"];
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = ["A valid email address is required"];
  }

  if (!data.phone || data.phone.trim().length < 10) {
    errors.phone = ["A valid contact number is required"];
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.message = ["Message is required"];
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validation stub for career application submissions
 */
export function validateCareerApplication(data: Partial<CareerApplication>): ValidationResult {
  const errors: Record<string, string[]> = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = ["Name is required"];
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = ["A valid email address is required"];
  }

  if (!data.phone || data.phone.trim().length < 10) {
    errors.phone = ["A valid phone number is required"];
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
