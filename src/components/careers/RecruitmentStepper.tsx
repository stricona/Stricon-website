import { UserCheck } from "lucide-react";
import { Container, Reveal, RevealGroup, RevealItem } from "@/components/common";
import { profile } from "@/data/profile";

export function RecruitmentStepper() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--background)] border-b border-[var(--border)]">
      <Container>
        <div className="max-w-2xl mb-12 sm:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--secondary)]/30 bg-[var(--surface)] px-3.5 py-1 text-xs font-semibold text-[var(--secondary)] mb-4">
              <UserCheck className="h-3.5 w-3.5" />
              <span>Hiring Methodology</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Recruitment Process
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-3 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              Our structured 7-step hiring pipeline guarantees thoroughly vetted, competent personnel deployed across client facilities.
            </p>
          </Reveal>
        </div>

        {/* Desktop Horizontal Stepper (lg:grid) */}
        <div className="hidden lg:block">
          <RevealGroup className="grid grid-cols-7 gap-3 relative">
            {profile.recruitmentProcess.map((step, idx) => {
              const stepNumber = idx + 1;
              const isLast = idx === profile.recruitmentProcess.length - 1;
              return (
                <RevealItem key={step}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* Connector line between steps */}
                    {!isLast && (
                      <div
                        className="absolute top-5 left-1/2 w-full h-[2px] bg-[var(--border)] z-0"
                        aria-hidden="true"
                      />
                    )}

                    {/* Step Number Badge */}
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-[var(--surface)] text-sm font-bold text-[var(--primary)] shadow-xs transition-colors hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]">
                      {stepNumber}
                    </div>

                    {/* Step Title Card */}
                    <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 w-full min-h-[96px] flex items-center justify-center shadow-xs">
                      <p className="font-heading text-xs font-semibold leading-snug text-[var(--foreground)]">
                        {step}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        {/* Mobile & Tablet Vertical Stepper */}
        <div className="lg:hidden">
          <div className="relative border-l-2 border-[var(--border)] ml-5 pl-6 space-y-6 sm:space-y-8">
            {profile.recruitmentProcess.map((step, idx) => {
              const stepNumber = idx + 1;
              return (
                <Reveal key={step} delay={idx * 0.08}>
                  <div className="relative">
                    {/* Circle badge absolute on the vertical border */}
                    <div
                      className="absolute -left-6 -translate-x-1/2 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-[var(--surface)] text-xs font-bold text-[var(--primary)] shadow-xs"
                      aria-hidden="true"
                    >
                      {stepNumber}
                    </div>

                    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xs">
                      <span className="text-[11px] font-bold text-[var(--primary)] uppercase tracking-wider block mb-1">
                        Step {stepNumber}
                      </span>
                      <h3 className="font-heading text-sm sm:text-base font-semibold text-[var(--foreground)]">
                        {step}
                      </h3>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
