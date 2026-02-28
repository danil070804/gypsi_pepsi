"use client";
import { useRef, useState } from "react";

export default function UploadWidget({
  onUploaded,
  label = "Upload image",
  targetInputId,
}: {
  onUploaded?: (url: string) => void;
  label?: string;
  targetInputId?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [lastUrl, setLastUrl] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      if (!data?.url) throw new Error("No url returned");
      setLastUrl(data.url);

      if (targetInputId) {
        const el = document.getElementById(targetInputId) as HTMLInputElement | null;
        if (el) el.value = data.url;
      }
      onUploaded?.(data.url);
    } catch (e: any) {
      setErr(e.message || "Upload error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-lg border bg-white px-3 py-2 text-xs font-medium hover:bg-slate-50"
        disabled={busy}
      >
        {busy ? "Uploading…" : label}
      </button>
      {lastUrl ? (
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(lastUrl)}
          className="rounded-lg border bg-white px-3 py-2 text-xs hover:bg-slate-50"
        >
          Copy URL
        </button>
      ) : null}
      {err ? <span className="text-xs text-red-600">{err}</span> : null}
    </div>
  );
}
