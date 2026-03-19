import type { Lang } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { asLang, t } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";
import PageIntro from "@/components/PageIntro";
export const dynamic = "force-dynamic";
export const revalidate = 0;


type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { lang: langParam } = await params;
  const lang: Lang = asLang(langParam);
  const base = getSiteUrl();

  return {
    title: lang === "ru" ? "Блог" : "Blog",
    alternates: {
      canonical: `${base}/${lang}/blog`,
      languages: {
        ru: `${base}/ru/blog`,
        en: `${base}/en/blog`,
      },
    },
  };
}

export default async function Blog({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang: langParam } = await params;
  const lang: Lang = asLang(langParam);
  const sp = await searchParams;

  const page = Math.max(1, Number(sp?.page || "1"));
  const pageSize = 9;

  const where = { isPublished: true } as const;

  const [total, posts] = await Promise.all([
    prisma.blogPost.count({ where }),
    prisma.blogPost.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const formatDate = new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8 md:space-y-10">
      <PageIntro
        eyebrow={t(lang, "Материалы", "Articles")}
        title={t(lang, "Блог", "Blog")}
        description={t(
          lang,
          "Новости, полезные материалы и разборы по трудоустройству, документам и адаптации в Великобритании.",
          "Updates, helpful articles, and practical breakdowns on employment, documents, and adaptation in the United Kingdom."
        )}
        aside={
          <>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                {t(lang, "Публикации", "Posts")}
              </div>
              <div className="mt-2 text-2xl font-semibold text-white">{total}</div>
              <div className="mt-1 text-sm leading-6 text-white/65">
                {t(lang, "материалов уже опубликовано", "articles already published")}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4">
              <div className="text-sm font-semibold text-white">
                {t(lang, "Без лишней воды", "Straight to the point")}
              </div>
              <div className="mt-2 text-sm leading-6 text-white/65">
                {t(lang, "Только полезные тексты, которые помогают понять процесс заранее.", "Only useful texts that help you understand the process in advance.")}
              </div>
            </div>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((p) => {
          const slug = lang === "ru" ? p.slugRu : p.slugEn;
          const title = lang === "ru" ? p.titleRu : p.titleEn;
          const excerpt = lang === "ru" ? p.excerptRu : p.excerptEn;
          const publishedAt = p.publishedAt ? formatDate.format(p.publishedAt) : null;
          return (
            <Link
              key={p.id}
              href={`/${lang}/blog/${slug}`}
              className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(2,6,23,0.24)] transition hover:-translate-y-1 hover:border-sky-200/15 hover:bg-white/[0.06]"
            >
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                {publishedAt || t(lang, "Материал", "Article")}
              </div>
              <h2 className="mt-4 pt-1 text-xl font-semibold leading-[1.12] text-white transition group-hover:text-sky-100">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/70">
                {excerpt}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-200/80 transition group-hover:text-sky-100">
                <span>{t(lang, "Читать", "Read")}</span>
                <span aria-hidden>+</span>
              </div>
            </Link>
          );
        })}
      </div>

      {!posts.length ? (
        <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-white/[0.04] p-8 text-sm leading-7 text-white/65">
          {t(lang, "Пока нет опубликованных материалов.", "No published articles yet.")}
        </div>
      ) : null}

      {totalPages > 1 && (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/${lang}/blog?page=${i + 1}`}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition ${
                i + 1 === page
                  ? "border-blue-300/30 bg-blue-500/20 text-white"
                  : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
