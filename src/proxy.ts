import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Segments that require an authenticated admin. The authoritative check lives
// in each segment's layout.tsx (Node runtime); this edge check is a redundant
// first layer that also keeps unauthenticated users off the admin UI entirely.
const PROTECTED_PREFIXES = ["/espace-equipe/articles", "/espace-equipe/agenda"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // 0. Verrou global du site (Basic Auth), production uniquement.
  // Vérifié côté serveur avant d'envoyer la moindre page ; le mot de passe
  // ne quitte jamais le serveur. Retirer ce bloc pour ouvrir le site au public.
  if (process.env.NODE_ENV === "production") {
    const header = req.headers.get("authorization");
    let ok = false;
    if (header?.startsWith("Basic ")) {
      const decoded = atob(header.slice(6)); // "utilisateur:motdepasse"
      const i = decoded.indexOf(":");
      ok =
        decoded.slice(0, i) === process.env.ADMIN2_USERNAME &&
        decoded.slice(i + 1) === process.env.ADMIN2_PASSWORD;
    }
    if (!ok) {
      return new NextResponse("Authentification requise.", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Accès protégé"' },
      });
    }
  }

  // 1. Access control (defense in depth).
  if (PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) && !req.auth) {
    return NextResponse.redirect(new URL("/espace-equipe", req.nextUrl));
  }

  // 2. Static Content-Security-Policy.
  // A per-request nonce is intentionally NOT used: this site is mostly
  // statically rendered, and a nonce regenerated on every request never
  // matches the one baked into the cached static HTML, so 'strict-dynamic'
  // would block Next.js' own scripts in production and break hydration
  // (the mobile menu and every other client interaction go dead).
  // A static policy is safe with static pages: it is identical at build time
  // and request time. We allow 'unsafe-inline' for the scripts Next injects
  // inline; the remaining directives keep the policy tight.
  const scriptSrc = `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${
    process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
  }`;
  const csp = [
    `default-src 'self'`,
    scriptSrc,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https://res.cloudinary.com`,
    `font-src 'self'`,
    `connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com`,
    `frame-src 'self' https://maps.google.com https://www.google.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ].join("; ");

  const response = NextResponse.next();
  response.headers.set("content-security-policy", csp);
  return response;
});

export const config = {
  // Run on every page request, but skip API routes and static assets (anything
  // with a file extension, _next internals, favicon, robots, sitemap).
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)",
  ],
};
