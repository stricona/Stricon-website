import React from "react";
import { Container } from "@/components/common";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";

interface PageHeroProps {
  title: React.ReactNode;
  intro?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}

export function PageHero({
  title,
  intro,
  breadcrumbs,
  actions,
  rightSlot,
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`border-b border-[var(--border)] bg-[var(--surface)] py-8 sm:py-12 lg:py-14 ${className}`}
    >
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-4" />
        )}

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className={rightSlot ? "lg:col-span-8" : "lg:col-span-12"}>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)] max-w-3xl">
                {intro}
              </p>
            )}
            {actions && <div className="mt-6 flex flex-wrap items-center gap-4">{actions}</div>}
          </div>

          {rightSlot && (
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              {rightSlot}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
