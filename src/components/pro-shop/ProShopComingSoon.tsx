import Image from "next/image";
import { PRO_SHOP_COPY } from "@/config/pro-shop";
import { SITE } from "@/lib/content";

export default function ProShopComingSoon() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0">
        <Image
          src={PRO_SHOP_COPY.heroImage}
          alt={PRO_SHOP_COPY.heroImageAlt}
          fill
          className="object-cover object-center brightness-90"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-32">
        <span className="inline-flex w-fit rounded-full border border-red-500/40 bg-red-600/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
          Coming Soon
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-red-500">
          {PRO_SHOP_COPY.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          {PRO_SHOP_COPY.heading}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-200 sm:text-xl">
          {PRO_SHOP_COPY.comingSoonBody}
        </p>
        <p className="mt-4 max-w-2xl text-base font-medium text-zinc-300 sm:text-lg">
          {PRO_SHOP_COPY.comingSoonSecondary}
        </p>
        <p className="mt-10 text-base text-zinc-300 sm:text-lg">
          {PRO_SHOP_COPY.comingSoonCtaPrompt}{" "}
          <a
            href={SITE.phoneHref}
            className="font-bold text-white underline decoration-red-500 decoration-2 underline-offset-4 transition hover:text-red-400"
          >
            Call or text {SITE.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
