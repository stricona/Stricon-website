import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-[var(--color-primary)] tracking-wide uppercase">
        404 Error
      </p>
      <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[var(--color-foreground)]">
        Page Not Found
      </h1>
      <p className="mt-4 text-base text-[var(--color-muted-foreground)] max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-md font-semibold text-sm bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
        <Link
          href="/services"
          className="px-5 py-2.5 rounded-md font-semibold text-sm border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] transition-colors"
        >
          View Services
        </Link>
      </div>
    </div>
  );
}
