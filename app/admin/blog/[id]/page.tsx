import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Field, Input, Button, Switch } from "@/components/admin/Form";
import UploadWidget from "@/components/admin/UploadWidget";
import { upsertBlogPost } from "../actions";
import BlocksEditorSingle from "@/components/admin/BlocksEditorSingle";

type Params = Promise<{ id: string }>;

export default async function EditBlogPost({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  const p = await prisma.blogPost.findUnique({ where: { id } });
  if (!p) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit blog post</h1>

      <form
        action={async (fd) => {
          "use server";
          await upsertBlogPost(id, fd);
        }}
        className="space-y-4 rounded-2xl border bg-white p-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Slug RU">
            <Input name="slugRu" defaultValue={p.slugRu} required />
          </Field>

          <Field label="Slug EN">
            <Input name="slugEn" defaultValue={p.slugEn} required />
          </Field>

          <Field label="Title RU">
            <Input name="titleRu" defaultValue={p.titleRu} required />
          </Field>

          <Field label="Title EN">
            <Input name="titleEn" defaultValue={p.titleEn} required />
          </Field>

          <Field label="Excerpt RU">
            <Input name="excerptRu" defaultValue={p.excerptRu} required />
          </Field>

          <Field label="Excerpt EN">
            <Input name="excerptEn" defaultValue={p.excerptEn} required />
          </Field>
        </div>

        <div className="space-y-2">
          <Field label="Cover image URL">
            <Input
              name="coverImageUrl"
              defaultValue={p.coverImageUrl || ""}
            />
          </Field>

          <UploadWidget
            onUploaded={(url) => {
              const el = document.querySelector(
                'input[name="coverImageUrl"]'
              ) as HTMLInputElement | null;
              if (el) el.value = url;
            }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Meta title RU">
            <Input name="metaTitleRu" defaultValue={p.metaTitleRu || ""} />
          </Field>

          <Field label="Meta title EN">
            <Input name="metaTitleEn" defaultValue={p.metaTitleEn || ""} />
          </Field>

          <Field label="Meta description RU">
            <Input name="metaDescRu" defaultValue={p.metaDescRu || ""} />
          </Field>

          <Field label="Meta description EN">
            <Input name="metaDescEn" defaultValue={p.metaDescEn || ""} />
          </Field>

          <Field label="OG image URL">
            <Input name="ogImageUrl" defaultValue={p.ogImageUrl || ""} />
          </Field>

          <div />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Published at (ISO)">
            <Input
              name="publishedAt"
              defaultValue={p.publishedAt ? p.publishedAt.toISOString() : ""}
              placeholder="2026-02-28T12:00:00Z"
            />
          </Field>

          <div className="flex items-end">
            <Switch name="isPublished" defaultChecked={p.isPublished} />
          </div>
        </div>

        <div className="space-y-6 pt-2">
          <div>
            <div className="text-sm font-semibold">Content EN</div>
            <div className="mt-2">
              <BlocksEditorSingle
                name="contentEn"
                initialArray={(p.contentEn as any) || []}
                lang="en"
              />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Content RU</div>
            <div className="mt-2">
              <BlocksEditorSingle
                name="contentRu"
                initialArray={(p.contentRu as any) || []}
                lang="ru"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
