import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import {
  ShieldCheck,
  Building,
  Users,
  CheckCircle2,
  ArrowRight,
  Layers,
  Cpu,
  Zap,
  ClipboardCheck,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  ButtonLink,
  RevealGroup,
  RevealItem,
  MotionProvider,
} from "@/components/common";
import { PageHero, ServiceCard } from "@/components/services";
import { FinalCta } from "@/components/home/FinalCta";
import { services, serviceCategories, integratedServices } from "@/data/services";
import { profile } from "@/data/profile";
import { ServiceGroupCategory } from "@/types/service";

export const metadata: Metadata = constructMetadata({
  title: "Our Services",
  description:
    "Facility management and security services in Hyderabad by STRICON. Professional guarding, mechanised housekeeping, technical maintenance, and manpower solutions.",
  path: "/services",
});

const categoryOrder: ServiceGroupCategory[] = [
  "security",
  "facility",
  "manpower",
];

const categoryIcons: Record<
  ServiceGroupCategory,
  React.ComponentType<{ className?: string }>
> = {
  security: ShieldCheck,
  facility: Building,
  manpower: Users,
};

const valueAddedIcons = [Cpu, Zap, ClipboardCheck];

const howWeWorkCards = [
  {
    title: "Self Delivery Model with In-House Teams",
    description:
      "We do not subcontract core responsibilities; our trained, directly employed staff ensure consistent operational quality.",
  },
  {
    title: "Customized Management Plans",
    description:
      "Recognizing that every facility has unique operational needs, we develop tailored site schedules and standard operating procedures.",
  },
  {
    title: "Continuous Training of On-Site Staff",
    description:
      "Regular training sessions cover site-specific SOPs, emergency response, behavioral soft skills, and compliance requirements.",
  },
  {
    title: "Reviews and Audits",
    description:
      "Scheduled day and night visits, risk re-assessments, and transparent management reviews maintain performance benchmarks.",
  },
];

export default function ServicesPage() {
  return (
    <MotionProvider>
      <div className="flex flex-col w-full">
        {/* 1. PageHero */}
        <PageHero
          title="Our Services"
          intro="Facility management and security services, offered individually, bundled, or fully integrated and customized to your needs."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
        />

        {/* Jump-Links Navigation Bar */}
        <nav
          aria-label="Service categories jump links"
          className="sticky top-16 z-20 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md py-3 shadow-2xs"
        >
          <Container>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm font-semibold">
              <span className="text-[var(--muted-foreground)] mr-1 hidden sm:inline">
                Jump to:
              </span>
              {categoryOrder.map((catKey) => {
                const meta = serviceCategories[catKey];
                const Icon = categoryIcons[catKey];
                return (
                  <a
                    key={catKey}
                    href={`#${catKey}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--background)] px-3.5 py-1.5 text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors focus-visible:outline-2"
                  >
                    <Icon className="h-3.5 w-3.5 text-[var(--secondary)]" />
                    <span>{meta.name}</span>
                  </a>
                );
              })}
            </div>
          </Container>
        </nav>

        {/* 2. Category Sections */}
        <div className="py-12 sm:py-16 space-y-20 bg-[var(--background)]">
          {categoryOrder.map((catKey) => {
            const catMeta = serviceCategories[catKey];
            const catServices = services.filter((s) => s.category === catKey);

            return (
              <section
                key={catKey}
                id={catKey}
                className="scroll-mt-32"
              >
                <Container>
                  <div className="mb-10 max-w-3xl">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary)]">
                      Domain Category
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--foreground)] mt-1">
                      {catMeta.name}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                      {catMeta.description}
                    </p>
                  </div>

                  <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {catServices.map((service) => (
                      <RevealItem key={service.slug} className="h-full">
                        <ServiceCard service={service} />
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </Container>
              </section>
            );
          })}
        </div>

        {/* 3. Integrated Facility Management Band */}
        <section className="py-16 sm:py-20 bg-[var(--surface)] border-y border-[var(--border)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--secondary)]/30 bg-[var(--background)] px-3.5 py-1 text-xs font-semibold text-[var(--secondary)]">
                  <Layers className="h-3.5 w-3.5" />
                  <span>Integrated Facility Management</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                  Unified Facility Support Tailored for Your Core Business
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
                  {profile.integratedFacilityManagementStatement}
                </p>
                <div className="rounded-xl border border-[var(--primary)]/20 bg-[var(--background)] p-4 text-xs sm:text-sm text-[var(--muted-foreground)]">
                  <p className="font-semibold text-[var(--primary)] mb-1">
                    Bundling Options
                  </p>
                  <p>{profile.bundlingNote}</p>
                </div>
                <div>
                  <ButtonLink href="/contact" variant="primary" size="md">
                    <span>Enquire About Bundled Services</span>
                    <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-xs">
                  <h3 className="font-heading text-base font-bold text-[var(--foreground)] mb-4 pb-3 border-b border-[var(--border)]">
                    All 16 Integrated Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {integratedServices.map((name) => (
                      <div
                        key={name}
                        className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2.5 text-xs font-medium text-[var(--foreground)] shadow-2xs"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--secondary)]" />
                        <span className="line-clamp-1">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. Value-Added Services */}
        <section className="py-16 sm:py-20 bg-[var(--background)]">
          <Container>
            <SectionHeading
              eyebrow="Value-Added Operations"
              title="Enhanced Support Across Deployments"
              intro="Complementary operational safeguards integrated seamlessly across all client engagements."
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {profile.valueAddedServices.map((vas, idx) => {
                const Icon = valueAddedIcons[idx % valueAddedIcons.length];
                return (
                  <div
                    key={vas}
                    className="flex flex-col items-center text-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 shadow-xs hover:border-[var(--primary)]/40 transition-colors"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold-foreground)]">
                      <Icon className="h-6 w-6 text-[var(--accent-gold)]" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-[var(--foreground)]">
                      {vas}
                    </h3>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* 5. How We Work */}
        <section className="py-16 sm:py-20 bg-[var(--surface)] border-t border-[var(--border)]">
          <Container>
            <SectionHeading
              eyebrow="Delivery Principles"
              title="How STRICON Works"
              intro="Our proven operating principles govern every site transition, team deployment, and ongoing operation."
              className="mb-12"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howWeWorkCards.map((card, idx) => (
                <div
                  key={card.title}
                  className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-2xs"
                >
                  <span className="text-xs font-bold text-[var(--primary)] mb-2">
                    Principle 0{idx + 1}
                  </span>
                  <h3 className="font-heading text-base font-bold text-[var(--foreground)] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 6. Final CTA */}
        <FinalCta />
      </div>
    </MotionProvider>
  );
}
