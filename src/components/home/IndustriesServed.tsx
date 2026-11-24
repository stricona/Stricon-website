"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Hospital,
  Monitor,
  Hotel,
  Building,
  Factory,
  Home,
  Building2,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Container, ButtonLink } from "@/components/common";
import { cn } from "@/lib/utils";

// 4 Vertically arranged content groups for Left Column
interface IndustryGroup {
  id: string;
  title: string;
  description: string;
  location: string;
  icon: React.ComponentType<{ className?: string }>;
  associatedPills: string[];
}

const industryGroups: IndustryGroup[] = [
  {
    id: "healthcare",
    title: "Healthcare Centres",
    description: "Security and facility support for healthcare environments.",
    location: "Deployment: Hyderabad",
    icon: Hospital,
    associatedPills: ["healthcare"],
  },
  {
    id: "it-ites",
    title: "IT & ITES",
    description: "Workplace security and day-to-day facility operations.",
    location: "Deployment: Hyderabad",
    icon: Monitor,
    associatedPills: ["it-ites"],
  },
  {
    id: "hotels-commercial",
    title: "Hotels & Commercial Spaces",
    description: "Professional support for guest-facing and business facilities.",
    location: "Deployment: Hyderabad",
    icon: Building2,
    associatedPills: ["hotels", "commercial"],
  },
  {
    id: "manufacturing-residential",
    title: "Manufacturing & Residential Communities",
    description:
      "Security and maintenance for industrial sites, apartments and villa complexes.",
    location: "Deployment: Hyderabad",
    icon: Factory,
    associatedPills: ["manufacturing", "apartments", "villas"],
  },
];

// 7 Floating labels for the Circular Infographic Ecosystem
interface EcosystemPill {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  positionClass: string;
  groupId: string;
}

const ecosystemPills: EcosystemPill[] = [
  {
    id: "healthcare",
    label: "Healthcare Centres",
    icon: Hospital,
    positionClass: "top-[2%] left-1/2 -translate-x-1/2",
    groupId: "healthcare",
  },
  {
    id: "it-ites",
    label: "IT & ITES",
    icon: Monitor,
    positionClass: "top-[19%] right-[2%] sm:right-[6%]",
    groupId: "it-ites",
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: Hotel,
    positionClass: "top-[42%] right-[0%] sm:right-[1%]",
    groupId: "hotels-commercial",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: Factory,
    positionClass: "bottom-[20%] right-[3%] sm:right-[8%]",
    groupId: "manufacturing-residential",
  },
  {
    id: "villas",
    label: "Villa Complexes",
    icon: Home,
    positionClass: "bottom-[2%] left-[64%] -translate-x-1/2 sm:left-[62%]",
    groupId: "manufacturing-residential",
  },
  {
    id: "apartments",
    label: "Apartments",
    icon: BuildingCheckIcon,
    positionClass: "bottom-[2%] left-[34%] -translate-x-1/2 sm:left-[36%]",
    groupId: "manufacturing-residential",
  },
  {
    id: "commercial",
    label: "Commercial Spaces",
    icon: Building,
    positionClass: "top-[38%] left-[0%] sm:left-[1%]",
    groupId: "hotels-commercial",
  },
];

function BuildingCheckIcon({ className }: { className?: string }) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <Building className={className} />
    </div>
  );
}

