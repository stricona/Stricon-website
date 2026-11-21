import { NextResponse } from "next/server";
import { validateCareerApplication } from "@/lib/validations";
import { CareerApplication, ApiResponse } from "@/types/enquiry";

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

    const application = body as Partial<CareerApplication>;
    const validation = validateCareerApplication(application);

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
        message: "Application received successfully (stub response).",
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
