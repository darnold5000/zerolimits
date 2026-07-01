type TrainingCardProps = {
  title: string;
  description: string;
};

export default function TrainingCard({ title, description }: TrainingCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
        {title.charAt(0)}
      </div>
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
    </div>
  );
}
