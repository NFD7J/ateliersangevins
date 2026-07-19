import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

// Instance edge-safe : pas de bcrypt, pas de Prisma, pas de rate-limit.
// Elle ne sait que lire et vérifier le JWT présent dans le cookie.
const { auth } = NextAuth(authConfig);


export default auth((req) => {
  
  if(!req.auth){
    return NextResponse.redirect(new URL("/espace-equipe",req.nextUrl))
  }
  return NextResponse.next();
  
});

export const config = {
  matcher: ["/espace-equipe/:path*"],
};
