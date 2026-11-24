import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/seo";
import { MotionProvider, LocalBusinessJsonLd } from "@/components/common";
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

export const metadata: Metadata = constructMetadata({
  title: "Facility Management & Security Services in Hyderabad",
  description: `${siteConfig.legalName} - Facility Management & Security Services Provider in Hyderabad with valid PSARA Licence. Self-delivery model with trained in-house teams.`,
  path: "/",
});

export default function HomePage() {
  return (
    <MotionProvider>
      <LocalBusinessJsonLd />
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
