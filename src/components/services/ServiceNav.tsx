import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceItem } from "@/types/service";

interface ServiceNavProps {
  prev: ServiceItem;
  next: ServiceItem;
  className?: string;
}

export function ServiceNav({ prev, next, className = "" }: ServiceNavProps) {
  return (
    <nav
      aria-label="Previous and Next Services"
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-[var(--border)] ${className}`}
    >
      {/* Previous Service Link */}
      <Link
        href={`/services/${prev.slug}`}
        className="group flex items-center gap-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xs hover:border-[var(--primary)] hover:shadow-xs transition-all duration-200 focus-visible:outline-2"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--background)] text-[var(--foreground)] group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)] transition-colors">
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
        </div>
        <div className="overflow-hidden">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Previous Service
          </span>
          <p className="font-heading text-sm sm:text-base font-bold text-[var(--foreground)] truncate mt-0.5">
            {prev.title}
          </p>
        </div>
      </Link>

      {/* Next Service Link */}
      <Link
        href={`/services/${next.slug}`}
        className="group flex items-center justify-between gap-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xs hover:border-[var(--primary)] hover:shadow-xs transition-all duration-200 text-right focus-visible:outline-2 sm:flex-row-reverse"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--background)] text-[var(--foreground)] group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)] transition-colors">
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </div>
        <div className="overflow-hidden">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Next Service
          </span>
          <p className="font-heading text-sm sm:text-base font-bold text-[var(--foreground)] truncate mt-0.5">
            {next.title}
          </p>
        </div>
      </Link>
    </nav>
  );
}
