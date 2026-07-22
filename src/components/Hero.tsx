import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/content";
import { IMAGES } from "@/lib/images";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Zero Limits Baseball indoor training facility"
          fill
          className="object-cover brightness-110 saturate-110"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-zinc-950/25 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-32">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-400 drop-shadow-sm">
          {SITE.name}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight drop-shadow-md sm:text-6xl lg:text-7xl xl:text-8xl">
          {SITE.heroHeadline}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-100 drop-shadow sm:text-2xl">
          {SITE.heroSubheadline}
        </p>
        <p className="mt-4 max-w-2xl text-base text-zinc-200 drop-shadow sm:text-lg">
          {SITE.heroRegionLine}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/schedule-training"
            className="rounded-md bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
          >
            Schedule Training
          </Link>
          <Link
            href="/schedule-training/camps"
            className="rounded-md border-2 border-white/30 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/20"
          >
            View Programs
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-md px-6 py-4 text-sm font-semibold text-white transition hover:text-red-400"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40">
              ▶
            </span>
            Watch Facility Tour
          </Link>
        </div>
      </div>
    </section>
  );
}
