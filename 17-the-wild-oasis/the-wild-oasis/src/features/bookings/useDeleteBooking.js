import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export default function useDeleteBooking() {
  const queryClient = useQueryClient(); // we need access to the  queryClient in order to invalidate the cache and force data reload/refresh

  const navigate = useNavigate();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    // mutationFn: (id) => deleteCabin(id),
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      // navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
