import Image from "next/image";
import { TRAINING_PILLARS } from "@/lib/content";

const standardPillars = TRAINING_PILLARS.filter((pillar) => pillar.layout === "standard");
const widePillar = TRAINING_PILLARS.find((pillar) => pillar.layout === "wide");

function TrainingSkillCard({
  title,
  description,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 transition hover:border-red-200 hover:bg-white hover:shadow-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="font-display text-2xl font-bold text-zinc-900">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-zinc-600">{description}</p>
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
            />
          ))}
        </div>

        {widePillar ? (
          <article className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 transition hover:border-red-200 hover:bg-white hover:shadow-lg">
            <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[280px]">
                <Image
                  src={widePillar.image}
                  alt={widePillar.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <h3 className="font-display text-2xl font-bold text-zinc-900 sm:text-3xl">
                  {widePillar.title}
                </h3>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600">
                  {widePillar.description}
                </p>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
