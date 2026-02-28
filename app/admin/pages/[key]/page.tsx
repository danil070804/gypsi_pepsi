import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Field, Input, Button, Switch } from "@/components/admin/Form";
import { upsertPage } from "../../actions";
import BlocksEditor from "@/components/admin/BlocksEditor";
import UploadToInput from "@/components/admin/UploadToInput";
export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function EditPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const page = await prisma.page.findUnique({ where: { key: key } });
  if (!page) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit page: {key}</h1>

      <form action={async (fd) => { "use server"; await upsertPage(key, fd); }} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title (RU)"><Input name="titleRu" defaultValue={page.titleRu} /></Field>
          <Field label="Title (EN)"><Input name="titleEn" defaultValue={page.titleEn} /></Field>
          <Field label="Meta title (RU)"><Input name="metaTitleRu" defaultValue={page.metaTitleRu || ""} /></Field>
          <Field label="Meta title (EN)"><Input name="metaTitleEn" defaultValue={page.metaTitleEn || ""} /></Field>
          <Field label="Meta description (RU)"><Input name="metaDescRu" defaultValue={page.metaDescRu || ""} /></Field>
          <Field label="Meta description (EN)"><Input name="metaDescEn" defaultValue={page.metaDescEn || ""} /></Field>
          <div className="space-y-2">
          <Field label="OG image URL"><Input id="ogImageUrl" name="ogImageUrl" defaultValue={page.ogImageUrl || ""} /></Field>
          <UploadToInput inputName="ogImageUrl" />
        </div>
          <div className="flex items-end"><Switch name="isPublished" defaultChecked={page.isPublished} /></div>
        </div>

        <div className="pt-2">
          <div className="text-sm font-semibold">Blocks (WYSIWYG supported)</div>
          <div className="mt-2">
            <BlocksEditor name="blocksJson" initialValue={page.blocksJson as any} />
          </div>
        </div>

        <div className="pt-3">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}