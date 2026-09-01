import Link from "next/link";

export default function BookFacilityButton() {
  return (
    <Link
      href="/schedule-training"
      className="inline-flex rounded-md bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
    >
      Book Facility
    </Link>
  );
}
