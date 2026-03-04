"use client"

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ServiceCardReveal({ title, excerpt, slug, lang }: { title: string; excerpt?: string | null; slug: string; lang: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="rounded-2xl border border-white/10 bg-white/5 p-5"
    >
      <div className="text-lg font-semibold">{title}</div>
      {excerpt ? <p className="mt-2 text-sm text-white/70">{excerpt}</p> : null}

      <div className="mt-4">
        <Link
          href={`/${lang}/services/${slug}`}
          className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/40 ring-1 ring-blue-300/30 transition hover:opacity-95"
        >
          Подробнее
        </Link>
      </div>
    </motion.div>
  );
}
