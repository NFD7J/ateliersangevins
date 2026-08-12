import type { NextConfig } from "next";

// Static security headers applied to every response. The per-request
// Content-Security-Policy (which needs a fresh nonce) is set in src/proxy.ts.
const securityHeaders = [
  // Force HTTPS for two years, including subdomains. `preload` is opt-in to
  // the browser preload list — only keep it once every subdomain is HTTPS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Disable MIME sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Legacy clickjacking protection (CSP frame-ancestors covers modern browsers).
  { key: "X-Frame-Options", value: "DENY" },
  // Leak only the origin (not the full path) on cross-origin navigation.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Drop ambient access to powerful features the site never uses.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  },
  // Isolate the browsing context group from cross-origin openers.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Block the framework from leaking its version via the X-Powered-By header.
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    serverActions: {
      // Les uploads d'images passent par une Server Action, dont le corps est
      // plafonné à 1 Mo par défaut — trop peu pour une photo de couverture.
      // 4 Mo est le maximum atteignable en production : Netlify encode le
      // corps en base64 (+33 %) avant de le passer à la fonction, qui refuse
      // au-delà de 6 Mo. Toute valeur supérieure ici échouerait en 502 côté
      // Netlify au lieu d'être refusée proprement par la validation.
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
