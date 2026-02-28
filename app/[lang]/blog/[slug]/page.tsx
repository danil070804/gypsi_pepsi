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

  const post = await prisma.blogPost.findFirst({
    where:
      lang === "ru"
        ? { slugRu: slug }
        : { slugEn: slug },
  });

  if (!post || !post.isPublished) return {};

  const base = process.env.AUTH_URL || "http://localhost:3000";

  const title = lang === "ru" ? post.metaTitleRu || post.titleRu : post.metaTitleEn || post.titleEn;
  const desc = lang === "ru" ? post.metaDescRu || post.excerptRu : post.metaDescEn || post.excerptEn;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${base}/${lang}/blog/${slug}`,
    },
  };
}

export default async function Post({
  params,
}: {
  params: Params;
}) {
  const { lang: langParam, slug } = await params;
  const lang: Lang = asLang(langParam);

  const post = await prisma.blogPost.findFirst({
    where:
      lang === "ru"
        ? { slugRu: slug }
        : { slugEn: slug },
  });

  if (!post || !post.isPublished) return notFound();

  const blocks = lang === "ru" ? post.contentRu : post.contentEn;

  return <Blocks blocks={blocks} lang={lang} />;
}