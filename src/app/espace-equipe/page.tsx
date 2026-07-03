import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/lib/auth";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Espace équipe",
  robots: { index: false, follow: false },
};

async function login(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/espace-equipe/articles",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/espace-equipe?error=1");
    }
    throw error;
  }
}

export default async function EspaceEquipePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session) redirect("/espace-equipe/articles");

  const { error } = await searchParams;

  return (
    <Container className="flex min-h-[70vh] max-w-md flex-col items-center justify-center py-16">
      <div className="w-full rounded-2xl border border-forest-100 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold text-forest-900">Espace équipe</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Connectez-vous pour gérer les articles du site.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-terracotta-50 px-4 py-2 text-sm text-terracotta-600">
            Identifiants incorrects. Merci de réessayer.
          </p>
        )}

        <form action={login} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-ink">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
          >
            Se connecter
          </button>
        </form>
      </div>
    </Container>
  );
}
