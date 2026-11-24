import Link from "next/link";
import Image from "next/image";
import { Container, SectionHeading, Reveal, RevealGroup, RevealItem } from "@/components/common";
import { getFeaturedPhotos } from "@/lib/gallery";

export function GallerySection() {
  const photos = getFeaturedPhotos(6);

  // Renders ONLY when at least 3 photos exist; otherwise render nothing (no heading either)
  if (photos.length < 3) {
    return null;
  }

  // Bento span calculations:
  // Desktop 4 cols: first photo spans 2x2 (col-span-2 row-span-2) when 3, 5 or 6 photos.
  // Tablet 3 cols
  // Mobile 2 cols: first photo spans both cols
  const getBentoClasses = (index: number, total: number) => {
    if (index === 0) {
      if (total >= 5 || total === 3) {
        return "col-span-2 sm:col-span-2 lg:col-span-2 lg:row-span-2 aspect-4/3 lg:aspect-auto min-h-[220px]";
      }
      if (total === 4) {
        return "col-span-2 sm:col-span-2 lg:col-span-2 aspect-4/3";
      }
      return "col-span-2 aspect-4/3";
    }
    if (total === 4 && index === 1) {
      return "col-span-2 sm:col-span-1 lg:col-span-2 aspect-4/3";
    }
    return "col-span-1 aspect-4/3";
  };

  return (
    <section className="py-16 sm:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="Gallery"
          intro="Photos of STRICON teams and operations."
          className="mb-12"
        />

        <RevealGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {photos.map((photo, index) => {
            const hashId = photo.id.replace("/", "-");
            const spanClass = getBentoClasses(index, photos.length);

            return (
              <RevealItem key={photo.id} className={`${spanClass} h-full`}>
                <Link
                  href={`/gallery#${hashId}`}
                  aria-label={`View photo: ${photo.alt}`}
                  className="group relative flex h-full w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                        : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    }
                    placeholder="blur"
                    blurDataURL={photo.blurDataURL}
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />

                  {photo.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-[var(--overlay)] px-3 py-2 text-xs text-[var(--overlay-foreground)] backdrop-blur-xs transition-opacity duration-200">
                      <p className="line-clamp-2 leading-snug">{photo.caption}</p>
                    </div>
                  )}
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="mt-12 flex justify-center">
          <Reveal delay={0.2}>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent-gold)] px-6 py-3 text-sm font-semibold text-[var(--accent-gold-foreground)] shadow-xs transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-gold)]"
            >
              View full gallery
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
