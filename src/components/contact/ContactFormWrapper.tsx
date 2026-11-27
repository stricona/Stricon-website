
"use client";

import { useSearchParams } from "next/navigation";
import { Layers, ArrowRight } from "lucide-react";

import { getServiceBySlug } from "@/data/services";
import {
  SERVICE_SLUGS,
  type ServiceSlugOption,
} from "@/lib/validations";

import { QuoteForm } from "./QuoteForm";

export function ContactFormWrapper() {
  const searchParams = useSearchParams();

  const queryService = searchParams.get("service");

  const isValidSlug =
    queryService &&
    SERVICE_SLUGS.includes(queryService as ServiceSlugOption);

  const validatedSlug = isValidSlug ? queryService as ServiceSlugOption : undefined;

  const matchedService = validatedSlug
    ? getServiceBySlug(validatedSlug)
    : undefined;

  return (
    <div className="space-y-5">

      {/* PRESELECTED SERVICE INDICATOR */}
      {matchedService && (
        <div className="relative overflow-hidden rounded-xl border border-[var(--primary)]/25 bg-[var(--primary)]/[0.06] p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
              <Layers size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold tracking-widest text-[var(--primary)]">
                SELECTED SERVICE
              </span>

              <p className="mt-1 truncate text-sm font-bold text-[var(--foreground)]">
                {matchedService.title}
              </p>
            </div>

            <ArrowRight
              size={18}
              className="shrink-0 text-[var(--primary)]"
            />
          </div>
        </div>
      )}

      {/* EXISTING QUOTE FORM */}
      <QuoteForm defaultService={validatedSlug} />

    </div>
  );
}
