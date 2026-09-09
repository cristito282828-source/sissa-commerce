"use client";

import { useState } from "react";

type Level = {
  name: string;
  requirement: string;
  benefits: string[];
};

type LevelLadderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  levels: Level[];
  cta?: { label: string; href: string };
};

export default function LevelLadder({
  eyebrow,
  title,
  subtitle,
  levels,
  cta,
}: LevelLadderProps) {
  const [active, setActive] = useState(0);
  const safeActive = levels.length > 0 ? Math.min(active, levels.length - 1) : 0;
  const currentLevel = levels[safeActive] ?? null;
  const progressPct = levels.length > 1 ? (safeActive / (levels.length - 1)) * 100 : 0;

  if (!currentLevel) {
    return null;
  }

  return (
    <section className="px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl text-center sm:text-left">
          {eyebrow && <p className="mb-4 text-sm uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</p>}
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-emerald-950">
            <span className="font-belleza italic text-emerald-700">{title}</span>
          </h2>
          {subtitle && <p className="mt-4 text-lg text-stone-600">{subtitle}</p>}
        </div>

        <div className="mt-16">
          <div className="relative">
            <div className="absolute left-0 right-0 top-[15px] h-[2px] bg-emerald-200" />
            <div
              className="absolute left-0 top-[15px] h-[2px] bg-emerald-600 transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />

            <div className="relative flex justify-between">
              {levels.map((lvl, i) => {
                const isActive = i === safeActive;
                const isReached = i <= safeActive;
                return (
                  <button
                    key={lvl.name}
                    type="button"
                    onClick={() => setActive(i)}
                    className="group flex flex-col items-center gap-3 focus:outline-none"
                    aria-current={isActive}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-300 ${
                        isReached
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200"
                      } ${isActive ? "scale-110 ring-2 ring-emerald-200" : ""}`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`max-w-[7rem] text-center text-xs leading-tight transition-colors sm:text-sm ${
                        isActive ? "text-emerald-900" : "text-stone-500 group-hover:text-emerald-700"
                      }`}
                    >
                      {lvl.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            key={safeActive}
            className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 shadow-[0_20px_50px_rgba(16,185,129,0.08)] level-panel-in"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-2xl text-emerald-900 font-belleza italic">
                {currentLevel.name}
              </h3>
              <span className="text-sm text-emerald-700">{currentLevel.requirement}</span>
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {currentLevel.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-stone-700">
                  <span className="mt-0.5 text-emerald-600">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {cta && (
          <div className="mt-12 flex justify-center">
            <a
              href={cta.href}
              className="rounded-full bg-emerald-700 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              {cta.label}
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        .level-panel-in {
          animation: level-panel-in 0.35s ease-out;
        }
        @keyframes level-panel-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
