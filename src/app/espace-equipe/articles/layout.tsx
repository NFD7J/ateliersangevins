import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Server-side authorization gate for the whole "/espace-equipe/articles"
// segment (list, création, édition). This is the authoritative access
// control: it runs in the Node.js runtime on every request to a nested
// route and does not depend on the edge proxy/middleware, which is only
// kept as a first, redundant layer of defense.
export default async function ArticlesLayout({
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
