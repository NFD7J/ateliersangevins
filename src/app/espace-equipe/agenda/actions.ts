"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }
  return session.user;
}

const eventSchema = z.object({
  date: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), "Date invalide."),
  title: z.string().trim().min(1, "Le titre est obligatoire.").max(200),
  description: z
    .string()
    .trim()
    .min(1, "La description est obligatoire.")
    .max(5_000),
  category: z.string().trim().min(1, "La catégorie est obligatoire.").max(100),
  published: z.boolean(),
});

export async function saveEvent(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id")?.toString() || undefined;

  const parsed = eventSchema.safeParse({
    date: formData.get("date")?.toString() ?? "",
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    category: formData.get("category")?.toString() ?? "",
    published: formData.get("published") === "on",
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Données invalides.");
  }
  const { date, title, description, category, published } = parsed.data;

  const data = {
    date: new Date(date),
    title,
    description,
    category,
    published,
  };

  if (id) {
    await prisma.event.update({ where: { id }, data });
  } else {
    await prisma.event.create({ data });
  }

  revalidatePath("/agenda");
  revalidatePath("/");
  redirect("/espace-equipe/agenda");
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  await prisma.event.delete({ where: { id } });
  revalidatePath("/agenda");
  revalidatePath("/espace-equipe/agenda");
  revalidatePath("/");
}
