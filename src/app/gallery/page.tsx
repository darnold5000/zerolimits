import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import PageCTA from "@/components/PageCTA";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos from ${SITE.name} indoor training facility.`,
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-zinc-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            Train at Zero Limits
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">Gallery</h1>
          <p className="mt-5 max-w-2xl text-xl text-zinc-300">
            A look inside our year-round indoor training facility.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <GalleryGrid />
        </div>
      </section>

      <PageCTA />
    </>
  );
}
