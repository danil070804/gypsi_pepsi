"use client"

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function ServiceCardReveal({ title, excerpt, slug, lang }: { title: string; excerpt?: string | null; slug: string; lang: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-lg font-semibold">{title}</div>
        {excerpt ? <p className="mt-2 text-sm text-white/70">{excerpt}</p> : null}
        <div className="mt-4">
          <Link href={`/${lang}/services/${slug}`} className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/40 ring-1 ring-blue-300/30 transition hover:opacity-95">
            {lang === "ru" ? "Подробнее" : "Learn more"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.996 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      className="rounded-2xl border border-white/10 bg-white/5 p-5"
    >
      <div className="text-lg font-semibold">{title}</div>
      {excerpt ? <p className="mt-2 text-sm text-white/70">{excerpt}</p> : null}

      <div className="mt-4">
        <Link
          href={`/${lang}/services/${slug}`}
          className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/40 ring-1 ring-blue-300/30 transition hover:opacity-95"
        >
          {lang === "ru" ? "Подробнее" : "Learn more"}
        </Link>
      </div>
    </motion.div>
  );
}
