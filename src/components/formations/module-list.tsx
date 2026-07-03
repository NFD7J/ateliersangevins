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

  const mid = Math.ceil(modules.length / 2);
  const columns = [
    { items: modules.slice(0, mid), offset: 0 },
    { items: modules.slice(mid), offset: mid },
  ];

  const renderModule = (module: Module, i: number) => {
    const hasPoints = !!module.points && module.points.length > 0;
    const isOpen = openIndex === i;

    return (
      <li
        key={module.title}
        className={cn(
          "overflow-hidden rounded-xl border border-forest-100 bg-white transition-shadow",
          isOpen && "shadow-md"
        )}
      >
        <button
          type="button"
          onClick={() => setOpenIndex(isOpen ? null : i)}
          aria-expanded={isOpen}
          disabled={!hasPoints}
          className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-forest-50/50 disabled:cursor-default disabled:hover:bg-transparent"
        >
          <span
            className={cn(
              "flex h-11 min-w-11 shrink-0 items-center justify-center rounded-lg px-2 text-sm font-bold transition-colors",
              isOpen ? "bg-forest-700 text-white" : "bg-forest-100 text-forest-700"
            )}
          >
            {module.number ?? i + 1}
          </span>
          <h4 className="flex-1 font-display text-base font-semibold leading-snug text-forest-900">
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
                "h-5 w-5 shrink-0 text-forest-500 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          )}
        </button>

        <div
          className={cn(
            "grid transition-all duration-200",
            isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
          )}
        >
          <ul className="space-y-1.5 overflow-hidden px-4 pl-[4.5rem] text-sm leading-relaxed text-ink-soft">
            {module.points?.map((point) => (
              <li key={point} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-400" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  };

  return (
    <div className="mt-6 grid items-start gap-3 sm:grid-cols-2">
      {columns.map((column) => (
        <ol key={column.offset} className="space-y-3">
          {column.items.map((module, idx) =>
            renderModule(module, column.offset + idx)
          )}
        </ol>
      ))}
    </div>
  );
}
