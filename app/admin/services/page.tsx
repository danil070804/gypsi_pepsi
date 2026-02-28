import { prisma } from "@/lib/prisma";
import SortableTable from "@/components/admin/SortableTable";

export default async function ServicesAdmin() {
  const services = await prisma.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  const items = services.map((s) => ({
    id: s.id,
    primary: s.titleEn,
    secondary: s.slug,
    active: s.isPublished,
    sortOrder: s.sortOrder,
    editHref: `/admin/services/${s.id}`,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Services</h1>
      <SortableTable initialItems={items} reorderEndpoint="/api/admin/services/reorder" />
    </div>
  );
}
