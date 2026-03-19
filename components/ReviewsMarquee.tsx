"use client";

import { useEffect, useMemo, useState } from "react";
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

function ReviewPreview({
  review,
  lang,
  onOpen,
}: {
  review: ReviewItem;
  lang: Lang;
  onOpen: (review: ReviewItem) => void;
}) {
  const text = lang === "ru" ? review.textRu : review.textEn;

  return (
    <button
      type="button"
      onClick={() => onOpen(review)}
      className="review-marquee-card group text-left transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-blue-400/40"
      aria-label={`${review.authorName}. ${lang === "ru" ? "Открыть полный отзыв" : "Open full review"}`}
    >
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
          <p className="review-marquee-excerpt mt-3 text-sm leading-6 text-white/76">{text}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200/78 transition group-hover:text-sky-100">
            <span>{lang === "ru" ? "Читать отзыв" : "Read review"}</span>
            <span aria-hidden>+</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function ReviewDialog({
  review,
  lang,
  onClose,
}: {
  review: ReviewItem | null;
  lang: Lang;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!review) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [review, onClose]);

  if (!review) return null;

  const text = lang === "ru" ? review.textRu : review.textEn;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={lang === "ru" ? "Закрыть отзыв" : "Close review"}
        className="absolute inset-0 bg-slate-950/72 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-[71] w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/92 shadow-[0_40px_120px_rgba(2,6,23,0.65)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-blue-500/14 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
        </div>

        <div className="relative p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                {review.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={review.photoUrl} alt={review.authorName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-white/65">
                    {review.authorName.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>

              <div>
                <div className="text-xl font-semibold text-white md:text-2xl">{review.authorName}</div>
                <div className="mt-2">
                  <Stars rating={review.rating} />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-white"
              aria-label={lang === "ru" ? "Закрыть" : "Close"}
            >
              ✕
            </button>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="whitespace-pre-line text-sm leading-7 text-white/82 md:text-base">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeLane({
  reviews,
  lang,
  reverse = false,
  duration = 42,
  onOpen,
}: {
  reviews: ReviewItem[];
  lang: Lang;
  reverse?: boolean;
  duration?: number;
  onOpen: (review: ReviewItem) => void;
}) {
  const laneReviews = useMemo(() => [...reviews, ...reviews], [reviews]);

  if (!reviews.length) return null;

  return (
    <div className="review-marquee-mask">
      <div
        className={`review-marquee-track${reverse ? " is-reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="review-marquee-group">
          {laneReviews.map((review, index) => (
            <ReviewPreview key={`${review.id}-${index}`} review={review} lang={lang} onOpen={onOpen} />
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
  const [activeReview, setActiveReview] = useState<ReviewItem | null>(null);
  const midpoint = Math.ceil(reviews.length / 2);
  const firstLane = reviews.slice(0, midpoint);
  const secondLane = reviews.slice(midpoint);

  return (
    <>
      <div className="space-y-4">
        <MarqueeLane reviews={firstLane} lang={lang} duration={46} onOpen={setActiveReview} />
        {secondLane.length ? <MarqueeLane reviews={secondLane} lang={lang} reverse duration={52} onOpen={setActiveReview} /> : null}
      </div>
      <ReviewDialog review={activeReview} lang={lang} onClose={() => setActiveReview(null)} />
    </>
  );
}
