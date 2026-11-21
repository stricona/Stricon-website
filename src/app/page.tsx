import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Home",
  description: `${siteConfig.legalName} - Facility Management & Security Services Provider in Hyderabad with valid PSARA Licence.`,
};

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[var(--color-foreground)] tracking-tight">
          Facility Management & Security Services
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted-foreground)] leading-relaxed">
          Welcome to {siteConfig.legalName}. Professional facility management and security solutions in Hyderabad.
        </p>
      </div>
    </div>
  );
}
