import { NextResponse } from "next/server";
import { careerSchema, CareerOutput } from "@/lib/validations";
import { checkCareerRateLimit } from "@/lib/rate-limit";
import { deliverCareerApplication, canForwardAttachments } from "@/lib/delivery";
import { validateResumeFile, MAX_FILE_SIZE } from "@/lib/file-validation";

const MAX_PAYLOAD_SIZE = 3 * 1024 * 1024; // 3 MB

function generateAppRef(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `APP-${dateStr}-${randomPart}`;
}

function sanitizeSingleLine(str: string): string {
  return str.replace(/[\r\n\t]/g, " ").trim();
}

function verifySameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Non-browser / same-origin without origin header

  try {
    const originHost = new URL(origin).host.toLowerCase();
    const reqHost = request.headers.get("host")?.toLowerCase();

    // Match against current request host
    if (reqHost && (originHost === reqHost || originHost === reqHost.split(":")[0])) {
      return true;
    }

    // Match against configured NEXT_PUBLIC_SITE_URL
    const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (configuredSiteUrl) {
      const siteHost = new URL(configuredSiteUrl).host.toLowerCase();
      if (originHost === siteHost) return true;
    }

    // Localhost / 127.0.0.1 in non-production
    if (process.env.NODE_ENV !== "production") {
      if (originHost.includes("localhost") || originHost.includes("127.0.0.1")) {
        return true;
      }
    }
  } catch {
    return false;
  }

  return false;
}

export async function POST(request: Request) {
  // 1. Content-Length check (max 3 MB)
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_PAYLOAD_SIZE) {
    return NextResponse.json(
      { ok: false, error: "invalid_request", message: "Payload exceeds 3 MB size limit" },
      { status: 413 }
    );
  }

  // 2. Same-origin check
  if (!verifySameOrigin(request)) {
    return NextResponse.json(
      { ok: false, error: "invalid_request", message: "Forbidden: Origin does not match" },
      { status: 403 }
    );
  }

  const contentType = request.headers.get("content-type") || "";

  let rawFields: Record<string, unknown> = {};
  let resumeFile: {
    buffer: Buffer;
    filename: string;
    mimeType: string;
  } | null = null;

  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        if (key !== "resume") {
          rawFields[key] = value;
        }
      });

      const file = formData.get("resume");
      if (file && typeof file === "object" && "arrayBuffer" in file && typeof file.name === "string") {
        const fileObj = file as File;
        if (fileObj.size > 0) {
          if (fileObj.size > MAX_FILE_SIZE) {
            return NextResponse.json(
              {
                ok: false,
                errors: { resume: "File size exceeds 2 MB limit" },
              },
              { status: 400 }
            );
          }
          const arrayBuffer = await fileObj.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          resumeFile = {
            buffer,
            filename: fileObj.name,
            mimeType: fileObj.type,
          };
        }
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: "invalid_request", message: "Invalid form data" },
        { status: 400 }
      );
    }
  } else if (contentType.includes("application/json")) {
    const rawBody = await request.text();
    if (rawBody.length > MAX_PAYLOAD_SIZE) {
      return NextResponse.json(
        { ok: false, error: "invalid_request", message: "Payload exceeds 3 MB limit" },
        { status: 413 }
      );
    }
    try {
      rawFields = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { ok: false, error: "invalid_request", message: "Invalid JSON format" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { ok: false, error: "invalid_request", message: "Unsupported Content-Type" },
      { status: 400 }
    );
  }

  // 3. Bot Protection: Honeypot & Timing
  const websiteHoneypot = typeof rawFields.website === "string" ? rawFields.website.trim() : "";
  const startedAt = typeof rawFields.startedAt === "number" ? rawFields.startedAt : Number(rawFields.startedAt);
  const now = Date.now();

  const isBotDetected =
    websiteHoneypot.length > 0 ||
    !startedAt ||
    isNaN(startedAt) ||
    startedAt > now ||
    now - startedAt < 2500;

  if (isBotDetected) {
    return NextResponse.json({ ok: true, ref: generateAppRef() }, { status: 200 });
  }

  // 4. Rate Limiting per IP (Separate bucket for careers)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  const rateLimitResult = checkCareerRateLimit(clientIp);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate_limited",
        message: "Too many attempts. Please try again later or call us.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rateLimitResult.resetAt - now) / 1000).toString(),
        },
      }
    );
  }

  // 5. Parse and Validate Fields
  // Normalize consent and startedAt from FormData string types
  if (rawFields.consent === "true" || rawFields.consent === "on" || rawFields.consent === true) {
    rawFields.consent = true;
  }
  if (rawFields.startedAt !== undefined && !isNaN(startedAt)) {
    rawFields.startedAt = startedAt;
  }

  const parsedFields = careerSchema.safeParse(rawFields);
  if (!parsedFields.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsedFields.error.issues) {
      const field = issue.path[0]?.toString() || "form";
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, errors: fieldErrors },
      { status: 400 }
    );
  }

  // File Validation & Feature Flag Check
  const resumeUploadEnabled =
    process.env.CAREERS_RESUME_UPLOAD === "on" && canForwardAttachments();

  let validatedResume: {
    filename: string;
    buffer: Buffer;
    mimeType: string;
    size: number;
  } | undefined = undefined;

  if (resumeFile) {
    if (!resumeUploadEnabled) {
      return NextResponse.json(
        {
          ok: false,
          error: "resume_disabled",
          errors: { resume: "Resume uploads are currently disabled" },
        },
        { status: 400 }
      );
    }

    const fileCheck = validateResumeFile(
      resumeFile.buffer,
      resumeFile.filename,
      resumeFile.mimeType
    );

    if (!fileCheck.valid || !fileCheck.buffer || !fileCheck.sanitisedFilename) {
      return NextResponse.json(
        {
          ok: false,
          errors: { resume: fileCheck.error || "Invalid file format" },
        },
        { status: 400 }
      );
    }

    validatedResume = {
      filename: fileCheck.sanitisedFilename,
      buffer: fileCheck.buffer,
      mimeType: fileCheck.mimeType || "application/pdf",
      size: fileCheck.size || resumeFile.buffer.length,
    };
  }

  // 6. Sanitise single-line fields
  const application: CareerOutput = {
    ...parsedFields.data,
    name: sanitizeSingleLine(parsedFields.data.name),
    phone: sanitizeSingleLine(parsedFields.data.phone),
    email: parsedFields.data.email ? sanitizeSingleLine(parsedFields.data.email) : "",
    location: sanitizeSingleLine(parsedFields.data.location),
    education: parsedFields.data.education ? sanitizeSingleLine(parsedFields.data.education) : "",
    message: parsedFields.data.message || "",
  };

  // 7. Reference Generation
  const ref = generateAppRef();
  const timestamp = new Date().toISOString();

  // 8. Deliver via multi-channel delivery engine
  const deliveryResult = await deliverCareerApplication({
    application,
    ref,
    timestamp,
    resume: validatedResume,
  });

  if (!deliveryResult.ok) {
    if (deliveryResult.error === "not_configured") {
      return NextResponse.json(
        {
          ok: false,
          error: "not_configured",
          message: "Service temporarily unavailable. Please call us directly.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: "delivery",
        message: "Failed to deliver application. Please try again or contact us directly.",
      },
      { status: 502 }
    );
  }

  // 9. Return Success
  return NextResponse.json({ ok: true, ref }, { status: 200 });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed", message: "GET method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function PUT() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed", message: "PUT method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed", message: "DELETE method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed", message: "PATCH method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
