import Link from "next/link";

export default function AdminNav() {
  const items = [
    ["Dashboard", "/admin"],
    ["Site settings", "/admin/settings"],
    ["Pages", "/admin/pages"],
    ["Services", "/admin/services"],
    ["Managers", "/admin/managers"],
    ["Reviews", "/admin/reviews"],
    ["FAQ", "/admin/faq"],
    ["Blog", "/admin/blog"],
  ] as const;

  return (
    <aside className="w-full border-b bg-white p-4 md:w-64 md:border-b-0 md:border-r">
      <div className="text-sm font-semibold">Admin</div>
      <nav className="mt-4 flex flex-wrap gap-3 md:flex-col md:gap-2">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50">
            {label}
          </Link>
        ))}
      </nav>
      <form action="/api/auth/signout" method="post" className="mt-6">
        <button className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">
          Sign out
        </button>
      </form>
    </aside>
  );
}
