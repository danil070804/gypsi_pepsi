import type { Lang } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { t } from "@/lib/i18n";

type Params = Promise<{ lang: Lang }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const base = process.env.AUTH_URL || "http://localhost:3000";

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
  const { lang } = await params;
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
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">
          {t(lang, "Блог", "Blog")}
        </h1>
        <p className="mt-2 text-slate-600">
          {t(lang, "Новости и полезные материалы.", "Updates and helpful materials.")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((p) => {
          const slug = lang === "ru" ? p.slugRu : p.slugEn;
          return (
            <Link
              key={p.id}
              href={`/${lang}/blog/${slug}`}
              className="rounded-xl border p-4 hover:shadow"
            >
              <h2 className="font-semibold">
                {lang === "ru" ? p.titleRu : p.titleEn}
              </h2>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/${lang}/blog?page=${i + 1}`}
              className="px-3 py-1 border rounded"
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
