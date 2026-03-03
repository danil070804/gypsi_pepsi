import React from "react";

export function Section({ children }: { children: React.ReactNode }) {
  return <section className="relative overflow-hidden rounded-3xl border bg-white/70 p-6 md:p-10">{children}</section>;
}

export function SectionHeader({ eyebrow, title, subtitle }:{ eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{eyebrow}</div> : null}
      <h1 className="mt-2 text-3xl font-semibold md:text-5xl">{title}</h1>
      {subtitle ? <p className="mt-4 text-base text-slate-600 md:text-lg">{subtitle}</p> : null}
    </div>
  );
}
