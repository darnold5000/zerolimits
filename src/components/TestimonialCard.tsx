type TestimonialCardProps = {
  quote: string;
  author: string;
};

export default function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <blockquote className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="mb-4 text-3xl text-red-600" aria-hidden="true">
        &ldquo;
      </div>
      <p className="flex-1 text-base leading-relaxed text-zinc-600">{quote}</p>
      <footer className="mt-6 border-t border-zinc-100 pt-4">
        <cite className="not-italic">
          <span className="block text-sm font-bold text-zinc-900">{author}</span>
          <span className="text-xs text-zinc-500">Zero Limits Parent</span>
        </cite>
      </footer>
    </blockquote>
  );
}
