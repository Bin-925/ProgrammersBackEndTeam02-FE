"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "cozy_popup_hide_until";

export default function EventPopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hideToday, setHideToday] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hideUntil = localStorage.getItem(STORAGE_KEY);
    if (hideUntil && Date.now() < Number(hideUntil)) return;
    setVisible(true);
  }, []);

  const close = () => {
    if (hideToday) {
      const tomorrow = new Date();
      tomorrow.setHours(23, 59, 59, 999);
      localStorage.setItem(STORAGE_KEY, String(tomorrow.getTime()));
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={close}
    >
      <div
        className="relative w-[340px] sm:w-[420px] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 닫기 */}
        <button
          onClick={close}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors"
          aria-label="닫기"
        >
          <X size={16} className="text-white" />
        </button>

        {/* 팝업 이미지 */}
        <Image
          src="/images/event-popup.png"
          alt="코지커피 세계대회 1위 이벤트"
          width={420}
          height={500}
          className="w-full h-auto block"
          unoptimized
        />

        {/* 하단 바 */}
        <div className="bg-white flex items-center justify-between px-4 py-3">
          {/* 오늘 그만보기 체크박스 */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hideToday}
              onChange={(e) => setHideToday(e.target.checked)}
              className="w-4 h-4 accent-stone-800 cursor-pointer"
            />
            <span className="text-sm text-stone-500">오늘 그만보기</span>
          </label>

          {/* 원두 보러가기 */}
          <Link
            href="/products/9"
            onClick={close}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-colors"
          >
            원두 보러가기
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
