import Image from "next/image";
import { Shield, ArrowRight } from "lucide-react";
import { Container, ButtonLink, Reveal } from "@/components/common";
import { Breadcrumbs } from "@/components/services";
import { profile } from "@/data/profile";
import { company } from "@/data/company";
import { siteConfig } from "@/config/site";

export function AboutHero() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--surface)] py-12 sm:py-20 border-b border-[var(--border)]">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [radial-gradient(ellipse_at_top,_var(--secondary)_0%,_transparent_60%)]" />

      <Container className="relative">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading, Intro, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--secondary)]/30 bg-[var(--secondary)]/10 px-3.5 py-1 text-xs font-semibold text-[var(--secondary)] tracking-wide uppercase">
                <Shield className="h-3.5 w-3.5" />
                <span>{company.brandName} Corporate Overview</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
                About Us
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)] max-w-2xl">
                {profile.aboutParagraphs[0]}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ButtonLink
                  href={siteConfig.quoteHref()}
                  variant="gold"
                  size="lg"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>

                <ButtonLink
                  href="/services"
                  variant="outline"
                  size="lg"
                >
                  <span>Our Services</span>
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Shield Emblem on White Card */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal delay={0.25} className="w-full max-w-sm sm:max-w-md">
              <div className="relative rounded-2xl p-1 bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[var(--accent-gold)]/30 shadow-xl">
                <div className="relative rounded-[calc(1rem-1px)] bg-[var(--logo-surface)] p-6 sm:p-10 text-[var(--logo-surface-foreground)] border border-[var(--border)]">
                  {/* Subtle geometric framing lines */}
                  <div className="pointer-events-none absolute top-3 left-3 h-6 w-6 border-t-2 border-l-2 border-[var(--primary)]/40 rounded-tl" />
                  <div className="pointer-events-none absolute top-3 right-3 h-6 w-6 border-t-2 border-r-2 border-[var(--accent-gold)] rounded-tr" />
                  <div className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-[var(--secondary)]/40 rounded-bl" />
                  <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-[var(--primary)]/40 rounded-br" />

                  <div className="flex flex-col items-center text-center space-y-5">
                    <div className="relative h-48 w-48 sm:h-64 sm:w-64 max-w-full aspect-square">
                      <Image
                        src="/images/logo/emblem.jpg"
                        alt="STRICON People & Security Services Shield Emblem"
                        fill
                        priority
                        className="object-contain"
                        sizes="(max-width: 640px) 192px, 256px"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="font-heading text-sm font-bold tracking-wider text-[var(--logo-surface-foreground)]">
                        {company.legalName}
                      </div>
                      <div className="text-xs text-[var(--logo-surface-foreground)]/70">
                        PSARA Licensed Facility & Security Services
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
