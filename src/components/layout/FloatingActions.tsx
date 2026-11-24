"use client";

import { useEffect, useState, useRef, useCallback, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, Copy, Check, X, PhoneCall } from "lucide-react";
import {
  whatsappUrl,
  whatsappUrlForService,
  phoneHref,
} from "@/config/site";
import { services } from "@/data/services";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

function subscribeMediaQuery(query: string) {
  return (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const media = window.matchMedia(query);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  };
}

function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    subscribeMediaQuery(query),
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : serverFallback),
    () => serverFallback
  );
}

export function FloatingActions() {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [hasAppeared, setHasAppeared] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [formFieldFocused, setFormFieldFocused] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)", false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);

  const popoverRef = useRef<HTMLDivElement>(null);
  const callTriggerRef = useRef<HTMLButtonElement>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset popover & focus state during render when route changes
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setPopoverOpen(false);
    setFormFieldFocused(false);
  }

  // WhatsApp link resolution: contextual service text on /services/[slug]
  let currentWaUrl = whatsappUrl;
  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "").split("?")[0].split("#")[0];
    const matchedService = services.find((s) => s.slug === slug);
    if (matchedService) {
      currentWaUrl = whatsappUrlForService(matchedService.title);
    }
  }

  // Close popover and return focus
  const closePopover = useCallback(() => {
    setPopoverOpen(false);
    callTriggerRef.current?.focus();
  }, []);

  // 1. Initial appearance timer (~600ms)
  useEffect(() => {
    const appearTimer = setTimeout(() => {
      setHasAppeared(true);
    }, 600);

    return () => {
      clearTimeout(appearTimer);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  // 2. Mobile menu & lightbox observer on document.body
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

  // 3. Form field focus listener on touch-first (coarse pointer) devices
  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      const isCoarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      if (!isCoarse) return;

      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        setFormFieldFocused(true);
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      if (!related || !["INPUT", "TEXTAREA", "SELECT"].includes(related.tagName)) {
        setFormFieldFocused(false);
      }
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  // 4. Popover outside click & Escape key listener
  useEffect(() => {
    if (!popoverOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        callTriggerRef.current &&
        !callTriggerRef.current.contains(target)
      ) {
        setPopoverOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePopover();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [popoverOpen, closePopover]);

  // Copy number handler with robust fallback
  const handleCopyNumber = async () => {
    const rawNumber = `+91${company.contact.phone}`;
    let successful = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(rawNumber);
        successful = true;
      } catch {
        // Fall back to execCommand if clipboard API blocked
      }
    }

    if (!successful) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = rawNumber;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        successful = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        // Ignore fallback error
      }
    }

    // Always provide visual feedback if copy succeeded or fallback attempted
    setCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Visibility condition: hidden ONLY when menu is open, lightbox is open, or form field is focused on touch
  const isVisible = hasAppeared && !menuOpen && !lightboxOpen && !formFieldFocused;

  return (
    <div
      className={cn(
        "fixed right-[calc(env(safe-area-inset-right,0px)+16px)] bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] z-[45] flex flex-col items-end gap-3 pointer-events-none transition-all duration-300 ease-out",
        reducedMotion && "transition-none",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2"
      )}
      aria-label="Quick contact actions"
    >
      {/* 1. WhatsApp Button (on top) */}
      <a
        href={currentWaUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with STRICON on WhatsApp"
        tabIndex={isVisible ? 0 : -1}
        className={cn(
          "group relative pointer-events-auto flex items-center justify-center min-w-12 min-h-12 h-12 w-12 rounded-full bg-[var(--whatsapp)] text-[var(--whatsapp-foreground)] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
          "md:w-auto md:px-5 md:gap-2.5",
          hasAppeared && isVisible && !reducedMotion && "animate-whatsapp-attention"
        )}
      >
        <MessageCircle className="h-6 w-6 shrink-0 transition-transform group-hover:scale-110" />
        <span className="hidden md:inline font-semibold text-sm tracking-wide">
          WhatsApp
        </span>
      </a>

      {/* 2. Call Button & Desktop Popover Container */}
      <div className="relative flex flex-col items-end">
        {/* Desktop Call Popover Card */}
        {popoverOpen && !isTouchDevice && (
          <div
            ref={popoverRef}
            id="desktop-call-popover"
            role="dialog"
            aria-label="Direct Call Options"
            className="absolute bottom-full right-0 mb-3 z-[50] pointer-events-auto w-72 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border)]">
              <span className="font-heading font-semibold text-xs tracking-wider uppercase text-[var(--muted-foreground)]">
                Direct Line
              </span>
              <button
                type="button"
                onClick={closePopover}
                aria-label="Close call options"
                className="p-1 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-colors focus-visible:outline-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Phone Number Display */}
            <div className="mb-3">
              <p className="font-heading font-bold text-lg text-[var(--foreground)] tracking-tight">
                {company.contact.phoneDisplay}
              </p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                STRICON Operations &bull; {company.workingHours.display}
              </p>
            </div>

            {/* Actions: Copy & Open Phone App */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleCopyNumber}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-medium text-xs transition-colors focus-visible:outline-2",
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-95"
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Number Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy number</span>
                  </>
                )}
              </button>

              <div
                role="status"
                aria-live="polite"
                className="sr-only"
              >
                {copied ? "Phone number copied to clipboard" : ""}
              </div>

              <a
                href={phoneHref}
                onClick={() => setPopoverOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs font-medium text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors focus-visible:outline-2"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Open phone app</span>
              </a>
            </div>
          </div>
        )}

        {/* Call Action: Real <a href="tel:"> on Touch, Interactive <button> on Desktop/Mouse */}
        {isTouchDevice ? (
          <a
            href={phoneHref}
            aria-label="Call STRICON"
            tabIndex={isVisible ? 0 : -1}
            className="group pointer-events-auto flex items-center justify-center min-w-12 min-h-12 h-12 w-12 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)] md:w-auto md:px-5 md:gap-2.5"
          >
            <Phone className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
            <span className="hidden md:inline font-semibold text-sm tracking-wide">
              Call
            </span>
          </a>
        ) : (
          <button
            ref={callTriggerRef}
            type="button"
            onClick={() => setPopoverOpen((prev) => !prev)}
            aria-expanded={popoverOpen}
            aria-controls="desktop-call-popover"
            aria-label="Call STRICON"
            tabIndex={isVisible ? 0 : -1}
            className="group pointer-events-auto flex items-center justify-center min-w-12 min-h-12 h-12 w-12 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)] md:w-auto md:px-5 md:gap-2.5"
          >
            <Phone className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
            <span className="hidden md:inline font-semibold text-sm tracking-wide">
              Call
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
