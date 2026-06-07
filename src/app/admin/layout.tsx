import "@fontsource/pretendard/400.css";
import "@fontsource/pretendard/500.css";
import "@fontsource/pretendard/600.css";
import "@fontsource/pretendard/700.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="pretendard-root"
      style={
        {
          fontFamily: "'Pretendard', sans-serif",
          "--font-geist-sans": "'Pretendard', sans-serif",
          "--font-sans": "'Pretendard', sans-serif",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
