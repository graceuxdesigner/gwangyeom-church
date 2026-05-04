"use client";

import { useState } from "react";
import type { Bulletin, SiteContent } from "@/lib/content";

type Props = {
  authedInitially: boolean;
  initialContent: SiteContent;
  initialBulletins: Bulletin[];
};

export default function AdminClient({ authedInitially, initialContent, initialBulletins }: Props) {
  const [authed, setAuthed] = useState(authedInitially);
  const [tab, setTab] = useState<"text" | "bulletin">("text");

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1b4332] text-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#74c69d] tracking-widest mb-1">ADMIN</p>
            <h1 className="text-xl font-bold">광염교회 사이트 관리</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-[#b7e4c7] hover:text-white">사이트 보기 →</a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 flex gap-1">
          {[
            { key: "text", label: "📝 텍스트 편집" },
            { key: "bulletin", label: "📄 주보 관리" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={`px-5 py-3 text-sm font-medium rounded-t-lg ${
                tab === t.key ? "bg-gray-50 text-[#1b4332]" : "text-white/70 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {tab === "text" && <TextEditor initial={initialContent} />}
        {tab === "bulletin" && <BulletinManager initial={initialBulletins} />}
      </main>
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setBusy(false);
    if (r.ok) onSuccess();
    else {
      const j = await r.json().catch(() => ({}));
      setErr(j.error ?? "로그인 실패");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm">
        <p className="text-xs text-[#40916c] tracking-widest mb-2">ADMIN</p>
        <h1 className="text-xl font-bold text-gray-900 mb-6">광염교회 관리자 로그인</h1>
        <input
          type="password"
          autoFocus
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2d6a4f] text-base"
        />
        {err && <p className="text-red-600 text-sm mt-3">{err}</p>}
        <button
          type="submit"
          disabled={busy || !pw}
          className="w-full mt-4 bg-[#2d6a4f] text-white py-3 rounded-lg font-semibold hover:bg-[#1b4332] disabled:opacity-50 transition-colors"
        >
          {busy ? "확인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 mb-5">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#40916c] rounded-full" />
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs text-gray-500 font-medium mb-1 block">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40916c] text-sm"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40916c] text-sm"
        />
      )}
    </label>
  );
}

function TextEditor({ initial }: { initial: SiteContent }) {
  const [c, setC] = useState<SiteContent>(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function save() {
    setBusy(true);
    setMsg("");
    const r = await fetch("/api/admin/save-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(c),
    });
    setBusy(false);
    if (r.ok) {
      setMsg("✅ 저장 완료. 약 30초 뒤 사이트에 반영됩니다.");
    } else {
      const j = await r.json().catch(() => ({}));
      setMsg(`⚠️ 저장 실패: ${j.error ?? "unknown"}`);
    }
  }

  function patch<K extends keyof SiteContent>(key: K, val: SiteContent[K]) {
    setC({ ...c, [key]: val });
  }

  return (
    <div>
      <Section title="히어로 (메인 배너)">
        <Field label="작은 영문 라벨" value={c.hero.subtitle} onChange={(v) => patch("hero", { ...c.hero, subtitle: v })} />
        <Field label="제목 1줄" value={c.hero.title_line1} onChange={(v) => patch("hero", { ...c.hero, title_line1: v })} />
        <Field label="제목 2줄" value={c.hero.title_line2} onChange={(v) => patch("hero", { ...c.hero, title_line2: v })} />
        <Field label="태그라인" value={c.hero.tagline} onChange={(v) => patch("hero", { ...c.hero, tagline: v })} />
      </Section>

      <Section title="교회 소개">
        <Field label="제목" value={c.about.title} onChange={(v) => patch("about", { ...c.about, title: v })} />
        <Field label="소개 1단락" multiline value={c.about.paragraph1} onChange={(v) => patch("about", { ...c.about, paragraph1: v })} />
        <Field label="소개 2단락" multiline value={c.about.paragraph2} onChange={(v) => patch("about", { ...c.about, paragraph2: v })} />
      </Section>

      <Section title="핵심 가치 3개">
        {c.core_values.map((v, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3 border-b border-gray-100 last:border-0">
            <Field
              label={`${v.num} 제목`}
              value={v.title}
              onChange={(val) => {
                const next = [...c.core_values];
                next[i] = { ...next[i], title: val };
                patch("core_values", next);
              }}
            />
            <Field
              label={`${v.num} 설명`}
              value={v.desc}
              onChange={(val) => {
                const next = [...c.core_values];
                next[i] = { ...next[i], desc: val };
                patch("core_values", next);
              }}
            />
          </div>
        ))}
      </Section>

      <Section title="온라인 헌금 안내">
        <Field label="계좌" value={c.offering.bank} onChange={(v) => patch("offering", { ...c.offering, bank: v })} />
        <Field label="예금주" value={c.offering.holder} onChange={(v) => patch("offering", { ...c.offering, holder: v })} />
        <Field label="안내 문구" value={c.offering.guide} onChange={(v) => patch("offering", { ...c.offering, guide: v })} />
        <Field label="입금 양식 라벨" value={c.offering.format_label} onChange={(v) => patch("offering", { ...c.offering, format_label: v })} />
        <Field label="입금 양식 예시" value={c.offering.format_example} onChange={(v) => patch("offering", { ...c.offering, format_example: v })} />
      </Section>

      <Section title="섬기는 분들">
        <Field label="담임목사 이름" value={c.staff.pastor_name} onChange={(v) => patch("staff", { ...c.staff, pastor_name: v })} />
        <Field label="시무장로 (쉼표로 구분)" value={c.staff.elders.join(", ")} onChange={(v) => patch("staff", { ...c.staff, elders: v.split(",").map((s) => s.trim()).filter(Boolean) })} />
        {c.staff.ministers.map((m, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <Field label="부교역자 이름" value={m.name} onChange={(val) => {
              const next = [...c.staff.ministers]; next[i] = { ...next[i], name: val };
              patch("staff", { ...c.staff, ministers: next });
            }} />
            <Field label="담당" value={m.role} onChange={(val) => {
              const next = [...c.staff.ministers]; next[i] = { ...next[i], role: val };
              patch("staff", { ...c.staff, ministers: next });
            }} />
          </div>
        ))}
      </Section>

      <Section title="오시는 길">
        <Field label="주소" value={c.location.address} onChange={(v) => patch("location", { ...c.location, address: v })} />
        <Field label="전화번호" value={c.location.tel} onChange={(v) => patch("location", { ...c.location, tel: v })} />
        <Field label="팩스" value={c.location.fax} onChange={(v) => patch("location", { ...c.location, fax: v })} />
      </Section>

      <Section title="유튜브 (영상 자동 갱신 폴백 ID)">
        <Field label="비디오 ID (RSS 실패 시 사용)" value={c.media.video_id} onChange={(v) => patch("media", { ...c.media, video_id: v })} />
      </Section>

      <div className="sticky bottom-4 mt-8 flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-lg p-4">
        <p className={`text-sm ${msg.startsWith("✅") ? "text-[#2d6a4f]" : msg ? "text-red-600" : "text-gray-500"}`}>
          {msg || "수정 후 저장하면 GitHub에 자동 커밋됩니다."}
        </p>
        <button
          onClick={save}
          disabled={busy}
          className="bg-[#2d6a4f] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#1b4332] disabled:opacity-50 transition-colors"
        >
          {busy ? "저장 중..." : "💾 저장"}
        </button>
      </div>
    </div>
  );
}

function BulletinManager({ initial }: { initial: Bulletin[] }) {
  const [items, setItems] = useState<Bulletin[]>(initial);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !date || !title) return;
    setBusy(true);
    setMsg("");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("date", date);
    fd.append("title", title);
    const r = await fetch("/api/admin/upload-bulletin", { method: "POST", body: fd });
    setBusy(false);
    if (r.ok) {
      const j = await r.json();
      setItems([j.item, ...items]);
      setDate(""); setTitle(""); setFile(null);
      (document.getElementById("bulletin-file") as HTMLInputElement).value = "";
      setMsg("✅ 업로드 완료. 약 30초 뒤 사이트에 반영됩니다.");
    } else {
      const j = await r.json().catch(() => ({}));
      setMsg(`⚠️ 업로드 실패: ${j.error ?? "unknown"}`);
    }
  }

  async function remove(id: string) {
    if (!confirm("이 주보를 삭제할까요?")) return;
    const r = await fetch("/api/admin/delete-bulletin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (r.ok) {
      setItems(items.filter((b) => b.id !== id));
      setMsg("✅ 삭제 완료. 약 30초 뒤 사이트에 반영됩니다.");
    } else {
      const j = await r.json().catch(() => ({}));
      setMsg(`⚠️ 삭제 실패: ${j.error ?? "unknown"}`);
    }
  }

  return (
    <div>
      <Section title="📤 새 주보 업로드 (PDF 또는 이미지)">
        <form onSubmit={upload} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Field label="주일 날짜 (예: 2025.04.27)" value={date} onChange={setDate} />
          <Field label="주보 제목 (예: 4월 4주차 주보)" value={title} onChange={setTitle} />
          <label className="block">
            <span className="text-xs text-gray-500 font-medium mb-1 block">파일 (PDF/JPG/PNG)</span>
            <input
              id="bulletin-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm py-1.5"
            />
          </label>
        </form>
        <button
          onClick={(e) => upload(e as unknown as React.FormEvent)}
          disabled={busy || !file || !date || !title}
          className="mt-3 bg-[#2d6a4f] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#1b4332] disabled:opacity-50 transition-colors"
        >
          {busy ? "업로드 중..." : "📤 업로드"}
        </button>
        {msg && <p className={`text-sm mt-3 ${msg.startsWith("✅") ? "text-[#2d6a4f]" : "text-red-600"}`}>{msg}</p>}
      </Section>

      <Section title={`📂 등록된 주보 (${items.length}건)`}>
        {items.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">아직 등록된 주보가 없습니다.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((b) => (
              <div key={b.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#d8f3dc] text-[#2d6a4f] font-medium shrink-0">{b.date}</span>
                  <span className="text-gray-800 font-medium truncate">{b.title}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2d6a4f] font-medium hover:underline">미리보기</a>
                  <button onClick={() => remove(b.id)} className="text-sm text-red-600 hover:underline">삭제</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
