"use client"

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function ServiceCardReveal({
  title,
  excerpt,
  slug,
  lang,
}: {
  title: string;
  excerpt?: string | null;
  slug: string;
  lang: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const cardClassName =
    "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(2,6,23,0.26)] transition hover:-translate-y-1 hover:border-sky-200/20 hover:bg-white/[0.06]";

  if (shouldReduceMotion) {
    return (
      <div className={cardClassName}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-8 top-0 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
        </div>

        <div className="relative flex h-full flex-col">
          <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
            {lang === "ru" ? "Услуга" : "Service"}
          </div>
          <div className="mt-4 text-xl font-semibold leading-[1.14] text-white">{title}</div>
          {excerpt ? <p className="mt-3 flex-1 text-sm leading-7 text-white/72">{excerpt}</p> : <div className="flex-1" />}
          <div className="mt-6">
            <Link
              href={`/${lang}/services/${slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/40 ring-1 ring-blue-300/30 transition hover:brightness-110"
            >
              <span>{lang === "ru" ? "Подробнее" : "Learn more"}</span>
              <span aria-hidden>+</span>
            </Link>
          </div>
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
      className={cardClassName}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-8 top-0 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition duration-300 group-hover:bg-sky-400/15" />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
          {lang === "ru" ? "Услуга" : "Service"}
        </div>
        <div className="mt-4 text-xl font-semibold leading-[1.14] text-white">{title}</div>
        {excerpt ? <p className="mt-3 flex-1 text-sm leading-7 text-white/72">{excerpt}</p> : <div className="flex-1" />}
        <div className="mt-6">
          <Link href={`/${lang}/services/${slug}`} className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/40 ring-1 ring-blue-300/30 transition hover:opacity-95">
            <span>{lang === "ru" ? "Подробнее" : "Learn more"}</span>
            <span aria-hidden className="ml-2">+</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
