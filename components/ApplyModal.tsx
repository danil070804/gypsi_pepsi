"use client"

import React, { useEffect, useState } from "react";

export default function ApplyModal({ open, onClose, step }: { open: boolean; onClose: () => void; step: any }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) {
      setName("");
      setPhone("");
      setComment("");
      setLoading(false);
      setSuccess(false);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      try { document.body.style.overflow = "hidden"; } catch (e) {}
    } else {
      try { document.body.style.overflow = ""; } catch (e) {}
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment, step: step?.title || null }),
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-md">
        <button className="absolute right-3 top-3" onClick={onClose} aria-label="Закрыть">✕</button>

        {!success ? (
          <form onSubmit={submit} className="space-y-4">
            <h3 className="text-lg font-semibold">{step?.title || "Заявка"}</h3>
            <p className="text-sm text-white/70">Отправьте заявку — мы свяжемся в ближайшее время.</p>

            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" className="w-full rounded-md p-2 text-black" required />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон или Email" className="w-full rounded-md p-2 text-black" required />
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Комментарий (опционально)" className="w-full rounded-md p-2 text-black" />

            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={onClose} className="rounded-md px-4 py-2">Отмена</button>
              <button type="submit" disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-white">
                {loading ? "Отправка..." : "Отправить"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Спасибо!</h3>
            <p className="text-sm text-white/70">Ваша заявка принята. Мы свяжемся с вами.</p>
            <div className="flex justify-end">
              <button onClick={onClose} className="rounded-md bg-blue-600 px-4 py-2 text-white">Закрыть</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
