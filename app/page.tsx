"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { label: "교회 소개", href: "#about" },
  { label: "예배 안내", href: "#worship" },
  { label: "섬기는 분들", href: "#staff" },
  { label: "오시는 길", href: "#location" },
];

const WORSHIP_SCHEDULE = [
  { name: "주일예배 1부", time: "주일 오전 9:00" },
  { name: "주일예배 2부", time: "주일 오전 11:00" },
  { name: "주일찬양예배", time: "주일 오후 2:00" },
  { name: "수요저녁예배", time: "수요 오후 7:30" },
  { name: "새벽기도회", time: "월~금 오전 5:00" },
  { name: "금요기도회", time: "금요 오후 9:00" },
];

const MINISTRY_SCHEDULE = [
  { name: "유초등부", time: "주일 오전 11:00" },
  { name: "중고등부", time: "주일 오후 3:00" },
  { name: "청년부", time: "주일 오후 3:00" },
  { name: "목장모임", time: "각 목장별" },
];

const CORE_VALUES = [
  "세상의 빛과 소금이 되는 교회 (마 5:13-14)",
  "복음의 능력을 가진 교회",
  "다음세대를 세우는 교회",
  "사랑으로 하나되는 교회",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#2d6a4f] rounded flex items-center justify-center">
              <span className="text-white font-bold text-base">光</span>
            </div>
            <div className="leading-tight">
              <p className="text-xs text-gray-500">대한예수교장로회 합동</p>
              <p className="font-bold text-[#2d6a4f] text-lg leading-none">광염교회</p>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="text-gray-700 hover:text-[#2d6a4f] font-medium transition-colors">
                {item.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden p-2 flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
            <span className="block w-6 h-0.5 bg-gray-700" />
            <span className="block w-6 h-0.5 bg-gray-700" />
            <span className="block w-6 h-0.5 bg-gray-700" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="text-gray-700 hover:text-[#2d6a4f] font-medium" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-[#d8f3dc] via-[#b7e4c7] to-[#74c69d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#2d6a4f]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#1b4332]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <p className="text-[#2d6a4f] font-semibold mb-4 tracking-widest uppercase text-sm">광염교회 비전</p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1b4332] leading-tight mb-6">
            다음세대의 비전을<br />
            <span className="text-[#40916c]">믿음으로 바라보라</span>
          </h1>
          <p className="text-lg text-[#2d6a4f] max-w-xl mb-10 leading-relaxed">
            1998년 11월에 건축되어, 지금 제2성전 시대를 맞이하고 있습니다.<br />
            하나님의 말씀과 성령의 능력으로 예수의 제자가 되어,<br />
            이 땅의 영혼을 구원하는 세계비전을 향해 나아가는 생명공동체입니다.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#worship" className="bg-[#2d6a4f] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1b4332] transition-colors">
              예배 안내 보기
            </a>
            <a href="#about" className="border-2 border-[#2d6a4f] text-[#2d6a4f] px-8 py-3 rounded-full font-semibold hover:bg-[#2d6a4f] hover:text-white transition-colors">
              교회 소개
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#40916c] font-semibold tracking-widest uppercase text-sm mb-2">About Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">교회 소개</h2>
            <div className="w-16 h-1 bg-[#40916c] mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-[#d8f3dc] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#2d6a4f] mb-3">광염교회는</h3>
                <p className="text-gray-700 leading-relaxed">
                  1998년 11월에 건축되어, 지금 제2성전 시대를 맞이하고 있습니다.
                  우리는 하나님의 말씀과 성령의 능력으로 예수의 제자가 되어,
                  이 땅의 영혼을 구원하는 세계비전을 향해 나아가는 생명공동체입니다.
                </p>
              </div>
              <div className="bg-[#f0faf3] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#2d6a4f] mb-3">우리의 비전 (VISION)</h3>
                <p className="text-gray-700 leading-relaxed">
                  성경적인 교회의 본질에 충실한 건강한 교회가 되어 하나님을 기쁘시게 하고,
                  세상의 빛과 소금이 되어 세상을 구원하고 축복하는 거룩한 공동체가 되는 것입니다.
                  아울러 광염의 모든 지체들이{" "}
                  <strong className="text-[#2d6a4f]">헌신된 그리스도의 제자로 살아가는 것</strong>을 보는 것입니다.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">핵심 가치</h3>
              <div className="space-y-4">
                {CORE_VALUES.map((v, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-[#b7e4c7] hover:bg-[#f0faf3] transition-colors">
                    <span className="text-[#40916c] font-bold mt-0.5">✦</span>
                    <p className="text-gray-700 font-medium">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Worship */}
      <section id="worship" className="py-20 bg-[#f8fffe]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#40916c] font-semibold tracking-widest uppercase text-sm mb-2">Worship</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">예배 안내</h2>
            <div className="w-16 h-1 bg-[#40916c] mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-[#b7e4c7] overflow-hidden">
              <div className="bg-[#2d6a4f] px-6 py-4">
                <h3 className="text-white font-bold text-lg">주요 예배</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {WORSHIP_SCHEDULE.map((item, i) => (
                  <div key={i} className="flex justify-between items-center px-6 py-4">
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <span className="text-[#40916c] font-semibold">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-[#b7e4c7] overflow-hidden">
              <div className="bg-[#40916c] px-6 py-4">
                <h3 className="text-white font-bold text-lg">부서 예배 및 모임</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {MINISTRY_SCHEDULE.map((item, i) => (
                  <div key={i} className="flex justify-between items-center px-6 py-4">
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <span className="text-[#40916c] font-semibold">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section id="staff" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#40916c] font-semibold tracking-widest uppercase text-sm mb-2">Staff</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">섬기는 분들</h2>
            <div className="w-16 h-1 bg-[#40916c] mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-8 rounded-2xl bg-[#d8f3dc]">
              <div className="w-20 h-20 bg-[#2d6a4f] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">✝</span>
              </div>
              <p className="text-[#2d6a4f] font-semibold text-sm mb-1">담임목사</p>
              <p className="text-2xl font-bold text-gray-900">온성진</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#f0faf3]">
              <div className="w-20 h-20 bg-[#40916c] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🙏</span>
              </div>
              <p className="text-[#40916c] font-semibold text-sm mb-2">시무장로</p>
              <p className="text-lg font-bold text-gray-900">이교호</p>
              <p className="text-lg font-bold text-gray-900">윤한용</p>
              <p className="text-lg font-bold text-gray-900">주병룡</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#f0faf3]">
              <div className="w-20 h-20 bg-[#74c69d] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📖</span>
              </div>
              <p className="text-[#40916c] font-semibold text-sm mb-2">부교역자</p>
              <p className="text-xl font-bold text-gray-900">장충일</p>
              <p className="text-gray-500 text-sm mt-1">교육부서 담당</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-20 bg-[#f8fffe]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#40916c] font-semibold tracking-widest uppercase text-sm mb-2">Location</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">오시는 길</h2>
            <div className="w-16 h-1 bg-[#40916c] mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#b7e4c7]">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-3xl">📍</span>
                <div>
                  <p className="font-bold text-gray-900 text-lg">광염교회</p>
                  <p className="text-gray-600">경기도 의왕시 원골로 23</p>
                </div>
              </div>
              <a
                href="https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%9D%98%EC%99%95%EC%8B%9C%20%EC%9B%90%EA%B3%A8%EB%A1%9C%2023"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2d6a4f] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1b4332] transition-colors"
              >
                네이버 지도로 보기 →
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-[#b7e4c7] h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.4!2d126.9685!3d37.3442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b5e2c5e5e5e5e%3A0x0!2z6rWQ7Iud7Iq57Y-s%20EC%9B%90EAp9EB%A1%9C%2023!5e0!3m2!1sko!2skr!4v1234567890"
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

      {/* SNS */}
      <section className="py-14 bg-[#2d6a4f] text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">광염교회와 함께해요</h2>
          <p className="text-[#b7e4c7] mb-8">유튜브와 SNS에서 광염교회를 만나보세요</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              유튜브 채널
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              인스타그램 (추후 개설)
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1b4332] text-[#b7e4c7] py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#40916c] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">光</span>
            </div>
            <p className="font-bold text-white text-xl">광염교회</p>
          </div>
          <p className="text-sm mb-1">대한예수교장로회 합동 | 담임목사 온성진</p>
          <p className="text-sm mb-4">경기도 의왕시 원골로 23</p>
          <p className="text-xs text-[#74c69d]">© 2025 광염교회. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
