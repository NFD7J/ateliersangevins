"use client";

import { saveEvent } from "@/app/espace-equipe/agenda/actions";

type EventFormValues = {
  id?: string;
  date: Date | string;
  title: string;
  description: string;
  category: string;
  published: boolean;
};

export function EventForm({ event }: { event?: EventFormValues }) {
  const dateValue = event?.date
    ? new Date(event.date).toISOString().slice(0, 10)
    : "";

  return (
    <form action={saveEvent} className="space-y-6">
      {event?.id && <input type="hidden" name="id" value={event.id} />}

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-ink">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={dateValue}
          className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-ink">
          Titre
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={event?.title}
          className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-ink">
          Catégorie
        </label>
        <input
          id="category"
          name="category"
          type="text"
          required
          placeholder="Portes ouvertes, Sylvothérapie, Géobiologie..."
          defaultValue={event?.category}
          className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={event?.description}
          className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={event?.published ?? true}
          className="accent-forest-600"
        />
        Publier l&apos;événement (visible sur le site)
      </label>

      <button
        type="submit"
        className="rounded-full bg-forest-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
      >
        Enregistrer
      </button>
    </form>
  );
}
