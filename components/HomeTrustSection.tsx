import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M12 2 4 5v6c0 5.25 3.4 10.16 8 11.71 4.6-1.55 8-6.46 8-11.71V5l-8-3Zm3.78 8.3-4.35 4.4a1 1 0 0 1-1.42 0l-1.8-1.83 1.42-1.4 1.1 1.11 3.64-3.68 1.41 1.4Z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="m12 2 2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2L12 2Zm6.5 14 1.05 2.45L22 19.5l-2.45 1.05L18.5 23l-1.05-2.45L15 19.5l2.45-1.05L18.5 16ZM5.5 15 6.3 17 8.3 17.8 6.3 18.6 5.5 20.6 4.7 18.6 2.7 17.8 4.7 17 5.5 15Z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M12 3c4.96 0 9 3.58 9 8s-4.04 8-9 8a10.1 10.1 0 0 1-3.38-.57L3 21l1.9-4.17A7.3 7.3 0 0 1 3 11c0-4.42 4.04-8 9-8Zm-4 6v2h8V9H8Zm0 4v2h5v-2H8Z" />
    </svg>
  );
}

function MetricCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="site-panel rounded-[1.5rem] p-5">
      <div className="text-3xl font-semibold leading-none text-white">{value}</div>
      <div className="mt-2 text-sm leading-6 text-white/65">{label}</div>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="site-panel rounded-[1.5rem] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-400/10 text-sky-100">
          {icon}
        </div>
        <div className="text-lg font-semibold leading-tight text-white">{title}</div>
      </div>
      <p className="mt-4 text-sm leading-7 text-white/68">{text}</p>
    </div>
  );
}

export default function HomeTrustSection({
  lang,
  serviceCount,
  managerCount,
  reviewCount,
}: {
  lang: Lang;
  serviceCount: number;
  managerCount: number;
  reviewCount: number;
}) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="site-chip">{t(lang, "Доверие", "Trust")}</div>
          <h2 className="pt-2 text-3xl font-semibold leading-[1.05] text-white md:text-[2.6rem]">
            {t(lang, "Сильная подача без лишних обещаний", "A strong presentation without empty promises")}
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/68 md:text-[15px]">
            {t(
              lang,
              "Мы показываем только то, что реально помогает человеку решиться: понятный процесс, живые отзывы, прямой контакт и прозрачную подачу.",
              "We show only what actually helps a person make a decision: a clear process, real reviews, direct contact, and transparent presentation."
            )}
          </p>
        </div>

        <Link href={`/${lang}/reviews`} className="site-accent-link">
          <span>{t(lang, "Смотреть отзывы", "View reviews")}</span>
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard value={String(serviceCount)} label={t(lang, "актуальных направлений сопровождения", "active service directions")} />
        <MetricCard value={String(managerCount)} label={t(lang, "менеджеров для прямой связи", "managers available for direct contact")} />
        <MetricCard value={String(reviewCount)} label={t(lang, "отзывов уже опубликовано", "reviews already published")} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <TrustItem
          icon={<ShieldIcon />}
          title={t(lang, "Официальная подача", "Official presentation")}
          text={t(
            lang,
            "Чёткие условия, аккуратная структура и никакой визуальной суеты. Человек сразу понимает, что здесь всё собрано профессионально.",
            "Clear terms, clean structure, and no visual noise. A visitor immediately understands that everything here is put together professionally."
          )}
        />
        <TrustItem
          icon={<MessageIcon />}
          title={t(lang, "Прямой контакт", "Direct contact")}
          text={t(
            lang,
            "Менеджеры, отзывы и страницы услуг работают как единая система. Не нужно угадывать следующий шаг или искать, куда нажимать дальше.",
            "Managers, reviews, and service pages work as one system. There is no need to guess the next step or search where to click next."
          )}
        />
        <TrustItem
          icon={<SparkIcon />}
          title={t(lang, "Спокойный премиум", "Calm premium")}
          text={t(
            lang,
            "Сайт остаётся тёмным и строгим, но без сельского перегруза. Акцент идёт на доверие, ритм, типографику и ясную подачу.",
            "The site stays dark and restrained, but without cheap overload. The emphasis is on trust, rhythm, typography, and clarity."
          )}
        />
      </div>
    </section>
  );
}
