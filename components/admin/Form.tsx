import React from "react";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <div className="text-xs font-semibold text-slate-300">{label}</div>
      {children}
    </label>
  );
}

const baseInput =
  "w-full rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 outline-none " +
  "focus:border-blue-400/40 focus:ring-2 focus:ring-blue-500/20";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={baseInput + " " + (props.className || "")} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={baseInput + " min-h-28 " + (props.className || "")} />;
}

export function Switch({ name, defaultChecked }: { name: string; defaultChecked?: boolean }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-slate-200">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-blue-500" />
      <span>Enabled</span>
    </label>
  );
}

export function Button({
  children,
  variant = "primary",
  ...props
}: { children: React.ReactNode; variant?: "primary" | "danger" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls =
    variant === "danger"
      ? "rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
      : "rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/40 hover:opacity-95";
  return (
    <button {...props} className={cls + " " + (props.className || "")}>
      {children}
    </button>
  );
}
