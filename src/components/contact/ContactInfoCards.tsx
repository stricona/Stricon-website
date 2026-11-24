import { Phone, MessageCircle, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { company } from "@/data/company";
import { siteConfig } from "@/config/site";

export function ContactInfoCards() {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    company.registeredOffice.fullAddress
  )}`;

  return (
    <div className="space-y-6">
      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs transition-colors hover:border-[var(--primary)]/40">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] mb-3">
            <Phone className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-sm font-bold text-[var(--foreground)] mb-1">
            Call Us
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mb-3">
            Speak directly with our operations team
          </p>
          <a
            href={siteConfig.phoneHref}
            className="text-sm font-semibold text-[var(--primary)] hover:underline focus-visible:outline-2"
          >
            {company.contact.phoneDisplay}
          </a>
        </div>

        {/* WhatsApp */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs transition-colors hover:border-[var(--secondary)]/40">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--secondary)]/10 text-[var(--secondary)] mb-3">
            <MessageCircle className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-sm font-bold text-[var(--foreground)] mb-1">
            WhatsApp
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mb-3">
            Quick message & service requests
          </p>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[var(--secondary)] hover:underline focus-visible:outline-2"
          >
            Message on WhatsApp
          </a>
        </div>

        {/* Email */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs transition-colors hover:border-[var(--primary)]/40">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] mb-3">
            <Mail className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-sm font-bold text-[var(--foreground)] mb-1">
            Email Us
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mb-3">
            Sales, commercial & HR enquiries
          </p>
          <a
            href={`mailto:${company.contact.email}`}
            className="text-sm font-semibold text-[var(--primary)] hover:underline focus-visible:outline-2"
          >
            {company.contact.email}
          </a>
        </div>

        {/* Operating Hours */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--secondary)]/10 text-[var(--secondary)] mb-3">
            <Clock className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-sm font-bold text-[var(--foreground)] mb-1">
            Operating Hours
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mb-1">
            Office & response hours
          </p>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {company.workingHours.display}
            {company.workingHours.workingDays && ` (${company.workingHours.workingDays})`}
          </p>
        </div>
      </div>

      {/* Office Address & Directions Card */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs">
        <div className="flex items-start gap-3.5 mb-4">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--secondary)]/10 text-[var(--secondary)]">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-[var(--foreground)] mb-1">
              Registered Office
            </h3>
            <p className="text-xs text-[var(--muted-foreground)]">
              Corporate headquarters & operations
            </p>
          </div>
        </div>

        <address className="not-italic text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 pl-1">
          {company.registeredOffice.fullAddress}
        </address>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline focus-visible:outline-2"
        >
          <span>Get directions on Google Maps</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Google Maps Embed Iframe (Rendered ONLY if googleMapsEmbedUrl is not null) */}
      {company.googleMapsEmbedUrl && (
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xs aspect-video w-full">
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
      )}
    </div>
  );
}
