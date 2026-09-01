import Image from "next/image";
import { FACILITIES } from "@/lib/content";

function FacilityFeatures({
  features,
}: {
  features: (typeof FACILITIES)[number]["features"];
}) {
  return (
    <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
      {features.map((feature) => (
        <article key={feature.title} className="pt-2">
          <p className="font-display text-5xl font-bold uppercase leading-none tracking-tight text-red-600 sm:text-6xl md:text-5xl lg:text-6xl">
            {feature.stat}
          </p>
          <h3 className="mt-3 max-w-xs font-display text-xl font-bold uppercase leading-tight tracking-wide text-zinc-900 sm:text-2xl">
            {feature.title}
          </h3>
          {feature.description ? (
            <p className="mt-4 max-w-sm leading-relaxed text-zinc-600">{feature.description}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function FacilityImages({
  images,
  layout,
}: {
  images: (typeof FACILITIES)[number]["images"];
  layout: (typeof FACILITIES)[number]["imageLayout"];
}) {
  if (layout === "wide") {
    return (
      <div className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {images.map((image) => (
          <div
            key={image.src}
            className="relative aspect-[16/10] overflow-hidden rounded-2xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              style={
                "imagePosition" in image && image.imagePosition
                  ? { objectPosition: image.imagePosition }
                  : undefined
              }
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-3 sm:grid-cols-3 sm:gap-4">
      {images.map((image) => (
        <div
          key={image.src}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            style={
              "imagePosition" in image && image.imagePosition
                ? { objectPosition: image.imagePosition }
                : undefined
            }
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}

export default function FacilityShowcase() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="space-y-20 sm:space-y-24">
          {FACILITIES.map((facility) => (
            <div key={facility.id}>
              <div className="border-b-4 border-red-600 pb-4">
                <h3 className="font-display text-5xl font-bold uppercase tracking-tight text-red-600 sm:text-6xl">
                  {facility.name}
                </h3>
              </div>
              <FacilityFeatures features={facility.features} />
              <FacilityImages images={facility.images} layout={facility.imageLayout} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
