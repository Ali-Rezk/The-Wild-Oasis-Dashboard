import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const checkinData = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bookings", data.id]);
      toast.success(`Booking #${data.id} checked in successfully`);
      navigate(`/`);
    },
    onError: (error, { bookingId }) => {
      console.error(error);
      toast.error(`Unable to check in booking #${bookingId}`);
    },
  });

  return checkinData;
}
