"use client";

import { useRef, useState } from "react";
import {
  BLOCK_LAYOUTS,
  blockLayoutLabels,
  type ArticleBlock,
  type BlockLayout,
} from "@/lib/article-blocks";
import { uploadArticleImage } from "@/app/espace-equipe/articles/actions";

// Chaque bloc reçoit une clé locale stable pour l'affichage de la liste React.
type EditorBlock = ArticleBlock & { key: string };

let keyCounter = 0;
function nextKey() {
  keyCounter += 1;
  return `block-${keyCounter}-${Date.now()}`;
}

function toEditorBlock(block: ArticleBlock): EditorBlock {
  return { ...block, key: nextKey() };
}

function emptyBlock(layout: BlockLayout): EditorBlock {
  return { key: nextKey(), layout, text: "", images: [], textAfter: "" };
}

export function ArticleBlocksEditor({ initialBlocks }: { initialBlocks: ArticleBlock[] }) {
  const [blocks, setBlocks] = useState<EditorBlock[]>(() => initialBlocks.map(toEditorBlock));

  function updateBlock(key: string, patch: Partial<EditorBlock>) {
    setBlocks((prev) => prev.map((b) => (b.key === key ? { ...b, ...patch } : b)));
  }

  function addBlock() {
    setBlocks((prev) => [...prev, emptyBlock("text-images-right")]);
  }

  function removeBlock(key: string) {
    setBlocks((prev) => prev.filter((b) => b.key !== key));
  }

  function moveBlock(key: string, direction: -1 | 1) {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.key === key);
      const target = index + direction;
      if (index === -1 || target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  // Ce que le serveur reçoit : uniquement les champs métier, sans les clés locales.
  const serialized = JSON.stringify(
    blocks.map(({ key: _key, ...block }) => block), // eslint-disable-line @typescript-eslint/no-unused-vars
  );

  return (
    <div>
      <span className="block text-sm font-medium text-ink">Sections illustrées (optionnel)</span>
      <p className="mt-1 text-xs text-ink-soft">
        Ajoutez des sections combinant du texte et une ou deux images, affichées après le contenu
        principal.
      </p>
      <input type="hidden" name="blocks" value={serialized} />

      <div className="mt-4 space-y-6">
        {blocks.map((block, index) => (
          <BlockCard
            key={block.key}
            block={block}
            index={index}
            isFirst={index === 0}
            isLast={index === blocks.length - 1}
            onChange={(patch) => updateBlock(block.key, patch)}
            onRemove={() => removeBlock(block.key)}
            onMove={(direction) => moveBlock(block.key, direction)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addBlock}
        className="mt-4 rounded-full border border-forest-300 px-4 py-2 text-sm font-medium text-forest-700 hover:bg-forest-50"
      >
        + Ajouter une section
      </button>
    </div>
  );
}

function BlockCard({
  block,
  index,
  isFirst,
  isLast,
  onChange,
  onRemove,
  onMove,
}: {
  block: EditorBlock;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onChange: (patch: Partial<EditorBlock>) => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  return (
    <div className="rounded-xl border border-forest-200 p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-forest-800">Section {index + 1}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={isFirst}
            aria-label="Monter la section"
            className="rounded px-2 py-1 text-forest-600 hover:bg-forest-50 disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={isLast}
            aria-label="Descendre la section"
            className="rounded px-2 py-1 text-forest-600 hover:bg-forest-50 disabled:opacity-30"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50"
          >
            Supprimer
          </button>
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-xs font-medium text-ink-soft">Mise en page</label>
        <select
          value={block.layout}
          onChange={(e) => onChange({ layout: e.target.value as BlockLayout })}
          className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
        >
          {BLOCK_LAYOUTS.map((layout) => (
            <option key={layout} value={layout}>
              {blockLayoutLabels[layout]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <label className="block text-xs font-medium text-ink-soft">Texte (Markdown)</label>
        <textarea
          value={block.text}
          onChange={(e) => onChange({ text: e.target.value })}
          rows={5}
          className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 font-mono text-sm focus:border-forest-500 focus:outline-none"
        />
      </div>

      <BlockImagesField images={block.images} onChange={(images) => onChange({ images })} />

      {block.layout === "text-images-below" && (
        <div className="mt-3">
          <label className="block text-xs font-medium text-ink-soft">
            Texte après les images (Markdown, optionnel)
          </label>
          <textarea
            value={block.textAfter}
            onChange={(e) => onChange({ textAfter: e.target.value })}
            rows={4}
            className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 font-mono text-sm focus:border-forest-500 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}

function BlockImagesField({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // On réinitialise l'input pour pouvoir ré-uploader le même fichier.
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadArticleImage(formData);
      if (url) onChange([...images, url]);
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="mt-3">
      <span className="block text-xs font-medium text-ink-soft">Images (1 ou 2)</span>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {images.map((url, i) => (
          <div key={`${url}-${i}`} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-16 w-24 rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              aria-label="Retirer l'image"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white"
            >
              ×
            </button>
          </div>
        ))}
        {images.length < 2 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="rounded-full border border-forest-300 px-4 py-2 text-sm font-medium text-forest-700 hover:bg-forest-50 disabled:opacity-50"
          >
            {uploading ? "Envoi en cours..." : "Ajouter une image"}
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
