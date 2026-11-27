import Image from "next/image";
import { Quote } from "lucide-react";
import { Container, Reveal } from "@/components/common";
import { founderData } from "@/data/founder";

export function FounderProfile() {
  return (
    <section
      id="leadership-profile"
      aria-labelledby="founder-leadership-heading"
      className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--surface)] py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle decorative background shapes using existing theme tokens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-[var(--primary)]/5 blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-[var(--secondary)]/5 blur-3xl -z-10"
      />

      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Photograph Frame (approx 5/12 width) */}
          <div className="flex justify-center lg:col-span-5 lg:justify-start">
            <Reveal duration={0.5} className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[340px] lg:max-w-[332px]">
              <figure className="relative mx-auto lg:mx-0">
                {/* Decorative offset outline in primary colour at low opacity */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2.5 rounded-[22px] border border-[var(--primary)]/20 -z-10 translate-x-2.5 translate-y-2.5 hidden sm:block"
                />

                {/* Outer double-border frame with gold outline */}
                <div className="relative rounded-2xl border-2 border-[var(--accent-gold)] bg-[var(--background)] p-2 sm:p-2.5 shadow-lg">
                  {/* Inner photograph with 1px border ring & 3:4 portrait aspect ratio */}
                  <div className="relative aspect-[332/490] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                    <Image
                      src={founderData.image.src}
                      alt={founderData.image.alt}
                      width={founderData.image.width}
                      height={founderData.image.height}
                      placeholder="blur"
                      blurDataURL={founderData.image.blurDataURL}
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 332px"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>

                <figcaption className="sr-only">
                  {founderData.name}, {founderData.designation}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Right Column: Content Hierarchy & Biography (approx 7/12 width) */}
          <div className="lg:col-span-7">
            <Reveal delay={0.08} duration={0.5}>
              {/* Eyebrow Label & Subheading */}
              <div className="space-y-1">
                <h2
                  id="founder-leadership-heading"
                  className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[var(--secondary)]"
                >
                  {founderData.sectionHeading}
                </h2>
                <p className="text-sm sm:text-base font-semibold text-[var(--muted-foreground)]">
                  {founderData.subheading}
                </p>
              </div>

              {/* Founder Name as Strongest Heading (h3) */}
              <h3 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
                {founderData.name}
              </h3>

              {/* Designation with Short Gold Decorative Bar */}
              <div className="mt-3 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-4 w-1 shrink-0 rounded-full bg-[var(--accent-gold)]"
                />
                <p className="text-base sm:text-lg font-semibold text-[var(--primary)]">
                  {founderData.designation}
                </p>
              </div>

              {/* Highlights: Side by side down to 360px, stack below 360px */}
              <div className="mt-8 flex flex-col min-[360px]:flex-row min-[360px]:items-center gap-6 sm:gap-8 border-y border-[var(--border)] py-5">
                {/* 16+ Years Experience */}
                <div className="flex items-baseline gap-2.5">
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--primary)]">
                    {founderData.highlights[0].value}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-snug text-[var(--muted-foreground)] max-w-[150px]">
                    {founderData.highlights[0].label}
                  </span>
                </div>

                {/* Thin Vertical Divider */}
                <div
                  aria-hidden="true"
                  className="hidden min-[360px]:block h-9 w-px bg-[var(--border)]"
                />

                {/* MBA Graduate */}
                <div className="flex items-baseline gap-2.5">
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--primary)]">
                    {founderData.highlights[1].value}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-snug text-[var(--muted-foreground)] max-w-[150px]">
                    {founderData.highlights[1].label}
                  </span>
                </div>
              </div>

              {/* Biography Paragraphs */}
              <div className="mt-8 space-y-4 text-base sm:text-[17px] leading-relaxed text-[var(--muted-foreground)] max-w-[65ch]">
                {founderData.biography.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Leadership Philosophy Aside */}
              <aside
                aria-label={founderData.philosophy.label}
                className="relative mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8"
              >
                {/* Decorative Quotation Mark in Accent Gold at low opacity */}
                <Quote
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-4 h-16 w-16 text-[var(--accent-gold)] opacity-20 sm:h-20 sm:w-20"
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-1 rounded-full bg-[var(--accent-gold)]"
                    />
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
                      {founderData.philosophy.label}
                    </span>
                  </div>

                  <p className="mt-3 font-heading text-2xl sm:text-[28px] font-bold tracking-tight text-[var(--foreground)]">
                    &ldquo;{founderData.philosophy.quote}&rdquo;
                  </p>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)] max-w-[60ch]">
                    {founderData.philosophy.text}
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
