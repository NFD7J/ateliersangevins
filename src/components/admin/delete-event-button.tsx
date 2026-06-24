"use client";

import { useTransition } from "react";
import { deleteEvent } from "@/app/espace-equipe/agenda/actions";

export function DeleteEventButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Supprimer définitivement cet événement ?")) return;
    startTransition(() => {
      deleteEvent(id);
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
