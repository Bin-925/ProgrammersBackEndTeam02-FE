import { AtSign, Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <p className="text-sm">코지커피 &copy; 2024. All rights reserved.</p>
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
