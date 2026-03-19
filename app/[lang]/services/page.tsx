import type { Lang } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ServiceCardReveal from "@/components/ServiceCardReveal";
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
    title: t(lang, "Услуги", "Services"),
    alternates: {
      canonical: `${base}/${lang}/services`,
      languages: {
        ru: `${base}/ru/services`,
        en: `${base}/en/services`,
      },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Params;
}) {
  const { lang: langParam } = await params;
  const lang: Lang = asLang(langParam);

  const services = await prisma.service.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return (
    <div className="space-y-8 md:space-y-10">
      <PageIntro
        eyebrow={t(lang, "Навигация", "Navigation")}
        title={t(lang, "Услуги", "Services")}
        description={t(
          lang,
          "Выберите направление и откройте подробности.",
          "Choose a direction and open the details."
        )}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => {
          const title = lang === "ru" ? s.titleRu : s.titleEn;
          const excerpt = lang === "ru" ? s.excerptRu : s.excerptEn;
          const slug = s.slug;

          return (
            <ServiceCardReveal key={s.id} title={title} excerpt={excerpt} slug={slug} lang={lang} />
          );
        })}
      </div>

      <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6 shadow-[0_18px_60px_rgba(2,6,23,0.2)] md:p-7">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
          {t(lang, "Следующий шаг", "Next step")}
        </div>
        <div className="pt-1 text-2xl font-semibold leading-[1.1] text-white md:text-3xl">
          {t(lang, "Нужна консультация?", "Need a consultation?")}
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 md:text-[15px]">
          {t(
            lang,
            "Выберите менеджера и свяжитесь удобным способом.",
            "Choose a manager and contact us in a convenient way."
          )}
        </p>
        <div className="mt-4">
          <Link
            href={`/${lang}/contact`}
            className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/50 ring-1 ring-blue-200/40 transition hover:brightness-110"
          >
            {t(lang, "Выбрать менеджера", "Choose a manager")}
          </Link>
        </div>
      </div>
    </div>
  );
}
