import { EnquiryOutput, CareerOutput } from "@/lib/validations";
import { sendEmailViaResend, sendCareerEmailViaResend } from "@/lib/email";
import { sendWebhook, sendCareerWebhook } from "@/lib/webhook";

export interface DeliveryInput {
  enquiry: EnquiryOutput;
  ref: string;
  timestamp: string;
  page?: string;
}

export interface CareerDeliveryInput {
  application: CareerOutput;
  ref: string;
  timestamp: string;
  resume?: {
    filename: string;
    buffer: Buffer;
    mimeType: string;
    size: number;
  };
}

export interface DeliveryResult {
  ok: boolean;
  error?: "delivery" | "not_configured";
}

function maskPhone(phone: string): string {
  if (phone.length <= 4) return "****";
  return phone.slice(0, -4).replace(/./g, "X") + phone.slice(-4);
}

/**
 * Checks whether attachments can be forwarded by any configured delivery channel.
 * True when Resend is configured with an API key, or in development when the log channel is active.
 */
export function canForwardAttachments(): boolean {
  const deliveryConfig = process.env.ENQUIRY_DELIVERY || "log";
  const channels = deliveryConfig
    .split(",")
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);

  if (channels.includes("resend") && Boolean(process.env.RESEND_API_KEY)) {
    return true;
  }

  if (process.env.NODE_ENV !== "production" && channels.includes("log")) {
    return true;
  }

  return false;
}

export async function deliverEnquiry(
  payload: DeliveryInput
): Promise<DeliveryResult> {
  const deliveryConfig = process.env.ENQUIRY_DELIVERY || "log";
  const channels = deliveryConfig
    .split(",")
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);

  const isProduction = process.env.NODE_ENV === "production";
  const realChannels = channels.filter((c) => c === "resend" || c === "webhook");

  // Log channel: Development only summary
  if (channels.includes("log")) {
    if (!isProduction) {
      console.log(
        `[delivery:log] ref=${payload.ref} service=${payload.enquiry.service} phone=${maskPhone(
          payload.enquiry.phone
        )} at=${payload.timestamp}`
      );
    }
  }

  // If no real delivery channels are configured
  if (realChannels.length === 0) {
    if (channels.includes("log")) {
      if (isProduction) {
        console.error(
          "[delivery] Production submission received but only 'log' delivery is configured."
        );
        return { ok: false, error: "not_configured" };
      }
      return { ok: true };
    }
    return { ok: false, error: "not_configured" };
  }

  // Execute configured real channels in parallel
  const channelPromises: Promise<boolean>[] = [];

  if (channels.includes("resend")) {
    channelPromises.push(sendEmailViaResend(payload));
  }

  if (channels.includes("webhook")) {
    channelPromises.push(sendWebhook(payload));
  }

  const results = await Promise.allSettled(channelPromises);

  // Success if AT LEAST ONE configured real channel succeeded
  const anySuccess = results.some(
    (res) => res.status === "fulfilled" && res.value === true
  );

  if (anySuccess) {
    return { ok: true };
  }

  return { ok: false, error: "delivery" };
}

export async function deliverCareerApplication(
  payload: CareerDeliveryInput
): Promise<DeliveryResult> {
  const deliveryConfig = process.env.ENQUIRY_DELIVERY || "log";
  const channels = deliveryConfig
    .split(",")
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);

  const isProduction = process.env.NODE_ENV === "production";
  const realChannels = channels.filter((c) => c === "resend" || c === "webhook");

  // Log channel: Development only summary
  if (channels.includes("log")) {
    if (!isProduction) {
      console.log(
        `[delivery:career:log] ref=${payload.ref} area=${payload.application.area} phone=${maskPhone(
          payload.application.phone
        )} resume=${payload.resume ? payload.resume.filename : "none"} at=${payload.timestamp}`
      );
    }
  }

  // If no real delivery channels are configured
  if (realChannels.length === 0) {
    if (channels.includes("log")) {
      if (isProduction) {
        console.error(
          "[delivery:career] Production submission received but only 'log' delivery is configured."
        );
        return { ok: false, error: "not_configured" };
      }
      return { ok: true };
    }
    return { ok: false, error: "not_configured" };
  }

  // Execute configured real channels in parallel
  const channelPromises: Promise<boolean>[] = [];

  if (channels.includes("resend")) {
    channelPromises.push(sendCareerEmailViaResend(payload));
  }

  if (channels.includes("webhook")) {
    channelPromises.push(
      sendCareerWebhook({
        application: payload.application,
        ref: payload.ref,
        timestamp: payload.timestamp,
        resume: payload.resume
          ? {
              filename: payload.resume.filename,
              size: payload.resume.size,
            }
          : undefined,
      })
    );
  }

  const results = await Promise.allSettled(channelPromises);

  // Success if AT LEAST ONE configured real channel succeeded
  const anySuccess = results.some(
    (res) => res.status === "fulfilled" && res.value === true
  );

  if (anySuccess) {
    return { ok: true };
  }

  return { ok: false, error: "delivery" };
}
