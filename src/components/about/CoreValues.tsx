import {
  ShieldCheck,
  Award,
  Target,
  Users,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  RevealGroup,
  RevealItem,
} from "@/components/common";
import { profile } from "@/data/profile";

const valueIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Integrity: ShieldCheck,
  Excellence: Award,
  "Goal-Oriented": Target,
  Teamwork: Users,
  "Continuous Improvement": TrendingUp,
  "Open Communication": MessageSquare,
};

export function CoreValues() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
      <Container>
        <SectionHeading
          eyebrow="Foundational Pillars"
          title="Core Values"
          intro="The fundamental beliefs that guide our actions and decisions every day."
          className="mb-14"
        />

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {profile.coreValues.map((value) => {
            const Icon = valueIcons[value.title] || ShieldCheck;

            return (
              <RevealItem key={value.title} className="h-full">
                <div className="flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7 shadow-xs hover:-translate-y-1 hover:border-[var(--primary)]/40 hover:shadow-md transition-all duration-200">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] mb-5">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[var(--foreground)] mb-3">
                    {value.title}
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
                    {value.text}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
