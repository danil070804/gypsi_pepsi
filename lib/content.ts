import { prisma } from "./prisma";
import type { Lang } from "./i18n";

export async function getPageByKey(key: string) {
  return prisma.page.findUnique({ where: { key } });
}

export function pickLang<T>(lang: Lang, obj: any): T {
  return (obj?.[lang] ?? obj?.en ?? obj?.ru ?? []) as T;
}
