import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import {
  ShieldCheck,
  Sparkles,
  Wrench,
  Users,
  Bug,
  Trees,
  Brush,
  UserCheck,
  Coffee,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  Building,
  UserPlus,
  GraduationCap,
  Activity,
  FileCheck2,
} from "lucide-react";
import { siteConfig, quoteHref, whatsappUrlForService } from "@/config/site";
import {
  Container,
  ButtonLink,
  MotionProvider,
} from "@/components/common";
import {
  PageHero,
  ServiceCard,
  ServiceSidebar,
  ServiceNav,
  QuoteCard,
} from "@/components/services";
import {
  services,
  getServiceBySlug,
  getRelatedServices,
  getAdjacentServices,
} from "@/data/services";
import { profile } from "@/data/profile";
import { industries } from "@/data/industries";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Sparkles,
  Wrench,
  Users,
  Bug,
  Trees,
  Brush,
  UserCheck,
  Coffee,
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return constructMetadata({
    title: service.title,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const adjacent = getAdjacentServices(slug);
  const related = getRelatedServices(service);
  const Icon = iconMap[service.icon] || ShieldCheck;

  // JSON-LD Structured Data
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.legalName,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500028",
        addressCountry: "IN",
      },
      telephone: `+91${siteConfig.links.phone}`,
    },
    areaServed: {
      "@type": "City",
      name: "Hyderabad",
    },
    url: `${siteConfig.url}/services/${service.slug}`,
  };

  const operationalStrengths = [
    {
      title: "Hiring",
      icon: UserPlus,
      items: [
        "Stringent recruitment criteria",
        "Background verification",
        "Police verification",
      ],
    },
    {
      title: "Training",
      icon: GraduationCap,
      items: [
        "SOP and job cards",
        "Fire safety drill",
        "First aid and soft skills",
      ],
    },
    {
      title: "Operations",
      icon: Activity,
      items: [
        "Day and night visits",
        "Risk re-assessment",
        "Management review",
        "Backend support from CRM team",
      ],
    },
    {
      title: "Compliance",
      icon: FileCheck2,
      items: [
        "Statutory compliance",
        "Complete documentation",
        "Regular audits",
      ],
    },
  ];

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="flex flex-col w-full">
        {/* 1. PageHero */}
        <PageHero
          title={service.title}
          intro={service.intro}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
          actions={
            <>
              <ButtonLink
                href={quoteHref(service.slug)}
                variant="gold"
                size="md"
              >
                <span>Get a Quote</span>
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={siteConfig.phoneHref}
                variant="outline"
                size="md"
              >
                <Phone className="h-4 w-4" />
                <span>Call {siteConfig.links.phoneDisplay}</span>
              </ButtonLink>
            </>
          }
          rightSlot={
            <div className="flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--background)] shadow-xs">
              {service.image ? (
                <div className="relative h-full w-full overflow-hidden rounded-3xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
                  <Icon className="h-12 w-12 sm:h-14 sm:w-14" />
                </div>
              )}
            </div>
          }
        />

        {/* Mobile Horizontal Category/Service Switcher */}
        <div className="lg:hidden border-b border-[var(--border)] bg-[var(--surface)] py-3 px-4 overflow-x-auto">
          <div className="flex items-center gap-2 w-max text-xs">
            <span className="font-semibold text-[var(--muted-foreground)] mr-1">
              Other Services:
            </span>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`rounded-full px-3 py-1.5 font-medium whitespace-nowrap transition-colors ${
                  s.slug === service.slug
                    ? "bg-[var(--primary)] text-white"
                    : "border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                }`}
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Layout with Desktop Sticky Sidebar */}
        <section className="py-12 sm:py-16 bg-[var(--background)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Detailed Service Content */}
              <div className="lg:col-span-8 space-y-14">
                {/* 2. What's Included (Render only if includes.length > 0) */}
                {service.includes.length > 0 && (
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs">
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-3">
                      What&apos;s Included
                    </h2>
                    <p className="text-sm text-[var(--muted-foreground)] mb-6">
                      Specific operational capabilities delivered as part of our {service.title.toLowerCase()} scope.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.includes.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5 text-xs sm:text-sm font-medium text-[var(--foreground)]"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--secondary)]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. How STRICON Works Across All Services */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-2">
                    How STRICON Operates Across All Services
                  </h2>
                  <p className="text-sm text-[var(--muted-foreground)] mb-8">
                    Every deployment is backed by our self-delivery model, stringent personnel vetting, and multi-tier supervision.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {operationalStrengths.map((pillar) => {
                      const PillarIcon = pillar.icon;
                      return (
                        <div
                          key={pillar.title}
                          className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--background)] p-5"
                        >
                          <div className="flex items-center gap-2.5 mb-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                              <PillarIcon className="h-4 w-4" />
                            </div>
                            <h3 className="font-heading text-base font-bold text-[var(--foreground)]">
                              {pillar.title}
                            </h3>
                          </div>
                          <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted-foreground)]">
                            {pillar.items.map((item) => (
                              <li key={item} className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)] shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Industries We Serve */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Building className="h-5 w-5 text-[var(--secondary)]" />
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                      Industries We Serve
                    </h2>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mb-6">
                    {profile.clientsSentence}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {industries.map((ind) => (
                      <span
                        key={ind.slug}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs sm:text-sm font-medium text-[var(--foreground)]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                        <span>{ind.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 5. Bundle with Other Services */}
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                      Bundle with Other Services
                    </h2>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1.5">
                      {profile.bundlingNote}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {related.map((relService) => (
                      <ServiceCard key={relService.slug} service={relService} />
                    ))}
                  </div>
                </div>

                {/* 6. FAQs (Render only when faqs.length > 0) */}
                {service.faqs.length > 0 && (
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs">
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-6">
                      Frequently Asked Questions
                    </h2>
                    <div className="divide-y divide-[var(--border)]">
                      {service.faqs.map((faq, idx) => (
                        <details
                          key={idx}
                          className="group py-4 first:pt-0 last:pb-0"
                        >
                          <summary className="flex cursor-pointer items-center justify-between font-semibold text-[var(--foreground)] focus-visible:outline-2">
                            <span>{faq.q}</span>
                            <span className="ml-4 transition-transform group-open:rotate-180">
                              ↓
                            </span>
                          </summary>
                          <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">
                            {faq.a}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Previous and Next Service Navigation */}
                {adjacent && (
                  <ServiceNav prev={adjacent.prev} next={adjacent.next} />
                )}

                {/* 8. Service-Specific Final CTA Band */}
                <div className="rounded-3xl border border-[var(--primary)]/30 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/90 p-8 sm:p-10 text-white shadow-md">
                  <div className="max-w-2xl space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)]">
                      Immediate Deployment
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold">
                      Need {service.title}?
                    </h2>
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                      Connect directly with our operational management for a site assessment and transparent service proposal tailored to your facility.
                    </p>
                    <div className="flex flex-wrap items-center gap-3.5 pt-2">
                      <ButtonLink
                        href={quoteHref(service.slug)}
                        variant="gold"
                        size="md"
                      >
                        <span>Get a Quote</span>
                        <ArrowRight className="h-4 w-4" />
                      </ButtonLink>
                      <a
                        href={whatsappUrlForService(service.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 transition-colors focus-visible:outline-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <a
                        href={siteConfig.phoneHref}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors focus-visible:outline-2"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Call {siteConfig.links.phoneDisplay}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Mobile Fallback Quote Card below content */}
                <div className="lg:hidden pt-4">
                  <QuoteCard service={service} />
                </div>
              </div>

              {/* Right Column: Sticky Desktop Sidebar */}
              <div className="hidden lg:block lg:col-span-4 sticky top-24">
                <ServiceSidebar currentService={service} />
              </div>
            </div>
          </Container>
        </section>
      </div>
    </MotionProvider>
  );
}
