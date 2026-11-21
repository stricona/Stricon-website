import Link from "next/link";
import { services, serviceCategories } from "@/data/services";
import { ServiceItem, ServiceGroupCategory } from "@/types/service";
import { QuoteCard } from "./QuoteCard";

interface ServiceSidebarProps {
  currentService?: ServiceItem;
  className?: string;
}

const categoriesOrder: ServiceGroupCategory[] = [
  "security",
  "facility",
  "manpower",
];

export function ServiceSidebar({
  currentService,
  className = "",
}: ServiceSidebarProps) {
  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Services Navigation List by Category */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs">
        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
          All Services
        </h3>

        <div className="space-y-5">
          {categoriesOrder.map((catKey) => {
            const catMeta = serviceCategories[catKey];
            const catServices = services.filter((s) => s.category === catKey);

            return (
              <div key={catKey} className="space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--secondary)] px-2">
                  {catMeta.name}
                </p>
                <ul className="space-y-1">
                  {catServices.map((service) => {
                    const isCurrent = service.slug === currentService?.slug;

                    return (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs sm:text-sm transition-all focus-visible:outline-2 ${
                            isCurrent
                              ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-xs"
                              : "text-[var(--foreground)] hover:bg-[var(--background)] hover:text-[var(--primary)]"
                          }`}
                        >
                          <span className="line-clamp-1">{service.title}</span>
                          {isCurrent && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)] shrink-0 ml-2" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quote & Contact Card */}
      <QuoteCard service={currentService} />
    </aside>
  );
}
