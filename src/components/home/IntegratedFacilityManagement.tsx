import { CheckCircle2, Layers, ArrowRight } from "lucide-react";
import { Container, ButtonLink, Reveal } from "@/components/common";
import { profile } from "@/data/profile";
import { integratedServices } from "@/data/services";

export function IntegratedFacilityManagement() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: IFM Statement & Bundling */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--secondary)]/30 bg-[var(--background)] px-3.5 py-1 text-xs font-semibold text-[var(--secondary)]">
                <Layers className="h-3.5 w-3.5" />
                <span>Integrated Facility Management</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl">
                Unified Operations. Tailored for Your Facility.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
                {profile.integratedFacilityManagementStatement}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="rounded-xl border border-[var(--primary)]/20 bg-[var(--background)] p-5 text-sm text-[var(--foreground)] leading-relaxed">
                <p className="font-semibold text-[var(--primary)] mb-1">
                  Flexible Bundled Solutions
                </p>
                <p className="text-[var(--muted-foreground)]">
                  {profile.bundlingNote}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="pt-2">
                <ButtonLink href="/contact" variant="primary" size="md">
                  <span>Enquire About Bundled Services</span>
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 2-column checklist of all 16 integrated services */}
          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8 shadow-xs">
                <h3 className="font-heading text-lg font-bold text-[var(--foreground)] mb-4 pb-3 border-b border-[var(--border)]">
                  All 16 Integrated Facility & Security Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {integratedServices.map((serviceName) => (
                    <div
                      key={serviceName}
                      className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-xs sm:text-sm font-medium text-[var(--foreground)] shadow-2xs hover:border-[var(--primary)]/40 transition-colors"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--secondary)]" />
                      <span>{serviceName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
