import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Field, Input, Button, Switch } from "@/components/admin/Form";
import { updateManager, deleteManager } from "../../actions";

type Params = Promise<{ id: string }>;

export default async function EditManagerPage({ params }: { params: Params }) {
  const { id } = await params;
  const m = await prisma.manager.findUnique({ where: { id: id } });
  if (!m) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit manager</h1>

      <form action={async (fd) => { "use server"; await updateManager(id, fd); }} className="space-y-4 rounded-2xl border bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name (RU)"><Input name="nameRu" defaultValue={m.nameRu} required /></Field>
          <Field label="Name (EN)"><Input name="nameEn" defaultValue={m.nameEn} required /></Field>
          <Field label="Role (RU)"><Input name="roleRu" defaultValue={m.roleRu || ""} /></Field>
          <Field label="Role (EN)"><Input name="roleEn" defaultValue={m.roleEn || ""} /></Field>
          <div className="space-y-2">
          <Field label="Photo URL"><Input id="photoUrl" name="photoUrl" defaultValue={m.photoUrl || ""} /></Field>
          <UploadWidget onUploaded={(url) => {
            const el = document.querySelector('input[name="photoUrl"]') as HTMLInputElement | null;
            if (el) el.value = url;
          }} />
        </div>
          <Field label="WhatsApp"><Input name="whatsapp" defaultValue={m.whatsapp || ""} /></Field>
          <Field label="Telegram"><Input name="telegram" defaultValue={m.telegram || ""} /></Field>
          <Field label="Instagram"><Input name="instagram" defaultValue={m.instagram || ""} /></Field>
          <Field label="Email"><Input name="email" type="email" defaultValue={m.email || ""} /></Field>
          <Field label="Sort order"><Input name="sortOrder" type="number" defaultValue={m.sortOrder} /></Field>
          <div className="flex items-end"><Switch name="isActive" defaultChecked={m.isActive} /></div>
        </div>

        <div className="flex flex-wrap gap-2 pt-3">
          <Button type="submit">Save</Button>
          <form action={async () => { "use server"; await deleteManager(id); }}>
            <Button type="submit" variant="danger">Delete</Button>
          </form>
        </div>
      </form>
    </div>
  );
}