export function IndustriesServed() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#0B1120] border-y border-slate-200 dark:border-slate-800 transition-colors overflow-hidden">
      <Container>
        {/* Top Centered Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/80 mb-3 shadow-xs">
            <span>Industry Focus</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight mb-3">
            Sectors We Protect & Maintain
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            We have well-trained personnel deployed at Health care centers, IT,
            ITES, Hotels, Commercial, Manufacturing and large residential
            apartments and villa complexes in Hyderabad.
          </p>
        </div>

        {/* Main Content: Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: 4 Vertically Arranged Content Groups */}
          <div className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-8">
            {industryGroups.map((group) => {
              const Icon = group.icon;
              const isHovered = activeGroup === group.id;

              return (
                <div
                  key={group.id}
                  onMouseEnter={() => setActiveGroup(group.id)}
                  onMouseLeave={() => setActiveGroup(null)}
                  className={cn(
                    "group flex items-start gap-4 p-3 -mx-3 rounded-xl transition-all duration-200 cursor-pointer",
                    isHovered
                      ? "bg-blue-50/60 dark:bg-blue-950/30 translate-x-1"
                      : "hover:bg-slate-50/80 dark:hover:bg-slate-900/40"
                  )}
                >
                  {/* Teal/Blue Outline Icon Badge */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 shadow-xs",
                      isHovered
                        ? "border-blue-500 bg-blue-600 text-white dark:bg-blue-500 dark:border-blue-400 scale-105 shadow-md ring-2 ring-blue-500/20"
                        : "border-teal-500/40 bg-teal-50/50 text-teal-700 dark:border-teal-400/30 dark:bg-teal-950/40 dark:text-teal-300 group-hover:border-blue-400 group-hover:text-blue-600"
                    )}
                  >
                    <Icon className="h-6 w-6 stroke-[1.8]" />
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={cn(
                        "font-heading text-base sm:text-lg font-bold transition-colors mb-1",
                        isHovered
                          ? "text-blue-900 dark:text-blue-200"
                          : "text-[#0F172A] dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300"
                      )}
                    >
                      {group.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-1.5">
                      {group.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-[#2563EB] dark:text-blue-400 font-medium">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span>{group.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Circular Industry Ecosystem Infographic */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[480px] sm:max-w-[530px] flex items-center justify-center p-3 select-none">
              {/* Outside Annotation Label 1 (Top Left): "Industry-specific support" */}
              <div className="absolute top-[8%] left-[6%] sm:left-[8%] z-40 flex flex-col items-end pointer-events-none">
                <span className="font-heading italic text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium tracking-tight">
                  Industry-specific support
                </span>
                {/* Curved arrow pointing toward the circle */}
                <svg
                  className="w-8 h-8 text-slate-400 dark:text-slate-500 -mt-1 mr-2"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M6 6 C 14 12, 18 18, 22 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="2 3"
                  />
                  <path
                    d="M16 23 L22 24 L21 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Outside Annotation Label 2 (Bottom Right): "Integrated service delivery" */}
              <div className="absolute bottom-[8%] right-[6%] sm:right-[8%] z-40 flex flex-col items-start pointer-events-none">
                {/* Curved arrow pointing toward the circle */}
                <svg
                  className="w-8 h-8 text-slate-400 dark:text-slate-500 -mb-1 ml-2"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M26 26 C 18 20, 14 14, 10 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="2 3"
                  />
                  <path
                    d="M16 9 L10 8 L11 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-heading italic text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium tracking-tight">
                  Integrated service delivery
                </span>
              </div>

              {/* Concentric Dashed Orbital Rings & Fine Radiating Connecting Lines (SVG) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 520 520"
                fill="none"
              >
                {/* Outer Orbit Ring (Radius = 205) */}
                <circle
                  cx="260"
                  cy="260"
                  r="205"
                  className="stroke-blue-200/90 dark:stroke-blue-900/60"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
                {/* Inner Orbit Ring (Radius = 135) */}
                <circle
                  cx="260"
                  cy="260"
                  r="135"
                  className="stroke-blue-200/90 dark:stroke-blue-900/60"
                  strokeWidth="1.5"
                  strokeDasharray="3 5"
                />

                {/* Decorative Dots on the Orbital Circles */}
                <circle cx="260" cy="55" r="3.5" className="fill-blue-500" />
                <circle cx="435" cy="160" r="3" className="fill-teal-500" />
                <circle cx="465" cy="260" r="3.5" className="fill-blue-500" />
                <circle cx="435" cy="360" r="3" className="fill-teal-500" />
                <circle cx="260" cy="465" r="3.5" className="fill-blue-500" />
                <circle cx="85" cy="360" r="3" className="fill-teal-500" />
                <circle cx="55" cy="260" r="3.5" className="fill-blue-500" />

                {/* Fine connecting radiating lines from central hub edge to orbital pills */}
                <line
                  x1="260"
                  y1="190"
                  x2="260"
                  y2="65"
                  className="stroke-blue-300/40 dark:stroke-blue-700/40"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line
                  x1="315"
                  y1="210"
                  x2="425"
                  y2="160"
                  className="stroke-blue-300/40 dark:stroke-blue-700/40"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line
                  x1="330"
                  y1="260"
                  x2="445"
                  y2="260"
                  className="stroke-blue-300/40 dark:stroke-blue-700/40"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line
                  x1="315"
                  y1="310"
                  x2="420"
                  y2="365"
                  className="stroke-blue-300/40 dark:stroke-blue-700/40"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line
                  x1="260"
                  y1="330"
                  x2="260"
                  y2="455"
                  className="stroke-blue-300/40 dark:stroke-blue-700/40"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line
                  x1="205"
                  y1="310"
                  x2="100"
                  y2="365"
                  className="stroke-blue-300/40 dark:stroke-blue-700/40"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line
                  x1="190"
                  y1="260"
                  x2="75"
                  y2="260"
                  className="stroke-blue-300/40 dark:stroke-blue-700/40"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
              </svg>

              {/* Central STRICON Hub inside Prominent Circular Shape */}
              <div className="relative z-20 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white dark:bg-slate-900 p-3 shadow-xl border-2 border-blue-500/40 dark:border-blue-400/50 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105">
                {/* Ambient glow halo */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-600/20 via-teal-500/20 to-sky-400/20 blur-sm -z-10" />

                {/* STRICON Shield Emblem Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-1">
                  <Image
                    src="/images/logo/stricon-emblem-shield.jpg"
                    alt="STRICON Corporate Shield"
                    width={80}
                    height={80}
                    className="object-contain drop-shadow-sm max-h-full"
                    priority
                  />
                </div>

                {/* Central Hub Label: Deployment: Hyderabad */}
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-tight bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] text-white dark:from-blue-600 dark:to-indigo-600 shadow-xs">
                  Deployment: Hyderabad
                </span>
              </div>

              {/* Surrounding 7 Connected Floating Pill-Shaped Labels */}
              {ecosystemPills.map((pill) => {
                const Icon = pill.icon;
                const isHovered =
                  activeGroup === pill.groupId || activeGroup === pill.id;

                return (
                  <div
                    key={pill.id}
                    onMouseEnter={() => setActiveGroup(pill.groupId)}
                    onMouseLeave={() => setActiveGroup(null)}
                    className={cn(
                      "absolute z-30 transition-all duration-200 cursor-pointer",
                      pill.positionClass
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 shadow-sm border transition-all duration-200 whitespace-nowrap",
                        isHovered
                          ? "bg-blue-600 text-white dark:bg-blue-500 border-blue-600 dark:border-blue-400 scale-110 shadow-md ring-2 ring-blue-400/30"
                          : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:scale-105"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 transition-colors",
                          isHovered
                            ? "text-white"
                            : "text-blue-600 dark:text-blue-400"
                        )}
                      />
                      <span>{pill.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 5: Bottom CTA (Two Buttons) */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-4">
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
}
