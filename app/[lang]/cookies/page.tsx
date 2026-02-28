import { getPageByKey, pickLang } from "@/lib/content";
import Blocks from "@/components/Blocks";
import { defaultLocale, locales, type Lang } from "@/lib/i18n";

type Params = Promise<{ lang: string }>;

export default async function Cookies({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;
  const safeLang: Lang = (locales as readonly string[]).includes(lang) ? (lang as Lang) : defaultLocale;

  const page = await getPageByKey("cookies");
  const blocks = pickLang<any>(lang, page?.blocksJson);

  return <Blocks blocks={blocks} lang={lang} />;
}