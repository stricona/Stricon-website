import { GraduationCap, HeartHandshake, CheckCircle2, ArrowRight } from "lucide-react";
import { Container, ButtonLink, Reveal } from "@/components/common";
import { profile } from "@/data/profile";

export function TrainingAndWelfare() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--background)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          {/* Continuous Training Column */}
          <Reveal delay={0.1} className="h-full">
            <div className="flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 shadow-xs">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                    Continuous Training to the on-site staff
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                    Standardized readiness programs for field personnel
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2 flex-1 items-start">
                {profile.continuousTrainingTopics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[var(--foreground)] shadow-2xs hover:border-[var(--secondary)]/50 transition-colors"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Employee Welfare Column */}
          <Reveal delay={0.2} className="h-full">
            <div className="flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 shadow-xs justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-gold)]/20 text-[var(--foreground)]">
                    <HeartHandshake className="h-6 w-6 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                      Employee Welfare
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                      People-first commitments supporting our workforce
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {profile.employeeWelfare.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--foreground)] font-medium"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                      <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <ButtonLink href="/careers" variant="outline" size="md">
                  <span>Careers</span>
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
