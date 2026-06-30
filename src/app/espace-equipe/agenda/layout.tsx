import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Server-side authorization gate for the whole "/espace-equipe/agenda"
// segment (list, création, édition). Without it these pages were reachable
// by anyone and leaked unpublished events. See the articles layout for the
// rationale: page/layout checks are the source of truth, the proxy is only
// a redundant edge layer.
export default async function AgendaLayout({
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
