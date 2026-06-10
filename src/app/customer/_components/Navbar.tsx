import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import ProductsNavLink from "./ProductsNavLink";
import CartIcon from "./CartIcon";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-stone-200 dark:bg-stone-900 dark:border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Cozy Coffee" width={60} height={60} className="rounded-md" unoptimized />
          <span className="text-lg font-bold text-stone-900 dark:text-white">코지커피</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            href="/"
            className="hidden sm:block text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors dark:text-stone-400 dark:hover:text-stone-100"
          >
            Home
          </Link>
          <ProductsNavLink />
          <CartIcon />
          <Link
            href="/mypage"
            className="text-stone-500 hover:text-stone-900 transition-colors dark:text-stone-400 dark:hover:text-stone-100"
            aria-label="마이페이지"
          >
            <User size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
