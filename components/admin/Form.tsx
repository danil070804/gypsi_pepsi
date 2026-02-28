import React from "react";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <div className="text-xs font-semibold text-slate-700">{label}</div>
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={"w-full rounded-xl border px-3 py-2 text-sm " + (props.className || "")} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={"w-full rounded-xl border px-3 py-2 text-sm " + (props.className || "")} />;
}

export function Switch({ name, defaultChecked }: { name: string; defaultChecked?: boolean }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} />
      <span>Enabled</span>
    </label>
  );
}

export function Button({ children, variant = "primary", ...props }: { children: React.ReactNode; variant?: "primary" | "danger" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls =
    variant === "danger"
      ? "rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white"
      : "rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white";
  return (
    <button {...props} className={cls + " " + (props.className || "")}>
      {children}
    </button>
  );
}
