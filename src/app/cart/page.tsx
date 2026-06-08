"use client";

// TODO: 현재 localStorage로 임시 구현
// 추후 Cart API 연동으로 교체 예정
// API: GET /api/cart, POST /api/cart, PUT /api/cart/{id}, DELETE /api/cart/{id}

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "../customer/_components/Navbar";
import Footer from "../customer/_components/Footer";
import type { CartItem } from "./types";
import { getCart, saveCart } from "./cartUtils";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setItems(getCart());
    setMounted(true);
  }, []);

  const persist = (next: CartItem[]) => {
    setItems(next);
    saveCart(next);
  };

  const updateQty = (cartId: string, delta: number) => {
    // TODO: 추후 PUT /api/cart/{id} 로 교체 예정
    persist(
      items.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (cartId: string) => {
    // TODO: 추후 DELETE /api/cart/{id} 로 교체 예정
    persist(items.filter((item) => item.cartId !== cartId));
  };

  const toggleSelect = (cartId: string) => {
    persist(
      items.map((item) =>
        item.cartId === cartId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleAll = () => {
    const allSelected = items.every((item) => item.selected);
    persist(items.map((item) => ({ ...item, selected: !allSelected })));
  };

  const selectedItems = items.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!mounted) return null;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-stone-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-3">장바구니</h1>

          {items.length === 0 ? (
            <div className="py-32 text-center">
              <p className="text-stone-400 text-lg mb-4">장바구니가 비어있습니다</p>
              <Link
                href="/#product-list"
                className="inline-block px-6 py-2.5 rounded-xl bg-stone-800 text-white text-sm font-semibold hover:bg-stone-900 transition-colors"
              >
                원두 보러가기
              </Link>
            </div>
          ) : (
            <>
              {/* 전체선택 */}
              <label className="flex items-center gap-2 text-sm text-stone-500 mb-5 cursor-pointer select-none w-fit">
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
                  {/* Table header */}
                  <div className="grid grid-cols-[28px_1fr_100px_100px_36px] items-center gap-3 px-2 py-3 border-b border-stone-200">
                    <span />
                    <span className="text-xs font-medium text-stone-400 tracking-wide">제품</span>
                    <span className="text-xs font-medium text-stone-400 tracking-wide text-center">수량</span>
                    <span className="text-xs font-medium text-stone-400 tracking-wide text-right">금액</span>
                    <span />
                  </div>

                  {/* Items */}
                  {items.map((item) => (
                    <div
                      key={item.cartId}
                      className="grid grid-cols-[28px_1fr_100px_100px_36px] items-center gap-3 px-2 py-5 border-b border-stone-100 last:border-b-0"
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleSelect(item.cartId)}
                        className="w-4 h-4 accent-stone-900"
                      />

                      {/* Product info */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-16 h-16 rounded-xl bg-stone-100 flex items-center justify-center overflow-hidden flex-none">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.thumbnailUrl}
                            alt={item.name}
                            className="w-full h-full object-contain p-1.5"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                        <span className="font-medium text-stone-900 text-sm leading-snug">{item.name}</span>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-center border border-stone-200 rounded-xl overflow-hidden w-fit mx-auto">
                        <button
                          onClick={() => updateQty(item.cartId, -1)}
                          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors text-sm"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.cartId, 1)}
                          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-right text-sm font-semibold text-stone-900 tabular-nums">
                        {(item.price * item.quantity).toLocaleString()}원
                      </span>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="flex items-center justify-center text-stone-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Right: Summary */}
                <div className="w-full min-[850px]:w-72 min-[850px]:flex-none min-[850px]:sticky min-[850px]:top-24">
                  <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                    {/* Delivery notice */}
                    <div className="bg-stone-100 px-5 py-4 flex items-start gap-3 border-b border-stone-200">
                      <Clock size={15} className="text-amber-900 mt-0.5 flex-none" />
                      <p className="text-xs text-stone-600 leading-relaxed">
                        당일 <span className="font-semibold text-amber-900">오후 2시 이후</span>의
                        주문은
                        <br />
                        <span className="font-semibold text-amber-900">다음 날</span> 배송이
                        시작됩니다.
                      </p>
                    </div>

                    <div className="px-5 py-5">
                      {/* Items breakdown */}
                      <div className="space-y-2.5 mb-5">
                        {selectedItems.length === 0 ? (
                          <p className="text-xs text-stone-400">선택된 상품이 없습니다</p>
                        ) : (
                          selectedItems.map((item) => (
                            <div key={item.cartId} className="flex justify-between items-baseline gap-2">
                              <span className="text-sm text-stone-500 min-w-0 break-keep">
                                {item.name}
                                <span className="text-stone-400"> × {item.quantity}</span>
                              </span>
                              <span className="text-sm font-medium text-stone-800 shrink-0 tabular-nums">
                                {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Total */}
                      <div className="border-t border-stone-100 pt-4 flex justify-between items-center mb-5">
                        <span className="font-semibold text-stone-900">총 결제 금액</span>
                        <span className="font-bold text-stone-900 text-lg tabular-nums">
                          {totalPrice.toLocaleString()}원
                        </span>
                      </div>

                      {/* Buy button */}
                      <button
                        onClick={() => router.push("/order")}
                        disabled={selectedItems.length === 0}
                        className="w-full py-3 rounded-xl bg-stone-800 text-white font-semibold hover:bg-stone-900 transition-colors disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed"
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
