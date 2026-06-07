"use client";

export default function ProductsNavLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("product-list")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a
      href="#product-list"
      onClick={handleClick}
      className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors"
    >
      Products
    </a>
  );
}
