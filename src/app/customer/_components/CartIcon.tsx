"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getCartCount } from "../../cart/cartUtils";

export default function CartIcon() {
  const [count, setCount] = useState(0);

  const refresh = async () => {
    const total = await getCartCount();
    setCount(total);
  };

  useEffect(() => {
    refresh();
    window.addEventListener("cartUpdated", refresh);
    return () => {
      window.removeEventListener("cartUpdated", refresh);
    };
  }, []);

  return (
    <Link
      href="/cart"
      className="relative text-stone-500 hover:text-stone-900 transition-colors"
      aria-label="장바구니"
    >
      <ShoppingCart size={20} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-amber-700 text-white text-[10px] font-bold flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
