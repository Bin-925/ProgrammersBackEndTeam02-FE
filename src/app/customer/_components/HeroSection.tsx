"use client";

import { useState } from "react";
import { Coffee } from "lucide-react";

export default function HeroSection() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="bg-stone-50 min-h-[calc(100vh-64px)] overflow-hidden relative">
      {/* Left — text content */}
      <div className="max-w-6xl mx-auto px-8 min-h-[calc(100vh-64px)] flex items-center">
        <div className="w-1/2 flex flex-col gap-6 py-20">
          <p className="text-sm text-amber-700 font-medium tracking-wide">
            매일 오후 2시, 신선한 원두를 배송해드립니다
          </p>
          <h1 className="text-5xl font-extrabold text-stone-900 leading-tight tracking-tight">
            BETTER COFFEE,
            <br />
            BETTER WORLD.
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed max-w-md">
            전 세계 엄선된 스페셜티 원두를 집에서 편하게 주문하세요
          </p>
          <div>
            <a
              href="#product-list"
              className="inline-flex items-center gap-2 bg-amber-800 text-white px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-amber-900 transition-colors"
            >
              원두 보러가기
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right — image anchored to right + bottom edges */}
      <div className="absolute right-0 bottom-0 top-16 w-[52%] bg-gradient-to-br from-stone-200 to-amber-100 rounded-tl-2xl overflow-hidden flex items-center justify-center">
        {!imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/hero.png"
            alt="코지커피 원두"
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : null}

      </div>
    </section>
  );
}
