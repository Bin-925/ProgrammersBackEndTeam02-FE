import Link from "next/link";
import { User } from "lucide-react";
import ProductsNavLink from "./ProductsNavLink";
import CartIcon from "./CartIcon";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-amber-900 tracking-tight"
        >
          코지커피
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <ProductsNavLink />
          <CartIcon />
          <Link
            href="/mypage"
            className="text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="마이페이지"
          >
            <User size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
