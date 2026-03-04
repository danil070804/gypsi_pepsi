import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SortableTable from "@/components/admin/SortableTable";
import { Field, Input, Textarea, Button, Switch } from "@/components/admin/Form";
import { createFAQ, updateFAQ, deleteFAQ } from "../actions";
export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function FAQAdmin({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; saved?: string }>;
}) {
  const { created, saved } = await searchParams;
  const faqs = await prisma.fAQ.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  const items = faqs.map((f) => ({
    id: f.id,
    primary: f.questionEn,
    secondary: f.questionRu,
    active: f.isPublished,
    sortOrder: f.sortOrder,
    editHref: `#faq-${f.id}`,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">FAQ</h1>

      {created === "1" && (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          FAQ created successfully.
        </div>
      )}

      <SortableTable initialItems={items} reorderEndpoint="/api/admin/faq/reorder" />

      <form
        action={async (fd) => {
          "use server";
          await createFAQ(fd);
          redirect("/admin/faq?created=1");
        }}
        className="space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5"
      >
        <div className="text-sm font-semibold">Add FAQ</div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Question RU"><Input name="questionRu" required /></Field>
          <Field label="Question EN"><Input name="questionEn" required /></Field>
          <Field label="Answer RU"><Textarea name="answerRu" rows={3} required /></Field>
          <Field label="Answer EN"><Textarea name="answerEn" rows={3} required /></Field>
          <Field label="Sort order (optional)"><Input name="sortOrder" type="number" defaultValue={faqs.length} /></Field>
          <div className="flex items-end"><Switch name="isPublished" defaultChecked /></div>
        </div>
        <Button type="submit">Create</Button>
      </form>

      <div className="space-y-4">
        {faqs.map((f) => (
          <form
            key={f.id}
            id={`faq-${f.id}`}
            action={async (fd) => {
              "use server";
              await updateFAQ(f.id, fd);
              redirect(`/admin/faq?saved=${f.id}`);
            }}
            className="space-y-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">FAQ item</div>
              <form action={async () => { "use server"; await deleteFAQ(f.id); }}>
                <button className="rounded-lg border px-3 py-1.5 text-xs">Delete</button>
              </form>
            </div>
            {saved === f.id && (
              <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
                Changes saved successfully.
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Question RU"><Input name="questionRu" defaultValue={f.questionRu} /></Field>
              <Field label="Question EN"><Input name="questionEn" defaultValue={f.questionEn} /></Field>
              <Field label="Answer RU"><Textarea name="answerRu" rows={3} defaultValue={f.answerRu} /></Field>
              <Field label="Answer EN"><Textarea name="answerEn" rows={3} defaultValue={f.answerEn} /></Field>
              <Field label="Sort order"><Input name="sortOrder" type="number" defaultValue={f.sortOrder} /></Field>
              <div className="flex items-end"><Switch name="isPublished" defaultChecked={f.isPublished} /></div>
            </div>
            <Button type="submit">Save</Button>
          </form>
        ))}
      </div>
    </div>
  );
}