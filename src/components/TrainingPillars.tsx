import { TRAINING_PILLARS } from "@/lib/content";

const ICONS: Record<string, string> = {
  hitting: "⚾",
  pitching: "🎯",
  catching: "🧤",
  fielding: "⭐",
};

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINING_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-8 transition hover:border-red-200 hover:bg-white hover:shadow-lg"
            >
              <span className="text-3xl" role="img" aria-hidden="true">
                {ICONS[pillar.icon]}
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-zinc-900">
                {pillar.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-zinc-600">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
