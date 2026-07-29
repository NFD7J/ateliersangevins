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

const LETTRE = /[A-Za-zÀ-ÖØ-öø-ÿ]/g;
const VOYELLE = /[aeiouyàâäéèêëïîôöùûüAEIOUYÀÂÄÉÈÊËÏÎÔÖÙÛÜ]/g;
// Grec, cyrillique, hébreu, arabe, CJK et kana : hors du public de l'association.
const ALPHABET_NON_LATIN = /[Ͱ-ϿЀ-ӿ֐-ۿ぀-ヿ一-鿿]/g;
const LIEN = /https?:\/\/\S+|www\.\S+/gi;

// Détection de texte manifestement non rédigé. Chaque seuil est volontairement
// haut : rejeter le message d'un futur stagiaire coûte bien plus cher que
// laisser passer un spam, et un refus est invisible côté association.
function estDuCharabia(message: string): boolean {
  const lettres = message.match(LETTRE)?.length ?? 0;
  const voyelles = message.match(VOYELLE)?.length ?? 0;

  // Longue suite de lettres sans la moindre voyelle : frappe au hasard. Compté
  // en lettres seulement, pour ne pas piéger un message réduit à un numéro.
  if (lettres >= 12 && voyelles === 0) return true;

  // Proportion de voyelles anormalement basse — le français tourne autour de 45 %.
  if (lettres >= 30 && voyelles / lettres < 0.2) return true;

  // Même lettre ou chiffre répété huit fois : « aaaaaaaa ». La ponctuation est
  // exclue, sinon un « Bonjour......... » enthousiaste serait rejeté.
  if (/([A-Za-zÀ-ÖØ-öø-ÿ0-9])\1{7,}/.test(message)) return true;

  // Long bloc sans espace, une fois les liens retirés : les URL légitimes
  // (Google Maps, pièce jointe partagée) dépassent facilement cette longueur.
  if (/\S{45,}/.test(message.replace(LIEN, " "))) return true;

  // Message majoritairement écrit dans un alphabet non latin.
  const nonLatines = message.match(ALPHABET_NON_LATIN)?.length ?? 0;
  if (nonLatines >= 10 && nonLatines > lettres) return true;

  // Accumulation de liens : signature classique du spam de formulaire.
  if ((message.match(LIEN)?.length ?? 0) >= 4) return true;

  return false;
}

// Échappe le contenu utilisateur avant de l'injecter dans le HTML de l'email.
function esc(value: string) {
  return value.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!
  );
}

export async function sendContactEmail( _prev: ContactState, formData: FormData ): Promise<ContactState> {
  // --- Filtres anti-robot ---------------------------------------------------
  // Dans les deux cas on renvoie un succès factice plutôt qu'une erreur : un
  // robot à qui l'on répond « refusé » réessaie en changeant de tactique, un
  // robot à qui l'on répond « envoyé » passe à sa cible suivante.

  // Champ leurre, invisible pour un humain mais présent dans le DOM. La plupart
  // des robots remplissent tous les champs qu'ils trouvent.
  if (formData.get("website")?.toString().trim()) {
    return { ok: true };
  }

  // Délai de remplissage. Un humain met plusieurs secondes à saisir quatre
  // champs ; un script poste immédiatement. Champ absent (JavaScript désactivé)
  // ou valeur nulle => on laisse passer, pour ne jamais bloquer un vrai visiteur.
  const elapsed = Number(formData.get("elapsed"));
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < 3000) {
    return { ok: true };
  }

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

  // Contrairement aux filtres anti-robot ci-dessus, on renvoie ici une vraie
  // erreur plutôt qu'un succès factice : si un humain déclenche le filtre par
  // accident, il faut qu'il puisse s'en rendre compte et reformuler.
  if (estDuCharabia(message)) {
    return {
      ok: false,
      error:
        "Votre message ne semble pas contenir de texte lisible. Merci de le reformuler.",
    };
  }

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
      from: "Ateliers Angevins <contact@ateliersangevins.org>",
      to: ["ateliersangevins@hotmail.com","brissmarie35@gmail.com"], // les deux adresses de l'association
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