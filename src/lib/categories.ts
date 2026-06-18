import { ArticleCategory } from "@prisma/client";

export const categoryLabels: Record<ArticleCategory, string> = {
  GEOBIOLOGIE: "Géobiologie",
  MAGNETISME: "Magnétisme",
  THERAPIES_ENERGETIQUES: "Thérapies énergétiques",
  SOURCELLERIE: "Sourcellerie",
  SYLVOTHERAPIE: "Sylvothérapie",
  FENG_SHUI: "Feng Shui",
  RADIESTHESIE: "Radiesthésie",
  FORMATIONS: "Formations",
  ACTUALITE: "Actualité",
};

export const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({
  value: value as ArticleCategory,
  label,
}));
