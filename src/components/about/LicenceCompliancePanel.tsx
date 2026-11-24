import { ShieldCheck, MapPin, Clock } from "lucide-react";
import { Container, Reveal } from "@/components/common";
import { company } from "@/data/company";

export function LicenceCompliancePanel() {
  const licenceBadgeText = company.psaraLicensed
    ? company.psaraLicenseNumber
      ? `valid PSARA Licence (${company.psaraLicenseNumber})`
      : "valid PSARA Licence"
    : null;

  return (
    <section className="py-12 sm:py-16 bg-[var(--surface)] border-y border-[var(--border)]">
      <Container>
        <Reveal>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left: PSARA Licence Badge & Legal Status */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {licenceBadgeText && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--secondary)]/40 bg-[var(--secondary)]/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-[var(--secondary)]">
                    <ShieldCheck className="h-4 w-4" />
                    <span>{licenceBadgeText}</span>
                  </div>
                )}

                <span className="text-xs sm:text-sm font-semibold text-[var(--muted-foreground)]">
                  {company.legalName}
                </span>
              </div>

              <p className="text-sm text-[var(--muted-foreground)] max-w-xl">
                {company.description}
              </p>

              {/* Conditional Legal Fields (ONLY when not null) */}
              {(company.legal.cin || company.legal.gstin || company.legal.psaraValidUntil) && (
                <div className="flex flex-wrap gap-4 pt-2 text-xs text-[var(--muted-foreground)]">
                  {company.legal.cin && (
                    <div>
                      <span className="font-semibold text-[var(--foreground)]">CIN: </span>
                      {company.legal.cin}
                    </div>
                  )}
                  {company.legal.gstin && (
                    <div>
                      <span className="font-semibold text-[var(--foreground)]">GSTIN: </span>
                      {company.legal.gstin}
                    </div>
                  )}
                  {company.legal.psaraValidUntil && (
                    <div>
                      <span className="font-semibold text-[var(--foreground)]">Validity: </span>
                      {company.legal.psaraValidUntil}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Registered Office & Operating Hours */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 text-xs sm:text-sm text-[var(--muted-foreground)] shrink-0 max-w-md">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[var(--foreground)] block">
                    Registered Office
                  </span>
                  <span>{company.registeredOffice.fullAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[var(--foreground)] block">
                    Operating Hours
                  </span>
                  <span>{company.workingHours.display}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
