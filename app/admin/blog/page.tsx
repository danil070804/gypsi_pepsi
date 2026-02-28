import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBlogPost } from "./actions";

export default async function BlogAdmin() {
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl font-semibold">Blog</h1>

        <Link
          href="/admin/blog/new"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Add post
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Published?</th>
              <th className="p-3">Slugs</th>
              <th className="p-3" />
            </tr>
          </thead>

          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  <div className="font-semibold">{p.titleEn}</div>
                  <div className="text-xs text-slate-500">{p.titleRu}</div>
                </td>

                <td className="p-3">{p.isPublished ? "Yes" : "No"}</td>

                <td className="p-3 text-xs text-slate-600">
                  <div>{p.slugEn}</div>
                  <div>{p.slugRu}</div>
                </td>

                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/blog/${p.id}`}
                      className="rounded-lg border px-3 py-1.5 text-xs"
                    >
                      Edit
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await deleteBlogPost(p.id);
                      }}
                    >
                      <button className="rounded-lg border px-3 py-1.5 text-xs">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
