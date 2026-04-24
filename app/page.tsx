"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  {
    label: "교회소개",
    href: "#about",
    children: ["교회 비전", "핵심 가치", "담임목사 소개"],
  },
  {
    label: "예배안내",
    href: "#worship",
    children: ["주일예배", "주간예배", "부서예배"],
  },
  { label: "섬기는 분들", href: "#staff", children: [] },
  { label: "오시는 길", href: "#location", children: [] },
];

const HERO_SLIDES = [
  {
    bg: "from-[#1b4332] to-[#2d6a4f]",
    title: "다음세대의 비전을\n믿음으로 바라보라",
    sub: "세상의 빛과 소금이 되는 광염교회",
  },
  {
    bg: "from-[#2d6a4f] to-[#40916c]",
    title: "복음의 능력을\n가진 교회",
    sub: "하나님의 말씀과 성령의 능력으로",
  },
  {
    bg: "from-[#40916c] to-[#74c69d]",
    title: "사랑으로\n하나되는 교회",
    sub: "이 땅의 영혼을 구원하는 생명공동체",
  },
];

const QUICK_LINKS = [
  { icon: "🕊️", label: "주일예배", sub: "오전 9:00 / 11:00", href: "#worship" },
  { icon: "📍", label: "오시는 길", sub: "경기도 의왕시 원골로 23", href: "#location" },
  { icon: "▶️", label: "유튜브", sub: "설교 영상 보기", href: "https://www.youtube.com" },
  { icon: "📸", label: "인스타그램", sub: "SNS 팔로우", href: "https://www.instagram.com" },
];

const WORSHIP_SCHEDULE = [
  { name: "주일예배 1부", time: "주일 오전 9:00", badge: "주일" },
  { name: "주일예배 2부", time: "주일 오전 11:00", badge: "주일" },
  { name: "주일찬양예배", time: "주일 오후 2:00", badge: "주일" },
  { name: "수요저녁예배", time: "수요 오후 7:30", badge: "수요" },
  { name: "새벽기도회", time: "월~금 오전 5:00", badge: "평일" },
  { name: "금요기도회", time: "금요 오후 9:00", badge: "금요" },
];

const MINISTRY_SCHEDULE = [
  { name: "유초등부", time: "주일 오전 11:00" },
  { name: "중고등부", time: "주일 오후 3:00" },
  { name: "청년부", time: "주일 오후 3:00" },
  { name: "목장모임", time: "각 목장별" },
];

