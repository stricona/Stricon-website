import { ContactEnquiry, CareerApplication } from "@/types/enquiry";

export interface SendEmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Typed stub for email delivery.
 * Integration with transactional email service (e.g., Resend, SendGrid, SMTP) will be implemented in later phases.
 */
export async function sendContactNotification(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _enquiry: ContactEnquiry
): Promise<SendEmailResult> {
  // STUB: Do NOT send email or connect to third-party services in Phase 1
  return {
    success: true,
    messageId: "stub-contact-email-id",
  };
}

/**
 * Typed stub for career application email notification.
 */
export async function sendCareerApplicationNotification(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _application: CareerApplication
): Promise<SendEmailResult> {
  // STUB: Do NOT send email or connect to third-party services in Phase 1
  return {
    success: true,
    messageId: "stub-career-email-id",
  };
}
