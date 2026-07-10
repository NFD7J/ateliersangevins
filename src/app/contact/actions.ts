"use server";

import { Resend } from "resend";
import { z } from "zod";
import { contact } from "@/lib/site-data";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().trim().min(1, "Merci d'indiquer votre nom.").max(120),
  email: z.string().trim().email("Adresse email invalide."),
  phone: z.string().trim().max(40).optional(),
  message: z
    .string()
    .trim()
    .min(1, "Votre message est vide.")
    .max(5000, "Message trop long."),
});

export type ContactState = { ok: boolean; error?: string };

// Échappe le contenu utilisateur avant de l'injecter dans le HTML de l'email.
function esc(value: string) {
  return value.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!
  );
}

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() || undefined,
    message: formData.get("message")?.toString() ?? "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Formulaire invalide.",
    };
  }

  const { name, email, phone, message } = parsed.data;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1f2a24; line-height: 1.6;">
      <h2 style="color: #2f5a45;">Nouveau message depuis le site</h2>
      <p><strong>Nom :</strong> ${esc(name)}</p>
      <p><strong>Email :</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
      ${phone ? `<p><strong>Téléphone :</strong> ${esc(phone)}</p>` : ""}
      <p><strong>Message :</strong></p>
      <p style="white-space: pre-line; padding: 12px 16px; background: #f3f6f4; border-radius: 8px;">${esc(message)}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: "Ateliers Angevins <onboarding@resend.dev>",
      to: "noe.fresneau@gmail.com", // les deux adresses de l'association
      replyTo: email, // répondre = répondre au visiteur
      subject: `Nouveau message de ${name}`,
      html,
    });

    if (error) {
      return { ok: false, error: "L'envoi a échoué. Merci de réessayer plus tard." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "L'envoi a échoué. Merci de réessayer plus tard." };
  }
}