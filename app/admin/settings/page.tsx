import { prisma } from "@/lib/prisma";
import { Field, Input, Button } from "@/components/admin/Form";
import { upsertSettings } from "../actions";

export default async function SettingsPage() {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Site settings</h1>

      <form action={upsertSettings} className="space-y-4 rounded-2xl border bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Brand name"><Input name="brandName" defaultValue={s?.brandName || ""} /></Field>
          <Field label="Footer email"><Input name="footerEmail" defaultValue={s?.footerEmail || ""} /></Field>
          <Field label="Footer phone"><Input name="footerPhone" defaultValue={s?.footerPhone || ""} /></Field>
          <Field label="Footer address (RU)"><Input name="footerAddressRu" defaultValue={s?.footerAddressRu || ""} /></Field>
          <Field label="Footer address (EN)"><Input name="footerAddressEn" defaultValue={s?.footerAddressEn || ""} /></Field>
          <Field label="Social WhatsApp"><Input name="socialsWhatsapp" defaultValue={s?.socialsWhatsapp || ""} /></Field>
          <Field label="Social Telegram"><Input name="socialsTelegram" defaultValue={s?.socialsTelegram || ""} /></Field>
          <Field label="Social Instagram"><Input name="socialsInstagram" defaultValue={s?.socialsInstagram || ""} /></Field>
        </div>

        <div className="mt-6 text-sm font-semibold">Legal</div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Company name"><Input name="legalCompanyName" defaultValue={s?.legalCompanyName || ""} /></Field>
          <Field label="Company number"><Input name="legalCompanyNumber" defaultValue={s?.legalCompanyNumber || ""} /></Field>
          <Field label="Registered office"><Input name="legalRegisteredOffice" defaultValue={s?.legalRegisteredOffice || ""} /></Field>
          <Field label="Status"><Input name="legalStatus" defaultValue={s?.legalStatus || ""} /></Field>
          <Field label="Incorporated"><Input name="legalIncorporated" defaultValue={s?.legalIncorporated || ""} /></Field>
        </div>

        <div className="pt-3">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
