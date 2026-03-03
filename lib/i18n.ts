export const locales = ["ru", "en"] as const;
export type Lang = typeof locales[number];
export const defaultLocale: Lang = "en";

/**
 * Convert a raw route param (string) into a supported locale.
 * Falls back to {@link defaultLocale} for unknown values.
 */
export function asLang(raw: string | undefined | null): Lang {
  return locales.includes(raw as Lang) ? (raw as Lang) : defaultLocale;
}

export function t(lang: Lang, ru: string, en: string) {
  return lang === "ru" ? ru : en;
}
