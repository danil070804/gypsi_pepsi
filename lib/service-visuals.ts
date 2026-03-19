import type { Lang } from "@/lib/i18n";

export type ServiceIconKey =
  | "consult"
  | "docs"
  | "visa"
  | "transfer"
  | "housing"
  | "support";

type ServiceVisualConfig = {
  icon: ServiceIconKey;
  tagsRu: string[];
  tagsEn: string[];
  toneClass: string;
};

const DEFAULT_VISUAL: ServiceVisualConfig = {
  icon: "consult",
  tagsRu: ["Сопровождение", "Консультация"],
  tagsEn: ["Guidance", "Consultation"],
  toneClass: "border-sky-300/20 bg-sky-400/10 text-sky-100",
};

const VISUALS_BY_SLUG: Record<string, ServiceVisualConfig> = {
  "consult-info": {
    icon: "consult",
    tagsRu: ["Старт", "Вакансии", "Разбор условий"],
    tagsEn: ["Start", "Vacancies", "Conditions"],
    toneClass: "border-sky-300/20 bg-sky-400/10 text-sky-100",
  },
  documentation: {
    icon: "docs",
    tagsRu: ["Документы", "Проверка", "Подача"],
    tagsEn: ["Documents", "Review", "Submission"],
    toneClass: "border-indigo-300/20 bg-indigo-400/10 text-indigo-100",
  },
  visa: {
    icon: "visa",
    tagsRu: ["Виза", "Легально", "Сроки"],
    tagsEn: ["Visa", "Legal", "Timing"],
    toneClass: "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
  },
  transfer: {
    icon: "transfer",
    tagsRu: ["Встреча", "Логистика", "Маршрут"],
    tagsEn: ["Pickup", "Logistics", "Route"],
    toneClass: "border-amber-300/20 bg-amber-400/10 text-amber-100",
  },
  shelter: {
    icon: "housing",
    tagsRu: ["Жильё", "Подбор", "Заселение"],
    tagsEn: ["Housing", "Selection", "Move-in"],
    toneClass: "border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-100",
  },
  "after-support": {
    icon: "support",
    tagsRu: ["Адаптация", "Связь", "Поддержка"],
    tagsEn: ["Adaptation", "Contact", "Support"],
    toneClass: "border-cyan-300/20 bg-cyan-400/10 text-cyan-100",
  },
};

export function getServiceVisual(slug: string, lang: Lang) {
  const visual = VISUALS_BY_SLUG[slug] || DEFAULT_VISUAL;

  return {
    icon: visual.icon,
    tags: lang === "ru" ? visual.tagsRu : visual.tagsEn,
    toneClass: visual.toneClass,
  };
}
