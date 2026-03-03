import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBlogPost } from "./actions";
export const dynamic = "force-dynamic";
export const revalidate = 0;


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
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/40 hover:opacity-95"
        >
          Add post
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Published?</th>
              <th className="p-3">Slugs</th>
              <th className="p-3" />
            </tr>
          </thead>

          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-3">
                  <div className="font-semibold">{p.titleEn}</div>
                  <div className="text-xs text-slate-400">{p.titleRu}</div>
                </td>

                <td className="p-3">{p.isPublished ? "Yes" : "No"}</td>

                <td className="p-3 text-xs text-slate-300">
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