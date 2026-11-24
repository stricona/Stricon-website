"use client";

import { motion } from "motion/react";
import { Compass, Eye } from "lucide-react";
import { Container, SectionHeading } from "@/components/common";
import { profile } from "@/data/profile";

export function MissionVision() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--background)] overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Our Purpose"
          title="Mission & Vision"
          intro="Guiding principles directing our standards, client engagements, and growth."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Card: Mission (slides from left) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 shadow-xs hover:border-[var(--primary)]/30 transition-colors"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] mb-6">
              <Compass className="h-6 w-6" />
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-4">
              Our Mission
            </h3>

            <p className="text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
              {profile.mission}
            </p>
          </motion.div>

          {/* Right Card: Vision (slides from right) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 shadow-xs hover:border-[var(--secondary)]/30 transition-colors"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-gold)]/20 text-[var(--foreground)] mb-6">
              <Eye className="h-6 w-6 text-[var(--primary)]" />
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-4">
              Our Vision
            </h3>

            <p className="text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
              {profile.vision}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
