import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { commitFile, deleteFile, triggerVercelRebuild, utf8ToBase64 } from "@/lib/github";
import { bulletinsList } from "@/lib/content";

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  const target = bulletinsList.items.find((b) => b.id === id);
  if (!target) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  try {
    await deleteFile(`public/bulletins/${target.filename}`, `admin: delete bulletin ${target.date}`);
    const updated = { items: bulletinsList.items.filter((b) => b.id !== id) };
    await commitFile({
      path: "data/bulletins.json",
      contentBase64: utf8ToBase64(JSON.stringify(updated, null, 2) + "\n"),
      message: `admin: unregister bulletin ${target.date}`,
    });
    const trig = await triggerVercelRebuild();
    return NextResponse.json({ ok: true, rebuild: trig });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "delete failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
