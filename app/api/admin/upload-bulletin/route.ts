import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { commitFile, triggerVercelRebuild, utf8ToBase64 } from "@/lib/github";
import { bulletinsList, type Bulletin } from "@/lib/content";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED = new Set(["pdf", "jpg", "jpeg", "png", "webp"]);

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const date = String(form.get("date") ?? "");
  const title = String(form.get("title") ?? "");
  const files = form.getAll("file").filter((v): v is File => v instanceof File);

  if (!date || !title || files.length === 0) {
    return NextResponse.json({ ok: false, error: "date/title/file required" }, { status: 400 });
  }

  try {
    const newItems: Bulletin[] = [];
    let counter = 0;
    for (const file of files) {
      const ext = (file.name.split(".").pop() ?? "pdf").toLowerCase();
      const safeExt = ALLOWED.has(ext) ? ext : "pdf";
      counter += 1;
      const id = `${date.replace(/[^0-9]/g, "")}-${Date.now()}-${counter}`;
      const filename = `${id}.${safeExt}`;
      const repoPath = `public/bulletins/${filename}`;

      const buf = Buffer.from(await file.arrayBuffer());
      await commitFile({
        path: repoPath,
        contentBase64: buf.toString("base64"),
        message: `admin: upload bulletin ${date} (${counter}/${files.length})`,
      });

      newItems.push({
        id,
        date,
        title: files.length > 1 ? `${title} (${counter})` : title,
        filename,
        url: `/bulletins/${filename}`,
        uploaded_at: new Date().toISOString(),
      });
    }

    const updated = { items: [...newItems, ...bulletinsList.items] };
    await commitFile({
      path: "data/bulletins.json",
      contentBase64: utf8ToBase64(JSON.stringify(updated, null, 2) + "\n"),
      message: `admin: register ${files.length} bulletin(s) ${date}`,
    });

    const trig = await triggerVercelRebuild();
    return NextResponse.json({ ok: true, items: newItems, rebuild: trig });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "upload failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
