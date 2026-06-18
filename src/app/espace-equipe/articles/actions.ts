"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ArticleCategory } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }
  return session.user;
}

export async function uploadArticleImage(formData: FormData): Promise<string | null> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder: "ateliersangevins",
  });

  return result.secure_url;
}

export async function saveArticle(formData: FormData) {
  const admin = await requireAdmin();

  const id = formData.get("id")?.toString() || undefined;
  const title = formData.get("title")?.toString().trim() ?? "";
  const excerpt = formData.get("excerpt")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString() ?? "";
  const coverImage = formData.get("coverImage")?.toString() || null;
  const published = formData.get("published") === "on";
  const categories = formData.getAll("categories") as ArticleCategory[];

  if (!title || !excerpt || !content) {
    throw new Error("Titre, extrait et contenu sont obligatoires.");
  }

  const baseSlug = slugify(title);
  let slug = baseSlug;
  let suffix = 1;
  while (
    await prisma.article.findFirst({
      where: { slug, ...(id ? { id: { not: id } } : {}) },
    })
  ) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const data = {
    title,
    excerpt,
    content,
    coverImage,
    published,
    categories,
    slug,
  };

  if (id) {
    await prisma.article.update({ where: { id }, data });
  } else {
    await prisma.article.create({ data: { ...data, authorId: admin.id! } });
  }

  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/espace-equipe/articles");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/espace-equipe/articles");
  revalidatePath("/");
}
