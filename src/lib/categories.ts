import { ArticleCategory } from "@prisma/client";

export const categoryLabels: Record<ArticleCategory, string> = {
  GEOBIOLOGIE: "Géobiologie",
  MAGNETISME: "Magnétisme",
  THERAPIES_ENERGETIQUES: "Thérapies énergétiques",
  SOURCELLERIE: "Sourcellerie",
  SYLVOTHERAPIE: "Sylvothérapie",
  TRACES_DES_BATISSEURS: "Tracés des bâtisseurs",
  MANDALA: "Mandala",
  ACUPRESSURE: "Acupressure",
  TUTORAT: "Tutorat",
  FORMATIONS: "Formations",
  ACTUALITE: "Actualité",
};

export const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({
  value: value as ArticleCategory,
  label,
}));
