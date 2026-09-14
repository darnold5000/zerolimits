import { PRO_SHOP_COPY } from "@/config/pro-shop";
import { SITE } from "@/lib/content";

export default function GearHelpCTA() {
  return (
    <section className="bg-zinc-950 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{PRO_SHOP_COPY.helpHeading}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-300">
          {PRO_SHOP_COPY.helpBody}
        </p>
        <a
          href={SITE.phoneHref}
          className="mt-8 inline-flex rounded-md bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
        >
          {PRO_SHOP_COPY.helpCta}
        </a>
      </div>
    </section>
  );
}
