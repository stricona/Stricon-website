import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Navbar } from "./Navbar";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:rounded-md"
          aria-label={`${siteConfig.name} - Home`}
        >
          {/* Logo container: dark theme places wordmark in small white rounded container */}
          <div className="relative h-12 w-48 sm:h-14 sm:w-56 transition-transform group-hover:opacity-95 dark:bg-white dark:px-2 dark:py-1 dark:rounded-md flex items-center">
            <Image
              src="/images/logo/wordmark.jpg"
              alt={`${siteConfig.legalName} Logo`}
              fill
              sizes="(max-width: 640px) 192px, 224px"
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <Navbar items={siteConfig.mainNav} />

        {/* Right CTA and Theme Toggle for Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href={siteConfig.cta.href}
            className="px-5 py-2.5 rounded-md font-semibold text-sm bg-[var(--color-accent-gold)] text-[var(--color-accent-gold-foreground)] hover:opacity-95 transition-opacity shadow-xs"
          >
            {siteConfig.cta.title}
          </Link>
        </div>

        {/* Mobile Navigation Trigger & Menu */}
        <MobileMenu items={siteConfig.mainNav} cta={siteConfig.cta} />
      </div>
    </header>
  );
}
