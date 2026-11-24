import { EnquiryOutput, getServiceLabel } from "@/lib/validations";
import { CareerOutput } from "@/lib/validations";
import { getCareerAreaLabel } from "@/data/careers";

export interface WebhookDeliveryPayload {
  enquiry: EnquiryOutput;
  ref: string;
  timestamp: string;
  page?: string;
}

export interface CareerWebhookDeliveryPayload {
  application: CareerOutput;
  ref: string;
  timestamp: string;
  resume?: {
    filename: string;
    size: number;
  };
}

export async function sendWebhook(
  payload: WebhookDeliveryPayload
): Promise<boolean> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) {
    console.error("[delivery:webhook] ENQUIRY_WEBHOOK_URL is not configured");
    return false;
  }

  const secret = process.env.ENQUIRY_WEBHOOK_SECRET || "";
  const { enquiry, ref, timestamp, page } = payload;
  const serviceLabel = getServiceLabel(enquiry.service);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "enquiry",
        secret,
        ref,
        timestamp,
        page: page || "/contact",
        name: enquiry.name,
        company: enquiry.company,
        phone: enquiry.phone,
        email: enquiry.email,
        service: enquiry.service,
        serviceLabel,
        location: enquiry.location,
        manpower: enquiry.manpower,
        message: enquiry.message,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(
        `[delivery:webhook] HTTP ${res.status}: ${errText.slice(0, 200)}`
      );
      return false;
    }

    return true;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.error("[delivery:webhook] Failed to send webhook:", err);
    return false;
  }
}

export async function sendCareerWebhook(
  payload: CareerWebhookDeliveryPayload
): Promise<boolean> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) {
    console.error("[delivery:webhook:career] ENQUIRY_WEBHOOK_URL is not configured");
    return false;
  }

  const secret = process.env.ENQUIRY_WEBHOOK_SECRET || "";
  const { application, ref, timestamp, resume } = payload;
  const areaLabel = getCareerAreaLabel(application.area);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "career",
        secret,
        ref,
        timestamp,
        name: application.name,
        phone: application.phone,
        email: application.email || "",
        area: application.area,
        areaLabel,
        experience: application.experience,
        location: application.location,
        education: application.education || "",
        message: application.message || "",
        resume: {
          filename: resume ? resume.filename : null,
          size: resume ? resume.size : 0,
          attached: Boolean(resume),
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(
        `[delivery:webhook:career] HTTP ${res.status}: ${errText.slice(0, 200)}`
      );
      return false;
    }

    return true;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.error("[delivery:webhook:career] Failed to send webhook:", err);
    return false;
  }
}
