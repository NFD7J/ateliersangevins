"use client";

import { useTransition } from "react";
import { deleteArticle } from "@/app/espace-equipe/articles/actions";

export function DeleteArticleButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Supprimer définitivement cet article ?")) return;
    startTransition(() => {
      deleteArticle(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm font-medium text-terracotta-600 hover:text-terracotta-700 disabled:opacity-50"
    >
      {isPending ? "Suppression..." : "Supprimer"}
    </button>
  );
}
