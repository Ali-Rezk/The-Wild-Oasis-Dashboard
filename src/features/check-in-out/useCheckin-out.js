import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStaysTodayActivity,
  updateBooking,
} from "../../services/apiBookings";
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
export function useCheckout() {
  const queryClient = useQueryClient();
  const checkoutData = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bookings", data.id]);
      toast.success(`Booking #${data.id} checked out successfully`);
    },
    onError: (error, bookingId) => {
      console.error(error);
      toast.error(`Unable to check out booking #${bookingId}`);
    },
  });

  return checkoutData;
}

export function useActivityTodayStays() {
  const {
    data: stays,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["activity-today-stays"],
    queryFn: () => getStaysTodayActivity(),
  });

  return { stays, isLoading, error };
}
