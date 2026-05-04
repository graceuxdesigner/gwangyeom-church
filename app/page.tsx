import HomeView from "./home-view";
import { siteContent, bulletinsList } from "@/lib/content";
import { fetchLatestWorshipVideo } from "@/lib/youtube";

export const revalidate = 3600;

export default async function Home() {
  const latest = await fetchLatestWorshipVideo(siteContent.media.video_id);
  return (
    <HomeView
      content={siteContent}
      videoId={latest.id}
      bulletins={bulletinsList.items}
    />
  );
}
