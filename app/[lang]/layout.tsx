import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Lang } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import type { ReactNode } from "react";

type Params = Promise<{ lang: Lang }>;

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
  const { lang } = await params;

  return (
    <>
      <Header lang={lang} />
      <main className="container py-10">{children}</main>
      <Footer lang={lang} />
    </>
  );
}
