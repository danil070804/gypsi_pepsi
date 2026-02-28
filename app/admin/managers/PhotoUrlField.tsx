'use client';

import { useState } from "react";
import { Field, Input } from "@/components/admin/Form";
import UploadWidget from "@/components/admin/UploadWidget";

export default function PhotoUrlField({
  defaultValue = "",
  label = "Photo URL (or upload)",
  placeholder = "/uploads/...",
}: {
  defaultValue?: string;
  label?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <div className="space-y-2">
      <Field label={label}>
        <Input
          id="photoUrl"
          name="photoUrl"
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>

      <UploadWidget
        onUploaded={(url) => {
          setValue(url);
        }}
      />
    </div>
  );
}
