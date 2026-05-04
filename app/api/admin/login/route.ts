import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = await req.json();
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "ADMIN_PASSWORD not configured" }, { status: 500 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "비밀번호가 일치하지 않습니다." }, { status: 401 });
  }
  await setAuthCookie();
  return NextResponse.json({ ok: true });
}
