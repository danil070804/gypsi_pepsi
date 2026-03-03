import Link from "next/link";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export const revalidate = 0;


const keys = ["home", "about", "privacy", "cookies"] as const;

export default async function PagesAdmin() {
  const pages = await prisma.page.findMany({ orderBy: { key: "asc" } });
  const byKey = new Map(pages.map((p) => [p.key, p]));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Pages</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {keys.map((k) => {
          const p = byKey.get(k);
          return (
            <Link key={k} href={`/admin/pages/${k}`} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
              <div className="text-sm font-semibold">{k}</div>
              <div className="mt-2 text-sm text-slate-300">{p ? `${p.titleEn} / ${p.titleRu}` : "Not created"}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}