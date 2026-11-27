
import { Suspense } from "react";
import type { Metadata } from "next";
import { ArrowRight, ShieldCheck, MessageCircle } from "lucide-react";

import { profile } from "@/data/profile";
import { constructMetadata } from "@/lib/seo";
import {
  Container,
  MotionProvider,
  Reveal,
  LocalBusinessJsonLd,
} from "@/components/common";
import { Breadcrumbs } from "@/components/services";
import {
  ContactInfoCards,
  ContactFormWrapper,
} from "@/components/contact";

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

      <main id="main-content" className="w-full overflow-hidden">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">

          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--primary)] opacity-[0.07] blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-[var(--primary)] opacity-[0.05] blur-3xl"
          />

          <Container>
            <div className="relative z-10 py-12 sm:py-16 lg:py-20">

              <Breadcrumbs items={breadcrumbItems} />

              <div className="mt-9 grid items-center gap-10 lg:grid-cols-12">

                <div className="lg:col-span-8">

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-2">
                    <MessageCircle
                      size={15}
                      className="text-[var(--primary)]"
                    />
                    <span className="text-xs font-bold tracking-wider text-[var(--primary)]">
                      GET IN TOUCH
                    </span>
                  </div>

                  <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                    Let&apos;s Start a{" "}
                    <span className="text-[var(--primary)]">
                      Conversation.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                    {profile.aboutParagraphs[2].split(".")[0]}.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href="#contact-form"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-lg shadow-[var(--primary)]/15 transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      Send an Enquiry
                      <ArrowRight size={17} />
                    </a>

                    <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--muted-foreground)]">
                      <ShieldCheck
                        size={19}
                        className="text-[var(--primary)]"
                      />
                      Professional Service Support
                    </div>
                  </div>
                </div>

                {/* Decorative right-side visual */}
                <div className="relative hidden lg:col-span-4 lg:flex lg:justify-center">
                  <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-[var(--primary)]/20 bg-[var(--background)] shadow-xl shadow-[var(--primary)]/10">
                    <div className="absolute inset-5 rounded-full border border-dashed border-[var(--primary)]/30" />
                    <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-[var(--primary)]/20 bg-[var(--surface)] shadow-lg">
                      <ShieldCheck
                        size={55}
                        strokeWidth={1.5}
                        className="text-[var(--primary)]"
                      />
                      <span className="mt-2 font-heading text-lg font-extrabold tracking-wide text-[var(--foreground)]">
                        STRICON
                      </span>
                    </div>

                    <span className="absolute right-2 top-12 h-3 w-3 rounded-full bg-[var(--primary)] shadow-[0_0_15px_var(--primary)]" />
                    <span className="absolute bottom-10 left-3 h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                  </div>
                </div>

              </div>
            </div>
          </Container>
        </section>

        {/* CONTACT CONTENT */}
        <section className="bg-[var(--background)] py-14 sm:py-20 lg:py-24">
          <Container>

            <div className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.2em] text-[var(--primary)]">
                CONTACT INFORMATION
              </span>

              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                We&apos;re Here to Help
              </h2>

              <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)] sm:text-base">
                Reach out to our team for enquiries about security,
                manpower and facility management services.
              </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">

              {/* CONTACT INFORMATION */}
              <div className="order-2 lg:order-1 lg:col-span-5">

                <Reveal delay={0.1}>


                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                    <ContactInfoCards />
                  </div>
                </Reveal>

                {/* SUPPORT MESSAGE */}
                <div className="mt-6 overflow-hidden rounded-2xl bg-[var(--primary)] p-6 text-[var(--primary-foreground)]">
                  <ShieldCheck size={30} />

                  <h3 className="mt-4 text-lg font-bold">
                    Your Requirements Matter
                  </h3>

                  <p className="mt-2 text-sm leading-6 opacity-90">
                    Connect with STRICON to discuss your security
                    and facility management requirements.
                  </p>
                </div>
              </div>

              {/* ENQUIRY FORM */}
              <div
                id="contact-form"
                className="order-1 lg:order-2 lg:col-span-7"
              >
                <Reveal delay={0.15}>
                  <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl shadow-black/[0.04]">

                    <div className="border-b border-[var(--border)] px-6 py-6 sm:px-8">
                      <span className="text-xs font-bold tracking-widest text-[var(--primary)]">
                        SEND AN ENQUIRY
                      </span>

                      <h3 className="mt-2 font-heading text-2xl font-bold text-[var(--foreground)]">
                        Tell Us What You Need
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                        Share your requirements with us. Our team
                        can follow up using your contact details.
                      </p>
                    </div>

                    <div className="p-5 sm:p-8">
                      <Suspense
                        fallback={
                          <div
                            className="h-96 w-full animate-pulse rounded-xl bg-[var(--background)]"
                            aria-label="Loading contact form"
                          />
                        }
                      >
                        <ContactFormWrapper />
                      </Suspense>
                    </div>

                  </div>
                </Reveal>
              </div>

            </div>
          </Container>
        </section>

      </main>
    </MotionProvider>
  );
}
