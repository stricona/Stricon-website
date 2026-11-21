import { ArrowRight, MessageCircle, Phone, MapPin, Clock } from "lucide-react";
import { Container, ButtonLink, Reveal } from "@/components/common";
import { homeContent } from "@/data/home";
import { siteConfig } from "@/config/site";
import { company } from "@/data/company";

export function FinalCta() {
  const { finalCta } = homeContent;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-[var(--primary)] text-[var(--primary-foreground)]">
      {/* Decorative background ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[var(--accent-gold)]/10 blur-3xl" />
      </div>

      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Reveal>
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)]">
              {finalCta.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {finalCta.title}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg leading-relaxed text-white/90 max-w-2xl mx-auto">
              {finalCta.description}
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <ButtonLink
                href={finalCta.ctaPrimary.href}
                variant="gold"
                size="lg"
                className="shadow-lg"
              >
                <span>{finalCta.ctaPrimary.label}</span>
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-emerald-500 transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <Phone className="h-5 w-5" />
                <span>Call {siteConfig.links.phoneDisplay}</span>
              </a>
            </div>
          </Reveal>

          {/* Location & Hours Micro-bar */}
          <Reveal delay={0.4}>
            <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-white/80">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--accent-gold)]" />
                <span className="line-clamp-1">{siteConfig.address}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <Clock className="h-4 w-4 shrink-0 text-[var(--accent-gold)]" />
                <span>Working Hours: {company.workingHours.display}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
