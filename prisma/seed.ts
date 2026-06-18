import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
    const passwordHash = await bcrypt.hash(admin.password, 10);
    await prisma.admin.upsert({
      where: { email: admin.email },
      update: { name: admin.name, password: passwordHash },
      create: { email: admin.email, name: admin.name, password: passwordHash },
    });
    console.log(`Compte admin prêt : ${admin.email}`);
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
