import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const prismaDir = path.dirname(fileURLToPath(import.meta.url));

export const CONTENT_SNAPSHOT_PATH = path.join(prismaDir, "content-snapshot.json");

const serviceSeeds = [
  { slug: "consult-info", titleRu: "Консультация и информация", titleEn: "Consultation & Information" },
  { slug: "documentation", titleRu: "Документы и оформление", titleEn: "Documentation" },
  { slug: "visa", titleRu: "Визы и легализация", titleEn: "Visa Support" },
  { slug: "transfer", titleRu: "Трансфер и сопровождение", titleEn: "Transfer" },
  { slug: "shelter", titleRu: "Жильё и размещение", titleEn: "Shelter" },
  { slug: "after-support", titleRu: "Поддержка после трудоустройства", titleEn: "After-support" },
];

function blocksHome(lang) {
  return [
    {
      type: "hero",
      eyebrow: lang === "ru" ? "Трудоустройство в UK" : "UK Employment",
      title: lang === "ru" ? "Трудоустройство в UK — с агентством, которое ведёт до результата" : "UK Employment — guided end-to-end by a trusted agency",
      subtitle: lang === "ru" ? "Подбор вакансий, документы, визовая поддержка и сопровождение." : "Vacancies, paperwork, visa guidance and ongoing support.",
      ctas: [
        { label: lang === "ru" ? "Услуги" : "Services", href: `/${lang}/services` },
        { label: lang === "ru" ? "Консультация" : "Consultation", href: `/${lang}/contact` },
      ],
      highlights: [
        { eyebrow: "UK", title: lang === "ru" ? "Поддержка" : "Support", href: `/${lang}/contact` },
        { eyebrow: lang === "ru" ? "Документы" : "Docs", title: lang === "ru" ? "Сопровождение" : "Guidance", href: `/${lang}/services/documentation` },
        { eyebrow: lang === "ru" ? "Работа" : "Jobs", title: lang === "ru" ? "Подбор" : "Matching", href: `/${lang}/services` },
      ],
      mediaEyebrow: "GYPSEY EMPLOYMENT AGENCY",
      mediaText:
        lang === "ru"
          ? "Подбор вакансий, документы и сопровождение."
          : "Jobs, documents, and ongoing guidance.",
      mediaImageUrl: "/images/hero.webp",
    },
    {
      type: "steps",
      title: lang === "ru" ? "3 шага к работе" : "3 steps to your job",
      items: [
        { title: lang === "ru" ? "Заявка" : "Request", text: lang === "ru" ? "Оставляете заявку и выбираете менеджера." : "Send a request and choose a manager." },
        { title: lang === "ru" ? "Подготовка" : "Preparation", text: lang === "ru" ? "Документы, консультации, план действий." : "Docs, guidance, clear plan." },
        { title: lang === "ru" ? "Выход на работу" : "Start", text: lang === "ru" ? "Сопровождаем до выхода и дальше." : "We support you until start and after." },
      ],
    },
    {
      type: "cta",
      title: lang === "ru" ? "Выберите менеджера и получите консультацию" : "Choose a manager and get a consultation",
      buttonLabel: lang === "ru" ? "Выбрать менеджера" : "Choose manager",
      href: `/${lang}/contact`,
    },
  ];
}

