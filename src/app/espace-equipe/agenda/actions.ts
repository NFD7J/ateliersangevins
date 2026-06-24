"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }
  return session.user;
}

export async function saveEvent(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id")?.toString() || undefined;
  const date = formData.get("date")?.toString() ?? "";
  const title = formData.get("title")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim() ?? "";
  const category = formData.get("category")?.toString().trim() ?? "";
  const published = formData.get("published") === "on";

  if (!date || !title || !description || !category) {
    throw new Error("Date, titre, catégorie et description sont obligatoires.");
  }

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
