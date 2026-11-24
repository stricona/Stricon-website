export type {
  EnquiryInput,
  EnquiryOutput,
  ServiceSlugOption,
  ValidationResult,
} from "@/lib/validations";

export interface ContactApiResponse {
  ok: boolean;
  ref?: string;
  error?: "delivery" | "not_configured" | "rate_limited" | "invalid_request";
  errors?: Record<string, string>;
  message?: string;
}

// Retained for /api/careers stub backwards compatibility
export interface CareerApplication {
  name: string;
  email: string;
  phone: string;
  position?: string;
  experience?: string;
  message?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
