import type { Lang } from "@/lib/i18n";
import { asLang, t } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = Promise<{ lang: string }>;

function Stars({ rating }: { rating: number | null }) {
  if (!rating) return null;

  return (
    <div className="flex items-center gap-1 text-sm text-amber-300" aria-label={`Rating: ${rating} of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden>
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review, lang }: { review: any; lang: Lang }) {
  const text = lang === "ru" ? review.textRu : review.textEn;

  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white/10">
          {review.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={review.photoUrl} alt={review.authorName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-white/60">
              {review.authorName.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">{review.authorName}</h2>
            <Stars rating={review.rating} />
          </div>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/80">{text}</p>
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { lang: langParam } = await params;
  const lang: Lang = asLang(langParam);
  const base = getSiteUrl();

  return {
    title: t(lang, "Отзывы", "Reviews"),
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

  const reviews = await prisma.review.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          {t(lang, "Отзывы клиентов", "Client reviews")}
        </h1>
        <p className="mt-3 text-white/70">
          {t(
            lang,
            "Все опубликованные отзывы собраны на одной странице.",
            "All published reviews are collected on one page."
          )}
        </p>
      </div>

      {reviews.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-sm text-white/70">
          {t(lang, "Пока нет опубликованных отзывов.", "No published reviews yet.")}
        </div>
      )}
    </div>
  );
}
