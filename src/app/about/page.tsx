import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { profile } from "@/data/profile";
import { MotionProvider, OrganizationJsonLd } from "@/components/common";
import {
  AboutHero,
  AboutStory,
  FounderCard,
  MissionVision,
  CoreValues,
  IfmVertical,
  OurStrengths,
  TrainingAndWelfare,
  LicenceCompliancePanel,
  ClientsSection,
} from "@/components/about";
import { WhyStricon, FinalCta } from "@/components/home";

export const metadata: Metadata = constructMetadata({
  title: "About Us",
  description: profile.aboutParagraphs[0],
  path: "/about",
});

export default function AboutPage() {
  return (
    <MotionProvider>
      <OrganizationJsonLd />
      <article className="flex flex-col w-full">
        {/* 1. PageHero */}
        <AboutHero />

        {/* 2. About Us: Paragraphs 1-4 & "At a glance" card */}
        <AboutStory />

        {/* 3. Founder and Managing Director */}
        <FounderCard />

        {/* 4. Our Mission and Our Vision */}
        <MissionVision />

        {/* 5. Core Values */}
        <CoreValues />

        {/* 6. Integrated Facility Management Vertical */}
        <IfmVertical />

        {/* 7. Our Strengths */}
        <OurStrengths />

        {/* 8. Continuous Training & Employee Welfare */}
        <TrainingAndWelfare />

        {/* 9. Licence and compliance panel */}
        <LicenceCompliancePanel />

        {/* 10. Few of our esteemed clients */}
        <ClientsSection />

        {/* 11. To Sum Up – Why STRICON? */}
        <WhyStricon />

        {/* 12. Final CTA */}
        <FinalCta />
      </article>
    </MotionProvider>
  );
}
