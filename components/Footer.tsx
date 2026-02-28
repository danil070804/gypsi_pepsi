import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

export default async function Footer({ lang }: { lang: Lang }) {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return (
    <footer className="mt-16 border-t bg-slate-950 text-slate-200">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold">{settings?.brandName || "GYPSEY EMPLOYMENT AGENCY"}</div>
          <div className="mt-3 text-sm text-slate-400">
            {t(lang, "Трудоустройство в UK с сопровождением от заявки до результата.", "UK employment support from request to results.")}
          </div>
          {settings?.footerEmail ? <div className="mt-4 text-sm">Email: {settings.footerEmail}</div> : null}
          {settings?.footerPhone ? <div className="mt-1 text-sm">Phone: {settings.footerPhone}</div> : null}
        </div>

        <div className="text-sm">
          <div className="font-semibold">{t(lang, "Навигация", "Navigation")}</div>
          <div className="mt-4 flex flex-col gap-2 text-slate-300">
            <Link href={`/${lang}/services`}>{t(lang, "Услуги", "Services")}</Link>
            <Link href={`/${lang}/contact`}>{t(lang, "Выбор менеджера", "Choose manager")}</Link>
            <Link href={`/${lang}/blog`}>{t(lang, "Блог", "Blog")}</Link>
            <Link href={`/${lang}/privacy`}>Privacy</Link>
            <Link href={`/${lang}/cookies`}>Cookies</Link>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold">{t(lang, "Юридическая информация", "Legal")}</div>
          <div className="mt-4 space-y-1 text-slate-300">
            <div>{settings?.legalCompanyName}</div>
            <div>Company number: {settings?.legalCompanyNumber}</div>
            <div>Registered office: {settings?.legalRegisteredOffice}</div>
            <div>Status: {settings?.legalStatus}</div>
            <div>Incorporated: {settings?.legalIncorporated}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {settings?.brandName || "GYPSEY EMPLOYMENT AGENCY"}.
      </div>
    </footer>
  );
}
