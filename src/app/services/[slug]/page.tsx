import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[var(--color-foreground)] tracking-tight">
          {service.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted-foreground)] leading-relaxed">
          {service.summary}
        </p>

        {service.includedServices && service.includedServices.length > 0 && (
          <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
            <h2 className="text-xl font-heading font-semibold text-[var(--color-foreground)] mb-4">
              Included Services
            </h2>
            <ul className="space-y-2 list-disc list-inside text-[var(--color-muted-foreground)]">
              {service.includedServices.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
