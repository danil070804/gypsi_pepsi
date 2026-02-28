import Link from "next/link";
import Image from "next/image";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

type Block =
  | { type: "hero"; title: string; subtitle?: string; ctas?: { label: string; href: string }[] }
  | { type: "steps"; title?: string; items: { title: string; text?: string }[] }
  | { type: "bullets"; title?: string; items: string[] }
  | { type: "cta"; title: string; text?: string; buttonLabel: string; href: string }
  | { type: "richText"; title?: string; text?: string; html?: string }
  | { type: "legal" };

export default function Blocks({ blocks, lang }: { blocks: any; lang: Lang }) {
  const arr: Block[] = Array.isArray(blocks) ? blocks : [];
  return (
    <div className="space-y-10">
      {arr.map((b, idx) => {
        if (b.type === "hero") {
          return (
            <section
              key={idx}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 md:px-10 md:py-14"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
                <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
              </div>

              <div className="relative grid items-center gap-10 md:grid-cols-2">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    {t(lang, "Трудоустройство в UK", "UK Employment")}
                  </div>

                  <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
                    {b.title}
                  </h1>

                  {b.subtitle ? <p className="mt-4 text-white/75 md:text-lg">{b.subtitle}</p> : null}

                  <div className="mt-8 flex flex-wrap gap-3">
                    {(b.ctas || []).map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                      >
                        {c.label}
                      </Link>
                    ))}

                    <Link
                      href={`/${lang}/services`}
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/85 hover:bg-white/10"
                    >
                      {t(lang, "Услуги", "Services")}
                    </Link>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-white/65">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="text-white">UK</div>
                      <div className="mt-1">Support</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="text-white">Docs</div>
                      <div className="mt-1">Guidance</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="text-white">Jobs</div>
                      <div className="mt-1">Matching</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-2xl" />
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40">
                    <Image
                      src="/images/hero.webp"
                      alt="Office"
                      width={900}
                      height={700}
                      className="h-[320px] w-full object-cover md:h-[420px]"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-slate-950/55 p-4 text-sm text-white/80 backdrop-blur">
                      <div className="font-semibold text-white">GYPSEY EMPLOYMENT AGENCY</div>
                      <div className="mt-1">{t(lang, "Подбор вакансий, документы, визовая поддержка и сопровождение.", "Vacancies, documents, visa support and guidance.")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (b.type === "steps") {
          return (
            <section key={idx}>
              {b.title ? <h2 className="text-xl font-semibold text-white md:text-2xl">{b.title}</h2> : null}
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {b.items.map((it, i) => (
                  <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="text-sm font-semibold text-white/70">{String(i + 1).padStart(2, "0")}</div>
                    <div className="mt-2 text-lg font-semibold text-white">{it.title}</div>
                    {it.text ? <p className="mt-2 text-sm text-white/75">{it.text}</p> : null}
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (b.type === "bullets") {
          return (
            <section key={idx} className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              {b.title ? <h2 className="text-xl font-semibold text-white md:text-2xl">{b.title}</h2> : null}
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {b.items.map((it, i) => (
                  <li key={i} className="flex gap-3 text-white/80">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        if (b.type === "cta") {
          return (
            <section key={idx} className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-indigo-600/10 p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white md:text-2xl">{b.title}</h2>
                  {b.text ? <p className="mt-2 text-white/80">{b.text}</p> : null}
                </div>
                <Link
                  href={b.href}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  {b.buttonLabel}
                </Link>
              </div>
            </section>
          );
        }

        if (b.type === "richText") {
          return (
            <section key={idx} className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              {b.title ? <h2 className="text-xl font-semibold text-white md:text-2xl">{b.title}</h2> : null}
              {b.text ? <div className="prose mt-4 max-w-none">{b.text}</div> : null}
              {b.html ? <div className="prose mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: b.html }} /> : null}
            </section>
          );
        }

        if (b.type === "legal") {
          return (
            <section key={idx} className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white md:text-2xl">{t(lang, "Правовая информация", "Legal")}</h2>
              <div className="prose mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: t(lang, "<p>Информация на сайте носит справочный характер.</p>", "<p>Information on this website is for general guidance only.</p>") }} />
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
