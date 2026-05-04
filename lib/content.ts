import contentJson from "@/data/content.json";
import bulletinsJson from "@/data/bulletins.json";

export type SiteContent = {
  hero: { subtitle: string; title_line1: string; title_line2: string; tagline: string };
  about: { title: string; paragraph1: string; paragraph2: string };
  core_values: { num: string; title: string; desc: string }[];
  offering: { bank: string; holder: string; guide: string; format_label: string; format_example: string };
  bulletin: { date: string; label: string };
  media: { video_id: string };
  staff: { pastor_name: string; elders: string[]; ministers: { name: string; role: string }[] };
  location: { address: string; tel: string; fax: string };
};

export type Bulletin = {
  id: string;
  date: string;
  title: string;
  filename: string;
  url: string;
  uploaded_at: string;
};

export type BulletinsFile = { items: Bulletin[] };

export const siteContent = contentJson as SiteContent;
export const bulletinsList = bulletinsJson as BulletinsFile;
