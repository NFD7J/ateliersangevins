"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { sendNotificationEmail } from "@/lib/send-mail";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 Mo

// Upload du PDF sur Cloudinary en resource_type "auto" : le PDF est traité
// comme une "image", l'URL renvoyée se termine par ".pdf" et s'ouvre donc
// directement dans le navigateur. Renvoie l'URL complète (secure_url).
async function uploadEventPdf(file: File): Promise<string> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Fichier trop volumineux (5 Mo maximum).");
  }
  if (file.type !== "application/pdf") {
    throw new Error("Le fichier doit être un PDF.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder: "ateliersangevins/agenda",
    resource_type: "auto",
  });

  return result.secure_url;
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || !session.user.name) {
    throw new Error("Non autorisé");
  }
  // `id` et `name` sont garantis `string` (et non `string | null | undefined`).
  return { ...session.user, id: session.user.id, name: session.user.name };
}

const eventSchema = z
  .object({
    date: z
      .string()
      .refine((value) => !Number.isNaN(Date.parse(value)), "Date invalide."),
    endDate: z
      .string()
      .optional()
      .refine(
        (value) => !value || !Number.isNaN(Date.parse(value)),
        "Date de fin invalide."
      ),
    title: z.string().trim().min(1, "Le titre est obligatoire.").max(200),
    description: z
      .string()
      .trim()
      .min(1, "La description est obligatoire.")
      .max(5_000),
    category: z.string().trim().min(1, "La catégorie est obligatoire.").max(100),
    published: z.boolean(),
  })
  .refine(
    (data) => !data.endDate || new Date(data.endDate) >= new Date(data.date),
    { message: "La date de fin doit être après la date de début.", path: ["endDate"] }
  );

export async function saveEvent(formData: FormData) {
  const admin = await requireAdmin();

  const id = formData.get("id")?.toString() || undefined;

  const parsed = eventSchema.safeParse({
    date: formData.get("date")?.toString() ?? "",
    endDate: formData.get("endDate")?.toString() || undefined,
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    category: formData.get("category")?.toString() ?? "",
    published: formData.get("published") === "on",
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Données invalides.");
  }
  const { date, endDate, title, description, category, published } = parsed.data;

  const file = formData.get("fichier");
  const pdfUrl =
    file instanceof File && file.size > 0 ? await uploadEventPdf(file) : null;

  const data = {
    date: new Date(date),
    endDate: endDate ? new Date(endDate) : null,
    title,
    description,
    category,
    published,
    authorId: admin.id,
    // Ne pas écraser le PDF existant en édition si aucun nouveau fichier n'est envoyé.
    ...(pdfUrl ? { pdf: pdfUrl } : {}),
  };

  if (id) {
    await prisma.event.update({ where: { id }, data });
  } else {
    await prisma.event.create({ data });
  }

  await sendNotificationEmail({
    type: "event",
    action: id ? "updated" : "created",
    title,
    category,
    date: data.date,
    endDate: data.endDate,
    author: admin.name,
    description,
    published,
    actionUrl: "/espace-equipe/agenda",
  });

  revalidatePath("/agenda");
  revalidatePath("/");
  redirect("/espace-equipe/agenda");
}

export async function deleteEvent(id: string) {
  const admin = await requireAdmin();
  const event = await prisma.event.delete({ where: { id } });

  await sendNotificationEmail({
    type: "event",
    action: "deleted",
    title: event.title,
    category: event.category,
    date: event.date,
    endDate: event.endDate ?? undefined,
    description: event.description,
    published: event.published,
    author: admin.name,
    actionUrl: "/espace-equipe/agenda",
  });

  revalidatePath("/agenda");
  revalidatePath("/espace-equipe/agenda");
  revalidatePath("/");
}
