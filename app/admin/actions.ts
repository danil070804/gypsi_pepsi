"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function parseJSON(input: string) {
  try {
    return JSON.parse(input);
  } catch {
    throw new Error("Invalid JSON");
  }
}

export async function upsertSettings(formData: FormData) {
  const data = {
    brandName: String(formData.get("brandName") || ""),
    footerEmail: String(formData.get("footerEmail") || "") || null,
    footerPhone: String(formData.get("footerPhone") || "") || null,
    footerAddressRu: String(formData.get("footerAddressRu") || "") || null,
    footerAddressEn: String(formData.get("footerAddressEn") || "") || null,
    socialsWhatsapp: String(formData.get("socialsWhatsapp") || "") || null,
    socialsTelegram: String(formData.get("socialsTelegram") || "") || null,
    socialsInstagram: String(formData.get("socialsInstagram") || "") || null,

    legalCompanyName: String(formData.get("legalCompanyName") || ""),
    legalCompanyNumber: String(formData.get("legalCompanyNumber") || ""),
    legalRegisteredOffice: String(formData.get("legalRegisteredOffice") || ""),
    legalStatus: String(formData.get("legalStatus") || ""),
    legalIncorporated: String(formData.get("legalIncorporated") || ""),
  };

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/ru");
  revalidatePath("/en");
}

export async function createManager(formData: FormData) {
  await prisma.manager.create({
    data: {
      nameRu: String(formData.get("nameRu") || ""),
      nameEn: String(formData.get("nameEn") || ""),
      roleRu: String(formData.get("roleRu") || "") || null,
      roleEn: String(formData.get("roleEn") || "") || null,
      photoUrl: String(formData.get("photoUrl") || "") || null,
      whatsapp: String(formData.get("whatsapp") || "") || null,
      telegram: String(formData.get("telegram") || "") || null,
      instagram: String(formData.get("instagram") || "") || null,
      email: String(formData.get("email") || "") || null,
      isActive: formData.get("isActive") === "on",
      sortOrder: Number(formData.get("sortOrder") || 0),
    },
  });

  revalidatePath("/admin/managers");
  revalidatePath("/ru/contact");
  revalidatePath("/en/contact");
}

export async function updateManager(id: string, formData: FormData) {
  await prisma.manager.update({
    where: { id },
    data: {
      nameRu: String(formData.get("nameRu") || ""),
      nameEn: String(formData.get("nameEn") || ""),
      roleRu: String(formData.get("roleRu") || "") || null,
      roleEn: String(formData.get("roleEn") || "") || null,
      photoUrl: String(formData.get("photoUrl") || "") || null,
      whatsapp: String(formData.get("whatsapp") || "") || null,
      telegram: String(formData.get("telegram") || "") || null,
      instagram: String(formData.get("instagram") || "") || null,
      email: String(formData.get("email") || "") || null,
      isActive: formData.get("isActive") === "on",
      sortOrder: Number(formData.get("sortOrder") || 0),
    },
  });

  revalidatePath("/admin/managers");
  revalidatePath("/ru/contact");
  revalidatePath("/en/contact");
}

export async function deleteManager(id: string) {
  await prisma.manager.delete({ where: { id } });
  revalidatePath("/admin/managers");
  revalidatePath("/ru/contact");
  revalidatePath("/en/contact");
}

