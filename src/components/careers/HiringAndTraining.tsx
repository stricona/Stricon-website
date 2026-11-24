import { ShieldCheck, GraduationCap, CheckCircle2, Award } from "lucide-react";
import { Container, Reveal } from "@/components/common";
import { profile } from "@/data/profile";

export function HiringAndTraining() {
  const hiringStrength = profile.strengths.find((s) => s.category === "Hiring");
  const trainingStrength = profile.strengths.find((s) => s.category === "Training");

  return (
    <section className="py-16 sm:py-24 bg-[var(--surface)] border-b border-[var(--border)]">
      <Container>
        <div className="max-w-2xl mb-12 sm:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--background)] px-3.5 py-1 text-xs font-semibold text-[var(--primary)] mb-4">
              <Award className="h-3.5 w-3.5" />
              <span>Operational Excellence</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Hiring & Training Standards
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-3 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              Every staff member undergoes stringent background screening, continuous skill enhancement, and compliance induction.
            </p>
          </Reveal>
        </div>

        {/* 2 Strength Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Hiring Strength */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[var(--foreground)]">
                    Hiring Strengths
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Rigorous vetting and multi-tier background validation
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {(hiringStrength?.items || []).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Training Strength */}
          <Reveal delay={0.2}>
            <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[var(--foreground)]">
                    Training Strengths
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Domain instruction by certified professional trainers
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {(trainingStrength?.items || []).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Continuous Training Chips */}
        <Reveal delay={0.3}>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              Continuous Training to the On-Site Staff
            </h4>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">
              Regular refresher modules delivered to deployed teams across Hyderabad facilities.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {profile.continuousTrainingTopics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[var(--foreground)] shadow-2xs"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)]" />
                  <span>{topic}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
