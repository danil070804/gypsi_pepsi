import { prisma } from "@/lib/prisma";
import SortableTable from "@/components/admin/SortableTable";
import { Field, Input, Textarea, Button, Switch } from "@/components/admin/Form";
import { createReview, updateReview, deleteReview } from "../actions";
import UploadWidget from "@/components/admin/UploadWidget";

export default async function ReviewsAdmin() {
  const reviews = await prisma.review.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  const items = reviews.map((r) => ({
    id: r.id,
    primary: r.authorName,
    secondary: "Review",
    active: r.isPublished,
    sortOrder: r.sortOrder,
    editHref: `#review-${r.id}`,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Reviews</h1>

      <SortableTable initialItems={items} reorderEndpoint="/api/admin/reviews/reorder" />

      <CreateReviewForm defaultSort={reviews.length} />

      <div className="space-y-4">
        {reviews.map((r) => (
          <form key={r.id} id={`review-${r.id}`} action={async (fd) => { "use server"; await updateReview(r.id, fd); }} className="space-y-3 rounded-2xl border bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">{r.authorName}</div>
              <form action={async () => { "use server"; await deleteReview(r.id); }}>
                <button className="rounded-lg border px-3 py-1.5 text-xs">Delete</button>
              </form>
            </div>

            <ReviewFields photoDefault={r.photoUrl || ""} sortDefault={r.sortOrder} publishedDefault={r.isPublished} authorDefault={r.authorName} ratingDefault={r.rating || ""} textRuDefault={r.textRu} textEnDefault={r.textEn} />

            <Button type="submit">Save</Button>
          </form>
        ))}
      </div>
    </div>
  );
}

function CreateReviewForm({ defaultSort }:{ defaultSort: number }) {
  return (
    <form action={createReview} className="space-y-4 rounded-2xl border bg-white p-5">
      <div className="text-sm font-semibold">Add review</div>
      <ReviewFields photoDefault="" sortDefault={defaultSort} publishedDefault={true} />
      <Button type="submit">Create</Button>
    </form>
  );
}

function ReviewFields({
  authorDefault = "",
  ratingDefault = "",
  textRuDefault = "",
  textEnDefault = "",
  photoDefault = "",
  sortDefault = 0,
  publishedDefault = true,
}: {
  authorDefault?: string;
  ratingDefault?: any;
  textRuDefault?: string;
  textEnDefault?: string;
  photoDefault?: string;
  sortDefault?: number;
  publishedDefault?: boolean;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Author name"><Input name="authorName" defaultValue={authorDefault} required /></Field>
      <Field label="Rating (1-5)"><Input name="rating" type="number" min={1} max={5} defaultValue={ratingDefault} /></Field>
      <Field label="Text RU"><Textarea name="textRu" rows={3} defaultValue={textRuDefault} required /></Field>
      <Field label="Text EN"><Textarea name="textEn" rows={3} defaultValue={textEnDefault} required /></Field>

      <div className="space-y-2">
        <Field label="Photo URL"><Input name="photoUrl" defaultValue={photoDefault} /></Field>
        <UploadWidget onUploaded={(url) => {
          const el = document.querySelector('input[name="photoUrl"]') as HTMLInputElement | null;
          if (el) el.value = url;
        }} />
      </div>

      <Field label="Sort order"><Input name="sortOrder" type="number" defaultValue={sortDefault} /></Field>
      <div className="flex items-end"><Switch name="isPublished" defaultChecked={publishedDefault} /></div>
    </div>
  );
}
