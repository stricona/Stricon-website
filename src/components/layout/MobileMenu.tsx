"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, MessageCircle } from "lucide-react";
import { NavLink } from "@/types/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { services, serviceCategories } from "@/data/services";
import { ServiceGroupCategory } from "@/types/service";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  items: NavLink[];
  cta: NavLink;
}

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const categoryOrder: ServiceGroupCategory[] = [
  "security",
  "facility",
  "manpower",
];

export function MobileMenu({ items, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useIsMounted();
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [servicesExpanded, setServicesExpanded] = useState(() =>
    pathname.startsWith("/services")
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Automatically reset menu open state & sync services expansion on route navigation
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setServicesExpanded(pathname.startsWith("/services"));
  }

  // Lock body scroll and mark data-menu-open when open
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute("data-menu-open", "true");
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.removeAttribute("data-menu-open");
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Close menu automatically on window resize to desktop (1024px+)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Focus management & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      const firstInteractive = menuRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      firstInteractive?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen]);

  // Mobile menu overlay and panel content
  const menuContent = isOpen && mounted && (
    <div data-mobile-menu-portal className="lg:hidden">
      {/* Backdrop covering screen below header */}
      <div
        className="fixed inset-x-0 top-16 bottom-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        aria-hidden="true"
        onClick={() => {
          setIsOpen(false);
          triggerRef.current?.focus();
        }}
      />

      {/* Navigation panel positioned directly below header */}
      <div
        ref={menuRef}
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto bg-[var(--surface)] border-b border-[var(--border)] shadow-2xl transition-all duration-200 ease-out"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col gap-6">
          <nav aria-label="Mobile Navigation Links" className="flex flex-col gap-1.5">
            {items.map((item) => {
              const isServices = item.href === "/services";
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              if (isServices) {
                return (
                  <div key={item.href} className="flex flex-col">
                    <div
                      className={cn(
                        "flex items-center justify-between rounded-lg px-4 py-3 min-h-[44px] transition-colors",
                        isActive
                          ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
                          : "text-[var(--foreground)] hover:bg-[var(--background)]"
                      )}
                    >
                      <Link
                        href="/services"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 text-base font-medium focus-visible:outline-2"
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setServicesExpanded((prev) => !prev)}
                        aria-expanded={servicesExpanded}
                        aria-controls="mobile-services-accordion"
                        aria-label="Toggle services list"
                        className="p-2 text-inherit focus-visible:outline-2 rounded-md hover:bg-[var(--surface)]"
                      >
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform duration-200",
                            servicesExpanded && "rotate-180"
                          )}
                        />
                      </button>
                    </div>

                    {/* Services Accordion Panel */}
                    {servicesExpanded && (
                      <div
                        id="mobile-services-accordion"
                        className="ml-3 mt-1.5 pl-3 border-l-2 border-[var(--border)] space-y-4 py-2 text-sm"
                      >
                        <Link
                          href="/services"
                          onClick={() => setIsOpen(false)}
                          className="block font-semibold text-[var(--primary)] py-1.5 hover:underline"
                        >
                          All Services Overview →
                        </Link>

                        {categoryOrder.map((catKey) => {
                          const catMeta = serviceCategories[catKey];
                          const catServices = services.filter(
                            (s) => s.category === catKey
                          );

                          return (
                            <div key={catKey} className="space-y-1.5">
                              <p className="font-bold text-xs uppercase tracking-wider text-[var(--secondary)]">
                                {catMeta.name}
                              </p>
                              <ul className="space-y-1">
                                {catServices.map((s) => {
                                  const isCurr = pathname === `/services/${s.slug}`;
                                  return (
                                    <li key={s.slug}>
                                      <Link
                                        href={`/services/${s.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                          "block py-2 rounded px-2.5 text-sm transition-colors min-h-[40px] flex items-center",
                                          isCurr
                                            ? "bg-[var(--primary)] text-white font-medium"
                                            : "text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--background)]"
                                        )}
                                      >
                                        {s.title}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium min-h-[44px] flex items-center transition-colors focus-visible:outline-2",
                    isActive
                      ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
                      : "text-[var(--foreground)] hover:bg-[var(--background)] hover:text-[var(--primary)]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Action Row: CTA & Quick Contact */}
          <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <Link
              href={cta.href}
              onClick={() => setIsOpen(false)}
              className="text-center px-5 py-3.5 rounded-lg font-semibold text-sm bg-[var(--accent-gold)] text-[var(--accent-gold-foreground)] hover:opacity-95 transition-opacity shadow-xs focus-visible:outline-2"
            >
              {cta.title}
            </Link>

            <div className="flex items-center justify-around sm:justify-end gap-6 text-xs text-[var(--muted-foreground)] pt-2 sm:pt-0">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-1.5 hover:text-[var(--primary)] font-medium p-1 transition-colors"
              >
                <Phone className="h-4 w-4 text-[var(--primary)]" />
                <span>{siteConfig.links.phoneDisplay}</span>
              </a>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[var(--secondary)] font-medium p-1 transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[var(--secondary)]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:hidden flex items-center gap-2">
      <ThemeToggle />
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 min-w-11 min-h-11 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--primary)] transition-colors focus-visible:outline-2 flex items-center justify-center cursor-pointer"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Render menu portal directly to document.body */}
      {mounted && typeof document !== "undefined" && createPortal(menuContent, document.body)}
    </div>
  );
}
