"use client"

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure scroll restored when unmounting
    return () => {
      try {
        document.body.style.overflow = "";
      } catch (e) {}
    };
  }, []);

  const lockScroll = () => {
    try {
      document.body.style.overflow = "hidden";
    } catch (e) {}
  };

  const unlockScroll = () => {
    try {
      document.body.style.overflow = "";
    } catch (e) {}
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.995 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        onAnimationStart={lockScroll}
        onAnimationComplete={unlockScroll}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
