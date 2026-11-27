
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

import { company } from "@/data/company";
import { siteConfig } from "@/config/site";

const contactChannels = [
  {
    title: "Call Us",
    description: "Speak directly with our operations team",
    value: company.contact.phoneDisplay,
    href: siteConfig.phoneHref,
    action: "Call Now",
    icon: Phone,
    color: "text-[var(--primary)]",
    iconBg: "bg-[var(--primary)]/10",
    borderHover: "hover:border-[var(--primary)]/50",
  },
  {
    title: "WhatsApp",
    description: "Quick messages and service enquiries",
    value: "Message on WhatsApp",
    href: siteConfig.whatsappUrl,
    action: "Chat Now",
    icon: MessageCircle,
    color: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10",
    borderHover: "hover:border-emerald-500/50",
  },
  {
    title: "Email Us",
    description: "Sales, commercial and HR enquiries",
    value: company.contact.email,
    href: `mailto:${company.contact.email}`,
    action: "Send Email",
    icon: Mail,
    color: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-500/10",
    borderHover: "hover:border-blue-500/50",
  },
];

export function ContactInfoCards() {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    company.registeredOffice.fullAddress
  )}`;

  return (
    <div className="space-y-5">

      {/* CONTACT CHANNELS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

        {contactChannels.map((item, index) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.borderHover} ${
                index === 2 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg} ${item.color}`}
                >
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-[var(--muted-foreground)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--primary)]"
                />
              </div>

              <h3 className="mt-5 font-heading text-base font-bold text-[var(--foreground)]">
                {item.title}
              </h3>

              <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">
                {item.description}
              </p>

              <a
                href={item.href}
                target={
                  item.title === "WhatsApp" ? "_blank" : undefined
                }
                rel={
                  item.title === "WhatsApp"
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`mt-4 inline-flex max-w-full items-center gap-1.5 break-all text-sm font-semibold ${item.color} hover:underline focus-visible:outline-2 focus-visible:outline-offset-4`}
              >
                {item.value}
              </a>
            </article>
          );
        })}

        {/* OPERATING HOURS */}
        <article className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-lg">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Clock size={21} strokeWidth={1.8} />
          </div>

          <h3 className="mt-5 font-heading text-base font-bold text-[var(--foreground)]">
            Operating Hours
          </h3>

          <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">
            Office and response hours
          </p>

          <p className="mt-4 text-sm font-bold text-[var(--foreground)]">
            {company.workingHours.display}
          </p>

          {company.workingHours.workingDays && (
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {company.workingHours.workingDays}
            </p>
          )}
        </article>
      </div>

      {/* REGISTERED OFFICE */}
      <article className="relative overflow-hidden rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/[0.04] p-5 sm:p-6">

        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[var(--primary)]/[0.06] blur-2xl" />

        <div className="relative flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md">
            <MapPin size={23} />
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold tracking-[0.18em] text-[var(--primary)]">
              OUR LOCATION
            </span>

            <h3 className="mt-1 font-heading text-lg font-bold text-[var(--foreground)]">
              Registered Office
            </h3>

            <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
              {company.registeredOffice.fullAddress}
            </p>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--primary-foreground)] transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Get Directions
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </article>

      {/* GOOGLE MAP */}
      {company.googleMapsEmbedUrl && (
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">

          <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <MapPin size={18} />
              </div>

              <div>
                <h3 className="font-heading text-sm font-bold text-[var(--foreground)]">
                  Find Our Office
                </h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  View our office location
                </p>
              </div>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open office location in Google Maps"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/10"
            >
              <ExternalLink size={16} />
            </a>
          </div>

          <div className="aspect-[16/9] w-full bg-[var(--background)] sm:aspect-[16/8]">
            <iframe
              src={company.googleMapsEmbedUrl}
              title="STRICON Registered Office Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </div>
  );
}
