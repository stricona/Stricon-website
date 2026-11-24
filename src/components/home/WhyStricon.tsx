import Link from "next/link";
import {
  Banknote,
  TrendingUp,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  FileCheck,
  Smile,
  Building2,
  ArrowRight,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  RevealGroup,
  RevealItem,
  Reveal,
} from "@/components/common";
import { profile } from "@/data/profile";

const advantageIcons = [
  Banknote,
  TrendingUp,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  FileCheck,
  Smile,
  Building2,
];

export function WhyStricon() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--background)]">
      <Container>
        <SectionHeading
          eyebrow="Key Highlights"
          title="To Sum Up – Why STRICON?"
          intro="Our core operating differentiators and value pillars delivered across every client engagement."
          className="mb-14"
        />

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.whyStricon.map((title, idx) => {
            const Icon = advantageIcons[idx % advantageIcons.length];

            return (
              <RevealItem key={title} className="h-full">
                <div className="flex h-full items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xs hover:border-[var(--primary)]/40 hover:shadow-xs transition-all duration-200">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-[var(--foreground)] leading-snug">
                    {title}
                  </h3>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Link to /about */}
        <div className="mt-12 text-center">
          <Reveal delay={0.2}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--primary)]/30 bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors focus-visible:outline-2"
            >
              <span>Learn more about us</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
