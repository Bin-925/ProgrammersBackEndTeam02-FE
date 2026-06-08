import type { ProductDetail } from "../types";

function CoffeeBean({ filled }: { filled: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse
        cx="12" cy="12" rx="5.5" ry="9"
        transform="rotate(-30 12 12)"
        fill={filled ? "#292524" : "none"}
        stroke={filled ? "#292524" : "#d4ccc7"}
        strokeWidth="1.5"
      />
      <path
        d="M 16 5 Q 12 12 8 19"
        stroke={filled ? "#78716c" : "#e7e5e4"}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const metrics: { label: string; key: keyof ProductDetail["cupNote"]["scores"] }[] = [
  { label: "Overall", key: "overall" },
  { label: "Body", key: "body" },
  { label: "Acidity", key: "acidity" },
  { label: "Balance", key: "balance" },
  { label: "Flavor", key: "flavor" },
  { label: "Sweetness", key: "sweetness" },
];

export default function CupNoteSection({ cupNote }: { cupNote: ProductDetail["cupNote"] }) {
  return (
    <section className="bg-stone-50 py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="bg-white rounded-2xl p-10 border border-stone-100 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 mb-8 tracking-tight">
            CUP NOTE :{" "}
            <span className="font-medium text-stone-600">{cupNote.title}</span>
          </h2>

          <div className="space-y-5">
            {metrics.map(({ label, key }) => {
              const score = cupNote.scores[key];
              return (
                <div key={label} className="flex items-center gap-10">
                  <span className="w-20 text-sm font-medium text-stone-700 shrink-0">{label}</span>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <CoffeeBean key={i} filled={i < score} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
