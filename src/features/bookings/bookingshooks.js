import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteBooking, getBookings } from "../../services/apiBookings";

export function useGetBookings() {
  const bookingsData = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return bookingsData;
}

// export function useCreateUpdateBooking(isEditMode) {
//   const queryClient = useQueryClient();

//   const createUpdateBookingMutation = useMutation({
//     mutationFn: ({ id, ...data }) => createEditBooking(data, id),
//     onSuccess: () => {
//       toast.success(
//         isEditMode
//           ? "booking updated successfully"
//           : "booking created successfully",
//       );
//       queryClient.invalidateQueries(["bookings"]);
//     },
//     onError: (error) => {
//       console.error(error);
//       toast.error(
//         isEditMode ? "Unable to update booking" : "Unable to create booking",
//       );
//     },
//   });

//   return createUpdateBookingMutation;
// }

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const mutateDeleteBooking = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
      toast.success("booking deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Unable to delete booking");
    },
  });

  return mutateDeleteBooking;
}
