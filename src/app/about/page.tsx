import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about STRICON People & Security Services Pvt Ltd, our mission, vision, and core values.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[var(--color-foreground)] tracking-tight">
          About Us
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted-foreground)] leading-relaxed">
          Discover our comprehensive facility management services, professional in-house teams, and company values.
        </p>
      </div>
    </div>
  );
}
