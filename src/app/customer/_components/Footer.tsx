import Image from "next/image";
import { AtSign, Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Cozy Coffee" width={33} height={33} className="rounded opacity-80" unoptimized />
          <span className="text-sm font-semibold text-stone-300">코지커피</span>
          <span className="text-stone-600 text-sm">&copy; 2024</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
            <AtSign size={18} />
          </a>
          <a href="#" aria-label="X (Twitter)" className="hover:text-white transition-colors">
            <Share2 size={18} />
          </a>
          <a href="#" aria-label="Website" className="hover:text-white transition-colors">
            <Globe size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
