import { prisma } from "@/lib/prisma";
import { Field, Input, Button } from "@/components/admin/Form";
import { upsertSettings } from "../actions";
export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function SettingsPage() {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Настройки сайта</h1>

      <form action={upsertSettings} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Название бренда"><Input name="brandName" defaultValue={s?.brandName || ""} /></Field>
          <Field label="Email в подвале"><Input name="footerEmail" defaultValue={s?.footerEmail || ""} /></Field>
          <Field label="Телефон в подвале"><Input name="footerPhone" defaultValue={s?.footerPhone || ""} /></Field>
          <Field label="Адрес (RU)"><Input name="footerAddressRu" defaultValue={s?.footerAddressRu || ""} /></Field>
          <Field label="Адрес (EN)"><Input name="footerAddressEn" defaultValue={s?.footerAddressEn || ""} /></Field>
          <Field label="WhatsApp"><Input name="socialsWhatsapp" defaultValue={s?.socialsWhatsapp || ""} /></Field>
          <Field label="Telegram"><Input name="socialsTelegram" defaultValue={s?.socialsTelegram || ""} /></Field>
          <Field label="Instagram"><Input name="socialsInstagram" defaultValue={s?.socialsInstagram || ""} /></Field>
        </div>

        <div className="mt-6 text-sm font-semibold">Default meta (fallbacks)</div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Meta title (RU)"><Input name="defaultMetaTitleRu" defaultValue={s?.defaultMetaTitleRu || ""} /></Field>
          <Field label="Meta title (EN)"><Input name="defaultMetaTitleEn" defaultValue={s?.defaultMetaTitleEn || ""} /></Field>
          <Field label="Meta description (RU)"><Input name="defaultMetaDescriptionRu" defaultValue={s?.defaultMetaDescriptionRu || ""} /></Field>
          <Field label="Meta description (EN)"><Input name="defaultMetaDescriptionEn" defaultValue={s?.defaultMetaDescriptionEn || ""} /></Field>
        </div>

        <div className="mt-6 text-sm font-semibold">Юридическая информация</div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Название компании"><Input name="legalCompanyName" defaultValue={s?.legalCompanyName || ""} /></Field>
          <Field label="Регистрационный номер"><Input name="legalCompanyNumber" defaultValue={s?.legalCompanyNumber || ""} /></Field>
          <Field label="Юридический адрес"><Input name="legalRegisteredOffice" defaultValue={s?.legalRegisteredOffice || ""} /></Field>
          <Field label="Статус"><Input name="legalStatus" defaultValue={s?.legalStatus || ""} /></Field>
          <Field label="Дата регистрации"><Input name="legalIncorporated" defaultValue={s?.legalIncorporated || ""} /></Field>
        </div>

        <div className="pt-3">
          <Button type="submit">Сохранить</Button>
        </div>
      </form>
    </div>
  );
}