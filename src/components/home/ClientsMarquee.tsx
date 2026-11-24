"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { Container, SectionHeading } from "@/components/common";
import { clients, approvedDeploymentSentence } from "@/data/clients";
import { industries } from "@/data/industries";

interface ClientsMarqueeProps {
  heading?: string;
  sentence?: string;
  eyebrow?: string;
  className?: string;
  showIndustriesChips?: boolean;
}

export function ClientsMarquee({
  heading = "Few of our esteemed clients",
  sentence = approvedDeploymentSentence,
  eyebrow = "Esteemed Clients",
  className = "",
  showIndustriesChips = false,
}: ClientsMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Filter approved clients (excluding Crown Brewing which has displayApproved: false)
  const approvedClients = clients.filter((c) => c.displayApproved);

  // Split into two distinct rows for opposite scrolling
  const mid = Math.ceil(approvedClients.length / 2);
  const row1 = approvedClients.slice(0, mid);
  const row2 = approvedClients.slice(mid);

  return (
    <section
      className={`relative overflow-hidden py-16 sm:py-20 bg-[var(--surface)]/50 border-y border-[var(--border)] ${className}`}
    >
      <Container className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow={eyebrow}
            title={heading}
            intro={sentence}
            className="max-w-3xl"
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

        {showIndustriesChips && (
          <div className="flex flex-wrap gap-2 pt-6">
            {industries.map((ind) => (
              <span
                key={ind.name}
                className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] shadow-2xs"
              >
                {ind.name}
              </span>
            ))}
          </div>
        )}
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
          {/* Row 1: Leftward scroll (Full Colour, no grayscale or opacity filters) */}
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
                {client.logo ? (
                  <div className="relative h-12 w-full">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      fill
                      sizes="208px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="font-heading font-semibold text-xs text-center text-[#29283A] px-2 line-clamp-2">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Row 2: Rightward scroll (Full Colour, no grayscale or opacity filters) */}
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
                {client.logo ? (
                  <div className="relative h-12 w-full">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      fill
                      sizes="208px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="font-heading font-semibold text-xs text-center text-[#29283A] px-2 line-clamp-2">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
