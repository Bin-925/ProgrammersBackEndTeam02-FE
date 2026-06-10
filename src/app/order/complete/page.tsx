import Link from "next/link";
import Navbar from "../../customer/_components/Navbar";
import Footer from "../../customer/_components/Footer";

export default function OrderCompletePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white min-h-screen flex items-start justify-center pt-16 pb-16 dark:bg-stone-950">
        <div className="w-full max-w-2xl mx-auto px-8">
          <div className="bg-stone-50 rounded-3xl px-16 py-20 text-center dark:bg-stone-900">

            {/* 애니메이션 체크마크 */}
            <div className="flex justify-center mb-8">
              <svg viewBox="0 0 100 100" width="96" height="96">
                <circle
                  cx="50" cy="50" r="46"
                  fill="none"
                  stroke="#a5dc86"
                  strokeWidth="5"
                  strokeDasharray="289"
                  strokeDashoffset="289"
                  style={{ animation: "success-circle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards" }}
                />
                <path
                  d="M 22,54 L 40,72 L 78,33"
                  fill="none"
                  stroke="#a5dc86"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="80"
                  strokeDashoffset="80"
                  style={{ animation: "success-check 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards" }}
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-stone-900 mb-4 dark:text-white">
              주문이 완료되었습니다!
            </h1>
            <p className="text-stone-500 mb-12 dark:text-stone-400">
              배송 정보는 입력하신 이메일로 전송됩니다.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 font-semibold hover:bg-stone-50 transition-colors dark:bg-stone-800 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-700"
              >
                홈으로 돌아가기
              </Link>
              <Link
                href="/mypage"
                className="px-8 py-3 rounded-xl bg-stone-800 text-white font-semibold hover:bg-stone-900 transition-colors dark:bg-amber-700 dark:hover:bg-amber-600"
              >
                마이페이지
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
