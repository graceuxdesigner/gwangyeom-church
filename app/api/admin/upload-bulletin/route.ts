import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { commitFile, triggerVercelRebuild, utf8ToBase64 } from "@/lib/github";
import { bulletinsList, type Bulletin } from "@/lib/content";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED = new Set(["pdf", "jpg", "jpeg", "png", "webp"]);

function sanitizeBasename(name: string): string {
  // Strip extension, replace unsafe chars with underscore. Keep ascii alnum, dot, dash, underscore, Korean.
  const noExt = name.replace(/\.[^.]+$/, "");
  return noExt.replace(/[^\p{L}\p{N}._-]/gu, "_").slice(0, 80) || "file";
}

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
    const savedItems: Bulletin[] = [];
    let counter = 0;
    // Start from current items list (we'll mutate by replacing same-filename entries)
    let nextItems = [...bulletinsList.items];

    for (const file of files) {
      const ext = (file.name.split(".").pop() ?? "pdf").toLowerCase();
      const safeExt = ALLOWED.has(ext) ? ext : "pdf";
      counter += 1;
      const baseName = sanitizeBasename(file.name);
      const filename = `${baseName}.${safeExt}`;
      const repoPath = `public/bulletins/${filename}`;
      const id = filename; // deterministic id = filename

      const buf = Buffer.from(await file.arrayBuffer());
      await commitFile({
        path: repoPath,
        contentBase64: buf.toString("base64"),
        message: `admin: ${nextItems.find((b) => b.filename === filename) ? "overwrite" : "upload"} bulletin ${date} (${counter}/${files.length})`,
      });

      const entry: Bulletin = {
        id,
        date,
        title: files.length > 1 ? `${title} (${counter})` : title,
        filename,
        url: `/bulletins/${filename}`,
        uploaded_at: new Date().toISOString(),
      };

      // remove any existing entry with same filename, then prepend new one
      nextItems = [entry, ...nextItems.filter((b) => b.filename !== filename)];
      savedItems.push(entry);
    }

    const updated = { items: nextItems };
    await commitFile({
      path: "data/bulletins.json",
      contentBase64: utf8ToBase64(JSON.stringify(updated, null, 2) + "\n"),
      message: `admin: register ${files.length} bulletin(s) ${date}`,
    });

    const trig = await triggerVercelRebuild();
    return NextResponse.json({ ok: true, items: savedItems, rebuild: trig });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "upload failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
