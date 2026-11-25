import Image from "next/image";
import { Container, SectionHeading, Reveal } from "@/components/common";
import { company } from "@/data/company";

export function FounderCard() {
  const { founder } = company;

  // Extract initials (e.g. "R Vishnu Murthy" -> "RVM")
  const initials = founder.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <section className="py-16 sm:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Leadership"
            title="Founder & Managing Director"
            className="mb-12"
          />
        </Reveal>

        <Reveal delay={0.2} className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 sm:p-12 shadow-xs transition-all duration-200">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              {/* Photo or Typographic Initials Square */}
              {founder.photo ? (
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-2xl border border-[var(--border)]">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 640px) 112px, 128px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  aria-label={founder.name}
                  className="flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] font-heading text-2xl sm:text-3xl font-bold tracking-wider border border-[var(--primary)]/20"
                >
                  {initials}
                </div>
              )}

              {/* Bio & Details */}
              <div className="flex-1 text-center sm:text-left space-y-3">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                    {founder.name}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--secondary)]">
                    {founder.role}
                  </p>
                </div>

                <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
                  {founder.bio}
                </p>

                {/* Optional Message blockquote if provided (omitted when null) */}
                {founder.message && (
                  <blockquote className="mt-4 border-l-2 border-[var(--secondary)] pl-4 italic text-sm text-[var(--muted-foreground)]">
                    &ldquo;{founder.message}&rdquo;
                  </blockquote>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
