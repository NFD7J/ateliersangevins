import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Contrôle d'accès côté serveur pour tout le segment "/espace-equipe/temoignages"
// (liste, création, édition). C'est la protection autoritaire, indépendante du
// proxy edge qui n'est qu'une première couche de défense.
export default async function TemoignagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/espace-equipe");
  }
  return <>{children}</>;
}
