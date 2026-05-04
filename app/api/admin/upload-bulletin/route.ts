import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { commitFile, utf8ToBase64 } from "@/lib/github";
import { bulletinsList, type Bulletin } from "@/lib/content";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const date = String(form.get("date") ?? "");
  const title = String(form.get("title") ?? "");

  if (!file || !date || !title) {
    return NextResponse.json({ ok: false, error: "file/date/title required" }, { status: 400 });
  }

  // sanitize filename
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "pdf";
  const safeExt = ["pdf", "jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "pdf";
  const id = `${date.replace(/[^0-9]/g, "")}-${Date.now()}`;
  const filename = `${id}.${safeExt}`;
  const repoPath = `public/bulletins/${filename}`;

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const contentBase64 = buf.toString("base64");

    // 1) commit the file
    await commitFile({
      path: repoPath,
      contentBase64,
      message: `admin: upload bulletin ${date}`,
    });

    // 2) update bulletins.json (prepend)
    const newItem: Bulletin = {
      id,
      date,
      title,
      filename,
      url: `/bulletins/${filename}`,
      uploaded_at: new Date().toISOString(),
    };
    const updated = { items: [newItem, ...bulletinsList.items] };
    await commitFile({
      path: "data/bulletins.json",
      contentBase64: utf8ToBase64(JSON.stringify(updated, null, 2) + "\n"),
      message: `admin: register bulletin ${date}`,
    });

    return NextResponse.json({ ok: true, item: newItem });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "upload failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
