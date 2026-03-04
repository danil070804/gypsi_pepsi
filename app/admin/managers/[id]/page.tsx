import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { Field, Input, Button, Switch } from "@/components/admin/Form";
import PhotoUrlField from "../PhotoUrlField";
import { updateManager, deleteManager } from "../../actions";
export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function EditManagerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const m = await prisma.manager.findUnique({ where: { id } });
  if (!m) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit manager</h1>

      {saved === "1" && (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Changes saved successfully.
        </div>
      )}

      <form
        action={async (fd) => {
          "use server";
          await updateManager(id, fd);
          redirect(`/admin/managers/${id}?saved=1`);
        }}
        className="space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name (RU)"><Input name="nameRu" defaultValue={m.nameRu} required /></Field>
          <Field label="Name (EN)"><Input name="nameEn" defaultValue={m.nameEn} required /></Field>
          <Field label="Role (RU)"><Input name="roleRu" defaultValue={m.roleRu || ""} /></Field>
          <Field label="Role (EN)"><Input name="roleEn" defaultValue={m.roleEn || ""} /></Field>
          <div className="space-y-2">
          <PhotoUrlField defaultValue={m.photoUrl || ""} />
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