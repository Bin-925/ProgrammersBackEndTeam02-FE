"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "../customer/_components/Navbar";
import Footer from "../customer/_components/Footer";
import type { CartDisplayItem } from "./types";
import Swal from "sweetalert2";
import {
  fetchCart,
  removeCartItem,
  updateCartItemQty,
  saveSelectedIds,
} from "./cartUtils";

export default function CartPage() {
  const [items, setItems] = useState<CartDisplayItem[]>([]);
  const [stockMap, setStockMap] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadCart = useCallback(async () => {
    try {
      const [data, productsRes] = await Promise.allSettled([
        fetchCart(),
        fetch("https://be-production-9ee1.up.railway.app/api/products").then(r => r.ok ? r.json() : []),
      ]);
      if (data.status === "fulfilled") setItems(data.value);
      if (productsRes.status === "fulfilled") {
        const map: Record<number, number> = {};
        for (const p of productsRes.value) map[p.id] = p.stock;
        setStockMap(map);
      }
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const updateQty = async (cartItemId: number, newQty: number, productId: number) => {
    if (newQty < 1) return;
    const stock = stockMap[productId];
    if (stock !== undefined && newQty > stock) {
      Swal.fire({ icon: "warning", title: "재고 부족", text: `재고가 ${stock}개 남아있습니다.` });
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
    try {
      await updateCartItemQty(cartItemId, newQty);
    } catch {
      await loadCart();
    }
  };

  const removeItem = async (cartItemId: number) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    try {
      await removeCartItem(cartItemId);
    } catch {
      await loadCart();
    }
  };

  const toggleSelect = (cartItemId: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleAll = () => {
    const allSelected = items.every((item) => item.selected);
    setItems((prev) => prev.map((item) => ({ ...item, selected: !allSelected })));
  };

  const handleCheckout = () => {
    const selectedIds = items.filter((i) => i.selected).map((i) => i.cartItemId);
    saveSelectedIds(selectedIds);
    router.push("/order");
  };

  const selectedItems = items.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-stone-50 min-h-screen py-12 dark:bg-stone-950">
          <div className="max-w-6xl mx-auto px-8 text-center py-32 text-stone-400 dark:text-stone-500">
            불러오는 중...
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-stone-50 min-h-screen py-12 dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3 dark:text-white">장바구니</h1>

          {items.length === 0 ? (
            <div className="py-32 text-center">
              <p className="text-stone-400 text-lg mb-4 dark:text-stone-500">장바구니가 비어있습니다</p>
              <Link
                href="/#product-list"
                className="inline-block px-6 py-2.5 rounded-xl bg-stone-800 text-white text-sm font-semibold hover:bg-stone-900 transition-colors dark:bg-stone-700 dark:hover:bg-stone-600"
              >
                원두 보러가기
              </Link>
            </div>
          ) : (
            <>
              {/* 전체선택 */}
              <label className="flex items-center gap-2 text-sm text-stone-500 mb-5 cursor-pointer select-none w-fit dark:text-stone-400">
                <input
                  type="checkbox"
                  checked={items.every((i) => i.selected)}
                  onChange={toggleAll}
                  className="w-4 h-4 accent-stone-900"
                />
                전체선택 ({selectedItems.length}/{items.length})
              </label>

              <div className="flex flex-col min-[850px]:flex-row gap-6 items-start">
                {/* Left: Cart list */}
                <div className="w-full min-[850px]:flex-1">
                  {/* 헤더 — 데스크톱만 */}
                  <div className="hidden sm:grid grid-cols-[28px_1fr_100px_100px_36px] items-center gap-3 px-2 py-3 border-b border-stone-200 dark:border-stone-800">
                    <span />
                    <span className="text-xs font-medium text-stone-400 tracking-wide dark:text-stone-500">제품</span>
                    <span className="text-xs font-medium text-stone-400 tracking-wide text-center dark:text-stone-500">수량</span>
                    <span className="text-xs font-medium text-stone-400 tracking-wide text-right dark:text-stone-500">금액</span>
                    <span />
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="py-4 border-b border-stone-100 last:border-b-0 dark:border-stone-800"
                    >
                      {/* 데스크톱 레이아웃 */}
                      <div className="hidden sm:grid grid-cols-[28px_1fr_100px_100px_36px] items-center gap-3 px-2">
                        <input type="checkbox" checked={item.selected} onChange={() => toggleSelect(item.cartItemId)} className="w-4 h-4 accent-stone-900" />
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-16 h-16 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden flex-none">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.thumbnailUrl} alt={item.name} className="w-full h-full object-contain p-1.5" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          </div>
                          <span className="font-medium text-stone-900 text-sm leading-snug dark:text-stone-100">{item.name}</span>
                        </div>
                        <div className="flex items-center justify-center border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden w-fit mx-auto">
                          <button onClick={() => updateQty(item.cartItemId, item.quantity - 1, item.productId)} className="w-8 h-8 flex items-center justify-center text-stone-500 hover:bg-stone-50 dark:text-stone-400 dark:hover:bg-stone-800 transition-colors text-sm">−</button>
                          <span className="w-7 text-center text-sm font-semibold text-stone-900 dark:text-stone-100">{item.quantity}</span>
                          <button onClick={() => updateQty(item.cartItemId, item.quantity + 1, item.productId)} className="w-8 h-8 flex items-center justify-center text-stone-500 hover:bg-stone-50 dark:text-stone-400 dark:hover:bg-stone-800 transition-colors text-sm">+</button>
                        </div>
                        <span className="text-right text-sm font-semibold text-stone-900 tabular-nums dark:text-stone-100">{(item.price * item.quantity).toLocaleString()}원</span>
                        <button onClick={() => removeItem(item.cartItemId)} className="flex items-center justify-center text-stone-300 hover:text-red-400 dark:text-stone-600 dark:hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
                      </div>

                      {/* 모바일 레이아웃 */}
                      <div className="sm:hidden flex gap-3 px-1">
                        <input type="checkbox" checked={item.selected} onChange={() => toggleSelect(item.cartItemId)} className="w-4 h-4 accent-stone-900 mt-1 flex-none" />
                        <div className="w-14 h-14 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden flex-none">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.thumbnailUrl} alt={item.name} className="w-full h-full object-contain p-1" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-medium text-stone-900 text-sm leading-snug dark:text-stone-100">{item.name}</span>
                            <button onClick={() => removeItem(item.cartItemId)} className="text-stone-300 hover:text-red-400 dark:text-stone-600 dark:hover:text-red-400 transition-colors flex-none"><Trash2 size={14} /></button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden">
                              <button onClick={() => updateQty(item.cartItemId, item.quantity - 1, item.productId)} className="w-7 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-50 dark:text-stone-400 dark:hover:bg-stone-800 text-sm">−</button>
                              <span className="w-6 text-center text-sm font-semibold text-stone-900 dark:text-stone-100">{item.quantity}</span>
                              <button onClick={() => updateQty(item.cartItemId, item.quantity + 1, item.productId)} className="w-7 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-50 dark:text-stone-400 dark:hover:bg-stone-800 text-sm">+</button>
                            </div>
                            <span className="text-sm font-semibold text-stone-900 tabular-nums dark:text-stone-100">{(item.price * item.quantity).toLocaleString()}원</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Summary */}
                <div className="w-full min-[850px]:w-72 min-[850px]:flex-none min-[850px]:sticky min-[850px]:top-24">
                  <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden dark:bg-stone-900 dark:border-stone-800">
                    <div className="bg-stone-100 px-5 py-4 flex items-start gap-3 border-b border-stone-200 dark:bg-stone-800 dark:border-stone-700">
                      <Clock size={15} className="text-amber-900 mt-0.5 flex-none dark:text-amber-400" />
                      <p className="text-xs text-stone-600 leading-relaxed dark:text-stone-300">
                        당일 <span className="font-semibold text-amber-900 dark:text-amber-400">오후 2시 이후</span>의
                        주문은
                        <br />
                        <span className="font-semibold text-amber-900 dark:text-amber-400">다음 날</span> 배송이
                        시작됩니다.
                      </p>
                    </div>

                    <div className="px-5 py-5">
                      <div className="space-y-2.5 mb-5">
                        {selectedItems.length === 0 ? (
                          <p className="text-xs text-stone-400 dark:text-stone-500">선택된 상품이 없습니다</p>
                        ) : (
                          selectedItems.map((item) => (
                            <div key={item.cartItemId} className="flex justify-between items-baseline gap-2">
                              <span className="text-sm text-stone-500 min-w-0 break-keep dark:text-stone-400">
                                {item.name}
                                <span className="text-stone-400 dark:text-stone-500"> × {item.quantity}</span>
                              </span>
                              <span className="text-sm font-medium text-stone-800 shrink-0 tabular-nums dark:text-stone-200">
                                {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="border-t border-stone-100 pt-4 flex justify-between items-center mb-5 dark:border-stone-800">
                        <span className="font-semibold text-stone-900 dark:text-stone-100">총 결제 금액</span>
                        <span className="font-bold text-stone-900 text-lg tabular-nums dark:text-white">
                          {totalPrice.toLocaleString()}원
                        </span>
                      </div>

                      <button
                        onClick={handleCheckout}
                        disabled={selectedItems.length === 0}
                        className="w-full py-3 rounded-xl bg-stone-800 text-white font-semibold hover:bg-stone-900 transition-colors disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed dark:bg-amber-700 dark:hover:bg-amber-600 dark:disabled:bg-stone-800 dark:disabled:text-stone-600"
                      >
                        구매하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
