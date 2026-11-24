"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building,
  Building2,
  Cpu,
  Factory,
  HeartPulse,
  Home,
  Hotel,
  Monitor,
} from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

interface ButtonLinkProps {
  href: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-sm sm:text-base",
        size === "lg" && "px-7 py-3.5 text-base",
        variant === "primary"
          ? "bg-teal-700 text-white hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 shadow-sm"
          : "bg-white text-slate-800 border border-slate-300 hover:border-teal-600 hover:text-teal-700 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:border-teal-400 dark:hover:text-teal-300",
        className
      )}
    >
      {children}
    </Link>
  );
};

const Container: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
    {children}
  </div>
);

type GroupId =
  | "healthcare"
  | "it-ites"
  | "hotels-commercial"
  | "manufacturing-residential";

interface IndustryGroup {
  id: GroupId;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

interface SectorPill {
  id: string;
  slug: string;
  label: string;
  groupId: GroupId;
  angleDeg: number;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const INDUSTRY_GROUPS: readonly IndustryGroup[] = [
  {
    id: "healthcare",
    title: "Healthcare Centres",
    description: "Security and facility support for healthcare environments.",
    icon: HeartPulse,
  },
  {
    id: "it-ites",
    title: "IT & ITES",
    description: "Workplace security and day-to-day facility operations.",
    icon: Monitor,
  },
  {
    id: "hotels-commercial",
    title: "Hotels & Commercial Spaces",
    description: "Professional support for guest-facing and business facilities.",
    icon: Building2,
  },
  {
    id: "manufacturing-residential",
    title: "Manufacturing & Residential Communities",
    description:
      "Security and maintenance for industrial sites, apartments and villa complexes.",
    icon: Factory,
  },
];

// 7 sectors evenly distributed around the circle (0° = 12 o'clock)
const SECTOR_PILLS: readonly SectorPill[] = [
  {
    id: "pill-healthcare",
    slug: "healthcare-centres",
    label: "Healthcare Centres",
    groupId: "healthcare",
    angleDeg: 0,
    icon: HeartPulse,
  },
  {
    id: "pill-it-ites",
    slug: "it-ites",
    label: "IT & ITES",
    groupId: "it-ites",
    angleDeg: 51.43,
    icon: Cpu,
  },
  {
    id: "pill-hotels",
    slug: "hotels",
    label: "Hotels",
    groupId: "hotels-commercial",
    angleDeg: 102.86,
    icon: Hotel,
  },
  {
    id: "pill-commercial",
    slug: "commercial-spaces",
    label: "Commercial Spaces",
    groupId: "hotels-commercial",
    angleDeg: 154.29,
    icon: Building2,
  },
  {
    id: "pill-manufacturing",
    slug: "manufacturing",
    label: "Manufacturing",
    groupId: "manufacturing-residential",
    angleDeg: 205.71,
    icon: Factory,
  },
  {
    id: "pill-apartments",
    slug: "apartments",
    label: "Apartments",
    groupId: "manufacturing-residential",
    angleDeg: 257.14,
    icon: Building,
  },
  {
    id: "pill-villas",
    slug: "villa-complexes",
    label: "Villa Complexes",
    groupId: "manufacturing-residential",
    angleDeg: 308.57,
    icon: Home,
  },
];

function getPillPercentPosition(angleDeg: number, radiusPercent: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    left: `${50 + radiusPercent * Math.cos(rad)}%`,
    top: `${50 + radiusPercent * Math.sin(rad)}%`,
  };
}

export interface IndustryFocusSectionProps {
  className?: string;
}

export const IndustryFocusSection: React.FC<IndustryFocusSectionProps> = ({
  className,
}) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<GroupId | null>(null);

