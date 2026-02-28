"use client";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { t } from "@/lib/i18n";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);

  const nav = [
    [t(lang, "Главная", "Home"), `/${lang}`],
    [t(lang, "О нас", "About"), `/${lang}/about`],
    [t(lang, "Услуги", "Services"), `/${lang}/services`],
    [t(lang, "Контакты", "Contact"), `/${lang}/contact`],
    [t(lang, "Блог", "Blog"), `/${lang}/blog`],
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-extrabold tracking-wide">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-xs text-white">
            GE
          </span>
          <span className="text-sm md:text-base">
            GYPSEY <span className="text-slate-500">EMPLOYMENT</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-medium text-slate-700 hover:text-slate-900">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button as="link" href={`/${lang}/contact`} className="bg-slate-900 text-white">
            {t(lang, "Консультация", "Consultation")}
          </Button>
          <LanguageSwitcher lang={lang} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher lang={lang} />
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t bg-white md:hidden">
          <div className="container flex flex-col gap-2 py-3">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50">
                {label}
              </Link>
            ))}
            <Button as="link" href={`/${lang}/contact`} className="mt-2" onClick={() => setOpen(false)}>
              {t(lang, "Консультация", "Consultation")}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
