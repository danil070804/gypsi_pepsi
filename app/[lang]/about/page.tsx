import { getPageByKey, pickLang } from "@/lib/content";
import Blocks from "@/components/Blocks";
import { prisma } from "@/lib/prisma";
import { defaultLocale, locales, type Lang } from "@/lib/i18n";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const safeLang: Lang = (locales as readonly string[]).includes(lang) ? (lang as Lang) : defaultLocale;

  const page = await getPageByKey("about");
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  const title =
    safeLang === "ru"
      ? page?.metaTitleRu || page?.titleRu
      : page?.metaTitleEn || page?.titleEn;

  const desc =
    safeLang === "ru"
      ? page?.metaDescRu || settings?.defaultMetaDescriptionRu
      : page?.metaDescEn || settings?.defaultMetaDescriptionEn;

  const base = process.env.AUTH_URL || "http://localhost:3000";

  return {
    title: title || settings?.brandName,
    description: desc || undefined,
    alternates: {
      canonical: `${base}/${safeLang}/about`,
      languages: {
        ru: `${base}/ru/about`,
        en: `${base}/en/about`,
      },
    },
  };
}

export default async function About({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const safeLang: Lang = (locales as readonly string[]).includes(lang) ? (lang as Lang) : defaultLocale;

  const page = await getPageByKey("about");
  const blocks = pickLang<any>(lang, page?.blocksJson);

  return <Blocks blocks={blocks} lang={lang} />;
}