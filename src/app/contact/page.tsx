import { Suspense } from "react";
import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { constructMetadata } from "@/lib/seo";
import { Container, MotionProvider, Reveal, LocalBusinessJsonLd } from "@/components/common";
import { Breadcrumbs } from "@/components/services";
import { ContactInfoCards, ContactFormWrapper } from "@/components/contact";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us",
  description:
    "Contact STRICON for facility management and security services in Hyderabad.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us" },
  ];

  return (
    <MotionProvider>
      <LocalBusinessJsonLd />

      <main id="main-content" className="flex flex-col w-full">
        {/* Section 1: Page Header */}
        <section className="bg-[var(--surface)] py-12 sm:py-16 border-b border-[var(--border)]">
          <Container>
            <div className="mb-6">
              <Breadcrumbs items={breadcrumbItems} />
            </div>

            <div className="max-w-3xl space-y-4">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
                Contact Us
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
                {profile.aboutParagraphs[2].split(".")[0]}.
              </p>
            </div>
          </Container>
        </section>

        {/* Section 2: Contact Info & Form (2 columns) */}
        <section className="py-12 sm:py-20 bg-[var(--background)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column on Desktop / Bottom on Mobile: Contact Info Cards */}
              <div className="order-2 lg:order-1 lg:col-span-5">
                <Reveal delay={0.1}>
                  <div className="mb-6">
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                      Get in Touch
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
                      Direct communication channels with our Hyderabad corporate office.
                    </p>
                  </div>
                  <ContactInfoCards />
                </Reveal>
              </div>

              {/* Right Column on Desktop / Top on Mobile: Preselected Chip & Quote Form */}
              <div className="order-1 lg:order-2 lg:col-span-7">
                <Reveal delay={0.15}>
                  <Suspense fallback={<div className="h-96 w-full animate-pulse bg-[var(--surface)] rounded-2xl" />}>
                    <ContactFormWrapper />
                  </Suspense>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </MotionProvider>
  );
}
