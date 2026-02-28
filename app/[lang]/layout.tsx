import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { defaultLocale, locales, type Lang } from "@/lib/i18n";
import type { ReactNode } from "react";

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
  const { lang } = await params;
  const safeLang: Lang = (locales as readonly string[]).includes(lang) ? (lang as Lang) : defaultLocale;

  return (
    <>
      <Header lang={safeLang} />
      <main className="container py-10">{children}</main>
      <Footer lang={safeLang} />
    </>
  );
}
