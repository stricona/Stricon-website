import { Suspense } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getServiceBySlug } from "@/data/services";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.legalName} for facility management and security enquiries in Hyderabad.`,
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string }>;
}

async function ServiceEnquiryBanner({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service: serviceSlug } = await searchParams;
  const matchedService = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;

  if (!matchedService) return null;

  return (
    <p className="mt-2 text-sm sm:text-base font-semibold text-[var(--primary)] inline-flex items-center gap-1.5 rounded-md bg-[var(--primary)]/10 px-3 py-1">
      Enquiry about: {matchedService.title}
    </p>
  );
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[var(--color-foreground)] tracking-tight">
          Contact Us
        </h1>

        <Suspense fallback={null}>
          <ServiceEnquiryBanner searchParams={searchParams} />
        </Suspense>

        <p className="mt-4 text-lg text-[var(--color-muted-foreground)] leading-relaxed">
          Get in touch with our team for enquiries, quotations, or more information about our services.
        </p>
      </div>
    </div>
  );
}
