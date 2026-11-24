"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight, ShieldCheck, Building, Users } from "lucide-react";
import { NavLink } from "@/types/navigation";
import { services, serviceCategories } from "@/data/services";
import { ServiceGroupCategory } from "@/types/service";
import { cn } from "@/lib/utils";

interface NavbarProps {
  items: NavLink[];
}

const categoryIcons: Record<
  ServiceGroupCategory,
  React.ComponentType<{ className?: string }>
> = {
  security: ShieldCheck,
  facility: Building,
  manpower: Users,
};

const categoryOrder: ServiceGroupCategory[] = [
  "security",
  "facility",
  "manpower",
];

export function Navbar({ items }: NavbarProps) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on pathname change (during render)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setDropdownOpen(false);
  }

  // Handle outside click & escape key
  useEffect(() => {
    if (!dropdownOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setDropdownOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  // Hover handlers with debounce for mouse users
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="hidden lg:flex items-center gap-1 xl:gap-2"
    >
      {items.map((item) => {
        const isServices = item.href === "/services";
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        if (isServices) {
          return (
            <div
              key={item.href}
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative inline-flex items-center"
            >
              <div
                className={cn(
                  "inline-flex items-center rounded-lg transition-colors",
                  isActive
                    ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
                    : "text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--surface)]"
                )}
              >
                <Link
                  href="/services"
                  className="px-3 py-2 text-sm font-medium focus-visible:outline-2"
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.title}
                </Link>

                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-controls="desktop-services-dropdown"
                  aria-label="Show services menu"
                  className="pr-2.5 pl-0.5 py-2 text-inherit focus-visible:outline-2 rounded-r-lg"
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                </button>
              </div>

              {/* Accessible Dropdown Menu */}
              {dropdownOpen && (
                <div
                  id="desktop-services-dropdown"
                  role="region"
                  aria-label="Services Submenu"
                  className="absolute top-full left-0 mt-1.5 w-[640px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {/* Top Bar: All Services Link */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)]">
                    <div>
                      <p className="font-heading font-bold text-sm text-[var(--foreground)]">
                        STRICON Capabilities
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        Full-spectrum security, facility, and manpower solutions in Hyderabad
                      </p>
                    </div>
                    <Link
                      href="/services"
                      onClick={() => setDropdownOpen(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:text-[var(--secondary)] transition-colors focus-visible:outline-2 rounded-md px-2 py-1"
                    >
                      <span>All Services</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {/* 3 Categories Grid */}
                  <div className="grid grid-cols-3 gap-5">
                    {categoryOrder.map((catKey) => {
                      const catMeta = serviceCategories[catKey];
                      const catServices = services.filter(
                        (s) => s.category === catKey
                      );
                      const Icon = categoryIcons[catKey];

                      return (
                        <div key={catKey} className="space-y-2.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
                            <Icon className="h-3.5 w-3.5" />
                            <span>{catMeta.name}</span>
                          </div>

                          <ul className="space-y-1">
                            {catServices.map((service) => {
                              const isServiceActive =
                                pathname === `/services/${service.slug}`;

                              return (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    onClick={() => setDropdownOpen(false)}
                                    className={cn(
                                      "block rounded-lg px-2.5 py-1.5 text-xs leading-snug transition-colors focus-visible:outline-2",
                                      isServiceActive
                                        ? "bg-[var(--primary)] text-white font-semibold"
                                        : "text-[var(--foreground)] hover:bg-[var(--background)] hover:text-[var(--primary)]"
                                    )}
                                  >
                                    {service.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:outline-2",
              isActive
                ? "text-[var(--primary)] font-semibold bg-[var(--primary)]/10"
                : "text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--surface)]"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
