/**
 * Composant unique pour tous les emails de notification de l'espace équipe.
 *
 * Un seul point d'entrée — `notificationEmail(props)` — gère les trois cas via
 * une union discriminée sur `type` :
 *   - "event"   : ajout / modification d'un évènement
 *   - "article" : ajout / modification d'un article
 *   - "user"    : ajout / suppression d'un membre de l'équipe
 *
 * Renvoie `{ subject, html }`, prêt à passer à Resend.
 *
 * Les emails utilisent des styles *inline* et une mise en page en `<table>` :
 * c'est la seule façon fiable d'obtenir un rendu cohérent dans les clients mail.
 * La palette reprend celle du site (`globals.css`).
 */

const palette = {
  stone: "#faf6ee",
  stoneDeep: "#f1e9d8",
  ink: "#2b2a25",
  inkSoft: "#5b5648",
  forest700: "#2e5128",
  forest900: "#1c2f17",
  terracotta500: "#cb5d33",
  terracotta600: "#ab4727",
  gold400: "#ddb961",
} as const;

// --- Types -----------------------------------------------------------------

type EventNotification = {
  type: "event";
  action: "created" | "updated" | "deleted";
  title: string;
  category: string;
  date: Date;
  endDate?: Date | null;
  author: string;
  description: string;
  published: boolean;
};

type ArticleNotification = {
  type: "article";
  action: "created" | "updated" | "deleted";
  title: string;
  excerpt: string;
  categories: string[];
  author: string;
  published: boolean;
};

type UserNotification = {
  type: "user";
  action: "created" | "deleted";
  name: string;
  email: string;
  author: string;
};

export type NotificationProps = (EventNotification | ArticleNotification | UserNotification) & {
  /** Nom de la personne à l'origine de l'action (optionnel). */
  actor?: string;
  /** Lien d'action affiché en bouton (optionnel). */
  actionUrl?: string;
};

// --- Helpers ---------------------------------------------------------------

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Europe/Paris",
});

function infoRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;border-bottom:1px solid #ece3d1;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:${palette.inkSoft};width:140px;vertical-align:top;">${escapeHtml(
      label
    )}</td>
    <td style="padding:8px 0;border-bottom:1px solid #ece3d1;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${palette.ink};vertical-align:top;">${escapeHtml(
      value
    )}</td>
  </tr>`;
}

function infoTable(rows: string[]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">${rows.join(
    ""
  )}</table>`;
}

function button(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">
    <tr><td style="border-radius:10px;background-color:${palette.forest700};">
      <a href="${escapeHtml(
        href
      )}" style="display:inline-block;padding:12px 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:${palette.stone};text-decoration:none;border-radius:10px;">${escapeHtml(
        label
      )}</a>
    </td></tr>
  </table>`;
}

function layout(opts: { eyebrow: string; heading: string; preview: string; body: string }): string {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <title>${escapeHtml(opts.heading)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${palette.stoneDeep};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(opts.preview)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${palette.stoneDeep};padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:${palette.stone};border-radius:16px;overflow:hidden;border:1px solid #e7ddca;">
          <tr><td style="background-color:${palette.forest900};padding:24px 32px;">
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:600;color:${palette.stone};letter-spacing:0.5px;">Ateliers Sangevins</p>
          </td></tr>
          <tr><td style="padding:32px;">
            <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${palette.terracotta500};">${escapeHtml(
              opts.eyebrow
            )}</p>
            <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:600;line-height:1.3;color:${palette.forest900};">${escapeHtml(
              opts.heading
            )}</h1>
            ${opts.body}
          </td></tr>
          <tr><td style="padding:20px 32px;border-top:1px solid #e7ddca;background-color:${palette.stone};">
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${palette.inkSoft};">Notification automatique de l'espace équipe — Ateliers Sangevins.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function paragraph(html: string): string {
  return `<p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:${palette.ink};">${html}</p>`;
}

// --- Composant principal ---------------------------------------------------

/**
 * Construit l'email de notification correspondant au `type` fourni.
 */
