"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginClient() {
  const sp = useSearchParams();
  const from = sp.get("from") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const res = await signIn("credentials", { email, password, callbackUrl: from, redirect: true });
    if ((res as any)?.error) setErr("Invalid credentials");
  }

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="admin-card mx-auto max-w-md p-6">
        <h1 className="text-xl font-semibold">Admin login</h1>
        <p className="mt-1 text-sm text-slate-300">Sign in to manage content.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-blue-400/40 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-blue-400/40 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {err ? <div className="text-sm text-red-400">{err}</div> : null}
          <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/40 hover:opacity-95">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
