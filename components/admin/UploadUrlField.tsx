"use client";

import { useState } from "react";
import { Field, Input } from "@/components/admin/Form";
import UploadWidget from "@/components/admin/UploadWidget";

export default function UploadUrlField({
  name,
  id,
  label,
  defaultValue = "",
  placeholder = "/uploads/...",
}: {
  name: string;
  id: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="space-y-2">
      <Field label={label}>
        <Input
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>

      <UploadWidget onUploaded={(url) => setValue(url)} />
    </div>
  );
}
