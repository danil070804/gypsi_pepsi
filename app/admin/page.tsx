import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [pages, services, managers, posts] = await Promise.all([
    prisma.page.count(),
    prisma.service.count(),
    prisma.manager.count(),
    prisma.blogPost.count(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <Card title="Pages" value={pages} />
        <Card title="Services" value={services} />
        <Card title="Managers" value={managers} />
        <Card title="Blog posts" value={posts} />
      </div>
      <div className="rounded-2xl border bg-white p-5 text-sm text-slate-700">
        Tip: seed creates default content. Edit via the sections in the left menu.
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="text-sm text-slate-600">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}
