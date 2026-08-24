import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ type: string }>;
};

/** Legacy per-type URLs — booking categories live in Upper Hand now. */
export default async function BookingTypeRedirect({ params }: PageProps) {
  await params;
  redirect("/schedule-training");
}
