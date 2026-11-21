import { NextResponse } from "next/server";
import { validateContactEnquiry } from "@/lib/validations";
import { ContactEnquiry, ApiResponse } from "@/types/enquiry";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Request body cannot be empty.",
        },
        { status: 400 }
      );
    }

    const enquiry = body as Partial<ContactEnquiry>;
    const validation = validateContactEnquiry(enquiry);

    if (!validation.valid) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Validation failed. Please verify required fields.",
          errors: validation.errors,
        },
        { status: 422 }
      );
    }

    // STUB ONLY: Phase 1 placeholder response (no DB or email)
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Enquiry received successfully (stub response).",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Invalid JSON in request body.",
      },
      { status: 400 }
    );
  }
}
