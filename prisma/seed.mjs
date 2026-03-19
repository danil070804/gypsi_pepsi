import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readContentSnapshot } from "./content-snapshot.mjs";

const prisma = new PrismaClient();

function asNullableString(value) {
  return value ? String(value) : null;
}

function asPublishedAt(value) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

async function main() {
  const content = await readContentSnapshot();
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
      brandName: content.siteSettings.brandName,
      footerEmail: asNullableString(content.siteSettings.footerEmail),
      footerPhone: asNullableString(content.siteSettings.footerPhone),
      footerAddressRu: asNullableString(content.siteSettings.footerAddressRu),
      footerAddressEn: asNullableString(content.siteSettings.footerAddressEn),
      socialsWhatsapp: asNullableString(content.siteSettings.socialsWhatsapp),
      socialsTelegram: asNullableString(content.siteSettings.socialsTelegram),
      socialsInstagram: asNullableString(content.siteSettings.socialsInstagram),
      legalCompanyName: content.siteSettings.legalCompanyName,
      legalCompanyNameRu: asNullableString(content.siteSettings.legalCompanyNameRu),
      legalCompanyNameEn: asNullableString(content.siteSettings.legalCompanyNameEn),
      legalCompanyNumber: content.siteSettings.legalCompanyNumber,
      legalRegisteredOffice: content.siteSettings.legalRegisteredOffice,
      legalRegisteredOfficeRu: asNullableString(content.siteSettings.legalRegisteredOfficeRu),
      legalRegisteredOfficeEn: asNullableString(content.siteSettings.legalRegisteredOfficeEn),
      legalStatus: content.siteSettings.legalStatus,
      legalIncorporated: content.siteSettings.legalIncorporated,
      defaultMetaTitleRu: asNullableString(content.siteSettings.defaultMetaTitleRu),
      defaultMetaTitleEn: asNullableString(content.siteSettings.defaultMetaTitleEn),
      defaultMetaDescriptionRu: asNullableString(content.siteSettings.defaultMetaDescriptionRu),
      defaultMetaDescriptionEn: asNullableString(content.siteSettings.defaultMetaDescriptionEn),
    },
  });

  for (const page of content.pages) {
    await prisma.page.upsert({
      where: { key: page.key },
      update: {},
      create: {
        key: page.key,
        titleRu: page.titleRu,
        titleEn: page.titleEn,
        blocksJson: page.blocksJson,
        metaTitleRu: asNullableString(page.metaTitleRu),
        metaTitleEn: asNullableString(page.metaTitleEn),
        metaDescRu: asNullableString(page.metaDescRu),
        metaDescEn: asNullableString(page.metaDescEn),
        ogImageUrl: asNullableString(page.ogImageUrl),
        isPublished: page.isPublished ?? true,
      },
    });
  }

  for (const service of content.services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        slug: service.slug,
        titleRu: service.titleRu,
        titleEn: service.titleEn,
        excerptRu: service.excerptRu,
        excerptEn: service.excerptEn,
        contentRu: service.contentRu,
        contentEn: service.contentEn,
        metaTitleRu: asNullableString(service.metaTitleRu),
        metaTitleEn: asNullableString(service.metaTitleEn),
        metaDescRu: asNullableString(service.metaDescRu),
        metaDescEn: asNullableString(service.metaDescEn),
        ogImageUrl: asNullableString(service.ogImageUrl),
        isPublished: service.isPublished ?? true,
        sortOrder: Number(service.sortOrder || 0),
      },
    });
  }

  if ((await prisma.manager.count()) === 0 && content.managers.length > 0) {
    await prisma.manager.createMany({
      data: content.managers.map((manager, index) => ({
        id: asNullableString(manager.id) || undefined,
        nameRu: manager.nameRu,
        nameEn: manager.nameEn,
        roleRu: asNullableString(manager.roleRu),
        roleEn: asNullableString(manager.roleEn),
        photoUrl: asNullableString(manager.photoUrl),
        whatsapp: asNullableString(manager.whatsapp),
        telegram: asNullableString(manager.telegram),
        instagram: asNullableString(manager.instagram),
        email: asNullableString(manager.email),
        isActive: manager.isActive ?? true,
        sortOrder: Number(manager.sortOrder ?? index),
      })),
    });
  }

  if ((await prisma.fAQ.count()) === 0 && content.faqs.length > 0) {
    await prisma.fAQ.createMany({
      data: content.faqs.map((faq, index) => ({
        id: asNullableString(faq.id) || undefined,
        questionRu: faq.questionRu,
        questionEn: faq.questionEn,
        answerRu: faq.answerRu,
        answerEn: faq.answerEn,
        isPublished: faq.isPublished ?? true,
        sortOrder: Number(faq.sortOrder ?? index),
      })),
    });
  }

  if ((await prisma.review.count()) === 0 && content.reviews.length > 0) {
    await prisma.review.createMany({
      data: content.reviews.map((review, index) => ({
        id: asNullableString(review.id) || undefined,
        authorName: review.authorName,
        textRu: review.textRu,
        textEn: review.textEn,
        rating: review.rating ? Number(review.rating) : null,
        photoUrl: asNullableString(review.photoUrl),
        isPublished: review.isPublished ?? true,
        sortOrder: Number(review.sortOrder ?? index),
      })),
    });
  }

  if ((await prisma.blogPost.count()) === 0 && content.blogPosts.length > 0) {
    await prisma.blogPost.createMany({
      data: content.blogPosts.map((post) => ({
        slugRu: post.slugRu,
        slugEn: post.slugEn,
        titleRu: post.titleRu,
        titleEn: post.titleEn,
        excerptRu: post.excerptRu,
        excerptEn: post.excerptEn,
        contentRu: post.contentRu,
        contentEn: post.contentEn,
        coverImageUrl: asNullableString(post.coverImageUrl),
        publishedAt: asPublishedAt(post.publishedAt),
        isPublished: post.isPublished ?? false,
        metaTitleRu: asNullableString(post.metaTitleRu),
        metaTitleEn: asNullableString(post.metaTitleEn),
        metaDescRu: asNullableString(post.metaDescRu),
        metaDescEn: asNullableString(post.metaDescEn),
        ogImageUrl: asNullableString(post.ogImageUrl),
      })),
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
