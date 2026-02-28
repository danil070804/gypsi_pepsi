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
  const { lang } = await params;

  const services = await prisma.service.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">
          {t(lang, "Услуги", "Services")}
        </h1>
        <p className="mt-2 text-slate-600">
          {t(
            lang,
            "Выберите нужную услугу и прочитайте подробности.",
            "Choose a service and read the details."
          )}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {services.map((s) => {
          const title = lang === "ru" ? s.titleRu : s.titleEn;
          const excerpt = lang === "ru" ? s.excerptRu : s.excerptEn;
          const slug = lang === "ru" ? s.slugRu : s.slugEn;

          return (
            <div key={s.id} className="rounded-2xl border bg-white p-5">
              <div className="text-lg font-semibold">{title}</div>
              {excerpt ? (
                <p className="mt-2 text-sm text-slate-600">{excerpt}</p>
              ) : null}

              <div className="mt-4">
                <Link
                  href={`/${lang}/services/${slug}`}
                  className="inline-flex rounded-full border px-4 py-2 text-sm font-medium hover:bg-slate-50"
                >
                  {t(lang, "Подробнее", "Learn more")}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border bg-slate-50 p-6">
        <div className="text-lg font-semibold">
          {t(lang, "Нужна консультация?", "Need a consultation?")}
        </div>
        <p className="mt-2 text-slate-600">
          {t(
            lang,
            "Выберите менеджера и свяжитесь удобным способом.",
            "Choose a manager and contact us in a convenient way."
          )}
        </p>
        <div className="mt-4">
          <Link
            href={`/${lang}/contact`}
            className="inline-flex rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            {t(lang, "Выбрать менеджера", "Choose a manager")}
          </Link>
        </div>
      </div>
    </div>
  );
}
