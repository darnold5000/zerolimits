import Image from "next/image";
import Link from "next/link";
import { SITE, WHY_CHOOSE } from "@/lib/content";
import { IMAGES } from "@/lib/images";

export default function WhyChoose() {
  return (
    <section className="bg-zinc-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
              Why Zero Limits
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Why Families Choose Zero Limits
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              {SITE.facilityDescription}
            </p>
            <ul className="mt-8 space-y-4">
              {WHY_CHOOSE.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-zinc-200">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/schedule-training"
              className="mt-10 inline-flex rounded-md bg-red-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Schedule Training
            </Link>
          </div>

          {/* <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-[3/4]">
            <Image
              src={IMAGES.action}
              alt="Athletes training at Zero Limits Baseball"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
