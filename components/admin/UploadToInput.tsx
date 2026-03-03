"use client";

import UploadWidget from "@/components/admin/UploadWidget";

export default function UploadToInput({ inputName }: { inputName: string }) {
  return (
    <UploadWidget
      onUploaded={(url) => {
        const el = document.querySelector(`input[name="${inputName}"]`) as HTMLInputElement | null;
        if (el) el.value = url;
      }}
    />
  );
}
