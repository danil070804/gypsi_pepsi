-- Migration: add localized legal fields to SiteSettings
BEGIN;

ALTER TABLE "SiteSettings"
  ADD COLUMN "legalCompanyNameRu" TEXT,
  ADD COLUMN "legalCompanyNameEn" TEXT,
  ADD COLUMN "legalRegisteredOfficeRu" TEXT,
  ADD COLUMN "legalRegisteredOfficeEn" TEXT;

COMMIT;
