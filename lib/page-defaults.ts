export const PAGE_KEYS = ["home", "about", "privacy", "cookies", "reviews"] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

type PageDefaults = {
  titleRu: string;
  titleEn: string;
  blocksJson: {
    ru: any[];
    en: any[];
  };
  isPublished: boolean;
};

function blocksHome(lang: "ru" | "en") {
  return [
    {
      id: `home-hero-${lang}`,
      type: "hero",
      title:
        lang === "ru"
          ? "Трудоустройство в UK — с агентством, которое ведёт до результата"
          : "UK Employment — guided end-to-end by a trusted agency",
      subtitle:
        lang === "ru"
          ? "Подбор вакансий, документы, визовая поддержка и сопровождение."
          : "Vacancies, paperwork, visa guidance and ongoing support.",
      ctas: [
        { label: lang === "ru" ? "Услуги" : "Services", href: `/${lang}/services` },
        { label: lang === "ru" ? "Консультация" : "Consultation", href: `/${lang}/contact` },
      ],
    },
    {
      id: `home-steps-${lang}`,
      type: "steps",
      title: lang === "ru" ? "3 шага к работе" : "3 steps to your job",
      items: [
        {
          title: lang === "ru" ? "Заявка" : "Request",
          text: lang === "ru" ? "Оставляете заявку и выбираете менеджера." : "Send a request and choose a manager.",
        },
        {
          title: lang === "ru" ? "Подготовка" : "Preparation",
          text: lang === "ru" ? "Документы, консультации, план действий." : "Docs, guidance, clear plan.",
        },
        {
          title: lang === "ru" ? "Выход на работу" : "Start",
          text: lang === "ru" ? "Сопровождаем до выхода и дальше." : "We support you until start and after.",
        },
      ],
    },
    {
      id: `home-cta-${lang}`,
      type: "cta",
      title: lang === "ru" ? "Выберите менеджера и получите консультацию" : "Choose a manager and get a consultation",
      buttonLabel: lang === "ru" ? "Выбрать менеджера" : "Choose manager",
      href: `/${lang}/contact`,
    },
  ];
}

const PAGE_DEFAULTS: Record<PageKey, PageDefaults> = {
  home: {
    titleRu: "Главная",
    titleEn: "Home",
    blocksJson: {
      ru: blocksHome("ru"),
      en: blocksHome("en"),
    },
    isPublished: true,
  },
  about: {
    titleRu: "О нас",
    titleEn: "About",
    blocksJson: {
      ru: [
        {
          id: "about-ru",
          type: "richText",
          title: "О компании",
          html: "<p>GYPSEY EMPLOYMENT AGENCY LTD — агентство трудоустройства в Великобритании. Мы сопровождаем соискателей на каждом шаге.</p>",
        },
        { id: "about-legal-ru", type: "legal", html: "<p></p>" },
      ],
      en: [
        {
          id: "about-en",
          type: "richText",
          title: "About the company",
          html: "<p>GYPSEY EMPLOYMENT AGENCY LTD is a UK employment agency. We support candidates at every step.</p>",
        },
        { id: "about-legal-en", type: "legal", html: "<p></p>" },
      ],
    },
    isPublished: true,
  },
  privacy: {
    titleRu: "Политика конфиденциальности",
    titleEn: "Privacy Policy",
    blocksJson: {
      ru: [
        {
          id: "privacy-ru",
          type: "richText",
          title: "Политика конфиденциальности",
          html: "<p>Текст политики заполняется через админку.</p>",
        },
      ],
      en: [
        {
          id: "privacy-en",
          type: "richText",
          title: "Privacy Policy",
          html: "<p>Policy text is editable in the admin panel.</p>",
        },
      ],
    },
    isPublished: true,
  },
  cookies: {
    titleRu: "Cookies Policy",
    titleEn: "Cookies Policy",
    blocksJson: {
      ru: [
        {
          id: "cookies-ru",
          type: "richText",
          title: "Cookies Policy",
          html: "<p>Текст политики заполняется через админку.</p>",
        },
      ],
      en: [
        {
          id: "cookies-en",
          type: "richText",
          title: "Cookies Policy",
          html: "<p>Policy text is editable in the admin panel.</p>",
        },
      ],
    },
    isPublished: true,
  },
  reviews: {
    titleRu: "Отзывы",
    titleEn: "Reviews",
    blocksJson: {
      ru: [
        {
          id: "reviews-hero-ru",
          type: "hero",
          title: "Отзывы, которые не стоят на месте",
          subtitle: "Мы собрали реальные впечатления клиентов в живую непрерывную ленту. Откройте карточку и прочитайте отзыв полностью.",
          ctas: [],
        },
      ],
      en: [
        {
          id: "reviews-hero-en",
          type: "hero",
          title: "Reviews that never stand still",
          subtitle: "We collected real client impressions into a continuous live ribbon. Open any card to read the full review.",
          ctas: [],
        },
      ],
    },
    isPublished: true,
  },
};

export function getDefaultPageContent(key: string) {
  if (!PAGE_KEYS.includes(key as PageKey)) return null;
  return PAGE_DEFAULTS[key as PageKey];
}
