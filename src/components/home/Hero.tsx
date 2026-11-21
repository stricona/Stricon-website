import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  FileCheck2,
  Phone,
  ArrowRight,
  Award,
} from "lucide-react";
import { Container, ButtonLink, Reveal } from "@/components/common";
import { homeContent } from "@/data/home";
import { siteConfig } from "@/config/site";

export function Hero() {
  const { hero } = homeContent;

  const trustChipIcons = [ShieldCheck, CheckCircle2, Users, FileCheck2];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
      {/* Background ambient accents using CSS variables */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[var(--secondary)]/5 blur-3xl" />
      </div>

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--surface)] px-3.5 py-1 text-xs font-semibold text-[var(--primary)] shadow-sm sm:text-sm">
                <ShieldCheck className="h-4 w-4 text-[var(--secondary)]" />
                <span>{hero.eyebrow}</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl lg:leading-tight">
                {hero.title}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base text-[var(--muted-foreground)] sm:text-lg leading-relaxed max-w-2xl">
                {hero.description}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ButtonLink
                  href={hero.ctaPrimary.href}
                  variant="gold"
                  size="lg"
                  className="shadow-md"
                >
                  <span>{hero.ctaPrimary.label}</span>
                  <ArrowRight className="h-5 w-5" />
                </ButtonLink>

                <ButtonLink
                  href={hero.ctaSecondary.href}
                  variant="outline"
                  size="lg"
                >
                  <span>{hero.ctaSecondary.label}</span>
                </ButtonLink>

                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors focus-visible:outline-2"
                >
                  <Phone className="h-4 w-4 text-[var(--secondary)]" />
                  <span>{siteConfig.links.phoneDisplay}</span>
                </a>
              </div>
            </Reveal>

            {/* Trust Chips */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 gap-3 pt-4 sm:flex sm:flex-wrap sm:gap-4">
                {hero.trustChips.map((chip, index) => {
                  const Icon = trustChipIcons[index % trustChipIcons.length];
                  return (
                    <div
                      key={chip}
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-medium text-[var(--foreground)] shadow-xs sm:text-sm"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[var(--secondary)]" />
                      <span>{chip}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Founder Note */}
            <Reveal delay={0.5}>
              <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]/70 p-4 text-xs sm:text-sm text-[var(--muted-foreground)]">
                <Award className="h-5 w-5 shrink-0 text-[var(--accent-gold)] mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-semibold text-[var(--foreground)]">
                    Leadership:{" "}
                  </span>
                  {hero.founderLine}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Floating Shield Emblem Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal delay={0.3} className="w-full max-w-md">
              <div className="relative rounded-2xl p-1 bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[var(--accent-gold)]/30 shadow-xl">
                <div className="relative rounded-[calc(1rem-1px)] bg-[var(--logo-surface)] p-8 sm:p-10 text-[var(--logo-surface-foreground)] border border-[var(--border)]">
                  {/* Subtle geometric framing lines */}
                  <div className="pointer-events-none absolute top-3 left-3 h-6 w-6 border-t-2 border-l-2 border-[var(--primary)]/40 rounded-tl" />
                  <div className="pointer-events-none absolute top-3 right-3 h-6 w-6 border-t-2 border-r-2 border-[var(--accent-gold)] rounded-tr" />
                  <div className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-[var(--secondary)]/40 rounded-bl" />
                  <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-[var(--primary)]/40 rounded-br" />

                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative h-64 w-64 sm:h-72 sm:w-72">
                      <Image
                        src="/images/logo/emblem.jpg"
                        alt="STRICON People & Security Services Shield Emblem"
                        fill
                        priority
                        className="object-contain"
                        sizes="(max-width: 640px) 256px, 288px"
                      />
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)]">
                        STRICON
                      </p>
                      <p className="text-sm font-bold text-[#29283A]">
                        PEOPLE & SECURITY SERVICES PVT LTD
                      </p>
                      <p className="text-xs text-[#686879]">
                        Corporate Facility & Security Partner • Hyderabad
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[var(--secondary)]" />
                      <span>Valid PSARA License</span>
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
