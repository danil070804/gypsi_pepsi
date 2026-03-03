export function normalizeWhatsApp(value?: string | null) {
  if (!value) return null;
  const digits = value.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

export function normalizeTelegram(value?: string | null) {
  if (!value) return null;
  if (value.startsWith("http")) return value;
  const username = value.replace("@", "");
  return `https://t.me/${username}`;
}

export function normalizeInstagram(value?: string | null) {
  if (!value) return null;
  if (value.startsWith("http")) return value;
  const username = value.replace("@", "");
  return `https://instagram.com/${username}`;
}

export const normalizeWhatsapp = normalizeWhatsApp;
