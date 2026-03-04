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
      <h1 className="text-2xl font-semibold">Edit service</h1>

      {saved === "1" && (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Changes saved successfully.
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
          <Field label="Slug"><Input name="slug" defaultValue={s.slug} /></Field>
          <Field label="Sort order"><Input name="sortOrder" type="number" defaultValue={s.sortOrder} /></Field>
          <Field label="Title (RU)"><Input name="titleRu" defaultValue={s.titleRu} /></Field>
          <Field label="Title (EN)"><Input name="titleEn" defaultValue={s.titleEn} /></Field>
          <Field label="Excerpt (RU)"><Input name="excerptRu" defaultValue={s.excerptRu} /></Field>
          <Field label="Excerpt (EN)"><Input name="excerptEn" defaultValue={s.excerptEn} /></Field>
          <Field label="Meta title (RU)"><Input name="metaTitleRu" defaultValue={s.metaTitleRu || ""} /></Field>
          <Field label="Meta title (EN)"><Input name="metaTitleEn" defaultValue={s.metaTitleEn || ""} /></Field>
          <Field label="Meta desc (RU)"><Input name="metaDescRu" defaultValue={s.metaDescRu || ""} /></Field>
          <Field label="Meta desc (EN)"><Input name="metaDescEn" defaultValue={s.metaDescEn || ""} /></Field>
          <div className="space-y-2">
          <Field label="OG image URL"><Input id="ogImageUrl" name="ogImageUrl" defaultValue={s.ogImageUrl || ""} /></Field>
          <UploadToInput inputName="ogImageUrl" />
        </div>
          <div className="flex items-end"><Switch name="isPublished" defaultChecked={s.isPublished} /></div>
        </div>

        <div className="space-y-6 pt-2">
          <div>
            <div className="text-sm font-semibold">Content EN (blocks, WYSIWYG richText)</div>
            <div className="mt-2">
              <BlocksEditorSingle name="contentEn" initialArray={s.contentEn as any} lang="en" />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Content RU (blocks, WYSIWYG richText)</div>
            <div className="mt-2">
              <BlocksEditorSingle name="contentRu" initialArray={s.contentRu as any} lang="ru" />
            </div>
          </div>
        </div>

        <div className="pt-3">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}