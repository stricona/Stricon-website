import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Navbar } from "./Navbar";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)] transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:rounded-md shrink-0"
          aria-label={`${siteConfig.name} - Home`}
        >
          {/* Logo container: dark theme places wordmark in small white rounded container */}
          <div className="relative h-10 w-40 sm:h-12 sm:w-48 lg:h-14 lg:w-56 transition-transform group-hover:opacity-95 dark:bg-white dark:px-2 dark:py-1 dark:rounded-md flex items-center">
            <Image
              src="/images/logo/wordmark.jpg"
              alt={`${siteConfig.legalName} Logo`}
              fill
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation (visible on lg: 1024px and up) */}
        <Navbar items={siteConfig.mainNav} />

        {/* Right CTA and Theme Toggle for Desktop (lg: 1024px and up) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Link
            href={siteConfig.cta.href}
            className="px-5 py-2.5 rounded-md font-semibold text-sm bg-[var(--color-accent-gold)] text-[var(--color-accent-gold-foreground)] hover:opacity-95 transition-opacity shadow-xs focus-visible:outline-2"
          >
            {siteConfig.cta.title}
          </Link>
        </div>

        {/* Mobile & Tablet Navigation Trigger & Drawer (below lg: 1024px) */}
        <MobileMenu items={siteConfig.mainNav} cta={siteConfig.cta} />
      </div>
    </header>
  );
}