export function notificationEmail(props: NotificationProps): { subject: string; html: string } {
  const { author, actionUrl } = props;

  switch (props.type) {
    case "event": {
      const isDeleted = props.action === "deleted";
      const subjectPrefix =
        props.action === "created"
          ? "Nouvel évènement"
          : isDeleted
            ? "Évènement supprimé"
            : "Évènement modifié";
      const verb =
        props.action === "created" ? "ajouté" : isDeleted ? "supprimé" : "modifié";
      const heading =
        props.action === "created"
          ? "Nouvel évènement publié"
          : isDeleted
            ? "Évènement supprimé"
            : "Évènement mis à jour";
      const titleColor = isDeleted ? palette.terracotta600 : palette.forest700;

      const subject = `${subjectPrefix} : ${props.title}`;
      const dateText = props.endDate
        ? `${dateFormatter.format(props.date)} → ${dateFormatter.format(props.endDate)}`
        : dateFormatter.format(props.date);
      const rows = [
        infoRow("Catégorie", props.category),
        infoRow("Date", dateText),
        infoRow("Statut", props.published ? "Publié" : "Brouillon"),
        infoRow("Par", author),
      ];

      const body = `
        ${paragraph(
          `L'évènement <strong style="color:${titleColor};">«&nbsp;${escapeHtml(
            props.title
          )}&nbsp;»</strong> vient d'être ${verb} sur le site.`
        )}
        ${infoTable(rows)}
        <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:${palette.inkSoft};">Description</p>
        <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:${palette.ink};">${escapeHtml(
          props.description
        )}</p>
        ${actionUrl && !isDeleted ? button("Voir l'évènement", actionUrl) : ""}
      `;

      return {
        subject,
        html: layout({ eyebrow: "Évènement", heading, preview: subject, body }),
      };
    }

    case "article": {
      const isDeleted = props.action === "deleted";
      const subjectPrefix =
        props.action === "created"
          ? "Nouvel article"
          : isDeleted
            ? "Article supprimé"
            : "Article modifié";
      const verb =
        props.action === "created" ? "publié" : isDeleted ? "supprimé" : "modifié";
      const heading =
        props.action === "created"
          ? "Nouvel article publié"
          : isDeleted
            ? "Article supprimé"
            : "Article mis à jour";
      const titleColor = isDeleted ? palette.terracotta600 : palette.forest700;

      const subject = `${subjectPrefix} : ${props.title}`;
      const rows = [
        infoRow("Auteur", props.author),
        infoRow(
          props.categories.length > 1 ? "Catégories" : "Catégorie",
          props.categories.length ? props.categories.join(", ") : "—"
        ),
        infoRow("Statut", props.published ? "Publié" : "Brouillon"),
      ];
      const body = `
        ${paragraph(
          `L'article <strong style="color:${titleColor};">«&nbsp;${escapeHtml(
            props.title
          )}&nbsp;»</strong> vient d'être ${verb}.`
        )}
        ${infoTable(rows)}
        <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:${palette.inkSoft};">Extrait</p>
        <p style="margin:0 0 24px;padding:16px;border-left:3px solid ${palette.gold400};background-color:#fffaf0;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-style:italic;line-height:1.7;color:${palette.ink};">${escapeHtml(
          props.excerpt
        )}</p>
        ${actionUrl && !isDeleted ? button("Lire l'article", actionUrl) : ""}
      `;

      return {
        subject,
        html: layout({ eyebrow: "Article", heading, preview: props.excerpt || subject, body }),
      };
    }

    case "user": {
      const isCreated = props.action === "created";
      const subject = isCreated
        ? `Nouvel accès équipe : ${props.name}`
        : `Accès équipe supprimé : ${props.name}`;
      const accent = isCreated ? palette.forest700 : palette.terracotta600;
      const rows = [
        infoRow("Nom", props.name), 
        infoRow("Email", props.email),
        infoRow("Par", author)
      ];

      const intro = isCreated
        ? `Un nouvel accès à l'espace équipe a été créé pour <strong style="color:${accent};">${escapeHtml(
            props.name
          )}</strong>.`
        : `L'accès à l'espace équipe de <strong style="color:${accent};">${escapeHtml(
            props.name
          )}</strong> a été supprimé.`;
      const notice = isCreated
        ? "Cette personne peut désormais se connecter à l'espace équipe avec son adresse email."
        : "Cette personne ne peut plus se connecter à l'espace équipe.";

      const body = `
        ${paragraph(intro)}
        ${infoTable(rows)}
        <p style="margin:0;padding:14px 16px;border-radius:10px;background-color:${
          isCreated ? "#f1f6f0" : "#fdf3ee"
        };font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${palette.inkSoft};">${notice}</p>
      `;

      return {
        subject,
        html: layout({
          eyebrow: "Espace équipe",
          heading: isCreated ? "Nouveau membre ajouté" : "Membre supprimé",
          preview: subject,
          body,
        }),
      };
    }
  }
}
