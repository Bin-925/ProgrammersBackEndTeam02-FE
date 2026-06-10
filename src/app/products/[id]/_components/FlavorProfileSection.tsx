import type { FlavorProfile } from "../types";

function ReadOnlySlider({
  value,
  leftLabel,
  rightLabel,
}: {
  value: number;
  leftLabel: string;
  rightLabel: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs text-stone-400 mb-2 dark:text-stone-500">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className="relative h-1.5 bg-stone-200 rounded-full dark:bg-stone-700">
        <div
          className="absolute inset-y-0 left-0 bg-stone-700 rounded-full dark:bg-amber-500"
          style={{ width: `${value}%` }}
        />
        <div
          className="absolute w-4 h-4 bg-white border-2 border-stone-700 rounded-full shadow-sm dark:bg-stone-900 dark:border-amber-500"
          style={{
            left: `${value}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}

export default function FlavorProfileSection({
  flavorProfile,
}: {
  flavorProfile: FlavorProfile;
}) {
  return (
    <section className="bg-white py-8 sm:py-16 dark:bg-stone-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Label */}
        <p className="text-center text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4 dark:text-stone-500">
          풍미 프로필
        </p>

        {/* Flavor notes title */}
        <h2 className="text-center text-2xl font-bold text-stone-900 mb-12 dark:text-white">
          {flavorProfile.notes}
        </h2>

        <div className="max-w-xl mx-auto flex flex-col gap-10">
          <div>
            <p className="text-sm font-semibold text-stone-700 mb-4 text-center dark:text-stone-300">풍미</p>
            <ReadOnlySlider
              value={flavorProfile.floralFruity}
              leftLabel="플로럴 / 프루티"
              rightLabel="다크 초콜릿"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-700 mb-4 text-center dark:text-stone-300">로스팅</p>
            <ReadOnlySlider
              value={flavorProfile.roastLevel}
              leftLabel="라이트"
              rightLabel="다크"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
