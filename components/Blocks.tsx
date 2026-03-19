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
  | { type: "legal"; html?: string };

export default function Blocks({ blocks, lang }: { blocks: any; lang: Lang }) {
  const arr: Block[] = Array.isArray(blocks) ? blocks : [];
  return (
    <div className="space-y-10">
      {arr.map((b, idx) => {
        if (b.type === "hero") {
          return (
            <section
              key={idx}
              className="site-panel relative overflow-hidden rounded-[2rem] px-6 py-8 md:px-9 md:py-10"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 -top-20 h-64 w-64 rounded-full bg-blue-500/14 blur-3xl" />
                <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
              </div>

              <div className="relative grid items-center gap-10 md:grid-cols-2">
                <div className="max-w-xl">
                  <div className="site-chip">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                    {t(lang, "Трудоустройство в UK", "UK Employment")}
                  </div>

                  <h1 className="mt-4 text-4xl font-semibold leading-[1.03] text-white md:text-[3.3rem]">
                    {b.title}
                  </h1>

                  {b.subtitle ? <p className="mt-5 text-sm leading-8 text-white/72 md:text-lg">{b.subtitle}</p> : null}

                  <div className="mt-8 flex flex-wrap gap-3">
                    {Array.from(new Map((b.ctas || []).map((c) => [c.href, c])).values()).map((c) => {
                      const href = String(c.href || "");
                      const isServices = /\/services(?:\/|$)/.test(href);
                      const isContact = /\/contact(?:\/|$)/.test(href);
                      const label = isServices
                        ? t(lang, "Услуги", "Services")
                        : isContact
                          ? t(lang, "Консультация", "Consultation")
                          : c.label;

                      return (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                            isServices
                              ? "border border-blue-300/25 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_18px_40px_rgba(37,99,235,0.34)] hover:brightness-110"
                              : "border border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]"
                          }`}
                        >
                          {label}
                          <span aria-hidden>{isServices ? "→" : "+"}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-white/70 sm:grid-cols-3">
                    <Link
                      href={`/${lang}/contact`}
                      className="site-panel min-h-[92px] rounded-[1.35rem] p-3 transition hover:bg-white/[0.08]"
                    >
                      <div className="site-kicker">UK</div>
                      <div className="mt-1 break-normal leading-snug">{t(lang, "Поддержка", "Support")}</div>
                    </Link>
                    <Link
                      href={`/${lang}/services/documentation`}
                      className="site-panel min-h-[92px] rounded-[1.35rem] p-3 transition hover:bg-white/[0.08]"
                    >
                      <div className="site-kicker break-normal leading-snug">{t(lang, "Документы", "Docs")}</div>
                      <div className="mt-1 break-normal leading-snug">{t(lang, "Сопровождение", "Guidance")}</div>
                    </Link>
                    <Link
                      href={`/${lang}/services`}
                      className="site-panel col-span-2 min-h-[92px] rounded-[1.35rem] p-3 transition hover:bg-white/[0.08] sm:col-span-1"
                    >
                      <div className="site-kicker break-normal leading-snug">{t(lang, "Работа", "Jobs")}</div>
                      <div className="mt-1 break-normal leading-snug">{t(lang, "Подбор", "Matching")}</div>
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-2xl" />
                  <div className="site-panel relative overflow-hidden rounded-[1.85rem]">
                    <Image
                      src="/images/hero.webp"
                      alt="Office"
                      width={900}
                      height={700}
                      className="h-[320px] w-full object-cover md:h-[420px]"
                      unoptimized
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 rounded-[1.4rem] border border-white/10 bg-slate-950/58 p-4 text-sm text-white/80 backdrop-blur">
                      <div className="site-kicker text-white/55">GYPSEY EMPLOYMENT AGENCY</div>
                      <div className="mt-2 text-base font-semibold text-white">
                        {t(lang, "Подбор вакансий, документы и сопровождение.", "Jobs, documents, and ongoing guidance.")}
                      </div>
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
              {b.title ? <h2 className="text-2xl font-semibold text-white md:text-[2.25rem]">{b.title}</h2> : null}
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {b.items.map((it, i) => (
                  <div key={i} className="site-panel rounded-[1.8rem] p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-sm font-semibold text-white/72">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="site-kicker">{t(lang, "Этап", "Stage")}</div>
                    </div>
                    <div className="mt-5 text-xl font-semibold leading-[1.12] text-white">{it.title}</div>
                    {it.text ? <p className="mt-3 text-sm leading-7 text-white/72">{it.text}</p> : null}
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (b.type === "bullets") {
          return (
            <section key={idx} className="site-panel rounded-[1.9rem] p-6 md:p-8">
              {b.title ? <h2 className="text-2xl font-semibold text-white md:text-[2.1rem]">{b.title}</h2> : null}
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
            <section key={idx} className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-gradient-to-br from-blue-600/20 via-white/[0.03] to-indigo-600/10 p-6 md:p-8">
              <div className="pointer-events-none absolute -right-16 -top-12 h-44 w-44 rounded-full bg-sky-400/10 blur-3xl" />
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="site-kicker">{t(lang, "Консультация", "Consultation")}</div>
                  <h2 className="pt-1 text-2xl font-semibold text-white md:text-[2.1rem]">{b.title}</h2>
                  {b.text ? <p className="mt-3 max-w-2xl text-white/80">{b.text}</p> : null}
                </div>
                <Link
                  href={b.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-300/25 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.34)] hover:brightness-110"
                >
                  {b.buttonLabel}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </section>
          );
        }

        if (b.type === "richText") {
          return (
            <section key={idx} className="site-panel rounded-[1.9rem] p-6 md:p-8">
              {b.title ? <h2 className="text-2xl font-semibold text-white md:text-[2.1rem]">{b.title}</h2> : null}
              {b.text ? <div className="prose mt-4 max-w-none">{b.text}</div> : null}
              {b.html ? <div className="prose mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: b.html }} /> : null}
            </section>
          );
        }

        if (b.type === "legal") {
          return (
            <section key={idx} className="site-panel rounded-[1.9rem] p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-white md:text-[2.1rem]">{t(lang, "Правовая информация", "Legal")}</h2>
              <div className="prose mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: (b as any).html || t(lang, "<p>Информация на сайте носит справочный характер.</p>", "<p>Information on this website is for general guidance only.</p>") }} />
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
