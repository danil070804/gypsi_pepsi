import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const base = process.env.AUTH_URL || "http://localhost:3000";

  const staticPaths = [
    "", "/about", "/services", "/contact", "/blog", "/privacy", "/cookies",
  ];

  const [services, posts] = await Promise.all([
    prisma.service.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({ where: { isPublished: true }, select: { slugRu: true, slugEn: true, updatedAt: true } }),
  ]);

  const items: any[] = [];

  for (const lang of ["ru", "en"] as const) {
    for (const p of staticPaths) {
      items.push({
        url: `${base}/${lang}${p}`,
        lastModified: new Date(),
      });
    }

    for (const s of services) {
      items.push({
        url: `${base}/${lang}/services/${s.slug}`,
        lastModified: s.updatedAt,
      });
    }

    for (const post of posts) {
      const slug = lang === "ru" ? post.slugRu : post.slugEn;
      items.push({
        url: `${base}/${lang}/blog/${slug}`,
        lastModified: post.updatedAt,
      });
    }
  }

  return items;
}
