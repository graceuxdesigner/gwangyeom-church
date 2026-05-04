import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { commitFile, utf8ToBase64 } from "@/lib/github";

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  try {
    await commitFile({
      path: "data/content.json",
      contentBase64: utf8ToBase64(JSON.stringify(body, null, 2) + "\n"),
      message: "admin: update content",
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "save failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
