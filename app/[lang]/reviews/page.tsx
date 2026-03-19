import type { Lang } from "@/lib/i18n";
import { asLang, t } from "@/lib/i18n";
import { getPageByKey, pickLang } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site-url";
import ReviewsMarquee from "@/components/ReviewsMarquee";

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
  const page = await getPageByKey("reviews");
  const title = lang === "ru" ? page?.metaTitleRu || page?.titleRu : page?.metaTitleEn || page?.titleEn;
  const description = lang === "ru" ? page?.metaDescRu : page?.metaDescEn;

  return {
    title: title || t(lang, "Отзывы", "Reviews"),
    description: description || undefined,
    alternates: {
      canonical: `${base}/${lang}/reviews`,
      languages: {
        ru: `${base}/ru/reviews`,
        en: `${base}/en/reviews`,
      },
    },
  };
}

export default async function ReviewsPage({
  params,
}: {
  params: Params;
}) {
  const { lang: langParam } = await params;
  const lang: Lang = asLang(langParam);
  const page = await getPageByKey("reviews");
  const blocks = pickLang<any[]>(lang, page?.blocksJson);
  const hero = Array.isArray(blocks) ? blocks.find((block) => block?.type === "hero") : null;

  const reviews = await prisma.review.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-8 md:px-8 md:py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-8 top-0 h-48 w-48 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-0 top-8 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/62">
            {lang === "ru" ? page?.titleRu || t(lang, "Отзывы", "Reviews") : page?.titleEn || t(lang, "Отзывы", "Reviews")}
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
            {hero?.title || t(lang, "Отзывы, которые не стоят на месте", "Reviews that never stand still")}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
            {hero?.subtitle ||
              t(
                lang,
                "Мы собрали реальные впечатления клиентов в живую непрерывную ленту. Фото можно добавлять позже через админку, сами отзывы уже готовы к показу.",
                "We collected client impressions into a continuous live ribbon. Photos can be added later in the admin panel, while the reviews are already ready to display."
              )}
          </p>
        </div>
      </section>

      {reviews.length ? (
        <ReviewsMarquee reviews={reviews as any} lang={lang} />
      ) : (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-sm text-white/70">
          {t(lang, "Пока нет опубликованных отзывов.", "No published reviews yet.")}
        </div>
      )}
    </div>
  );
}
