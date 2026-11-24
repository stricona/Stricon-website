"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryPhoto } from "@/types/gallery";

interface LightboxProps {
  photo: GalleryPhoto | null;
  photos: GalleryPhoto[];
  onClose: () => void;
  onNavigate: (photo: GalleryPhoto) => void;
  triggerElement?: HTMLElement | null;
}

export function Lightbox({
  photo,
  photos,
  onClose,
  onNavigate,
  triggerElement,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;
  const totalCount = photos.length;

  const handlePrev = useCallback(() => {
    if (currentIndex <= 0) {
      onNavigate(photos[totalCount - 1]);
    } else {
      onNavigate(photos[currentIndex - 1]);
    }
  }, [currentIndex, photos, totalCount, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex >= totalCount - 1) {
      onNavigate(photos[0]);
    } else {
      onNavigate(photos[currentIndex + 1]);
    }
  }, [currentIndex, photos, totalCount, onNavigate]);

  // Open/close native dialog when photo prop changes
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (photo) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = "hidden";
        document.body.setAttribute("data-lightbox-open", "true");
      }

      // Update URL hash without scroll
      const hashId = photo.id.replace("/", "-");
      if (window.location.hash !== `#${hashId}`) {
        window.history.replaceState(null, "", `#${hashId}`);
      }

      // Preload neighbouring images
      if (photos.length > 1) {
        const prevIdx = (currentIndex - 1 + totalCount) % totalCount;
        const nextIdx = (currentIndex + 1) % totalCount;
        const prevImg = new window.Image();
        prevImg.src = photos[prevIdx].src;
        const nextImg = new window.Image();
        nextImg.src = photos[nextIdx].src;
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = "";
      document.body.removeAttribute("data-lightbox-open");

      // Remove hash
      if (window.location.hash) {
        const cleanUrl = window.location.pathname + window.location.search;
        window.history.replaceState(null, "", cleanUrl);
      }

      // Return focus to triggering tile
      if (triggerElement && typeof triggerElement.focus === "function") {
        triggerElement.focus();
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-lightbox-open");
    };
  }, [photo, currentIndex, totalCount, photos, triggerElement]);

  // Keyboard navigation
  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, handlePrev, handleNext, onClose]);

  // Touch swipe support (50px threshold, horizontal only)
  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartXRef.current = e.clientX;
    touchStartYRef.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.clientX - touchStartXRef.current;
    const diffY = e.clientY - touchStartYRef.current;

    // Only register horizontal swipes where |diffX| > 50 and |diffX| > |diffY|
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!photo) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 m-0 h-screen w-screen max-h-none max-w-none border-0 bg-transparent p-0 text-[var(--overlay-foreground)] backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-sm open:flex open:flex-col open:items-center open:justify-center animate-in fade-in duration-200 motion-reduce:duration-0"
      aria-label={`Photo details: ${photo.alt}`}
    >
      {/* Top action bar: counter and close button */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 sm:top-6 sm:inset-x-6">
        <div className="rounded-full bg-[var(--overlay)] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[var(--overlay-foreground)] shadow-xs">
          {currentIndex + 1} / {totalCount}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo view"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--overlay)] text-[var(--overlay-foreground)] shadow-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Main photo container */}
      <div
        className="relative flex h-full w-full max-h-[85vh] max-w-5xl flex-col items-center justify-center p-4 sm:p-6"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div className="relative h-full w-full flex items-center justify-center">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
            className="object-contain"
          />
        </div>

        {/* Caption bar */}
        {photo.caption && (
          <div className="mt-4 max-w-2xl rounded-xl bg-[var(--overlay)] px-4 py-2.5 text-center text-xs sm:text-sm text-[var(--overlay-foreground)] shadow-md backdrop-blur-xs">
            <p className="leading-relaxed">{photo.caption}</p>
          </div>
        )}
      </div>

      {/* Navigation arrows (desktop and touch) */}
      {totalCount > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--overlay)] text-[var(--overlay-foreground)] shadow-md transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--overlay)] text-[var(--overlay-foreground)] shadow-md transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}
    </dialog>
  );
}
