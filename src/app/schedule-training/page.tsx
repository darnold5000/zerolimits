import { redirect } from "next/navigation";
import { DEFAULT_BOOKING_SLUG, getBookingPath } from "@/lib/booking";

export default function ScheduleTrainingPage() {
  redirect(getBookingPath(DEFAULT_BOOKING_SLUG));
}
