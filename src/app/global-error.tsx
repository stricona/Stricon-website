"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, Phone, MessageCircle, AlertTriangle } from "lucide-react";
import { phoneHref, whatsappUrl } from "@/config/site";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("GlobalError caught:", error);
    }
  }, [error]);

  return (
    <html lang="en-IN">
      <body className="min-h-screen flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)] antialiased">
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center py-16">
            <div className="mx-auto h-14 w-14 rounded-full bg-[var(--danger)]/10 text-[var(--danger)] flex items-center justify-center mb-6">
              <AlertTriangle className="h-7 w-7" aria-hidden="true" />
            </div>

            <p className="text-xs font-bold text-[var(--danger)] uppercase tracking-wider">
              System Error
            </p>

            <h1 className="mt-2 text-3xl font-heading font-bold text-[var(--foreground)]">
              Something went wrong
            </h1>

            <p className="mt-4 text-sm text-[var(--muted-foreground)] leading-relaxed">
              An unexpected error occurred. Please try reloading the page or contact our team directly.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity focus-visible:outline-2 cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try again</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--primary)] transition-colors focus-visible:outline-2"
              >
                <Home className="h-4 w-4" />
                <span>Back to home</span>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--border)] flex flex-wrap items-center justify-center gap-3">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium text-xs border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--primary)] transition-colors focus-visible:outline-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
