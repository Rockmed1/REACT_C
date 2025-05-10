"use client";

import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";
import ReservationCard from "./ReservationCard";

export default function ReservationList({ bookings }) {
  //OPTIMISTIC UPDATE:
  // placeholder for fast update with expected state while a more lengthy process is taking place in the background. If the background process fails the data should reverse to the original state.
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    // current state (also the state while something is happening in background till it's ready)
    bookings,
    // callback function to determine the next optimistic state. It has access to the current state and anything else we pass to it to help determine the future state
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
      // if we are adding we can do [...bookings, newBooking]
    },
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
