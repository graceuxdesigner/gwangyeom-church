"use client";

import type { Bulletin } from "@/lib/content";

type Group = {
  date: string;
  displayDate: string;
  weekLabel: string;
  items: Bulletin[];
};

function downloadFiles(items: Bulletin[]) {
  items.forEach((b, i) => {
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = b.url;
      a.download = b.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, i * 250);
  });
}

export default function BulletinsListClient({ groups }: { groups: Group[] }) {
  return (
    <div className="space-y-4">
      {groups.map((g, idx) => (
        <div
          key={g.date}
          className="bg-white rounded-xl border border-gray-100 hover:border-[#b7e4c7] hover:shadow-sm transition-all p-6"
        >
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#2d6a4f] bg-[#d8f3dc] px-2.5 py-1 rounded-full">
                  {g.weekLabel}
                </span>
                {idx === 0 && (
                  <span className="text-xs font-bold text-white bg-[#1b4332] px-2.5 py-1 rounded-full">
                    최신
                  </span>
                )}
              </div>
              <p className="text-lg font-bold text-gray-900">{g.items[0].title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{g.displayDate}</p>
            </div>
            <button
              onClick={() => downloadFiles(g.items)}
              className="inline-flex items-center gap-1.5 bg-[#2d6a4f] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1b4332] transition-colors shrink-0"
            >
              ⬇ {g.items.length > 1 ? `전체 다운로드 (${g.items.length}장)` : "다운로드"}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {g.items.map((b, i) => {
              const label = g.items.length > 1 ? (i === 0 ? "앞면" : i === 1 ? "뒷면" : `${i + 1}장`) : "주보";
              return (
                <a
                  key={b.id}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-lg hover:bg-[#d8f3dc] hover:text-[#2d6a4f] border border-gray-100 transition-colors"
                >
                  📄 {label} 미리보기
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
