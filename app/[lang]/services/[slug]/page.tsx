import type { Lang } from "@/lib/i18n";
import { asLang } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import Blocks from "@/components/Blocks";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export const revalidate = 0;


type Params = Promise<{ lang: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { lang: langParam, slug } = await params;
  const lang: Lang = asLang(langParam);

  // Ищем услугу по slug в нужном языке
  const service = await prisma.service.findUnique({ where: { slug } });

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
        ru: `${base}/ru/services/${slug}`,
        en: `${base}/en/services/${slug}`,
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
  const { lang: langParam, slug } = await params;
  const lang: Lang = asLang(langParam);

  const service = await prisma.service.findUnique({ where: { slug } });

  if (!service || !service.isPublished) return notFound();

  const blocks = lang === "ru" ? service.contentRu : service.contentEn;

  return <Blocks blocks={blocks} lang={lang} />;
}