"use client";
import React, { useMemo, useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Item = { id: string; primary: string; secondary?: string; active?: boolean; sortOrder?: number; editHref: string };

function Row({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style: React.CSSProperties = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.7 : 1 };

  return (
    <tr ref={setNodeRef} style={style} className="border-t bg-white">
      <td className="p-3 align-middle">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab rounded-lg border bg-slate-50 px-2 py-1 text-xs text-slate-700 active:cursor-grabbing"
          aria-label="Drag"
        >
          ⠿
        </button>
      </td>
      <td className="p-3 align-middle">
        <div className="font-semibold">{item.primary}</div>
        {item.secondary ? <div className="text-xs text-slate-500">{item.secondary}</div> : null}
      </td>
      <td className="p-3 align-middle">{item.active === undefined ? "-" : item.active ? "Yes" : "No"}</td>
      <td className="p-3 align-middle">{item.sortOrder ?? "-"}</td>
      <td className="p-3 align-middle text-right">
        <a href={item.editHref} className="rounded-lg border px-3 py-1.5 text-xs">Edit</a>
      </td>
    </tr>
  );
}

export default function SortableTable({
  initialItems,
  reorderEndpoint,
}: {
  initialItems: Item[];
  reorderEndpoint: string;
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const [items, setItems] = useState<Item[]>(() => initialItems);
  const [saving, setSaving] = useState(false);
  const ids = useMemo(() => items.map((i) => i.id), [items]);

  async function save(next: Item[]) {
    setSaving(true);
    try {
      await fetch(reorderEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next.map((x) => x.id) }),
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="flex items-center justify-between border-b bg-slate-50 px-4 py-2 text-xs text-slate-600">
        <div>Drag rows to reorder</div>
        <div>{saving ? "Saving…" : "Saved"}</div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(e) => {
          const { active, over } = e;
          if (!over || active.id === over.id) return;
          const oldIndex = items.findIndex((i) => i.id === active.id);
          const newIndex = items.findIndex((i) => i.id === over.id);
          const next = arrayMove(items, oldIndex, newIndex).map((it, idx) => ({ ...it, sortOrder: idx }));
          setItems(next);
          save(next);
        }}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs">
              <tr>
                <th className="p-3 w-14"></th>
                <th className="p-3">Item</th>
                <th className="p-3">Active</th>
                <th className="p-3">Sort</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => <Row key={it.id} item={it} />)}
              {items.length === 0 ? <tr><td className="p-3 text-slate-500" colSpan={5}>No items</td></tr> : null}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
}
