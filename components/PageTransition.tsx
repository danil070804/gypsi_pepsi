"use client"

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    // If user prefers reduced motion, skip animation and just render children
    return <div className="w-full">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8, scale: 0.998 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.998 }}
        transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
