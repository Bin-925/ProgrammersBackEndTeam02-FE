"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import type { ProductDetail } from "../types";
import { addToCart } from "../../../cart/cartUtils";

function Toast({ visible, toastKey }: { visible: boolean; toastKey: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        bottom: "190px",
        right: "40px",
        zIndex: 9999,
        transition: "opacity 0.3s ease, transform 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="w-72 bg-white dark:bg-stone-800 rounded-2xl overflow-hidden border border-stone-100 dark:border-stone-700/50" style={{ borderLeft: "4px solid #d97706", boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(217,119,6,0.15)" }}>
        <div className="px-4 py-4 flex items-start gap-3">
          <div className="shrink-0 mt-0.5 p-2 rounded-xl bg-amber-50 dark:bg-amber-500/15">
            <ShoppingCart size={16} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-stone-900 dark:text-white">장바구니에 담겼습니다</p>
            <Link
              href="/cart"
              className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors mt-1 font-medium"
            >
              장바구니 보러가기
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>
        <div className="h-[3px] bg-stone-100 dark:bg-stone-700">
          {visible && (
            <div
              key={toastKey}
              className="h-full w-full bg-amber-500 origin-right"
              style={{ animation: "toast-progress 3s linear forwards" }}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function ProductHero({ product }: { product: ProductDetail }) {
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const [adding, setAdding] = useState(false);

  const isSoldOut = product.stock === 0;

  const handleAddToCart = async () => {
    if (adding || isSoldOut) return;
    setAdding(true);
    try {
      await addToCart(product.id, qty);
      setToastKey(k => k + 1);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch {
      Swal.fire({ icon: "error", title: "담기 실패", text: "장바구니 추가에 실패했습니다. 다시 시도해주세요." });
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <Toast visible={toast} toastKey={toastKey} />

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
              {/* Award 배너 */}
              {product.award && (
                <div className="px-4 py-3 rounded-xl bg-amber-100/70 dark:bg-stone-800">
                  <p className="text-sm font-bold text-amber-900 dark:text-amber-700">{product.award.title}</p>
                  <p className="text-xs text-amber-800/70 dark:text-amber-800/70 mt-0.5 leading-relaxed">{product.award.description}</p>
                </div>
              )}

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
              {isSoldOut ? (
                <div className="w-full h-12 rounded-xl bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-stone-400 dark:text-stone-500 font-semibold text-sm">
                  품절된 상품입니다
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
