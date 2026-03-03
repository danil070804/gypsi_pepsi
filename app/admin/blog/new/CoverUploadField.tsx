"use client";

import UploadWidget from "@/components/admin/UploadWidget";

/**
 * Small client wrapper so we don't pass event handlers from a Server Component to a Client Component.
 * Next.js App Router forbids serializing functions across the server/client boundary.
 */
export default function CoverUploadField({
  inputName = "coverImageUrl",
}: {
  inputName?: string;
}) {
  return (
    <UploadWidget
      onUploaded={(url) => {
        const el = document.querySelector(
          `input[name="${inputName}"]`
        ) as HTMLInputElement | null;
        if (el) el.value = url;
      }}
    />
  );
}
