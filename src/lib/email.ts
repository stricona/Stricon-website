import { EnquiryOutput, getServiceLabel } from "@/lib/validations";

export interface EmailDeliveryPayload {
  enquiry: EnquiryOutput;
  ref: string;
  timestamp: string;
  page?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n\t]/g, " ").trim();
}

export async function sendEmailViaResend(
  payload: EmailDeliveryPayload
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[delivery:resend] RESEND_API_KEY is not configured");
    return false;
  }

  const { enquiry, ref, timestamp, page } = payload;
  const to = process.env.ENQUIRY_TO || "info@stricon.in";
  const from =
    process.env.ENQUIRY_FROM || "STRICON Website <onboarding@resend.dev>";
  const serviceLabel = getServiceLabel(enquiry.service);

  const cleanName = sanitizeHeader(enquiry.name);
  const cleanRef = sanitizeHeader(ref);
  const subject = `New enquiry: ${sanitizeHeader(serviceLabel)} - ${cleanName} (${cleanRef})`;

  const textBody = `
NEW SERVICE ENQUIRY - STRICON
==============================
Reference: ${ref}
Timestamp: ${timestamp}
Page: ${page || "/contact"}

CLIENT DETAILS
--------------
Name: ${enquiry.name}
Phone: ${enquiry.phone}
Email: ${enquiry.email}
Company: ${enquiry.company || "Not specified"}

SERVICE REQUIREMENTS
--------------------
Service: ${serviceLabel} (${enquiry.service})
Location: ${enquiry.location}
Manpower Needed: ${enquiry.manpower || "Not specified"}

MESSAGE
-------
${enquiry.message || "No additional message provided"}
==============================
`.trim();

  const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #29283A; background: #FFFFFF; border: 1px solid #E7E5DE; border-radius: 8px;">
  <div style="border-bottom: 2px solid #494B98; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="color: #494B98; margin: 0 0 4px 0; font-size: 20px;">New Service Enquiry</h2>
    <p style="margin: 0; color: #686879; font-size: 13px;">Reference: <strong>${escapeHtml(
      ref
    )}</strong> | ${escapeHtml(timestamp)}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
    <tr>
      <td style="padding: 8px 0; font-weight: 600; width: 140px; color: #686879;">Client Name:</td>
      <td style="padding: 8px 0; font-weight: 600; color: #29283A;">${escapeHtml(
        enquiry.name
      )}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #686879;">Phone:</td>
      <td style="padding: 8px 0;"><a href="tel:${escapeHtml(
        enquiry.phone
      )}" style="color: #178C83; text-decoration: none;">${escapeHtml(
    enquiry.phone
  )}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #686879;">Email:</td>
      <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(
        enquiry.email
      )}" style="color: #178C83; text-decoration: none;">${escapeHtml(
    enquiry.email
  )}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #686879;">Company:</td>
      <td style="padding: 8px 0;">${
        enquiry.company ? escapeHtml(enquiry.company) : "<em>None</em>"
      }</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #686879;">Service:</td>
      <td style="padding: 8px 0; font-weight: 600; color: #494B98;">${escapeHtml(
        serviceLabel
      )}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #686879;">Location:</td>
      <td style="padding: 8px 0;">${escapeHtml(enquiry.location)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: 600; color: #686879;">Manpower:</td>
      <td style="padding: 8px 0;">${
        enquiry.manpower ? escapeHtml(enquiry.manpower) : "<em>None</em>"
      }</td>
    </tr>
  </table>

  ${
    enquiry.message
      ? `
  <div style="background: #F7F6F1; padding: 16px; border-radius: 6px; margin-top: 16px; font-size: 14px;">
    <strong style="color: #29283A; display: block; margin-bottom: 8px;">Message:</strong>
    <p style="margin: 0; white-space: pre-wrap; color: #404052;">${escapeHtml(
      enquiry.message
    )}</p>
  </div>`
      : ""
  }

  <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #E7E5DE; font-size: 12px; color: #686879;">
    STRICON PEOPLE & SECURITY SERVICES PVT LTD &bull; Mehdipatnam, Hyderabad
  </div>
</div>
`.trim();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(
        `[delivery:resend] HTTP ${res.status}: ${errText.slice(0, 200)}`
      );
      return false;
    }

    return true;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.error("[delivery:resend] Failed to send email:", err);
    return false;
  }
}
