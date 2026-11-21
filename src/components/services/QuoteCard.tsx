import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/common";
import { siteConfig, quoteHref, whatsappUrlForService, phoneHref } from "@/config/site";
import { ServiceItem } from "@/types/service";

interface QuoteCardProps {
  service?: ServiceItem;
  className?: string;
}

export function QuoteCard({ service, className = "" }: QuoteCardProps) {
  const quoteUrl = quoteHref(service?.slug);
  const waUrl = service
    ? whatsappUrlForService(service.title)
    : siteConfig.whatsappUrl;

  return (
    <div
      className={`rounded-2xl border border-[var(--primary)]/20 bg-[var(--surface)] p-6 shadow-sm space-y-4 ${className}`}
    >
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary)]">
          Direct Consultation
        </span>
        <h3 className="font-heading text-lg font-bold text-[var(--foreground)] mt-1">
          {service ? `Request ${service.title}` : "Request a Proposal"}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1 leading-relaxed">
          Speak directly with our operations team for a site assessment and transparent commercial plan.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 pt-2">
        <ButtonLink href={quoteUrl} variant="gold" size="md" className="w-full">
          <span>Get a Quote</span>
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 transition-colors focus-visible:outline-2"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp Enquiry</span>
        </a>

        <a
          href={phoneHref}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors focus-visible:outline-2"
        >
          <Phone className="h-4 w-4 text-[var(--secondary)]" />
          <span>Call {siteConfig.links.phoneDisplay}</span>
        </a>
      </div>
    </div>
  );
}
