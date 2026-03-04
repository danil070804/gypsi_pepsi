import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Minimal validation
    const name = body.name || null;
    const phone = body.phone || null;
    const comment = body.comment || null;
    const step = body.step || null;

    // For now, just log. Extend to email/DB/webhook as needed.
    console.log("New application:", { name, phone, comment, step });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
