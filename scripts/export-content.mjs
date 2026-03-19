import { writeFile } from "node:fs/promises";
import { PrismaClient } from "@prisma/client";
import { CONTENT_SNAPSHOT_PATH } from "../prisma/content-snapshot.mjs";

const prisma = new PrismaClient();

function sortByOrderThenCreatedAt(a, b) {
  return (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

async function main() {
  const [siteSettings, pages, services, managers, faqs, reviews, blogPosts] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
    prisma.page.findMany({ orderBy: { key: "asc" } }),
    prisma.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
    prisma.manager.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
    prisma.fAQ.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
    prisma.review.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
    prisma.blogPost.findMany({ orderBy: [{ publishedAt: "desc" }, { createdAt: "asc" }] }),
  ]);

  const snapshot = {
    siteSettings: siteSettings
      ? {
          brandName: siteSettings.brandName,
          footerEmail: siteSettings.footerEmail,
          footerPhone: siteSettings.footerPhone,
          footerAddressRu: siteSettings.footerAddressRu,
          footerAddressEn: siteSettings.footerAddressEn,
          socialsWhatsapp: siteSettings.socialsWhatsapp,
          socialsTelegram: siteSettings.socialsTelegram,
          socialsInstagram: siteSettings.socialsInstagram,
          legalCompanyName: siteSettings.legalCompanyName,
          legalCompanyNameRu: siteSettings.legalCompanyNameRu,
          legalCompanyNameEn: siteSettings.legalCompanyNameEn,
          legalCompanyNumber: siteSettings.legalCompanyNumber,
          legalRegisteredOffice: siteSettings.legalRegisteredOffice,
          legalRegisteredOfficeRu: siteSettings.legalRegisteredOfficeRu,
          legalRegisteredOfficeEn: siteSettings.legalRegisteredOfficeEn,
          legalStatus: siteSettings.legalStatus,
          legalIncorporated: siteSettings.legalIncorporated,
          defaultMetaTitleRu: siteSettings.defaultMetaTitleRu,
          defaultMetaTitleEn: siteSettings.defaultMetaTitleEn,
          defaultMetaDescriptionRu: siteSettings.defaultMetaDescriptionRu,
          defaultMetaDescriptionEn: siteSettings.defaultMetaDescriptionEn,
        }
      : null,
    pages: pages.map((page) => ({
      key: page.key,
      titleRu: page.titleRu,
      titleEn: page.titleEn,
      blocksJson: page.blocksJson,
      metaTitleRu: page.metaTitleRu,
      metaTitleEn: page.metaTitleEn,
      metaDescRu: page.metaDescRu,
      metaDescEn: page.metaDescEn,
      ogImageUrl: page.ogImageUrl,
      isPublished: page.isPublished,
    })),
    services: services.map((service) => ({
      slug: service.slug,
      titleRu: service.titleRu,
      titleEn: service.titleEn,
      excerptRu: service.excerptRu,
      excerptEn: service.excerptEn,
      contentRu: service.contentRu,
      contentEn: service.contentEn,
      metaTitleRu: service.metaTitleRu,
      metaTitleEn: service.metaTitleEn,
      metaDescRu: service.metaDescRu,
      metaDescEn: service.metaDescEn,
      ogImageUrl: service.ogImageUrl,
      isPublished: service.isPublished,
      sortOrder: service.sortOrder,
    })),
    managers: managers.sort(sortByOrderThenCreatedAt).map((manager) => ({
      id: manager.id,
      nameRu: manager.nameRu,
      nameEn: manager.nameEn,
      roleRu: manager.roleRu,
      roleEn: manager.roleEn,
      photoUrl: manager.photoUrl,
      whatsapp: manager.whatsapp,
      telegram: manager.telegram,
      instagram: manager.instagram,
      email: manager.email,
      isActive: manager.isActive,
      sortOrder: manager.sortOrder,
    })),
    faqs: faqs.sort(sortByOrderThenCreatedAt).map((faq) => ({
      id: faq.id,
      questionRu: faq.questionRu,
      questionEn: faq.questionEn,
      answerRu: faq.answerRu,
      answerEn: faq.answerEn,
      isPublished: faq.isPublished,
      sortOrder: faq.sortOrder,
    })),
    reviews: reviews.sort(sortByOrderThenCreatedAt).map((review) => ({
      id: review.id,
      authorName: review.authorName,
      textRu: review.textRu,
      textEn: review.textEn,
      rating: review.rating,
      photoUrl: review.photoUrl,
      isPublished: review.isPublished,
      sortOrder: review.sortOrder,
    })),
    blogPosts: blogPosts.map((post) => ({
      slugRu: post.slugRu,
      slugEn: post.slugEn,
      titleRu: post.titleRu,
      titleEn: post.titleEn,
      excerptRu: post.excerptRu,
      excerptEn: post.excerptEn,
      contentRu: post.contentRu,
      contentEn: post.contentEn,
      coverImageUrl: post.coverImageUrl,
      publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
      isPublished: post.isPublished,
      metaTitleRu: post.metaTitleRu,
      metaTitleEn: post.metaTitleEn,
      metaDescRu: post.metaDescRu,
      metaDescEn: post.metaDescEn,
      ogImageUrl: post.ogImageUrl,
    })),
  };

  await writeFile(CONTENT_SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(`Exported content snapshot to ${CONTENT_SNAPSHOT_PATH}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
