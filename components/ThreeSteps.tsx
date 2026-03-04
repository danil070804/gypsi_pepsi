"use client"

import React, { useState } from "react";
import { Phone, FileText, Check } from "lucide-react";
import ApplyModal from "./ApplyModal";

type Step = {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

export default function ThreeSteps({ lang }: { lang: string }) {
  const steps: Step[] = [
    { id: 1, title: "Заявка", desc: "Оставляете заявку и выбираете менеджера.", icon: <Phone /> },
    { id: 2, title: "Подготовка", desc: "Документы, консультации, план действий.", icon: <FileText /> },
    { id: 3, title: "Выход на работу", desc: "Сопровождаем до выхода и дальше.", icon: <Check /> },
  ];

  const [open, setOpen] = useState(false);
  const [stepSelected, setStepSelected] = useState<Step | null>(null);

  const onClick = (s: Step) => {
    setStepSelected(s);
    setOpen(true);
  };

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <button
            key={s.id}
            onClick={() => onClick(s)}
            className="group rounded-2xl border border-white/6 bg-gradient-to-b from-white/3 to-white/2 p-6 text-left transition-transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Открыть форму - ${s.title}`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700/20 text-blue-300 group-hover:scale-105">
                {s.icon}
              </div>
              <div>
                <div className="text-sm font-semibold">{s.title}</div>
                <div className="mt-1 text-xs text-white/70">{s.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <ApplyModal open={open} onClose={() => setOpen(false)} step={stepSelected} />
    </div>
  );
}
