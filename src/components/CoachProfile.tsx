import type { Coach } from "@/content/coaches";

type CoachProfileProps = {
  coach: Coach;
  reverse?: boolean;
  priority?: boolean;
};

export default function CoachProfile({
  coach,
  reverse = false,
  priority = false,
}: CoachProfileProps) {
  return (
    <article className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <div
        className={
          reverse
            ? "overflow-hidden rounded-2xl bg-zinc-800 lg:col-start-2"
            : "overflow-hidden rounded-2xl bg-zinc-800"
        }
      >
        {/* Native img avoids Next image optimizer reflows on long coach pages */}
        <img
          src={coach.image}
          alt={coach.imageAlt}
          width={512}
          height={384}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[4/3] w-full object-cover object-top"
        />
      </div>

      <div
        className={
          reverse ? "min-w-0 lg:col-start-1 lg:row-start-1" : "min-w-0"
        }
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
          {coach.role}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
          {coach.name}
        </h3>

        {coach.intro ? (
          <p className="mt-4 text-base leading-relaxed text-zinc-300">{coach.intro}</p>
        ) : null}

        {coach.highlights ? (
          <ul className="mt-5 space-y-2.5">
            {coach.highlights.map((item, index) => (
              <li
                key={`${coach.id}-highlight-${index}`}
                className="flex gap-3 text-sm leading-relaxed text-zinc-300 sm:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {coach.paragraphs ? (
          <div className="mt-5 space-y-4">
            {coach.paragraphs.map((paragraph, index) => (
              <p
                key={`${coach.id}-paragraph-${index}`}
                className="text-sm leading-relaxed text-zinc-300 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        {coach.sections ? (
          <div className="mt-5 space-y-5">
            {coach.sections.map((section) => (
              <div key={`${coach.id}-${section.title}`}>
                <h4 className="text-sm font-bold uppercase tracking-wide text-zinc-100">
                  {section.title}
                </h4>
                <ul className="mt-2 space-y-2">
                  {section.items.map((item, index) => (
                    <li
                      key={`${coach.id}-${section.title}-${index}`}
                      className="flex gap-3 text-sm leading-relaxed text-zinc-300 sm:text-base"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
