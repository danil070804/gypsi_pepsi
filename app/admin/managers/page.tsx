import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SortableTable from "@/components/admin/SortableTable";

export default async function ManagersPage() {
  const managers = await prisma.manager.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  const items = managers.map((m) => ({
    id: m.id,
    primary: `${m.nameEn} / ${m.nameRu}`,
    secondary: `${m.roleEn || ""}${m.roleRu ? " / " + m.roleRu : ""}`.trim() || undefined,
    active: m.isActive,
    sortOrder: m.sortOrder,
    editHref: `/admin/managers/${m.id}`,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl font-semibold">Managers</h1>
        <Link href="/admin/managers/new" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Add manager
        </Link>
      </div>

      <SortableTable initialItems={items} reorderEndpoint="/api/admin/managers/reorder" />

      <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
        Note: delete is available on the edit page (or you can keep the old delete flow if you want).
      </div>
    </div>
  );
}
