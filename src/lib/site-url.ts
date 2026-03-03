export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.AUTH_URL ||
    "https://gypseyemployment.com";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
