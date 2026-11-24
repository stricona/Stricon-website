import { EnquiryOutput, getServiceLabel } from "@/lib/validations";

export interface WebhookDeliveryPayload {
  enquiry: EnquiryOutput;
  ref: string;
  timestamp: string;
  page?: string;
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
      console.error(
        `[delivery:webhook] HTTP ${res.status}: Failed to deliver to webhook`
      );
      return false;
    }

    return true;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.error("[delivery:webhook] Failed to POST to webhook:", err);
    return false;
  }
}
