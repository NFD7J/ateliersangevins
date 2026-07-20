"use client";

import { ArticleCategory } from "@prisma/client";
import { categoryOptions } from "@/lib/categories";
import { saveAvis } from "@/app/espace-equipe/temoignages/actions";

type AvisFormValues = {
  id?: string;
  name: string;
  avis: string;
  formation: ArticleCategory[];
};

export function AvisForm({ temoignage }: { temoignage?: AvisFormValues }) {
  return (
    <form action={saveAvis} className="space-y-6">
      {temoignage?.id && <input type="hidden" name="id" value={temoignage.id} />}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Prénom Nom"
          defaultValue={temoignage?.name}
          className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-ink">Catégorie(s)</span>
        <div className="mt-2 flex flex-wrap gap-3">
          {categoryOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 rounded-full border border-forest-200 px-3 py-1.5 text-sm text-ink-soft"
            >
              <input
                type="checkbox"
                name="formation"
                value={option.value}
                defaultChecked={temoignage?.formation.includes(option.value)}
                className="accent-forest-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="avis" className="block text-sm font-medium text-ink">
          Témoignage
        </label>
        <textarea
          id="avis"
          name="avis"
          required
          rows={5}
          placeholder="Le témoignage de la personne…"
          defaultValue={temoignage?.avis}
          className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-forest-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
      >
        Enregistrer
      </button>
    </form>
  );
}
