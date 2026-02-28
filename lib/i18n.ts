export const locales = ["ru", "en"] as const;
export type Lang = typeof locales[number];
export const defaultLocale: Lang = "en";

export function t(lang: Lang, ru: string, en: string) {
  return lang === "ru" ? ru : en;
}
