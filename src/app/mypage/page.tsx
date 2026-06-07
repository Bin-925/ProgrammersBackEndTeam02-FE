"use client";

// TODO: 현재 더미데이터로 구현
// 추후 API 연동으로 교체 예정
// API: GET /api/orders?email={email}

import { useState } from "react";
import { Package, Truck, CheckCircle, XCircle, Search } from "lucide-react";
import Navbar from "../customer/_components/Navbar";
import Footer from "../customer/_components/Footer";
import type { Order, OrderStatus } from "./types";
import { dummyOrders } from "./data";

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; icon: React.ReactNode }
> = {
  처리중: {
    label: "처리중",
    color: "bg-amber-100 text-amber-700",
    icon: <Package size={14} />,
  },
  배송중: {
    label: "배송중",
    color: "bg-sky-100 text-sky-700",
    icon: <Truck size={14} />,
  },
  배송완료: {
    label: "배송완료",
    color: "bg-emerald-100 text-emerald-700",
    icon: <CheckCircle size={14} />,
  },
  취소: {
    label: "취소",
    color: "bg-stone-100 text-stone-500",
    icon: <XCircle size={14} />,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OrderCard({
  order,
  onCancel,
}: {
  order: Order;
  onCancel: (id: string) => void;
}) {
  const status = statusConfig[order.status];

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      {/* Order header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-50 bg-stone-50">
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
            {status.icon}
            {status.label}
          </span>
          <span className="text-sm font-medium text-stone-700">{order.orderNumber}</span>
        </div>
        <span className="text-xs text-stone-400">{formatDate(order.createdAt)}</span>
      </div>

      {/* Items */}
      <div className="px-6 py-4 divide-y divide-stone-50">
        {order.items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
            <div className="w-14 h-14 rounded-xl bg-stone-100 overflow-hidden flex items-center justify-center flex-none">
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
            <div className="flex-1">
              <p className="text-sm font-medium text-stone-900">{item.name}</p>
              <p className="text-xs text-stone-400 mt-0.5">수량 {item.quantity}개</p>
            </div>
            <span className="text-sm font-semibold text-stone-900">
              {(item.price * item.quantity).toLocaleString()}원
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <span className="text-sm text-stone-500">총 결제 금액</span>
          <span className="font-bold text-stone-900">{order.totalPrice.toLocaleString()}원</span>
        </div>
        {order.status === "처리중" && (
          <button
            onClick={() => onCancel(order.id)}
            className="px-4 py-1.5 rounded-lg border border-stone-200 text-sm text-stone-500 hover:border-red-300 hover:text-red-500 transition-colors"
          >
            주문 취소
          </button>
        )}
      </div>
    </div>
  );
}

export default function MyPage() {
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleSearch = () => {
    if (!email.trim()) return;
    // TODO: 추후 GET /api/orders?email=${email} 로 교체 예정
    setOrders(dummyOrders);
    setSearched(true);
  };

  const handleCancel = (id: string) => {
    // TODO: 추후 PATCH /api/orders/{id}/cancel 로 교체 예정
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "취소" as const } : o))
    );
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-stone-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">마이페이지</h1>
          <p className="text-stone-500 text-sm mb-8">이메일로 주문 내역을 조회하세요</p>

          {/* Email search */}
          <div className="flex gap-3 mb-10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="이메일 주소를 입력하세요"
              className="flex-1 h-12 px-4 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-stone-400 transition-colors"
            />
            <button
              onClick={handleSearch}
              className="h-12 px-6 rounded-xl bg-stone-800 text-white font-semibold text-sm hover:bg-stone-900 transition-colors flex items-center gap-2"
            >
              <Search size={15} />
              조회
            </button>
          </div>

          {/* Results */}
          {searched && (
            <div>
              {orders.length === 0 ? (
                <div className="py-20 text-center text-stone-400">
                  <p>주문 내역이 없습니다</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-stone-500 mb-4">
                    총 <span className="font-semibold text-stone-800">{orders.length}건</span>의
                    주문 내역
                  </p>
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} onCancel={handleCancel} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
