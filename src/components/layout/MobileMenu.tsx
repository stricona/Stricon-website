"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink } from "@/types/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { services, serviceCategories } from "@/data/services";
import { ServiceGroupCategory } from "@/types/service";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  items: NavLink[];
  cta: NavLink;
}

const categoryOrder: ServiceGroupCategory[] = [
  "security",
  "facility",
  "manpower",
];

export function MobileMenu({ items, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="md:hidden flex items-center gap-2">
      <ThemeToggle />
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--primary)] transition-colors focus-visible:outline-2"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
          aria-modal="true"
          role="dialog"
          aria-label="Mobile Navigation"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div
            ref={menuRef}
            id="mobile-menu-panel"
            className="w-full max-w-xs h-full bg-[var(--surface)] border-l border-[var(--border)] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
                <span className="font-heading font-semibold text-lg text-[var(--foreground)]">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] focus-visible:outline-2"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav aria-label="Mobile Navigation Links" className="mt-6 flex flex-col gap-1.5">
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
                            "flex items-center justify-between rounded-lg px-4 py-2.5 transition-colors",
                            isActive
                              ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
                              : "text-[var(--foreground)] hover:bg-[var(--background)]"
                          )}
                        >
                          <Link
                            href="/services"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 focus-visible:outline-2"
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
                            className="p-1 text-inherit focus-visible:outline-2 rounded"
                          >
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform duration-200",
                                servicesExpanded && "rotate-180"
                              )}
                            />
                          </button>
                        </div>

                        {/* Services Accordion Panel */}
                        {servicesExpanded && (
                          <div
                            id="mobile-services-accordion"
                            className="ml-3 mt-1.5 pl-3 border-l-2 border-[var(--border)] space-y-3 py-2 text-xs"
                          >
                            <Link
                              href="/services"
                              onClick={() => setIsOpen(false)}
                              className="block font-semibold text-[var(--primary)] py-1"
                            >
                              All Services Overview →
                            </Link>

                            {categoryOrder.map((catKey) => {
                              const catMeta = serviceCategories[catKey];
                              const catServices = services.filter(
                                (s) => s.category === catKey
                              );

                              return (
                                <div key={catKey} className="space-y-1">
                                  <p className="font-bold text-[10px] uppercase tracking-wider text-[var(--secondary)]">
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
                                              "block py-1 rounded px-2 transition-colors",
                                              isCurr
                                                ? "bg-[var(--primary)] text-white font-medium"
                                                : "text-[var(--foreground)] hover:text-[var(--primary)]"
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
                        "px-4 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-2",
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
            </div>

            <div className="pt-6 border-t border-[var(--border)] flex flex-col gap-4">
              <Link
                href={cta.href}
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-3 rounded-lg font-semibold text-sm bg-[var(--accent-gold)] text-[var(--accent-gold-foreground)] hover:opacity-95 transition-opacity shadow-xs focus-visible:outline-2"
              >
                {cta.title}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
