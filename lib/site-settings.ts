import { prisma } from "./prisma";

export type SiteSettingsSafe = {
  id: number;
  brandName: string;
  footerEmail: string | null;
  footerPhone: string | null;
  footerAddressRu: string | null;
  footerAddressEn: string | null;
  socialsWhatsapp: string | null;
  socialsTelegram: string | null;
  socialsInstagram: string | null;
  legalCompanyName: string;
  legalCompanyNameRu: string | null;
  legalCompanyNameEn: string | null;
  legalCompanyNumber: string;
  legalRegisteredOffice: string;
  legalRegisteredOfficeRu: string | null;
  legalRegisteredOfficeEn: string | null;
  legalStatus: string;
  legalIncorporated: string;
  defaultMetaTitleRu: string | null;
  defaultMetaTitleEn: string | null;
  defaultMetaDescriptionRu: string | null;
  defaultMetaDescriptionEn: string | null;
  createdAt: Date;
  updatedAt: Date;
};

function isMissingLegalLocaleColumnsError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as { code?: string; message?: string; meta?: { column?: string } };
  const column = String(e.meta?.column || "");
  const message = String(e.message || "");
  return e.code === "P2022" && (column.includes("legalCompanyNameRu") || message.includes("legalCompanyNameRu"));
}

export async function getSiteSettingsSafe(): Promise<SiteSettingsSafe | null> {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    return row as SiteSettingsSafe | null;
  } catch (err) {
    if (!isMissingLegalLocaleColumnsError(err)) throw err;

    const rows = await prisma.$queryRaw<
      Array<{
        id: number;
        brandName: string | null;
        footerEmail: string | null;
        footerPhone: string | null;
        footerAddressRu: string | null;
        footerAddressEn: string | null;
        socialsWhatsapp: string | null;
        socialsTelegram: string | null;
        socialsInstagram: string | null;
        legalCompanyName: string | null;
        legalCompanyNumber: string | null;
        legalRegisteredOffice: string | null;
        legalStatus: string | null;
        legalIncorporated: string | null;
        defaultMetaTitleRu: string | null;
        defaultMetaTitleEn: string | null;
        defaultMetaDescriptionRu: string | null;
        defaultMetaDescriptionEn: string | null;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`SELECT "id","brandName","footerEmail","footerPhone","footerAddressRu","footerAddressEn","socialsWhatsapp","socialsTelegram","socialsInstagram","legalCompanyName","legalCompanyNumber","legalRegisteredOffice","legalStatus","legalIncorporated","defaultMetaTitleRu","defaultMetaTitleEn","defaultMetaDescriptionRu","defaultMetaDescriptionEn","createdAt","updatedAt" FROM "SiteSettings" WHERE "id" = 1 LIMIT 1`;

    const row = rows[0];
    if (!row) return null;

    return {
      ...row,
      brandName: row.brandName || "GYPSEY EMPLOYMENT AGENCY",
      legalCompanyName: row.legalCompanyName || "GYPSEY EMPLOYMENT AGENCY LTD",
      legalCompanyNumber: row.legalCompanyNumber || "",
      legalRegisteredOffice: row.legalRegisteredOffice || "",
      legalStatus: row.legalStatus || "",
      legalIncorporated: row.legalIncorporated || "",
      legalCompanyNameRu: null,
      legalCompanyNameEn: null,
      legalRegisteredOfficeRu: null,
      legalRegisteredOfficeEn: null,
    } as SiteSettingsSafe;
  }
}

export async function upsertSiteSettingsSafe(data: {
  brandName: string;
  footerEmail: string | null;
  footerPhone: string | null;
  footerAddressRu: string | null;
  footerAddressEn: string | null;
  socialsWhatsapp: string | null;
  socialsTelegram: string | null;
  socialsInstagram: string | null;
  defaultMetaTitleRu: string | null;
  defaultMetaTitleEn: string | null;
  defaultMetaDescriptionRu: string | null;
  defaultMetaDescriptionEn: string | null;
  legalCompanyName: string;
  legalCompanyNameRu: string | null;
  legalCompanyNameEn: string | null;
  legalCompanyNumber: string;
  legalRegisteredOffice: string;
  legalRegisteredOfficeRu: string | null;
  legalRegisteredOfficeEn: string | null;
  legalStatus: string;
  legalIncorporated: string;
}) {
  try {
    await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    });
  } catch (err) {
    if (!isMissingLegalLocaleColumnsError(err)) throw err;

    const legacyData = {
      brandName: data.brandName,
      footerEmail: data.footerEmail,
      footerPhone: data.footerPhone,
      footerAddressRu: data.footerAddressRu,
      footerAddressEn: data.footerAddressEn,
      socialsWhatsapp: data.socialsWhatsapp,
      socialsTelegram: data.socialsTelegram,
      socialsInstagram: data.socialsInstagram,
      defaultMetaTitleRu: data.defaultMetaTitleRu,
      defaultMetaTitleEn: data.defaultMetaTitleEn,
      defaultMetaDescriptionRu: data.defaultMetaDescriptionRu,
      defaultMetaDescriptionEn: data.defaultMetaDescriptionEn,
      legalCompanyName: data.legalCompanyName,
      legalCompanyNumber: data.legalCompanyNumber,
      legalRegisteredOffice: data.legalRegisteredOffice,
      legalStatus: data.legalStatus,
      legalIncorporated: data.legalIncorporated,
    };

    await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: legacyData,
      create: { id: 1, ...legacyData },
    });
  }
}
