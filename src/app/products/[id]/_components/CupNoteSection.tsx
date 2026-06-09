import type { CupNote, CupNoteScores } from "../types";

function CoffeeBean({ filled }: { filled: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse
        cx="12" cy="12" rx="5.5" ry="9"
        transform="rotate(-30 12 12)"
        className={filled ? "fill-stone-800 stroke-stone-800 dark:fill-amber-500 dark:stroke-amber-500" : "fill-none stroke-stone-300 dark:stroke-stone-600"}
        strokeWidth="1.5"
      />
      <path
        d="M 16 5 Q 12 12 8 19"
        className={filled ? "stroke-stone-500 dark:stroke-amber-700" : "stroke-stone-200 dark:stroke-stone-700"}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const metrics: { label: string; key: keyof CupNoteScores }[] = [
  { label: "Overall", key: "overall" },
  { label: "Body", key: "body" },
  { label: "Acidity", key: "acidity" },
  { label: "Balance", key: "balance" },
  { label: "Flavor", key: "flavor" },
  { label: "Sweetness", key: "sweetness" },
];

export default function CupNoteSection({ cupNote }: { cupNote: CupNote }) {
  return (
    <section className="bg-stone-50 py-16 dark:bg-stone-950">
      <div className="max-w-6xl mx-auto px-8">
        <div className="bg-white rounded-2xl p-10 border border-stone-100 shadow-sm dark:bg-stone-900 dark:border-stone-800">
          <h2 className="text-xl font-bold text-stone-900 mb-8 tracking-tight dark:text-white">
            CUP NOTE :{" "}
            <span className="font-medium text-stone-600 dark:text-stone-400">{cupNote.title}</span>
          </h2>

          <div className="space-y-5">
            {metrics.map(({ label, key }) => {
              const score = cupNote.scores[key];
              return (
                <div key={label} className="flex items-center gap-10">
                  <span className="w-20 text-sm font-medium text-stone-700 shrink-0 dark:text-stone-300">{label}</span>
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
