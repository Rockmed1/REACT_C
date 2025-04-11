import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], //uniquely identify the data fetched
    queryFn: () => getBooking(bookingId), // fn that has to return a promise
    retry: false, // react query will try to re-fetch the data 3 times by default
  });

  return { isLoading, booking, error };
}
