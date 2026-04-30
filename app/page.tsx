"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

const CORE_VALUES = [
  { num: "01", title: "복음의 능력을 가진 교회", desc: "성령의 능력으로 복음을 전하는" },
  { num: "02", title: "다음세대를 세우는 교회", desc: "믿음의 다음세대를 세워가는" },
  { num: "03", title: "사랑으로 하나되는 교회", desc: "그리스도의 사랑으로 하나되는" },
];

// SVG icons
const Icons = {
  bulletin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="14" y2="17" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  give: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <line x1="6" y1="12" x2="6" y2="12.01" />
      <line x1="18" y1="12" x2="18" y2="12.01" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
};

const QUICK_MENU = [
  { icon: Icons.bulletin, label: "이번 주 주보", href: "#bulletin", color: "bg-[#2d6a4f]" },
  { icon: Icons.clock, label: "예배 시간", href: "#worship", color: "bg-[#2d6a4f]" },
  { icon: Icons.pin, label: "오시는 길", href: "#location", color: "bg-[#2d6a4f]" },
  { icon: Icons.play, label: "유튜브 라이브", href: "https://www.youtube.com", color: "bg-[#2d6a4f]" },
  { icon: Icons.give, label: "온라인 헌금", href: "#offering", color: "bg-[#2d6a4f]" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm shadow-sm"
        }`}
      >
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
                <a
                  key={i}
                  href={item.href}
                  className="px-5 py-5 text-gray-700 hover:text-[#2d6a4f] font-medium text-sm transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              className="lg:hidden p-2 flex flex-col gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="메뉴"
            >
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

      {/* Hero - building photo visible */}
      <section className="pt-[72px] relative h-screen min-h-[560px] max-h-[760px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/church-main.png"
            alt="광염교회"
            fill
            priority
            className="object-cover object-top md:object-center"
          />
          {/* lighter overlay so building is visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <p className="text-[#74c69d] text-sm font-semibold tracking-[0.2em] uppercase mb-4 drop-shadow">
                광염교회 · GWANGYEOM CHURCH
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                다음세대의 비전을<br />믿음으로 바라보라
              </h1>
              <p className="text-white/90 text-lg mb-10 drop-shadow">세상의 빛과 소금이 되는 광염교회</p>
              <div className="flex flex-wrap gap-3">
                <a href="#worship" className="bg-white text-[#2d6a4f] px-7 py-3 rounded font-semibold text-sm hover:bg-[#d8f3dc] transition-colors">
                  예배 안내
                </a>
                <a href="#about" className="border border-white/70 text-white px-7 py-3 rounded font-semibold text-sm hover:bg-white/10 transition-colors backdrop-blur-sm">
                  교회 소개
                </a>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">교회 소개</h2>
              <div className="w-12 h-1 bg-[#40916c] mb-8" />
              <p className="text-gray-600 leading-relaxed mb-5">
                1998년 11월에 건축되어, 지금 제2성전 시대를 맞이하고 있습니다. 우리는 하나님의 말씀과 성령의 능력으로 예수의 제자가 되어, 이 땅의 영혼을 구원하는 세계비전을 향해 나아가는 생명공동체입니다.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                성경적인 교회의 본질에 충실한 건강한 교회가 되어 하나님을 기쁘시게 하고, 세상의 빛과 소금이 되어 세상을 구원하고 축복하는 거룩한 공동체가 되는 것입니다.
              </p>
              <a href="#staff" className="inline-flex items-center gap-2 text-[#2d6a4f] font-semibold text-sm border-b-2 border-[#2d6a4f] pb-0.5 hover:text-[#1b4332] hover:border-[#1b4332] transition-colors">
                섬기는 분들 보기 →
              </a>
            </div>
            <div className="space-y-4">
              {CORE_VALUES.map((v, i) => (
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
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        item.badge === "주일" ? "bg-[#d8f3dc] text-[#2d6a4f]" : "bg-gray-100 text-gray-500"
                      }`}>{item.badge}</span>
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
                    <p className="font-bold text-base mb-1">농협 351-1149-3941-23</p>
                    <p className="text-[#b7e4c7] text-xs mb-3">예금주: 광염교회(대한예수교장로회)</p>
                    <p className="text-white/90 text-xs leading-relaxed border-t border-white/15 pt-3">
                      헌금시 입금자명과 헌금명을 꼭 명기해주세요. <br />
                      <span className="font-semibold">이름+헌금종류</span>{" "}
                      <span className="text-white/60">(예: 홍OO 십일조, 홍OO 선교헌금)</span>
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
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 hover:border-[#b7e4c7] transition-all">
              <p className="text-[#40916c] text-xs font-bold tracking-widest uppercase mb-3">담임목사</p>
              <p className="text-2xl font-bold text-gray-900">온성진</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 hover:border-[#b7e4c7] transition-all">
              <p className="text-[#40916c] text-xs font-bold tracking-widest uppercase mb-3">시무장로</p>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">이교호</p>
                <p className="font-bold text-gray-900">윤한용</p>
                <p className="font-bold text-gray-900">주병룡</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 hover:border-[#b7e4c7] transition-all">
              <p className="text-[#40916c] text-xs font-bold tracking-widest uppercase mb-3">부교역자</p>
              <p className="text-xl font-bold text-gray-900">장충일</p>
              <p className="text-gray-400 text-xs mt-1">교육부서</p>
            </div>
          </div>
        </div>
      </section>

      {/* This Week's Bulletin */}
      <section id="bulletin" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">Bulletin</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">이번 주 주보</h2>
            <div className="w-12 h-1 bg-[#40916c] mx-auto mt-5" />
            <p className="text-sm text-gray-500 mt-4">2025년 4월 27일 주일</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <a href="#" className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#b7e4c7] hover:shadow-lg transition-all">
              <div className="aspect-[16/9] bg-gradient-to-br from-[#d8f3dc] via-[#b7e4c7] to-[#74c69d] flex items-center justify-center relative">
                <div className="text-center text-[#1b4332]">
                  <p className="text-xs font-bold tracking-widest uppercase mb-2">광염교회 주보</p>
                  <p className="text-3xl font-bold mb-1">2025.04.27</p>
                  <p className="text-sm">주일 주보</p>
                </div>
              </div>
              <div className="px-7 py-5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900 mb-0.5">2025년 4월 4주차 주보</p>
                  <p className="text-sm text-gray-500">PDF로 다운로드 또는 미리보기</p>
                </div>
                <span className="text-[#2d6a4f] font-semibold text-sm group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-24 bg-white scroll-mt-20">
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
                <p className="text-gray-600 text-sm leading-relaxed mb-4">(16050) 경기도 의왕시 원골로 23</p>
                <div className="border-t border-gray-200 pt-4 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#40916c] w-10">TEL</span>
                    <a href="tel:031-452-4453" className="text-sm text-gray-700 font-medium hover:text-[#2d6a4f]">(031) 452-4453</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#40916c] w-10">FAX</span>
                    <span className="text-sm text-gray-700 font-medium">(031) 458-9106</span>
                  </div>
                </div>
              </div>
              <a
                href="https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%9D%98%EC%99%95%EC%8B%9C%20%EC%9B%90%EA%B3%A8%EB%A1%9C%2023"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#2d6a4f] text-white py-4 rounded-xl font-semibold hover:bg-[#1b4332] transition-colors"
              >
                네이버 지도로 보기 →
              </a>
            </div>
            <div className="lg:col-span-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm h-72 lg:h-auto">
              <iframe
                src="https://maps.google.com/maps?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%9D%98%EC%99%95%EC%8B%9C%20%EC%9B%90%EA%B3%A8%EB%A1%9C%2023&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="광염교회 위치"
                allowFullScreen
              />
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
                담임목사 온성진<br />
                (16050) 경기도 의왕시 원골로 23<br />
                TEL (031) 452-4453 · FAX (031) 458-9106
              </p>
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm">바로가기</p>
              <div className="space-y-2">
                {NAV_ITEMS.map((item, i) => (
                  <a key={i} href={item.href} className="block text-sm text-gray-500 hover:text-[#74c69d] transition-colors">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm">SNS</p>
              <div className="flex gap-3">
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="유튜브" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors p-2.5">
                  <span className="text-white">{Icons.youtube}</span>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="인스타그램" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors p-2.5">
                  <span className="text-white">{Icons.instagram}</span>
                </a>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-600 pt-8">© 2025 광염교회. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Quick Menu (FAB) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* expanded items */}
        <div
          className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
            fabOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {QUICK_MENU.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (item.href.startsWith("#")) {
                  e.preventDefault();
                  const el = document.querySelector(item.href);
                  setFabOpen(false);
                  if (el) {
                    requestAnimationFrame(() => {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    });
                  }
                } else {
                  setFabOpen(false);
                }
              }}
              className="flex items-center gap-3 group"
            >
              <span className="bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-md whitespace-nowrap group-hover:bg-[#2d6a4f] group-hover:text-white transition-colors">
                {item.label}
              </span>
              <span className={`w-12 h-12 ${item.color} text-white rounded-full shadow-lg flex items-center justify-center p-3 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </span>
            </a>
          ))}
        </div>

        {/* main FAB button */}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          aria-label={fabOpen ? "퀵메뉴 닫기" : "퀵메뉴 열기"}
          className="w-14 h-14 bg-[#1b4332] text-white rounded-full shadow-xl flex items-center justify-center p-4 hover:bg-[#2d6a4f] hover:scale-105 transition-all"
        >
          <div className={`transition-transform duration-300 ${fabOpen ? "rotate-45" : ""}`}>
            {Icons.plus}
          </div>
        </button>
      </div>

      {/* FAB backdrop */}
      {fabOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px] transition-opacity"
          onClick={() => setFabOpen(false)}
        />
      )}
    </div>
  );
}
