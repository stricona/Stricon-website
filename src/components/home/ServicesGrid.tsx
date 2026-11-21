import { Cpu, Zap, ClipboardCheck } from "lucide-react";
import {
  Container,
  SectionHeading,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/common";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";
import { profile } from "@/data/profile";

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

        {/* 9 Services Grid reusing shared ServiceCard */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <RevealItem key={service.slug} className="h-full">
              <ServiceCard service={service} />
            </RevealItem>
          ))}
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