const NOTICES = [
  { date: "2025.04.20", title: "2025년 부활절 연합예배 안내", category: "공지" },
  { date: "2025.04.14", title: "목장모임 일정 변경 안내", category: "공지" },
  { date: "2025.04.07", title: "교회 봄 대청소 자원봉사 모집", category: "행사" },
  { date: "2025.03.30", title: "새가족 환영식 안내", category: "행사" },
  { date: "2025.03.23", title: "청년부 수련회 신청 안내", category: "청년" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = HERO_SLIDES[slide];

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
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-[#2d6a4f] rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">光</span>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 leading-none mb-0.5">대한예수교장로회 합동</p>
                <p className="font-bold text-[#1b4332] text-xl leading-none">광염교회</p>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(i)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className="px-5 py-5 text-gray-700 hover:text-[#2d6a4f] font-medium text-sm transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                  {item.children.length > 0 && activeDropdown === i && (
                    <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-100 rounded-b-lg min-w-36 z-50">
                      {item.children.map((child, j) => (
                        <a
                          key={j}
                          href={item.href}
                          className="block px-5 py-3 text-sm text-gray-600 hover:text-[#2d6a4f] hover:bg-[#f0faf3] transition-colors"
                        >
                          {child}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile menu btn */}
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-4">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="block py-3 text-gray-700 hover:text-[#2d6a4f] font-medium border-b border-gray-50 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero Slider */}
      <section className="pt-[72px] relative h-screen min-h-[500px] max-h-[700px] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${current.bg} transition-all duration-1000`} />
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px"
          }} />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <p className="text-[#74c69d] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                광염교회 · Gwangyeom Church
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 whitespace-pre-line">
                {current.title}
              </h1>
              <p className="text-[#b7e4c7] text-lg mb-10">{current.sub}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#worship"
                  className="bg-white text-[#2d6a4f] px-7 py-3 rounded font-semibold text-sm hover:bg-[#d8f3dc] transition-colors"
                >
                  예배 안내
                </a>
                <a
                  href="#about"
                  className="border border-white/50 text-white px-7 py-3 rounded font-semibold text-sm hover:bg-white/10 transition-colors"
                >
                  교회 소개
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-white" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Links Bar */}
      <section className="bg-[#1b4332]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {QUICK_LINKS.map((q, i) => (
              <a
                key={i}
                href={q.href}
                target={q.href.startsWith("http") ? "_blank" : undefined}
                rel={q.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 px-6 py-5 hover:bg-white/10 transition-colors group"
              >
                <span className="text-2xl">{q.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm group-hover:text-[#74c69d] transition-colors">{q.label}</p>
                  <p className="text-white/50 text-xs">{q.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">About Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                세상의 빛과 소금이<br />되는 교회
              </h2>
              <div className="w-12 h-1 bg-[#40916c] mb-8" />
              <p className="text-gray-600 leading-relaxed mb-5">
                1998년 11월에 건축되어, 지금 제2성전 시대를 맞이하고 있습니다. 우리는 하나님의 말씀과 성령의 능력으로 예수의 제자가 되어, 이 땅의 영혼을 구원하는 세계비전을 향해 나아가는 생명공동체입니다.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                성경적인 교회의 본질에 충실한 건강한 교회가 되어 하나님을 기쁘시게 하고, 세상의 빛과 소금이 되어 세상을 구원하고 축복하는 거룩한 공동체가 되는 것입니다.
              </p>
              <a
                href="#staff"
                className="inline-flex items-center gap-2 text-[#2d6a4f] font-semibold text-sm border-b-2 border-[#2d6a4f] pb-0.5 hover:text-[#1b4332] hover:border-[#1b4332] transition-colors"
              >
                섬기는 분들 보기 →
              </a>
            </div>
            <div className="space-y-4">
              {[
                { num: "01", title: "세상의 빛과 소금이 되는 교회", desc: "마태복음 5:13-14의 말씀을 따라" },
                { num: "02", title: "복음의 능력을 가진 교회", desc: "성령의 능력으로 복음을 전하는" },
                { num: "03", title: "다음세대를 세우는 교회", desc: "믿음의 다음세대를 세워가는" },
                { num: "04", title: "사랑으로 하나되는 교회", desc: "그리스도의 사랑으로 하나되는" },
              ].map((v, i) => (
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
      <section id="worship" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">Worship</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">예배 안내</h2>
            <div className="w-12 h-1 bg-[#40916c] mx-auto mt-5" />
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Main worship */}
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
                        item.badge === "주일" ? "bg-[#d8f3dc] text-[#2d6a4f]" :
                        item.badge === "수요" ? "bg-blue-50 text-blue-600" :
                        item.badge === "금요" ? "bg-purple-50 text-purple-600" :
                        "bg-gray-100 text-gray-500"
                      }`}>{item.badge}</span>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    <span className="text-[#40916c] font-semibold text-sm">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Ministry */}
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
              <div className="bg-[#2d6a4f] rounded-xl p-7 text-white">
                <p className="text-[#74c69d] text-xs font-semibold tracking-widest uppercase mb-2">Vision</p>
                <p className="font-bold text-xl leading-snug">
                  다음세대의 비전을<br />믿음으로 바라보라
                </p>
                <p className="text-white/60 text-sm mt-3">경기도 의왕시 원골로 23</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notices + YouTube */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Notices */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-2">Notice</p>
                  <h2 className="text-2xl font-bold text-gray-900">공지사항</h2>
                </div>
                <a href="#" className="text-sm text-gray-400 hover:text-[#2d6a4f] transition-colors">더보기 →</a>
              </div>
              <div className="divide-y divide-gray-100">
                {NOTICES.map((n, i) => (
                  <div key={i} className="flex items-start gap-4 py-4 hover:bg-gray-50 px-2 -mx-2 rounded transition-colors cursor-pointer group">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium shrink-0 mt-0.5 ${
                      n.category === "공지" ? "bg-[#d8f3dc] text-[#2d6a4f]" :
                      n.category === "행사" ? "bg-orange-50 text-orange-600" :
                      "bg-blue-50 text-blue-600"
                    }`}>{n.category}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 group-hover:text-[#2d6a4f] transition-colors truncate">{n.title}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">{n.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-2">Media</p>
                  <h2 className="text-2xl font-bold text-gray-900">설교 영상</h2>
                </div>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-[#2d6a4f] transition-colors"
                >
                  유튜브 채널 →
                </a>
              </div>
              <div className="bg-gray-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center text-white/40">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-sm">유튜브 채널 연결 시 설교 영상이 표시됩니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section id="staff" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Staff</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">섬기는 분들</h2>
            <div className="w-12 h-1 bg-[#40916c] mx-auto mt-5" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-md hover:border-[#b7e4c7] transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-white text-2xl">✝</span>
              </div>
              <p className="text-[#40916c] text-xs font-bold tracking-widest uppercase mb-2">담임목사</p>
              <p className="text-xl font-bold text-gray-900">온성진</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-md hover:border-[#b7e4c7] transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-[#40916c] to-[#2d6a4f] rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-white text-2xl">🙏</span>
              </div>
              <p className="text-[#40916c] text-xs font-bold tracking-widest uppercase mb-2">시무장로</p>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">이교호</p>
                <p className="font-bold text-gray-900">윤한용</p>
                <p className="font-bold text-gray-900">주병룡</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-md hover:border-[#b7e4c7] transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-[#74c69d] to-[#40916c] rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-white text-2xl">📖</span>
              </div>
              <p className="text-[#40916c] text-xs font-bold tracking-widest uppercase mb-2">부교역자</p>
              <p className="text-xl font-bold text-gray-900">장충일</p>
              <p className="text-gray-400 text-xs mt-1">교육부서</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#40916c] text-xs font-bold tracking-[0.2em] uppercase mb-3">Location</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">오시는 길</h2>
            <div className="w-12 h-1 bg-[#40916c] mx-auto mt-5" />
          </div>
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-xl p-7 border border-gray-100">
                <p className="text-xs font-bold text-[#40916c] tracking-widest uppercase mb-4">주소</p>
                <p className="font-bold text-gray-900 text-lg mb-1">광염교회</p>
                <p className="text-gray-600 text-sm leading-relaxed">경기도 의왕시 원골로 23</p>
              </div>
              <a
                href="https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%9D%98%EC%99%95%EC%8B%9C%20%EC%9B%90%EA%B3%A8%EB%A1%9C%2023"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#2d6a4f] text-white py-4 rounded-xl font-semibold hover:bg-[#1b4332] transition-colors"
              >
                네이버 지도로 보기 →
              </a>
            </div>
            <div className="lg:col-span-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm h-72 lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.0!2d126.9685!3d37.3442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6rWQ7Iud7Iq57Y-s!5e0!3m2!1sko!2skr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="광염교회 위치"
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
                <div className="w-9 h-9 bg-[#2d6a4f] rounded flex items-center justify-center">
                  <span className="text-white font-bold">光</span>
                </div>
                <p className="font-bold text-white text-lg">광염교회</p>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                대한예수교장로회 합동<br />
                담임목사 온성진<br />
                경기도 의왕시 원골로 23
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
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-600 pt-8">© 2025 광염교회. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
