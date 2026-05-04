import AdminClient from "./admin-client";
import { siteContent, bulletinsList } from "@/lib/content";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditPage() {
  const authed = await isAuthenticated();
  return (
    <AdminClient
      authedInitially={authed}
      initialContent={siteContent}
      initialBulletins={bulletinsList.items}
    />
  );
}
