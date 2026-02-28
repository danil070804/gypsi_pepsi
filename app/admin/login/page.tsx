"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
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
    <div className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-md rounded-2xl border bg-white p-6">
        <h1 className="text-xl font-semibold">Admin login</h1>
        <p className="mt-1 text-sm text-slate-600">Sign in to manage content.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {err ? <div className="text-sm text-red-600">{err}</div> : null}
          <button className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
