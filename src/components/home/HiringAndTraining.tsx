import {
  UserCheck,
  GraduationCap,
  Activity,
  CheckCircle2,
  Heart,
  ChevronRight,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  Reveal,
} from "@/components/common";
import { profile } from "@/data/profile";

export function HiringAndTraining() {
  const hiringStrength = profile.strengths.find((s) => s.category === "Hiring");
  const trainingStrength = profile.strengths.find(
    (s) => s.category === "Training"
  );
  const operationsStrength = profile.strengths.find(
    (s) => s.category === "Operations"
  );

  const pillars = [
    {
      stage: "01",
      title: "Stringent Hiring",
      icon: UserCheck,
      items: hiringStrength?.items || [],
      description:
        "Multi-layer background and police verification to ensure reliable personnel integrity.",
    },
    {
      stage: "02",
      title: "Rigorous Training",
      icon: GraduationCap,
      items: trainingStrength?.items || [],
      description:
        "Conducted by certified instructors covering standard operating procedures and emergency preparedness.",
    },
    {
      stage: "03",
      title: "Disciplined Operations",
      icon: Activity,
      items: operationsStrength?.items || [],
      description:
        "Supported by continuous management oversight, CRM coordination, and scheduled day/night visits.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[var(--background)]">
      <Container>
        <SectionHeading
          eyebrow="People & Operational Excellence"
          title="Hiring, Training & Operational Discipline"
          intro="Our self-delivery model ensures every deployed individual meets rigorous standards of capability, compliance, and conduct."
          className="mb-16"
        />

        {/* 3-Stage Operational Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.stage} delay={idx * 0.15}>
                <div className="relative flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs hover:border-[var(--primary)]/40 transition-colors">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold font-heading text-[var(--secondary)]">
                      {pillar.stage}
                    </span>
                    <div className="h-12 w-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[var(--foreground)] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mb-6 leading-relaxed">
                    {pillar.description}
                  </p>

                  <ul className="space-y-2.5 mt-auto pt-4 border-t border-[var(--border)] text-xs sm:text-sm text-[var(--foreground)]">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--secondary)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Continuous Training Modules */}
        <Reveal delay={0.2} className="mb-16">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <h4 className="font-heading text-lg font-bold text-[var(--foreground)] mb-2">
              Continuous On-Site Training Modules
            </h4>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mb-6">
              Personnel undergo regular refresher sessions to keep protocols sharp and up-to-date.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {profile.continuousTrainingTopics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--secondary)]/30 bg-[var(--secondary)]/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[var(--foreground)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)]" />
                  <span>{topic}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 7-Step Recruitment Stepper */}
        <Reveal delay={0.3} className="mb-16">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <h4 className="font-heading text-lg font-bold text-[var(--foreground)] mb-2">
              Structured 7-Step Recruitment Process
            </h4>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mb-6">
              Every recruit completes a formalized sequence before site deployment.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {profile.recruitmentProcess.map((step, idx) => (
                <div
                  key={step}
                  className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5 text-center relative"
                >
                  <span className="text-xs font-bold text-[var(--primary)] mb-1">
                    Step {idx + 1}
                  </span>
                  <p className="text-xs font-medium text-[var(--foreground)] leading-tight">
                    {step}
                  </p>
                  {idx < profile.recruitmentProcess.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[var(--muted-foreground)]">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Employee Welfare Row */}
        <Reveal delay={0.4}>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-2">
              <Heart className="h-5 w-5 text-red-500" />
              <h4 className="font-heading text-lg font-bold text-[var(--foreground)]">
                Employee Welfare & Retention
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mb-6">
              High employee satisfaction directly translates to dependable, disciplined site operations.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {profile.employeeWelfare.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 text-xs font-medium text-[var(--foreground)]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--accent-gold)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
