"use client";

// TODO: 현재 localStorage 기반으로 구현
// 추후 API 연동으로 교체 예정
// API: POST /api/orders

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, Search } from "lucide-react";
import Navbar from "../customer/_components/Navbar";
import Footer from "../customer/_components/Footer";
import type { CartItem } from "../cart/types";
import { getCart, saveCart } from "../cart/cartUtils";

declare global {
  interface Window {
    daum: {
      Postcode: new (config: {
        oncomplete: (data: {
          roadAddress: string;
          jibunAddress: string;
          zonecode: string;
        }) => void;
      }) => { open: () => void };
    };
  }
}

function loadDaumPostcode(): Promise<void> {
  return new Promise((resolve) => {
    if (window.daum?.Postcode) { resolve(); return; }
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

export default function OrderPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    email: "",
    address: "",
    addressDetail: "",
    zipCode: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form & { agree: string }>>({});

  useEffect(() => {
    const cart = getCart();
    setItems(cart.filter((i) => i.selected));
    setMounted(true);
  }, []);

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.email.trim()) e.email = "이메일을 입력해주세요";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "올바른 이메일 형식이 아닙니다";
    if (!form.address.trim()) e.address = "주소를 입력해주세요";
    if (!form.zipCode.trim()) e.zipCode = "우편번호를 입력해주세요";
    if (!agreed) e.agree = "결제에 동의해주세요";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // TODO: 추후 POST /api/orders 로 교체 예정
    // 선택된 항목만 장바구니에서 제거
    const remaining = getCart().filter((i) => !i.selected);
    saveCart(remaining);

    router.push("/order/complete");
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleAddressSearch = async () => {
    await loadDaumPostcode();
    new window.daum.Postcode({
      oncomplete: (data) => {
        setForm((prev) => ({
          ...prev,
          address: data.roadAddress || data.jibunAddress,
          zipCode: data.zonecode,
        }));
        setErrors((prev) => ({ ...prev, address: undefined, zipCode: undefined }));
      },
    }).open();
  };;

  if (!mounted) return null;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-stone-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-10">주문하기</h1>

          {items.length === 0 ? (
            <div className="py-24 text-center text-stone-400">
              <p>주문할 상품이 없습니다</p>
            </div>
          ) : (
            <div className="flex flex-col min-[850px]:flex-row gap-8 items-start">
              {/* Left: Form */}
              <div className="w-full min-[850px]:flex-1 space-y-8">
                {/* Email */}
                <div>
                  <h2 className="text-base font-bold text-stone-900 mb-1">이메일 주소</h2>
                  <p className="text-sm text-stone-400 mb-3">
                    회원가입 없이 주문 가능합니다. 배송 정보는 이메일로 전송됩니다.
                  </p>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    className={`w-full h-12 px-4 rounded-xl border bg-white text-sm focus:outline-none transition-colors ${
                      errors.email ? "border-red-300 focus:border-red-400" : "border-stone-200 focus:border-stone-400"
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Address */}
                <div>
                  <h2 className="text-base font-bold text-stone-900 mb-3">집 주소</h2>
                  <div className="space-y-3">
                    {/* 주소 검색 */}
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={form.address}
                          readOnly
                          placeholder="주소 검색을 눌러 주소를 입력하세요"
                          className={`flex-1 h-12 px-4 rounded-xl border bg-stone-50 text-sm cursor-default ${
                            errors.address ? "border-red-300" : "border-stone-200"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={handleAddressSearch}
                          className="h-12 px-4 rounded-xl bg-stone-800 text-white text-sm font-semibold hover:bg-stone-900 transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                          <Search size={15} />
                          주소 검색
                        </button>
                      </div>
                      {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                    </div>

                    {/* 상세주소 + 우편번호 */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={form.addressDetail}
                        onChange={set("addressDetail")}
                        placeholder="상세주소"
                        className="flex-1 h-12 px-4 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-stone-400 transition-colors"
                      />
                      <input
                        type="text"
                        value={form.zipCode}
                        readOnly
                        placeholder="우편번호"
                        className="w-32 h-12 px-4 rounded-xl border border-stone-200 bg-stone-50 text-sm cursor-default"
                      />
                    </div>
                  </div>
                </div>

                {/* Agreement */}
                <div>
                  <label className="flex items-center gap-2.5 cursor-pointer select-none w-fit">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 accent-stone-900"
                    />
                    <span className="text-sm text-stone-600">결제에 동의합니다.</span>
                  </label>
                  {errors.agree && <p className="text-xs text-red-500 mt-1">{errors.agree}</p>}
                </div>
              </div>

              {/* Right: Summary */}
              <div className="w-full min-[850px]:w-80 min-[850px]:flex-none min-[850px]:sticky min-[850px]:top-24">
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-3 px-6 py-5 border-b border-stone-100">
                    <Package size={22} className="text-amber-900" />
                    <span className="font-bold text-stone-900 text-base">주문 요약</span>
                  </div>

                  {/* Items */}
                  <div className="px-6 py-5 space-y-3">
                    {items.map((item) => (
                      <div key={item.cartId} className="flex justify-between items-baseline gap-2">
                        <span className="text-sm text-stone-600 break-keep">
                          {item.name}
                          <span className="text-stone-400"> × {item.quantity}</span>
                        </span>
                        <span className="text-sm font-medium text-stone-800 shrink-0 tabular-nums">
                          {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="px-6 py-4 border-t border-stone-100 flex justify-between items-center">
                    <span className="font-bold text-stone-900">총 결제 금액</span>
                    <span className="font-bold text-stone-900 text-lg tabular-nums">
                      {totalPrice.toLocaleString()}원
                    </span>
                  </div>

                  {/* Submit */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={handleSubmit}
                      className="w-full py-3 rounded-xl bg-stone-800 text-white font-semibold hover:bg-stone-900 transition-colors"
                    >
                      결제하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
