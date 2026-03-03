import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const services = [
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
      title: lang === "ru" ? "Трудоустройство в UK — с агентством, которое ведёт до результата" : "UK Employment — guided end-to-end by a trusted agency",
      subtitle: lang === "ru" ? "Подбор вакансий, документы, визовая поддержка и сопровождение." : "Vacancies, paperwork, visa guidance and ongoing support.",
      ctas: [
        { label: lang === "ru" ? "Услуги" : "Services", href: `/${lang}/services` },
        { label: lang === "ru" ? "Консультация" : "Consultation", href: `/${lang}/contact` },
      ],
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

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-me-strong";

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({ data: { email: adminEmail, passwordHash, role: "ADMIN" } });
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      brandName: "GYPSEY EMPLOYMENT AGENCY",
      legalCompanyName: "GYPSEY EMPLOYMENT AGENCY LTD",
      legalCompanyNumber: "04500667",
      legalRegisteredOffice: "32 The Crescent, Spalding, Lincolnshire, PE11 1AF",
      legalStatus: "Active",
      legalIncorporated: "1 August 2002",
      footerAddressRu: "32 The Crescent, Spalding, Lincolnshire, PE11 1AF",
      footerAddressEn: "32 The Crescent, Spalding, Lincolnshire, PE11 1AF",
    },
  });

  // Pages
  const pages = [
    { key: "home", titleRu: "Главная", titleEn: "Home", blocksJson: { ru: blocksHome("ru"), en: blocksHome("en") } },
    {
      key: "about",
      titleRu: "О нас",
      titleEn: "About",
      blocksJson: {
        ru: [
          { type: "richText", title: "О компании", text: "GYPSEY EMPLOYMENT AGENCY LTD — агентство трудоустройства в Великобритании. Мы сопровождаем соискателей на каждом шаге." },
          { type: "legal" }
        ],
        en: [
          { type: "richText", title: "About the company", text: "GYPSEY EMPLOYMENT AGENCY LTD is a UK employment agency. We support candidates at every step." },
          { type: "legal" }
        ],
      },
    },
    {
      key: "privacy",
      titleRu: "Политика конфиденциальности",
      titleEn: "Privacy Policy",
      blocksJson: {
        ru: [{ type: "richText", title: "Privacy Policy", text: "Текст политики заполняется через админку." }],
        en: [{ type: "richText", title: "Privacy Policy", text: "Policy text is editable in the admin panel." }],
      },
    },
    {
      key: "cookies",
      titleRu: "Cookies Policy",
      titleEn: "Cookies Policy",
      blocksJson: {
        ru: [{ type: "richText", title: "Cookies Policy", text: "Текст политики заполняется через админку." }],
        en: [{ type: "richText", title: "Cookies Policy", text: "Policy text is editable in the admin panel." }],
      },
    },
  ];

  for (const p of pages) {
    await prisma.page.upsert({
      where: { key: p.key },
      update: {
        titleRu: p.titleRu,
        titleEn: p.titleEn,
        blocksJson: p.blocksJson,
        isPublished: true,
      },
      create: {
        key: p.key,
        titleRu: p.titleRu,
        titleEn: p.titleEn,
        blocksJson: p.blocksJson,
        isPublished: true,
      },
    });
  }

  // Services
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    const excerptRu = "Короткое описание услуги — редактируется в админке.";
    const excerptEn = "Short service description — editable in admin.";
    const contentRu = [
      { type: "richText", title: s.titleRu, text: "Контент услуги блоками. Можно вставлять CTA блоки где нужно." },
      { type: "cta", title: "Выбрать менеджера", buttonLabel: "Консультация", href: "/ru/contact" },
    ];
    const contentEn = [
      { type: "richText", title: s.titleEn, text: "Service content as blocks. You can insert CTA blocks as needed." },
      { type: "cta", title: "Choose a manager", buttonLabel: "Consultation", href: "/en/contact" },
    ];

    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        titleRu: s.titleRu,
        titleEn: s.titleEn,
        excerptRu,
        excerptEn,
        contentRu,
        contentEn,
        isPublished: true,
        sortOrder: i,
      },
      create: {
        slug: s.slug,
        titleRu: s.titleRu,
        titleEn: s.titleEn,
        excerptRu,
        excerptEn,
        contentRu,
        contentEn,
        isPublished: true,
        sortOrder: i,
      },
    });
  }

  // Sample managers
  const mgrCount = await prisma.manager.count();
  if (mgrCount === 0) {
    await prisma.manager.createMany({
      data: [
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
    });
  }

  // FAQ + Reviews + Blog sample
  if ((await prisma.fAQ.count()) === 0) {
    await prisma.fAQ.createMany({
      data: [
        {
          questionRu: "Сколько времени занимает процесс?",
          questionEn: "How long does the process take?",
          answerRu: "Зависит от ситуации и документов. Обычно от нескольких дней до нескольких недель.",
          answerEn: "It depends on your situation and paperwork. Usually from a few days to a few weeks.",
          isPublished: true,
          sortOrder: 0,
        },
      ],
    });
  }

  if ((await prisma.review.count()) === 0) {
    await prisma.review.createMany({
      data: [
        {
          authorName: "Client A",
          textRu: "Спасибо! Всё было понятно и быстро.",
          textEn: "Thank you! Everything was clear and fast.",
          rating: 5,
          isPublished: true,
          sortOrder: 0,
        },
      ],
    });
  }

  if ((await prisma.blogPost.count()) === 0) {
    await prisma.blogPost.create({
      data: {
        slugRu: "kak-nachat",
        slugEn: "how-to-start",
        titleRu: "Как начать поиск работы в UK",
        titleEn: "How to start your UK job search",
        excerptRu: "Короткое введение — редактируется в админке.",
        excerptEn: "Short intro — editable in admin.",
        contentRu: [{ type: "richText", title: "Статья", text: "Контент статьи — блоками. Можно расширять." }],
        contentEn: [{ type: "richText", title: "Article", text: "Article content as blocks. You can expand it." }],
        isPublished: true,
        publishedAt: new Date(),
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
