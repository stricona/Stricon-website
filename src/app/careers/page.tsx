import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, Mail, Briefcase, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { company } from "@/data/company";
import { profile } from "@/data/profile";
import { openings } from "@/data/careers";
import { CAREER_AREA_SLUGS, CareerAreaSlug } from "@/lib/validations";
import { canForwardAttachments } from "@/lib/delivery";
import { Container, MotionProvider, Reveal } from "@/components/common";
import { Breadcrumbs } from "@/components/services";
import {
  EmployeeWelfare,
  RecruitmentStepper,
  HiringAndTraining,
  ApplicationForm,
} from "@/components/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers at STRICON People & Security Services, Hyderabad.",
  alternates: {
    canonical: `${siteConfig.url}/careers`,
  },
  openGraph: {
    title: "Careers | STRICON",
    description: "Careers at STRICON People & Security Services, Hyderabad.",
    url: `${siteConfig.url}/careers`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/logo/emblem.jpg`,
        width: 1024,
        height: 1024,
        alt: "STRICON Shield Emblem",
      },
    ],
  },
};

interface CareersPageProps {
  searchParams: Promise<{ area?: string }>;
}

function CareersJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Careers at STRICON",
    url: `${siteConfig.url}/careers`,
    description: "Careers at STRICON People & Security Services, Hyderabad.",
    publisher: {
      "@type": "Organization",
      name: company.legalName,
      alternateName: company.brandName,
      url: company.contact.website,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

async function ApplicationFormSection({
  searchParams,
  resumeUploadEnabled,
}: {
  searchParams: Promise<{ area?: string }>;
  resumeUploadEnabled: boolean;
}) {
  const { area: queryArea } = await searchParams;

  // Validate area against known slugs silently
  const isValidArea =
    queryArea && CAREER_AREA_SLUGS.includes(queryArea as CareerAreaSlug);
  const validatedArea = isValidArea ? queryArea : undefined;

  return (
    <ApplicationForm
      defaultArea={validatedArea}
      resumeUploadEnabled={resumeUploadEnabled}
    />
  );
}

export default async function CareersPage({ searchParams }: CareersPageProps) {
  // Compute resume upload feature flag on server
  const resumeUploadEnabled =
    process.env.CAREERS_RESUME_UPLOAD === "on" && canForwardAttachments();

  return (
    <MotionProvider>
      <CareersJsonLd />

      {/* 1. Page Hero */}
      <section className="relative overflow-hidden bg-[var(--background)] py-12 sm:py-16 lg:py-20 border-b border-[var(--border)]">
        <Container>
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Careers", href: "/careers" },
              ]}
            />
          </div>

          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--surface)] px-3.5 py-1 text-xs font-semibold text-[var(--primary)] mb-4">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Join Our Team</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
                Careers
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-4 text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
                {profile.aboutParagraphs[3]}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-gold)] px-6 py-3.5 text-sm font-bold text-[var(--accent-gold-foreground)] shadow-xs transition-all hover:brightness-105 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
                >
                  <span>Apply now</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--background)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
                >
                  <span>Our Services</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. Employee Welfare (6 items) */}
      <EmployeeWelfare />

      {/* 3. Recruitment Process (7 steps) */}
      <RecruitmentStepper />

      {/* 4. Hiring & Training Standards */}
      <HiringAndTraining />

      {/* 5. Current Openings (Renders ONLY if openings array is non-empty) */}
      {openings.length > 0 && (
        <section className="py-16 sm:py-24 bg-[var(--background)] border-b border-[var(--border)]">
          <Container>
            <div className="max-w-2xl mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                Current Openings
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Explore active vacancies across our facility management and security divisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {openings.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[var(--foreground)]">
                      {job.title}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--secondary)] mt-1">
                      {job.location}
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] mt-3">
                      {job.summary}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[var(--border)]">
                    <a
                      href={`/careers?area=${job.id}#apply`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] hover:underline"
                    >
                      <span>Apply for this position</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 6. Application Form (id="apply") */}
      <section id="apply" className="py-16 sm:py-24 bg-[var(--background)] scroll-mt-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Suspense
              fallback={
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted-foreground)]">
                  Loading application form...
                </div>
              }
            >
              <ApplicationFormSection
                searchParams={searchParams}
                resumeUploadEnabled={resumeUploadEnabled}
              />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* 7. Questions Band */}
      <section className="py-12 bg-[var(--surface)] border-t border-[var(--border)]">
        <Container>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[var(--foreground)]">
                Have questions about working with STRICON?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
                Connect directly with our recruitment and HR operations team in Hyderabad.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--background)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors"
              >
                <Phone className="h-4 w-4 text-[var(--primary)]" />
                <span>{company.contact.phoneDisplay}</span>
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--secondary)]/40 bg-[var(--surface)] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[var(--secondary)] hover:bg-[var(--secondary)]/10 focus-visible:outline-2 focus-visible:outline-[var(--secondary)] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${company.contact.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--background)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors"
              >
                <Mail className="h-4 w-4 text-[var(--primary)]" />
                <span>{company.contact.email}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </MotionProvider>
  );
}
