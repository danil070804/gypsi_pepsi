import type { Lang } from "@/lib/i18n";
import { asLang } from "@/lib/i18n";
import { getPageByKey, pickLang } from "@/lib/content";
import Blocks from "@/components/Blocks";

export const dynamic = "force-dynamic";
export const revalidate = 0;


type Params = Promise<{ lang: string }>;

export default async function Privacy({
  params,
}: {
  params: Params;
}) {
  const { lang: langParam } = await params;
  const lang: Lang = asLang(langParam);

  const page = await getPageByKey("privacy");
  const blocks = pickLang<any>(lang, page?.blocksJson);

  return <Blocks blocks={blocks} lang={lang} />;
}
