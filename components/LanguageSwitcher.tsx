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
    router.push(parts.join("/"));
  }

  const Btn = ({ code }: { code: Lang }) => (
    <button
      onClick={() => switchTo(code)}
      className={
        "min-w-[40px] rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] transition " +
        (lang === code
          ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-[0_8px_22px_rgba(37,99,235,0.35)]"
          : "text-white/60 hover:bg-white/8 hover:text-white")
      }
      aria-pressed={lang === code}
    >
      {code.toUpperCase()}
    </button>
  );

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-900/70 p-1 shadow-[0_16px_40px_rgba(2,6,23,0.3)]">
      <Btn code="en" />
      <Btn code="ru" />
    </div>
  );
}
