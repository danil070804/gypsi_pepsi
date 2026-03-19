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

  return (
    <div className="space-y-8 md:space-y-10">
      <PageIntro
        eyebrow={t(lang, "Материалы", "Articles")}
        title={t(lang, "Блог", "Blog")}
        description={t(
          lang,
          "Полезные материалы о работе, документах и адаптации в Великобритании.",
          "Useful materials about jobs, documents, and adaptation in the United Kingdom."
        )}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((p) => {
          const slug = lang === "ru" ? p.slugRu : p.slugEn;
          const title = lang === "ru" ? p.titleRu : p.titleEn;
          const excerpt = lang === "ru" ? p.excerptRu : p.excerptEn;
          return (
            <Link
              key={p.id}
              href={`/${lang}/blog/${slug}`}
              className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_54px_rgba(2,6,23,0.2)] transition hover:-translate-y-1 hover:border-sky-200/15 hover:bg-white/[0.06]"
            >
              <h2 className="text-xl font-semibold leading-[1.08] text-white transition group-hover:text-sky-100">
                {title}
              </h2>
              <p
                className="mt-3 text-sm leading-7 text-white/70"
                style={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 4 }}
              >
                {excerpt}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-400/10 px-3.5 py-2 text-sm font-semibold text-sky-100 shadow-[0_10px_24px_rgba(14,165,233,0.12)] transition group-hover:border-sky-200/35 group-hover:bg-sky-400/18">
                <span>{t(lang, "Читать", "Read")}</span>
                <span aria-hidden>→</span>
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
