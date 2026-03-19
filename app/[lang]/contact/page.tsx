import type { Lang } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { asLang, t } from "@/lib/i18n";
import { normalizeWhatsapp, normalizeTelegram, normalizeInstagram } from "@/lib/contacts";
import { getSiteUrl } from "@/lib/site-url";
import PageIntro from "@/components/PageIntro";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = Promise<{ lang: string }>;

function ContactIcon({ kind }: { kind: "whatsapp" | "telegram" | "instagram" | "email" }) {
  if (kind === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <path fill="currentColor" d="M12.04 2C6.53 2 2.06 6.47 2.06 11.98c0 1.77.46 3.5 1.33 5.02L2 22l5.13-1.35a9.93 9.93 0 0 0 4.91 1.25h.01c5.51 0 9.98-4.47 9.98-9.98A9.97 9.97 0 0 0 12.04 2Zm0 18.12h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.04.8.81-2.96-.2-.31a8.12 8.12 0 1 1 6.87 3.78Zm4.45-6.08c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.64 6.64 0 0 1-1.96-1.2 7.3 7.3 0 0 1-1.35-1.68c-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.39.52.58.18 1.1.15 1.52.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    );
  }

  if (kind === "telegram") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <path fill="currentColor" d="M9.78 15.2 9.4 20.56c.54 0 .78-.23 1.07-.5l2.57-2.46 5.33 3.9c.98.54 1.67.26 1.93-.9l3.5-16.42h.01c.31-1.45-.52-2.02-1.47-1.67L1.58 10.35c-1.41.55-1.39 1.34-.24 1.7l5.31 1.65L18.97 6c.58-.38 1.12-.17.69.21" />
      </svg>
    );
  }

  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <path fill="currentColor" d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm-.2 2A3.55 3.55 0 0 0 4 7.55v8.9A3.55 3.55 0 0 0 7.55 20h8.9A3.55 3.55 0 0 0 20 16.45v-8.9A3.55 3.55 0 0 0 16.45 4h-8.9Zm9.95 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
      <path fill="currentColor" d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.51l9 5.4 9-5.4V7H3Zm18 10V9.84l-8.49 5.1a1 1 0 0 1-1.02 0L3 9.84V17h18Z" />
    </svg>
  );
}

function contactButtonClass(kind: "whatsapp" | "telegram" | "instagram" | "email") {
  if (kind === "whatsapp") {
    return "border-emerald-300/40 bg-emerald-500/20 ring-emerald-300/20 hover:bg-emerald-500/35 hover:ring-emerald-200/40";
  }
  if (kind === "telegram") {
    return "border-sky-300/40 bg-sky-500/20 ring-sky-300/20 hover:bg-sky-500/35 hover:ring-sky-200/40";
  }
  if (kind === "instagram") {
    return "border-fuchsia-300/40 bg-fuchsia-500/20 ring-fuchsia-300/20 hover:bg-fuchsia-500/35 hover:ring-fuchsia-200/40";
  }
  return "border-indigo-300/40 bg-indigo-500/20 ring-indigo-300/20 hover:bg-indigo-500/35 hover:ring-indigo-200/40";
}

function ManagerCard({ m, lang }: { m: any; lang: Lang }) {
  const name = lang === "ru" ? m.nameRu : m.nameEn;
  const role = lang === "ru" ? m.roleRu : m.roleEn;

  const links = {
    whatsapp: normalizeWhatsapp(m.whatsapp),
    telegram: normalizeTelegram(m.telegram),
    instagram: normalizeInstagram(m.instagram),
    email: m.email ? `mailto:${m.email}` : null,
  };

  const order = ["whatsapp", "telegram", "instagram", "email"] as const;

  return (
    <div className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(2,6,23,0.24)] transition hover:-translate-y-1 hover:border-sky-200/15 hover:bg-white/[0.06]">
      <div className="mb-5 aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-900/70">
        {m.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={m.photoUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_58%),linear-gradient(180deg,rgba(15,23,42,0.86),rgba(2,6,23,0.96))] text-5xl font-semibold text-white/35">
            {name.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>

      <div className="pt-1 text-xl font-semibold leading-[1.1] text-white">{name}</div>
      {role ? <div className="mt-1 text-sm text-white/70">{role}</div> : null}

      <div className="mt-5 flex flex-wrap gap-2.5">
        {order.map((k) => {
          const href = links[k];
          if (!href) return null;

          return (
            <a
              key={k}
              href={href}
              target={k === "email" ? undefined : "_blank"}
              rel={k === "email" ? undefined : "noreferrer"}
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold capitalize text-white ring-1 transition ${contactButtonClass(k)}`}
            >
              <ContactIcon kind={k} />
              <span>{k}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { lang: langParam } = await params;
  const lang: Lang = asLang(langParam);

  const base = getSiteUrl();

  return {
    title: t(lang, "Контакты", "Contacts"),
    alternates: {
      canonical: `${base}/${lang}/contact`,
      languages: {
        ru: `${base}/ru/contact`,
        en: `${base}/en/contact`,
      },
    },
  };
}

export default async function Contact({
  params,
}: {
  params: Params;
}) {
  const { lang: langParam } = await params;
  const lang: Lang = asLang(langParam);

  const managers = await prisma.manager.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return (
    <div className="space-y-8 md:space-y-10">
      <PageIntro
        eyebrow={t(lang, "Контакты", "Contacts")}
        title={t(lang, "Выбор менеджера", "Choose a manager")}
        description={t(
          lang,
          "Откройте карточку нужного менеджера и выберите удобный способ связи. Показываются только заполненные контакты.",
          "Open the card of the manager you need and choose the most convenient way to get in touch. Only filled contact methods are shown."
        )}
        aside={
          <>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                {t(lang, "Активно", "Active")}
              </div>
              <div className="mt-2 text-2xl font-semibold text-white">{managers.length}</div>
              <div className="mt-1 text-sm leading-6 text-white/65">
                {t(lang, "менеджеров доступны сейчас", "managers available right now")}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4">
              <div className="text-sm font-semibold text-white">
                {t(lang, "Связь без лишних шагов", "Contact without extra steps")}
              </div>
              <div className="mt-2 text-sm leading-6 text-white/65">
                {t(lang, "WhatsApp, Telegram, Instagram и email прямо из карточки.", "WhatsApp, Telegram, Instagram, and email directly from the card.")}
              </div>
            </div>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {managers.map((m) => (
          <ManagerCard key={m.id} m={m} lang={lang} />
        ))}
      </div>
    </div>
  );
}
