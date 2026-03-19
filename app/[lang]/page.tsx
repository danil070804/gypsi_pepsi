import type { Lang } from "@/lib/i18n";
import { getPageByKey, pickLang } from "@/lib/content";
import Blocks from "@/components/Blocks";
import { asLang } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";
import { getSiteSettingsSafe } from "@/lib/site-settings";
import { prisma } from "@/lib/prisma";
import HomeTrustSection from "@/components/HomeTrustSection";
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

  const page = await getPageByKey("home");
  const settings = await getSiteSettingsSafe();

  const title =
    lang === "ru"
      ? page?.metaTitleRu || page?.titleRu
      : page?.metaTitleEn || page?.titleEn;

  const desc =
    lang === "ru"
      ? page?.metaDescRu || settings?.defaultMetaDescriptionRu
      : page?.metaDescEn || settings?.defaultMetaDescriptionEn;

  const base = getSiteUrl();

  return {
    title: title || settings?.brandName,
    description: desc || undefined,
    alternates: {
      canonical: `${base}/${lang}`,
      languages: {
        ru: `${base}/ru`,
        en: `${base}/en`,
      },
    },
    openGraph: {
      title: title || settings?.brandName,
      description: desc || undefined,
      url: `${base}/${lang}`,
      type: "website",
    },
  };
}

export default async function Home({
  params,
}: {
  params: Params;
}) {
  const { lang: langParam } = await params;
  const lang: Lang = asLang(langParam);

  const page = await getPageByKey("home");
  const blocks = pickLang<any[]>(lang, page?.blocksJson);
  const stepsIndex = Array.isArray(blocks) ? blocks.findIndex((block) => block?.type === "steps") : -1;
  const primaryBlocks = stepsIndex >= 0 ? blocks.slice(0, stepsIndex + 1) : blocks;
  const trailingBlocks = stepsIndex >= 0 ? blocks.slice(stepsIndex + 1) : [];
  const [serviceCount, managerCount, reviewCount] = await Promise.all([
    prisma.service.count({ where: { isPublished: true } }),
    prisma.manager.count({ where: { isActive: true } }),
    prisma.review.count({ where: { isPublished: true } }),
  ]);

  return (
    <div className="space-y-12">
      <Blocks blocks={primaryBlocks} lang={lang} />
      <HomeTrustSection lang={lang} serviceCount={serviceCount} managerCount={managerCount} reviewCount={reviewCount} />
      {trailingBlocks.length ? <Blocks blocks={trailingBlocks} lang={lang} /> : null}
    </div>
  );
}
