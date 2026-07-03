"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type Module = {
  title: string;
  points?: string[];
  /** Badge personnalisé (ex. "11-12"). Par défaut : le numéro d'ordre. */
  number?: string;
};

export function ModuleList({ modules }: { modules: Module[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ol className="mt-6 space-y-3">
      {modules.map((module, i) => {
        const hasPoints = !!module.points && module.points.length > 0;
        const isOpen = openIndex === i;

        return (
          <li
            key={module.title}
            className="overflow-hidden rounded-xl border border-forest-100 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              disabled={!hasPoints}
              className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-forest-50 disabled:cursor-default disabled:hover:bg-transparent"
            >
              <span className="flex h-8 min-w-8 shrink-0 items-center justify-center rounded-full bg-forest-600 px-2 text-sm font-semibold text-white">
                {module.number ?? i + 1}
              </span>
              <h4 className="flex-1 font-display text-base font-semibold text-forest-900">
                {module.title}
              </h4>
              {hasPoints && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-forest-600 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
            </button>
            {hasPoints && isOpen && (
              <ul className="space-y-1.5 px-5 pb-5 pl-16 text-sm leading-relaxed text-ink-soft">
                {module.points!.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-400" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}
