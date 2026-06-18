import { signOut } from "@/lib/auth";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/espace-equipe" });
      }}
    >
      <button
        type="submit"
        className="text-sm font-medium text-ink-soft hover:text-forest-700"
      >
        Se déconnecter
      </button>
    </form>
  );
}
