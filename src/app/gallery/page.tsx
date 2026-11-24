import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { galleryCategories } from "@/data/gallery";
import {
  getGalleryPhotos,
  getCategoryCounts,
  hasGalleryPhotos,
} from "@/lib/gallery";
import { Container } from "@/components/common";
import { PageHero } from "@/components/services/PageHero";
import { GalleryBrowser } from "@/components/gallery";
import { FinalCta } from "@/components/home";

export const metadata: Metadata = constructMetadata({
  title: "Gallery",
  description: "Photos of STRICON teams and operations.",
  path: "/gallery",
});

export default function GalleryPage() {
  const photos = getGalleryPhotos();
  const counts = getCategoryCounts();
  const isProduction = process.env.NODE_ENV === "production";

  // Production requirement: return 404 if no photos exist
  if (!hasGalleryPhotos()) {
    if (isProduction) {
      notFound();
    }

    // Helpful empty state for development mode
    return (
      <main className="flex flex-col w-full">
        <PageHero
          title="Gallery"
          intro="Photos of STRICON teams and operations."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Gallery", href: "/gallery" },
          ]}
        />

        <section className="py-20 bg-[var(--background)]">
          <Container>
            <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 text-center shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] mb-6">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-3">
                No Gallery Photos Uploaded Yet
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)] mb-6">
                In production, this page automatically returns 404 until photos
                are imported. To add photos in development:
              </p>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-left text-xs font-mono text-[var(--muted-foreground)] mb-6 space-y-2">
                <p>1. Place raw photos (.jpg, .png) in:</p>
                <p className="text-[var(--primary)] pl-4">
                  gallery-inbox/&#123;security, housekeeping, facility, training&#125;/
                </p>
                <p>2. Run the import pipeline:</p>
                <p className="text-[var(--secondary)] pl-4">npm run gallery:import</p>
                <p>3. Edit optional captions &amp; alt text in:</p>
                <p className="text-[var(--primary)] pl-4">src/data/gallery-meta.ts</p>
              </div>
            </div>
          </Container>
        </section>

        <FinalCta />
      </main>
    );
  }

  // Structured Data: ImageGallery JSON-LD (up to 20 images)
  const imageGalleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${siteConfig.name} - Operations Gallery`,
    description: "Photos of STRICON teams and operations.",
    url: `${siteConfig.url}/gallery`,
    image: photos.slice(0, 20).map((p) => ({
      "@type": "ImageObject",
      contentUrl: `${siteConfig.url}${p.src}`,
      name: p.alt,
      ...(p.caption ? { caption: p.caption } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryJsonLd) }}
      />

      <main className="flex flex-col w-full">
        {/* Page Hero */}
        <PageHero
          title="Gallery"
          intro="Photos of STRICON teams and operations."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Gallery", href: "/gallery" },
          ]}
        />

        {/* Gallery Browser (Client Filters & Grid) */}
        <GalleryBrowser
          initialPhotos={photos}
          categories={galleryCategories}
          categoryCounts={counts}
        />

        {/* Final Call to Action */}
        <FinalCta />
      </main>
    </>
  );
}
