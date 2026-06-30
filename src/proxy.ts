import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Segments that require an authenticated admin. The authoritative check lives
// in each segment's layout.tsx (Node runtime); this edge check is a redundant
// first layer that also keeps unauthenticated users off the admin UI entirely.
const PROTECTED_PREFIXES = ["/espace-equipe/articles", "/espace-equipe/agenda"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // 1. Access control (defense in depth).
  if (PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) && !req.auth) {
    return NextResponse.redirect(new URL("/espace-equipe", req.nextUrl));
  }

  // 2. Per-request nonce + Content-Security-Policy.
  // A fresh nonce is generated for every request and exposed to the renderer
  // via the request header so Next.js stamps it on the scripts it emits.
  // 'strict-dynamic' lets those trusted scripts load their own dependencies
  // (Vercel Analytics, etc.) without an explicit host allowlist; the legacy
  // 'unsafe-inline'/https: fallbacks are ignored by browsers that honour the
  // nonce, so they only relax the policy for very old engines.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  // Next.js dev mode (HMR, React DevTools stack traces) needs eval(); never
  // ship 'unsafe-eval' in production.
  const scriptSrc = `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-inline'${
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

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  // Next.js reads this request header to know which nonce to apply.
  requestHeaders.set("content-security-policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
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
