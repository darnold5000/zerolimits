import Link from "next/link";

export default function PageCTA() {
  return (
    <section className="bg-red-600 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Ready to Improve?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-red-100">
          Book your first lesson today and start training at Central Indiana&apos;s
          premier indoor baseball facility.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/schedule-training"
            className="rounded-md bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-red-600 transition hover:bg-zinc-100"
          >
            Book Your First Lesson Today
          </Link>
          <Link
            href="/contact"
            className="rounded-md border-2 border-white/40 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
