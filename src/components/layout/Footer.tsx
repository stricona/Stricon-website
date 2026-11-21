import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-block"
              aria-label={`${siteConfig.name} - Home`}
            >
              <div className="relative h-12 w-48 sm:h-14 sm:w-56 dark:bg-white dark:px-2 dark:py-1 dark:rounded-md flex items-center">
                <Image
                  src="/images/logo/wordmark.jpg"
                  alt={`${siteConfig.legalName} Wordmark`}
                  fill
                  sizes="(max-width: 640px) 192px, 224px"
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              {company.description}
            </p>

            {company.psaraLicensed && (
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-secondary)]">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>
                  Valid PSARA Licence
                  {company.psaraLicenseNumber ? ` (${company.psaraLicenseNumber})` : ""}
                </span>
              </div>
            )}

            {company.tagline && (
              <p className="text-xs italic text-[var(--color-muted-foreground)]">
                {company.tagline}
              </p>
            )}

            {/* Social links: Render only if available */}
            {company.socialLinks && Object.keys(company.socialLinks).length > 0 && (
              <div className="flex items-center gap-3 mt-2">
                {Object.entries(company.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2 className="font-heading font-semibold text-sm tracking-wider uppercase text-[var(--color-foreground)] mb-4">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-2.5">
              {siteConfig.mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={siteConfig.cta.href}
                  className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                >
                  {siteConfig.cta.title}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (Key Offerings) */}
          <div>
            <h2 className="font-heading font-semibold text-sm tracking-wider uppercase text-[var(--color-foreground)] mb-4">
              Services
            </h2>
            <ul className="flex flex-col gap-2.5">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm font-medium text-[var(--color-secondary)] hover:underline"
                >
                  View all 9 service categories &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Details */}
          <div>
            <h2 className="font-heading font-semibold text-sm tracking-wider uppercase text-[var(--color-foreground)] mb-4">
              Registered Office
            </h2>
            <address className="not-italic flex flex-col gap-3 text-sm text-[var(--color-muted-foreground)]">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-1 shrink-0 text-[var(--color-primary)]" />
                <span className="leading-relaxed">{company.registeredOffice.fullAddress}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <a
                  href={`tel:${company.contact.phone}`}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {company.contact.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <a
                  href={`mailto:${company.contact.email}`}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {company.contact.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-primary)]" />
                <span>
                  Working Hours: {company.workingHours.display}
                  {company.workingHours.workingDays ? ` (${company.workingHours.workingDays})` : ""}
                </span>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-muted-foreground)]">
          <p>
            &copy; {currentYear} {company.legalName}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Established {company.establishedYear} &bull; {company.registeredOffice.city}, {company.registeredOffice.state}
          </p>
        </div>
      </div>
    </footer>
  );
}
