"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { SiteContent, Bulletin } from "@/lib/content";

const NAV_ITEMS = [
  { label: "교회소개", href: "#about" },
  { label: "예배안내", href: "#worship" },
  { label: "섬기는 분들", href: "#staff" },
  { label: "오시는 길", href: "#location" },
];

const WORSHIP_SCHEDULE = [
  { name: "주일예배 1부", time: "주일 오전 9:00", badge: "주일" },
  { name: "주일예배 2부", time: "주일 오전 11:00", badge: "주일" },
  { name: "주일찬양예배", time: "주일 오후 2:00", badge: "주일" },
  { name: "수요저녁예배", time: "수요 오후 7:30", badge: "주중" },
  { name: "새벽기도회", time: "월~금 오전 5:00", badge: "주중" },
  { name: "금요기도회", time: "금요 오후 9:00", badge: "주중" },
];

const MINISTRY_SCHEDULE = [
  { name: "유초등부", time: "주일 오전 11:00" },
  { name: "중고등부", time: "주일 오후 3:00" },
  { name: "청년부", time: "주일 오후 3:00" },
  { name: "목장모임", time: "각 목장별" },
];

const Icons = {
  bulletin: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="14" y2="17" /></svg>),
  clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
  pin: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
  play: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M8 5v14l11-7z" /></svg>),
  download: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>),
  youtube: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>),
};

const QUICK_MENU = [
  { icon: Icons.bulletin, label: "주보", href: "#bulletin" },
  { icon: Icons.clock, label: "예배시간", href: "#worship" },
  { icon: Icons.play, label: "유튜브", href: "https://www.youtube.com/@%EA%B4%91%EC%97%BC%EA%B5%90%ED%9A%8C-%EC%98%A4%EC%A0%84%EB%8F%99" },
  { icon: Icons.pin, label: "오시는 길", href: "#location" },
];

type Props = {
  content: SiteContent;
  videoId: string;
  bulletins: Bulletin[];
};

