import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PAGE_KEYS, getDefaultPageContent } from "@/lib/page-defaults";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PagesAdmin() {
  const pages = await prisma.page.findMany({ orderBy: { key: "asc" } });
  const byKey = new Map(pages.map((p) => [p.key, p]));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Pages</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {PAGE_KEYS.map((k) => {
          const p = byKey.get(k);
          const fallback = getDefaultPageContent(k);
          return (
            <Link key={k} href={`/admin/pages/${k}`} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
              <div className="text-sm font-semibold">{k}</div>
              <div className="mt-2 text-sm text-slate-300">
                {p ? `${p.titleEn} / ${p.titleRu}` : fallback ? `${fallback.titleEn} / ${fallback.titleRu}` : "Not created"}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
