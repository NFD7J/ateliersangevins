import { ArticleCategory } from "@prisma/client";

export const categoryLabels: Record<ArticleCategory, string> = {
  GEOBIOLOGIE: "Géobiologie",
  MAGNETISME: "Magnétisme",
  THERAPIES_ENERGETIQUES: "Thérapies énergétiques",
  MANDALA: "Mandala",
  SOURCELLERIE: "Sourcellerie",
  SYLVOTHERAPIE: "Sylvothérapie",
  RADIESTHESIE: "Radiesthésie",
  FORMATIONS: "Formations",
  ACTUALITE: "Actualité",
};

export const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({
  value: value as ArticleCategory,
  label,
}));
