import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Cost factor for bcrypt. 12 is a sensible 2025 default for a low-traffic
// admin login (≈250 ms/hash) and matches the constant-time dummy hash in
// src/lib/auth.ts.
const BCRYPT_COST = 12;

const MIN_PASSWORD_LENGTH = 7;

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

function assertStrongPassword(username: string, password: string): void {
  const lower = password.toLowerCase();
  const localPart = username.toLowerCase() ?? "";

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `Mot de passe trop court pour ${username} : ${MIN_PASSWORD_LENGTH} caractères minimum.`
    );
  }
  if (WEAK_PASSWORDS.has(lower)) {
    throw new Error(`Mot de passe trop courant pour ${username} : choisissez-en un autre.`);
  }
  if (localPart && lower.includes(localPart)) {
    throw new Error(`Le mot de passe de ${username} ne doit pas contenir l'identifiant.`);
  }

  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((re) =>
    re.test(password)
  ).length;
  if (classes < 3) {
    throw new Error(
      `Mot de passe trop simple pour ${username} : mélangez minuscules, majuscules, chiffres et symboles (3 catégories minimum).`
    );
  }
}

async function main() {
  const admins = [
    {
      username: process.env.ADMIN_USERNAME,
      name: process.env.ADMIN_NAME ?? "Administrator",
      password: process.env.ADMIN_PASSWORD,
    },
    {
      username: process.env.ADMIN2_USERNAME,
      name: process.env.ADMIN2_NAME ?? "Administrator",
      password: process.env.ADMIN2_PASSWORD,
    },
  ].filter(
    (admin): admin is { username: string; name: string; password: string } =>
      Boolean(admin.username && admin.password)
  );

  if (admins.length === 0) {
    throw new Error(
      "No admin accounts to create: please set ADMIN_USERNAME / ADMIN_PASSWORD (and optionally ADMIN2_USERNAME / ADMIN2_PASSWORD) in your .env"
    );
  }

  for (const admin of admins) {
    const username = admin.username.trim().toLowerCase();
    assertStrongPassword(username, admin.password);

    const passwordHash = await bcrypt.hash(admin.password, BCRYPT_COST);
    await prisma.admin.upsert({
      where: { username },
      update: { name: admin.name, password: passwordHash },
      create: { username, name: admin.name, password: passwordHash },
    });
    console.log(`Admin account ready: ${username}`);
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
