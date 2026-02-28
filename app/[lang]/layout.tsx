import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Lang } from "@/lib/i18n";
import { asLang, locales } from "@/lib/i18n";
import type { ReactNode } from "react";

// NOTE: In Next.js 15, the generated route types model `params` as a Promise
// and the raw param values as `string`. We validate and narrow the `lang`
// value at runtime to our supported `Lang` union.
type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { lang: langParam } = await params;
  const lang: Lang = asLang(langParam);

  return (
    <>
      <Header lang={lang} />
      <main className="container py-10">{children}</main>
      <Footer lang={lang} />
    </>
  );
}
