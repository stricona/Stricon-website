"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, Phone, MessageCircle, AlertTriangle } from "lucide-react";
import { phoneHref, whatsappUrl } from "@/config/site";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log safe error digest or message for monitoring in development only
    if (process.env.NODE_ENV !== "production") {
      console.error("ErrorBoundary caught:", error);
    }
  }, [error]);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center justify-center text-center">
      <div className="h-14 w-14 rounded-full bg-[var(--danger)]/10 text-[var(--danger)] flex items-center justify-center mb-6">
        <AlertTriangle className="h-7 w-7" aria-hidden="true" />
      </div>

      <p className="text-xs font-bold text-[var(--danger)] uppercase tracking-wider">
        Notice
      </p>

      <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[var(--color-foreground)]">
        Something went wrong
      </h1>

      <p className="mt-4 text-base text-[var(--color-muted-foreground)] max-w-lg leading-relaxed">
        An unexpected error occurred while loading this page. Please try again, or feel free to contact our team directly for immediate assistance.
      </p>

      {/* Primary actions */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try again</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          <Home className="h-4 w-4" />
          <span>Back to home</span>
        </Link>
      </div>

      {/* Direct Contact Buttons */}
      <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center justify-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with STRICON on WhatsApp"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium text-xs bg-[var(--whatsapp)] text-[var(--whatsapp-foreground)] hover:opacity-95 transition-opacity focus-visible:outline-2"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </a>

        <a
          href={phoneHref}
          aria-label="Call STRICON directly"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium text-xs border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] transition-colors focus-visible:outline-2"
        >
          <Phone className="h-4 w-4" />
          <span>Call Us</span>
        </a>
      </div>
    </div>
  );
}
