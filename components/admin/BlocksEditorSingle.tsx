"use client";
import React from "react";
import BlocksEditor from "./BlocksEditor";

export default function BlocksEditorSingle({
  name,
  initialArray,
  lang,
}: {
  name: string;
  initialArray: any;
  lang: "ru" | "en";
}) {
  const initial = { ru: [], en: [] } as any;
  initial[lang] = Array.isArray(initialArray) ? initialArray : [];
  return (
    <BlocksEditor
      name={name}
      initialValue={initial}
    />
  );
}
