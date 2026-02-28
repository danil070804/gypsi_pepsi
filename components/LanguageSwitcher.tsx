"use client";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "@/lib/i18n";

export default function LanguageSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Lang) {
    if (!pathname) return;
    const parts = pathname.split("/");
    // parts[0] = "", parts[1] = lang
    if (parts.length > 1) parts[1] = next;
    const nextPath = parts.join("/") || `/${next}`;
    localStorage.setItem("lang", next);
    router.push(nextPath);
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => switchTo("en")}
        className={lang === "en" ? "font-semibold underline" : "opacity-70 hover:opacity-100"}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="opacity-40">/</span>
      <button
        onClick={() => switchTo("ru")}
        className={lang === "ru" ? "font-semibold underline" : "opacity-70 hover:opacity-100"}
        aria-label="Переключить на русский"
      >
        RU
      </button>
    </div>
  );
}
