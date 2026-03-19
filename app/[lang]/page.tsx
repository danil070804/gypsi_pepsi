import type { Lang } from "@/lib/i18n";
import { getPageByKey, pickLang } from "@/lib/content";
import Blocks from "@/components/Blocks";
import { asLang } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";
import { getSiteSettingsSafe } from "@/lib/site-settings";
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

  return (
    <div className="space-y-12">
      <Blocks blocks={blocks} lang={lang} />
    </div>
  );
}
