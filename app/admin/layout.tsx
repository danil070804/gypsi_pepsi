import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050816] text-slate-100">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[520px] w-[520px] rounded-full bg-indigo-500/15 blur-3xl" />
      </div>

      <div className="flex min-h-screen flex-col md:flex-row">
        <AdminNav />
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
