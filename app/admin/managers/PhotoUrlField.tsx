'use client';

import UploadUrlField from "@/components/admin/UploadUrlField";

export default function PhotoUrlField({
  defaultValue = "",
  label = "Photo URL (or upload)",
  placeholder = "/uploads/...",
}: {
  defaultValue?: string;
  label?: string;
  placeholder?: string;
}) {
  return (
    <UploadUrlField
      id="photoUrl"
      name="photoUrl"
      label={label}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
}
