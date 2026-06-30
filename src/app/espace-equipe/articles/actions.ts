"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ArticleCategory } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { slugify } from "@/lib/utils";
import { sendNotificationEmail } from "@/lib/send-mail";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || !session.user.name) {
    throw new Error("Non autorisé");
  }
  // On renvoie un objet dont `id` et `name` sont garantis `string`
  // (et non plus `string | null | undefined`).
  return { ...session.user, id: session.user.id, name: session.user.name };
}

// Image-upload constraints (also enforced by Cloudinary via resource_type).
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

// Only Cloudinary URLs may be stored as a cover image: the value is rendered
// through next/image, whose remotePatterns are already limited to Cloudinary.
const CLOUDINARY_URL = /^https:\/\/res\.cloudinary\.com\//;

const VALID_CATEGORIES = new Set<string>(Object.values(ArticleCategory));

const articleSchema = z.object({
  title: z.string().trim().min(1, "Le titre est obligatoire.").max(200),
  excerpt: z.string().trim().min(1, "L'extrait est obligatoire.").max(500),
  content: z.string().trim().min(1, "Le contenu est obligatoire.").max(50_000),
  coverImage: z
    .string()
    .regex(CLOUDINARY_URL, "Image de couverture invalide.")
    .nullable(),
  published: z.boolean(),
});

export async function uploadArticleImage(formData: FormData): Promise<string | null> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return null;

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image trop volumineuse (5 Mo maximum).");
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Format d'image non supporté (JPEG, PNG, WebP, GIF ou AVIF).");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder: "ateliersangevins",
    resource_type: "image", // Cloudinary rejects non-image payloads.
  });

  return result.secure_url;
}

export async function saveArticle(formData: FormData) {
  const admin = await requireAdmin();

  const id = formData.get("id")?.toString() || undefined;

  const parsed = articleSchema.safeParse({
    title: formData.get("title")?.toString() ?? "",
    excerpt: formData.get("excerpt")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
    coverImage: formData.get("coverImage")?.toString() || null,
    published: formData.get("published") === "on",
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Données invalides.");
  }
  const { title, excerpt, content, coverImage, published } = parsed.data;

  // Keep only known enum values; never trust the raw form field.
  const categories = formData
    .getAll("categories")
    .map((c) => c.toString())
    .filter((c) => VALID_CATEGORIES.has(c)) as ArticleCategory[];

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
    await prisma.article.create({ data: { ...data, authorId: admin.id } });
  }

  await sendNotificationEmail({
    type: "article",
    action: id ? "updated" : "created",
    title: title,
    excerpt: excerpt,
    categories: categories,
    published: published,
    author: admin.name,
    actionUrl: "/espace-equipe/articles",
  });

  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/espace-equipe/articles");
}

export async function deleteArticle(id: string) {
  const admin = await requireAdmin();
  const article = await prisma.article.delete({ where: { id } });

  await sendNotificationEmail({
    type: "article",
    action: "deleted",
    title: article.title,
    excerpt: article.excerpt,
    categories: article.categories,
    published: article.published,
    author: admin.name,
    actionUrl: "/espace-equipe/articles",
  });

  revalidatePath("/blog");
  revalidatePath("/espace-equipe/articles");
  revalidatePath("/");
}
