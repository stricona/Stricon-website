import { Container, SectionHeading, Reveal } from "@/components/common";
import { profile } from "@/data/profile";
import { company } from "@/data/company";

export function AboutStory() {
  const glanceRows = [
    { label: "Legal name", value: company.legalName },
    { label: "Established", value: company.establishedYear.toString() },
    { label: "Company type", value: company.type },
    {
      label: "Headquarters",
      value: `${company.registeredOffice.city}, ${company.registeredOffice.state}`,
    },
    {
      label: "Licence",
      value: company.psaraLicensed
        ? company.psaraLicenseNumber
          ? `valid PSARA Licence (${company.psaraLicenseNumber})`
          : "valid PSARA Licence"
        : null,
    },
  ].filter((row) => row.value !== null);

  return (
    <section className="py-16 sm:py-24 bg-[var(--background)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Paragraphs 1-4 */}
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                eyebrow="Who We Are"
                title="Committed to Operational Excellence"
                align="left"
                className="mb-8"
              />
            </Reveal>

            <div className="max-w-[65ch] space-y-6 text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
              {profile.aboutParagraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.1 * (index + 1)}>
                  <p className={index === 0 ? "text-[var(--foreground)] font-medium" : ""}>
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: "At a glance" card */}
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[var(--foreground)] mb-6 pb-3 border-b border-[var(--border)]">
                  At a glance
                </h3>

                <dl className="divide-y divide-[var(--border)]">
                  {glanceRows.map((row) => (
                    <div
                      key={row.label}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4"
                    >
                      <dt className="text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] shrink-0">
                        {row.label}
                      </dt>
                      <dd className="text-sm font-medium text-[var(--foreground)] sm:text-right">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
