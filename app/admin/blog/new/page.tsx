import { Field, Input, Button, Switch } from "@/components/admin/Form";
import UploadWidget from "@/components/admin/UploadWidget";
import { upsertBlogPost } from "../actions";
import BlocksEditorSingle from "@/components/admin/BlocksEditorSingle";

export default function NewBlogPost() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add blog post</h1>

      <form
        action={async (fd) => {
          "use server";
          await upsertBlogPost(null, fd);
        }}
        className="space-y-4 rounded-2xl border bg-white p-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Slug RU">
            <Input name="slugRu" required />
          </Field>

          <Field label="Slug EN">
            <Input name="slugEn" required />
          </Field>

          <Field label="Title RU">
            <Input name="titleRu" required />
          </Field>

          <Field label="Title EN">
            <Input name="titleEn" required />
          </Field>

          <Field label="Excerpt RU">
            <Input name="excerptRu" required />
          </Field>

          <Field label="Excerpt EN">
            <Input name="excerptEn" required />
          </Field>
        </div>

        <div className="space-y-2">
          <Field label="Cover image URL">
            <Input id="coverImageUrl" name="coverImageUrl" />
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
          <Field label="Published at (ISO)">
            <Input
              name="publishedAt"
              placeholder="2026-02-28T12:00:00Z"
            />
          </Field>

          <div className="flex items-end">
            <Switch name="isPublished" />
          </div>
        </div>

        <div className="space-y-6 pt-2">
          <div>
            <div className="text-sm font-semibold">Content EN</div>
            <div className="mt-2">
              <BlocksEditorSingle name="contentEn" initialArray={[]} lang="en" />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Content RU</div>
            <div className="mt-2">
              <BlocksEditorSingle name="contentRu" initialArray={[]} lang="ru" />
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
