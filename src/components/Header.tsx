"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/content";
import { IMAGES } from "@/lib/images";

function isNavActive(pathname: string, currentHash: string, href: string): boolean {
  const [path, linkHash] = href.split("#");
  const targetHash = linkHash ? `#${linkHash}` : "";

  if (path === "/") {
    return pathname === "/";
  }

  const onPath = pathname === path || pathname.startsWith(`${path}/`);

  if (path === "/about") {
    if (targetHash) {
      return onPath && currentHash === targetHash;
    }
    return onPath && currentHash !== "#our-coaches";
  }

  if (targetHash) {
    return onPath && currentHash === targetHash;
  }

  return onPath;
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8 xl:max-w-[1400px]">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={IMAGES.logo}
            alt={SITE.name}
            width={48}
            height={48}
            className="h-10 w-auto"
            priority
          />
          <span className="hidden text-sm font-semibold uppercase tracking-wide md:inline">
            {SITE.name}
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-zinc-800 xl:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col border-b border-zinc-800 bg-black px-4 py-4 xl:static xl:flex xl:min-w-0 xl:flex-1 xl:flex-row xl:items-center xl:justify-center xl:gap-1 xl:border-0 xl:bg-transparent xl:px-4 xl:py-0 2xl:gap-2`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = isNavActive(pathname, hash, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-red-500"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 xl:flex">
          <Link
            href="/schedule-training"
            className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
          >
            Schedule Training
          </Link>
        </div>
      </div>
    </header>
  );
}
