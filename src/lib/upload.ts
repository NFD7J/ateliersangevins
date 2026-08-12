// Contraintes d'upload d'images, partagées entre la Server Action qui les
// applique et les formulaires qui les vérifient avant l'envoi.
//
// MAX_UPLOAD_BYTES doit rester <= experimental.serverActions.bodySizeLimit
// (next.config.ts). Au-delà, Next coupe le flux de la requête avant que la
// validation serveur ne s'exécute, et Netlify renvoie un 502 opaque.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // 4 MB
export const MAX_UPLOAD_LABEL = "4 Mo";

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

// Vérification côté client, avant d'envoyer quoi que ce soit sur le réseau.
// Renvoie un message d'erreur, ou null si le fichier est acceptable.
export function checkImageFile(file: File): string | null {
  if (file.size > MAX_UPLOAD_BYTES) {
    return `Image trop volumineuse (${MAX_UPLOAD_LABEL} maximum).`;
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return "Format d'image non supporté (JPEG, PNG, WebP, GIF ou AVIF).";
  }
  return null;
}
