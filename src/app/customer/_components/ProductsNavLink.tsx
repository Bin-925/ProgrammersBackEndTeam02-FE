"use client";

import { usePathname, useRouter } from "next/navigation";

export default function ProductsNavLink() {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById("product-list")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#product-list");
    }
  };

  return (
    <a
      href="/#product-list"
      onClick={handleClick}
      className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors dark:text-stone-400 dark:hover:text-stone-100"
    >
      Products
    </a>
  );
}
