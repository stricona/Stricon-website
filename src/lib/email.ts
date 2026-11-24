import { EnquiryOutput, getServiceLabel } from "@/lib/validations";
import { CareerOutput } from "@/lib/validations";
import { getCareerAreaLabel } from "@/data/careers";

export interface EmailDeliveryPayload {
  enquiry: EnquiryOutput;
  ref: string;
  timestamp: string;
  page?: string;
}

export interface CareerEmailDeliveryPayload {
  application: CareerOutput;
  ref: string;
  timestamp: string;
  resume?: {
    filename: string;
    buffer: Buffer;
    mimeType: string;
  };
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

ADDITIONAL MESSAGE
------------------
${enquiry.message || "None provided"}
`.trim();

  const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E7E5DE; border-radius: 8px; color: #29283A; background: #FFFFFF;">
  <div style="border-bottom: 2px solid #494B98; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="color: #494B98; margin: 0 0 4px 0; font-size: 20px;">STRICON Service Enquiry</h2>
    <p style="margin: 0; color: #686879; font-size: 13px;">Reference: <strong>${escapeHtml(
      ref
    )}</strong> &bull; ${escapeHtml(timestamp)}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
    <tr style="background: #F7F6F1;">
      <td style="padding: 8px 12px; font-weight: bold; width: 140px; border-bottom: 1px solid #E7E5DE;">Client Name:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${escapeHtml(
        enquiry.name
      )}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Phone:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${escapeHtml(
        enquiry.phone
      )}</td>
    </tr>
    <tr style="background: #F7F6F1;">
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Email:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;"><a href="mailto:${escapeHtml(
        enquiry.email
      )}" style="color: #494B98;">${escapeHtml(enquiry.email)}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Company:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${escapeHtml(
        enquiry.company || "Not specified"
      )}</td>
    </tr>
    <tr style="background: #F7F6F1;">
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Service:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;"><strong>${escapeHtml(
        serviceLabel
      )}</strong> (${escapeHtml(enquiry.service)})</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Site Location:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${escapeHtml(
        enquiry.location
      )}</td>
    </tr>
    <tr style="background: #F7F6F1;">
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Manpower:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${escapeHtml(
        enquiry.manpower || "Not specified"
      )}</td>
    </tr>
  </table>

  ${
    enquiry.message
      ? `
  <div style="background: #F7F6F1; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
    <h4 style="margin: 0 0 6px 0; color: #494B98; font-size: 13px;">Message / Requirement Details:</h4>
    <p style="margin: 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(
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

export async function sendCareerEmailViaResend(
  payload: CareerEmailDeliveryPayload
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[delivery:resend:career] RESEND_API_KEY is not configured");
    return false;
  }

  const { application, ref, timestamp, resume } = payload;
  const to =
    process.env.CAREERS_TO || process.env.ENQUIRY_TO || "info@stricon.in";
  const from =
    process.env.ENQUIRY_FROM || "STRICON Website <onboarding@resend.dev>";
  const areaLabel = getCareerAreaLabel(application.area);

  const cleanName = sanitizeHeader(application.name);
  const cleanRef = sanitizeHeader(ref);
  const subject = `New job application: ${sanitizeHeader(areaLabel)} - ${cleanName} (${cleanRef})`;

  const textBody = `
NEW JOB APPLICATION - STRICON
==============================
Reference: ${ref}
Timestamp: ${timestamp}

APPLICANT DETAILS
-----------------
Name: ${application.name}
Phone: ${application.phone}
Email: ${application.email || "Not provided"}
Current Location: ${application.location}
Experience: ${application.experience}
Area of Interest: ${areaLabel} (${application.area})
Education: ${application.education || "Not specified"}
Resume: ${resume ? resume.filename : "No attachment"}

MESSAGE / NOTES
---------------
${application.message || "None provided"}
`.trim();

  const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E7E5DE; border-radius: 8px; color: #29283A; background: #FFFFFF;">
  <div style="border-bottom: 2px solid #494B98; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="color: #494B98; margin: 0 0 4px 0; font-size: 20px;">STRICON Job Application</h2>
    <p style="margin: 0; color: #686879; font-size: 13px;">Reference: <strong>${escapeHtml(
      ref
    )}</strong> &bull; ${escapeHtml(timestamp)}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
    <tr style="background: #F7F6F1;">
      <td style="padding: 8px 12px; font-weight: bold; width: 140px; border-bottom: 1px solid #E7E5DE;">Applicant Name:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${escapeHtml(
        application.name
      )}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Phone:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${escapeHtml(
        application.phone
      )}</td>
    </tr>
    <tr style="background: #F7F6F1;">
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Email:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${
        application.email
          ? `<a href="mailto:${escapeHtml(application.email)}" style="color: #494B98;">${escapeHtml(
              application.email
            )}</a>`
          : "Not provided"
      }</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Area of Interest:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;"><strong>${escapeHtml(
        areaLabel
      )}</strong> (${escapeHtml(application.area)})</td>
    </tr>
    <tr style="background: #F7F6F1;">
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Experience:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${escapeHtml(
        application.experience
      )}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Location:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${escapeHtml(
        application.location
      )}</td>
    </tr>
    <tr style="background: #F7F6F1;">
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Education:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${escapeHtml(
        application.education || "Not specified"
      )}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #E7E5DE;">Resume:</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E7E5DE;">${
        resume ? escapeHtml(resume.filename) : "No resume attached"
      }</td>
    </tr>
  </table>

  ${
    application.message
      ? `
  <div style="background: #F7F6F1; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
    <h4 style="margin: 0 0 6px 0; color: #494B98; font-size: 13px;">Applicant Message / Notes:</h4>
    <p style="margin: 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(
      application.message
    )}</p>
  </div>`
      : ""
  }

  <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #E7E5DE; font-size: 12px; color: #686879;">
    STRICON PEOPLE & SECURITY SERVICES PVT LTD &bull; Recruitment & Manpower Services
  </div>
</div>
`.trim();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const requestBody: {
    from: string;
    to: string[];
    reply_to?: string;
    subject: string;
    text: string;
    html: string;
    attachments?: { filename: string; content: string }[];
  } = {
    from,
    to: [to],
    subject,
    text: textBody,
    html: htmlBody,
  };

  if (application.email) {
    requestBody.reply_to = application.email;
  }

  if (resume) {
    requestBody.attachments = [
      {
        filename: resume.filename,
        content: resume.buffer.toString("base64"),
      },
    ];
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(
        `[delivery:resend:career] HTTP ${res.status}: ${errText.slice(0, 200)}`
      );
      return false;
    }

    return true;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.error("[delivery:resend:career] Failed to send email:", err);
    return false;
  }
}
