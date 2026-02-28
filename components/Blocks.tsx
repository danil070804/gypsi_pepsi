import Link from "next/link";
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
            <section key={idx} className="relative overflow-hidden rounded-3xl border bg-slate-950 px-6 py-14 text-white md:px-12">
              <div className="max-w-2xl">
                <h1 className="text-3xl font-semibold leading-tight md:text-5xl">{b.title}</h1><div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                {b.subtitle ? <p className="mt-4 text-white/80 md:text-lg">{b.subtitle}</p> : null}
                <div className="mt-8 flex flex-wrap gap-3">
                  {(b.ctas || []).map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:shadow"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (b.type === "steps") {
          return (
            <section key={idx}>
              {b.title ? <h2 className="text-xl font-semibold md:text-2xl">{b.title}</h2> : null}
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {b.items.map((it, i) => (
                  <div key={i} className="rounded-2xl border bg-white p-5">
                    <div className="text-sm font-semibold">{it.title}</div>
                    {it.text ? <div className="mt-2 text-sm text-slate-600">{it.text}</div> : null}
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (b.type === "bullets") {
          return (
            <section key={idx}>
              {b.title ? <h2 className="text-xl font-semibold md:text-2xl">{b.title}</h2> : null}
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                {b.items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </section>
          );
        }

        if (b.type === "cta") {
          return (
            <section key={idx} className="rounded-3xl border bg-slate-50 px-6 py-10">
              <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-semibold md:text-xl">{b.title}</h3>
                  {b.text ? <p className="mt-2 text-sm text-slate-600">{b.text}</p> : null}
                </div>
                <Link href={b.href} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white">
                  {b.buttonLabel}
                </Link>
              </div>
            </section>
          );
        }

        if (b.type === "richText") {
          return (
            <section key={idx}>
              {b.title ? <h2 className="text-xl font-semibold md:text-2xl">{b.title}</h2> : null}
              {b.html ? <div className="prose prose-slate mt-3 max-w-none" dangerouslySetInnerHTML={{ __html: b.html }} /> : <div className="mt-3 whitespace-pre-wrap text-slate-700">{b.text}</div>}
            </section>
          );
        }

        if (b.type === "legal") {
          return (
            <section key={idx} className="rounded-2xl border bg-white p-5">
              <h3 className="text-base font-semibold">{t(lang, "Юридическая информация", "Legal information")}</h3>
              <p className="mt-2 text-sm text-slate-600">
                {t(
                  lang,
                  "Юридические данные компании выводятся автоматически из настроек сайта.",
                  "Company legal data is rendered automatically from site settings."
                )}
              </p>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
