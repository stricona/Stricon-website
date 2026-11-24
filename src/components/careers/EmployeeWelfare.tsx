import {
  Clock,
  CreditCard,
  Building2,
  Trophy,
  HeartPulse,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Container, Reveal, RevealGroup, RevealItem } from "@/components/common";
import { profile } from "@/data/profile";

// Lucide icon mapping corresponding strictly to the 6 deck employee welfare points
const welfareIcons = [
  Clock, // On time Salaries
  CreditCard, // Loans and Advances
  Building2, // Subsidized Accommodation
  Trophy, // Reward & Recognitions activity
  HeartPulse, // Educational & Medical Assistance
  TrendingUp, // Career Growth Path
];

export function EmployeeWelfare() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--surface)] border-b border-[var(--border)]">
      <Container>
        <div className="max-w-2xl mb-12 sm:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--background)] px-3.5 py-1 text-xs font-semibold text-[var(--primary)] mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Staff Support & Growth</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Employee Welfare
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-3 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              We ensure our workforce is supported with transparent remuneration,
              living assistance, and career opportunities under our self delivery model.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {profile.employeeWelfare.map((item, index) => {
            const Icon = welfareIcons[index % welfareIcons.length];
            return (
              <RevealItem key={item}>
                <div className="group h-full rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[var(--primary)]/40 hover:shadow-sm">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] mb-4 transition-colors group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-[var(--foreground)]">
                    {item}
                  </h3>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
