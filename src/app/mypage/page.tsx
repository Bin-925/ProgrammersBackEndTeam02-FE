"use client";

import { useState } from "react";
import { Package, Truck, CheckCircle, XCircle, Clock, Search } from "lucide-react";
import Navbar from "../customer/_components/Navbar";
import Footer from "../customer/_components/Footer";

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPING" | "DELIVERED" | "CANCELLED";

interface ApiOrder {
  orderId: number;
  customerEmail: string;
  address: string;
  zipCode: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  createdAt: string;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING: {
    label: "대기중",
    color: "bg-stone-100 text-stone-500",
    icon: <Clock size={14} />,
  },
  PROCESSING: {
    label: "처리중",
    color: "bg-amber-100 text-amber-700",
    icon: <Package size={14} />,
  },
  SHIPPING: {
    label: "배송중",
    color: "bg-sky-100 text-sky-700",
    icon: <Truck size={14} />,
  },
  DELIVERED: {
    label: "배송완료",
    color: "bg-emerald-100 text-emerald-700",
    icon: <CheckCircle size={14} />,
  },
  CANCELLED: {
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
  order: ApiOrder;
  onCancel: (orderId: number) => void;
}) {
  const status = statusConfig[order.orderStatus];
  const cancellable = order.orderStatus === "PENDING" || order.orderStatus === "PROCESSING";

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-50 bg-stone-50">
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
            {status.icon}
            {status.label}
          </span>
          <span className="text-sm font-medium text-stone-700">#{order.orderId}</span>
        </div>
        <span className="text-xs text-stone-400">{formatDate(order.createdAt)}</span>
      </div>

      <div className="px-6 py-4">
        <p className="text-sm text-stone-500">{order.address}</p>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <span className="text-sm text-stone-500">총 결제 금액</span>
          <span className="font-bold text-stone-900">{order.totalPrice.toLocaleString()}원</span>
        </div>
        {cancellable && (
          <button
            onClick={() => onCancel(order.orderId)}
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
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const handleCancel = async (orderId: number) => {
    if (!confirm("주문을 취소하시겠습니까?")) return;
    setCancellingId(orderId);
    try {
      const res = await fetch(`/api/${orderId}/status?status=CANCELLED`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error();
      setOrders((prev) =>
        prev.map((o) => o.orderId === orderId ? { ...o, orderStatus: "CANCELLED" } : o)
      );
    } catch {
      alert("주문 취소에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setCancellingId(null);
    }
  };

  const handleSearch = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email.trim())}`);
      if (!res.ok) throw new Error("조회 실패");
      const data: ApiOrder[] = await res.json();
      setOrders(data);
      setSearched(true);
    } catch {
      setError("주문 내역을 불러오지 못했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
              className="h-12 px-6 rounded-xl bg-stone-800 text-white font-semibold text-sm hover:bg-stone-900 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search size={15} />
              {loading ? "조회 중..." : "조회"}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 mb-6">{error}</p>
          )}

          {/* Results */}
          {searched && !loading && (
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
                    <OrderCard
                      key={order.orderId}
                      order={cancellingId === order.orderId ? { ...order, orderStatus: "CANCELLED" } : order}
                      onCancel={handleCancel}
                    />
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
