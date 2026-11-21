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
  Cpu,
  Zap,
  ClipboardCheck,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/common";
import { services } from "@/data/services";
import { profile } from "@/data/profile";

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

const valueAddedIcons = [Cpu, Zap, ClipboardCheck];

export function ServicesGrid() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--background)]">
      <Container>
        <SectionHeading
          eyebrow="Our Core Capabilities"
          title="Facility Management & Security Services"
          intro="Delivered through our self-delivery model with trained, professional in-house teams and strict statutory compliance."
          className="mb-14"
        />

        {/* 9 Services Grid */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || ShieldCheck;
            const previewServices = service.includedServices.slice(0, 3);
            const remainingCount = service.includedServices.length - 3;

            return (
              <RevealItem key={service.slug} className="h-full">
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/50 hover:shadow-md">
                  <div>
                    {/* Icon Box */}
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] transition-colors group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)]">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-bold text-[var(--foreground)] mb-2.5">
                      {service.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm leading-relaxed text-[var(--muted-foreground)] mb-5">
                      {service.summary}
                    </p>

                    {/* Included Services Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {previewServices.map((item) => (
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
                  </div>

                  {/* Single Action Link */}
                  <div className="pt-2 border-t border-[var(--border)]">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors focus-visible:outline-2"
                    >
                      <span>Explore service details</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Value-Added Services Row */}
        <div className="mt-14">
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--surface)] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary)]">
                    Enhanced Delivery
                  </span>
                  <h4 className="font-heading text-xl font-bold text-[var(--foreground)] mt-1">
                    Value-Added Operational Capabilities
                  </h4>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">
                    Integrated across all client engagements at no compromise to standard operational rigor.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
                  {profile.valueAddedServices.map((vas, idx) => {
                    const VasIcon = valueAddedIcons[idx % valueAddedIcons.length];
                    return (
                      <div
                        key={vas}
                        className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-xs sm:text-sm font-medium text-[var(--foreground)]"
                      >
                        <VasIcon className="h-4 w-4 shrink-0 text-[var(--accent-gold)]" />
                        <span>{vas}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
