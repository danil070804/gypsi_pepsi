import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { t, defaultLocale, locales, type Lang } from "@/lib/i18n";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const safeLang: Lang = (locales as readonly string[]).includes(lang) ? (lang as Lang) : defaultLocale;
  const base = process.env.AUTH_URL || "http://localhost:3000";

  return {
    title: safeLang === "ru" ? "Блог" : "Blog",
    alternates: {
      canonical: `${base}/${safeLang}/blog`,
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
  const safeLang: Lang = (locales as readonly string[]).includes(lang) ? (lang as Lang) : defaultLocale;
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
          {t(safeLang, "Блог", "Blog")}
        </h1>
        <p className="mt-2 text-slate-600">
          {t(safeLang, "Новости и полезные материалы.", "Updates and helpful materials.")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((p) => {
          const slug = safeLang === "ru" ? p.slugRu : p.slugEn;
          return (
            <Link
              key={p.id}
              href={`/${safeLang}/blog/${slug}`}
              className="rounded-xl border p-4 hover:shadow"
            >
              <h2 className="font-semibold">
                {safeLang === "ru" ? p.titleRu : p.titleEn}
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
              href={`/${safeLang}/blog?page=${i + 1}`}
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
