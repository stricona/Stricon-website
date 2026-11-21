"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { Container, SectionHeading } from "@/components/common";
import { clients, approvedDeploymentSentence } from "@/data/clients";

export function ClientsMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  // Filter approved clients with non-null logos
  const approvedClients = clients.filter(
    (c) => c.displayApproved && c.logo !== null
  );

  // Split into two distinct rows for opposite scrolling
  const mid = Math.ceil(approvedClients.length / 2);
  const row1 = approvedClients.slice(0, mid);
  const row2 = approvedClients.slice(mid);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-[var(--surface)]/50 border-y border-[var(--border)]">
      <Container className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Esteemed Clients"
            title="Trusted Across Hyderabad's Enterprise Landscape"
            intro={approvedDeploymentSentence}
            className="max-w-2xl"
          />

          {/* Accessible Marquee Pause / Play Control */}
          <div className="shrink-0 self-start sm:self-end">
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={
                isPaused
                  ? "Play client logos marquee"
                  : "Pause client logos marquee"
              }
              aria-pressed={isPaused}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] shadow-xs hover:bg-[var(--border)]/20 transition-colors focus-visible:outline-2"
            >
              {isPaused ? (
                <>
                  <Play className="h-3.5 w-3.5 text-[var(--primary)]" />
                  <span>Play Animation</span>
                </>
              ) : (
                <>
                  <Pause className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                  <span>Pause Animation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Marquee Track Container with Edge Fade Masks */}
      <div className="relative w-full overflow-hidden group">
        {/* Left & Right gradient fade masks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10"
        />

        <div className="space-y-4">
          {/* Row 1: Leftward scroll */}
          <div
            className={`flex w-max space-x-4 animate-marquee-left group-hover:[animation-play-state:paused] ${
              isPaused ? "pause-animation" : ""
            }`}
          >
            {row1.concat(row1).map((client, idx) => (
              <div
                key={`row1-${client.name}-${idx}`}
                aria-hidden={idx >= row1.length}
                className="flex h-20 w-44 sm:h-24 sm:w-52 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--logo-surface)] p-4 shadow-xs transition-transform hover:scale-[1.02]"
              >
                <div className="relative h-12 w-full">
                  <Image
                    src={client.logo as string}
                    alt={`${client.name} logo`}
                    fill
                    sizes="208px"
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Rightward scroll */}
          <div
            className={`flex w-max space-x-4 animate-marquee-right group-hover:[animation-play-state:paused] ${
              isPaused ? "pause-animation" : ""
            }`}
          >
            {row2.concat(row2).map((client, idx) => (
              <div
                key={`row2-${client.name}-${idx}`}
                aria-hidden={idx >= row2.length}
                className="flex h-20 w-44 sm:h-24 sm:w-52 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--logo-surface)] p-4 shadow-xs transition-transform hover:scale-[1.02]"
              >
                <div className="relative h-12 w-full">
                  <Image
                    src={client.logo as string}
                    alt={`${client.name} logo`}
                    fill
                    sizes="208px"
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
