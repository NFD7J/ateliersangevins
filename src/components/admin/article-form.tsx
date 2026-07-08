"use client";

import { useRef, useState } from "react";
import { ArticleCategory } from "@prisma/client";
import { categoryOptions } from "@/lib/categories";
import { saveArticle, uploadArticleImage } from "@/app/espace-equipe/articles/actions";

type ArticleFormValues = {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  categories: ArticleCategory[];
};

export function ArticleForm({ article }: { article?: ArticleFormValues }) {
  const [coverImage, setCoverImage] = useState(article?.coverImage ?? "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadArticleImage(formData);
      if (url) setCoverImage(url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={saveArticle} className="space-y-6">
      {article?.id && <input type="hidden" name="id" value={article.id} />}
      <input type="hidden" name="coverImage" value={coverImage} />

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-ink">
          Titre
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={article?.title}
          className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-ink">
          Extrait (affiché dans les listes d&apos;articles)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={article?.excerpt}
          className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-ink">Image de couverture</span>
        <div className="mt-2 flex items-center gap-4">
          {coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverImage} alt="" className="h-16 w-24 rounded-lg object-cover" />
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="rounded-full border border-forest-300 px-4 py-2 text-sm font-medium text-forest-700 hover:bg-forest-50 disabled:opacity-50"
          >
            {uploading ? "Envoi en cours..." : coverImage ? "Changer l'image" : "Choisir une image"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <div>
        <span className="block text-sm font-medium text-ink">Catégories</span>
        <div className="mt-2 flex flex-wrap gap-3">
          {categoryOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 rounded-full border border-forest-200 px-3 py-1.5 text-sm text-ink-soft"
            >
              <input
                type="checkbox"
                name="categories"
                value={option.value}
                defaultChecked={article?.categories.includes(option.value)}
                className="accent-forest-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-ink">
          Contenu (Markdown)
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={16}
          defaultValue={article?.content}
          placeholder={"## Un titre\n\nVotre texte ici. Vous pouvez utiliser **gras**, *italique*, des listes, etc."}
          className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 font-mono text-sm focus:border-forest-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-ink-soft">
          Supporte le Markdown : ## titres, **gras**, *italique*,
        </p>
        <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noreferrer" className="text-forest-600 hover:underline">
          Documentation
        </a>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={article?.published ?? true}
          className="accent-forest-600"
        />
        Publier l&apos;article (visible sur le site)
      </label>

      <button
        type="submit"
        disabled={uploading}
        className="rounded-full bg-forest-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700 disabled:opacity-50"
      >
        Enregistrer
      </button>
    </form>
  );
}
