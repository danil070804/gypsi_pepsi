import Link from "next/link";
import { headers } from "next/headers";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

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

  // Next.js doesn't expose pathname here directly in a server component.
  // We can infer it from headers in most deployments.
  const h = headers();
  const pathname = h.get("x-invoke-path") || h.get("x-matched-path") || h.get("next-url") || "/admin";

  return (
    <aside className="w-full border-b border-white/10 bg-slate-950/40 p-4 backdrop-blur md:sticky md:top-0 md:h-screen md:w-72 md:border-b-0 md:border-r md:border-white/10">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold tracking-wide text-slate-100">Admin</div>
        <span className="rounded-full border border-white/10 bg-slate-900/40 px-2 py-1 text-[11px] text-slate-300">GYPSey</span>
      </div>

      <nav className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-1">
        {items.map(([label, href]) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={
                "rounded-xl px-3 py-2 text-sm transition " +
                (active
                  ? "bg-gradient-to-r from-blue-600/25 to-indigo-600/15 text-slate-100 ring-1 ring-blue-500/30"
                  : "border border-white/10 bg-slate-900/30 text-slate-200 hover:bg-slate-900/45")
              }
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <form action="/api/auth/signout" method="post" className="mt-6">
        <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/40 hover:opacity-95">
          Sign out
        </button>
      </form>
    </aside>
  );
}
