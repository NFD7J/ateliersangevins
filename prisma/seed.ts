import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Cost factor for bcrypt. 12 is a sensible 2025 default for a low-traffic
// admin login (≈250 ms/hash) and matches the constant-time dummy hash in
// src/lib/auth.ts.
const BCRYPT_COST = 12;

const MIN_PASSWORD_LENGTH = 12;

// Passwords seen in the repo defaults / common wordlists — refuse them outright.
const WEAK_PASSWORDS = new Set([
  "password",
  "admin",
  "administrator",
  "raymondpassword",
  "mariepassword",
  "changeme",
  "azerty",
  "azertyuiop",
  "motdepasse",
  "123456",
  "12345678",
  "123456789",
  "qwerty",
]);

function assertStrongPassword(email: string, password: string): void {
  const lower = password.toLowerCase();
  const localPart = email.split("@")[0]?.toLowerCase() ?? "";

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `Mot de passe trop court pour ${email} : ${MIN_PASSWORD_LENGTH} caractères minimum.`
    );
  }
  if (WEAK_PASSWORDS.has(lower)) {
    throw new Error(`Mot de passe trop courant pour ${email} : choisissez-en un autre.`);
  }
  if (localPart && lower.includes(localPart)) {
    throw new Error(`Le mot de passe de ${email} ne doit pas contenir l'identifiant.`);
  }

  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((re) =>
    re.test(password)
  ).length;
  if (classes < 3) {
    throw new Error(
      `Mot de passe trop simple pour ${email} : mélangez minuscules, majuscules, chiffres et symboles (3 catégories minimum).`
    );
  }
}

async function main() {
  const admins = [
    {
      email: process.env.ADMIN_EMAIL,
      name: process.env.ADMIN_NAME ?? "Administrateur",
      password: process.env.ADMIN_PASSWORD,
    },
    {
      email: process.env.ADMIN2_EMAIL,
      name: process.env.ADMIN2_NAME ?? "Administrateur",
      password: process.env.ADMIN2_PASSWORD,
    },
  ].filter(
    (admin): admin is { email: string; name: string; password: string } =>
      Boolean(admin.email && admin.password)
  );

  if (admins.length === 0) {
    throw new Error(
      "Aucun compte admin à créer : renseignez ADMIN_EMAIL / ADMIN_PASSWORD (et optionnellement ADMIN2_EMAIL / ADMIN2_PASSWORD) dans votre .env"
    );
  }

  for (const admin of admins) {
    const email = admin.email.trim().toLowerCase();
    assertStrongPassword(email, admin.password);

    const passwordHash = await bcrypt.hash(admin.password, BCRYPT_COST);
    await prisma.admin.upsert({
      where: { email },
      update: { name: admin.name, password: passwordHash },
      create: { email, name: admin.name, password: passwordHash },
    });
    console.log(`Compte admin prêt : ${email}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
