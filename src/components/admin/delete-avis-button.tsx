"use client";

import { useTransition } from "react";
import { deleteAvis } from "@/app/espace-equipe/temoignages/actions";

export function DeleteAvisButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Supprimer définitivement ce témoignage ?")) return;
    startTransition(() => {
      deleteAvis(id);
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
