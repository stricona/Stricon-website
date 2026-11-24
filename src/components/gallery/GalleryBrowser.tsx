"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import Image from "next/image";
import { Container } from "@/components/common";
import { Lightbox } from "./Lightbox";
import type { GalleryPhoto, GalleryCategory } from "@/types/gallery";

interface GalleryBrowserProps {
  initialPhotos: GalleryPhoto[];
  categories: GalleryCategory[];
  categoryCounts: Partial<Record<string, number>>;
}

export function GalleryBrowser({
  initialPhotos,
  categories,
  categoryCounts,
}: GalleryBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam && (catParam === "all" || categoryCounts[catParam])) {
        return catParam;
      }
    }
    return "all";
  });
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        return (
          initialPhotos.find(
            (p) => p.id === hash || p.id.replace("/", "-") === hash
          ) || null
        );
      }
    }
    return null;
  });
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
  const [, startTransition] = useTransition();
  const tileRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Filter available categories to only those with >= 1 photo
  const activeCategories = categories.filter(
    (cat) => (categoryCounts[cat.id] || 0) > 0
  );

  // Compute filtered photos
  const filteredPhotos =
    activeCategory === "all"
      ? initialPhotos
      : initialPhotos.filter((p) => p.category === activeCategory);

  // Listen for hash changes (e.g. browser back/forward or external deep links)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) {
        setActivePhoto(null);
        return;
      }
      const targetPhoto = initialPhotos.find(
        (p) => p.id === hash || p.id.replace("/", "-") === hash
      );
      if (targetPhoto) {
        setActivePhoto(targetPhoto);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [initialPhotos]);

  const handleSelectCategory = (catId: string) => {
    startTransition(() => {
      setActiveCategory(catId);
    });

    // Update query string via replaceState
    const url = new URL(window.location.href);
    if (catId === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", catId);
    }
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  };

  const handleOpenPhoto = (photo: GalleryPhoto, buttonEl: HTMLButtonElement) => {
    setTriggerEl(buttonEl);
    setActivePhoto(photo);
  };

  const handleClosePhoto = () => {
    setActivePhoto(null);
  };

  const isSingle = filteredPhotos.length === 1;

  return (
    <section className="py-12 sm:py-16 bg-[var(--background)]">
      <Container>
        {/* Category Filters Bar */}
        {activeCategories.length > 1 && (
          <div className="mb-10 sm:mb-12">
            <div
              className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap"
              role="group"
              aria-label="Gallery category filters"
            >
              {/* "All" button */}
              <button
                type="button"
                aria-pressed={activeCategory === "all"}
                onClick={() => handleSelectCategory("all")}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                  activeCategory === "all"
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                    : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)] hover:border-[var(--primary)]/40 hover:text-[var(--foreground)]"
                }`}
              >
                <span>All</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    activeCategory === "all"
                      ? "bg-white/20 text-[var(--primary-foreground)]"
                      : "bg-[var(--border)] text-[var(--foreground)]"
                  }`}
                >
                  {initialPhotos.length}
                </span>
              </button>

              {/* Category buttons */}
              {activeCategories.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                      isSelected
                        ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                        : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)] hover:border-[var(--primary)]/40 hover:text-[var(--foreground)]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        isSelected
                          ? "bg-white/20 text-[var(--primary-foreground)]"
                          : "bg-[var(--border)] text-[var(--foreground)]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Polite live region for screen readers */}
            <div className="sr-only" aria-live="polite">
              Showing {filteredPhotos.length} photos
            </div>
          </div>
        )}

        {/* Photo Grid */}
        <div
          key={activeCategory}
          className={`grid gap-4 sm:gap-6 animate-in fade-in duration-300 motion-reduce:duration-0 ${
            isSingle
              ? "grid-cols-1 max-w-xl mx-auto"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {filteredPhotos.map((photo, index) => {
            const isEager = index < 4;

            return (
              <button
                key={photo.id}
                ref={(el) => {
                  if (el) tileRefs.current.set(photo.id, el);
                  else tileRefs.current.delete(photo.id);
                }}
                type="button"
                onClick={(e) => handleOpenPhoto(photo, e.currentTarget)}
                aria-label={`View photo: ${photo.alt}`}
                className="group relative flex aspect-4/3 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xs transition-all hover:border-[var(--primary)]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] text-left cursor-pointer"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={
                    isSingle
                      ? "(max-width: 768px) 100vw, 640px"
                      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  }
                  loading={isEager ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                />

                {/* Subtle caption overlay on hover/focus (only if caption exists) */}
                {photo.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-[var(--overlay)] px-3 py-2 text-xs text-[var(--overlay-foreground)] backdrop-blur-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <p className="line-clamp-2 leading-snug">{photo.caption}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          photo={activePhoto}
          photos={filteredPhotos}
          onClose={handleClosePhoto}
          onNavigate={(nextPhoto) => setActivePhoto(nextPhoto)}
          triggerElement={triggerEl}
        />
      </Container>
    </section>
  );
}
