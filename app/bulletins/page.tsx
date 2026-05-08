import Link from "next/link";
import { bulletinsList } from "@/lib/content";
import { toDisplayDate, toWeekLabel } from "@/lib/format";
import BulletinsListClient from "./list-client";

export const revalidate = 600;

export default function BulletinsPage() {
  // Group by normalized date (digits only) desc
  const norm = (d: string) => d.replace(/[^0-9]/g, "");
  const map = new Map<string, typeof bulletinsList.items>();
  for (const b of bulletinsList.items) {
    const key = norm(b.date);
    const arr = map.get(key) ?? [];
    arr.push(b);
    map.set(key, arr);
  }
  for (const arr of map.values()) arr.sort((a, b) => a.id.localeCompare(b.id));
  const groups = Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, items]) => ({
      date: key,
      displayDate: toDisplayDate(key),
      weekLabel: toWeekLabel(key),
      items,
    }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#2d6a4f] font-bold">
            <span className="text-base">←</span>
            <span>홈으로</span>
          </Link>
          <Link href="/" className="font-bold text-[#1b4332] text-lg">광염교회</Link>
          <span className="w-16" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">Bulletin Archive</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">주보 목록</h1>
          <div className="w-12 h-1 bg-[#40916c] mx-auto mt-5" />
          <p className="text-sm text-gray-500 mt-4">전체 {groups.length}주 · {bulletinsList.items.length}장</p>
        </div>

        {groups.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
            <p className="text-gray-500">아직 등록된 주보가 없습니다.</p>
          </div>
        ) : (
          <BulletinsListClient groups={groups} />
        )}
      </main>
    </div>
  );
}
