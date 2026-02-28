import { prisma } from "@/lib/prisma";
import SortableTable from "@/components/admin/SortableTable";
import { Field, Input, Textarea, Button, Switch } from "@/components/admin/Form";
import { createFAQ, updateFAQ, deleteFAQ } from "../actions";

export default async function FAQAdmin() {
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

      <SortableTable initialItems={items} reorderEndpoint="/api/admin/faq/reorder" />

      <form action={createFAQ} className="space-y-4 rounded-2xl border bg-white p-5">
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
          <form key={f.id} id={`faq-${f.id}`} action={async (fd) => { "use server"; await updateFAQ(f.id, fd); }} className="space-y-3 rounded-2xl border bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">FAQ item</div>
              <form action={async () => { "use server"; await deleteFAQ(f.id); }}>
                <button className="rounded-lg border px-3 py-1.5 text-xs">Delete</button>
              </form>
            </div>
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