export async function upsertPage(key: string, formData: FormData) {
  const titleRu = String(formData.get("titleRu") || "");
  const titleEn = String(formData.get("titleEn") || "");
  const blocksJson = parseJSON(String(formData.get("blocksJson") || "{}"));
  const metaTitleRu = String(formData.get("metaTitleRu") || "") || null;
  const metaTitleEn = String(formData.get("metaTitleEn") || "") || null;
  const metaDescRu = String(formData.get("metaDescRu") || "") || null;
  const metaDescEn = String(formData.get("metaDescEn") || "") || null;
  const ogImageUrl = String(formData.get("ogImageUrl") || "") || null;
  const isPublished = formData.get("isPublished") === "on";

  await prisma.page.upsert({
    where: { key },
    update: { titleRu, titleEn, blocksJson, metaTitleRu, metaTitleEn, metaDescRu, metaDescEn, ogImageUrl, isPublished },
    create: { key, titleRu, titleEn, blocksJson, metaTitleRu, metaTitleEn, metaDescRu, metaDescEn, ogImageUrl, isPublished },
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/ru/${key === "home" ? "" : key}`);
  revalidatePath(`/en/${key === "home" ? "" : key}`);
}

export async function updateService(id: string, formData: FormData) {
  const data = {
    slug: String(formData.get("slug") || ""),
    titleRu: String(formData.get("titleRu") || ""),
    titleEn: String(formData.get("titleEn") || ""),
    excerptRu: String(formData.get("excerptRu") || ""),
    excerptEn: String(formData.get("excerptEn") || ""),
    contentRu: (parseJSON(String(formData.get("contentRu") || "{}"))?.ru ?? []),
    contentEn: (parseJSON(String(formData.get("contentEn") || "{}"))?.en ?? []),
    metaTitleRu: String(formData.get("metaTitleRu") || "") || null,
    metaTitleEn: String(formData.get("metaTitleEn") || "") || null,
    metaDescRu: String(formData.get("metaDescRu") || "") || null,
    metaDescEn: String(formData.get("metaDescEn") || "") || null,
    ogImageUrl: String(formData.get("ogImageUrl") || "") || null,
    isPublished: formData.get("isPublished") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  await prisma.service.update({ where: { id }, data });
  revalidatePath("/admin/services");
  revalidatePath(`/ru/services/${data.slug}`);
  revalidatePath(`/en/services/${data.slug}`);
  revalidatePath("/ru/services");
  revalidatePath("/en/services");
}

export async function updateFAQ(id: string, formData: FormData) {
  await prisma.fAQ.update({
    where: { id },
    data: {
      questionRu: String(formData.get("questionRu") || ""),
      questionEn: String(formData.get("questionEn") || ""),
      answerRu: String(formData.get("answerRu") || ""),
      answerEn: String(formData.get("answerEn") || ""),
      isPublished: formData.get("isPublished") === "on",
      sortOrder: Number(formData.get("sortOrder") || 0),
    },
  });
  revalidatePath("/admin/faq");
  revalidatePath("/ru");
  revalidatePath("/en");
}

export async function createFAQ(formData: FormData) {
  await prisma.fAQ.create({
    data: {
      questionRu: String(formData.get("questionRu") || ""),
      questionEn: String(formData.get("questionEn") || ""),
      answerRu: String(formData.get("answerRu") || ""),
      answerEn: String(formData.get("answerEn") || ""),
      isPublished: formData.get("isPublished") === "on",
      sortOrder: Number(formData.get("sortOrder") || 0),
    },
  });
  revalidatePath("/admin/faq");
  revalidatePath("/ru");
  revalidatePath("/en");
}

export async function deleteFAQ(id: string) {
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath("/admin/faq");
  revalidatePath("/ru");
  revalidatePath("/en");
}

export async function updateReview(id: string, formData: FormData) {
  await prisma.review.update({
    where: { id },
    data: {
      authorName: String(formData.get("authorName") || ""),
      textRu: String(formData.get("textRu") || ""),
      textEn: String(formData.get("textEn") || ""),
      rating: formData.get("rating") ? Number(formData.get("rating")) : null,
      photoUrl: String(formData.get("photoUrl") || "") || null,
      isPublished: formData.get("isPublished") === "on",
      sortOrder: Number(formData.get("sortOrder") || 0),
    },
  });
  revalidatePath("/admin/reviews");
  revalidatePath("/ru");
  revalidatePath("/en");
}

export async function createReview(formData: FormData) {
  await prisma.review.create({
    data: {
      authorName: String(formData.get("authorName") || ""),
      textRu: String(formData.get("textRu") || ""),
      textEn: String(formData.get("textEn") || ""),
      rating: formData.get("rating") ? Number(formData.get("rating")) : null,
      photoUrl: String(formData.get("photoUrl") || "") || null,
      isPublished: formData.get("isPublished") === "on",
      sortOrder: Number(formData.get("sortOrder") || 0),
    },
  });
  revalidatePath("/admin/reviews");
  revalidatePath("/ru");
  revalidatePath("/en");
}

export async function deleteReview(id: string) {
  await prisma.review.delete({ where: { id } });
  revalidatePath("/admin/reviews");
  revalidatePath("/ru");
  revalidatePath("/en");
}

export async function upsertBlogPost(id: string | null, formData: FormData) {
  const data = {
    slugRu: String(formData.get("slugRu") || ""),
    slugEn: String(formData.get("slugEn") || ""),
    titleRu: String(formData.get("titleRu") || ""),
    titleEn: String(formData.get("titleEn") || ""),
    excerptRu: String(formData.get("excerptRu") || ""),
    excerptEn: String(formData.get("excerptEn") || ""),
    contentRu: (parseJSON(String(formData.get("contentRu") || "{}"))?.ru ?? []),
    contentEn: (parseJSON(String(formData.get("contentEn") || "{}"))?.en ?? []),
    coverImageUrl: String(formData.get("coverImageUrl") || "") || null,
    publishedAt: formData.get("publishedAt") ? new Date(String(formData.get("publishedAt"))) : null,
    isPublished: formData.get("isPublished") === "on",
    metaTitleRu: String(formData.get("metaTitleRu") || "") || null,
    metaTitleEn: String(formData.get("metaTitleEn") || "") || null,
    metaDescRu: String(formData.get("metaDescRu") || "") || null,
    metaDescEn: String(formData.get("metaDescEn") || "") || null,
    ogImageUrl: String(formData.get("ogImageUrl") || "") || null,
  };

  if (id) {
    await prisma.blogPost.update({ where: { id }, data });
  } else {
    await prisma.blogPost.create({ data });
  }

  revalidatePath("/admin/blog");
  revalidatePath("/ru/blog");
  revalidatePath("/en/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/ru/blog");
  revalidatePath("/en/blog");
}
