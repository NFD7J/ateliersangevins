import { z } from "zod";

// Les différentes mises en page proposées pour une section d'article.
export const BLOCK_LAYOUTS = ["text-images-right", "text-images-below"] as const;
export type BlockLayout = (typeof BLOCK_LAYOUTS)[number];

export const blockLayoutLabels: Record<BlockLayout, string> = {
  "text-images-right": "Texte avec 1 ou 2 images à droite",
  "text-images-below": "Texte, 1 ou 2 images en dessous, puis texte",
};

// Les images d'une section sont, comme la couverture, servies par next/image
// dont les remotePatterns sont limités à Cloudinary.
const CLOUDINARY_URL = /^https:\/\/res\.cloudinary\.com\//;

export const articleBlockSchema = z.object({
  layout: z.enum(BLOCK_LAYOUTS),
  text: z.string().max(20_000).default(""),
  images: z.array(z.string().regex(CLOUDINARY_URL, "Image de section invalide.")).max(2).default([]),
  // Utilisé uniquement par la mise en page "text-images-below".
  textAfter: z.string().max(20_000).default(""),
});

export type ArticleBlock = z.infer<typeof articleBlockSchema>;

export const articleBlocksSchema = z.array(articleBlockSchema).max(30);

// Les blocs sont stockés en colonne Json : à la lecture ils arrivent déjà
// désérialisés, mais le formulaire les envoie sous forme de chaîne JSON.
// On accepte les deux et on ne renvoie que des blocs valides.
export function parseArticleBlocks(raw: unknown): ArticleBlock[] {
  if (raw == null) return [];
  let value: unknown = raw;
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    try {
      value = JSON.parse(trimmed);
    } catch {
      return [];
    }
  }
  const result = articleBlocksSchema.safeParse(value);
  return result.success ? result.data : [];
}
