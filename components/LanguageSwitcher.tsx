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
        "rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition " +
        (lang === code ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/10 hover:text-white")
      }
      aria-pressed={lang === code}
    >
      {code.toUpperCase()}
    </button>
  );

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      <Btn code="en" />
      <Btn code="ru" />
    </div>
  );
}
