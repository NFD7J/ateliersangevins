import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/espace-equipe/articles");

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/espace-equipe", req.nextUrl));
  }
});

export const config = {
  matcher: ["/espace-equipe/articles/:path*"],
};
