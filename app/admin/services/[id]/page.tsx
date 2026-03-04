import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { Field, Input, Button, Switch } from "@/components/admin/Form";
import UploadToInput from "@/components/admin/UploadToInput";
import { updateService } from "../../actions";
import BlocksEditorSingle from "@/components/admin/BlocksEditorSingle";
export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function EditService({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const s = await prisma.service.findUnique({ where: { id: id } });
  if (!s) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Редактировать услугу</h1>

      {saved === "1" && (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Изменения успешно сохранены.
        </div>
      )}

      <form
        action={async (fd) => {
          "use server";
          await updateService(id, fd);
          redirect(`/admin/services/${id}?saved=1`);
        }}
        className="space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Слаг"><Input name="slug" defaultValue={s.slug} /></Field>
          <Field label="Порядок сортировки"><Input name="sortOrder" type="number" defaultValue={s.sortOrder} /></Field>
          <Field label="Название (RU)"><Input name="titleRu" defaultValue={s.titleRu} /></Field>
          <Field label="Название (EN)"><Input name="titleEn" defaultValue={s.titleEn} /></Field>
          <Field label="Краткое описание (RU)"><Input name="excerptRu" defaultValue={s.excerptRu} /></Field>
          <Field label="Краткое описание (EN)"><Input name="excerptEn" defaultValue={s.excerptEn} /></Field>
          <Field label="Мета-заголовок (RU)"><Input name="metaTitleRu" defaultValue={s.metaTitleRu || ""} /></Field>
          <Field label="Мета-заголовок (EN)"><Input name="metaTitleEn" defaultValue={s.metaTitleEn || ""} /></Field>
          <Field label="Мета-описание (RU)"><Input name="metaDescRu" defaultValue={s.metaDescRu || ""} /></Field>
          <Field label="Мета-описание (EN)"><Input name="metaDescEn" defaultValue={s.metaDescEn || ""} /></Field>
          <div className="space-y-2">
          <Field label="URL изображения для OG"><Input id="ogImageUrl" name="ogImageUrl" defaultValue={s.ogImageUrl || ""} /></Field>
          <UploadToInput inputName="ogImageUrl" />
        </div>
          <div className="flex items-end"><Switch name="isPublished" defaultChecked={s.isPublished} /></div>
        </div>

        <div className="space-y-6 pt-2">
          <div>
            <div className="text-sm font-semibold">Контент EN (блоки, WYSIWYG редактор)</div>
            <div className="mt-2">
              <BlocksEditorSingle name="contentEn" initialArray={s.contentEn as any} lang="en" />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Контент RU (блоки, WYSIWYG редактор)</div>
            <div className="mt-2">
              <BlocksEditorSingle name="contentRu" initialArray={s.contentRu as any} lang="ru" />
            </div>
          </div>
        </div>

        <div className="pt-3">
          <Button type="submit">Сохранить</Button>
        </div>
      </form>
    </div>
  );
}