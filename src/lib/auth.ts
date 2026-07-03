import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hit, reset } from "@/lib/rate-limit";

// Brute-force budget per (IP + email) before further attempts are rejected.
const MAX_LOGIN_ATTEMPTS = 8;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// A valid bcrypt hash that no submitted password will match. When the account
// does not exist we still run bcrypt.compare against it so the response takes
// the same time as a wrong-password attempt — this removes the timing oracle
// that would otherwise let an attacker enumerate valid admin emails.
const DUMMY_HASH = bcrypt.hashSync("account-does-not-exist", 12);

const credentialsSchema = z.object({
  username: z.string().trim().toLowerCase().max(254),
  password: z.string().min(1).max(200),
});

function getClientIp(request: Request | undefined): string {
  const forwarded = request?.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request?.headers.get("x-real-ip") ?? "unknown";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Nom d'utilisateur", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (rawCredentials, request) => {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;
        const { username, password } = parsed.data;

        // Throttle repeated attempts before touching the database.
        const ip = getClientIp(request);
        const key = `login:${ip}:${username}`;
        if (!hit(key, MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_MS).ok) {
          return null;
        }

        const admin = await prisma.admin.findUnique({ where: { username: username } });

        // Constant-time path: always compare, even with no matching account.
        const isValid = await bcrypt.compare(password, admin?.password ?? DUMMY_HASH);
        if (!admin || !isValid) return null;

        // Successful login: forgive the recorded failed attempts.
        reset(key);
        return { id: admin.id, username: admin.username, name: admin.name };
      },
    }),
  ],
  pages: {
    signIn: "/espace-equipe",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
    updateAge: 60 * 60, // refresh the JWT at most once per hour
  },
  // Required for deployments where the host is not known at build time
  // (self-hosted VPS behind a reverse proxy). On Vercel, set AUTH_URL so the
  // host is pinned and Host-header spoofing cannot influence callback URLs.
  trustHost: true,
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
});
