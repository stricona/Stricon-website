"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

// Safe mounted check avoiding hydration mismatch and avoiding setState in effect
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <button
        type="button"
        className="w-9 h-9 rounded-md flex items-center justify-center border border-[var(--color-border)] text-[var(--color-muted-foreground)] opacity-70"
        aria-label="Toggle theme"
        disabled
      >
        <span className="sr-only">Toggle theme</span>
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 rounded-md flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] transition-colors"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-[var(--color-accent-gold)]" />
      ) : (
        <Moon className="h-4 w-4 text-[var(--color-primary)]" />
      )}
    </button>
  );
}
