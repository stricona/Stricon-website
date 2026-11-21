"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

interface RevealGroupProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}

export function RevealGroup({
  children,
  stagger = 0.06,
  delay = 0,
  className = "",
  ...props
}: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
