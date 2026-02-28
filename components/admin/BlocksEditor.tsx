"use client";
import React, { useMemo, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { SortableList } from "./DndSortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Lang = "ru" | "en";

type BlockBase = { id: string; type: string };
type Block =
  | (BlockBase & { type: "hero"; title: string; subtitle?: string; ctas?: { label: string; href: string }[] })
  | (BlockBase & { type: "steps"; title?: string; items: { title: string; text?: string }[] })
  | (BlockBase & { type: "cta"; title: string; text?: string; buttonLabel: string; href: string })
  | (BlockBase & { type: "richText"; title?: string; html: string })
  | (BlockBase & { type: "bullets"; title?: string; items: string[] });

function safeParse(value: string) {
  try { return JSON.parse(value); } catch { return null; }
}
function uid() {
  return Math.random().toString(36).slice(2, 10);
}
function ensureIds(arr: any[]) {
  return (arr || []).map((b) => (b?.id ? b : { id: uid(), ...b }));
}

export default function BlocksEditor({
  name,
  initialValue,
}: {
  name: string; // form field name
  initialValue: any; // object {ru:[], en:[]}
}) {
  const init = useMemo(() => {
    if (typeof initialValue === "string") {
      const parsed = safeParse(initialValue);
      return parsed || { ru: [], en: [] };
    }
    return initialValue || { ru: [], en: [] };
  }, [initialValue]);

  const [data, setData] = useState<{ ru: Block[]; en: Block[] }>(() => ({
    ru: ensureIds(Array.isArray(init?.ru) ? init.ru : []),
    en: ensureIds(Array.isArray(init?.en) ? init.en : []),
  }));

  function addBlock(lang: Lang, type: Block["type"]) {
    const id = uid();
    const next: any =
      type === "hero"
        ? { id, type, title: "", subtitle: "", ctas: [{ label: "", href: "" }, { label: "", href: "" }] }
        : type === "steps"
        ? { id, type, title: "", items: [{ title: "", text: "" }, { title: "", text: "" }, { title: "", text: "" }] }
        : type === "cta"
        ? { id, type, title: "", text: "", buttonLabel: "", href: "" }
        : type === "bullets"
        ? { id, type, title: "", items: ["", "", ""] }
        : { id, type: "richText", title: "", html: "<p></p>" };

    setData((prev) => ({ ...prev, [lang]: [...prev[lang], next] as any }));
  }

  function remove(lang: Lang, id: string) {
    setData((prev) => ({ ...prev, [lang]: prev[lang].filter((b) => b.id !== id) as any }));
  }

  function update(lang: Lang, id: string, patch: any) {
    setData((prev) => ({
      ...prev,
      [lang]: prev[lang].map((b) => (b.id === id ? ({ ...b, ...patch } as any) : b)) as any,
    }));
  }

  const jsonValue = JSON.stringify(data, null, 2);

  const Panel = ({ lang }: { lang: Lang }) => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => addBlock(lang, "hero")} className="rounded-lg border px-3 py-2 text-xs hover:bg-slate-50">+ hero</button>
        <button type="button" onClick={() => addBlock(lang, "steps")} className="rounded-lg border px-3 py-2 text-xs hover:bg-slate-50">+ steps</button>
        <button type="button" onClick={() => addBlock(lang, "bullets")} className="rounded-lg border px-3 py-2 text-xs hover:bg-slate-50">+ bullets</button>
        <button type="button" onClick={() => addBlock(lang, "cta")} className="rounded-lg border px-3 py-2 text-xs hover:bg-slate-50">+ cta</button>
        <button type="button" onClick={() => addBlock(lang, "richText")} className="rounded-lg border px-3 py-2 text-xs hover:bg-slate-50">+ richText (WYSIWYG)</button>
      </div>

      <SortableList
        items={data[lang]}
        onReorder={(next) => setData((prev) => ({ ...prev, [lang]: next as any }))}
      >
        <div className="space-y-3">
          {data[lang].map((b) => (
            <SortableCard key={b.id} id={b.id} onRemove={() => remove(lang, b.id)}>
              <BlockEditor block={b} lang={lang} onUpdate={(patch) => update(lang, b.id, patch)} />
            </SortableCard>
          ))}
        </div>
      </SortableList>
    </div>
  );

  const [tab, setTab] = useState<Lang>("en");

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button type="button" onClick={() => setTab("en")} className={"rounded-lg border px-3 py-2 text-xs " + (tab==="en" ? "bg-slate-900 text-white" : "bg-white")}>EN</button>
        <button type="button" onClick={() => setTab("ru")} className={"rounded-lg border px-3 py-2 text-xs " + (tab==="ru" ? "bg-slate-900 text-white" : "bg-white")}>RU</button>
      </div>

      {tab === "en" ? <Panel lang="en" /> : <Panel lang="ru" />}

      <input type="hidden" name={name} value={jsonValue} readOnly />

      <details className="rounded-xl border bg-slate-50 p-3 text-xs text-slate-600">
        <summary className="cursor-pointer font-semibold">Raw JSON (debug)</summary>
        <pre className="mt-2 whitespace-pre-wrap">{jsonValue}</pre>
      </details>
    </div>
  );
}

