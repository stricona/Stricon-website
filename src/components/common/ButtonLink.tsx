import React from "react";
import Link from "next/link";

export type ButtonVariant = "gold" | "primary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  target,
  rel,
  ...props
}: ButtonLinkProps) {
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:");

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg text-center select-none focus-visible:outline-2 focus-visible:outline-offset-2";

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3.5 py-2 text-xs sm:text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm sm:text-base gap-2",
    lg: "px-7 py-3.5 text-base sm:text-lg gap-2.5",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    gold: "bg-[var(--accent-gold)] text-[var(--accent-gold-foreground)] hover:brightness-105 active:brightness-95 shadow-sm font-semibold",
    primary:
      "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-95 active:opacity-90 shadow-sm",
    outline:
      "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/15",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (isExternal) {
    const computedRel =
      target === "_blank" ? rel || "noopener noreferrer" : rel;
    return (
      <a
        href={href}
        className={combinedClasses}
        target={target}
        rel={computedRel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClasses} {...props}>
      {children}
    </Link>
  );
}
