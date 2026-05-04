import { Octokit } from "@octokit/rest";

const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;

function getOctokit() {
  if (!process.env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN not set");
  return new Octokit({ auth: process.env.GITHUB_TOKEN });
}

export async function getFileSha(path: string): Promise<string | undefined> {
  try {
    const { data } = await getOctokit().repos.getContent({ owner, repo, path });
    if (!Array.isArray(data) && "sha" in data) return data.sha;
  } catch {}
  return undefined;
}

export async function commitFile(opts: {
  path: string;
  contentBase64: string;
  message: string;
}) {
  const sha = await getFileSha(opts.path);
  await getOctokit().repos.createOrUpdateFileContents({
    owner,
    repo,
    path: opts.path,
    message: opts.message,
    content: opts.contentBase64,
    sha,
  });
}

export async function deleteFile(path: string, message: string) {
  const sha = await getFileSha(path);
  if (!sha) return;
  await getOctokit().repos.deleteFile({ owner, repo, path, message, sha });
}

export function utf8ToBase64(s: string) {
  return Buffer.from(s, "utf-8").toString("base64");
}

// Trigger Vercel rebuild after content/file changes.
// Requires VERCEL_DEPLOY_HOOK_URL env var.
export async function triggerVercelRebuild(): Promise<{ ok: boolean; reason?: string }> {
  const url = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!url) return { ok: false, reason: "VERCEL_DEPLOY_HOOK_URL not set" };
  try {
    const res = await fetch(url, { method: "POST" });
    if (!res.ok) return { ok: false, reason: `hook returned ${res.status}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "hook call failed" };
  }
}
