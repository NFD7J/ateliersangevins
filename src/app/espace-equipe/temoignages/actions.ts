"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ArticleCategory } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }
  return session.user;
}

const VALID_CATEGORIES = new Set<string>(Object.values(ArticleCategory));

const avisSchema = z.object({
  name: z.string().trim().min(1, "Le nom est obligatoire.").max(120),
  avis: z.string().trim().min(1, "Le témoignage est obligatoire.").max(5_000),
});

export async function saveAvis(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id")?.toString() || undefined;

  const parsed = avisSchema.safeParse({
    name: formData.get("name")?.toString() ?? "",
    avis: formData.get("avis")?.toString() ?? "",
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Données invalides.");
  }

  // On ne garde que les valeurs qui existent réellement dans l'enum ArticleCategory.
  const formation = formData
    .getAll("formation")
    .map((v) => v.toString())
    .filter((v) => VALID_CATEGORIES.has(v)) as ArticleCategory[];

  if (formation.length === 0) {
    throw new Error("Sélectionnez au moins une catégorie.");
  }

  const data = {
    name: parsed.data.name,
    avis: parsed.data.avis,
    formation,
  };

  if (id) {
    await prisma.avis.update({ where: { id }, data });
  } else {
    await prisma.avis.create({ data: { ...data, date: new Date() } });
  }

  revalidatePath("/temoignages");
  revalidatePath("/");
  redirect("/espace-equipe/temoignages");
}

export async function deleteAvis(id: string) {
  await requireAdmin();
  await prisma.avis.delete({ where: { id } });

  revalidatePath("/temoignages");
  revalidatePath("/espace-equipe/temoignages");
  revalidatePath("/");
}