export function createDefaultContentSnapshot() {
  return {
    siteSettings: {
      brandName: "GYPSEY EMPLOYMENT AGENCY",
      legalCompanyName: "GYPSEY EMPLOYMENT AGENCY LTD",
      legalCompanyNameRu: "GYPSEY EMPLOYMENT AGENCY LTD",
      legalCompanyNameEn: "GYPSEY EMPLOYMENT AGENCY LTD",
      legalCompanyNumber: "04500667",
      legalRegisteredOffice: "32 The Crescent, Spalding, Lincolnshire, PE11 1AF",
      legalRegisteredOfficeRu: "32 The Crescent, Spalding, Lincolnshire, PE11 1AF",
      legalRegisteredOfficeEn: "32 The Crescent, Spalding, Lincolnshire, PE11 1AF",
      legalStatus: "Active",
      legalIncorporated: "1 August 2002",
      footerAddressRu: "32 The Crescent, Spalding, Lincolnshire, PE11 1AF",
      footerAddressEn: "32 The Crescent, Spalding, Lincolnshire, PE11 1AF",
      defaultMetaTitleRu: "",
      defaultMetaTitleEn: "",
      defaultMetaDescriptionRu: "",
      defaultMetaDescriptionEn: "",
    },
    pages: [
      { key: "home", titleRu: "Главная", titleEn: "Home", blocksJson: { ru: blocksHome("ru"), en: blocksHome("en") }, isPublished: true },
      {
        key: "about",
        titleRu: "О нас",
        titleEn: "About",
        blocksJson: {
          ru: [
            { type: "richText", title: "О компании", text: "GYPSEY EMPLOYMENT AGENCY LTD — агентство трудоустройства в Великобритании. Мы сопровождаем соискателей на каждом шаге." },
            { type: "legal" },
          ],
          en: [
            { type: "richText", title: "About the company", text: "GYPSEY EMPLOYMENT AGENCY LTD is a UK employment agency. We support candidates at every step." },
            { type: "legal" },
          ],
        },
        isPublished: true,
      },
      {
        key: "privacy",
        titleRu: "Политика конфиденциальности",
        titleEn: "Privacy Policy",
        blocksJson: {
          ru: [{ type: "richText", title: "Политика конфиденциальности", text: "Текст политики заполняется через админку." }],
          en: [{ type: "richText", title: "Privacy Policy", text: "Policy text is editable in the admin panel." }],
        },
        isPublished: true,
      },
      {
        key: "cookies",
        titleRu: "Cookies Policy",
        titleEn: "Cookies Policy",
        blocksJson: {
          ru: [{ type: "richText", title: "Cookies Policy", text: "Текст политики заполняется через админку." }],
          en: [{ type: "richText", title: "Cookies Policy", text: "Policy text is editable in the admin panel." }],
        },
        isPublished: true,
      },
      {
        key: "reviews",
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
    ],
    services: serviceSeeds.map((service, index) => ({
      slug: service.slug,
      titleRu: service.titleRu,
      titleEn: service.titleEn,
      excerptRu: "Короткое описание услуги — редактируется в админке.",
      excerptEn: "Short service description — editable in admin.",
      contentRu: [
        { type: "richText", title: service.titleRu, text: "Контент услуги блоками. Можно вставлять CTA блоки где нужно." },
        { type: "cta", title: "Выбрать менеджера", buttonLabel: "Консультация", href: "/ru/contact" },
      ],
      contentEn: [
        { type: "richText", title: service.titleEn, text: "Service content as blocks. You can insert CTA blocks as needed." },
        { type: "cta", title: "Choose a manager", buttonLabel: "Consultation", href: "/en/contact" },
      ],
      isPublished: true,
      sortOrder: index,
    })),
    managers: [
      {
        nameRu: "Анна",
        nameEn: "Anna",
        roleRu: "Менеджер",
        roleEn: "Manager",
        whatsapp: "+447000000001",
        telegram: "anna_support",
        instagram: "anna.agency",
        email: "anna@example.com",
        isActive: true,
        sortOrder: 0,
      },
      {
        nameRu: "Майкл",
        nameEn: "Michael",
        roleRu: "Консультант",
        roleEn: "Consultant",
        telegram: "michael_hr",
        email: "michael@example.com",
        isActive: true,
        sortOrder: 1,
      },
    ],
    faqs: [
      {
        questionRu: "Сколько времени занимает процесс?",
        questionEn: "How long does the process take?",
        answerRu: "Зависит от ситуации и документов. Обычно от нескольких дней до нескольких недель.",
        answerEn: "It depends on your situation and paperwork. Usually from a few days to a few weeks.",
        isPublished: true,
        sortOrder: 0,
      },
    ],
    reviews: [
      {
        authorName: "Client A",
        textRu: "Спасибо! Всё было понятно и быстро.",
        textEn: "Thank you! Everything was clear and fast.",
        rating: 5,
        isPublished: true,
        sortOrder: 0,
      },
    ],
    blogPosts: [
      {
        slugRu: "kak-nachat",
        slugEn: "how-to-start",
        titleRu: "Как начать поиск работы в UK",
        titleEn: "How to start your UK job search",
        excerptRu: "Короткое введение — редактируется в админке.",
        excerptEn: "Short intro — editable in admin.",
        contentRu: [{ type: "richText", title: "Статья", text: "Контент статьи — блоками. Можно расширять." }],
        contentEn: [{ type: "richText", title: "Article", text: "Article content as blocks. You can expand it." }],
        isPublished: true,
        publishedAt: new Date().toISOString(),
      },
    ],
  };
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function pickCollection(snapshot, key, fallback) {
  if (snapshot && hasOwn(snapshot, key) && Array.isArray(snapshot[key])) {
    return snapshot[key];
  }

  return fallback;
}

export async function readContentSnapshot() {
  const defaults = createDefaultContentSnapshot();

  try {
    const raw = await readFile(CONTENT_SNAPSHOT_PATH, "utf8");
    const parsed = JSON.parse(raw);

    return {
      siteSettings:
        parsed && typeof parsed.siteSettings === "object" && parsed.siteSettings
          ? { ...defaults.siteSettings, ...parsed.siteSettings }
          : defaults.siteSettings,
      pages: pickCollection(parsed, "pages", defaults.pages),
      services: pickCollection(parsed, "services", defaults.services),
      managers: pickCollection(parsed, "managers", defaults.managers),
      faqs: pickCollection(parsed, "faqs", defaults.faqs),
      reviews: pickCollection(parsed, "reviews", defaults.reviews),
      blogPosts: pickCollection(parsed, "blogPosts", defaults.blogPosts),
    };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return defaults;
    }

    throw error;
  }
}