function SortableCard({ id, children, onRemove }:{ id: string; children: React.ReactNode; onRemove: ()=>void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="rounded-2xl border bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab rounded-lg border bg-slate-50 px-2 py-1 text-xs text-slate-700 active:cursor-grabbing"
            aria-label="Drag"
          >
            ⠿
          </button>
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">block</div>
        </div>
        <button type="button" onClick={onRemove} className="rounded-lg border px-2 py-1 text-xs">Remove</button>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function BlockEditor({ block, lang, onUpdate }:{ block: any; lang: Lang; onUpdate: (patch:any)=>void }) {
  const b = block as Block;

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{b.type}</div>

      {b.type === "hero" ? (
        <div className="grid gap-3 md:grid-cols-2">
          <Input label="Title" value={b.title} onChange={(v) => onUpdate({ title: v })} />
          <Input label="Subtitle" value={(b as any).subtitle || ""} onChange={(v) => onUpdate({ subtitle: v })} />
          <Input label="CTA 1 label" value={(b as any).ctas?.[0]?.label || ""} onChange={(v) => {
            const ctas = [...((b as any).ctas || [])];
            ctas[0] = { ...(ctas[0] || {}), label: v };
            onUpdate({ ctas });
          }} />
          <Input label="CTA 1 href" value={(b as any).ctas?.[0]?.href || ""} onChange={(v) => {
            const ctas = [...((b as any).ctas || [])];
            ctas[0] = { ...(ctas[0] || {}), href: v };
            onUpdate({ ctas });
          }} />
          <Input label="CTA 2 label" value={(b as any).ctas?.[1]?.label || ""} onChange={(v) => {
            const ctas = [...((b as any).ctas || [])];
            ctas[1] = { ...(ctas[1] || {}), label: v };
            onUpdate({ ctas });
          }} />
          <Input label="CTA 2 href" value={(b as any).ctas?.[1]?.href || ""} onChange={(v) => {
            const ctas = [...((b as any).ctas || [])];
            ctas[1] = { ...(ctas[1] || {}), href: v };
            onUpdate({ ctas });
          }} />
        </div>
      ) : null}

      {b.type === "steps" ? (
        <div className="space-y-3">
          <Input label="Title" value={(b as any).title || ""} onChange={(v) => onUpdate({ title: v })} />
          {((b as any).items || []).map((it: any, i: number) => (
            <div key={i} className="grid gap-3 md:grid-cols-2">
              <Input label={`Step ${i+1} title`} value={it.title || ""} onChange={(v) => {
                const items = [...((b as any).items || [])];
                items[i] = { ...(items[i] || {}), title: v };
                onUpdate({ items });
              }} />
              <Input label={`Step ${i+1} text`} value={it.text || ""} onChange={(v) => {
                const items = [...((b as any).items || [])];
                items[i] = { ...(items[i] || {}), text: v };
                onUpdate({ items });
              }} />
            </div>
          ))}
        </div>
      ) : null}

      {b.type === "bullets" ? (
        <div className="space-y-3">
          <Input label="Title" value={(b as any).title || ""} onChange={(v) => onUpdate({ title: v })} />
          {((b as any).items || []).map((it: any, i: number) => (
            <Input key={i} label={`Bullet ${i+1}`} value={it || ""} onChange={(v) => {
              const items = [...((b as any).items || [])];
              items[i] = v;
              onUpdate({ items });
            }} />
          ))}
        </div>
      ) : null}

      {b.type === "cta" ? (
        <div className="grid gap-3 md:grid-cols-2">
          <Input label="Title" value={b.title} onChange={(v) => onUpdate({ title: v })} />
          <Input label="Button label" value={(b as any).buttonLabel || ""} onChange={(v) => onUpdate({ buttonLabel: v })} />
          <Input label="Href" value={(b as any).href || ""} onChange={(v) => onUpdate({ href: v })} />
          <Input label="Text (optional)" value={(b as any).text || ""} onChange={(v) => onUpdate({ text: v })} />
        </div>
      ) : null}

      {b.type === "richText" ? (
        <div className="space-y-3">
          <Input label="Title (optional)" value={(b as any).title || ""} onChange={(v) => onUpdate({ title: v })} />
          <RichTextEditor value={(b as any).html || "<p></p>"} onChange={(html) => onUpdate({ html })} />
        </div>
      ) : null}
    </div>
  );
}

function Input({ label, value, onChange }:{ label: string; value: string; onChange: (v:string)=>void }) {
  return (
    <label className="block space-y-1">
      <div className="text-xs font-semibold text-slate-700">{label}</div>
      <input className="w-full rounded-xl border px-3 py-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
