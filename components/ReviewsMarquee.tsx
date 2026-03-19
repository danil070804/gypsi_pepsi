import type { Lang } from "@/lib/i18n";

type ReviewItem = {
  id: string;
  authorName: string;
  textRu: string;
  textEn: string;
  rating: number | null;
  photoUrl: string | null;
};

function Stars({ rating }: { rating: number | null }) {
  const safeRating = Math.max(0, Math.min(5, rating || 0));

  return (
    <div className="flex items-center gap-1 text-[13px] text-amber-300" aria-label={`Rating: ${safeRating} of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden>
          {index < safeRating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review, lang }: { review: ReviewItem; lang: Lang }) {
  const text = lang === "ru" ? review.textRu : review.textEn;

  return (
    <article className="review-marquee-card">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
          {review.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={review.photoUrl} alt={review.authorName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-white/65">
              {review.authorName.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold tracking-tight text-white">{review.authorName}</div>
            <Stars rating={review.rating} />
          </div>
          <p className="mt-3 text-sm leading-6 text-white/76">{text}</p>
        </div>
      </div>
    </article>
  );
}

function MarqueeLane({
  reviews,
  lang,
  reverse = false,
  duration = 42,
}: {
  reviews: ReviewItem[];
  lang: Lang;
  reverse?: boolean;
  duration?: number;
}) {
  if (!reviews.length) return null;

  return (
    <div className="review-marquee-mask">
      <div
        className={`review-marquee-track${reverse ? " is-reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="review-marquee-group">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} lang={lang} />
          ))}
        </div>
        <div className="review-marquee-group" aria-hidden>
          {reviews.map((review) => (
            <ReviewCard key={`${review.id}-clone`} review={review} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsMarquee({
  reviews,
  lang,
}: {
  reviews: ReviewItem[];
  lang: Lang;
}) {
  const midpoint = Math.ceil(reviews.length / 2);
  const firstLane = reviews.slice(0, midpoint);
  const secondLane = reviews.slice(midpoint);

  return (
    <div className="space-y-4">
      <MarqueeLane reviews={firstLane} lang={lang} duration={46} />
      {secondLane.length ? <MarqueeLane reviews={secondLane} lang={lang} reverse duration={52} /> : null}
    </div>
  );
}
