import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { legalConfig, privacyPolicySections } from "@/data/legal";
import { PageHero } from "@/components/services/PageHero";
import { Container } from "@/components/common";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description:
    "Read STRICON's Privacy Policy describing how enquiry and application information is collected, used, and protected.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy" },
  ];

  return (
    <article className="flex flex-col w-full">
      <PageHero
        title="Privacy Policy"
        intro="How STRICON collects, handles, and protects information submitted through this website."
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-[70ch] mx-auto space-y-10 text-[var(--foreground)]">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] text-xs text-[var(--muted-foreground)]">
              <span>Document: Privacy Policy</span>
              <span>Last updated: {legalConfig.lastUpdated}</span>
            </div>

            <div className="space-y-10">
              {privacyPolicySections.map((sec) => (
                <div key={sec.id} className="space-y-4">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
                    {sec.title}
                  </h2>

                  {sec.content.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]"
                    >
                      {p}
                    </p>
                  ))}

                  {sec.list && sec.list.length > 0 && (
                    <ul className="space-y-2.5 pl-5 list-disc text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
                      {sec.list.map((item, j) => (
                        <li key={j} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
