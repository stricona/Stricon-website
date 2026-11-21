export interface ContactEnquiry {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}

export interface CareerApplication {
  name: string;
  email: string;
  phone: string;
  position?: string;
  experience?: string;
  message?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}
