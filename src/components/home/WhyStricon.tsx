import {
  Banknote,
  TrendingUp,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  FileCheck,
  Smile,
  Building2,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  RevealGroup,
  RevealItem,
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

// Contextual descriptions aligned strictly with the profile data
const advantageDescriptions: Record<string, string> = {
  "Value for money":
    "Optimised operational costs and transparent commercial structures designed to maximise facility ROI.",
  "Operational excellence":
    "Day and night inspection visits, risk re-assessments, and management reviews ensuring continuous site discipline.",
  "Rigorous training":
    "Expert certified trainers covering site-specific SOPs, emergency response, soft skills, and fire safety drills.",
  "Employee welfare":
    "On-time salaries, subsidized accommodation, rewards & recognition, and medical/educational assistance for staff.",
  "Value added services":
    "Quick Response Team support, reviews & audits, and operational technology deployment across client sites.",
  "Statutory compliance":
    "Strict adherence to PSARA standards, labor regulations, documentation, and regular statutory audits.",
  "Customer satisfaction":
    "Dedicated CRM backend support and client management reviews committed to consistently meeting expectations.",
  "All people solutions under one roof":
    "Integrated management of security, housekeeping, support staff, payroll, and technical operations from one partner.",
};

export function WhyStricon() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--background)]">
      <Container>
        <SectionHeading
          eyebrow="Why Choose STRICON"
          title="The STRICON Operational Advantage"
          intro="Built on disciplined processes, in-house team delivery, and unwavering commitment to compliance and quality."
          className="mb-14"
        />

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.whyStricon.map((title, idx) => {
            const Icon = advantageIcons[idx % advantageIcons.length];
            const description =
              advantageDescriptions[title] ||
              "Committed to operational discipline and client satisfaction.";

            return (
              <RevealItem key={title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xs hover:border-[var(--primary)]/40 hover:shadow-xs transition-all duration-200">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-[var(--foreground)] mb-2">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {description}
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
