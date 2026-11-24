import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { deliverEnquiry } from "@/lib/delivery";

function generateRef(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `STR-${dateStr}-${randomPart}`;
}

function sanitizeSingleLine(str: string): string {
  return str.replace(/[\r\n\t]/g, " ").trim();
}

function verifySameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Non-browser / same-origin without header

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
  // 1. Check Content-Type & Payload size (max 10 KB)
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, error: "invalid_request", message: "Content-Type must be application/json" },
      { status: 400 }
    );
  }

  const rawBody = await request.text();
  if (rawBody.length > 10 * 1024) {
    return NextResponse.json(
      { ok: false, error: "invalid_request", message: "Payload exceeds 10 KB size limit" },
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

  // Parse JSON
  let bodyJson: unknown;
  try {
    bodyJson = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_request", message: "Invalid JSON format" },
      { status: 400 }
    );
  }

  if (!bodyJson || typeof bodyJson !== "object") {
    return NextResponse.json(
      { ok: false, error: "invalid_request", message: "Invalid request payload" },
      { status: 400 }
    );
  }

  const data = bodyJson as Record<string, unknown>;

  // 3. Bot Protection: Honeypot & Submission Timing
  const websiteHoneypot = typeof data.website === "string" ? data.website.trim() : "";
  const startedAt = typeof data.startedAt === "number" ? data.startedAt : null;
  const now = Date.now();

  const isHoneypotFilled = websiteHoneypot.length > 0;
  const isTimingSuspicious =
    startedAt === null ||
    startedAt > now || // Future timestamp
    now - startedAt < 2500; // Under 2.5 seconds

  if (isHoneypotFilled || isTimingSuspicious) {
    // Return fake success response to bot without executing delivery
    const fakeRef = generateRef();
    return NextResponse.json({ ok: true, ref: fakeRef });
  }

  // 4. Rate Limit (5 requests per 10 minutes per IP)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  const rateLimit = checkRateLimit(clientIp, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate_limited",
        message: "Too many attempts. Please try again later or call us.",
      },
      { status: 429 }
    );
  }

  // 5. Validation with shared schema
  const parseResult = enquirySchema.safeParse(data);
  if (!parseResult.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parseResult.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return NextResponse.json(
      { ok: false, errors: fieldErrors },
      { status: 400 }
    );
  }

  const validEnquiry = parseResult.data;

  // 6. Header injection prevention: sanitize single-line fields
  validEnquiry.name = sanitizeSingleLine(validEnquiry.name);
  if (validEnquiry.company) validEnquiry.company = sanitizeSingleLine(validEnquiry.company);
  validEnquiry.phone = sanitizeSingleLine(validEnquiry.phone);
  validEnquiry.email = sanitizeSingleLine(validEnquiry.email);
  validEnquiry.location = sanitizeSingleLine(validEnquiry.location);
  if (validEnquiry.manpower) validEnquiry.manpower = sanitizeSingleLine(validEnquiry.manpower);

  // 7. Reference generation
  const ref = generateRef();
  const timestamp = new Date().toISOString();

  // 8. Delivery
  const deliveryResult = await deliverEnquiry({
    enquiry: validEnquiry,
    ref,
    timestamp,
    page: "/contact",
  });

  if (!deliveryResult.ok) {
    if (deliveryResult.error === "not_configured") {
      return NextResponse.json(
        { ok: false, error: "not_configured", message: "Delivery channel is not configured in production." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "delivery" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, ref });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "invalid_request", message: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function PUT() {
  return NextResponse.json(
    { ok: false, error: "invalid_request", message: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { ok: false, error: "invalid_request", message: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
