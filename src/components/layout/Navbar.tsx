"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/types/navigation";
import { cn } from "@/lib/utils";

interface NavbarProps {
  items: NavLink[];
}

export function Navbar({ items }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
      {items.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "text-[var(--color-primary)] font-semibold bg-[var(--color-primary)]/10"
                : "text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]"
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
