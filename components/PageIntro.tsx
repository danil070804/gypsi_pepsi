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
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] px-5 py-6 shadow-[0_28px_90px_rgba(2,6,23,0.24)] md:px-8 md:py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-14 top-0 h-44 w-44 rounded-full bg-blue-500/12 blur-3xl" />
        <div className="absolute right-0 top-6 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-32 w-2/3 -translate-x-1/2 rounded-full bg-indigo-500/8 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/62">
              {eyebrow}
            </div>
          ) : null}

          <h1 className="pt-1 text-3xl font-semibold leading-[1.06] text-white md:text-5xl">
            {title}
          </h1>

          {description ? (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
              {description}
            </p>
          ) : null}
        </div>

        {aside ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[18rem] lg:max-w-sm lg:grid-cols-1">
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}
