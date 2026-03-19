"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div className="relative min-h-[40vh] w-full">
      <AnimatePresence initial={false}>
        <motion.div
          key={`overlay-${pathname}`}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/90 to-transparent"
            initial={{ scaleX: 0.18, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 1.08, opacity: 0 }}
            transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute -left-1/4 top-0 h-28 w-1/3 rounded-full bg-gradient-to-r from-transparent via-sky-300/35 to-transparent blur-2xl"
            initial={{ x: "-12%", opacity: 0 }}
            animate={{ x: "170%", opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 22, clipPath: "inset(0 0 14% 0 round 28px)" }}
        animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 28px)" }}
        transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity, clip-path", transform: "translateZ(0)" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
