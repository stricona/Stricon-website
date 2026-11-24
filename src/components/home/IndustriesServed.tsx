import {
  Hospital,
  Laptop,
  Headphones,
  Hotel,
  Building,
  Factory,
  Home,
  MapPin,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  RevealGroup,
  RevealItem,
} from "@/components/common";
import { industries, industriesStatement } from "@/data/industries";

const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "health-care-centers": Hospital,
  "healthcare-centres": Hospital,
  it: Laptop,
  ites: Headphones,
  hotels: Hotel,
  commercial: Building,
  manufacturing: Factory,
  "residential-apartments-villas": Home,
};

export function IndustriesServed() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--surface)]/60 border-y border-[var(--border)]">
      <Container>
        <SectionHeading
          eyebrow="Industry Focus"
          title="Sectors We Protect & Maintain"
          intro={industriesStatement}
          className="mb-14"
        />

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind) => {
            const Icon = industryIcons[ind.slug] || Building;

            return (
              <RevealItem key={ind.slug} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs hover:border-[var(--primary)]/50 transition-all duration-200">
                  <div>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-[var(--foreground)] mb-2">
                      {ind.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                    <MapPin className="h-3.5 w-3.5 text-[var(--secondary)]" />
                    <span>Deployment: {ind.location}</span>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
