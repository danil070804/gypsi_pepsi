import type { Lang } from "@/lib/i18n";
import { asLang, t } from "@/lib/i18n";
import { getPageByKey, pickLang } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site-url";
import ReviewsMarquee from "@/components/ReviewsMarquee";
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
      <PageIntro
        eyebrow={lang === "ru" ? page?.titleRu || t(lang, "Отзывы", "Reviews") : page?.titleEn || t(lang, "Отзывы", "Reviews")}
        title={hero?.title || t(lang, "Отзывы, которые не стоят на месте", "Reviews that never stand still")}
        description={
          hero?.subtitle ||
          t(
            lang,
            "Мы собрали реальные впечатления клиентов в живую непрерывную ленту. Откройте карточку и прочитайте отзыв полностью.",
            "We collected real client impressions into a continuous live ribbon. Open any card to read the full review."
          )
        }
      />

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
