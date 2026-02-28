import type { Lang } from "@/lib/i18n";
import { getPageByKey, pickLang } from "@/lib/content";
import Blocks from "@/components/Blocks";

type Params = Promise<{ lang: Lang }>;

export default async function Cookies({
  params,
}: {
  params: Params;
}) {
  const { lang } = await params;

  const page = await getPageByKey("cookies");
  const blocks = pickLang<any>(lang, page?.blocksJson);

  return <Blocks blocks={blocks} lang={lang} />;
}
