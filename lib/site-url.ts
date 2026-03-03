export const DEFAULT_SITE_URL = "https://gypseyemployment.com";

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.AUTH_URL ||
    process.env.NEXTAUTH_URL ||
    DEFAULT_SITE_URL
  );
}
