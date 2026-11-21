import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  inverted = false,
  className = "",
  id,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      id={id}
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-2 text-xs font-semibold uppercase tracking-wider ${
            inverted
              ? "text-[var(--accent-gold)]"
              : "text-[var(--secondary)]"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${
          inverted ? "text-white" : "text-[var(--foreground)]"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            inverted
              ? "text-white/80"
              : "text-[var(--muted-foreground)]"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
