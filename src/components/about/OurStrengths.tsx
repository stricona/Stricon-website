import {
  UserCheck,
  GraduationCap,
  Activity,
  ShieldCheck,
  HeartHandshake,
  Check,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  RevealGroup,
  RevealItem,
} from "@/components/common";
import { profile } from "@/data/profile";

const strengthIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Hiring: UserCheck,
  Training: GraduationCap,
  Operations: Activity,
  Compliance: ShieldCheck,
  Welfare: HeartHandshake,
};

export function OurStrengths() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
      <Container>
        <SectionHeading
          eyebrow="Operating Capabilities"
          title="Our Strengths"
          intro="Systematic management and operational rigor across every aspect of service delivery."
          className="mb-14"
        />

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {profile.strengths.map((group) => {
            const Icon = strengthIcons[group.category] || ShieldCheck;

            return (
              <RevealItem key={group.category} className="h-full">
                <div className="flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7 shadow-xs hover:border-[var(--primary)]/40 hover:shadow-sm transition-all duration-200">
                  <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-[var(--border)]">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[var(--foreground)]">
                      {group.category}
                    </h3>
                  </div>

                  <ul className="space-y-3 flex-1">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--foreground)] font-medium"
                      >
                        <div className="h-5 w-5 rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
