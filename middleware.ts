import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const locales = ["ru", "en"];
const defaultLocale = "en";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin protection (except login and auth routes)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Allow next-auth endpoints
    if (pathname.startsWith("/api/auth")) return NextResponse.next();

    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Skip internal paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/admin")
  ) return NextResponse.next();

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
