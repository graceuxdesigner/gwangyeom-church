const CHANNEL_ID = "UCnGnnROtoAZIqXXo5G2OFIw";
const RSS = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export type LatestVideo = { id: string; title: string; published: string };

// Fetch the channel's most recent video (no keyword filter).
// Tries XML feed → r.jina.ai proxy as fallback (avoids rate limits / region blocks).
export async function fetchLatestWorshipVideo(fallbackId: string): Promise<LatestVideo> {
  const sources = [
    RSS,
    `https://r.jina.ai/${RSS}`,
  ];
  for (const url of sources) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 600 },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
          "Accept": "application/atom+xml,application/xml,text/xml,*/*",
        },
      });
      if (!res.ok) continue;
      const text = await res.text();
      const firstEntry = text.split("<entry>")[1];
      if (!firstEntry) continue;
      const id = firstEntry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = firstEntry.match(/<title>([^<]+)<\/title>/)?.[1];
      const published = firstEntry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (!id) continue;
      return { id, title: title ?? "", published: published ?? "" };
    } catch {
      continue;
    }
  }
  return { id: fallbackId, title: "", published: "" };
}
