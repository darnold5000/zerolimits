import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-white">{SITE.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <p className="mt-3">
              <a
                href={SITE.phoneHref}
                className="text-sm font-medium text-red-500 hover:text-red-400"
              >
                {SITE.phone}
              </a>
            </p>
            <Link
              href="/schedule-training"
              className="mt-4 inline-block rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Schedule Training
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-zinc-800 pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="text-zinc-500">{SITE.address.full}</p>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Website designed &amp; maintained by Signal Works.
        </p>
      </div>
    </footer>
  );
}
