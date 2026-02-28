import { getPageByKey, pickLang } from "@/lib/content";
import Blocks from "@/components/Blocks";
import { prisma } from "@/lib/prisma";
import { t, defaultLocale, locales, type Lang } from "@/lib/i18n";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const safeLang: Lang = (locales as readonly string[]).includes(lang) ? (lang as Lang) : defaultLocale;

  const page = await getPageByKey("home");
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
      canonical: `${base}/${safeLang}`,
      languages: {
        ru: `${base}/ru`,
        en: `${base}/en`,
      },
    },
    openGraph: {
      title: title || settings?.brandName,
      description: desc || undefined,
      url: `${base}/${safeLang}`,
      type: "website",
    },
  };
}

export default async function Home({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const safeLang: Lang = (locales as readonly string[]).includes(lang) ? (lang as Lang) : defaultLocale;

  const page = await getPageByKey("home");
  const blocks = pickLang<any>(lang, page?.blocksJson);

  const reviews = await prisma.review.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: 6,
  });

  const faqs = await prisma.fAQ.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: 8,
  });

  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 6,
  });

  return (
    <div className="space-y-12">
      <Blocks blocks={blocks} lang={lang} />
    </div>
  );
}
