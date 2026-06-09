"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Globe, Star, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    icon: Globe,
    title: "Farm to Cup",
    description: "전 세계 최고의 농장에서\n직접 소싱한 원두만 취급합니다",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-900",
  },
  {
    icon: Star,
    title: "Specialty Grade",
    description: "엄격한 품질 기준을 통과한\n스페셜티 등급만 판매합니다",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-900",
  },
  {
    icon: Truck,
    title: "Daily",
    description: "매일 오후 2시, 전날 주문을 모아\n한번에 배송합니다",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-900",
  },
];

function WavyLine({ visible, delay }: { visible: boolean; delay: number }) {
  return (
    <div className="flex-1 mt-[10px]">
      <svg
        className="w-full"
        height="60"
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <path
          d="M 0,30 C 80,65 120,0 200,30"
          stroke="#d6b896"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={visible ? 0 : 1}
          style={{ transition: `stroke-dashoffset 1s ease ${delay}s` }}
        />
      </svg>
    </div>
  );
}

export default function WhySection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-white to-amber-50/40 py-14 sm:py-24 dark:from-stone-900 dark:to-stone-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-20 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0s" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4 dark:text-white">
            Why{" "}
            <span className="text-amber-700 dark:text-amber-400">코지?</span>
          </h2>
          <p className="text-stone-500 leading-relaxed text-sm sm:text-base dark:text-stone-400">
            저희는 단순한 커피 원두 쇼핑몰이 아닙니다.
            <br />
            전 세계 농장에서 직접 엄선한 스페셜티 원두만을 여러분의 집으로 전달합니다.
          </p>
        </div>

        {/* Icons — vertical on mobile, horizontal on desktop */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-0">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const itemDelay = idx * 0.35;
            return (
              <Fragment key={feature.title}>
                <div className="flex flex-col items-center text-center w-full sm:w-48 sm:flex-none">
                  {/* Icon box */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-700 dark:bg-amber-900/30 ${feature.iconBg} ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: `${itemDelay}s` }}
                  >
                    <Icon size={28} className={feature.iconColor} />
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold text-stone-900 mb-2 transition-all duration-700 dark:text-white ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: `${itemDelay + 0.1}s` }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-stone-500 text-sm leading-relaxed whitespace-pre-line transition-all duration-700 dark:text-stone-400 ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: `${itemDelay + 0.2}s` }}
                  >
                    {feature.description}
                  </p>
                </div>

                {idx < features.length - 1 && (
                  <div className="hidden sm:flex flex-1 mt-[10px]">
                    <WavyLine visible={visible} delay={itemDelay + 0.3} />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
