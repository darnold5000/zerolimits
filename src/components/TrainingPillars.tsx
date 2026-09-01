import Image from "next/image";
import { TRAINING_PILLARS } from "@/lib/content";

const standardPillars = TRAINING_PILLARS.filter((pillar) => pillar.layout === "standard");
const widePillar = TRAINING_PILLARS.find((pillar) => pillar.layout === "wide");

function TrainingSkillCard({
  title,
  description,
  image,
  imageAlt,
  imagePosition = "center",
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 transition hover:border-red-200 hover:bg-white hover:shadow-lg sm:flex-row">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[10rem] shrink-0 overflow-hidden sm:mx-0 sm:w-36 md:w-40">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          style={{ objectPosition: imagePosition }}
          sizes="(max-width: 640px) 160px, 160px"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-zinc-900 sm:text-2xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">{description}</p>
      </div>
    </article>
  );
}

export default function TrainingPillars() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
            What We Train
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Built for Every Position
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {standardPillars.map((pillar) => (
            <TrainingSkillCard
              key={pillar.title}
              title={pillar.title}
              description={pillar.description}
              image={pillar.image}
              imageAlt={pillar.imageAlt}
              imagePosition={pillar.imagePosition}
            />
          ))}
        </div>

        {widePillar ? (
          <article className="mt-6 flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 transition hover:border-red-200 hover:bg-white hover:shadow-lg sm:flex-row">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[10rem] shrink-0 overflow-hidden sm:mx-0 sm:w-36 md:w-40">
              <Image
                src={widePillar.image}
                alt={widePillar.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 160px, 160px"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 lg:p-8">
              <h3 className="font-display text-xl font-bold text-zinc-900 sm:text-2xl">
                {widePillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                {widePillar.description}
              </p>
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