  return (
    <section
      aria-labelledby="stricon-industry-focus-heading"
      className={cn(
        "relative overflow-x-hidden py-16 sm:py-20 lg:py-24 bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100",
        className
      )}
    >
      <style>{`
        @keyframes striconSpinClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes striconSpinAnticlockwise {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .stricon-orbit-cw {
          transform-box: fill-box;
          transform-origin: center;
          animation: striconSpinClockwise 28s linear infinite;
        }
        .stricon-orbit-ccw {
          transform-box: fill-box;
          transform-origin: center;
          animation: striconSpinAnticlockwise 22s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .stricon-orbit-cw,
          .stricon-orbit-ccw {
            animation: none;
          }
        }
      `}</style>

      <Container>
        {/* Top Centered Heading */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">
            Industry Focus
          </p>
          <h2
            id="stricon-industry-focus-heading"
            className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Sectors We Protect &amp; Maintain
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            We have well-trained personnel deployed at Health care centers, IT,
            ITES, Hotels, Commercial, Manufacturing and large residential
            apartments and villa complexes in Hyderabad.
          </p>
        </div>

        {/* Two-Column Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: 4 Vertically Arranged Industry Groups */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            {INDUSTRY_GROUPS.map((group) => {
              const GroupIcon = group.icon;
              const isGroupHighlighted = activeGroup === group.id;

              return (
                <div
                  key={group.id}
                  onMouseEnter={() => setActiveGroup(group.id)}
                  onMouseLeave={() => setActiveGroup(null)}
                  className={cn(
                    "group flex items-start gap-4 rounded-xl p-3 -mx-3 transition-all duration-200 border-l-2 cursor-pointer",
                    isGroupHighlighted
                      ? "bg-white dark:bg-slate-900/90 border-teal-600 dark:border-teal-400 shadow-xs"
                      : "border-transparent hover:bg-white/70 dark:hover:bg-slate-900/60 hover:border-teal-500/60"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-200",
                      isGroupHighlighted
                        ? "bg-teal-700 text-white border-teal-700 dark:bg-teal-500 dark:border-teal-500 shadow-sm"
                        : "bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 border-slate-200 dark:border-slate-800 group-hover:border-teal-500"
                    )}
                  >
                    <GroupIcon className="h-5 w-5" strokeWidth={1.85} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {group.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Circular Industry Ecosystem */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              role="region"
              aria-label="STRICON circular industry ecosystem"
              className="relative aspect-square w-full max-w-[310px] sm:max-w-[440px] md:max-w-[500px] select-none"
            >

              {/* Rotating Dotted Circles + Teal/Blue Dots + Radial Spokes */}
              <svg
                viewBox="0 0 440 440"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full z-10 overflow-visible"
              >
                {/* Subtle inner static ring */}
                <circle
                  cx="220"
                  cy="220"
                  r="82"
                  fill="none"
                  className="stroke-slate-200 dark:stroke-slate-800"
                  strokeWidth="1"
                />

                {/* Inner dotted circle: rotates ANTICLOCKWISE with highlighted teal/blue dots */}
                <g className="stricon-orbit-ccw">
                  <circle
                    cx="220"
                    cy="220"
                    r="118"
                    fill="none"
                    className="stroke-teal-600/55 dark:stroke-teal-400/50"
                    strokeWidth="1.75"
                    strokeDasharray="2 7"
                    strokeLinecap="round"
                  />
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                    const rad = ((deg - 90) * Math.PI) / 180;
                    const cx = 220 + 118 * Math.cos(rad);
                    const cy = 220 + 118 * Math.sin(rad);
                    return (
                      <circle
                        key={`inner-dot-${deg}`}
                        cx={cx}
                        cy={cy}
                        r={i % 2 === 0 ? 3.8 : 3}
                        className={
                          i % 2 === 0
                            ? "fill-teal-600 dark:fill-teal-400"
                            : "fill-sky-600 dark:fill-sky-400"
                        }
                      />
                    );
                  })}
                </g>

                {/* Outer dotted circle: rotates CLOCKWISE with highlighted teal/blue dots */}
                <g className="stricon-orbit-cw">
                  <circle
                    cx="220"
                    cy="220"
                    r="164"
                    fill="none"
                    className="stroke-sky-600/60 dark:stroke-sky-400/55"
                    strokeWidth="2"
                    strokeDasharray="2.5 8"
                    strokeLinecap="round"
                  />
                  {[25, 95, 165, 235, 305].map((deg, i) => {
                    const rad = ((deg - 90) * Math.PI) / 180;
                    const cx = 220 + 164 * Math.cos(rad);
                    const cy = 220 + 164 * Math.sin(rad);
                    return (
                      <circle
                        key={`outer-dot-${deg}`}
                        cx={cx}
                        cy={cy}
                        r={i % 2 === 0 ? 4.2 : 3.2}
                        className={
                          i % 2 === 0
                            ? "fill-sky-600 dark:fill-sky-400"
                            : "fill-teal-600 dark:fill-teal-400"
                        }
                      />
                    );
                  })}
                </g>

                {/* Static radial lines connecting hub to each sector */}
                {SECTOR_PILLS.map((pill) => {
                  const rad = ((pill.angleDeg - 90) * Math.PI) / 180;
                  const x1 = 220 + 56 * Math.cos(rad);
                  const y1 = 220 + 56 * Math.sin(rad);
                  const x2 = 220 + 158 * Math.cos(rad);
                  const y2 = 220 + 158 * Math.sin(rad);

                  const isHighlighted =
                    activeSlug === pill.slug || activeGroup === pill.groupId;

                  return (
                    <line
                      key={`line-${pill.id}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      strokeWidth={isHighlighted ? 2 : 1.15}
                      className={cn(
                        "transition-all duration-200",
                        isHighlighted
                          ? "stroke-teal-600 dark:stroke-teal-400 opacity-100"
                          : "stroke-slate-300/80 dark:stroke-slate-700/80 opacity-80"
                      )}
                    />
                  );
                })}
              </svg>

              {/* Stationary Central STRICON Shield Hub with user's provided shield emblem */}
              <div
                aria-label="STRICON Security Hub"
                className="
                  absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2
                  flex h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32
                  flex-col items-center justify-center rounded-full
                  bg-white dark:bg-slate-900
                  border-2 border-teal-600/80 dark:border-teal-400/80
                  shadow-lg ring-4 ring-teal-500/15 dark:ring-teal-400/10
                  p-2
                "
              >
                <div className="relative flex h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full overflow-hidden">
                  <Image
                    src="/images/logo/stricon-emblem-shield.jpg"
                    alt="STRICON Corporate Shield Emblem"
                    width={64}
                    height={64}
                    className="object-contain max-h-full max-w-full drop-shadow-sm"
                    priority
                  />
                </div>
                <span className="mt-0.5 text-[10px] sm:text-[11px] font-extrabold tracking-wider text-slate-900 dark:text-white">
                  STRICON
                </span>
              </div>

              {/* Seven Fixed Industry Pills Around the Circle */}
              {SECTOR_PILLS.map((pill) => {
                const PillIcon = pill.icon;
                const posStyle = getPillPercentPosition(pill.angleDeg, 38.5);
                const isHovered =
                  activeSlug === pill.slug || activeGroup === pill.groupId;

                return (
                  <button
                    key={pill.id}
                    type="button"
                    style={posStyle}
                    onMouseEnter={() => {
                      setActiveSlug(pill.slug);
                      setActiveGroup(pill.groupId);
                    }}
                    onMouseLeave={() => {
                      setActiveSlug(null);
                      setActiveGroup(null);
                    }}
                    onFocus={() => {
                      setActiveSlug(pill.slug);
                      setActiveGroup(pill.groupId);
                    }}
                    onBlur={() => {
                      setActiveSlug(null);
                      setActiveGroup(null);
                    }}
                    className={cn(
                      "absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer",
                      "rounded-full px-2 sm:px-3.5 py-1 sm:py-1.5",
                      "text-[10px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5",
                      "border whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                      isHovered
                        ? "bg-teal-700 text-white dark:bg-teal-500 dark:text-slate-950 border-teal-700 dark:border-teal-400 scale-110 shadow-[0_0_20px_rgba(13,148,136,0.45)] ring-2 ring-teal-400/40"
                        : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-300"
                    )}
                  >
                    <PillIcon
                      className={cn(
                        "h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 transition-colors duration-200",
                        isHovered
                          ? "text-white dark:text-slate-950"
                          : "text-teal-700 dark:text-teal-400"
                      )}
                      strokeWidth={2}
                    />
                    <span>{pill.label}</span>
                  </button>
                );
              })}

            </div>
          </div>
        </div>

        {/* Bottom CTA Buttons */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ButtonLink href="/services" variant="primary" size="md">
            <span>Explore Our Services</span>
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="md">
            <span>Talk to Our Team</span>
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
};

export { IndustryFocusSection as IndustriesServed };
export default IndustryFocusSection;
