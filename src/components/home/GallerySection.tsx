import { ImageIcon } from "lucide-react";
import { Container, SectionHeading } from "@/components/common";
import { galleryItems } from "@/data/gallery";

export function GallerySection() {
  const hasImages = galleryItems.some((item) => item.src !== null);
  const isProduction = process.env.NODE_ENV === "production";

  // Production requirement: hide the entire section if all slots are null
  if (!hasImages && isProduction) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
      <Container>
        <SectionHeading
          eyebrow="On-Ground Operations"
          title="Field Deployments & Operations Gallery"
          intro="Visual documentation of our facility management teams, security personnel, and mechanised cleaning operations."
          className="mb-12"
        />

        <div className="mb-6 rounded-xl border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/10 p-4 text-xs sm:text-sm text-[var(--foreground)]">
          <p className="font-semibold text-[var(--accent-gold-foreground)]">
            Gallery Placeholder Notice (Development Mode):
          </p>
          <p className="text-[var(--muted-foreground)] mt-0.5">
            Real field photography will appear here once uploaded (recommended 1600px wide WebP/JPG in <code>public/images/gallery/</code>). In production, this section automatically hides until images are provided.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] overflow-hidden shadow-2xs"
            >
              <div className="relative flex aspect-4/3 items-center justify-center bg-[var(--surface)] text-[var(--muted-foreground)]">
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <ImageIcon className="h-8 w-8 text-[var(--muted-foreground)]/50" />
                  <span className="text-xs font-medium">
                    {item.category} Slot
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-[var(--secondary)] mb-1 uppercase tracking-wider">
                  {item.category}
                </p>
                <h4 className="font-heading text-sm font-bold text-[var(--foreground)]">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
