import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { MotionProvider, OrganizationJsonLd } from "@/components/common";
import {
  Hero,
  ClientsMarquee,
  ServicesGrid,
  IntegratedFacilityManagement,
  WhyStricon,
  IndustriesServed,
  HiringAndTraining,
  GallerySection,
  FinalCta,
} from "@/components/home";

export const metadata: Metadata = {
  title: "Facility Management & Security Services in Hyderabad | STRICON",
  description: `${siteConfig.legalName} - Facility Management & Security Services Provider in Hyderabad with valid PSARA Licence. Self-delivery model with trained in-house teams.`,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Facility Management & Security Services in Hyderabad | STRICON",
    description: `${siteConfig.legalName} - Facility Management & Security Services Provider in Hyderabad with valid PSARA Licence.`,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Security & Facility Services`,
      },
    ],
  },
};

export default function HomePage() {
  return (
    <MotionProvider>
      <OrganizationJsonLd />
      <div className="flex flex-col w-full">
        <Hero />
        <ClientsMarquee />
        <ServicesGrid />
        <IntegratedFacilityManagement />
        <WhyStricon />
        <IndustriesServed />
        <HiringAndTraining />
        <GallerySection />
        <FinalCta />
      </div>
    </MotionProvider>
  );
}
