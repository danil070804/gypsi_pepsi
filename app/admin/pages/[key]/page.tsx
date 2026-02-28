import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Field, Input, Button, Switch } from "@/components/admin/Form";
import { upsertPage } from "../../actions";
import BlocksEditor from "@/components/admin/BlocksEditor";
import UploadWidget from "@/components/admin/UploadWidget";

export default async function EditPage({ params }: { params: { key: string } }) {
  const page = await prisma.page.findUnique({ where: { key: params.key } });
  if (!page) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit page: {params.key}</h1>

      <form action={async (fd) => { "use server"; await upsertPage(params.key, fd); }} className="space-y-4 rounded-2xl border bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title (RU)"><Input name="titleRu" defaultValue={page.titleRu} /></Field>
          <Field label="Title (EN)"><Input name="titleEn" defaultValue={page.titleEn} /></Field>
          <Field label="Meta title (RU)"><Input name="metaTitleRu" defaultValue={page.metaTitleRu || ""} /></Field>
          <Field label="Meta title (EN)"><Input name="metaTitleEn" defaultValue={page.metaTitleEn || ""} /></Field>
          <Field label="Meta description (RU)"><Input name="metaDescRu" defaultValue={page.metaDescRu || ""} /></Field>
          <Field label="Meta description (EN)"><Input name="metaDescEn" defaultValue={page.metaDescEn || ""} /></Field>
          <div className="space-y-2">
          <Field label="OG image URL"><Input id="ogImageUrl" name="ogImageUrl" defaultValue={page.ogImageUrl || ""} /></Field>
          <UploadWidget onUploaded={(url) => {
            const el = document.querySelector('input[name="ogImageUrl"]') as HTMLInputElement | null;
            if (el) el.value = url;
          }} />
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
