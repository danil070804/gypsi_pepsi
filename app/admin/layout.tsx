import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col md:flex-row">
        <AdminNav />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
