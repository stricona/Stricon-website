import { CheckCircle2, Layers, ArrowRight } from "lucide-react";
import { Container, ButtonLink, Reveal, SectionHeading } from "@/components/common";
import { profile } from "@/data/profile";
import { integratedServices } from "@/data/services";

export function IfmVertical() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--background)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Integrated Solutions"
            title="Integrated Facility Management Vertical"
            align="left"
            className="mb-10"
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Statement, Bundling Note, and CTA */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
                {profile.integratedFacilityManagementStatement}
              </p>
            </Reveal>

            {/* Bundling note in a bordered callout */}
            <Reveal delay={0.2}>
              <div className="rounded-xl border-l-4 border-[var(--secondary)] border border-[var(--border)] bg-[var(--surface)] p-5 text-sm sm:text-base leading-relaxed text-[var(--foreground)]">
                <p className="text-[var(--muted-foreground)]">
                  {profile.bundlingNote}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="pt-2">
                <ButtonLink href="/services" variant="primary" size="md">
                  <span>View all services</span>
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 16 Integrated Services Checklist */}
          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[var(--border)]">
                  <Layers className="h-5 w-5 text-[var(--secondary)] shrink-0" />
                  <h3 className="font-heading text-lg font-bold text-[var(--foreground)]">
                    All 16 Integrated Services
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {integratedServices.map((service) => (
                    <div
                      key={service}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--foreground)] font-medium"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                      <span className="leading-tight">{service}</span>
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