export default function HomeView({ content, videoId, bulletins }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const recentBulletins = bulletins.slice(0, 2);
  const latestBulletin = bulletins[0];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-18 py-3">
            <a href="#" className="flex items-center gap-3 shrink-0">
              <div className="w-11 h-11 relative shrink-0">
                <Image src="/images/logo.jpeg" alt="광염교회 로고" fill className="object-contain" priority />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 leading-none mb-1">대한예수교장로회</p>
                <p className="font-bold text-[#1b4332] text-xl leading-none">광염교회</p>
              </div>
            </a>
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item, i) => (
                <a key={i} href={item.href} className="px-5 py-5 text-gray-700 hover:text-[#2d6a4f] font-medium text-sm transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
            <button className="lg:hidden p-2 flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-4">
            {NAV_ITEMS.map((item, i) => (
              <a key={i} href={item.href} className="block py-3 text-gray-700 hover:text-[#2d6a4f] font-medium border-b border-gray-50 last:border-0" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-[72px] relative h-screen min-h-[560px] max-h-[760px] overflow-hidden">
        <div className="absolute inset-x-0 top-[72px] bottom-0">
          <Image src="/images/church-main.png" alt="광염교회" fill priority className="object-cover object-[20%_top] md:object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/55 to-black/45 md:bg-gradient-to-r md:from-black/65 md:via-black/40 md:to-black/10" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <p className="text-[#74c69d] text-sm font-semibold tracking-[0.2em] uppercase mb-4 drop-shadow">{content.hero.subtitle}</p>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                {content.hero.title_line1}<br />{content.hero.title_line2}
              </h1>
              <p className="text-white/90 text-lg mb-10 drop-shadow">{content.hero.tagline}</p>
              <div className="flex flex-wrap gap-3">
                <a href="#worship" className="bg-white text-[#2d6a4f] px-7 py-3 rounded font-semibold text-sm hover:bg-[#d8f3dc] transition-colors">예배 안내</a>
                <a href="#about" className="border border-white/70 text-white px-7 py-3 rounded font-semibold text-sm hover:bg-white/10 transition-colors backdrop-blur-sm">교회 소개</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">About Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{content.about.title}</h2>
              <div className="w-12 h-1 bg-[#40916c] mb-8" />
              <p className="text-gray-600 leading-relaxed mb-5">{content.about.paragraph1}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{content.about.paragraph2}</p>
              <a href="#staff" className="inline-flex items-center gap-2 text-[#2d6a4f] font-semibold text-sm border-b-2 border-[#2d6a4f] pb-0.5 hover:text-[#1b4332] hover:border-[#1b4332] transition-colors">
                섬기는 분들 보기 →
              </a>
            </div>
            <div className="space-y-4">
              {content.core_values.map((v, i) => (
                <div key={i} className="flex items-start gap-5 p-5 border border-gray-100 rounded-lg hover:border-[#b7e4c7] hover:bg-[#f9fefb] transition-all group">
                  <span className="text-2xl font-bold text-[#b7e4c7] group-hover:text-[#40916c] transition-colors shrink-0">{v.num}</span>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">{v.title}</p>
                    <p className="text-sm text-gray-500">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Worship */}
      <section id="worship" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">Worship</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">예배 안내</h2>
            <div className="w-12 h-1 bg-[#40916c] mx-auto mt-5" />
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 px-7 py-5 border-b border-gray-100">
                <div className="w-1 h-6 bg-[#2d6a4f] rounded-full" />
                <h3 className="font-bold text-gray-900">주요 예배</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {WORSHIP_SCHEDULE.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-7 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.badge === "주일" ? "bg-[#d8f3dc] text-[#2d6a4f]" : "bg-gray-100 text-gray-500"}`}>{item.badge}</span>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    <span className="text-[#40916c] font-semibold text-sm">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 px-7 py-5 border-b border-gray-100">
                  <div className="w-1 h-6 bg-[#40916c] rounded-full" />
                  <h3 className="font-bold text-gray-900">부서 모임</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {MINISTRY_SCHEDULE.map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-7 py-4 hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-[#40916c] font-semibold text-sm">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div id="offering" className="bg-[#2d6a4f] rounded-xl overflow-hidden text-white scroll-mt-24">
                <div className="flex items-stretch">
                  <div className="bg-[#1b4332] px-5 flex items-center justify-center shrink-0">
                    <p className="font-bold text-sm leading-tight text-center">온라인<br />헌금안내</p>
                  </div>
                  <div className="px-6 py-5 flex-1">
                    <p className="font-bold text-base mb-1">{content.offering.bank}</p>
                    <p className="text-[#b7e4c7] text-xs mb-3">{content.offering.holder}</p>
                    <p className="text-white/90 text-xs leading-relaxed border-t border-white/15 pt-3">
                      {content.offering.guide}<br />
                      <span className="font-semibold">{content.offering.format_label}</span>{" "}
                      <span className="text-white/60">{content.offering.format_example}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section id="staff" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Staff</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">섬기는 분들</h2>
            <div className="w-12 h-1 bg-[#40916c] mx-auto mt-5" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 hover:border-[#b7e4c7] hover:shadow-md transition-all self-start">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 ring-2 ring-[#b7e4c7] relative">
                <Image src="/images/pastor.jpg" alt={`담임목사 ${content.staff.pastor_name}`} fill sizes="80px" className="object-cover object-[center_35%] scale-[1.8]" />
              </div>
              <p className="text-[#40916c] text-xs font-bold tracking-widest uppercase mb-2">담임목사</p>
              <p className="text-2xl font-bold text-gray-900">{content.staff.pastor_name}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 hover:border-[#b7e4c7] hover:shadow-md transition-all self-start">
              <p className="text-[#40916c] text-xs font-bold tracking-widest uppercase mb-3">시무장로</p>
              <div className="space-y-1">
                {content.staff.elders.map((name) => (
                  <p key={name} className="font-bold text-gray-900">{name}</p>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 hover:border-[#b7e4c7] hover:shadow-md transition-all self-start">
              <p className="text-[#40916c] text-xs font-bold tracking-widest uppercase mb-3">부교역자</p>
              {content.staff.ministers.map((m) => (
                <div key={m.name}>
                  <p className="text-xl font-bold text-gray-900">{m.name}</p>
                  <p className="text-gray-400 text-xs mt-1">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bulletin */}
      <section id="bulletin" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">Bulletin</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">이번 주 주보</h2>
            <div className="w-12 h-1 bg-[#40916c] mx-auto mt-5" />
            {latestBulletin && <p className="text-sm text-gray-500 mt-4">{latestBulletin.date}</p>}
          </div>
          {recentBulletins.length === 0 ? (
            <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-100 p-12 text-center">
              <div className="w-12 h-12 mx-auto mb-3 text-gray-300">{Icons.bulletin}</div>
              <p className="text-gray-500">아직 등록된 주보가 없습니다.</p>
            </div>
          ) : (
            <div className={`grid ${recentBulletins.length > 1 ? "md:grid-cols-2" : ""} gap-6 max-w-4xl mx-auto`}>
              {recentBulletins.map((b) => {
                const isImage = /\.(jpe?g|png|webp)$/i.test(b.filename);
                return (
                  <div key={b.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#b7e4c7] hover:shadow-lg transition-all group">
                    <div className="aspect-[3/4] bg-gradient-to-br from-[#d8f3dc] via-[#b7e4c7] to-[#74c69d] relative">
                      {isImage ? (
                        <Image src={b.url} alt={b.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#1b4332]">
                          <p className="text-xs font-bold tracking-widest uppercase mb-2">광염교회 주보</p>
                          <p className="text-3xl font-bold mb-1">{b.date}</p>
                          <p className="text-sm">PDF</p>
                        </div>
                      )}
                    </div>
                    <div className="px-6 py-4">
                      <p className="font-bold text-gray-900 mb-1 truncate">{b.title}</p>
                      <p className="text-xs text-gray-500 mb-3">{b.date}</p>
                      <div className="flex gap-2">
                        <a href={b.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                          미리보기
                        </a>
                        <a href={b.url} download={b.filename} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-[#2d6a4f] text-white rounded-lg font-medium hover:bg-[#1b4332] transition-colors">
                          <span className="w-4 h-4">{Icons.download}</span>다운로드
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Recent Worship Video */}
      <section id="media" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">Media</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">최근 예배 영상</h2>
            <div className="w-12 h-1 bg-[#40916c] mx-auto mt-5" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-black aspect-video">
              <iframe src={`https://www.youtube.com/embed/${videoId}`} title="광염교회 최근 예배 영상" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full h-full" />
            </div>
            <div className="text-center mt-6">
              <a href="https://www.youtube.com/@%EA%B4%91%EC%97%BC%EA%B5%90%ED%9A%8C-%EC%98%A4%EC%A0%84%EB%8F%99" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#2d6a4f] font-semibold text-sm border-b-2 border-[#2d6a4f] pb-0.5 hover:text-[#1b4332] hover:border-[#1b4332] transition-colors">
                광염교회 유튜브 채널에서 더보기 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">Location</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">오시는 길</h2>
            <div className="w-12 h-1 bg-[#40916c] mx-auto mt-5" />
          </div>
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-gray-50 rounded-xl p-7 border border-gray-100">
                <p className="text-xs font-bold text-[#40916c] tracking-widest uppercase mb-4">주소</p>
                <p className="font-bold text-gray-900 text-lg mb-1">광염교회</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{content.location.address}</p>
                <div className="border-t border-gray-200 pt-4 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#40916c] w-10">TEL</span>
                    <a href={`tel:${content.location.tel.replace(/[^0-9]/g, "")}`} className="text-sm text-gray-700 font-medium hover:text-[#2d6a4f]">{content.location.tel}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#40916c] w-10">FAX</span>
                    <span className="text-sm text-gray-700 font-medium">{content.location.fax}</span>
                  </div>
                </div>
              </div>
              <a href="https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%9D%98%EC%99%95%EC%8B%9C%20%EC%9B%90%EA%B3%A8%EB%A1%9C%2023" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#2d6a4f] text-white py-4 rounded-xl font-semibold hover:bg-[#1b4332] transition-colors">
                네이버 지도로 보기 →
              </a>
            </div>
            <div className="lg:col-span-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm h-72 lg:h-auto">
              <iframe src="https://maps.google.com/maps?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%9D%98%EC%99%95%EC%8B%9C%20%EC%9B%90%EA%B3%A8%EB%A1%9C%2023&t=&z=16&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="광염교회 위치" allowFullScreen />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 relative shrink-0 bg-white rounded p-1">
                  <Image src="/images/logo.jpeg" alt="광염교회 로고" fill className="object-contain p-0.5" />
                </div>
                <p className="font-bold text-white text-lg">광염교회</p>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                대한예수교장로회<br />
                담임목사 {content.staff.pastor_name}<br />
                {content.location.address}<br />
                TEL {content.location.tel} · FAX {content.location.fax}
              </p>
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm">바로가기</p>
              <div className="space-y-2">
                {NAV_ITEMS.map((item, i) => (
                  <a key={i} href={item.href} className="block text-sm text-gray-500 hover:text-[#74c69d] transition-colors">{item.label}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm">SNS</p>
              <div className="flex gap-3">
                <a href="https://www.youtube.com/@%EA%B4%91%EC%97%BC%EA%B5%90%ED%9A%8C-%EC%98%A4%EC%A0%84%EB%8F%99" target="_blank" rel="noopener noreferrer" aria-label="유튜브" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors p-2.5">
                  <span className="text-white">{Icons.youtube}</span>
                </a>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-600 pt-8">© 2025 광염교회. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky bottom bar */}
      <nav aria-label="빠른 메뉴" className="fixed bottom-0 left-0 right-0 z-40 bg-[#1b4332] border-t-2 border-[#2d6a4f] shadow-[0_-4px_16px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto grid grid-cols-4">
          {QUICK_MENU.map((item, i) => {
            const isExternal = item.href.startsWith("http");
            return (
              <a key={i} href={item.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!isExternal) {
                    e.preventDefault();
                    const el = document.querySelector(item.href);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="flex flex-col items-center justify-center gap-1.5 py-3 min-h-[68px] text-white hover:bg-[#2d6a4f] active:bg-[#40916c] transition-colors border-r border-white/10 last:border-r-0">
                <span className="w-7 h-7">{item.icon}</span>
                <span className="text-[13px] font-semibold leading-none">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
      <div className="h-[68px]" aria-hidden="true" />
    </div>
  );
}
