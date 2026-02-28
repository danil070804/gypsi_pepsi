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
    { href: `/${lang}`, label: t(lang, "Главная", "Home") },
    { href: `/${lang}/services`, label: t(lang, "Услуги", "Services") },
    { href: `/${lang}/contact`, label: t(lang, "Контакты", "Contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${lang}`} className="font-semibold tracking-tight">
          <span className="text-white">GYPSEY</span>
          <span className="text-white/70">&nbsp;EMPLOYMENT</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              {it.label}
            </Link>
          ))}
          <div className="ml-1">
            <LanguageSwitcher lang={lang} />
          </div>
          <Button as="link" href={`/${lang}/contact`} className="ml-1">
            {t(lang, "Консультация", "Consultation")}
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher lang={lang} />
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-slate-950/70">
          <div className="container py-3">
            <div className="flex flex-col gap-2">
              {nav.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {it.label}
                </Link>
              ))}
              <Button as="link" href={`/${lang}/contact`} className="w-full justify-center">
                {t(lang, "Консультация", "Consultation")}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
