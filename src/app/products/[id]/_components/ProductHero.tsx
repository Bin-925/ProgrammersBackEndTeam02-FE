"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import type { ProductDetail } from "../types";
import { addToCart } from "../../../cart/cartUtils";

function Toast({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="bg-stone-900 text-white rounded-2xl px-5 py-4 flex items-center gap-5 shadow-2xl">
        <span className="text-sm">장바구니에 담겼습니다</span>
        <Link
          href="/cart"
          className="text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors whitespace-nowrap"
        >
          장바구니 보기 →
        </Link>
      </div>
    </div>
  );
}

export default function ProductHero({ product }: { product: ProductDetail }) {
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [toast, setToast] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      await addToCart(product.id, qty);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch {
      alert("장바구니 추가에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <Toast visible={toast} />

      <section className="bg-white py-16 dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex gap-16 items-start">
            {/* Left: Image */}
            <div className="w-1/2 flex-none">
              <div className="aspect-square rounded-2xl bg-stone-100 overflow-hidden flex items-center justify-center dark:bg-stone-800">
                {!imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.thumbnailUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-12"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-16 h-16 text-stone-300 dark:text-stone-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9l4-4 4 4 4-4 4 4" />
                      <circle cx="8.5" cy="13.5" r="1.5" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex-1 flex flex-col gap-6 pt-2">
              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-sm bg-stone-100 text-stone-700 font-medium dark:bg-stone-800 dark:text-stone-300">
                  {product.roasting}
                </span>
                {product.isDecaf && (
                  <span className="px-3 py-1 rounded-full text-sm bg-stone-100 text-stone-700 font-medium dark:bg-stone-800 dark:text-stone-300">
                    디카페인
                  </span>
                )}
                {product.acidity && (
                  <span className="px-3 py-1 rounded-full text-sm bg-stone-100 text-stone-700 font-medium dark:bg-stone-800 dark:text-stone-300">
                    산미
                  </span>
                )}
              </div>

              {/* Name + weight */}
              <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
                {product.name}
                <span className="text-lg font-normal text-stone-400 ml-3 dark:text-stone-500">{product.weight}</span>
              </h1>

              {/* Description */}
              <p className="text-stone-500 leading-relaxed dark:text-stone-400">{product.shortDescription}</p>

              {/* Price */}
              <p className="text-2xl font-bold text-stone-900 dark:text-white">{product.price.toLocaleString()}원</p>

              {/* Quantity + Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden dark:border-stone-700">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-11 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors text-lg dark:text-stone-400 dark:hover:bg-stone-800"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-semibold text-stone-900 dark:text-stone-100">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-11 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors text-lg dark:text-stone-400 dark:hover:bg-stone-800"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border-2 border-stone-900 text-stone-900 font-semibold hover:bg-stone-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed dark:border-amber-500 dark:text-amber-400 dark:hover:bg-stone-900"
                >
                  <ShoppingCart size={16} />
                  {adding ? "담는 중..." : "장바구니 담기"}
                </button>
              </div>

              {/* Buy now */}
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full h-12 rounded-xl bg-stone-800 text-white font-semibold hover:bg-stone-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-amber-700 dark:hover:bg-amber-600"
              >
                바로 구매하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
