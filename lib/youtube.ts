const CHANNEL_ID = "UCnGnnROtoAZIqXXo5G2OFIw";
const RSS = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export type LatestVideo = { id: string; title: string; published: string };

// Fetch latest video whose title contains "예배"
export async function fetchLatestWorshipVideo(fallbackId: string): Promise<LatestVideo> {
  try {
    const res = await fetch(RSS, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("fetch failed");
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    for (const entry of entries) {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (id && title && title.includes("예배")) {
        return { id, title, published: published ?? "" };
      }
    }
    throw new Error("no matching video");
  } catch {
    return { id: fallbackId, title: "", published: "" };
  }
}
