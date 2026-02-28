import { Field, Input, Textarea, Button, Switch } from "@/components/admin/Form";
import UploadWidget from "@/components/admin/UploadWidget";
import { createManager } from "../../actions";

export default function NewManagerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add manager</h1>

      <form action={createManager} className="space-y-4 rounded-2xl border bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name (RU)"><Input name="nameRu" required /></Field>
          <Field label="Name (EN)"><Input name="nameEn" required /></Field>
          <Field label="Role (RU)"><Input name="roleRu" /></Field>
          <Field label="Role (EN)"><Input name="roleEn" /></Field>
          <div className="space-y-2">
          <Field label="Photo URL (or upload)"><Input id="photoUrl" name="photoUrl" placeholder="/uploads/..." /></Field>
          <UploadWidget onUploaded={(url) => {
            const el = document.querySelector('input[name="photoUrl"]') as HTMLInputElement | null;
            if (el) el.value = url;
          }} />
        </div>
          <Field label="WhatsApp (number or link)"><Input name="whatsapp" /></Field>
          <Field label="Telegram (username or link)"><Input name="telegram" /></Field>
          <Field label="Instagram (username or link)"><Input name="instagram" /></Field>
          <Field label="Email"><Input name="email" type="email" /></Field>
          <Field label="Sort order"><Input name="sortOrder" type="number" defaultValue={0} /></Field>
          <div className="flex items-end"><Switch name="isActive" defaultChecked /></div>
        </div>

        <div className="pt-3">
          <Button type="submit">Create</Button>
        </div>

        <UploadHint />
      </form>
    </div>
  );
}

function UploadHint() {
  return (
    <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
      Upload: POST multipart/form-data to <code>/api/upload</code> with field <code>file</code>.
      Response returns <code>{`{ url: "/uploads/..." }`}</code>. Put that URL into Photo URL.
    </div>
  );
}
