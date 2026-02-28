import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
  const token = await getToken({ req: req as any, secret: process.env.AUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const ids: string[] = body?.ids;
  if (!Array.isArray(ids) || ids.length === 0) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  await prisma.$transaction(ids.map((id, idx) => prisma.service.update({ where: { id }, data: { sortOrder: idx } })));
  return NextResponse.json({ ok: true });
}
