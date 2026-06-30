import { NextResponse } from "next/server";
import { notificationEmail, type NotificationProps } from "@/components/emails/notification-email";

/**
 * Route de prévisualisation des emails de notification — DEV UNIQUEMENT.
 *
 * Utilisation (avec `npm run dev`) :
 *   http://localhost:3000/api/preview-email?type=event
 *   http://localhost:3000/api/preview-email?type=article
 *   http://localhost:3000/api/preview-email?type=user
 *   …ajoute &action=created | updated | deleted pour changer l'état.
 *
 * On renvoie directement le HTML : le navigateur l'affiche comme une page.
 */

// Jeux de données factices pour visualiser chaque type d'email.
const samples = {
  event: (action: "created" | "updated" | "deleted"): NotificationProps => ({
    type: "event",
    action,
    title: "Atelier de géobiologie",
    category: "Géobiologie",
    date: new Date("2026-09-12T14:00:00+02:00"),
    endDate: new Date("2026-09-12T17:00:00+02:00"),
    author: "Noé",
    description:
      "Une après-midi pour apprendre à ressentir les énergies telluriques et harmoniser un lieu de vie.",
    published: true,
    actionUrl: "https://example.com/agenda",
  }),
  article: (action: "created" | "updated" | "deleted"): NotificationProps => ({
    type: "article",
    action,
    title: "Les bienfaits de la sylvothérapie",
    excerpt:
      "Se reconnecter à la forêt pour apaiser le mental et retrouver son ancrage : petit guide pour débuter.",
    categories: ["Sylvothérapie", "Thérapies énergétiques"],
    author: "Noé",
    published: true,
    actionUrl: "https://example.com/blog",
  }),
  user: (action: "created" | "deleted"): NotificationProps => ({
    type: "user",
    action,
    name: "Marie Dupont",
    email: "marie.dupont@example.com",
    author: "Noé",
  }),
};

export function GET(request: Request) {
  // Jamais accessible en production.
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const type = (searchParams.get("type") ?? "event") as keyof typeof samples;
  const action = searchParams.get("action") ?? "created";

  const build = samples[type];
  if (!build) {
    return new NextResponse(
      "type invalide — utilise ?type=event | article | user",
      { status: 400 }
    );
  }

  // Chaque builder accepte ses propres actions ; on caste prudemment ici.
  const props = (build as (a: string) => NotificationProps)(action);
  const { html } = notificationEmail(props);

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
