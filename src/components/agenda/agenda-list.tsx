"use client";

import { Fragment, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn, formatDateRange } from "@/lib/utils";

type AgendaEvent = {
  id: string;
  title: string;
  date: Date;
  endDate?: Date | null;
  category: string;
  description: string;
  pdf?: string | null;
};

const VISIBLE_COUNT = 7;

const eventEnd = (e: AgendaEvent) =>
  new Date(e.endDate ?? e.date).getTime();
const eventStart = (e: AgendaEvent) => new Date(e.date).getTime();

export function AgendaList({ events }: { events: AgendaEvent[] }) {
  const [showAll, setShowAll] = useState(false);

  const now = Date.now();
  const upcoming = events
    .filter((e) => eventEnd(e) >= now)
    .sort((a, b) => eventStart(a) - eventStart(b)); // le plus proche d'abord
  const past = events
    .filter((e) => eventEnd(e) < now)
    .sort((a, b) => eventStart(b) - eventStart(a)); // le plus récent d'abord
  const ordered = [...upcoming, ...past];

  const visibleEvents = showAll ? ordered : ordered.slice(0, VISIBLE_COUNT);
  const firstPastId = past[0]?.id;

  return (
    <>
      <ol className="mt-10 space-y-6">
        {visibleEvents.map((event) => {
          const showPastDivider = event.id === firstPastId;
          const startDate = new Date(event.date);
          const endDate = event.endDate ? new Date(event.endDate) : null;
          const isPast = (endDate ?? startDate) < new Date();
          const isRange =
            endDate && startDate.toDateString() !== endDate.toDateString();
          const sameMonth =
            isRange &&
            startDate.getMonth() === endDate.getMonth() &&
            startDate.getFullYear() === endDate.getFullYear();
          const monthShort = (d: Date) =>
            d.toLocaleDateString("fr-FR", { month: "short" });

          return (
            <Fragment key={event.id}>
              {showPastDivider && (
                <li className="flex items-center gap-4 pt-4 text-sm font-semibold uppercase tracking-widest text-ink-soft">
                  <span className="h-px flex-1 bg-forest-100" />
                  Événements passés
                  <span className="h-px flex-1 bg-forest-100" />
                </li>
              )}
              <a
                href={event.pdf ?? "#"}
                target={event.pdf ? "_blank" : undefined}
                rel={event.pdf ? "noopener noreferrer" : undefined}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl border border-forest-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:gap-8",
                  isPast && "opacity-60"
                )}
              >
              <div
                className={cn(
                  "flex shrink-0 flex-col items-center justify-center rounded-xl px-5 py-3 text-white",
                  isPast ? "bg-ink-soft" : "bg-forest-600"
                )}
              >
                {!isRange && (
                  <>
                    <span className="text-2xl font-semibold">{startDate.getDate()}</span>
                    <span className="text-xs uppercase tracking-wide">
                      {monthShort(startDate)}
                    </span>
                  </>
                )}
                {isRange && sameMonth && (
                  <>
                    <span className="text-2xl font-semibold">
                      {startDate.getDate()}-{endDate.getDate()}
                    </span>
                    <span className="text-xs uppercase tracking-wide">
                      {monthShort(startDate)}
                    </span>
                  </>
                )}
                {isRange && !sameMonth && (
                  <>
                    <span className="text-base font-semibold leading-tight">
                      {startDate.getDate()} {monthShort(startDate)}
                    </span>
                    <span className="text-xs uppercase tracking-wide">-</span>
                    <span className="text-base font-semibold leading-tight">
                      {endDate.getDate()} {monthShort(endDate)}
                    </span>
                  </>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge>{event.category}</Badge>
                  {isPast && <Badge className="bg-ink-soft/20 text-ink-soft">Terminé</Badge>}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-forest-900">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  {formatDateRange(event.date, event.endDate)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{event.description}</p>
              </div>
              </a>
            </Fragment>
          );
        })}
      </ol>

      {!showAll && events.length > VISIBLE_COUNT && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
          >
            Voir tous les événements
          </button>
        </div>
      )}
    </>
  );
}
