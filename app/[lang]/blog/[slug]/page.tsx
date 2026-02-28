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

  const post = await prisma.blogPost.findFirst({
    where:
      safeLang === "ru"
        ? { slugRu: slug }
        : { slugEn: slug },
  });

  if (!post || !post.isPublished) return {};

  const base = process.env.AUTH_URL || "http://localhost:3000";

  const title = safeLang === "ru" ? post.metaTitleRu || post.titleRu : post.metaTitleEn || post.titleEn;
  const desc = safeLang === "ru" ? post.metaDescRu || post.excerptRu : post.metaDescEn || post.excerptEn;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${base}/${safeLang}/blog/${slug}`,
    },
  };
}

export default async function Post({
  params,
}: {
  params: Params;
}) {
  const { lang, slug } = await params;
  const safeLang: Lang = (locales as readonly string[]).includes(lang) ? (lang as Lang) : defaultLocale;

  const post = await prisma.blogPost.findFirst({
    where:
      safeLang === "ru"
        ? { slugRu: slug }
        : { slugEn: slug },
  });

  if (!post || !post.isPublished) return notFound();

  const blocks = safeLang === "ru" ? post.contentRu : post.contentEn;

  return <Blocks blocks={blocks} lang={safeLang} />;
}