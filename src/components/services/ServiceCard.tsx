import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Wrench,
  Users,
  Bug,
  Trees,
  Brush,
  UserCheck,
  Coffee,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { ServiceItem } from "@/types/service";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Sparkles,
  Wrench,
  Users,
  Bug,
  Trees,
  Brush,
  UserCheck,
  Coffee,
};

interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

export function ServiceCard({ service, className = "" }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || ShieldCheck;
  const previewItems = service.includes.slice(0, 3);
  const remainingCount = service.includes.length - 3;

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group relative flex h-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
    >
      <div>
        {/* Icon Tile */}
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] transition-colors group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)]">
          <Icon className="h-6 w-6" />
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-[var(--foreground)] mb-2.5 group-hover:text-[var(--primary)] transition-colors">
          {service.title}
        </h3>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)] mb-5">
          {service.shortSummary}
        </p>

        {/* Included Services Tags */}
        {previewItems.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {previewItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 rounded-md bg-[var(--background)] px-2.5 py-1 text-xs font-medium text-[var(--foreground)] border border-[var(--border)]"
              >
                <CheckCircle2 className="h-3 w-3 text-[var(--secondary)]" />
                <span>{item}</span>
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="inline-flex items-center rounded-md bg-[var(--primary)]/10 px-2 py-1 text-xs font-medium text-[var(--primary)]">
                +{remainingCount} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Arrow Link Indicator */}
      <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-sm font-semibold text-[var(--primary)]">
        <span>Explore service details</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
