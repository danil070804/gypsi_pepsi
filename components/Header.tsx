"use client";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { t } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePathname } from "next/navigation";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (pathname === href) return true;
  return href !== "/ru" && href !== "/en" && pathname.startsWith(`${href}/`);
}

export default function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
    { href: `/${lang}`, label: t(lang, "Главная", "Home") },
    { href: `/${lang}/services`, label: t(lang, "Услуги", "Services") },
    { href: `/${lang}/contact`, label: t(lang, "Контакты", "Contact") },
    { href: `/${lang}/reviews`, label: t(lang, "Отзывы", "Reviews") },
    { href: `/${lang}/blog`, label: t(lang, "Блог", "Blog") },
    { href: `/${lang}/about`, label: t(lang, "О нас", "About Us") },
    { href: `/${lang}/privacy`, label: t(lang, "Политика", "Privacy") },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/72 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[88rem] items-center gap-4 px-4 py-3 sm:px-6">
        <Link href={`/${lang}`} className="shrink-0 rounded-full px-1 py-2 font-semibold tracking-tight text-white/90 transition hover:text-white">
          <span className="text-white">GYPSEY</span>
          <span className="text-white/65">&nbsp;EMPLOYMENT</span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
          <nav className="flex min-w-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[0_20px_60px_rgba(2,6,23,0.3)]">
            {nav.map((it) => {
              const active = isActive(pathname, it.href);
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={
                    "whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold leading-none tracking-[0.01em] transition " +
                    (active
                      ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                      : "text-white/72 hover:bg-white/8 hover:text-white")
                  }
                >
                  {it.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LanguageSwitcher lang={lang} />
          <Button
            as="link"
            href={`/${lang}/contact`}
            className="min-w-[152px] px-5 py-2.5 shadow-[0_18px_40px_rgba(37,99,235,0.38)]"
          >
            {t(lang, "Консультация", "Consultation")}
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
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
          <div className="mx-auto w-full max-w-[88rem] px-4 py-3 sm:px-6">
            <div className="flex flex-col gap-2">
              {nav.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={
                    "rounded-2xl px-4 py-3 text-sm font-medium transition " +
                    (isActive(pathname, it.href)
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white")
                  }
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
