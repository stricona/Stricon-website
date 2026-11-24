"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { whatsappUrl, whatsappUrlForService, phoneHref } from "@/config/site";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);

  // Hidden on contact and careers pages
  const isExcludedPage =
    pathname === "/contact" ||
    pathname.startsWith("/contact/") ||
    pathname === "/careers" ||
    pathname.startsWith("/careers/");

  // WhatsApp link resolution: contextual service text on /services/[slug]
  let currentWaUrl = whatsappUrl;
  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "").split("?")[0].split("#")[0];
    const matchedService = services.find((s) => s.slug === slug);
    if (matchedService) {
      currentWaUrl = whatsappUrlForService(matchedService.title);
    }
  }

  // Scroll listener: appear after scrolling 200px
  useEffect(() => {
    const handleScroll = () => {
      const isPast200 = window.scrollY > 200;
      setScrolled(isPast200);
      if (isPast200 && !hasAppeared) {
        setHasAppeared(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAppeared]);

  // Mobile menu & lightbox observer: hide while mobile menu or lightbox is open
  useEffect(() => {
    if (typeof document === "undefined") return;

    const checkOverlays = () => {
      setMenuOpen(document.body.getAttribute("data-menu-open") === "true");
      setLightboxOpen(document.body.getAttribute("data-lightbox-open") === "true");
    };

    checkOverlays();
    const observer = new MutationObserver(checkOverlays);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-menu-open", "data-lightbox-open"],
    });

    return () => observer.disconnect();
  }, []);

  if (isExcludedPage) {
    return null;
  }

  const isVisible = scrolled && !menuOpen && !lightboxOpen;

  return (
    <div
      className={cn(
        "fixed right-4 bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] z-40 flex flex-col items-end gap-3 pointer-events-none transition-all duration-300 ease-out motion-reduce:transition-none",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      )}
      aria-label="Quick contact actions"
    >
      {/* 1. WhatsApp Button (on top) */}
      <a
        href={currentWaUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with STRICON on WhatsApp"
        className={cn(
          "group relative flex items-center justify-center min-w-12 min-h-12 h-12 rounded-full bg-[var(--whatsapp)] text-[var(--whatsapp-foreground)] shadow-lg hover:shadow-xl transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
          "md:w-auto md:px-5 md:gap-2.5",
          hasAppeared && isVisible && "animate-whatsapp-attention"
        )}
      >
        <MessageCircle className="h-6 w-6 shrink-0 transition-transform group-hover:scale-110" />
        <span className="hidden md:inline font-semibold text-sm tracking-wide">
          WhatsApp
        </span>
      </a>

      {/* 2. Call Button (mobile only, below md) */}
      <a
        href={phoneHref}
        aria-label="Call STRICON"
        className="md:hidden flex items-center justify-center min-w-12 min-h-12 h-12 w-12 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg hover:shadow-xl transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)]"
      >
        <Phone className="h-5 w-5 shrink-0" />
        <span className="sr-only">Call</span>
      </a>
    </div>
  );
}
