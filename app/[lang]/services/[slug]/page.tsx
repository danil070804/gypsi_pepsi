import { prisma } from "@/lib/prisma";
import Blocks from "@/components/Blocks";
import { notFound } from "next/navigation";
import { defaultLocale, locales, type Lang } from "@/lib/i18n";

type Params = Promise<{ lang: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { lang, slug } = await params;
  const safeLang: Lang = (locales as readonly string[]).includes(lang) ? (lang as Lang) : defaultLocale;

  // Ищем услугу по slug в нужном языке
  const service = await prisma.service.findFirst({
    where: { slug },
  });

  if (!service || !service.isPublished) return {};

  const base = process.env.AUTH_URL || "http://localhost:3000";

  const title =
    safeLang === "ru"
      ? service.metaTitleRu || service.titleRu
      : service.metaTitleEn || service.titleEn;

  const desc =
    safeLang === "ru"
      ? service.metaDescRu || service.excerptRu
      : service.metaDescEn || service.excerptEn;

  return {
    title,
    description: desc || undefined,
    alternates: {
      canonical: `${base}/${safeLang}/services/${slug}`,
      languages: {
        ru: `${base}/ru/services/${safeLang === "ru" ? slug : service.slug}`,
        en: `${base}/en/services/${safeLang === "en" ? slug : service.slug}`,
      },
    },
    openGraph: {
      title,
      description: desc || undefined,
      url: `${base}/${safeLang}/services/${slug}`,
      type: "website",
      images: service.ogImageUrl ? [service.ogImageUrl] : undefined,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Params;
}) {
  const { lang, slug } = await params;
  const safeLang: Lang = (locales as readonly string[]).includes(lang) ? (lang as Lang) : defaultLocale;

  const service = await prisma.service.findFirst({
    where: { slug },
  });

  if (!service || !service.isPublished) return notFound();

  const blocks = safeLang === "ru" ? service.contentRu : service.contentEn;

  return <Blocks blocks={blocks} lang={lang} />;
}