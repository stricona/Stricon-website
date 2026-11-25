"use client";

import { useSearchParams } from "next/navigation";
import { Layers } from "lucide-react";
import { getServiceBySlug } from "@/data/services";
import { SERVICE_SLUGS, ServiceSlugOption } from "@/lib/validations";
import { QuoteForm } from "./QuoteForm";

export function ContactFormWrapper() {
  const searchParams = useSearchParams();
  const queryService = searchParams ? searchParams.get("service") : null;

  const isValidSlug =
    queryService && SERVICE_SLUGS.includes(queryService as ServiceSlugOption);
  const validatedSlug = isValidSlug ? queryService : undefined;
  const matchedService = validatedSlug ? getServiceBySlug(validatedSlug) : undefined;

  return (
    <>
      {matchedService && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[var(--primary)]">
          <Layers className="h-4 w-4" />
          <span>Enquiry about: {matchedService.title}</span>
        </div>
      )}

      <QuoteForm defaultService={validatedSlug} />
    </>
  );
}
