import type { Lang } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import Blocks from "@/components/Blocks";
import { notFound } from "next/navigation";

type Params = Promise<{ lang: Lang; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { lang, slug } = await params;

  // Ищем услугу по slug в нужном языке
  const service = await prisma.service.findFirst({
    where:
      lang === "ru"
        ? { slugRu: slug }
        : { slugEn: slug },
  });

  if (!service || !service.isPublished) return {};

  const base = process.env.AUTH_URL || "http://localhost:3000";

  const title =
    lang === "ru"
      ? service.metaTitleRu || service.titleRu
      : service.metaTitleEn || service.titleEn;

  const desc =
    lang === "ru"
      ? service.metaDescRu || service.excerptRu
      : service.metaDescEn || service.excerptEn;

  return {
    title,
    description: desc || undefined,
    alternates: {
      canonical: `${base}/${lang}/services/${slug}`,
      languages: {
        ru: `${base}/ru/services/${lang === "ru" ? slug : service.slugRu}`,
        en: `${base}/en/services/${lang === "en" ? slug : service.slugEn}`,
      },
    },
    openGraph: {
      title,
      description: desc || undefined,
      url: `${base}/${lang}/services/${slug}`,
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

  const service = await prisma.service.findFirst({
    where:
      lang === "ru"
        ? { slugRu: slug }
        : { slugEn: slug },
  });

  if (!service || !service.isPublished) return notFound();

  const blocks = lang === "ru" ? service.contentRu : service.contentEn;

  return <Blocks blocks={blocks} lang={lang} />;
}
