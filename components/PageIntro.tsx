import type { ReactNode } from "react";

export default function PageIntro({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.025))] px-5 py-5 shadow-[0_18px_60px_rgba(2,6,23,0.2)] md:px-7 md:py-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-12 top-0 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-4 h-44 w-44 rounded-full bg-sky-400/8 blur-3xl" />
      </div>

      <div className="relative">
        <div className="max-w-3xl">
          {eyebrow ? (
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/62">
              {eyebrow}
            </div>
          ) : null}

          <h1 className="pt-1 text-3xl font-semibold leading-[1.04] text-white md:text-[2.85rem]">
            {title}
          </h1>

          {description ? (
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 md:text-[15px]">
              {description}
            </p>
          ) : null}
        </div>

        {aside ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}
