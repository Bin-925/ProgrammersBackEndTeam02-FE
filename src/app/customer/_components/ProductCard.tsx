"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageOff, ArrowRight } from "lucide-react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const roastingStyle: Record<Product["roasting"], string> = {
  라이트: "bg-white/20 text-white",
  미디엄: "bg-white/20 text-white",
  다크: "bg-white/20 text-white",
};

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const isSoldOut = product.stock === 0;

  return (
    <Link href={`/products/${product.id}`} className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer block">
      {/* Background: image or placeholder */}
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          className="absolute inset-12 w-[calc(100%-6rem)] h-[calc(100%-6rem)] object-contain group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-stone-300 dark:bg-stone-700 flex items-center justify-center">
          <ImageOff size={40} className="text-stone-400" />
        </div>
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 from-0% via-black/30 via-[20%] to-transparent to-[50%]" />

      {/* 품절 오버레이 */}
      {isSoldOut && (
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2">
          <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Sold Out</span>
          <span className="px-6 py-2 rounded-full bg-white/15 border border-white/30 text-white text-base font-bold tracking-widest backdrop-blur-sm">
            품 절
          </span>
        </div>
      )}

      {/* Text overlay — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 flex flex-col gap-1 sm:gap-2">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border border-white/30 ${roastingStyle[product.roasting]}`}>
            {product.roasting}
          </span>
          {product.acidity && (
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border border-white/30 bg-white/20 text-white">
              산미
            </span>
          )}
          {product.isDecaf && (
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border border-white/30 bg-white/20 text-white">
              디카페인
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-white font-bold text-sm sm:text-lg leading-snug">{product.name}</h3>

        {/* Description — desktop only */}
        <p className="hidden sm:block text-white/75 text-sm">{product.shortDescription}</p>

        {/* Arrow */}
        <div className="flex justify-end mt-0.5 sm:mt-1">
          <ArrowRight
            size={18}
            className="text-white/80 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}
