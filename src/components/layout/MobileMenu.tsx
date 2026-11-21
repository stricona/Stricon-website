"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/types/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  items: NavLink[];
  cta: NavLink;
}

export function MobileMenu({ items, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Automatically reset menu open state on route navigation
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
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

    // Initial focus on first interactive element inside menu
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
        className="p-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] transition-colors"
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
            className="w-full max-w-xs h-full bg-[var(--color-surface)] border-l border-[var(--color-border)] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
                <span className="font-heading font-semibold text-lg text-[var(--color-foreground)]">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className="p-2 rounded-md text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav aria-label="Mobile Navigation Links" className="mt-6 flex flex-col gap-2">
                {items.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-md text-base font-medium transition-colors",
                        isActive
                          ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold"
                          : "text-[var(--color-foreground)] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[var(--color-border)] flex flex-col gap-4">
              <Link
                href={cta.href}
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-3 rounded-md font-semibold text-sm bg-[var(--color-accent-gold)] text-[var(--color-accent-gold-foreground)] hover:opacity-95 transition-opacity shadow-xs"
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
