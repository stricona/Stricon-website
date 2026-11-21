import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the STRICON team. Explore career opportunities in facility management and security services.",
};

export default function CareersPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[var(--color-foreground)] tracking-tight">
          Careers
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted-foreground)] leading-relaxed">
          Explore career growth opportunities and join our dedicated team of facility and security professionals.
        </p>
      </div>
    </div>
  );
}
