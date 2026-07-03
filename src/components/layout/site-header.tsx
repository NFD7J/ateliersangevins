import Link from "next/link";
import { nav } from "@/lib/site-data";
import { MobileNav } from "@/components/layout/mobile-nav";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-20 border-b border-forest-100 bg-stone/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex h-full items-center gap-2 py-2">
          <Image src="/images/logo-menu.jpg" loading="eager" alt="Les Ateliers Angevins" width={156} height={83} className="h-full w-auto object-contain" />
          {/* <span className="text-2xl">🌿</span>
          <span className="font-display text-lg font-semibold leading-tight text-forest-800 sm:text-xl">
            Les Ateliers
            <br className="sm:hidden" /> Angevins
          </span> */}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-forest-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-forest-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-700 md:inline-block"
        >
          Nous contacter
        </Link>

        <MobileNav />
      </div>
    </header>
  );
}
