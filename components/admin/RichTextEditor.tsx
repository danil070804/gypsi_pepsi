"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Bold, Italic, List, ListOrdered, Link2, Undo2, Redo2, Heading2, Quote, Image as ImageIcon } from "lucide-react";

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[220px] p-3",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // keep editor in sync if value changes externally
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value && value !== current) editor.commands.setContent(value, false);
    if (!value && current !== "<p></p>") editor.commands.setContent("<p></p>", false);
  }, [value, editor]);

  if (!editor) return <div className="rounded-xl border bg-white p-3 text-sm text-slate-500">Loading editor…</div>;

  const Btn = ({ onClick, active, children }:{ onClick:()=>void; active?: boolean; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      className={"inline-flex h-9 w-9 items-center justify-center rounded-lg border text-slate-700 hover:bg-slate-50 " + (active ? "bg-slate-900 text-white" : "bg-white")}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-2xl border bg-white">
      <div className="flex flex-wrap gap-2 border-b p-2">
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote size={16} /></Btn>
        <Btn
          onClick={() => {
            const url = window.prompt("Link URL");
            if (!url) return;
            editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
        >
          <Link2 size={16} />
        </Btn>
        <Btn
          onClick={() => {
            const url = window.prompt("Image URL");
            if (!url) return;
            editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          <ImageIcon size={16} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().undo().run()}><Undo2 size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()}><Redo2 size={16} /></Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
