import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the comprehensive facility management and security services offered by STRICON.",
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[var(--color-foreground)] tracking-tight">
          Our Services
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted-foreground)] leading-relaxed">
          Comprehensive facility management and security solutions tailored for corporate and commercial facilities.
        </p>
      </div>
    </div>
  );
}
