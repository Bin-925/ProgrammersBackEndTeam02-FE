"use client";

import { useState, useEffect, useRef } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

type RoastingTab = "전체" | "라이트" | "미디엄" | "다크";

const roastingTabs: RoastingTab[] = ["전체", "라이트", "미디엄", "다크"];

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [activeTab, setActiveTab] = useState<RoastingTab>("전체");
  const [filterDecaf, setFilterDecaf] = useState(false);
  const [filterAcidity, setFilterAcidity] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = products.filter((p) => {
    if (activeTab !== "전체" && p.roasting !== activeTab) return false;
    if (filterDecaf && !p.isDecaf) return false;
    if (filterAcidity && !p.acidity) return false;
    return true;
  });

  return (
    <section id="product-list" ref={sectionRef} className="bg-stone-50 py-24">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div
          className={`text-center mb-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl font-bold text-stone-900 mb-3">우리의 원두</h2>
          <p className="text-stone-500">오늘은 어떤 원두로 하루를 시작할까요?</p>
        </div>

        {/* Roasting Tabs + Filters */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0.15s" }}
        >
          <div className="flex w-full border-b border-stone-200">
            {roastingTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Checkbox Filters */}
          <div className="flex items-center gap-6 mt-4 mb-8">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterDecaf}
                onChange={(e) => setFilterDecaf(e.target.checked)}
                className="w-4 h-4 accent-stone-900"
              />
              <span className="text-sm text-stone-600">디카페인</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterAcidity}
                onChange={(e) => setFilterAcidity(e.target.checked)}
                className="w-4 h-4 accent-stone-900"
              />
              <span className="text-sm text-stone-600">산미있음</span>
            </label>
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-stone-500 mb-6">
          총 <span className="font-semibold text-stone-800">{filtered.length}</span>개의 원두
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div
            className={`grid grid-cols-2 gap-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-stone-400">
            <span className="text-4xl mb-3">☕</span>
            <p className="text-sm">조건에 맞는 원두가 없습니다</p>
          </div>
        )}
      </div>
    </section>
  );
}
